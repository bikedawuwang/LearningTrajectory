/**
 * @file Promise.js
 * @author bikedawuwang
 * @description 手写一个Promise
*/

function Promise(executor) {
    var _this = this;
    this.state = 'pending'; //状态
    this.value = undefined; //成功结果
    this.reason = undefined; //失败原因

    executor(resolve, reject);

    function resolve(value) {
        if (_this.state === 'pending') {
            _this.value = value;
            _this.state = 'resolved';
        }
    }

    function reject(reason) {
        if (_this.state === 'pending') {
            _this.reason = reason;//保存失败原因
            _this.state = 'rejected';
        }
    }
}

Promise.prototype.then = function (onFulfilled, onRejected) {
    if (this.state === 'resolved') {
        if (typeof onFulfilled === 'function') {
            onFulfilled(this.value);
        }
    }
    if (this.state === 'rejected') {
        if (typeof onRejected === 'function') {
            onRejected(this.reason);
        }
    }
};

module.exports = Promise;