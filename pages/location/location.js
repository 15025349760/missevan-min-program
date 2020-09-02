import Toast from "../../miniprogram_npm/@vant/weapp/toast/toast";

//<!-- 经度106.596879,纬度29.548630 -->   106.566220,29.498687
Page({
    onShareAppMessage() {
        return {
            title: 'cover-view',
            path: 'page/component/pages/cover-view/cover-view'
        }
    },
    data: {
        lng: '', //默认地址上新街
        lat: "",
        markers: [{ //标记点
                iconPath: "../../images/location-marker.png",
                id: 0,
                latitude: 29.548630,
                longitude: 106.596879,
                width: 20,
                height: 20
            },
            {
                iconPath: "../../images/location-marker.png",
                id: 0,
                latitude: 29.498687,
                longitude: 106.566220,
                width: 20,
                height: 20
            },
        ],
        polyline: [{ //路线，指定一系列坐标点，从数组第一项连线至最后一项
            points: [{
                longitude: 106.596879,
                latitude: 29.548630
            }, {
                longitude: 106.566220,
                latitude: 29.498687
            }],
            color: "#FF0000DD",
            width: 2,
            dottedLine: true, //是否虚线
            arrowLine: true,
            arrowIconPath: true
        }],
        is_3d: false,
        show_popup: false,
        addresslist: [{
                text: '上新街',
                value: 1,
                lng: '106.596879',
                lat: "29.548630",
            },
            {
                text: '六公里',
                value: 2,
                lng: '106.566220',
                lat: "29.498687",
            },
        ],
        value1: 0,
        endPoint: {}, //终点
        endPoint_name: "选择终点",
        startPoint: {}, //起点
        startPoint_name: "选择起点（默认当前位置）",

    },
    onLoad() {
        let _this = this
        this.getLocation()
        const timer = setTimeout(() => {
            if (_this.data.lng !== "" && _this.data.lat !== "") {
                clearInterval(timer);
                Toast.clear();
            } else {
                Toast.loading({
                    message: '加载中...',
                    forbidClick: true,
                    loadingType: 'spinner',
                });
            }
        })

        // this.chooseLocation()
    },

    //获取当前位置信息
    getLocation() {
        let _this = this
        wx.getLocation({
            type: 'wgs84',
            success(res) {
                console.log(res)
                Toast.success('获取定位成功');
                let current_address = {
                    text: '当前位置',
                    value: 0,
                    lng: res.longitude,
                    lat: res.latitude,
                }
                _this.data.addresslist.unshift(current_address)
                _this.setData({
                    addresslist: _this.data.addresslist,
                    lng: res.longitude,
                    lat: res.latitude,
                })
                console.log(_this.data.addresslist)
            },
            fail: function (errInfo) {
                Toast.fail('获取定位失败');
                console.info(errInfo)
            }

        })
    },
    //选择地点
    chooseLocation(e) {
        console.log(e);
        let _this = this
        wx.chooseLocation({
            success: function (res) {
                console.log(res)
                let marker_item = {
                    iconPath: "../../images/location-marker1.png",
                    id: 0,
                    latitude: res.latitude,
                    longitude: res.longitude,
                    width: 20,
                    height: 20
                }
                let newtext = res.name + "(" + res.address + ")"
                let current_address = {
                    text: newtext,
                    value: 0,
                    lng: res.longitude,
                    lat: res.latitude,
                }
                _this.data.addresslist.push(current_address)
                _this.data.markers.push(marker_item)
                _this.setData({
                    lng: res.longitude,
                    lat: res.latitude,
                    markers: _this.data.markers,
                    addresslist: _this.data.addresslist,

                })
                let isend = e.currentTarget.dataset.isend

                if (parseInt(isend)) { //判断是起点还是终点
                    _this.setData({
                        endPoint: {
                            'name': res.name,
                            'latitude': res.latitude,
                            'longitude': res.longitude
                        },
                        endPoint_name: res.name
                    })
                } else {
                    _this.setData({
                        startPoint: {
                            'name': res.name,
                            'latitude': res.latitude,
                            'longitude': res.longitude
                        },
                        startPoint_name: res.name
                    })
                }

            },
        })
    },
    //打开地图
    openLocation() {
        wx.getLocation({
            type: 'gcj02', //返回可以用于wx.openLocation的经纬度
            success(res) {
                const latitude = res.latitude
                const longitude = res.longitude
                wx.openLocation({
                    latitude,
                    longitude,
                    scale: 18
                })
            }
        })
    },
    //路线规划
    pathHandle() {
        let plugin = requirePlugin('routePlan');
        let key = 'TWLBZ-W6UCX-LPR4F-7AP3E-6GSJ5-WTB4U'; //使用在腾讯位置服务申请的key
        let referer = '二叽不服气'; //调用插件的app的名称
        console.log(this.data.endPoint)

        if (Object.keys(this.data.endPoint).length <= 0) {
            Toast.fail("请选择终点")
        } else {
            let endPoint = JSON.stringify(this.data.endPoint);
            let startPoint = JSON.stringify(this.data.startPoint);
            console.log(Object.keys(startPoint).length)
            if (Object.keys(startPoint).length >= 0) { //判断有没有起点
                console.log(111)
                wx.navigateTo({
                    url: 'plugin://routePlan/index?key=' + key + '&referer=' + referer + '&endPoint=' + endPoint
                });
            } else {
                wx.navigateTo({
                    url: 'plugin://routePlan/index?key=' + key + '&referer=' + referer + '&startPoint=' + startPoint + '&endPoint=' + endPoint
                });
            }

        }

    },

    //点击marker触发的事件
    clickMarker() {
        this.setData({
            show_popup: true
        });
    },
    //输入经纬度
    FieldHandle(e) {
        console.log(e)
        if (e.target.dataset.type === "lng") {
            this.setData({
                lng: e.detail
            })
        } else {
            this.setData({
                lat: e.detail
            })
        }
    },
    dropdownChange(e) {
        let index = e.detail
        this.data.addresslist[index]
        this.setData({
            lng: this.data.addresslist[index].lng,
            lat: this.data.addresslist[index].lat,
        })

    },
    //控制是否3d
    threeDHandle({
        detail
    }) {
        this.setData({
            is_3d: detail
        });
    },
    onClose() {
        this.setData({
            show_popup: false
        });
    },
    regionchange(e) { //视野改变时触发的函数
        console.log(e.type)
    },
    markertap(e) {
        console.log(e.detail.markerId)
    },
    controltap(e) {
        console.log(e.detail.controlId)
    }
})