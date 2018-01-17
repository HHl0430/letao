/**
 * Created by Administrator on 2018/1/16.
 */

$(function () {

    function render  () {
        var param = {};
        param.page=1;
        param.pageSize = 100;
        param.proName =$(".search_text").val();
        var $sort = $(".lt_sort a.now")
        if($sort.length>0){
            var type = $sort.data("type");
            var value = $sort.find("span").hasClass("fa-angle-down")?2: 1;
            param[type] =value;

        }
        console.log(param);
        $.ajax({
            type:'get',
            url:'/product/queryProduct',
            data:param,
            success:function (info) {
                console.log(info);
                $(".lt_product").html(template("tpl",info))
            }
        })

    };

    //2. 点击搜索按钮时，获取搜索框的内容
    $(".search_btn").on("click", function () {

        $(".lt_sort a").removeClass("now");
        $(".lt_sort span").removeClass("fa-angle-up").addClass("fa-angle-down");

        render();
    });

//    页面加载时 将携带的key值 输入到input框中


           var key = getSearch("key");
        $(".search_text").val(key)
        render  ()

    $(".lt_sort > a[data-type]").on("click",function () {
        var $this = $(this);
        if ($this.hasClass("now")) {
            //有now这个类，修改a标签下面的span标签的 fa-angle-down
            $this.find("span").toggleClass("fa-angle-down").toggleClass('fa-angle-up');
        } else {
            //没有now这类，添加这个类
            $this.addClass("now").siblings().removeClass("now");
            //让所有的箭头都向下
            $(".lt_sort span").removeClass("fa-angle-up").addClass("fa-angle-down");
        };
        render()
    })
})
