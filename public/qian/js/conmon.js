/**
 * Created by Administrator on 2018/1/14.
 */

    mui('.mui-scroll-wrapper').scroll({
        deceleration: 0.0005, //flick 减速系数，系数越大，滚动速度越慢，滚动距离越小，默认值0.0006
        indicators: false
    });
    var gallery = mui('.mui-slider');
    gallery.slider({
        interval:1000//自动轮播周期，若为0则不自动播放，默认为0；
    });

    function getSearchObj () {
        var search = location.search
        search = decodeURI(search);
        search = search.slice(1);
        var arr = search.split("&");
        var obj = {};
        for(var i = 0; i < arr.length; i++) {
          var key = arr[i].split("=")[0];
          var value = arr[i].split("=")[1];

            obj[key]=value;
        }
        return obj

    };
    function getSearch(key) {
        return getSearchObj()[key];
    }


