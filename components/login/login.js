const QR = require("../../utils/weapp.qrcode.min");

Component({
    data: {

    },

    ready() {
        console.log(QR)
        QR({
            width: 200,
            height: 200,
            canvasId: 'canvas',
            foreground: '#243F62',
            text: '戈绝吃屁',
            callback: function () {},
            image: {
                imageResource: '../../images/default-icon.jpg',
                dx: 70,
                dy: 70,
                dWidth: 60,
                dHeight: 60
            }
        })
    },

})