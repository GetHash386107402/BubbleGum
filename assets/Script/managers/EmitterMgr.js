class EmitterMgr {
    constructor(){
        this.emitterObjs = {};
    }
    //添加消息
    addEmitter(name,obj){
       if (!this.emitterObjs[name]) {
           this.emitterObjs[name] = obj;
       }
    }
    //获取消息
    getEmitter(name){
        if (this.emitterObjs[name]){
            return this.emitterObjs[name];
        }
    }
    //移除消息
    removeEmitter(name){
        if (this.emitterObjs[name]){
            delete this.emitterObjs[name];
        }
    }
}

//定义空单例
let instance = null;
module.exports.getInstance = function () {
    if (!instance){
        instance = new EmitterMgr();
    }
    return instance;
}