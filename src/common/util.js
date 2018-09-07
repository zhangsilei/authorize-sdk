function loadScript(url, callback) {
    let script = document.createElement("script");
    script.type = "text/javascript";

    if (callback && typeof callback === 'function') {
        if (script.readyState) {
            script.onreadystatechange = function() {
                if (script.readyState == "loaded" || script.readyState == "complete") {
                    script.onreadystatechange = null;
                    callback();
                }
            };
        } else {
            script.onload = function() {
                callback();
            };
        }
    }
    script.src = url;
    document.body.appendChild(script);
}

export {
    loadScript
}