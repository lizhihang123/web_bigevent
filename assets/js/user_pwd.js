$(function () {
    // 1.1 导入form
    var form = layui.form;
    // 1.2 导入layer
    var layer = layui.layer;

    // 2. 密码长度6-12位
    form.verify({
        pass: [
            /^[\S]{6,12}$/
            , '密码必须6到12位，且不能出现空格'
        ],
        Samepwd: function (value) {
            if (value === $("[name=oldpassword]").val()) {
                return layer.msg('新旧密码不能一致');
            }
        },
        Repwd: function (value) {
            if (value != $("[name=newpassword]").val()) {
                return layer.msg('两次密码必须一致');
            }
        }

    })

    // 3. 发起ajax请求，向服务器提交新的密码 并且提交成功后 情况页面表单信息

    // 3.1 给form表单元素绑定ajax请求
    $(".layui-form").on("submit", function (e) {
        // 阻止默认的提交行为
        e.preventDefault();
        // ajax
        $.ajax({
            method: 'POST',
            url: '/my/updatepwd',
            data: $(this).serialize(),
            success: function (res) {
                if (res.status !== 0) {
                    return layer.msg(res.message);
                }
                layer.msg(res.message);

                // 下面这步设置更新密码成功后，清空当前表单的值
                $(".layui-form")[0].reset();
            }
        })
    }
    )
})