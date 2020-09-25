const QR = require("../../utils/weapp.qrcode.min");

Page({
    data: {

    },
    onLoad() {
        QR({
            width: 200,
            height: 200,
            canvasId: 'mycanvas',
            foreground: '#000',
            text: '村上春花',
            callback: function () {},
            image: {
                imageResource: '../../images/ch.jpg',
                dx: 70,
                dy: 70,
                dWidth: 60,
                dHeight: 60
            }
        })
        var context = wx.createContext()
    },
    draw() {
        const ctx = wx.createCanvasContext('ctx')

        wx.chooseImage({
            success: function (res) {
                ctx.drawImage(res.tempFilePaths[0], 0, 0, 150, 100)
                ctx.draw()
            }
        })
    }
})