var app = getApp();
Page({
    data: {
        hot_search: [],
        keyWords: "",
        keyWordsList: []
    },

    onLoad() {
        this.gethotsearch()
    },
    // 关键字搜索请求
    getSuggest(e) {
        let keyWords = e.detail
        this.setData({
            keyWords: keyWords
        })
        let _this = this
        app.request.get("/sound/suggest", {
            s: keyWords
        }, (res) => {
            _this.setData({
                keyWordsList: res.data.info
            })
        })
        console.log(_this.data.keyWordsList)
    },
    // 热搜排名请求
    gethotsearch() {
        let _this = this
        app.request.get("/mobileWeb/hotsearch", {}, (res) => {
            _this.setData({
                hot_search: res.data.info
            })
            console.log(_this.data.hot_search)
        })
    },


})