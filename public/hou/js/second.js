/**
 * Created by Administrator on 2018/1/13.
 */
$(function () {
    var page = 1;
    var pageSize = 5;
    var render = function () {
        $.ajax({
            type:'get',
            url:'/category/querySecondCategoryPaging',
            data:{
               page:page,
                pageSize : pageSize
            },
            success:function (info) {

                $('tbody').html(template("tpl",info))

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
                })

            }
        })


    }
    render();

    $(".btn_add").on("click",function () {
        $('#addModal').modal("show")
        page=1;
        pageSize=100;
        $.ajax({
            type:'get',
            url:'/category/queryTopCategoryPaging',
            data:{
                page:page,
                pageSize:pageSize
            },
            success:function (info) {
                console.log(info);

                $('.dropdown-menu').html( template('add-tpl',info) )

            }
        })

    })


    //给下拉框中所有的a标签注册点击事件
    $(".dropdown-menu").on("click", "a", function () {
        //console.log("呵呵");
        //1. 设置按钮的内容
        $(".dropdown-text").text($(this).text());

        //获取到当前a的id值，设置给categoryId
        $("[name='categoryId']").val($(this).data("id"));


        //3. 让categoryId校验变成成功
        $form.data("bootstrapValidator").updateStatus("categoryId", "VALID");
    })


    $('#fileupload').fileupload({
        dataType: 'json',
        done: function (e, data) {
           var result = data.result.picAddr;
            $('.img_box img').attr("src",result);

            //把图片的地址赋值给brandLogo
            $("[name='brandLogo']").val(data.result.picAddr);

            //把brandLogo改成成功
            $form.data("bootstrapValidator").updateStatus("brandLogo", "VALID");
        }
    })


    //表单校验功能
    var $form = $("form");
    $form.bootstrapValidator({
        excluded: [],//不校验的内容
        feedbackIcons: {
            valid: 'glyphicon glyphicon-ok',
            invalid: 'glyphicon glyphicon-remove',
            validating: 'glyphicon glyphicon-refresh'
        },
        //校验规则
        fields: {
            categoryId: {
                validators: {
                    notEmpty: {
                        message: "请选择一级分类"
                    }
                }
            },
            brandName: {
                validators: {
                    notEmpty: {
                        message: "请输入二级分类的名称"
                    }
                }
            },
            brandLogo: {
                validators: {
                    notEmpty: {
                        message: "请上传品牌图片"
                    }
                }
            }
        }
    });




    //给表单注册校验成功事件
    $form.on("success.form.bv", function (e) {
        e.preventDefault();

        //发送ajax
        $.ajax({
            type: "post",
            url: "/category/addSecondCategory",
            data: $form.serialize(),
            success: function (info) {
                if (info.success) {
                    //成功了
                    //1. 关闭模态框
                    $("#addModal").modal("hide");
                    //2. 重新渲染第一页
                    currentPage = 1;
                    render();


                    //3. 重置内容和样式
                    $form[0].reset();
                    $form.data("bootstrapValidator").resetForm();

                    //4. 重置下拉框组件和图片
                    $(".dropdown-text").text("请选择一级分类");
                    $("[name='categoryId']").val('');
                    $(".img_box img").attr("src", "images/none.png");
                    $("[name='brandLogo']").val('');
                }
            }
        });

    })


})