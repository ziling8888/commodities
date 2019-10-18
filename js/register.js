$(function () {

    //验证整个表单是否通过
    function isValid() {
        var $invalid = $('.is-invalid');
        var $ipt = $('input');
        for (var i = 0; i < $ipt.length; i++) {
            if ($($ipt[i]).val() == undefined || $($ipt[i]).val() == '') {
                $('#register').prop('disabled', true);
                return;
            }
        }

        $('#register').prop('disabled', $invalid.length != 0);

    }

    function valid(t, fn, v1, v2) {
        if (!validform[fn](v1, v2)) {
            //验证不通过
            $(t).addClass('is-invalid');
        } else {
            $(t).removeClass('is-invalid');
        }

        isValid();
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

    $('#nickname').on('input', function () {
        var nickname = $(this).val();
        valid(this, 'isNickname', nickname);
    })

    $('#pwd').on('input', function () {
        var pwd = $(this).val();
        valid(this, 'isPwd', pwd);
    })

    $('#repwd').on('input', function () {
        var repwd = $(this).val();
        var pwd = $('#pwd').val();
        valid(this, 'isEqual', pwd, repwd);
    })

    $('.toast').toast({
        delay: 3000
    })


    $('#register').on('click', function () {

        //获取本地存储的用户
       var users = localStorage.getItem('users');

       users = users ? JSON.parse(users) : [];

        for (var i = 0; i < users.length; i++) {
            if ($('#username').val() == users[i].username) {
                //如果用户名存在
                $('.toast-body').text('用户名已存在');
                $('.toast').toast('show');
                return;
            }
        }

        //用户信息
        var user = {
            username: utitls.encodeString($('#username').val()),
            nickname: utitls.encodeString($('#nickname').val()),
            pwd: utitls.encodeString($('#pwd').val())
        };

        users.push(user);

        localStorage.setItem('users', JSON.stringify(users));

        var time = 3;
        $('.toast-body').text('注册成功，' + time + '秒自动跳转登录页面');
        $('.toast').toast('show');

        var timer = setInterval(function () {
            time--;
            if (time < 0) {
                clearInterval(timer);
                timer = null;

                location.assign('./login.html');
            } else {
                $('.toast-body').text('注册成功，' + time + '秒自动跳转登录页面');
            }
        }, 1000)
        
    
    })
    

})