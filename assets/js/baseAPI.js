// 1. 每次发起ajax请求，先调用这个函数
$.ajaxPrefilter(function (options) {
    // 2. 每个url拼接前面的地址，
    options.url = 'http://api-breakingnews-web.itheima.net' + options.url
    // 3.  每次发起请求 先判断里面是否有/my/ 如果有，就再拼接
    if (options.url.indexOf('/my/') !== -1) {
        options.headers = {
            Authorization: token || ''
        }
    }

    options.complete = function (res) {
        // console.log('执行了回调函数');
        console.log(res);
        if (res.responseJSON.status == "1" && res.responseJSON.message == "身份认证失败！") {
            // 1. 清空token值
            localStorage.removeItem("token");
            // 2. 强制跳转到登录页面
            location.href = 'login.html';
        }
    }
})
