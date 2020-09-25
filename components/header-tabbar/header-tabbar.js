Page({
    data: {
        tabActive: 1,
    },
    // methods: {
    onChange(event) {
        console.log(this.data.actionIndex);
        this.setData({
            tabActive: parseInt(event.detail.index)
        })
        console.log(this.data.tabActive)
        if (event.detail.index === 0) {
            wx.navigateTo({
                url: "/pages/music-list/music-list",
            });
        } else if (event.detail.index === 1) {
            wx.navigateTo({
                url: "/pages/index/index",
            });
        } else if (event.detail.index === 2) {
            wx.navigateTo({
                url: "/pages/classify/classify",
            });
        }
    },
    // },
})