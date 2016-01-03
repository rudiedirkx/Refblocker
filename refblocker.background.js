
// Set up request header filter
var filter = {
	// Check all URLs dynamically.
	urls: ["<all_urls>"],
};
var extraInfoSpec = ['blocking', 'requestHeaders'];
chrome.webRequest.onBeforeSendHeaders.addListener(function(details) {

	var host = (details.url.match(/\/\/([^\/]+)/) || '')[1];

	for (var i=0; i<details.requestHeaders.length; i++) {
		if (details.requestHeaders[i].name == 'Referer') {
			var refHost = (details.requestHeaders[i].value.match(/\/\/([^\/]+)/) || '')[1];
			if (!host || !refHost || host != refHost) {
				details.requestHeaders.splice(i, 1);
				return {requestHeaders: details.requestHeaders};
			}
		}
	}

}, filter, extraInfoSpec);
