//Component Object
Page({
    properties: {
        actionIndex: {
            type: String,
        }
    },

    data: {
        tabActive: 1,
    },
    onLoad(option) {
        console.log(option);
        let actionIndex = parseInt(this.data.actionIndex)
        this.setData({
            tabActive: actionIndex,
        })
    },
    // methods: {
    onChange(event) {

        // this.setData({
        //     tabActive: parseInt(event.detail.index)
        // })
        console.log(this.data.tabActive)
        if (event.detail.index === 0) {
            wx.navigateTo({
                url: "/pages/music-list/music-list?active=" + 0,
            });
        } else if (event.detail.index === 1) {
            wx.navigateTo({
                url: "/pages/index/index?active=" + 1,
            });
        } else if (event.detail.index === 2) {
            wx.navigateTo({
                url: "/pages/classify/classify?active=" + 2,
            });
        }
    },
    // },
    created: function () {
        let actionIndex = this.data.actionIndex
        this.setData({
            tabActive: actionIndex
        })
    },
    attached: function () {

    },
    ready: function () {

    },
    moved: function () {

    },
    detached: function () {

    },
});