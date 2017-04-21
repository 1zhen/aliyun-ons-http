/**
 * Created by zhangsihao on 2017/4/21.
 */
const events = require('events');

class Consumer extends events.EventEmitter {
    constructor(options) {
        super();
        this.accessKey = options.accessKey;
        this.accessSecret = options.accessSecret;
        this.topic = options.topic;
        this.consumerId = options.consumerId;
    }

    async start() {
        throw new Error('Method not implemented.');
    }

    async stop() {
        throw new Error('Method not implemented.');
    }

    async handleMessage(msg) {
        this.emit('message', msg);
        await this.ackMessage(msg);
    }

    async ackMessage(msg) {
        throw new Error('Method not implemented.');
    }
}

module.exports = Consumer;