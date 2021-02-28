function evaluatePolarity(websiteInput){
	// assert that the input type is correct
	assertTrue(typeof(websiteInput)==string)
	// look for words like news, religion, politics, a.m.o. TODO in the string
	// make a .json of words to look for and read it here
	let scorecounter = 0
	if (websiteInput.includes("news") || websiteInput.includes("religion") || websiteInput.includes("politics")) {
	    scorecounter += 1;
	}
	// look for emojis in the string
	// found at https://stackoverflow.com/questions/37089427/javascript-find-emoji-in-string-and-parse
	// var unified_emoji_ranges = ['\ud83c[\udf00-\udfff]','\ud83d[\udc00-\ude4f]','\ud83d[\ude80-\udeff]'];

	// var reg = new RegExp(unified_emoji_ranges.join('|'), 'g');

	// var string = "It is a great day ??.";

	// if (string.match(reg)) {
	//     alert("emoji found");
	// }	
	// document.getElementById("output").innerHTML = websiteInput; //Printing the contents of the current tab into the popup
	document.getElementById("output").innerHTML = typeof websiteInput;
	return scorecounter;
}
