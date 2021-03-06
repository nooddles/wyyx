"use strict";

//获取元素
var ipt1 = document.querySelector('.content .inputbox1 input');
var ipt2 = document.querySelector('.content .testing input');
var emailipt = document.querySelector('.log .inputbox2 input');
var emailpass = document.querySelector('.log .inputbox3 input');
var checkbox = document.querySelector('.content .check');
var check = document.querySelector('.content .check  input');
var btn1 = document.querySelector('.content .btn1');
var btn2 = document.querySelector('.log .btn2');
var con = document.querySelector('.content');
var zlog = document.querySelector('.log');
var test = document.querySelector('.content .testing');
var li = document.querySelectorAll('.list li')[0];
var box = document.querySelector('.bigbox');
var close1 = document.querySelector('.close');
var mask = document.querySelector('.mask');
var slide = document.querySelector('.square');
var sli = document.querySelector('.sli');
var log = document.querySelectorAll('.log');
var tab = document.querySelectorAll('.tab');
var tit = document.querySelector('.tit');
var nav = document.querySelector('#nav');
var navs = document.querySelector('.nav');
var phonelogin = document.querySelector('.bigbox .s-left');
var emaillogin = document.querySelector('.bigbox .s-right');
var userlogin = document.querySelector('.bigbox .content p');
var strong = document.createElement('strong');
var em = document.createElement('em');

ipt1.onblur = function () {
  var iptVal = ipt1.value;

  if (!iptVal) {
    return;
  } else if (!/^(1|\+861)[3-8]{1}\d{9}$/.test(iptVal)) {
    strong.innerText = '手机号格式错误！！！';
    con.insertBefore(strong, btn1);
  }
};

ipt1.onfocus = function () {
  if (document.querySelector('strong')) {
    con.removeChild(strong);
  }
};

ipt2.onfocus = function () {
  if (document.querySelector('em')) {
    log.removeChild(em);
  }
};

check.onchange = function () {
  if (document.querySelector('em') || check.checked) {
    con.removeChild(em);
  }
};

emailipt.onblur = function () {
  var emailVal = emailipt.value;

  if (!emailVal) {
    return;
  } else if (!/^\w+@[a-z0-9]+\.[a-z]+$/.test(emailVal)) {
    strong.innerText = '邮箱格式错误！！！';
    zlog.insertBefore(strong, btn2);
  }
};

emailipt.onfocus = function () {
  if (document.querySelector('strong')) {
    zlog.removeChild(strong);
  }
};

emailpass.onfocus = function () {
  if (document.querySelector('em')) {
    zlog.removeChild(em);
  }
}; //滑块拖动


slide.onmousedown = function (eve) {
  var e = eve || event;
  var x = e.offsetX;

  sli.onmousemove = function (eve) {
    var e = eve || event;
    var l = e.offsetX - x;
    var maxL = 298 - 40;
    l = l < 0 ? 0 : l >= maxL ? maxL : l;
    slide.style.left = l + 'px'; // sli.style.backgorund = 'blue'

    return false;
  }; //抬起


  slide.onmouseup = function () {
    document.onmousemove = null;
  };
}; //登录


btn1.onclick = function () {
  var iptVal = ipt1.value;
  var ipt2Val = ipt2.value;

  if (!iptVal) {
    strong.innerText = '手机号不能为空';
    con.insertBefore(strong, btn1);
  } else if (!ipt2Val) {
    em.innerText = '请输入验证码';
    con.insertBefore(em, btn1);
  } else if (isNaN(ipt2Val)) {
    em.innerText = '请输入正确验证码';
    con.insertBefore(em, btn1);
  } else if (!check.checked) {
    em.innerText = '请勾选我同意';
    con.insertBefore(em, btn1);
  }
};

