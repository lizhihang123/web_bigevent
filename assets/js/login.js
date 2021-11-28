$(function () {

    // 1. 登录和注册链接的显示隐藏
    $(".link_reg").on("click", function () {
        $(".login").hide();
        $(".reg").show();
    })

    $(".link_login").on("click", function () {
        $(".reg").hide();
        $(".login").show();
    })
    // 2. 密码校验的自定义
    // 2.1  // layui 是一个对象,引入了layui.js文件就有这个对象 类比jQuery 引入就有$; form是layui的一个属性
    // 2.2 //注意写法是键值对的形式 [\S]表示的非空格，表示表单必须是非空格，6-12位
    var form = layui.form;
    var layer = layui.layer;
    form.verify({  // 这个属性有verify这个方法
        pwd: [/^[\S]{6,12}$/, "密码必须是6- 12位，且不能出现空格"],
        repwd: function (value) {
            var pwd = $("#form_reg [name=password]").val();
            if (pwd !== value) {
                return '两次输入的密码值不一致';
            }
        }
    })


    // var data = {
    //     username: $("#reg [name=username]").val(),
    //     password: $("#reg [name=password]").val()
    // }; 

    // 3. 注册效果
    $("#form_reg").on("submit", function (e) {
        console.log(1);
        e.preventDefault();
        var data = {
            username: $("#form_reg [name=username]").val(),
            password: $("#form_reg [name=password]").val()
        };
        $.post("/api/reguser", data, function (res) {
            // if (res.status !== 0) {
            //     console.log(res.message);
            // }
            // console.log('注册成功');
            // // 注意书写位置
            // $("#go_login").click();

            if (res.status !== 0) {
                return layer.msg(res.message)

            }
            layer.msg('注册成功')
            // 注意书写位置 必须注册成功才能跳转
            $("#go_login").click();
        })

    })

    // 4. 登录效果

    $("#form_login").submit(function (e) {
        // 4.1 取消默认提交事件
        e.preventDefault();
        // 4.2 发起ajax请求
        $.ajax({
            url: '/api/login',
            method: 'POST',
            // 4.3 快速获取表单的数据
            data: $(this).serialize(),
            // 4.4 回调函数
            success: function (res) {
                if (res.status !== 0) {
                    return layer.msg('请求失败');
                }
                layer.msg('请求成功');
                // res.token 字符存到本地存储 方便后面使用
                // localStorage.setItem('token', '')
                localStorage.setItem('token', res.token);
                location.href = '/index.html';
            }
        })
    })
})