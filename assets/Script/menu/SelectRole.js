
let Code = require("Code");
cc.Class({
    extends: cc.Component,

    properties: {
        //序列化两个节点数组，接收角色节点和箭头节点
        arrRoleNode:[cc.Node],
        arrArrowNode:[cc.Node],
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad () {
        //定义两个索引，表示选择箭头（Code自己写的类，提供给全局使用）
        this.index1 = Code.ROLE_INDEX.ROLE_0;
        this.index2 = Code.ROLE_INDEX.ROLE_3;

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
        switch (event.keyCode) {
            case cc.KEY.a:
                //按A键玩家一索引递减
                this.index1--;
                //如果索引小于最小值，将其设置为最大
                if (Code.ROLE_INDEX.ROLE_0>this.index1){
                    this.index1=Code.ROLE_INDEX.ROLE_3;
                }
                //将箭头位置设置到相应索引角色的位置
                this.arrArrowNode[0].x=this.arrRoleNode[this.index1].x;
                break;
            case cc.KEY.d:
                this.index1++;
                if (Code.ROLE_INDEX.ROLE_3<this.index1){
                    this.index1=Code.ROLE_INDEX.ROLE_0;
                }
                this.arrArrowNode[0].x=this.arrRoleNode[this.index1].x;
                break;
            case cc.KEY.left:
                this.index2--;
                if (Code.ROLE_INDEX.ROLE_0>this.index2){
                    this.index2=Code.ROLE_INDEX.ROLE_3;
                }
                this.arrArrowNode[1].x=this.arrRoleNode[this.index2].x;
                break;
            case cc.KEY.right:
                this.index2++;
                if (Code.ROLE_INDEX.ROLE_3<this.index2){
                    this.index2=Code.ROLE_INDEX.ROLE_0;
                }
                this.arrArrowNode[1].x=this.arrRoleNode[this.index2].x;
                break;
        }
    },
    onKeyup(){

    },
    start () {

    },

    // update (dt) {},
});
