let Utils = {};

Utils.isInArray = function(obj,arrObjs){
    // for (let value of arrObjs){
    for (let i=0;i<arrObjs.length;i++) {
        if (obj === arrObjs[i]){
            return true;
        }
    }
    return false;
}
Utils.loadFile = function(path,cllback){
    let loading = (err,res) =>{
        if (err){
            cc.error(err.message||res);
            return;
        }
        cllback(res);
    }
    cc.loader.loadRes(path,loading);
}



module.exports = Utils;