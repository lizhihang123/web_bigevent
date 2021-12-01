$(function () {
    var form = layui.form;
    var layer = layui.layer;

    // 1. 表单验证
    form.verify({
        nickname: function (value) {
            if (value.length > 6) {
                return console.log('nickname长度不能超过6');
            }
        }
    })
    initUserInfo();
    // 2. 获取用户的信息
    function initUserInfo() {
        $.ajax({
            method: 'GET',
            url: '/my/userinfo',
            success: function (res) {
                if (res.status !== 0) {
                    return layer.msg(res.message);
                }
                // console.log(res);
                form.val('formuserInfo', res.data)
                // //获取表单区域所有值
                // var data1 = form.val("formuserInfo");
                // console.log(data1);
            }

        })
    }

    // 3. 重置按钮的设计
    $("#btnReset").on("click", function (e) {
        // 组织用户默认行为
        e.preventDefault();
        // 点击重置，再次获取用户信息
        initUserInfo();
    })


    // 4.1 用户基本资料更新信息
    $(".layui-form").on("submit", function (e) {
        // 1. 为什么要阻止，如果不阻止，就会提交给当前页面自己，并不会执行下面的ajax函数
        e.preventDefault();
        // 2. 调用ajax
        $.ajax({
            method: 'POST',
            url: '/my/userinfo',
            // 2.1 获取表单的所有数据提交给服务器
            data: $(this).serialize(),
            success: function (res) {
                if (res.status !== 0) {
                    return layer.msg('更新失败');
                }
                layer.msg('更新成功');

                // 4.2 头像的文字 欢迎你 更新
                window.parent.getUserinfo();
            }
        })
    })

})