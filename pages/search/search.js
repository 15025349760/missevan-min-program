Page({
    methods: {
        onMyEvent: function (e) {

            this.setData({
                isSearch: e.detail.isSearch
            })
        }
    }
})