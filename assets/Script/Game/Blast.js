let Managers = require("Managers");
cc.Class({
    extends: cc.Component,

    properties: {

    },

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {},

    start () {
        this.scheduleOnce(this.destroySelf,0.2);
    },
    init(dirName) {
        if ("center" === dirName) {
            let anim = this.node.getComponent(cc.Animation);
            anim.play();
            return;
        }
        else {
            let arrFramObj = {"up": "blastU_0_0", "down": "blastD_0_0", "left": "blastL_0_0", "right": "blastR_0_0"};

            let spriteFrameMgr = Managers.getInstance().getManager("SpriteFrameMgr");
            let spriteFrame = spriteFrameMgr.getSpriteFrameByName("BlastMgr", arrFramObj[dirName]);
            let sprite = this.node.getComponent(cc.Sprite);
            sprite.spriteFrame = spriteFrame;
        }
    },
    destroySelf(){
        this.node.destroy();
    }
    // update (dt) {},
});
