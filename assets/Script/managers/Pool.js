class Pool{
    constructor(size,prefab,name){
        this.pool = new cc.NodePool();
        this.size = size;
        this.prefab = prefab;
        this.name = name;
        for(let i = 0; i < size; i++){
            let node = cc.instantiate(prefab);
            node.name = name;
            this.pool.put(node);
        }
    }
    getNode(){
        let node = null;
        if(this.pool.size() > 0){
            node = this.pool.get();
        }
        else{
            node = cc.instantiate(this.prefab);
        }
        return node;
    }
    putNode(node){
        if(node.name !== this.name){
            return false;
        }
        if(this.pool.size() < this.size){
            this.pool.put(node);
            return true;
        }
        return false;
    }
}

module.exports = Pool;