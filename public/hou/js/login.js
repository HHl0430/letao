/**
 * Created by Administrator on 2018/1/11.
 */
$(function () {
   var $form = $('form');
    $form.bootstrapValidator({
        message: 'This value is not valid',
        feedbackIcons: {
            valid: 'glyphicon glyphicon-ok',
            invalid: 'glyphicon glyphicon-remove',
            validating: 'glyphicon glyphicon-refresh'
        },
        fields: {
            username: {
                message: '用户名验证失败',
                validators: {
                    notEmpty: {
                        message: '用户名不能为空'
                    },
                    callback: {
                        message: "用户名不存在"
                    }
                }
            },
            password: {
                validators: {
                    notEmpty: {
                        message: '密码不能为空'
                    },
                    stringLength: {
                        min: 6,
                        max: 12,
                        message: '用户名长度必须在6到12之间'
                    },
                    callback: {
                        message: "密码错误"
                    }
                }
            }
        }
    });

    $form.on('success.form.bv', function (e) {
        e.preventDefault();
        console.log("嘿嘿嘿");
        $.ajax({
            type:"post",
            url:"/employee/employeeLogin",
            data: $form.serialize(),
            success:function (info) {
                console.log(info);
                if(info.success){
                    location.href="index.html"
                }
                if(info.error === 1000){
                    $form.data("bootstrapValidator").updateStatus("username", "INVALID","callback");
                }
                if(info.error === 1001){
                    $form.data("bootstrapValidator").updateStatus("password", "INVALID","callback");
                }
            }
        })
    });
    $(".reset").on("click",function () {
        $form.data("bootstrapValidator").resetForm();
    })

})