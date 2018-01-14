/**
 * Created by Administrator on 2018/1/14.
 */


$(function () {

    var page = 1;
    var pageSize = 5;
    var imgArr = [];
    var render = function () {
        $.ajax({
            type:'get',
            url:'/product/queryProductDetailList',
            data:{
                page:page,
                pageSize:pageSize
            },
            success:function (info) {
               $("tbody").html( template("tpl",info) )

            //    渲染分页
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
    };
    render();

    $()

    $('.btn_add').on("click",function () {
        $('#addModal').modal("show")
        page = 1;
        pageSize=100;
        $.ajax({
            type:'get',
            url:'/category/queryTopCategoryPaging',
            data:{
            page:page,
                pageSize:pageSize
            },
            success:function (info) {
                $('.dropdown-menu').html( template("select-tpl",info) )


            }
        })
    })
    //点击下拉框将文字显示
    $(".dropdown-menu").on("click","a",function () {
        $(".dropdown-text").text($(this).text())

        $("[name='brandId']").val($(this).data("id"));

        $form.data("bootstrapValidator").updateStatus("brandId", "VALID");
    })


    //图片上传
    $("#fileupload").fileupload({
        dataType: 'json',
        //上传成功的时候，触发的回调函数
        done: function (e, data) {
            if (imgArr.length >= 3) {
                return;
            }
            console.log(data.result);
            //1. 图片显示，添加成功，往img_box中添加一张图片即可。
            $(".img_box").append('<img src="' + data.result.picAddr + '" width="100" height="100" alt="">');

            //2. 把上传到结果存储到一个数组中。
            // 1. 判断数组的长度就可以知道目前上传了几张图片。
            // 2. 添加商品的时候，可以通过数组拼接出来我们想要的结果
            imgArr.push(data.result);
            console.log(imgArr);

            //3. 根据数组的长度，对productLogo进行校验
            if (imgArr.length === 3) {
                //校验通过即可
                $form.data("bootstrapValidator").updateStatus("productLogo", "VALID");
            } else {
                $form.data("bootstrapValidator").updateStatus("productLogo", "INVALID");
            }


        }
    });


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
            brandId: {
                validators: {
                    notEmpty: {
                        message: "请选择二级分类"
                    }
                }
            },
            proName: {
                validators: {
                    notEmpty: {
                        message: "请输入商品的名称"
                    }
                }
            },
            proDesc: {
                validators: {
                    notEmpty: {
                        message: "请输入商品描述"
                    }
                }
            },
            num: {
                validators: {
                    notEmpty: {
                        message: "请输入商品库存"
                    },
                    regexp: {
                        regexp: /^[1-9]\d*$/,
                        message: "请输入合法的库存"
                    }
                }
            },
            size: {
                validators: {
                    notEmpty: {
                        message: "请输入商品库存"
                    },
                    regexp: {
                        regexp: /^\d{2}-\d{2}$/,
                        message: "请输入合法的尺码，比如(32-44)"
                    }
                }
            },
            oldPrice: {
                validators: {
                    notEmpty: {
                        message: "商品原价不能为空"
                    }
                }
            },
            price: {
                validators: {
                    notEmpty: {
                        message: "商品价格不能为空"
                    }
                }
            },
            productLogo: {
                validators: {
                    notEmpty: {
                        message: "请上传3张图片"
                    }
                }
            },
        }
    });



    //6. 给表单注册校验成功事件
    $form.on("success.form.bv", function (e) {
        e.preventDefault();


        var param = $form.serialize();

        //拼接上数组中picName和picAddr
        param += "&picName1=" + imgArr[0].picName + "&picAddr1=" + imgArr[0].picAddr;
        param += "&picName2=" + imgArr[1].picName + "&picAddr2=" + imgArr[1].picAddr;
        param += "&picName3=" + imgArr[2].picName + "&picAddr3=" + imgArr[2].picAddr;

        console.log(param);
        //发送ajax请求
        $.ajax({
            type: "post",
            url: "/product/addProduct",
            data: param,
            success: function (info) {
                if (info.success) {
                    //1. 隐藏模态框
                    $("#addModal").modal("hide");
                    //2. 重新渲染第一页
                    page = 1;
                    render();

                    //3. 重置表单
                    $form.data("bootstrapValidator").resetForm(true);

                    $(".dropdown-text").text("请选择二级分类");
                    $(".img_box img").remove();//图片自杀

                    //4. 清空数组
                    imgArr = [];

                }
            }
        })

    })
});