/**
 * Created by Administrator on 2018/1/11.
 */
$(document).ajaxStart(function () {
    NProgress.start();
});
$(document).ajaxStop(function () {
    //完成进度条
    setTimeout(function () {
        NProgress.done();
    }, 500);
});


$(".child").prev().on("click", function () {
    $(this).next().stop().slideToggle();
});
$(".icon_menu").on("click", function () {
    $(".lt_aside").toggleClass("now");
    $(".lt_main").toggleClass("now");
    $(".lt_topbar").toggleClass("now");
});
$(".icon_logout").on("click",function () {


    $("#logoutModal").modal("show");

    $(".btn_logout").off().on("click",function () {
        $.ajax({
            type:'get',
            url:'/employee/employeeLogout',
            success:function (info) {
                if(info.success){
                    location.href="login.html"
                }


            }
        })


    })


})
