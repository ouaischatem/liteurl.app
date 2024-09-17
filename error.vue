<script lang="ts" setup>

import type {NuxtError} from "#app";

defineProps({
  error: Object as () => NuxtError
})

watchEffect(error => {
  navigateTo("/")
});

</script>

<template>
</template>
