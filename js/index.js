//获取元素
var ipt1 = document.querySelector('.content .inputbox1 input')
var ipt2 = document.querySelector('.content .testing input')
var emailipt = document.querySelector('.log .inputbox2 input')
var emailpass = document.querySelector('.log .inputbox3 input')
var checkbox = document.querySelector('.content .check')
var check = document.querySelector('.content .check  input')
var btn1 = document.querySelector('.content .btn1')
var btn2 = document.querySelector('.log .btn2')
var con = document.querySelector('.content');
var zlog = document.querySelector('.log');
var test = document.querySelector('.content .testing')
var li = document.querySelectorAll('.list li')[0];
var box = document.querySelector('.bigbox')
var close1 = document.querySelector('.close')
var mask = document.querySelector('.mask')
var slide = document.querySelector('.square')
var sli = document.querySelector('.sli')
var log = document.querySelectorAll('.log')
var tab = document.querySelectorAll('.tab')
var tit = document.querySelector('.tit');
var phonelogin = document.querySelector('.bigbox .s-left')
var emaillogin = document.querySelector('.bigbox .s-right')
var userlogin = document.querySelector('.bigbox .content p')

var strong = document.createElement('strong')
var em = document.createElement('em')

ipt1.onblur = function () {
    var iptVal = ipt1.value;
    if (!iptVal) {
        return
    } else if (!/^(1|\+861)[3-8]{1}\d{9}$/.test(iptVal)) {
        strong.innerText = '手机号格式错误！！！'
        con.insertBefore(strong, btn1);
    }
}
ipt1.onfocus = function () {
    if (document.querySelector('strong')) {
        con.removeChild(strong)
    }
}
ipt2.onfocus = function () {
    if (document.querySelector('em')) {
        log.removeChild(em)
    }
}
check.onchange = function () {
    if (document.querySelector('em') || check.checked) {
        con.removeChild(em)
    }
}
emailipt.onblur = function () {
    var emailVal = emailipt.value;
    if (!emailVal) {
        return
    } else if (!/^\w+@[a-z0-9]+\.[a-z]+$/.test(emailVal)) {
        strong.innerText = '邮箱格式错误！！！'
        zlog.insertBefore(strong, btn2);
    }
}
emailipt.onfocus = function () {
    if (document.querySelector('strong')) {
        zlog.removeChild(strong)
    }
}
emailpass.onfocus = function () {
    if (document.querySelector('em')) {
        zlog.removeChild(em)
    }
}
//滑块拖动
slide.onmousedown = function (eve) {
    var e = eve || event;
    var x = e.offsetX;
    sli.onmousemove = function (eve) {
        var e = eve || event;
        var l = e.offsetX - x;
        var maxL = 298 - 40;
        l = l < 0 ? 0 : (l >= maxL ? maxL : l);
        slide.style.left = l + 'px'
        // sli.style.backgorund = 'blue'
        return false
    }
    //抬起
    slide.onmouseup = function () {
        document.onmousemove = null
    }
}

//登录
btn1.onclick = function () {
    var iptVal = ipt1.value;
    var ipt2Val = ipt2.value;
    if (!iptVal) {
        strong.innerText = '手机号不能为空'
        con.insertBefore(strong, btn1);
    } else if (!ipt2Val) {
        em.innerText = '请输入验证码'
        con.insertBefore(em, btn1);
    } else if (isNaN(ipt2Val)) {
        em.innerText = '请输入正确验证码'
        con.insertBefore(em, btn1);
    } else if (!check.checked) {
        em.innerText = '请勾选我同意'
        con.insertBefore(em, btn1);
    }
}

btn2.onclick = function () {
    var emailVal = emailipt.value;
    var passVal = emailpass.value;
    if (!emailVal) {
        strong.innerText = '邮箱不能为空'
        zlog.insertBefore(strong, btn2);
    } else if (!passVal) {
        em.innerText = '请输入密码'
        zlog.insertBefore(em, btn2);
    } else if (passVal.length < 8 || passVal.length >16){
        em.innerText = '输入密码在8-16位之间'
        zlog.insertBefore(em, btn2);
    }
}
//切换登录方式

//切换邮箱登录
phonelogin.onclick = function(){
    con.style.display = 'block'
    zlog.style.display = 'none'
    emaillogin.style.color = '#999'
    phonelogin.style.color = '#333'
}
emaillogin.onclick = function(){
    con.style.display = 'none'
    phonelogin.style.color = '#999'
    emaillogin.style.color = '#333'
    zlog.style.display = 'block'
}
userlogin.onclick = function(){
    var passVal = emailpass.value;
    con.removeChild(sli);
    con.removeChild(checkbox);
    userlogin.innerText = '短信快捷登录'
   
    var reipt = document.createElement('div')
    reipt.innerHTML ='<div class="icon3 logoimg3"></div><input type="password" placeholder="请输入密码">'
    reipt.className = 'inputbox3'
    btn1.innerText = '登录'
    con.replaceChild(reipt,test)
}

//切换账号登录

//显示隐藏
li.onclick = function () {
    box.style.display = 'block'
    mask.style.display = 'block'
}
close1.onclick = function () {
    mask.style.display = 'none'
    box.style.display = 'none'
}

