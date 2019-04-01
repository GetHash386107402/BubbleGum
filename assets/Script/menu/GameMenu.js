let SelectRole = require("SelectRole");
cc.Class({
    extends: cc.Component,

    properties: {
        //取到玩家选择脚本
        selectRole:SelectRole,
        //取得地图切换窗口
        mapView:cc.PageView
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad () {
        //初始化全局数据
        this.initGlobalData();
    },

    start () {

    },
    initGlobalData(){
        //插入数据管理者对象
        cc.dataMgr={};
        //插入索引数组
        cc.dataMgr.Index=[];
    },
    _getAllIndex(){
        //接收角色选择索引
        cc.dataMgr.Index["roleIndex1"]=this.selectRole.index1;
        cc.dataMgr.Index["roleIndex2"]=this.selectRole.index2;
        //拿到地图索引
        cc.dataMgr.Index["mapIndex"]=this.mapView.getComponent(cc.PageView).getCurrentPageIndex();
    },
    btnStart(){
        //取得所有索引
        this._getAllIndex();
        //切换到主场景
        cc.director.loadScene("GameMain");
    }

    // update (dt) {},
});
