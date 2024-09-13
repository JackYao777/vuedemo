<template>
    <div>
        <!-- <ve-pie :data="chartData" :pieExtend="pieExtend"></ve-pie> -->
          <!-- <ve-line :data="chartData"></ve-line> -->
          <!-- <ve-bar :data="chartData"></ve-bar> -->

          <!-- <ve-candle :data="chartData"></ve-candle> -->
          <!-- <ve-radar :data="chartData"></ve-radar> -->
           <!-- <ve-map :data="chartData"></ve-map> -->
            <!-- <ve-heatmap :data="chartData"></ve-heatmap> -->
            <ve-gauge :data="chartData"></ve-gauge>
    </div>
</template>
<script>
export default {
    name: 'EchartsV',
    data() {
        return {
            chartData: {
                columns: ['日期', '访问用户', '下单用户'],
                rows: [
                    { '日期': '2024-05-22', '访问用户': 32371, '下单用户': 19810 },
                    { '日期': '2024-05-23', '访问用户': 12328, '下单用户': 4398 },
                    { '日期': '2024-05-24', '访问用户': 92381, '下单用户': 52910 },
                    { '日期': '2024-05-25', '访问用户': 92381, '下单用户': 52910 },
                    { '日期': '2024-05-26', '访问用户': 92381, '下单用户': 52910 }
                ]
            }
            // pieExtend:{
            //     legned:{

            //     }
            // }

        }
    },
    created(){

    }
}
</script>
<style lang="">
    
</style>