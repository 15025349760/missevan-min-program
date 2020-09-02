Page({
    data: {
        show: false
    },
    showLoginHandle(e) {
        this.setData({
            show: true
        });
        console.log(e)
    },
    onClose() {
        this.setData({
            show: false
        });
    },
})