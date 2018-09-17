/**
 * 动态加载 script 脚本
 * @param {String} url 脚本链接
 * @param {Array} attrs 属性数组
 * @param {Function} callback 回调方法
 */
function loadScript(url, attrs, callback) {
    let script = document.createElement('script');
    script.type = 'text/javascript';

    if (arguments.length == 2 && typeof arguments[1] === 'function') { // url、callback
        attrs = callback;
    } else if (arguments.length == 3 && typeof arguments[1] === 'object') { // url、attrs、callback
        attrs.forEach(attr => {
            for (const key in attr) {
                if (attr.hasOwnProperty(key)) {
                    script.setAttribute(key, attr[key]);
                }
            }
        });
    }

    if (callback && typeof callback === 'function') {
        if (script.readyState) {
            script.onreadystatechange = function() {
                if (script.readyState == 'loaded' || script.readyState == 'complete') {
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