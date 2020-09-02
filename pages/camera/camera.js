Page({
    data: {
        url: '',
        base64: '',
        value: ''
    },
    inputChange() {
        console.log(this.data.value)
    },
    downloadFile() {
        wx.downloadFile({
            url: "http://static.missevan.com/coversmini/202004/20/2ac3f14cafed5f501e7cc457d650b785120947.jpg", //仅为示例，并非真实的资源
            success(res) {
                console.log("444")
                // 只要服务器有响应数据，就会把响应内容写入文件并进入 success 回调，业务需要自行判断是否下载到了想要的内容
                if (res.statusCode === 200) {
                    console.log(555555)
                    wx.playVoice({
                        filePath: res.tempFilePath
                    })
                }
            }
        })
        const downloadTask = wx.downloadFile({
            url: 'http://example.com/audio/123', //仅为示例，并非真实的资源
            success(res) {
                wx.playVoice({
                    filePath: res.tempFilePath
                })
            }
        })

        downloadTask.onProgressUpdate((res) => {
            console.log('下载进度', res.progress)
            console.log('已经下载的数据长度', res.totalBytesWritten)
            console.log('预期需要下载的数据总长度', res.totalBytesExpectedToWrite)
        })

        downloadTask.abort()
    },

    upload: function () {
        var _this = this;

        //调用上传
        _this.chooseImage(1, "[compressed']", " ['album', 'camera']", function (images) {
            var url = images.tempFilePaths[0];

            //图片转换 base64
            _this.getFileSystemManager_readFile(url, "base64", function (data) {
                var base64 = "data:image/jpeg;base64," + data.data;
                console.log(url)
                _this.setData({
                    url: url,
                    base64: base64
                })
                // wx.request({
                //     url: 'http://plantapi.xingseapp.com/item/identification', //仅为示例，并非真实的接口地址
                //     data: {
                //         image_url: url,
                //         image_data: base64,
                //     },
                //     header: {
                //         'content-type': 'application/json' // 默认值
                //     },
                //     success(res) {
                //         console.log(res.data)
                //     }
                // })
            })
        });
    },
    //图片上传 
    //count  最多可以选择的图片张数 9
    //sizeType  指定原图还是压缩图  ['original','compressed']
    //sourceType  指定相册还是相机  ['album', 'camera']
    //callback  完成后回调函数
    chooseImage: function (count, sizeType, sourceType, callback) {
        var _this = this;
        wx.chooseImage({
            count: count,
            sizeType: sizeType,
            sourceType: sourceType,
            success: function (res) {
                callback(res);
            }
        });
    },
    //读取本地文件内容
    //filePath  图片路径
    //encoding  转换类型  ascii base64  binary  hex......
    //callback  完成后回调函数
    getFileSystemManager_readFile: function (filePath, encoding, callback) {
        var _this = this;
        wx.getFileSystemManager().readFile({
            filePath: filePath,
            encoding: encoding,
            success: function (res) {
                callback(res);
            }
        });
    },
})