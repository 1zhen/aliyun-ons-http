/**
 * Created by zhangsihao on 2017/4/21.
 */
class Producer {
    constructor(options) {
        this.accessKey = options.accessKey;
        this.accessSecret = options.accessSecret;
        this.producerId = options.producerId;
        this.topic = options.topic;
    }

    async send(msg, options) {
        if (typeof msg !== 'string') {
            msg = JSON.stringify(msg);
        }
        return await this.performSend(this.topic, msg, options);
    }

    async performSend(topic, str) {
        throw new Error('Method not implemented.');
    }
}

module.exports = Producer;