let Managers = require("Managers");
class StateCtrl {
    constructor(owner){
        this.owner = owner;
        this.state = "none";
        this.modelNode = this.owner.node.getChildByName("model");
        this.animCom = this.modelNode.getComponent(cc.Animation);
        this.index = 0;
    }
    changeState(state){
        if (state===this.state){
            return;
        }
        this.preState = this.state;
        this.state = state;
        this.animCom.stop();
        if ("idle"===state){
            // let objName = {"runUp":1,"runDown":1,"runLeft":-1,"runRight":1};
            // this.owner.node.scaleX = objName[state];
            let SpriteFrameMgr = Managers.getInstance().getManager("SpriteFrameMgr");
            SpriteFrameMgr.getSpriteFrame0(this.modelNode,this.preState,this.index);
        }
        else {
            let name = this.getAnimateName(state);
            this.animCom.play(name);
        }
    }

    getAnimateName(state){
        let name = ("runLeft"===state)?"runRight":state;
        let objName = {"runUp":1,"runDown":1,"runLeft":-1,"runRight":1};
        this.owner.node.scaleX = objName[state];
        let animateName = name + (this.index+1);
        return animateName;
    }
}

module.exports = StateCtrl;