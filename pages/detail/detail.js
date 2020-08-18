import Dialog from "../../miniprogram_npm/@vant/weapp/dialog/dialog";
import Toast from "../../miniprogram_npm/@vant/weapp/toast/toast";

Page({
  onReady() {
    this.videoContext = wx.createVideoContext("myVideo");
  },
  onLoad(options) {
    let id = options.id;
    if (id !== undefined) {
      this.setData({
        id: id,
      });
    }
    this.getsoundData();
    this.getdramabysound();
    wx.showShareMenu({
      // 要求小程序返回分享目标信息
      withShareTicket: true,
    });
  },
  data: {
    id: 2306334,
    info: "",
    drama: "",
    tabActive: 0,
    is_like: false,
    is_unfold: false, //控制简介是否展开
    danmu: "",
    danmulist: [
      {
        text: "第一条弹幕",
        color: "#ff0000",
        time: 1,
      },
    ],
    commentList: [],
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
  getdramabysound() {
    let _this = this;
    wx.request({
      url:
        "https://www.missevan.com/dramaapi/getdramabysound?sound_id=" +
        _this.data.id,

      header: {
        "content-type": "application/json", // 默认值
      },
      success(res) {
        _this.setData({
          drama: res.data.info.drama,
        });
      },
    });
  },
  getcomment() {
    let _this = this;
    wx.request({
      url: "https://www.missevan.com/site/getcomment",
      data: {
        order: 1,
        pagesize: 10,
        type: 1,
        eId: 2306334,
        p: 1,
      },
      header: {
        "content-type": "application/json", // 默认值
      },
      success(res) {
        _this.setData({
          commentList: res.data.successVal.comment.Datas,
        });
        console.log(_this.data.commentList);
      },
    });
  },
  danmuChange(event) {
    let _this = this;
    let val = event.detail;
    this.setData({
      danmu: val,
    });
  },
  // 发弹幕
  sendDanmu() {
    let _this = this;
    if (this.data.danmu === "") {
      Toast("不能发送空白文本");
    } else {
      // this.data.danmulist.push(_this.data.danmu)
      // this.setData({
      //   danmulist: _this.data.danmulist,
      //   danmu: "",
      // });
      this.videoContext.sendDanmu({
        text: this.data.danmu,
        color: "#f00",
      });

      console.log(this.data.danmulist);
    }
  },
  //随机颜色
  getRandomColor() {
    let rgb = [];
    for (let i = 0; i < 3; ++i) {
      let color = Math.floor(Math.random() * 256).toString(16);
      color = color.length == 1 ? "0" + color : color;
      rgb.push(color);
    }
    return "#" + rgb.join("");
  },
  //喜欢
  isLikeHandle() {
    let _this = this;
    this.setData({
      is_like: !_this.data.is_like,
    });
    if (this.data.is_like) {
      wx.showToast({
        title: `已添加到喜欢`,
        icon: "none",
      });
    } else {
      wx.showToast({
        title: `已从喜欢中删除`,
        icon: "none",
      });
    }
  },
  //下载
  downloadHandle() {
    Dialog.confirm({
      title: "请先下载客户端",
      message: "下载客户端发现更多有趣内容>W<",
      confirmButtonText: "现在下载",
      cancelButtonText: "我知道了",
    })
      .then(() => {
        // on confirm
      })
      .catch(() => {
        // on cancel
      });
  },
  //简介展开收起
  unfoldHandle() {
    let _this = this;
    this.setData({
      is_unfold: !_this.data.is_unfold,
    });
  },
  tabChange(event) {
    console.log(event.detail);
    this.setData({
      tabActive: event.detail.index,
    });
    if (event.detail.index === 1) {
      this.getcomment();
    }
  },
});
