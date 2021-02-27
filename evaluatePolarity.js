function evaluatePolarity(websiteInput){
	// document.getElementById("output").innerHTML = websiteInput; //Printing the contents of the current tab into the popup
	document.getElementById("output").innerHTML = typeof websiteInput;
	let score = .2 * websiteInput;
	return score;
}
