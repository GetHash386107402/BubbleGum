let EmitterMgr = require("EmitterMgr");
let Managers = require(("Managers"));
cc.Class({
    extends: cc.Component,

    properties: {
      blastPrefab:cc.Prefab,
        resAltas:cc.SpriteAtlas
    },

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {},
    lateInit(){
        this.tiledMapCtrl = Managers.getInstance().getManager("tiledMapCtrl");
        this.gameEmitter = EmitterMgr.getInstance().getEmitter("game");
        this.gameEmitter.on("blast",this.addBlast.bind(this));
    },
    addBlast(arrInfo){
        // for (let value of arrInfo){
        for (let i=0;i<arrInfo.length;i++){
            let pos = this.tiledMapCtrl.getPosByTiled(arrInfo[i].tilePos);
            let blastNode = cc.instantiate(this.blastPrefab);
            blastNode.parent = this.tiledMapCtrl.node;
            blastNode.position = pos;
            blastNode.getComponent("Blast").init(arrInfo[i].dirName);
        }

    }

    // update (dt) {},
});
