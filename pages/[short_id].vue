<script lang="ts" setup>
import AppLoadingIcon from "~/components/icons/AppLoadingIcon.vue";
const router = useRouter();
const route = useRoute();

onMounted(async () => {
  const short_id = route.params.short_id as string;

  if (!short_id) {
    await router.push('/');
    return;
  }

  const response = await fetch(`/api/urls/${short_id}`);
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
    <AppLoadingIcon/>
    <h1 class="text-center text-pink-400 uppercase font-semibold text-xl ml-3">
      Redirecting...
    </h1>
  </div>
</template>

<style scoped>
</style>