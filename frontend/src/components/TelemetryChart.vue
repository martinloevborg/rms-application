<template>
  <div class="chart-container">
    <Line :data="chartData" :options="chartOptions" />
  </div>
</template>

<script setup lang="ts">
import { Line } from 'vue-chartjs'
import {
  Chart as ChartJS,
  Title,
  Tooltip,
  Legend,
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
} from 'chart.js'
import { computed } from 'vue'

ChartJS.register(Title, Tooltip, Legend, LineElement, CategoryScale, LinearScale, PointElement)

const props = defineProps<{
  telemetry: {
    timestamp: string
    metric: string
    value: number
  }[]
}>()

const chartData = computed(() => {
  const labels = props.telemetry.map(entry =>
    new Date(entry.timestamp).toLocaleTimeString()
  )
  const data = props.telemetry.map(entry => entry.value)

  return {
    labels,
    datasets: [
      {
        label: 'Telemetry',
        backgroundColor: '#3b82f6',
        borderColor: '#3b82f6',
        data,
        fill: false,
      },
    ],
  }
})

const chartOptions = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: {
      position: 'top' as const,
    },
    title: {
      display: true,
      text: 'Telemetry Data Over Time',
    },
  },
}
</script>
