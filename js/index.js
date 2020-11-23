var ipt1 = document.querySelector('.content .inputbox1 input')
var btn1 = document.querySelector('.content .btn1')
var con = document.querySelector('.content');
var li = document.querySelectorAll('.list li')[0];
var box = document.querySelector('.bigbox')
var close1 = document.querySelector('.close')
var mask = document.querySelector('.mask')

var strong = document.createElement('strong')

ipt1.onblur = function(){
    var iptVal = ipt1.value;
    if(!/^(1|\+861)[3-8]{1}\d{9}$/.test(iptVal)){
        strong.innerText = '手机号格式错误！！！'
        con.insertBefore(strong,btn1)
    }
}

li.onclick = function(){
    box.style.display = 'block'
    mask.style.display = 'block'
}
close1.onclick = function(){
    mask.style.display = 'none'
    box.style.display = 'none'
}