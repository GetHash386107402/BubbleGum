let Managers = require("Managers");
class MoveCtrl {
    constructor(owner){
        this.owner = owner;
        this.speed = 0;
        //方向
        this.velocity = cc.v2(0,0);
        this.tiledMapCtrl = Managers.getInstance().getManager("tiledMapCtrl");
        this.bubbleMgr = Managers.getInstance().getManager("BubbleMgr");
        this.playerMgr = Managers.getInstance().getManager("PlayerMgr");
    }
    _collisionObjs(){
        let dir = this.velocity;
        let collisionTile = this.tiledMapCtrl.getColliPos(this.owner.node.position,dir);
        if (this.tiledMapCtrl.isOutOfMap(collisionTile)){
            return true;
        }
        let colliProp = this.tiledMapCtrl.getProperty(collisionTile);
        //取得玩家运动方向的下一个格子
        let playerTile = this.tiledMapCtrl.getTiledByPos(this.owner.node.position);
        let nextMoveToTile = cc.v2(playerTile.x+dir.x,playerTile.y-dir.y);

        if (!colliProp){
            if (this.isColliBubble(collisionTile)){
                if (!this.isColliBubble(nextMoveToTile)){
                    return false;
                }
                else {
                    return true;
                }
            }
            return false;
        }
        if ("false"===colliProp.colli) {
            return false;
        }
        //推箱子
        if ("true"=== colliProp.push){
            // if (this.tiledMapCtrl.isOutOfMap(cc.v2(collisionTile.x+dir.x,collisionTile.y-dir.y))){
            //     return true;
            // }


            let nextTilePos = cc.v2(collisionTile.x+dir.x,collisionTile.y-dir.y);
            let upTilePos = cc.v2(collisionTile.x, collisionTile.y - 1);
            // let nextColliProp = this.tiledMapCtrl.getProperty(nextTilePos);
            // if (nextColliProp && nextColliProp.colli ==="true") {
            //     return true;
            // }
            if (this.isColli(nextTilePos)) {
                return true;
            }
            //箱子后面是否有玩家
            if (this.playerMgr.getPlayerByTile(nextTilePos)){
                return true;
            }
            //当前箱子后面是否有泡泡
            if (this.bubbleMgr.getBubbleByTile(nextTilePos)){
                return true;
            }
                this.tiledMapCtrl.moveBox(collisionTile.y + 1, upTilePos, dir);
                this.tiledMapCtrl.moveBox(collisionTile.y + 1, collisionTile, dir);

        }
        return true;
    }
    isColliBubble(tilePos){
        if (this.tiledMapCtrl.isOutOfMap(tilePos)){
            return false;
        }
        if (this.bubbleMgr.getBubbleByTile(tilePos)){
            return true;
        }
        return false;
    }
    isColli(tilePos){
        if (this.tiledMapCtrl.isOutOfMap(tilePos)){
            return true;
        }
        let nextColliProp = this.tiledMapCtrl.getProperty(tilePos);
        if (nextColliProp && nextColliProp.colli ==="true") {
            return true;
        }
        return false;
    }
    UpDate(dt){
        if (this._collisionObjs()){
            this.velocity.x = 0;
            this.velocity.y = 0;
            return;
        }

        this.owner.node.x += this.velocity.x*this.speed*dt;
        this.owner.node.y += this.velocity.y*this.speed*dt;

        let playerPos = this.owner.node.position;
        let tilePos = this.tiledMapCtrl.getTiledByPos(playerPos);
        this.owner.node.zIndex = tilePos.y+1;
    }
}

module.exports = MoveCtrl;