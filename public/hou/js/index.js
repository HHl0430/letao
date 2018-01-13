/**
 * Created by Administrator on 2018/1/11.
 */
var myChart = echarts.init(document.querySelector(".pic_left"));

    var option = {
        title: {
            text: '2017 注册人数 '
        },
        tooltip: {},
        legend: {
            data:['人数']
        },
        xAxis: {
            data: ["1月","2月","3月","4月","5月","6月"]
        },
        yAxis: {},
        series: [{
            name: '人数',
            type: 'bar',
            data: [500, 2000, 3600, 1000, 1012, 2000]
        }]
    };
myChart.setOption(option);


var myChart1 = echarts.init(document.querySelector(".pic_right"));
option1 = {
    title : {
        text: '热门销售品牌',
        subtext: '2017年12月',
        x:'center'
    },
    tooltip : {
        trigger: 'item',
        formatter: "{a} <br/>{b} : {c} ({d}%)"
    },
    legend: {
        orient: 'vertical',
        left: 'left',
        data: ['阿迪','美特斯邦威','阿迪王','李宁','安踏']
    },
    series : [
        {
            name: '访问来源',
            type: 'pie',
            radius : '55%',
            center: ['50%', '60%'],
            data:[
                {value:335, name:'阿迪'},
                {value:310, name:'美特斯邦威'},
                {value:234, name:'阿迪王'},
                {value:135, name:'李宁'},
                {value:1548, name:'安踏'}
            ],
            itemStyle: {
                emphasis: {
                    shadowBlur: 10,
                    shadowOffsetX: 0,
                    shadowColor: 'rgba(0, 0, 0, 0.5)'
                }
            }
        }
    ]
};
myChart1.setOption(option1);
