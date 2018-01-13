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


if(location.href.indexOf("login.html") == -1){
    $.ajax({
        type:"get",
        url:"/employee/checkRootLogin",
        success:function (data) {
            if(data.error === 400){
                //说明用户没有登录，跳转到登录页面
                location.href = "login.html";
            }
        }
    })
}


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
