let MoveCtrl = require("MoveCtrl");
let StateCtrl = require("StateCtrl");
let EmitterMgr = require("EmitterMgr");
let Utils = require("Utils");
cc.Class({
    extends: cc.Component,

    properties: {

    },

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {},
    _addControlers(){
        // this.Controlers = {
        //     MoveCtrl:MoveCtrl(this),
        //     StateCtrl:StateCtrl(this)
        // };
        this.MoveCrtl = new MoveCtrl(this);
        this.StateCtrl = new StateCtrl(this);
    },
    initData(data){
        this.keyboardXL = [];
        this.playerDt={};
        this.playerDt.keyCode = data.keyCode.dir;
        cc.loader.loadRes("data/playerDt",(err,res)=>{
            if (err){
                cc.error(err.message||err);
                return;
            }
            // for (let value of res){
            for (let i=0;i<res.length;i++) {
                if (res[i].id===data.index+2001){
                    this.playerDt.curIndex = data.index;
                    this.playerDt.BubbleNum = res[i].bubbleNum;
                    this.playerDt.BubblePower = res[i].bubblePower;
                    this.playerDt.Speed = res[i].speed;
                    this.playerDt.maxBubbleNum = res[i].bubbleMaxNum;
                    this.playerDt.maxBubblePower = res[i].bubbleMaxPower;

                }
            }
            }
        )
        // this._addEvent();
        this._addControlers();
    },
    // _addEvent(){
    //     //键盘按下监听
    //     cc.systemEvent.on(cc.SystemEvent.EventType.KEY_DOWN,this.onKeydown,this);
    //     //键盘弹起监听
    //     cc.systemEvent.on(cc.SystemEvent.EventType.KEY_UP,this.onKeyup,this);
    // },
    // //键盘事件销毁
    // onDestroy(){
    //     cc.systemEvent.off(cc.SystemEvent.EventType.KEY_DOWN,this.onKeydown,this);
    //     cc.systemEvent.off(cc.SystemEvent.EventType.KEY_UP,this.onKeyup,this);
    // },
    onKeydown(event){
      let state = this.playerDt.keyCode[event.keyCode];
      if (!state){
          return;
      }
        if (state === "addBubble"){
            //给泡泡管理者发送消息
            this.gameEmitter = EmitterMgr.getInstance().getEmitter("game");
            let data ={
                pos:this.node.position,
                power:this.playerDt.BubblePower
            };
            this.gameEmitter.emit("addBubble",data);
        }
        else {
            let dirObjs = {
                "runUp": cc.v2(0, 1),
                "runDown": cc.v2(0, -1),
                "runRight": cc.v2(1, 0),
                "runLeft": cc.v2(-1, 0)
            };
            let dir = dirObjs[state];
            this.MoveCrtl.speed = this.playerDt.Speed;
            this.MoveCrtl.velocity = dir;
            this.StateCtrl.index = this.playerDt.curIndex;
            this.StateCtrl.changeState(state);
        }
    },
    onKeyup(event){
        let state = this.playerDt.keyCode[event.keyCode];
        if (!state){
            return;
        }
        let arrDir = ["runUp","runDown","runLeft","runRight"];
        if (Utils.isInArray(state,arrDir)){
            this.MoveCrtl.velocity = cc.v2(0,0);
            this.StateCtrl.changeState("idle");
        }
    },
    UpDate (dt) {
        this.MoveCrtl.UpDate(dt);
    }
});
