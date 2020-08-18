Page({
    data: {
        albums: ''
    },
    onLoad() {
        this.getTagalbumData()
    },
    getTagalbumData() {
        let _this = this;
        wx.request({
            url: "https://www.missevan.com/explore/tagalbum?order=0",
            header: {
                "content-type": "application/json", // 默认值
            },
            success(res) {
                _this.setData({
                    albums: res.data.albums,
                });
                console.log(_this.data.albums);
            },
        });
    },

})