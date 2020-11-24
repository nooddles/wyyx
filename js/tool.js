//判断类是否是对象
function isObject(obj) {
    if (Object.prototype.toString.call(obj) === '[object Object]') {
        return true;
    }
    return false;
}


//ajax封装
function ajax(options) {

    //1.创建数据交互对象
    if (window.XMLHttpRequest) {
        var xhr = new XMLHttpRequest();//IE6以上
    } else {
        var xhr = new ActiveXObject('Microsoft.XMLHTTP');
    }

    // 判断并格式化参数data
    var data = '';
    if (isObject(options.data)) {
        // 把对象格式化成 -> 'k1=v1&k2=v2&k3=v3'
        for (var key in options.data) {
            data += key + '=' + options.data[key] + '&';
        }
        data = data.substring(0, data.length - 1);
    }

    if (typeof options.data === 'string') {
        data = options.data;
    }

    //2.打开连接
    if (options.type.toLowerCase() === 'get') {
        //判断请求方式
        var time = '';
        time = options.cache ? '' : Date.now()//判断是否需要缓存

        xhr.open(options.type, options.url + '?' + data + '&_=' + time, true)//默认true 异步
        xhr.send(null);
    }
    if (options.type.toLowerCase() === 'post') {

        xhr.open(options.type, options.url, true)

        xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded")

        xhr.send(data);

    }
    //4.等待请求/响应状态

    //xhr.readyState 请求状态，0-4状态改变会触发一个readystatechange事件
    xhr.onreadystatechange = function () {
        if (xhr.readyState === 4) { //请求完成
            if (xhr.status === 200) {//OK 完成响应
                //options.success(xhr.responseText);
                // 支持dataType配置
                if (options.dataType === 'json') {
                    var json = JSON.parse(xhr.responseText)
                    options.success(json)
                } else if (options.dataType === 'xml') {
                    options.success(xhr.responseXML);
                } else {
                    options.success(xhr.responseText);
                }
            } else {
                options.error(xhr.status);
            }
        }
    }
}


//jsonp的封装
function jsonp(options) {
    // options.success 变成全局函数
    window[options.jsonpCallback] = options.success

    // 判断 options.data的数据类型
    // 如果字符串，直接赋值data变量
    // 如果是对象，转成参数序列的字符串
    var data = ''
    if (typeof options.data === 'string') {
        data = options.data
    }
    if (isObject(options.data)) {
        for (var key in options.data) {
            data += key + '=' + options.data[key] + '&'
        }
        data = data.substring(0, data.length - 1)
    }

    // 创建 script标签
    var oScript = document.createElement('script')
    // 给src属性赋值（url+接口参数）
    oScript.src = options.url + '?' + options.jsonp + '=' + options.jsonpCallback + '&' + data
    // 把script插入文档中
    document.body.appendChild(oScript)
    // script标签加载完成时，删除此标签
    oScript.onload = function () {
        document.body.removeChild(oScript)
    }
}


//promiseAjax封装
function promiseAjax(options) {
    return new Promise((resolve, reject) => {

        //1.创建数据交互对象
        if (window.XMLHttpRequest) {
            var xhr = new XMLHttpRequest();//IE6以上
        } else {
            var xhr = new ActiveXObject('Microsoft.XMLHTTP');
        }

        // 判断并格式化参数data
        var data = '';
        if (isObject(options.data)) {
            // 把对象格式化成 -> 'k1=v1&k2=v2&k3=v3'
            for (var key in options.data) {
                data += key + '=' + options.data[key] + '&';
            }
            data = data.substring(0, data.length - 1);
        }

        if (typeof options.data === 'string') {
            data = options.data;
        }

        //2.打开连接
        if (options.type.toLowerCase() === 'get') {
            //判断请求方式
            var time = '';
            time = options.cache ? '' : Date.now()//判断是否需要缓存

            xhr.open(options.type, options.url + '?' + data + '&_=' + time, true)//默认true 异步
            xhr.send(null);
        }
        if (options.type.toLowerCase() === 'post') {

            xhr.open(options.type, options.url, true)

            xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded")

            xhr.send(data);

        }
        //4.等待请求/响应状态

        //xhr.readyState 请求状态，0-4状态改变会触发一个readystatechange事件
        xhr.onreadystatechange = function () {
            if (xhr.readyState === 4) { //请求完成
                if (xhr.status === 200) {//OK 完成响应
                    //options.success(xhr.responseText);
                    // 支持dataType配置
                    if (options.dataType === 'json') {
                        var json = JSON.parse(xhr.responseText)
                        resolve(json)
                    } else if (options.dataType === 'xml') {
                        resolve(xhr.responseXML);
                    } else {
                        resolve(xhr.responseText);
                    }
                } else {
                    reject(xhr.status);
                }
            }
        }
    })
}

// 添加事件监听（兼容低版本浏览器）
function addEvent(dom,type,cb){
    if (dom.attachEvent) {
        dom.attachEvent('on'+type,cb);
    } else {
        dom.addEventListener(type,cb);
    }
}

// 移除事件监听（兼容低版本浏览器）
function removeEvent(dom,type,cbName){
    if (dom.detachEvent) {
        dom.detachEvent('on'+type,cbName);
    } else {
        dom.removeEventListener(type,cbName);
    }
}

// 事件委托封装
function on(parent,type,selector,callback){
    addEvent(parent,type,function (ev){
        var e = ev || event;//事件对象
        var target = e.target || e.srcElement;//事件源
        // 获取选择器第一个字符（ . ）
        var sel_first = selector.substr(0,1);
        // 记录第一个字符之后的属性值（ add ）
        var sel_last = null;
        // 记录选择器类型（id className tagName）
        var sel_type = null;
        // 判断传入的是什么选择器
        switch(sel_first){
            case '.': // 类选择器
                sel_last = selector.slice(1);
                sel_type = 'className';
                break;
            case '#': // id选择器
                sel_last = selector.slice(1);
                sel_type = 'id';
                break;
            default:
                sel_last = selector;
                sel_type = 'tagName';
        }

        // 只有传入selector元素被点击时触发
        if (sel_type === 'tagName') {
            // 如果是标签选择器，转成大写
            sel_last = sel_last.toUpperCase();
        }
        if (target[sel_type] === sel_last){
            // callback(e);
            callback.call(target,e);
        }

        // 判断target是否为selector元素或selector的子元素
        // while(target !== parent){
        //     if (sel_type === 'tagName') {
        //         // 如果是标签选择器，转成大写
        //         sel_last = sel_last.toUpperCase();
        //     }
        //     if (target[sel_type] === sel_last) {
        //         // callback(e);
        //         callback.call(target,e);
        //     }
        //     target = target.parentNode;
        // }
    });
}


function $1(selector) {
    return document.querySelector(selector)
}
function $2(selector) {
    return document.querySelectorAll(selector)
}

// 设置cookie
function setCookie(options) {
    options.days = options.days || 0
    options.path = options.path || ''
    if (options.days === 0) {
        document.cookie = options.key + '=' + options.val + '; path=' + options.path
    } else {
        var d = new Date()
        d.setDate(d.getDate() + options.days)
        document.cookie = options.key + '=' + options.val + '; expires=' + d + '; path=' + options.path
    }
}

function getCookie(key) {
    var arr = document.cookie.split('; ')
    for (var i = 0, len = arr.length; i < len; i++) {
        var arr2 = arr[i].split('=')
        if (arr2[0] === key) {
            return arr2[1]
        }
    }
    return null
}

function removeCookie(key) {
    setCookie({
        key: key,
        val: '123',
        days: -2
    })
}




