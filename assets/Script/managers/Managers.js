class Managers {
    constructor(){
            this.objMgr ={  };
    }
    //注册管理者
    registerManager(name,obj){
            if(!this.objMgr[name]) {
                this.objMgr[name] = obj;
            }
    }
    //获取管理者
    getManager(name){
        if (this.objMgr[name]){
            return this.objMgr[name];
        }
    }
    //注销管理者
    removeManager(name){
        if (this.objMgr[name]){
            delete this.objMgr[name];
        }
    }
    initManager(){
        for(let key of Object.keys(this.objMgr)){
            let obj = this.objMgr[key];
            if (obj&&obj.init) {
                obj.init();
            }
        }
    }
    lateInitManager(){
        for(let key of Object.keys(this.objMgr)){
            let obj = this.objMgr[key];
            if (obj&&obj.lateInit) {
                obj.lateInit();
            }
        }
    }
    UpDateManager(dt){
        for(let key of Object.keys(this.objMgr)){
            let obj = this.objMgr[key];
            if (obj&&obj.UpDate) {
                obj.UpDate(dt);
            }
        }
    }
    lateUpDateManager(dt){
        for(let key of Object.keys(this.objMgr)){
            let obj = this.objMgr[key];
            if (obj&&obj.lateUpDate) {
                obj.lateUpDate(dt);
            }
        }
    }
}
//定义空单例
let instance = null;
//将单例返回给外部脚本使用
module.exports.getInstance = function () {
    if (!instance){
        instance = new Managers();
    }
    return instance;
}