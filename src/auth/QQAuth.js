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
            'type': 'text/javascript',
            'charset': 'utf-8',
            'data-appid': options.appId || 0,
            'data-redirecturi': options.redirectURI || ''
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
                if (QC.Login.check()) {
                    QC.Login.getMe(function(openId, accessToken) {
                        console.log(openId, accessToken);
                    })
                    this.getUserInfo();
                }
                clearInterval(timer);
            }
        }, 10);
    }

    static getUserInfo() {
        // QC.api('get_user_info')
    }
}

export default QQAuthorize;