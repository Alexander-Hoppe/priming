function evaluatePolarity(domain, websiteInput){
    console.assert(typeof(websiteInput) == "string", { websiteInput });
    // look for words like news, religion, politics, a.m.o. TODO in the string
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

    // This only works when viewing a tweet with its response, i.e. when
    // "status" is in the twitter url
    if ((domain.hostname == "twitter.com") && (domain.toString().includes("status"))){
        var reg = new RegExp(/(@)[\S\s]*/g); //(?=New\sto\sTwitter)/g);
        // "New to Twitter?" sometimes
        // marks the end of the responses to a tweet on the status page
        core = websiteInput.match(reg);
        websiteInput = core[0];
    }

    var xhr = new XMLHttpRequest();
    // need to string.rstrip("""").join(" ") and maybe remove other chars
    urlstr = "http://192.168.178.45:5000/polarizingornot?socialmedia=" + domain + "&sourcecontent=" + websiteInput;
    xhr.open("GET", urlstr, true); // specify user name?
    xhr.onreadystatechange = function() {
      if (xhr.readyState == 4) {
            resp = JSON.parse(xhr.responseText);
      }
    }
    xhr.send();

    return resp;
}
