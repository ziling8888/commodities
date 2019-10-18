$(function () {

    var ns = localStorage.getItem('__Ns');

    if (!ns) {
        location.assign('./login.html');
    }

    $('#nickname').text(utitls.decodeString(ns));

    //获取当前用户的商品类型
    var types = localStorage.getItem('types');
    types = types ? JSON.parse(types) : {};
    var currentUser = localStorage.getItem('__Us');
    var userTypes = types[currentUser];
    userTypes = userTypes ? userTypes : [];

    for (var i = 0; i < userTypes.length; i++) {
        var $li = $('<li class="text-secondary" data-type="' + userTypes[i].type + '">' + userTypes[i].title + '</li>');
        var $cloneLi = $li.clone();
        $('.add').append($li);
        $('.showdata').append($cloneLi);
    }

    //为当前li和未来创建的li绑定事件
    $('.add').on('click', 'li', function () {

        if ($(this).hasClass('type-active')){
            return;
        }

        $('.addtype').addClass('ishide');
        $('.addtype-pro').removeClass('ishide');
        $('.pro-active').removeClass('pro-active');
        $('.t').addClass('ishide');
       
        $(this).addClass('type-active').siblings().removeClass('type-active');

        $('#ty').text($(this).text());
    })

    //查看商品
    $('.showdata').on('click', 'li', function () {

        if ($(this).hasClass('pro-active')){
            return;
        }

        $('tbody').empty();

        $('.addtype').addClass('ishide');
        $('.addtype-pro').addClass('ishide');
        $('.type-active').removeClass('type-active');

        $('.t').removeClass('ishide');

        $(this).addClass('pro-active').siblings().removeClass('pro-active');

        //获取本地存储商品数据
        var userPros = localStorage.getItem('userPros');
        userPros = userPros ? JSON.parse(userPros) : {};

        //获取当前用户名
        var username = localStorage.getItem('__Us');
        var currentUserPros = userPros[username];
        currentUserPros = currentUserPros ? currentUserPros : {};

        //获取当前商品类型
        var type = $('.pro-active').data('type');
        var currentTypePros = currentUserPros[type];

        currentTypePros = currentTypePros ? currentTypePros : [];

        //遍历当前用户的当前商品类型数据
        for (var i = 0; i < currentTypePros.length; i++) {
            var $tr = $(`<tr><td>${i + 1}</td>
            <td>
                <div class="pro-img">
                    <img class="d-block w-100" src="${currentTypePros[i].img}" alt="">
                </div>
            </td>
            <td>
                <div class="pro-title">${currentTypePros[i].name}</div>
            </td>
            <td>
                <div class="pro-price">${currentTypePros[i].price}</div>
            </td>
            <td>
                    <button type="button" class="btn btn-warning btn-sm edit" data-id="${currentTypePros[i].id}">编辑</button>
                    <button type="button" class="btn btn-danger btn-sm rm" data-id="${currentTypePros[i].id}">删除</button>
            </td></tr>`);

            $('tbody').append($tr);
        }
    })


    $('tbody').on('click', '.rm', function () {
        //获取本地存储所有商品数据
        var userPros = JSON.parse(localStorage.getItem('userPros'));

        //获取当前用户
        var username = localStorage.getItem('__Us');

        //获取当前商品类型
        var type = $('.pro-active').data('type');

        for (var i = 0; i < userPros[username][type].length; i++) {
            if (userPros[username][type][i].id == $(this).data('id')) {
                userPros[username][type].splice(i, 1);

                localStorage.setItem('userPros', JSON.stringify(userPros));

                $(this).parents('tr').remove();

                $('tbody>tr').each(function (n) {
                    $(this).find('td:first').text(n + 1);
                })
                return;
            }
        }


    })

    $('tbody').on('click', '.edit', function () {
        $('#edit-pro-type').val($('.pro-active').text());
        
        var $tr = $(this).parents('tr');

        var pro = {
            img: $tr.find('.pro-img>img').attr('src'),
            title:  $tr.find('.pro-title').text(),
            price: $tr.find('.pro-price').text()
        };

        $('.edit-pro').each(function () {
            var dataTitle = $(this).data('title');
            $(this).val(pro[dataTitle]);
        })

        $('#editm1').data('id', $(this).data('id')).modal('show');
    })

    //编辑商品
    $('#save').on('click', function () {
         //获取本地存储所有商品数据
         var userPros = JSON.parse(localStorage.getItem('userPros'));

         //获取当前用户
         var username = localStorage.getItem('__Us');
 
         //获取当前商品类型
         var type = $('.pro-active').data('type');
        
        var id = $('#editm1').data('id');

         for (var i = 0; i < userPros[username][type].length; i++) {
             if (userPros[username][type][i].id == id) {
                var pro = {
                    name: $('[data-title="title"]').val(),
                    price: $('[data-title="price"]').val(),
                    img: $('[data-title="img"]').val()
                };

                for (var key in pro) {
                    userPros[username][type][i][key] = pro[key];
                }
 
                 localStorage.setItem('userPros', JSON.stringify(userPros));
 
                var $tr = $('.edit[data-id="' + id + '"]').parents('tr');
                $tr.find('.pro-title').text(pro.name);
                $tr.find('.pro-img>img').attr('src', pro.img);
                $tr.find('.pro-price').text(pro.price);
                $('#editm1').modal('hide');
                 return;
             }
         }
    })
    

    //添加商品类型
    $('#commit').on('click', function () {
        
        //商品类型键名
        var key = 'nns' + new Date().getTime();

        //商品类型名称   'aa': [{}, {}]
        var type = $('#type').val();

        //创建商品类型对象
        var ty = {
            //商品类型的key
            type: key,

            //商品类型的标题
            title: type
        };

        //将商品类型对象推进当前用户的商品类型数组中
        userTypes.push(ty);

       console.log('userTypes ==> ', userTypes);

       //设置当前用户商品类型
       types[currentUser] = userTypes;

        //将所有商品类型写入本地存储
       localStorage.setItem('types', JSON.stringify(types));

       //创建li添加商品类型列表
       var $li = $('<li class="text-secondary" data-type="' + key + '">' + type + '</li>');
       var $cloneLi = $li.clone();
       $('.add').append($li);
        $('.showdata').append($cloneLi);
       //清空商品类型控件的值
       $('#type').val('');

    })

    //添加商品  '用户名': {'商品类型': [{id: '', name: '', price : '', img: ''}, {}]}
    // { '用户名1': {'商品类型': [{id: '', name: '', price : '', img: ''}, {}]}, '用户名2': {'商品类型': [{id: '', name: '', price : '', img: ''}, {}]} }
    $('#commit-pro').on('click', function () {

        //获取用户商品类型数据
        var userPros = localStorage.getItem('userPros');

        userPros = userPros ? JSON.parse(userPros) : {};

        //获取当前用户的商品类型数据
        var currentUserPros = userPros[localStorage.getItem('__Us')];

        currentUserPros = currentUserPros ? currentUserPros : {};

        //获取当前商品类型
        var typeActive = $('.type-active').data('type');
        var currentUserTypePros = currentUserPros[typeActive];
        currentUserTypePros = currentUserTypePros ? currentUserTypePros : [];

        //关联当前商品类型
        currentUserPros[typeActive] = currentUserTypePros;

        var $pro = $('.pro');
        var pro = {
            id: 'pro' + new Date().getTime()
        };
        $pro.each(function () {
            var id = $(this).attr('id');
            pro[id] = $(this).val();
        })

        console.log('pro ==> ', pro);

        //将当前商品推进当前商品类型数据中
        currentUserPros[typeActive].push(pro);

        //将当前用户的当前商品类型的数据添加到userPros中
        userPros[localStorage.getItem('__Us')] = currentUserPros;

        //写入本地存储
        localStorage.setItem('userPros', JSON.stringify(userPros));

        //清空表单控件的值
        $('.pro').val('');

    })


    //退出
    $('#logout').on('click', function () {
        localStorage.removeItem('__Us');
        localStorage.removeItem('__Ps');
        localStorage.removeItem('__Ns');
        location.assign('./login.html');
    })

    //添加商品类型
    $('.addprotype').on('click', function () {
        $('.addtype-pro').addClass('ishide');
        $('.addtype').removeClass('ishide');
        $('.type-active').removeClass('type-active');
        $('.pro-active').removeClass('pro-active');
        $('.t').addClass('ishide');
    })
})

//关闭或者刷新浏览器触发
// $(window).on('unload', function () {
//     localStorage.removeItem('__Us');
//     localStorage.removeItem('__Ps');
//     localStorage.removeItem('__Ns');
// })