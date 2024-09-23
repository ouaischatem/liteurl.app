<script setup lang="ts">
import type {UsageCount} from "~/types/analytics";

const props = defineProps({
  title: {
    type: String,
    default: ''
  },
  data: {
    type: Array as () => UsageCount[],
    default: () => []
  }
});

const limitedData = computed(() => props.data.slice(0, 5));
</script>

<template>
  <div class="flex flex-col border border-gray-700 md:w-1/3 w-full rounded-lg md:h-84">
    <div class="flex flex-row justify-between p-3 pt-5 pb-5 px-5">
      <h1 class="text-white text-lg font-medium">{{ title }}</h1>
      <h1 class="text-gray-400 text-sm font-normal uppercase mt-1.5">Visitors</h1>
    </div>
    <div class="border border-gray-700 border-1"></div>

    <div class="flex flex-col gap-y-1 py-2">
      <div
          v-for="(item, index) in limitedData"
          :key="index"
          :class="[
          'px-3 border-l-2 border-slate-950 hover:border-white hover:bg-gradient-to-r hover:from-gray-900 hover:to-slate-950 p-1',
          index === 4 ? 'opacity-50' : ''
        ]"
      >
        <div class="flex flex-row justify-between bg-slate-900 p-1 px-3 py-2 rounded-lg text-white font-medium hover:bg-slate-800">
          <div class="flex flex-row gap-x-2">
            <img v-if="item.country" class="w-5 h-5 mt-0.5 shadow shadow-slate-600"
                 :src="`https://flagcdn.com/${item.country.toLowerCase()}.svg`"
                 :alt=item.name>
            <span>{{ item.name }}</span>
          </div>
          <span>{{ item.count }}</span>
        </div>
      </div>

      <div v-if="props.data?.length > 4" class="flex justify-center">
        <button
            class="border border-gray-700 rounded-xl uppercase font-medium text-white hover:text-gray-200 text-sm px-3 p-0.5"
        >
          View all
        </button>
      </div>
    </div>
  </div>
</template>

<style scoped>
</style>