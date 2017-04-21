/**
 * Created by zhangsihao on 2017/4/21.
 */
const Consumer = require('../lib/http_consumer');
const Producer = require('../lib/http_producer');
const {expect} = require('chai');

describe('Test HTTP ONS Client', function () {
    let consumer = new Consumer({
        endpoint: 'publictest-rest.ons.aliyun.com',
        accessKey: 'IXqi88QaVEG9iGnV',
        accessSecret: 'wA7mJ4drL6dDj9AVC2dDrk4ohEGCXz',
        topic: 'agarage',
        consumerId: 'CID_alimq_test'
    });
    let producer = new Producer({
        endpoint: 'publictest-rest.ons.aliyun.com',
        accessKey: "IXqi88QaVEG9iGnV",
        accessSecret: 'wA7mJ4drL6dDj9AVC2dDrk4ohEGCXz',
        topic: 'agarage',
        producerId: 'PID_alimq_test'
    });
    it('Test producer and consumer', function (done) {
        this.timeout = 10000;
        (async () => {
            let str = 'hello world!';
            let obj = {
                foo: 'bar'
            };
            consumer.on('message', (msg) => {
                expect(msg.body).to.be.equal(str);
                expect(new Date().getTime() - now).to.be.at.least(5000);
                done();
            });
            await consumer.start();
            let now = new Date().getTime();
            await producer.send(str, {
                startDeliverTime: now + 5000
            });
        })();
    });
});