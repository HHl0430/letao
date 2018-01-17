/**
 * Created by Administrator on 2018/1/16.
 */
$(function () {

    //获取存在localstorage中的search_history
    function getHistory () {
        var history = localStorage.getItem("search_history") || '[]';
        var arr = JSON.parse(history);
        return arr;
    };
    //渲染历史记录
    function render () {
        var arr = getHistory();
        $('.lt_history').html(template("tpl",{arr:arr}))
    }
    render();

    //删除单个历史记录
    $(".lt_history").on("click",".btn_delete",function () {
        var index = $(this).data("index");
        var arr = getHistory();
        arr.splice(index,1)
        localStorage.setItem("search_history",JSON.stringify(arr));
        render();
    });
//    全部删除
    $(".lt_history").on("click",".btn_empty",function () {
        mui.confirm("您是否要清空所有的历史记录?", "温馨提示", ["是", "否"],function (e){
            if(e.index === 0){
                //直接把localStorage中的lt_search_history删掉
                localStorage.removeItem("search_history");
                render();
            }
        })

    });
    $(".search_btn").on("click",function () {


        console.log(1);
        var key = $(".search_text").val().trim();
        $(".search_text").val('');
        if(!key){
            mui.toast("请输入搜索关键字");
            return;
        };
        var arr = getHistory();
        var index = arr.indexOf(key)
        if(index !=-1){
            arr.splice(index, 1);
        }
        if(arr.length >=10  ){
            arr.pop();
        }

        arr.unshift(key);
        localStorage.setItem("search_history",JSON.stringify(arr));
        render();
        location.href = "searchList.html?key="+key;
    })

})