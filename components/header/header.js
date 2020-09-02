Component({
  data: {
    show: false,
    key_words: ""
  },
  options: {
    addGlobalClass: true
  },
  externalClasses: ['icon-sousuo', 'icon-class', 'icon-gengduo', 'font-22', 'margin-right-15'],
  properties: {
    isSearch: {
      type: Number,
      value: 0
    }
  },
  methods: {
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
  }

});