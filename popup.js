/*
	Copyright 2024 Eric Hernandez

	Licensed under the Apache License, Version 2.0 (the "License");
	you may not use this file except in compliance with the License.
	You may obtain a copy of the License at

		https://www.apache.org/licenses/LICENSE-2.0

	Unless required by applicable law or agreed to in writing, software
	distributed under the License is distributed on an "AS IS" BASIS,
	WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
	See the License for the specific language governing permissions and
	limitations under the License.
*/

const API_URL = "https://api.invidious.io/instances.json?pretty=1&sort_by=type,users";
const list_html = document.querySelector("#instance-list");
const instance_html = document.getElementById("current-instance");

var preferred_instance = null;

async function get_invidious_data() {
	const response = await window.fetch(API_URL);
	if (!response.ok) {
		document.write("Failed to call Invidious API <br/>");
		return;
	}

	const json = await response.json();
	const length = json.length;

	for (var i = 0; i < length; i++) {
		if (json[i][1]["type"] != "https")
			continue;

		const new_instance = document.createElement("tr");
		const name = document.createElement("td");
		const region = document.createElement("td");
		const instance_status = document.createElement("td");


		name.innerHTML = json[i][0]
		name.id = json[i][1]["monitor"]["url"];
		region.innerHTML = json[i][1]["region"];
		instance_status.innerHTML = json[i][1]["monitor"]["last_status"];

		new_instance.appendChild(name);
		new_instance.appendChild(region);
		new_instance.appendChild(instance_status);
		list_html.appendChild(new_instance);
	}

	return;
}

get_invidious_data();
document.addEventListener("click", (e) => {
	if (e.target.id == "")
		return;

	preferred_instance = e.target.id;
	instance_html.innerHTML = "Current Instance: " + preferred_instance;

	/* Send the selected instance to the background script */
	var sent_message = browser.runtime.sendMessage({ instance: preferred_instance, });
});
