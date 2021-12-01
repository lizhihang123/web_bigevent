// 1.1 获取裁剪区域的 DOM 元素
// 这个是大的图片
var $image = $('#image')
// 导入layer
var layer = layui.layer;
// 1.2 配置选项
const options = {
    // 纵横比
    // 鼠标放上去，是一个正方形的放大框
    aspectRatio: 1,
    // 指定预览区域
    // 指定的预览区域是.img-previwq这个选项框
    preview: '.img-preview'
}

// 1.3 创建裁剪区域
// 调用cropper这个函数，options放进去
$image.cropper(options)


// 2. 文件上传
$("#image_file").hide();

// 3. 模拟点击事件
$("#image_file_open").on("click", function () {
    $("#image_file").click();
})


// 4. 给input绑定一个点击的事件
$("#image_file").on("change", function (e) {
    // console.log(e.target.files);
    if (e.target.files.length === 0) {
        return console.log('请上传图片')
    }
    // 5. 获取files对象的第一个元素【图片】
    var files = e.target.files[0];
    // 6. 创建一个url地址
    var newImgURL = URL.createObjectURL(files);
    // 7. 旧的图片删去，新的图片的src属性更改，重新调用cropper，渲染到页面
    $image.cropper("destroy").attr("src", newImgURL).cropper(options);
})


$("#btn_sure").on("click", function () {
    //8. 拿到用户裁剪的头像，最终结果是字符串
    var dataURL = $image
        .cropper('getCroppedCanvas', { // 创建一个 Canvas 画布
            width: 100,
            height: 100
        }).toDataURL('image/png')       // 将 Canvas 画布上的内容，转化为 base64 格式的字符串
    // 9. 发起ajax请求
    $.ajax({
        method: 'POST',
        url: '/my/update/avatar',
        data: {
            avatar: dataURL // 【头像数据】转化为base64格式的字符串发送给下面的调用的函数，
            // 下面的函数又会通过res.data参数传递给render函数渲染到页面，
        },
        success: function (res) {
            if (res.status !== 0) {
                return layer.msg('请求失败');
            }
            layer.msg("请求成功");
            window.parent.getUserinfo();
        }
    })
})