btn2.onclick = function () {
  var emailVal = emailipt.value;
  var passVal = emailpass.value;

  if (!emailVal) {
    strong.innerText = '邮箱不能为空';
    zlog.insertBefore(strong, btn2);
  } else if (!passVal) {
    em.innerText = '请输入密码';
    zlog.insertBefore(em, btn2);
  } else if (passVal.length < 8 || passVal.length > 16) {
    em.innerText = '输入密码在8-16位之间';
    zlog.insertBefore(em, btn2);
  }
}; //切换登录方式
//切换邮箱登录


phonelogin.onclick = function () {
  con.style.display = 'block';
  zlog.style.display = 'none';
  emaillogin.style.color = '#999';
  phonelogin.style.color = '#333';
};

emaillogin.onclick = function () {
  con.style.display = 'none';
  phonelogin.style.color = '#999';
  emaillogin.style.color = '#333';
  zlog.style.display = 'block';
}; //切换账号登录


userlogin.onclick = function () {
  var passVal = emailpass.value;
  con.removeChild(sli);
  con.removeChild(checkbox);
  userlogin.innerText = '短信快捷登录';
  var reipt = document.createElement('div');
  reipt.innerHTML = '<div class="icon3 logoimg3"></div><input type="password" placeholder="请输入密码">';
  reipt.className = 'inputbox3';
  btn1.innerText = '登录';
  con.replaceChild(reipt, test);
}; //获取验证码


var btn3 = document.querySelector('.testing i');
var Yzm = document.querySelector('.testing .iptb input');

btn3.onclick = function () {
  Yzm.value = getYzm(6);
}; //显示隐藏


li.onclick = function () {
  box.style.display = 'block';
  mask.style.display = 'block';
};

close1.onclick = function () {
  mask.style.display = 'none';
  box.style.display = 'none';
}; //导航栏吸顶效果


window.onscroll = function () {
  var stop = document.documentElement.scrollTop || document.body.scrollTop;

  if (stop >= 152) {
    nav.style.position = 'fixed';
    nav.style.top = 0;
  } else {
    nav.style.position = 'static';
  }
}; //轮播图数据请求


var trunData = document.querySelector('.swiper-wrapper');
ajax({
  url: "./img/goods1.json",
  type: "get",
  dataType: 'json',
  success: function success(json) {
    var goodsStr = '';
    json.forEach(function (item, index) {
      goodsStr += "\n                <div class=\"swiper-slide\">\n                 <div class=\"shop\">\n                  <div class=\"good\">\n                    <a href=\"\"></a>\n                    <div class=\"goodimg1\"><img\n                        src=\"".concat(item.imgurl1, "\"\n                        alt=\"\"></div>\n                    <div class=\"goodimg2\"><img\n                        src=\"").concat(item.imgurl2, "\"\n                        alt=\"\"></div>\n                  </div>\n                  <div class=\"bd\">\n                    <div class=\"part\"><span>").concat(item.tit, "</span></div>\n                    <h4 class=\"name\"><a href=\"\">").concat(item.title, "</a></h4>\n                    <p class=\"pri\">\n                      <span class=\"retpri\">").concat(item.price1, "</span>\n                      <span class=\"countpri\">").concat(item.price2, "</span>\n                    </p>\n                  </div>\n                 </div>\n                </div>\n                ");
    });
    trunData.innerHTML = goodsStr;
  }
}); //推荐数据请求

