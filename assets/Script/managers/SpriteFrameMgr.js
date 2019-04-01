let Managers = require("Managers");
class SpriteFrameManager {
    constructor() {

    }

    getSpriteFrame0(node,state, index) {
        this.spriteAltas = Managers.getInstance().getManager("PlayerMgr").spriteAltas;
        let name = ("runLeft" === state) ? "runRight" : state;
        // let objName = {"runUp": 1, "runDown": 1, "runLeft": -1, "runRight": 1};
        // this.owner.node.scaleX = objName[state];
        name = name + (index + 1) + "_0";
        let spriteFrame = this.spriteAltas.getSpriteFrame(name);
        let sprite = node.getComponent(cc.Sprite);
        sprite.spriteFrame = spriteFrame;
    }

    getSpriteFrameByName(managerName,name){
        let altas = Managers.getInstance().getManager(managerName).resAltas;


        let SpriteFrame = altas.getSpriteFrame(name);
        return SpriteFrame;
    }
}

module.exports = SpriteFrameManager;