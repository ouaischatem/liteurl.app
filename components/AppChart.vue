<template>
  <div ref="chart" class="h-96"></div>
</template>

<script lang="ts" setup>
import * as echarts from 'echarts';
const chart = ref<HTMLDivElement | null>(null);

onMounted(() => {
  if (chart.value) {
    const chartInstance = echarts.init(chart.value);

    const updateChart = () => {
      const option = {
        xAxis: {
          type: 'category',
          boundaryGap: false,
          data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
          splitLine: { show: false }
        },
        yAxis: {
          type: 'value',
          splitLine: {
            show: true,
            lineStyle: {
              color: '#374151',
              width: 2,
              type: 'solid'
            }
          }
        },
        series: [
          {
            data: [10, 5, 10, 25, 30, 14, 10],
            type: 'line',
            smooth: true,
            areaStyle: {
              color: 'rgba(3,86,175,0.3)'
            },
            lineStyle: {
              color: '#007bff',
              width: 2
            }
          }
        ]
      };
      chartInstance.setOption(option);
    };
    updateChart();

    onBeforeUnmount(() => {
      chartInstance.dispose();
    });
  }
});
</script>

<style scoped>
</style>