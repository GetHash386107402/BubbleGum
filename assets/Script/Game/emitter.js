module.exports = Emitter;

function Emitter(obj) {
    if (obj) return mixin(obj);
};

/**
 将Emitter.prototype里面的所有属性都整合到obj
 */

function mixin(obj) {
    for (let key of Object.keys(Emitter.prototype)) {
        obj[key] = Emitter.prototype[key];
    }
    return obj;
}

/**
 添加监听事件
 */

Emitter.prototype.on =
    Emitter.prototype.addEventListener = function(event, fn){
        this._callbacks = this._callbacks || {};
        (this._callbacks[event] = this._callbacks[event] || [])
            .push(fn);
        return this;
    };

/**
 添加事件，该事件只被触发一次，触发后会被移除
 */

Emitter.prototype.once = function(event, fn){
    var self = this;
    this._callbacks = this._callbacks || {};

    function on() {
        self.off(event, on);
        fn.apply(this, arguments);
    }

    on.fn = fn;
    this.on(event, on);
    return this;
};

/**
 移除监听事件，当不传参数时，所有事件都会被移除
 */

Emitter.prototype.off =
    Emitter.prototype.removeListener =
        Emitter.prototype.removeAllListeners =
            Emitter.prototype.removeEventListener = function(event, fn){
                this._callbacks = this._callbacks || {};

                if (0 == arguments.length) {
                    this._callbacks = {};
                    return this;
                }

                var callbacks = this._callbacks[event];
                if (!callbacks) return this;

                // 移除所有事件
                if (1 == arguments.length) {
                    delete this._callbacks[event];
                    return this;
                }

                // 移除特定事件
                var cb;
                for (var i = 0; i < callbacks.length; i++) {
                    cb = callbacks[i];
                    if (cb === fn || cb.fn === fn) {
                        callbacks.splice(i, 1);
                        break;
                    }
                }
                return this;
            };

/**
 发送事件，当发送该事件时会触发相应的监听的回调函数
 */

Emitter.prototype.emit = function(event){
    this._callbacks = this._callbacks || {};
    var args = [].slice.call(arguments, 1)
        , callbacks = this._callbacks[event];

    if (callbacks) {
        callbacks = callbacks.slice(0);
        for (var i = 0, len = callbacks.length; i < len; ++i) {
            callbacks[i].apply(this, args);
        }
    }

    return this;
};

/**
 返回所有监听事件
 */

Emitter.prototype.listeners = function(event){
    this._callbacks = this._callbacks || {};
    return this._callbacks[event] || [];
};

/**
 返回监听事件的个数
 */

Emitter.prototype.hasListeners = function(event){
    return !! this.listeners(event).length;
};