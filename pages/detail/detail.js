Page({
  onLoad(options) {
    let id = options.id;
    if (id !== undefined) {
      this.setData({
        id: id,
      });
    }
    this.getsoundData();
  },
  data: {
    id: 164094,
    info: "",
    tabActive: 0,
  },
  getsoundData() {
    let _this = this;
    wx.request({
      url: "https://www.missevan.com/sound/getsound?soundid=" + _this.data.id,

      header: {
        "content-type": "application/json", // 默认值
      },
      success(res) {
        _this.setData({
          info: res.data.info,
        });
        console.log(_this.data.info.sound.soundurl);
      },
    });
  },

  tabChange(event) {
    console.log(event.detail);
    this.setData({
      tabActive: event.detail.index,
    });
    if (event.detail.index === 0) {
    }
  },
});
