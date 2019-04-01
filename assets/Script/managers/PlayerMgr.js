let Managers = require("Managers");
cc.Class({
    extends: cc.Component,

    properties: {
        rolePrefabs:[cc.Prefab],
        spriteAltas:cc.SpriteAtlas
    },

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {},
    init(){
        this.tiledMapCtrl = Managers.getInstance().getManager("tiledMapCtrl");
        this.playerJsObjs=[];
        this._addPlayer();
        this._addEvent();
    },
    _addEvent(){
        //键盘按下监听
        cc.systemEvent.on(cc.SystemEvent.EventType.KEY_DOWN,this.onKeydown,this);
        //键盘弹起监听
        cc.systemEvent.on(cc.SystemEvent.EventType.KEY_UP,this.onKeyup,this);
    },
    //键盘事件销毁
    onDestroy(){
        cc.systemEvent.off(cc.SystemEvent.EventType.KEY_DOWN,this.onKeydown,this);
        cc.systemEvent.off(cc.SystemEvent.EventType.KEY_UP,this.onKeyup,this);
    },
    onKeydown(event){
        // for (let value of this.playerJsObjs){
        for (let i=0;i<this.playerJsObjs.length;i++){
            this.playerJsObjs[i].onKeydown(event);
        }
    },
    onKeyup(event){
        for (let i=0;i<this.playerJsObjs.length;i++){
            this.playerJsObjs[i].onKeyup(event);
        }
    },
    _addPlayer(){
        let arrPos = this.tiledMapCtrl.getInitPos();
        let length = arrPos.length;
        //玩家1
        let index1 =  cc.dataMgr.Index["roleIndex1"];
        let playerNode1 = cc.instantiate(this.rolePrefabs[index1]);
        playerNode1.parent = this.tiledMapCtrl.node;
        let initIndex1 = Math.floor(Math.random()*length);
        let initPos1 = arrPos[initIndex1];
        playerNode1.position = initPos1;
        let playerJs1 = playerNode1.getComponent("Player");
        let playerData1 = {keyCode:cc.dataMgr.keyCodeDt.getDataByID(1001),index:index1};
        playerJs1.initData(playerData1);
        this.playerJsObjs.push(playerJs1);


        //玩家2
        let index2 =  cc.dataMgr.Index["roleIndex2"];
        let playerNode2 = cc.instantiate(this.rolePrefabs[index2]);
        playerNode2.parent = this.tiledMapCtrl.node;
        let initIndex2 = Math.floor(Math.random()*length);
        while (initIndex1==initIndex2){
            initIndex2 = Math.floor(Math.random()*length);
        }
        let initPos2 = arrPos[initIndex2];
        playerNode2.position = initPos2;
        let playerJs2 = playerNode2.getComponent("Player");
        let playerData2 = {keyCode:cc.dataMgr.keyCodeDt.getDataByID(1002),index:index2};
        playerJs2.initData(playerData2);
        this.playerJsObjs.push(playerJs2);
    },
    getPlayerByTile(tilePos){
        for (let i=0;i<this.playerJsObjs.length;i++){
            let pos = this.playerJsObjs[i].node.position;
            let playerTiled = this.tiledMapCtrl.getTiledByPos(pos);
            if (playerTiled.equals(tilePos)){
                return this.playerJsObjs[i];
            }
        }
        return null;
    },
    UpDate (dt) {
        for (let i=0;i<this.playerJsObjs.length;i++){
            this.playerJsObjs[i].UpDate(dt);
        }
    }
});
