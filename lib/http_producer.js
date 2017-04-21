/**
 * Created by zhangsihao on 2017/4/21.
 */
const Producer = require('./producer');
const HttpUtil = require('./http_util');
const crypto = require('crypto.js');
const request = require('request-promise');

class HttpProducer extends Producer {
    constructor(options) {
        super(options);
        this.endpoint = options.endpoint;
    }

    async performSend(topic, msg, options) {
        let time = new Date().getTime();
        let qs = {
            topic: this.topic,
            time: time
        };
        if (options.startDeliverTime) {
            qs.startdelivertime = options.startDeliverTime;
        }
        let result = await request({
            url: 'http://' + this.endpoint + '/message',
            method: 'POST',
            headers: {
                AccessKey: this.accessKey,
                Signature: HttpUtil.signature(this.topic + "\n" + this.producerId + "\n" + crypto.md5(msg) + "\n" + time, this.accessSecret),
                ProducerID: this.producerId
            },
            qs: qs,
            body: msg
        });
    }
}

module.exports = HttpProducer;