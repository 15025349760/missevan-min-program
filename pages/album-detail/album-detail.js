Page({
    onLoad(options) {
        if (options.id) {
            this.setData({
                id: options.id
            })
        }
        this.getSoundalllist()
        wx.startPullDownRefresh();
    },
    data: {
        id: '259458',
        info: {},

        pageNo: 1, // 设置加载的第几次，默认是第一次  
        pageSize: 10, //返回数据的个数  
        searchLoading: false, //"上拉加载"的变量，默认false，隐藏  
        searchLoadingComplete: false, //“没有数据”的变量，默认false，隐藏  
        list: []
    },
    getSoundalllist() {
        let _this = this
        wx.request({
            url: "https://www.missevan.com/sound/soundalllist?albumid=" + _this.data.id,
            header: {
                "content-type": "application/json", // 默认值
            },
            success(res) {
                _this.setData({
                    info: res.data.info,
                    list: res.data.info.sounds
                })
                console.log(_this.data.list)

            }
        })
    },

    onPullDownRefresh: function () {
        this.setData({
            pageNo: 1,
            storelist: [],
            searchLoading: true, //"上拉加载"的变量，默认false，隐藏  
            searchLoadingComplete: false //“没有数据”的变量，默认false，隐藏  
        })
        // this.getShopList();
    },

    onReachBottom: function () {
        if (!this.data.searchLoadingComplete) {
            var currentPageNo = this.data.pageNo;
            this.setData({
                pageNo: currentPageNo + 1,

            })
            // this.getShopList();
        }
    },
    function (result) {
        if (_this.data.pageNo == 1) {
            wx.stopPullDownRefresh(); //下拉刷新收起来
        }
        console.log('success', result.retailList);
        if (result.retailList.length < _this.data.pageSize) { //小于个数，表示没有更多了
            _this.setData({
                searchLoading: false,
                searchLoadingComplete: true
            })
        }
        _this.setData({
            storelist: _this.data.storelist.concat(result.retailList)
        })
    }


})