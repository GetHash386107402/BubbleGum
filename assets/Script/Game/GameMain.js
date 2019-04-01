let Managers = require("Managers");
let tiledMapCtrl = require("tiledMapCtrl");
let PlayerMgr = require("PlayerMgr");
let SpriteFrameMgr = require("SpriteFrameMgr");
let EmitterMgr = require("EmitterMgr");
let Emitter = require("emitter");
let BubbleMgr = require("BubbleMgr");
let BlastMgr = require("BlastMgr");
let PoolMgr = require("PoolMgr");
cc.Class({
    extends: cc.Component,

    properties: {
        tiledMap:tiledMapCtrl,
        playerMgr:PlayerMgr,
        bubbleMgr:BubbleMgr,
        blastMgr:BlastMgr,
        poolMgr:PoolMgr
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad () {
        let mgrInstance = Managers.getInstance();
        this.emitter = new Emitter();
        EmitterMgr.getInstance().addEmitter("game",this.emitter);
        this._registerManager();
        //拿到管理者脚本，初始化管理者，先注册然后初始化
        mgrInstance.initManager();
        // //插入消息
        // this.emitter = new Emitter();
        // EmitterMgr.getInstance().addEmitter("game",this.emitter);

    },

    start () {
        //后初始化管理者
        let mgrInstance = Managers.getInstance();
        mgrInstance.lateInitManager();
    },

    update (dt) {
        //更新管理者
        let mgrInstance = Managers.getInstance();
        mgrInstance.UpDateManager(dt);
    },
    lateUpdate(dt){
        //后更新管理者
        let mgrInstance = Managers.getInstance();
        mgrInstance.lateUpDateManager(dt);
    },
    //注册管理者
    _registerManager(){
        let mgrInstance = Managers.getInstance();
        mgrInstance.registerManager("tiledMapCtrl",this.tiledMap);
        mgrInstance.registerManager("PlayerMgr",this.playerMgr);
        mgrInstance.registerManager("BubbleMgr",this.bubbleMgr);
        mgrInstance.registerManager("BlastMgr",this.blastMgr);
        mgrInstance.registerManager("PoolMgr",this.poolMgr);
        let spriteFrameMgr = new SpriteFrameMgr();
        mgrInstance.registerManager("SpriteFrameMgr",spriteFrameMgr);
    }
});
