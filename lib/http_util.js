/**
 * Created by zhangsihao on 2017/4/21.
 */
const crypto = require('crypto.js');

class HttpUtil {
    static signature(str, accessSecret) {
        return crypto.hmac('sha1', str, accessSecret, 'base64');
    }
}

module.exports = HttpUtil;