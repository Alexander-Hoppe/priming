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

	let websiteInput = .8;
	let threshhold = evaluatePolarity(websiteInput);
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

// The body of this function will be executed as a content script inside the 
// current page
function setPageBackgroundColor() {
	chrome.storage.sync.get("color", ({ color }) => {
		document.body.style.backgroundColor = color;
	});
}
