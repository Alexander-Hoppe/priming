function evaluatePolarity(domain, websiteInput){
    console.assert(typeof(websiteInput) == "string", { websiteInput });

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
