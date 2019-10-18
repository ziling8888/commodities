$(function () {

        //对字符编码

        //验证整个表单是否通过
        function isValid() {
            var $invalid = $('.is-invalid');
            var $ipt = $('input');
            for (var i = 0; i < $ipt.length; i++) {
                if ($($ipt[i]).val() == undefined || $($ipt[i]).val() == '') {
                    $('#login').prop('disabled', true);
                    return;
                }
            }
    
            $('#login').prop('disabled', $invalid.length != 0);
    
        }

    function valid1(fn, v1, v2) {
        if (!validform[fn](v1, v2)) {
            //验证不通过
            $(this).addClass('is-invalid');
        } else {
            $(this).removeClass('is-invalid');
        }

        isValid();
    }

    $('#username').on('input', function () {
        var username = $(this).val();
        //修改valid1函数内部this的指向
        valid1.call(this, 'isUsername', username);

    })

    $('#pwd').on('input', function () {
        var pwd = $(this).val();
        valid1.call(this, 'isPwd', pwd);
    })

    $('.toast').toast({
        delay: 3000
    })

    $('#login').on('click', function () {

        //获取本地存储的用户
       var users = localStorage.getItem('users');

       users = users ? JSON.parse(users) : [];

        for (var i = 0; i < users.length; i++) {
            var u = utitls.encodeString($('#username').val());
            var p = utitls.encodeString($('#pwd').val());
            if (u== users[i].username) {
                //如果用户名存在, 且密码不正确
                if (p != users[i].pwd) {
                    $('.toast-body').text('用户名或者密码不正确');
                    $('.toast').toast('show');
                    return;
                } else {
                    //登录成功
                    //保存用户登录状态
                   
                    localStorage.setItem('__Us', users[i].username);
                    localStorage.setItem('__Ps', users[i].pwd);
                    localStorage.setItem('__Ns', users[i].nickname);
                    return location.assign('./index.html');
                }
               
            }
        }

        //如果用户不存在
        $('.toast-body').text('该用户名未注册');
        $('.toast').toast('show');

    })

})