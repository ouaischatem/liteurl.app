<script lang="ts" setup>
const router = useRouter();
const route = useRoute();

onMounted(async () => {
  const short_id = route.params.short_id as string;

  if (!short_id) {
    await router.push('/');
    return;
  }

  const response = await fetch(`/api/resolve/${short_id}`);
  const data = await response.json();

  if (response.ok && data.original_url) {
    window.location.href = data.original_url;
    return;
  }
  await router.push('/');
});
</script>

<template>
  <div class="h-screen justify-center items-center bg-black flex flex-col gap-y-2">
    <div class="w-20 h-20 border-4 border-t-4 border-gray-300 border-t-pink-400 rounded-full animate-spin-fast"></div>
    <h1 class="text-center text-pink-400 uppercase font-semibold text-xl ml-3">
      Redirecting...
    </h1>
  </div>
</template>

<style scoped>
.animate-spin-fast {
  animation: spin 0.6s linear infinite;
}

@keyframes spin {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
</style>