<script lang="ts" setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import AppStarIcon from "~/components/icons/AppStarIcon.vue";

const router = useRouter();
const url = ref<string>('');

const handleSubmit = () => {
  const segments = url.value.split('/');
  const identifier = segments.pop();
  router.push(`/analytics/${identifier}`);
};
</script>

<template>
  <div class="flex flex-row justify-center items-center gap-x-2">
    <AppStarIcon />
    <h1 class="text-xl sm:text-2xl lg:text-3xl font-extrabold bg-gradient-to-l from-indigo-300 via-indigo-200 to-indigo-300 bg-clip-text text-transparent uppercase">
      Welcome to LiteURL <span class="text-pink-400 uppercase">Analytics</span>
    </h1>
  </div>
  <h1 class="text-center text-xl sm:text-3xl lg:text-5xl font-extrabold bg-gradient-to-l from-gray-100 to-gray-200 bg-clip-text text-transparent leading-tight">
    Analyze Your Shortened URLs <br /> Instantly and Effectively
  </h1>
  <h2 class="text-center text-gray-400 text-sm sm:text-base lg:text-lg">
    Enter a shortened URL to view detailed analytics and insights <br /> on its performance and usage
  </h2>
  <form class="flex flex-col sm:flex-row justify-center gap-4 sm:gap-2" @submit.prevent="handleSubmit">
    <input id="url" v-model="url" class="w-full sm:w-64 lg:w-80 p-3 placeholder:text-sm sm:placeholder:text-lg lg:placeholder:text-xl font-medium bg-slate-800 rounded-xl text-white outline-0 ring-0"
           placeholder="Enter your shortened URL"
           required type="url">
    <button class="p-3 rounded-xl bg-slate-950 text-white uppercase font-bold w-full sm:w-48 lg:w-56 border-indigo-500 border"
            type="submit">
      Go to Dashboard
    </button>
  </form>
</template>

<style scoped>
</style>