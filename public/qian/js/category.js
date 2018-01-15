/**
 * Created by Administrator on 2018/1/14.
 */
$(function () {

    mui('.lt_left .mui-scroll-wrapper').scroll({
        deceleration: 0.0005,//flick 减速系数，系数越大，滚动速度越慢，滚动距离越小，默认值0.0006
        indicators: false, //是否显示滚动条

    });
    mui('.lt_left .mui-scroll-wrapper').scroll().scrollTo(0,0,100)
    mui('.lt_right .mui-scroll-wrapper').scroll({
        deceleration: 0.0005,//flick 减速系数，系数越大，滚动速度越慢，滚动距离越小，默认值0.0006
        indicators: false, //是否显示滚动条
    });


    //渲染侧边栏
    $.ajax({
        type:'get',
        url:'/category/queryTopCategory',
        success:function (info) {
            $('.lt_left .mui-scroll').html( template('tpl',info) )
            renderContent(info.rows[0].id)
        }
    });
//    渲染右边内容
     function renderContent (id) {
        $.ajax({
            type:'get',
            url:'/category/querySecondCategory',
            data:{
                id:id
            },
            success:function (info) {
                console.log(info);
                $(".lt_right .mui-scroll").html( template("tpl_right", info) );
            }
        })
    }

//给左边的导航栏注册点击事件
    $('.lt_left').on("click","li",function () {
       $(this).addClass("now").siblings().removeClass("now");
        var id = $(this).data('id');

        renderContent (id)
        mui('.lt_right .mui-scroll-wrapper').scroll().scrollTo(0,0,100)
    })

})