let EmitterMgr = require("EmitterMgr");
let Managers = require("Managers");
cc.Class({
    extends: cc.Component,

    properties: {

    },

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {},

    start () {
        this.gameEmitterMgr = EmitterMgr.getInstance().getEmitter("game");
        this.tiledMapCtrl = Managers.getInstance().getManager("tiledMapCtrl");
        this.scheduleOnce(this.bubbleBoom,2);
    },
    init(data){
        this.power = data.power;
    },
    bubbleBoom(){
        let tilePos = this.tiledMapCtrl.getTiledByPos(this.node.position);
        this.gameEmitterMgr.emit("boom",{tilePos:tilePos,power:this.power});
    }

    // update (dt) {},
});
