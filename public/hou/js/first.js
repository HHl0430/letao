/**
 * Created by Administrator on 2018/1/13.
 */
$(function () {
    var page = 1;
    var pageSize = 5;
    var render = function () {
        $.ajax({
            type:'get',
            url:'/category/queryTopCategoryPaging',
            data:{
                page:page,
                pageSize:pageSize
            },
            success:function (info) {
                $("tbody").html(template('tpl',info))


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
        })
    }
    render();

    $(".btn_add").on("click",function () {
        $("#firstModal").modal("show")

    });
   var $form = $("#form");
    $form.bootstrapValidator({
        feedbackIcons: {
            valid: 'glyphicon glyphicon-ok',
            invalid: 'glyphicon glyphicon-remove',
            validating: 'glyphicon glyphicon-refresh'
        },
        fields:{
            categoryName:{
              validators:{
                notEmpty:{
                  message: '请输入一级分类的名称'
                  }
                }
            }
        }

    });
    $form.on('success.form.bv', function (e) {
        e.preventDefault();
        //使用ajax提交逻辑
        $.ajax({
            type:'post',
            url:'/category/addTopCategory',
            data:$form.serialize(),
            success:function (info) {
               if(info.success){
                   page=1;
                   render()
                   $("#firstModal").modal("hide")

               }
            }
        })
    });





})