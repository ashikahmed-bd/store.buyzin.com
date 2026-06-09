<script setup>
import { ref } from 'vue'
import ApexChart from 'vue3-apexcharts'

const series = ref([
  {
    name: 'Sales',
    data: [31, 40, 28, 51, 42, 60, 65]
  }
])

const options = ref({
  chart: {
    type: 'area',
    height: 350,
    toolbar: {
      show: false
    },
    zoom: {
      enabled: false
    }
  },

  dataLabels: {
    enabled: false
  },

  stroke: {
    curve: 'smooth',
    width: 3
  },

  colors: ['#6366F1'],

  fill: {
    type: 'gradient',
    gradient: {
      shadeIntensity: 1,
      opacityFrom: 0.4,
      opacityTo: 0.05,
      stops: [0, 90, 100]
    }
  },

  grid: {
    borderColor: '#E5E7EB',
    strokeDashArray: 4
  },

  xaxis: {
    categories: [
      'Jan',
      'Feb',
      'Mar',
      'Apr',
      'May',
      'Jun',
      'Jul'
    ],
    axisBorder: {
      show: false
    },
    axisTicks: {
      show: false
    }
  },

  legend: {
    show: false
  }
})
</script>

<template>
  <div class="rounded-2xl border border-slate-200 bg-white p-6">
    <div class="mb-6 flex items-center justify-between">
      <div>
        <h3 class="font-semibold text-slate-900">
          Sales Analytics
        </h3>

        <p class="mt-1 text-sm text-slate-500">
          Last 7 months sales performance
        </p>
      </div>

      <select class="rounded-lg border border-slate-200 px-3 py-2 text-sm">
        <option>Last 7 Days</option>
        <option>Last Month</option>
        <option>Last Year</option>
      </select>
    </div>

    <ApexChart
      
      type="area"
      :options="options"
      :series="series"
    />
  </div>
</template>