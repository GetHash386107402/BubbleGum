// Learn cc.Class:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/class.html
//  - [English] http://www.cocos2d-x.org/docs/creator/en/scripting/class.html
// Learn Attribute:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/reference/attributes.html
//  - [English] http://www.cocos2d-x.org/docs/creator/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/life-cycle-callbacks.html
//  - [English] http://www.cocos2d-x.org/docs/creator/en/scripting/life-cycle-callbacks.html

cc.Class({
    extends: cc.Component,

    properties: {
       tmxAsset:[cc.TiledMapAsset]
    },

    // LIFE-CYCLE CALLBACKS:

    /*onLoad () {},

    start () {

    },*/
    init(){
        let allIndex = cc.dataMgr.Index;
        this.tileMap = this.node.getComponent(cc.TiledMap);
        this.tileMap.tmxAsset = this.tmxAsset[allIndex.mapIndex];
        this.tileSize = this.tileMap.getTileSize();
        this.mapSize = this.tileMap.getMapSize();
        this._initzIndex();
        cc.log(this.getProperty(cc.v2(1,12)));
    },
    _initzIndex(){
        for (let i=1;i<=13;i++){
            let name = "obstacle"+i;
            let layer = this.tileMap.getLayer(name);
            layer.node.zIndex = i;
        }
    },
    getInitPos(){
        let arrPos = [];
        let objGroup = this.tileMap.getObjectGroup("initPos");
        let objects = objGroup.getObjects();
        for (let key of Object.keys(objects)) {
            let obj = objects[key];
            let pos = cc.v2(obj.offset.x,obj.offset.y);
            let tiledX = Math.floor(pos.x/this.tileSize.width);
            let tiledY = Math.floor(pos.y/this.tileSize.height);
            let initPos = this.getPosByTiled(cc.v2(tiledX,tiledY));
            arrPos.push(initPos);
        }
        return arrPos;
    },
    getTiledByPos(pos){
        let tiledX = Math.floor(pos.x/this.tileSize.width);
        let tiledY = this.mapSize.height-1-Math.floor(pos.y/this.tileSize.height);
        return cc.v2(tiledX,tiledY);
    },
    getPosByTiled(tilePos){
        let x = tilePos.x*this.tileSize.width+this.tileSize.width/2;
        let y = (this.mapSize.height-tilePos.y-1)*this.tileSize.height+this.tileSize.height/2;
        return cc.v2(x,y);
    },
    isOutOfMap(tilePos){
        if (0>tilePos.x||this.mapSize.width-1<tilePos.x
            ||0>tilePos.y||this.mapSize.height-1<tilePos.y){
             return true;
        }
        return false;
    },
    getProperty(tilePos){
        let name = "obstacle"+(tilePos.y+1);
        let layer = this.tileMap.getLayer(name);
        let GID = this.getGID(tilePos,layer);
        let properties = this.tileMap.getPropertiesForGID(GID);

        if (undefined === properties){
            return null;
        }
        return properties;
    },
    getGID(tilePos,layer){
        let GID = layer.getTileGIDAt(tilePos);
        return GID;
    },
    getColliPos(pos,dir){
        let x = pos.x + dir.x*this.tileSize.width/2;
        let y = pos.y + dir.y*this.tileSize.height/2;
        let tilePos = this.getTiledByPos(cc.v2(x,y));
        return tilePos;
    },
    moveBox(layerIndex,tilePos,dir){
        let name = "obstacle"+layerIndex;
        let layer = this.tileMap.getLayer(name);
        let nextTile = cc.v2(tilePos.x+dir.x,tilePos.y-dir.y);
        if (nextTile.y<0){
            layer.removeTileAt(tilePos);
            return;
        }
        let sprite = layer.getTileAt(tilePos);
        sprite.x+=dir.x*this.tileSize.width;
        sprite.y+=dir.y*this.tileSize.height;


        name = "obstacle" + (layerIndex-dir.y);
        let nextLayer = this.tileMap.getLayer(name);
        let GID = layer.getTileGIDAt(tilePos);
        nextLayer.setTileGID(GID,nextTile);

        layer.removeTileAt(tilePos);

    },
    removeByTile(tilePos){
        let name = "obstacle"+(tilePos.y+1);
        let layer = this.tileMap.getLayer(name);
        let upTile = cc.v2(tilePos.x,tilePos.y-1);
        layer.removeTileAt(tilePos);
        if (!this.isOutOfMap(upTile)){
            layer.removeTileAt(upTile);
        }
    }

    // update (dt) {},
});
