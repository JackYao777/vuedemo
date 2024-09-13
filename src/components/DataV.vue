<template>
    <div class="data-Box">
        <div class="data-header">
            <h1>这里是大屏数据展示</h1>
        </div>
        <div class="data-content">
            <!-- <div class="box1" style="background-color: antiquewhite;"><dv-border-box-1>dv-border-box-1</dv-border-box-1></div>
            <div class="box2" style="background-color: sandybrown;"><dv-border-box-2>dv-border-box-2</dv-border-box-2></div>
            <div class="box3" style="background-color: mediumaquamarine;"><dv-border-box-3>dv-border-box-3</dv-border-box-3></div>
            <div class="box4" style="background-color: sienna;"><dv-border-box-4>dv-border-box-4</dv-border-box-4></div>
            <div class="box5" style="background-color: antiquewhite;"><dv-border-box-5>dv-border-box-5</dv-border-box-5></div>
            <div class="box6" style="background-color: forestgreen;"><dv-border-box-6>dv-border-box-6</dv-border-box-6></div>
            <div class="box7" style="background-color: seagreen;"><dv-border-box-7>dv-border-box-7</dv-border-box-7></div>
            <div class="box8" style="background-color: skyblue;"><dv-border-box-8>dv-border-box-8</dv-border-box-8></div> -->
            <div class="box1">
                <dv-border-box-1>
                    <h2>这是标题</h2>
                    <dv-active-ring-chart :config="config" style="width:100%;height:100%" />
                </dv-border-box-1>
            </div>
            <div class="box2"><dv-border-box-2></dv-border-box-2></div>
            <div class="box3"><dv-border-box-3>dv-border-box-3</dv-border-box-3></div>
            <div class="box4"><dv-border-box-4>dv-border-box-4</dv-border-box-4></div>
            <div class="box5"><dv-border-box-5>dv-border-box-5</dv-border-box-5></div>
            <div class="box6"><dv-border-box-6>dv-border-box-6</dv-border-box-6></div>
            <div class="box7"><dv-border-box-8>dv-border-box-7</dv-border-box-8></div>
            <div class="box8"><dv-border-box-8>dv-border-box-8</dv-border-box-8></div>
        </div>
    </div>
</template>
<script>
export default {
    name: 'DataV',
    data() {
        return {
            config: {
                data: [
                    {
                        name: '周口',
                        value: 55
                    },
                    {
                        name: '南阳',
                        value: 120
                    },
                    {
                        name: '西峡',
                        value: 78
                    },
                    {
                        name: '驻马店',
                        value: 66
                    },
                    {
                        name: '新乡',
                        value: 80
                    }
                ],
                lineWidth: 10
            },
            chartData: {
                columns: ['日期', '访问用户', '下单用户'],
                rows: [
                    { '日期': '2018-05-22', '访问用户': 32371, '下单用户': 19810 },
                    { '日期': '2018-05-23', '访问用户': 12328, '下单用户': 4398 },
                    { '日期': '2018-05-24', '访问用户': 92381, '下单用户': 52910 }
                ]
            },
            pieExtend:{
                
            }

        }
    }
}
</script>
<style lang="less" scoped>
.data-Box {
    margin: 0;
    padding: 0;
    height: 100%;
    // border: 1px solid orange;
    background-image: url('../assets/bgimg.jpg');

    .data-header h1 {
        height: 50px;
        text-align: center;
        line-height: 50px;
        text-shadow: 2px 2px 5px green, 0 0 10px red;
        font-style: italic;
        font-size: 25px;
    }

    h2 {
        position: absolute;
        left: 50%;
        transform: translate(-50%);
        font-size: 20px;
    }

    .data-content {
        height: calc(100% - 50px);
        display: grid;
        grid-template-columns: repeat(3, 1fr);
        grid-template-rows: repeat(3, 1fr);
        gap: 10px;

        .box7 {
            grid-column: span 2;
        }
    }
}
</style>