var suggestion = document.querySelector('.showContainer');
var commonTab = document.querySelector('.commontab');
var font = document.querySelectorAll('.commontab a');
var topSell = document.querySelector('.commontab .topSell');
var recommend = document.querySelector('.commontab .recommend');
ajax({
  url: './img/goods2.json',
  type: 'get',
  dataType: 'json',
  success: function success(json) {
    var goodsStr = '';
    json.forEach(function (item, index) {
      goodsStr += "\n                <div class=\"m-product\" code='".concat(item.code, "'>\n                <a href=\"http://localhost:3000/goods.html\" class=\"skip\"></a>\n                <div class=\"hd\">\n                <a href=\"http://localhost:3000/goods.html\" title=\"\u4E00\u6B21\u6027\u533B\u7528\u53E3\u7F6950\u7247\uFF0C\u79CB\u5B63\u56E4\u8D27\u5907\u7528\" class=\"skip\"></a>\n                  <div class=\"goodsimg\">\n                    <img\n                      src=\"").concat(item.imgurl1, "\"\n                      alt=\"\">\n                  </div>\n                </div>\n                <div class=\"bd\">\n                  <div class=\"prdtTags\"><span>").concat(item.tit, "</span></div>\n                  <h2 class=\"goodsname\"><a href=\"\"><span>").concat(item.title, "</span></a></h2>\n                  <p class=\"total\">\n                    <span class=\"realPic\">").concat(item.price1, "</span>\n                    <span class=\"counPic\">").concat(item.price2, "</span>\n                  </p>\n                </div>\n              </div>\n            ");
    });
    suggestion.innerHTML = goodsStr;
  }
});

topSell.onclick = function () {
  ajax({
    url: './img/goods3.json',
    type: 'get',
    dataType: 'json',
    success: function success(json) {
      var goodsStr = '';
      json.forEach(function (item, index) {
        goodsStr += "\n            <div class=\"m-product\">\n            <a href=\"http://localhost:3000/goods.html\" class=\"skip\"></a>\n            <div class=\"hd\">\n            <a href=\"http://localhost:3000/goods.html\" title=\"\u4E00\u6B21\u6027\u533B\u7528\u53E3\u7F6950\u7247\uFF0C\u79CB\u5B63\u56E4\u8D27\u5907\u7528\" class=\"skip\"></a>\n              <div class=\"goodsimg\">\n                <img\n                  src=\"".concat(item.imgurl1, "\"\n                  alt=\"\">\n              </div>\n            </div>\n            <div class=\"bd\">\n              <div class=\"prdtTags\"><span>").concat(item.tit, "</span></div>\n              <h2 class=\"goodsname\"><a href=\"\"><span>").concat(item.title, "</span></a></h2>\n              <p class=\"total\">\n                <span class=\"realPic\">").concat(item.price1, "</span>\n                <span class=\"counPic\">").concat(item.price2, "</span>\n              </p>\n            </div>\n          </div>\n            ");
      });
      suggestion.innerHTML = goodsStr;
    }
  });
};

recommend.onclick = function () {
  ajax({
    url: './img/goods2.json',
    type: 'get',
    dataType: 'json',
    success: function success(json) {
      var goodsStr = '';
      json.forEach(function (item, index) {
        goodsStr += "\n                <div class=\"m-product\">\n                <a href=\"http://localhost:3000/goods.html\" class=\"skip\"></a>\n                <div class=\"hd\">\n                <a href=\"http://localhost:3000/goods.html\" title=\"\u4E00\u6B21\u6027\u533B\u7528\u53E3\u7F6950\u7247\uFF0C\u79CB\u5B63\u56E4\u8D27\u5907\u7528\" class=\"skip\"></a>\n                  <div class=\"goodsimg\">\n                    <img\n                      src=\"".concat(item.imgurl1, "\"\n                      alt=\"\">\n                  </div>\n                </div>\n                <div class=\"bd\">\n                  <div class=\"prdtTags\"><span>").concat(item.tit, "</span></div>\n                  <h2 class=\"goodsname\"><a href=\"\"><span>").concat(item.title, "</span></a></h2>\n                  <p class=\"total\">\n                    <span class=\"realPic\">").concat(item.price1, "</span>\n                    <span class=\"counPic\">").concat(item.price2, "</span>\n                  </p>\n                </div>\n              </div>\n            ");
      });
      suggestion.innerHTML = goodsStr;
    }
  });
};

on(commonTab, 'click', 'a', function () {
  for (var i = 0, len = font.length; i < len; i++) {
    font[i].className = '';
  }

  this.className = 'click';
}); //跳转详情页