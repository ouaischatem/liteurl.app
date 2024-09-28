<template>
  <div ref="chart" class="h-96"></div>
</template>

<script lang="ts" setup>
import * as echarts from 'echarts';
import type { AnalyticsData, ClickDetail } from '~/types/analytics';

const props = defineProps<{
  data: AnalyticsData;
}>();

const chart = ref<HTMLDivElement | null>(null);

const generateDateRange = (start: Date, end: Date): string[] => {
  const dates: string[] = [];
  const currentDate = new Date(start);

  while (currentDate <= end) {
    dates.push(currentDate.toISOString().split('T')[0]);
    currentDate.setDate(currentDate.getDate() + 1);
  }

  return dates;
};

const mapClicksToDates = (xAxisData: string[], clickDetails: ClickDetail[]): number[] => {
  const clickMap: Record<string, number> = {};

  clickDetails.forEach(detail => {
    const date = new Date(detail.timestamp).toISOString().split('T')[0];
    clickMap[date] = (clickMap[date] || 0) + 1;
  });

  return xAxisData.map(date => clickMap[date] || 0);
};

onMounted(() => {
  if (chart.value) {
    const chartInstance = echarts.init(chart.value);

    const clickDetails = props.data.details;

    if (clickDetails.length > 0) {
      const timestamps = clickDetails.map(detail => new Date(detail.timestamp));

      const startDate = new Date(Math.min(...timestamps.map(date => date.getTime())));
      const endDate = new Date(Math.max(...timestamps.map(date => date.getTime())));

      const xAxisData = generateDateRange(startDate, endDate);
      const yAxisData = mapClicksToDates(xAxisData, clickDetails);

      const option = {
        tooltip: {
          trigger: 'axis',
          formatter: (params: any) => {
            const date = params[0].name;
            const value = params[0].value;
            return `${date}<br />Clicks: ${value}`;
          }
        },
        xAxis: {
          type: 'category',
          boundaryGap: false,
          data: xAxisData,
          splitLine: { show: false },
          axisLabel: {
            formatter: (value: string) => {
              const date = new Date(value);
              const day = date.getDate();
              const month = date.toLocaleString('default', { month: 'short' });
              return `${day} ${month}`;
            }
          }
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
            data: yAxisData,
            type: 'line',
            smooth: true,
            areaStyle: {
              color: '#c45f8f'
            },
            lineStyle: {
              color: '#D63384',
              width: 2
            },
            itemStyle: {
              normal: {
                color: '#D63384',
                borderColor: '#fff',
                borderWidth: 2
              },
              emphasis: {
                color: '#FF69B4'
              }
            }
          }
        ]
      };

      chartInstance.setOption(option);
    }
  }
});
</script>

<style scoped>
</style>