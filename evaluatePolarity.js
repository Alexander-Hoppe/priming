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

    var xhr = new XMLHttpRequest();
    // put websiteInput in url so that python server treats it as a variable
    // need to string.rstrip("""").join(" ") and maybe remove other chars
    urlstr = "http://192.168.178.45/polarizingornot?arg1=value1&arg2=" + websiteInput;
    console.log({ urlstr });
    xhr.open("GET", urlstr, true); // specify user name?
    xhr.onreadystatechange = function() {
          if (xhr.readyState == 4) {
                var resp = JSON.parse(xhr.responseText);
          }
    }
    xhr.send();

    console.log({ resp });

//    chrome.runtime.onMessage.addListener(
//        function(request, sender, sendResponse) {
//          if (request.contentScriptQuery == 'queryPrice') {
//            var url = 'https://another-site.com/price-query?itemId=' +
//                encodeURIComponent(request.itemId);
//            fetch(url)
//                .then(response => response.text())
//                .then(text => parsePrice(text))
//                .then(price => sendResponse(price))
//                .catch(error => ...)
//            return true;  // Will respond asynchronously.
//          }
//        });
//
//    chrome.runtime.sendMessage(
//        {contentScriptQuery: 'queryPrice', itemId: 12345},
//        price => ...);

    return counter;
}
