
cc.Class({
    extends: cc.Component,

    properties: {

    },

    // LIFE-CYCLE CALLBACKS:

    onLoad: function () {

        cc.loader.loadRes("data/keyCode", function (err, res) {
            if (err) {
                cc.error(err.message || err);
                return;
            }
            cc.dataMgr.keyCodeDt = {
                keyCode: res,
                getDataByID: function(id){
                    // for (let value of this.keyCode) {
                    for (let i=0;i<this.keyCode.length;i++){
                        if (id === this.keyCode[i].id) {
                            return this.keyCode[i];
                        }
                    }
                    return null;
                }
            };
        })
    },

    start () {

    },

    // update (dt) {},
});
