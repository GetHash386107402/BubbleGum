let EmitterMgr = require("EmitterMgr");
let Managers = require("Managers");
cc.Class({
    extends: cc.Component,

    properties: {
       bubblePre:cc.Prefab
    },
    init(){
        this.tiledMapCtrl = Managers.getInstance().getManager("tiledMapCtrl");
        this.gameEmitter = EmitterMgr.getInstance().getEmitter("game");
        this.gameEmitter.on("addBubble",this.addBubble.bind(this));
        this.gameEmitter.on("boom",this.addBoom.bind(this));
        this.arrBubble = [];
        this.arrObjs = [];
    },
    addBoom(data){
        //存储的数组清空
        this.arrObjs.length = 0;
        //爆炸
        this.boom(data);
        //发送消息给水花管理者
        this.gameEmitter.emit("blast",this.arrObjs);
    },
    boom(data){
        //移除泡泡
        this.removeBubbleByTile(data.tilePos);

        this.pushTile(data.tilePos,"center");
        let arrDir = ["up","down","left","right"];
        for (let value of arrDir){
            this.findInfoByDir(data.tilePos,data.power,value);
        }
        //查找所有可以波及的格子
    },
    findInfoByDir(tilePos,power,dirName){
            let dirObjs = {up:cc.v2(0,-1),down:cc.v2(0,1),left:cc.v2(-1,0),right:cc.v2(1,0)};
            let dir = dirObjs[dirName];
            //根据威力去查找
            for (let i=1;i<=power;i++){
                let tile = tilePos.clone();
                tile.x+=dir.x*i;
                tile.y+=dir.y*i;
                if (this.tiledMapCtrl.isOutOfMap(tile)){
                    return;
                }
                let prop = this.tiledMapCtrl.getProperty(tile);
                if (!prop){
                    let bubble = this.getBubbleByTile(tile);
                    if (bubble){
                        this.boom({tilePos: tile,power:bubble.power});
                    }
                    else {
                        this.pushTile(tile,dirName);
                    }
                    continue;
                }
                if (prop&&"true"===prop.blast){
                    this.tiledMapCtrl.removeByTile(tile);
                    this.pushTile(tile,dirName);
                    break;
                }
                else {
                    break;
                }
            }
    },
    pushTile(tilePos,dirName){
        this.arrObjs.push({tilePos: tilePos,dirName:dirName});
    },
    addBubble(data){
        let tilePos = this.tiledMapCtrl.getTiledByPos(data.pos);
        let centerPos = this.tiledMapCtrl.getPosByTiled(tilePos);
        if (this.getBubbleByTile(tilePos)){
            return;
        }
        let bubbleNode = cc.instantiate(this.bubblePre);
        let bubbleJs = bubbleNode.getComponent("Bubble");
        bubbleJs.init(data);
        bubbleNode.parent = this.tiledMapCtrl.node;

        bubbleNode.position = centerPos;
        this.arrBubble.push(bubbleJs);
    },
    getBubbleByTile(tilePos){
        // for (let value of this.arrBubble){
        for (let i=0;i<this.arrBubble.length;i++){
            let bubbleTile = this.tiledMapCtrl.getTiledByPos(this.arrBubble[i].node.position);
            if (tilePos.equals(bubbleTile)){
                return this.arrBubble[i];
            }
        }
        return null;
    },
    removeBubbleByTile(tilePos) {
        for (let i = 0; i < this.arrBubble.length;) {
            let bubble = this.arrBubble[i];
            let tile = this.tiledMapCtrl.getTiledByPos(bubble.node.position);
            if (tile.equals(tilePos)) {
                this.arrBubble.splice(i, 1);
                bubble.node.destroy();
            }
            else {
                i++;
            }
        }
    }

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {},

    // start () {
    //
    // },


    // update (dt) {},
});
