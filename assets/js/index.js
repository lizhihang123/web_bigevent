$(function () {

    // 1. 获取用户信息的函数
    getUserinfo();
    // 从layui上导出layer
    var layer = layui.layer;
    // 3. 退出功能
    $("#logout").on("click", function () {
        // 没有绑定成功 就是不打印ok
        console.log('ok');
        // 下面的又可以执行
        // 3.1 layer的confirm方法
        layer.confirm('确认退出登录', { icon: 3, title: '提示' }, function (index) {
            //do something
            // 3.2 清除本地存储
            localStorage.removeItem("token");
            // 3.3 如果确认退出，就跳转到登录页面
            location.href = 'login.html';
            // 3.4 关闭询问框的空间,layer自带的
            layer.close(index);
        });
    })
})

var token = localStorage.getItem('token');
// 1.1 获取用户信息
function getUserinfo() {
    $.ajax({
        method: 'GET',
        url: '/my/userinfo',
        success: function (res) {
            if (res.status !== 0) {
                return console.log(res);
            }
            // console.log(res);
            // 2. 用户信息渲染
            renderAvator(res.data);
        },
        // complete: function (res) {
        //     // console.log('执行了回调函数');
        //     // console.log(res);

        //     if (res.responseJSON.status == "1" && res.responseJSON.message == "身份认证失败！") {
        //         // 1. 清空token值
        //         localStorage.removeItem("token");
        //         // 2. 强制跳转到登录页面
        //         location.href = 'login.html';
        //     }
        // }
    })
}
function renderAvator(user) {
    // 1.1 获取用户的名称 姓名或者是昵称都可以
    var name = user.nickname || user.username;

    // 1.2 更改欢迎文本
    $("#welcome").html('欢迎&nbsp;&nbsp;' + name);
    // 2. 图片头像
    if (user.user_pic !== null) {

        $(".avator").hide();
        $(".layui-nav-img").attr('src', user.user_pic).show();
    } else {
        // 3. 文字头像
        $(".layui-nav-img").hide();
        var con = name[0].toUpperCase();
        $(".avator").html(con).show();
    }
    // console.log(user.user_pic); // 打印出来是base64格式字符串
}



