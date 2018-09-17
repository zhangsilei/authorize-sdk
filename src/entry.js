/**
 * anthorize-sdk v1.0.0
 * 
 * Copyright (c) 2018 zhangsilei
 */
'use strict';

import FacebookAuthorize from './auth/FacebookAuth';
import GoogleAuthorize from './auth/googleAuth';
import QQAuthorize from './auth/QQAuth';

(function(global) {

    let nameSpace = (typeof global.authorize === 'undefined') && 'authorize';

    if (nameSpace !== 'authorize') {
        return console.warn('The namespace of \"authorize\" has been used, please set a new one.');
    }

    // 挂载命名空间
    global[nameSpace] = function() {};

    /**
     * @function anthorize-sdk 初始化
     * @param {String} source   'facebook','google' 
     * @param {Object} options.settings 对应不同平台的初始化设置项
     */
    global[nameSpace].init = function(source, settings) {
        let originAnthorize = {}; // 平台授权对象

        source = source.toLowerCase();

        if (!new String(source).match(/facebook|google|qq/)) {
            // 判断接入平台是否支持
            return console.warn('Supported source: facebook & google, not \"' + source + '\" yet');
        }
        if (settings === undefined) {
            // 判空
            return console.error('Missing params \"settings\" in the method init().');
        } else if (typeof settings !== 'object') {
            // 判断类型
            return console.error('Params \"settings\" should be an object.');
        } else if (!Object.getOwnPropertyNames(settings)) {
            // 判断无效内容
            return console.error('Params \"settings\" can\'t be an empty object.');
        }

        switch(source) {
            case 'facebook':
                FacebookAuthorize.init(settings);
                originAnthorize = FacebookAuthorize;
                break;
            case 'google':
                GoogleAuthorize.init(settings);
                originAnthorize = GoogleAuthorize;
                break;
            case 'qq':
                QQAuthorize.init(settings);
                originAnthorize = QQAuthorize;
        }
        return originAnthorize;
    }
})(typeof window !== 'undefined' ? window : this);