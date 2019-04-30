<template>
   <div id="report" class="report" :style="{
   height: height ? height + 'px' : 180+'px'
   }"></div>
</template>

<script>
import moment from 'moment';

import ECharts from 'echarts';

export default {

  name: 'runchart',

  props: ['height'],

  data () {
    return {

    };
  },

  methods:{ 
    renderChart({xAxis,series, name , series2, name2}) {
      if (!this.chart) {
        this.chart = ECharts.init(document.getElementById('report'));
      }

      let options = {
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            lineStyle: {
              color: '#efb320'
            }
          },
          extraCssText: 'text-align:left'
        },
        legend: {
          show: false
        //   data: ['销售额', '销售笔数']
        },
        grid: {
          top: '10%',
          left: '3%',
          right: '4%',
          bottom: '7%',
          containLabel: true
        },
        xAxis: {
          type: 'category',
          data: xAxis,
          // boundaryGap: ['0%', '0%'],
          axisLine: {
            lineStyle: {
              color: ['#888']
            },
          },
          axisLabel: {
            // margin: 10,
            textStyle: {
              fontSize: 12,
              color: '#666'
            }
          },
          // boundaryGap: true,

          axisTick: {
            alignWithLabel: true
          },

        },
        yAxis: [{
          // name: '销售额',
          splitLine: {
            show: true,
            lineStyle: {
              type: 'doted',
              color: ['#eee', '#f1f1f1']
            }
          },
          nameGap: 10,
          // boundaryGap: true,
          position: 'left',
          axisLine: {
            show: false,
            lineStyle: {
              color: ['#eee']
            },

          },
          axisLabel: {
            // margin: 10,
            textStyle: {
              fontSize: 12
            }
          },
          axisTick: {
            alignWithLabel: true
          },
          axisLabel: {
            formatter: (value) => {
              let label;
              if (value >= 1000) {

                label = `${value/1000}K`
              } else {
                label = `${value}`
              }
              if(name == '销售额'){
                return '¥'+label
              }else{
                return label
              }
            },
            textStyle: {
              color: '#888'
            }
          }
        }, 
        ],

        series: [{
          name,
          type: 'line',
          data: series,
          // smooth: true,
          yAxisIndex: 0,
          itemStyle: {
            normal: {
              // color: '#66acf6'
              color: 'rgb(88,206,240)'
            }
          },
          lineStyle: {
            normal: {
              width: 1,
            }
          },
          splitNumber: 5,
          areaStyle: {
            normal: {
              color: new ECharts.graphic.LinearGradient(0, 0, 0, 1, [{
                offset: 0,
                color: 'rgba(88,206,240,.8)'
              }, {
                offset: 0.8,
                color: 'rgba(177,249,168,.5)'
              }], false),
              shadowColor: 'rgba(177,249,168,.5)',
              shadowBlur: 10
            }
          },
          z: 2,
        },{
          name:name2,
          type: 'line',
          data: series2 || null ,
          // smooth: true,
          yAxisIndex: 0,
          itemStyle: {
            normal: {
              // color: '#66acf6'
              color: '#e09153'
            }
          },
          lineStyle: {
            normal: {
              width: 1,
            }
          },
          splitNumber: 5,
          areaStyle: {
            normal: {
              color: new ECharts.graphic.LinearGradient(0, 0, 0, 1, [{
                offset: 0,
                color: '#e09153'
              }, {
                offset: 0.8,
                color: '#e8c90c'
              }], false),
              shadowColor: '#efc745',
              shadowBlur: 10
            }
          },
          z: 2,
        },
        ],

      }


      this.chart.setOption(options);
    }
  },
  mounted(){
    this.$nextTick(()=>{
      this.$root.$on('render-chart', (data)=>{
        this.renderChart(data);
      })
    })
  }
};
</script>

<style lang="stylus" scoped>
  .report
    width 100%
    height 160px
</style>