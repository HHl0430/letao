/**
 * Created by Administrator on 2018/1/13.
 */
$(function () {
    var page = 1;
    var pageSize = 5
    var render = function () {

        $.ajax({
            type:'get',
            url:'/user/queryUser',
            data:{
                page:page,
                pageSize:pageSize
            },
            success:function (info) {
                console.log(info);
                $("tbody").html( template("tpl",info) )


                $("#paginator").bootstrapPaginator({
                    bootstrapMajorVersion: 3,//设置bootstrap的版本
                    currentPage: page,//设置当前页
                    totalPages: Math.ceil(info.total / info.size),//设置总页数,根据返回结果的总条数/每页的条数
                    numberOfPages: 5,//空间上显示的条数
                    onPageClicked: function (a, b, c, p) {
                        //让当前页码变成p
                        page = p;
                        //重新渲染即可
                        render();
                    }

                });
            }
        });




    }
    render();

    $("tbody").on("click", ".btn", function () {
        $("#userModal").modal("show")

        var id = $(this).parent().data("id")
        var isDelete = $(this).hasClass("btn-success") ? 1 : 0;
        $(".btn_sure").off().on("click",function () {

            $.ajax({
                type:'post',
                url:'/user/updateUser',
                data:{
                    id:id,
                    isDelete:isDelete
                },
                success:function (info) {
                    if(info.success) {
                        //关闭模态框
                        $("#userModal").modal("hide")
                        //重新渲染页面
                        render();
                    }
                }
            })
        })

    })


})