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

    var xhr = new XMLHttpRequest();
    // need to string.rstrip("""").join(" ") and maybe remove other chars
    // urlstr = "http://192.168.178.45:5000/polarizingornot?socialmedia=" + domain + "&sourcecontent=" + websiteInput;
    urlstr = "http://192.168.178.45:5000/polarizingornot\?socialmedia\=twatter\&sourcecontent\=blablabla"
    xhr.open("GET", urlstr, true); // specify user name?
    xhr.onreadystatechange = function() {
      if (xhr.readyState == 4) {
            resp = JSON.parse(xhr.responseText);
      }
    }
    xhr.send();

    return resp;
}
