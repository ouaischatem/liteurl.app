<script lang="ts" setup>
import type { AnalyticsData, UsageCount } from "~/types/analytics";
import AppErrorIcon from "~/components/icons/AppErrorIcon.vue";
import AppArrowIcon from "~/components/icons/AppArrowIcon.vue";

const route = useRoute();
const shortId = route.params.short_id as string;
const data = ref<AnalyticsData>();
const error = ref(false);
const osData = ref<UsageCount[]>([]);
const browserData = ref<UsageCount[]>([]);
const countryData = ref<UsageCount[]>([]);

const generateDataCount = (key: 'os' | 'country' | 'browser') => {
  const result = data.value?.details.reduce<Record<string, UsageCount>>((acc, detail) => {
    const value = detail[key];

    if (value) {
      if (!acc[value]) {
        const country = key === 'country' ? detail.country_code : undefined;
        acc[value] = { name: value, count: 0, country };
      }
      acc[value].count += 1;
    }

    return acc;
  }, {}) || {};

  return Object.values(result).sort((a, b) => b.count - a.count);
};

onMounted(async () => {
  const response = await $fetch(`/api/analytics/${shortId}`) as AnalyticsData;
  if (response.original_url) {
    data.value = response;

    osData.value = generateDataCount('os');
    browserData.value = generateDataCount('browser');
    countryData.value = generateDataCount('country');
    return;
  }
  error.value = true;
});

const openAnalytics = () => {
  navigateTo(`/analytics/`);
};
</script>

<template>
  <AppModal :is-visible="error">
    <AppErrorIcon/>
    <h2 class="text-xl sm:text-2xl lg:text-3xl font-extrabold text-white mb-2 text-center">Oops, something went wrong!</h2>
    <p class="text-gray-400 mb-6 text-center">
      We couldn't find any information about your link. It might be incorrect or has been deleted. Please check the URL and try again.
    </p>
    <button class="w-full bg-red-500 hover:bg-red-600 text-white py-2 rounded-lg text-sm font-semibold transition-colors uppercase"
            @click="openAnalytics">
      Back
    </button>
  </AppModal>

  <div class="flex flex-col gap-y-5" v-if="data">
    <div class="flex flex-col gap-y-2 md:items-start items-center">
      <h1 class="text-white font-semibold text-3xl">URL Analytics -
        <span class="text-pink-500 border-t border-pink-500">{{data.details.length}}</span>
        <span class="border-t border-pink-500"> clicks</span>
      </h1>
      <div class="flex flex-row gap-x-2">
        <h1 class="font-medium text-gray-300 mt-0.5">{{data.original_url}}</h1>
        <AppArrowIcon />
      </div>
    </div>
    <div class="border border-gray-700 rounded-lg">
      <AppChart :data="data"/>
    </div>
    <div class="flex md:flex-row flex-col gap-y-5 gap-x-5 items-center justify-center">
      <AppCard
          title="Countries"
          :data="countryData"
      />
      <AppCard
          title="Browsers"
          :data="browserData"
      />
      <AppCard
          title="Operating Systems"
          :data="osData"
      />
    </div>
  </div>
</template>

<style scoped>
</style>