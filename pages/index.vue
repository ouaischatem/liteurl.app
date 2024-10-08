<template>
  <div class="flex flex-row justify-center items-center gap-x-2">
    <AppStarIcon/>
    <h1 class="text-xl sm:text-2xl lg:text-3xl font-extrabold bg-gradient-to-l from-indigo-300 via-indigo-200 to-indigo-300 bg-clip-text text-transparent uppercase">
      Welcome to LiteURL
    </h1>
  </div>
  <h1 class="text-center text-xl sm:text-3xl lg:text-5xl font-extrabold bg-gradient-to-l from-gray-100 to-gray-200 bg-clip-text text-transparent leading-tight">
    Shorten your URLs instantly <br/> and share them easily
  </h1>
  <h2 class="text-center text-gray-400 text-sm sm:text-base lg:text-lg">
    Enter a website URL to generate a shorter link and share it <br/> easily across your platforms
  </h2>
  <form class="flex flex-col items-center justify-center gap-y-3" @submit.prevent="createUrl">
    <input id="url" v-model="url" class="w-80 lg:w-96 p-3 placeholder:text-sm sm:placeholder:text-lg lg:placeholder:text-xl font-medium bg-slate-800 rounded-xl text-white outline-0 ring-0"
           placeholder="Entre the URL"
           required type="url">
    <button class="w-80 lg:w-96 p-2 rounded-xl text-white uppercase font-bold bg-indigo-500 hover:bg-indigo-400"
            type="submit">
      <AppLoadingIcon v-if="isProcessing"/>
      <span v-else>Shorten</span>
    </button>
  </form>
  <div class="flex justify-center -m-4">
    <a class="cursor-pointer text-center w-80 lg:w-96 p-2 rounded-xl text-white uppercase font-bold bg-pink-500 hover:bg-pink-400"
       @click="openAnalytics">
      <span>Go to analytics</span>
    </a>
  </div>

  <AppModal :is-visible="short_id.length > 0">
    <AppSuccessIcon/>
    <h2 class="text-xl sm:text-2xl lg:text-3xl font-extrabold text-white mb-2 text-center">URL Successfully
      Shortened!</h2>
    <p class="text-gray-400 mb-6 text-center">
      Your link has been generated. Use it to easily share your content. You can copy it by clicking the button below.
    </p>
    <div class="flex items-center justify-between mb-6 bg-slate-800 rounded-lg px-4 py-2">
      <p class="text-white truncate text-sm sm:text-base lg:text-lg">{{ config.public.baseURL + short_id }}</p>
      <button class="ml-2 bg-indigo-500 hover:bg-indigo-600 text-white px-3 py-2 rounded-lg text-sm transition-colors font-semibold uppercase"
              @click="copyToClipboard">
        Copy
      </button>
    </div>
    <div class="flex flex-col gap-y-2">
      <button class="w-full bg-green-500 hover:bg-green-600 text-white py-2 rounded-lg text-sm font-semibold transition-colors uppercase"
              @click="openAnalytics">
        Open Analytics
      </button>
      <button class="w-full bg-red-500 hover:bg-red-600 text-white py-2 rounded-lg text-sm font-semibold transition-colors uppercase"
              @click="closeModal">
        Close
      </button>
    </div>
  </AppModal>

  <AppModal :is-visible="error.length > 0">
    <AppErrorIcon/>
    <h2 class="text-xl sm:text-2xl lg:text-3xl font-extrabold text-white mb-2 text-center">Something Went Wrong!</h2>
    <p class="text-gray-400 mb-6 text-center">
      There was an error while processing your request. Please try again later.
    </p>
    <button class="w-full bg-red-500 hover:bg-red-600 text-white py-2 rounded-lg text-sm font-semibold transition-colors uppercase"
            @click="closeModal">
      Close
    </button>
  </AppModal>
</template>

<script setup>

import AppStarIcon from "~/components/icons/AppStarIcon.vue";
import AppSuccessIcon from "~/components/icons/AppSuccessIcon.vue";
import AppErrorIcon from "~/components/icons/AppErrorIcon.vue";
import AppLoadingIcon from "~/components/icons/AppLoadingIcon.vue";

const config = useRuntimeConfig();
const url = ref('');
const short_id = ref('');
const error = ref('');
const isProcessing = ref(false)

const createUrl = async () => {
  isProcessing.value = true;
  const result = await $fetch('/api/urls/create', {
    method: 'POST',
    body: {
      original_url: url.value,
    },
  });

  isProcessing.value = false;
  if (result.error) {
    error.value = result.error;
    sendToast(error.value, "error")
    return;
  }
  short_id.value = result.data.short_id;
  url.value = '';
};

const closeModal = () => {
  short_id.value = '';
  error.value = '';
};

const copyToClipboard = () => {
  navigator.clipboard.writeText(`${config.public.baseURL}${short_id.value}`);
  sendToast("Link copied to clipboard", "success");
};

const openAnalytics = () => {
  let identifier
  if (short_id.value) {
    identifier = short_id.value;
  } else if (url.value) {
    const input = url.value.trim();

    if (input.includes('/')) {
      const segments = input.split('/');
      identifier = segments.pop();
    } else {
      identifier = input;
    }
  }
  if (identifier) {
    navigateTo(`/analytics/${identifier}`)
  }
}
</script>

<style scoped>
</style>