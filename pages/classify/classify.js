const app = getApp();
Page({

    data: {
        gridList: []
    },

    onLoad() {
        this.getCatalogroot()
    },
    getCatalogroot() {
        let _this = this
        app.request.get("/mobileWeb/catalogroot", {}, (res) => {
            _this.setData({
                gridList: res.data.info
            })
        })
    }
})