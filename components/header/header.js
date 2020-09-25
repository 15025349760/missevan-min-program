var app = getApp();
Component({
  data: {
    show: false,
    key_words: ""
  },
  options: {
    addGlobalClass: true,
    styleIsolation: 'apply-shared'
  },
  externalClasses: ['icon-sousuo', 'icon-class', 'icon-gengduo', 'font-22', 'margin-right-15'],
  properties: {
    isSearch: {
      type: Number,
      value: 0
    }
  },
  methods: {
    inputOnChange(e) {
      let keyWords = e.detail.value
      this.triggerEvent('keyWords', keyWords)
    },
    showLoginHandle(e) {
      let _this = this
      this.setData({
        show: !_this.data.show
      });
      console.log(e)
    },
    // search
    linkToSearch() {
      wx.navigateTo({
        url: "/pages/search/search",
      });
    },
    onClose() {
      this.setData({
        show: false
      });
    },
    backHome() {
      wx.navigateTo({
        url: "/pages/index/index",
      });
    }
  },


});