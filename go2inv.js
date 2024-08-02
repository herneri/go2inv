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

var preferred_instance = null;

/* Receive the preferred instance that is selected in the popup */
function get_popup_message(request, sender) {
	preferred_instance = request.instance;
	return;
}

function format_yt_url(yt_url, invidious_instance) {
    var formatted_url = invidious_instance + "/watch?v=";
    var video_id = yt_url.split("=")[1];

    return formatted_url + video_id;
}

function redirect_to_invidious(requestData) {
	const invidious_url = format_yt_url(requestData.url, preferred_instance);

	return {
		redirectUrl:
			invidious_url,
	};
}

browser.runtime.onMessage.addListener(get_popup_message);
browser.webRequest.onBeforeRequest.addListener(redirect_to_invidious, { "urls": ["https://www.youtube.com/watch?v=*"] }, [ "blocking" ]);
