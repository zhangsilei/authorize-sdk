'use strict';

import log from '../common/log';
import { loadScript } from '../common/util';

class QQAuthorize {
    constructor() {
        this.QQ_inited = false;
    }

    static init(options) {
        let url = '//connect.qq.com/qc_jssdk.js';
        let attrs = [{
            'data-appid': options.appId || 0,
            'data-redirecturi': options.redirectURI || '',
            'charset': 'utf-8'
        }];

        loadScript(url, attrs, () => {
            this.QQ_inited = true;
            log.info('Loading qq sdk...');
        });
    }

    static login(success, fail) {
        let timer = setInterval(() => {
            if (this.QQ_inited) {
                QC.Login.showPopup();
                // QC.Login({
                //     btnId: 'qq'
                // }, (reqData, opts) => {
                //     console.log(reqData, opts)
                // });
                clearInterval(timer);
            }
        }, 10);
    }
}

export default QQAuthorize;