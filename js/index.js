//获取元素
var ipt1 = document.querySelector('.content .inputbox1 input')
var btn1 = document.querySelector('.content .btn1')
var con = document.querySelector('.content');
var li = document.querySelectorAll('.list li')[0];
var box = document.querySelector('.bigbox')
var close1 = document.querySelector('.close')
var mask = document.querySelector('.mask')
var slide = document.querySelector('.square')
var sli = document.querySelector('.sli')
var log = document.querySelectorAll('.log')
var tab = document.querySelectorAll('.tab')
var tit = document.querySelectorAll('.tit');



//手机号验证
var strong = document.createElement('strong')

    ipt1.onblur = function(){
        var iptVal = ipt1.value;
        if(!/^(1|\+861)[3-8]{1}\d{9}$/.test(iptVal)){
            strong.innerText = '手机号格式错误！！！'
            con.insertBefore(strong,btn1);
        }
    }
    ipt1.onfocus = function(){
    if(document.querySelector('strong')){
            con.removeChild(strong)
        }
    }
    
//滑块拖动
slide.onmousedown = function(eve){
    var e = eve || event;
    var x = e.offsetX;
    var y = e.offsetY;
    sli.onmousemove = function(eve){
        var e = eve || event;
        var l = e.offsetX -x;
        var maxL = 298 - 40;
        l = l < 0 ? 0 : (l >=maxL ? maxL : l);
        slide.style.left = l+ 'px'
        // sli.style.backgorund = 'blue'
        return false
    }
    //抬起
    slide.onmouseup = function(){
        document.onmousemove = null
    }
}

//切换登录方式
// on(tit,'click','a',function(){
//     for(var i = 0,len = a.length; i < len; i++){
//         a[i].style.color = '#333';
//     }
// })


//显示隐藏
li.onclick = function(){
    box.style.display = 'block'
    mask.style.display = 'block'
}
close1.onclick = function(){
    mask.style.display = 'none'
    box.style.display = 'none'
}

