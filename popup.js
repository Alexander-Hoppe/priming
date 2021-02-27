let checkPolarity = document.getElementById("checkPolarity");

// chrome.storage.sync.get("color", ({ color }) => {
// 	changeColor.style.backgroundColor = color;
// });
	
// When the button is clicked, inject setPageBackGroundColor into current page
checkPolarity.addEventListener("click", async () => {
	let [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
	chrome.scripting.executeScript({
		target: { tabId: tab.id },
		function: setPageBackgroundColor
	});

	// Grab the tab's url to build the twitter, fb, insta, snap, reddit, 4chan, etc. switch case
	let domain = (new URL(tab.url));
	let threshold; //websiteInput, threshold;
	// let testWebsiteInput;
	chrome.scripting.executeScript({
			target: { tabId: tab.id },
			function: scrapeSource
		},
	    	(injectionResults) => {
      			//for (const frameResult of injectionResults)
			//.... = frameResult.result;

			let websiteInput = injectionResults[0].result;

			switch (domain.hostname) {
				case "4chan.org":
					//websiteInput = .8;
					threshhold = evaluatePolarity(websiteInput);
					break; 
				case "www.facebook.com": // ranked #2, de-de.facebook.com etc. will not work
					//websiteInput = .8;
					threshhold = evaluatePolarity(websiteInput);
					break;
				case "www.instagram.com": // ranked #4
					websiteInput = .8;
					threshhold = evaluatePolarity(websiteInput);
					break;
				case "reddit.com": // ranked #3, old.reddit.com will be missing here
					websiteInput = .8;
					threshhold = evaluatePolarity(websiteInput);
					break;
				case "snapchat":
					websiteInput = .8;
					threshhold = evaluatePolarity(websiteInput);
					break;
				case "www.twitch.tv": // ranked #5
					websiteInput = .8;
					threshhold = evaluatePolarity(websiteInput);
					break;
				case "twitter.com": // ranked #6
					websiteInput = .8;
					threshhold = evaluatePolarity(websiteInput);
					break;
				case "www.youtube.com": // ranked #1
					websiteInput = .8;
					threshhold = evaluatePolarity(websiteInput);
					break;
				default:
					threshhold = 0 // should deactivate all output instead
			}
			
			if (1 > threshhold && threshhold > .5) {
				let string = "Polarizing";
				document.getElementById("output").innerHTML = string;
			}
			else if (.5 > threshhold && threshhold > 0){
				let string = "Not polarizing";
				document.getElementById("output").innerHTML = string;
			}
			else {console.log("Threshhold not in valid range")}
    		});

});

// The body of this function will be executed as a content script inside the 
// current page
function setPageBackgroundColor() {
	chrome.storage.sync.get("color", ({ color }) => {
		document.body.style.backgroundColor = color;
	});
}

// Get the html source contents of the url in the current tab
function scrapeSource() {
	return document.documentElement.outerHTML;
}
