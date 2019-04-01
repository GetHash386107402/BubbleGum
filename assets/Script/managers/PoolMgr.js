let Pool = require("Pool");
cc.Class({
    extends: cc.Component,

    properties: {

    },

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {},

    init() {
        this.poolObjs = {};
    },
    addPool(size,prefab,name){
    if(!this.poolObjs[name]){
        let pool = new Pool(size,prefab,name);
        this.poolObjs[name] = pool;
        }
    return this.poolObjs[name];
    },
    getPool(name){
    if(this.poolObjs[name]){
        return this.poolObjs[name];
        }
    },
    removePool(name){
    if(this.poolObjs[name]){
        delete this.poolObjs[name];
        }
    }

    // update (dt) {},
});


