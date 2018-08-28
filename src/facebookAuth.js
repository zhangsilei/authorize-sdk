/**
 * facebook 三方授权登录
 * 
 * 一、使用说明：
 *   FB支持两种登录方式：1. 通过“登录”按钮； 2. 通过 SDK 登录
 *   当前工具支持了第二种登录方式，即“通过 SDK 登录”，优点是可以自定义登录按钮样式
 * 
 * 二、使用方式：
 *   直接调用 login() 方法即可
 *   login([success], [fail]) 方法提供了两个回调，说明如下：
 *   1. 登录授权成功回调，返回了一个参数： userData 即，用户 facebook 信息
 *   2. 取消授权回调，无返回参数
 * 
 * 例如：
 *   login(userData => {
 *     // 成功授权回调 
 *   }, () {
 *     // 取消授权回调
 *   });
 * 
 */

'use strict';

import log from './log';

var FacebookAuthorize = {
    init: function(options) {
        window.fbAsyncInit = () => {
            FB.init({
                appId: options.appId || 0,
                autoLogAppEvents: options.autoLogAppEvents || true,
                xfbml: options.xfbml || true,
                version: options.version || 'v3.0'
            });
            log.info('Init facebook sdk...');
        };
        (function(d, s, id) {
            var js, fjs = d.getElementsByTagName(s)[0];
            if (d.getElementById(id)) {
                return;
            }
            js = d.createElement(s);
            js.id = id;
            js.src = "https://connect.facebook.net/en_US/sdk.js";
            fjs.parentNode.insertBefore(js, fjs);
            log.info('Loading facebook sdk...');
        }(document, 'script', 'facebook-jssdk'));
    },

    /**
     * facebook 登录授权入口方法
     * 
     * @param {Function} success 成功授权回调
     * @param {Function} fail 取消授权回调
     */
    login: function(success, fail) {
        if (FB !== undefined && Object.getOwnPropertyNames(FB).length) {
            this.checkFbLoginStatus(userData => {
                if (userData) {
                    (success && typeof success === 'function') && success(userData);
                } else {
                    (fail && typeof fail === 'function') && fail();
                }
            });
        }
    },

    checkFbLoginStatus: function(cb) {
        FB.getLoginStatus(response => {
            if (response.status === 'connected') { // 已授权登录
                this.connectedCallBack(cb);
            } else { // 未授权登录
                if (response.status === 'not_authorized') {
                    log.warn('Already logged in, but not authorized.');
                }
                if (response.status === 'unknown') {
                    log.warn('Not logged in and authorized.');
                }
                this.loginCallBack(cb);
            }
        });
    },

    connectedCallBack: function(cb) {
        FB.api('/me?fields=id,name,picture', userData => {
            cb(userData);
            log.info('User data in facebook: ' + JSON.stringify(userData));
        });
        log.info('Authorize success.');
    },

    loginCallBack: function(cb) {
        FB.login(response => {
            if (response.status === 'connected') {
                this.connectedCallBack(cb);
            } else {
                cb();
            }
        });
    }
};

export default FacebookAuthorize;