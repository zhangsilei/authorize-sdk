/**
 * google 三方授权登录
 * 
 * 一、使用方式：
 *   1. 直接调用 login(el) 方法即可，
 *      其中 el 为触发 google 登录的 DOM 元素，必传
 * 
 *   2. login(el, [success], [fail]) 提供了两个回调，说明如下：
 *      a. 登录授权成功回调，返回了一个参数： userData 即，用户 google 信息
 *      b. 取消授权回调，无返回参数
 * 
 * 例如：
 *   login(el, function(userData) {
 *      // 成功授权回调 
 *   }, function() {
 *      // 取消授权回调
 *   });
 * 
 */

'use strict';

import log from './log';

var auth2 = null;

var GoogleAuthorize = {
    init: function(options) {
        this.loadScript('https://apis.google.com/js/api:client.js', function() {
            gapi.load('auth2', function() {
                auth2 = gapi.auth2.init({
                    client_id: options.client_id || 0,
                    cookiepolicy: options.cookiepolicy || 'single_host_origin',
                    scope: options.scope || 'profile'
                });
                log.info('Init google sdk...');
            });
            log.info('Loading google sdk...');
        });
    },

    /**
     * google 登录授权入口方法
     * 
     * @param {Element} el 触发登录授权的 DOM 元素
     * @param {Function} success 成功授权回调
     * @param {Function} fail 取消授权回调
     */
    login: function(el, success, fail) {
        if (auth2 !== undefined && Object.getOwnPropertyNames(auth2).length) {
            auth2.attachClickHandler(el, {}, userData => {
                (success && typeof success === 'function') && success(userData);
                log.info('User data in google: ' + JSON.stringify(userData));
                // var profile = auth2.currentUser.get().getBasicProfile();
                // var userId = profile.getId()
                // var nickName = profile.getName()
                // var head = profile.getImageUrl()
                // var email = profile.getEmail()
                // var token = userData.getAuthResponse().access_token
            }, function(err) {
                (fail && typeof fail === 'function') && fail();
                log.info('Cancel authorize: ' + JSON.stringify(err));
            });
            el.click();
        }
    },

    loadScript: function(url, callback) {
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
}

export default GoogleAuthorize;