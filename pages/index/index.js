//index.js
//获取应用实例
const app = getApp();

Page({
  onShareAppMessage() {
    return {
      title: "swiper",
      path: "page/component/pages/swiper/swiper",
    };
  },
  data: {
    tabActive: 1,
    banner: [],
    sound: [],
    home_list: [],
  },

  onLoad() {
    this.getData();
    this.newhomepagedata();
  },
  onShow() {},
  getData() {
    let _this = this;
    wx.request({
      url: "https://www.missevan.com/mobileWeb/newHomepage3",
      data: {
        x: "",
        y: "",
      },
      header: {
        "content-type": "application/json", // 默认值
      },
      success(res) {
        let sound = res.data.info.sound.slice(0, 3);
        _this.setData({
          banner: res.data.info.banner,
          sound: sound,
        });
      },
    });
  },
  newhomepagedata() {
    let _this = this;
    wx.request({
      url: "https://www.missevan.com/sound/newhomepagedata",
      data: {
        x: "",
        y: "",
      },
      header: {
        "content-type": "application/json", // 默认值
      },
      success(res) {
        _this.setData({
          home_list: res.data.info.music,
        });
      },
    });
  },
  LinkToDetail(e) {
    console.log(e.currentTarget.dataset.id);
    let id = e.currentTarget.dataset.id;
    wx.navigateTo({
      url: "/pages/detail/detail?id=" + id,
    });
  },

  // //事件处理函数
  // onChange(event) {
  //   console.log(event.detail);
  //   if (event.detail.index === 0) {
  //     wx.navigateTo({
  //       url: "/pages/music-list/music-list",
  //     });
  //   } else if (event.detail.index === 2) {
  //     wx.navigateTo({
  //       url: "/pages/classify/classify",
  //     });
  //   }
  // },
  //传值子组件
  get_emit: function (e) {
    console.log(e)
    this.setData({
      is_show: e.detail.val
    })
  },
});