var validform = {

    //用户名 字母数字组合，必须字母开头，3-8字符
    usernameReg: /^[A-Za-z][A-Za-z0-9]{2,7}$/,

    //匿名 汉字字母数字组合, 3-8字符
    nicknameReg: /^[A-Za-z0-9\u4e00-\u9fa5]{3,8}$/,

    //字母数字组合 6-16字符
    pwdReg: /^[A-Za-z0-9]{6,16}$/,

    //验证用户名
    isUsername: function (val) {
        return this.usernameReg.test(val);
    },

    //验证匿名
    isNickname: function (val) {
        return this.nicknameReg.test(val);
    },

    //密码验证
    isPwd: function (val) {
        return this.pwdReg.test(val);
    },

    //两值相等
    isEqual: function (v1, v2) {
        return v1 === v2;
    }

};