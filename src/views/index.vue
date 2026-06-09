<script setup>
import { onMounted } from 'vue';
import { useAppStore } from '@/stores/app';
import Default from '@/layouts/Default.vue';
import SalesAnalytics from '@/components/SalesAnalytics.vue';

const appStore = useAppStore();

const loadDashboard = async () => {
  await appStore.getDashboard();
};

onMounted(() => {
  loadDashboard();
});
</script>


<template>
  <Default>
    <!-- Stats -->
    <div class="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-4">
      <div class="rounded-2xl border border-slate-200 bg-white p-6">
        <p class="text-sm text-slate-500">
          Total Revenue
        </p>
        <h3 class="mt-2 text-3xl font-bold">
          ৳245,000
        </h3>
      </div>

      <div class="rounded-2xl border border-slate-200 bg-white p-6">
        <p class="text-sm text-slate-500">
          Orders
        </p>
        <h3 class="mt-2 text-3xl font-bold">
          1,248
        </h3>
      </div>

      <div class="rounded-2xl border border-slate-200 bg-white p-6">
        <p class="text-sm text-slate-500">
          Customers
        </p>
        <h3 class="mt-2 text-3xl font-bold">
          856
        </h3>
      </div>

      <div class="rounded-2xl border border-slate-200 bg-white p-6">
        <p class="text-sm text-slate-500">
          Conversion
        </p>
        <h3 class="mt-2 text-3xl font-bold">
          12.4%
        </h3>
      </div>
    </div>

    <!-- Content Area -->
    <div class="mt-8 grid grid-cols-1 gap-6 xl:grid-cols-3">
      <div class="xl:col-span-2 ">
        <SalesAnalytics/>
      </div>

      <div class="rounded-2xl border border-slate-200 bg-white p-6">
        <h3 class="font-semibold">
          Recent Activity
        </h3>

        <div class="mt-4 space-y-4 h-96 overflow-y-auto scrollbar">
          <div v-for="i in 10" :key="i" class="flex items-center gap-3">
            <div class="h-10 w-10 rounded-full bg-indigo-100" />

            <div>
              <p class="font-medium">
                New order received
              </p>
              <p class="text-xs text-slate-500">
                2 min ago
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </Default>
</template>

<style scoped></style>
