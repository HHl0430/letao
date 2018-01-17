/**
 * Created by Administrator on 2018/1/16.
 */
$(function () {




    var id = getSearch("productId")
    function render  () {
        $.ajax({
            type:'get',
            url:'/product/queryProductDetail',
            data:{
                id:id
            },
            success:function (info) {
                console.log(info);
                $(".mui-scroll").html(template("tpl",info))
                var gallery = mui('.mui-slider');
                gallery.slider({
                    interval:5000//自动轮播周期，若为0则不自动播放，默认为0；
                });
                mui(".lt_num").numbox().setOption('step',0)

            }
        })
    }
    render();
})