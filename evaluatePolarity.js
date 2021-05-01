function evaluatePolarity(websiteInput){
    console.assert(typeof(websiteInput) == "string", { websiteInput });
    // look for words like news, religion, politics, a.m.o. TODO in the strin
    let counter = 0
    if (websiteInput.includes("news") || websiteInput.includes("religion") || websiteInput.includes("politics")) {
        counter += .1;
    }

    // look for emojis in the string
    // found at https://stackoverflow.com/questions/37089427/javascript-find-emoji-in-string-and-parse
    var unified_emoji_ranges = ['\ud83c[\udf00-\udfff]','\ud83d[\udc00-\ude4f]','\ud83d[\ude80-\udeff]'];
    var reg = new RegExp(unified_emoji_ranges.join('|'), 'g');
    if (websiteInput.match(reg)) {
            counter += .033;
    }

    // document.getElementById("output").innerHTML = websiteInput; //Printing the contents of the current tab into the popup
    // document.getElementById("output").innerHTML = typeof websiteInput;
    return counter;
}
