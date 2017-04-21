/**
 * Created by zhangsihao on 2017/4/21.
 */
const request = require('request-promise');
const Consumer = require('./consumer');
const HttpUtil = require('./http_util');

class HttpConsumer extends Consumer {
    constructor(options) {
        super(options);
        this.endpoint = options.endpoint;
    }

    async start() {
        this.performRequest();
    }

    performRequest() {
        let time = new Date().getTime();
        this.promise = request({
            url: 'http://' + this.endpoint + '/message',
            headers: {
                AccessKey: this.accessKey,
                Signature: HttpUtil.signature(this.topic + "\n" + this.consumerId + "\n" + time, this.accessSecret),
                ConsumerID: this.consumerId
            },
            qs: {
                topic: this.topic,
                time: time
            },
            json: true
        }).then(async (result) => {
            for (let i in result) {
                await this.handleMessage(result[i]);
            }
        }).catch((err) => {
            console.error(err);
            this.performRequest();
        });
    }

    async stop() {
        if (this.promise) {
            this.promise.cancel();
            delete this.promise;
        }
    }

    async ackMessage(msg) {
        try {
            await request({
                url: 'http://' + this.endpoint + '/message',
                method: 'DELETE',
                headers: {
                    AccessKey: this.accessKey,
                    Signature: HttpUtil.signature(this.topic + "\n" + this.consumerId + "\n" + msg.msgHandle + "\n" + new Date().getTime(), this.accessSecret),
                    ConsumerID: this.consumerId
                },
                json: true
            });
        } catch (err) {
            console.error(err);
        }
    }
}

module.exports = HttpConsumer;