$(function () {
    //判断本地存储还是购物车数据
    if (localStorage.getItem('goods')) {
        //获取本地存储中的购物车数据
        var goodsArr = JSON.parse(localStorage.getItem('goods'))

        //获取数据
        // $.ajax({
        //     url: 'data/goods.json',
        //     type: 'get',
        //     dataType: 'json',
        //     success: function (json) {
        //         var domStr = ''
        //         $.each(goodsArr, function (index, item) {
        //             $.each(json, function (ind, obj) {
        //                 if (item.code === obj.code) {
        //                     domStr += `
        //                     <li>
        //                     <img src="${obj.imgurl}" alt="">
        //                     <h3>${obj.title}</h3>
        //                     <p>${obj.price}</p>
        //                     <strong>-</strong> <span>${item.num}</span> <i>+</i>
        //                     <em code='${obj.code}'>删除</em>
        //                     <u></u>
        //                     </li>
        //                     `
        //                 }
        //             })
        //         })
        //         $('.list').html(domStr)
        //     }
        // })

        //动态增加数量或减少
        $('.list').on('click', 'li i', function () {
            var txtObj = $(this).siblings('.list li span');
            var number = parseInt(txtObj.text());
            txtObj.text(number + 1)

            var num = ($(this)).prev().text();
            var price = ($(this)).siblings('p').text().substr(1);
            var total = price * num
            $(this).siblings('u').text(total)


            var hasGoods = false

            var code = $(this).next().attr('code');
            $.each(goodsArr, function (index, item) {
                if (item.code === code) {
                    item.num++;
                    localStorage.setItem('goods', JSON.stringify(goodsArr))
                    hasGoods = true;
                    return false
                }
            })

        })

        $('.list').on('click', 'li strong', function () {
            var txtObj = $(this).siblings('.list li span');
            var number = parseInt(txtObj.text());
            if (number > 1) {
                txtObj.text(number - 1)

                var num = ($(this)).next().text();

                var price = ($(this)).siblings('p').text().substr(1);

                var total = price * num

                $(this).siblings('u').text(total)

                var hasGoods = false
                var code = $(this).siblings('list li em').attr('code');
                var _this = this;
                
                $.each(goodsArr, function (index, item) {
                    if (item.code === code) {
                        item.num--;
                        localStorage.setItem('goods', JSON.stringify(goodsArr))
                        hasGoods = true;
                        return false
                    }
                })
            }
        })

        //商品移出购物车
        $('.list').on('click', 'li em', function () {
            //删除对应商品li
            $(this).parent().remove();

            //更新本地储存中的数据
            var code = $(this).attr('code')

            $.each(goodsArr, function (index, item) {
                if (item.code === code) {//删除的商品编号
                    goodsArr.splice(index, 1)
                    return false
                }
            })

            //判断购物车是否还有数据
            if (goodsArr.length > 0) {
                //更新本地数据
                localStorage.setItem('goods', JSON.stringify(goodsArr))
            } else {
                //清除本地数据
                localStorage.removeItem('goods')
                var nodata = '<li style="line-height: 70px; text-align: center;">购物车暂无数据！</li>'
                $('.list').html(nodata)
            }

            alert('商品移出购物车成功！')
        })
    } else {//没数据
        var nodata = '<li style="line-height: 70px; text-align: center;">购物车暂无数据！</li>'
        $('.lists').html(nodata)
    }
})