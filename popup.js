let checkPolarity = document.getElementById("checkPolarity");

checkPolarity.addEventListener("click", async () => {
	let [tab] = await chrome.tabs.query({ active: true, currentWindow: true });

	// Grab the tab's url to build the twitter, fb, insta, snap, reddit, 4chan, etc. switch case
	let domain = (new URL(tab.url));

	chrome.scripting.executeScript({
			target: { tabId: tab.id },
			function: scrapeSource
		},
	    	(injectionResults) => {

			let webtxt = injectionResults[0].result;

            function getDomainPolarity(domain, text, callback) {
                let websiteInput = text;
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
                        console.log("reached twitter");
                        threshhold = evaluatePolarity(domain, websiteInput,
                            threshhold => {
                                console.log("threshold in switch case",{ threshhold });
                                callback(threshhold);
                            });
                        break;
                    case "www.youtube.com": // ranked #1
                        websiteInput = .8;
                        threshhold = evaluatePolarity(websiteInput);
                        break;
                    default:
                        threshhold = 0; // should deactivate all output instead
                }
            }

            getDomainPolarity(domain, webtxt, eval => {
                if (1 > eval && eval > .5) {
                    let string = "Polarizing";
                    document.getElementById("output").innerHTML = string;
                    document.body.style.backgroundColor = 'red';
                    // alert(string);
                }
                else if (.5 > eval && eval >= 0){
                    let string = "Not polarizing";
                    document.getElementById("output").innerHTML = string;
                    document.body.style.backgroundColor = 'green';
                    // alert(string);
                }
                else {console.log("Threshhold not in valid range")}
                });
            });

});

// Get the innerText of the url in the current tab
function scrapeSource() {
    return document.documentElement.innerText;
}
