function Utitls() {}

//对字符编码
Utitls.prototype.encodeString = function (str) {
    //981632851531523785127835781258732157835812
    //str = 'aa988函';
    var codes = [];
    for (var i = 0; i < str.length; i++) {
        var code = (str[i].charCodeAt() + 100000).toString().slice(1);
        codes.push(code);
    }
    return codes.reverse().join('');
}

//对字符解码
Utitls.prototype.decodeString = function (str) {
    //981632851531523785127835781258732157835812
    
    var codes = [];

    for (var i = 0; i < str.length; i += 5) {
        var code = String.fromCharCode(str.slice(i, i + 5));
        codes.push(code);
    }

    return codes.reverse().join('');

}

var utitls = new Utitls();