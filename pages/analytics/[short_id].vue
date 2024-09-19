<script lang="ts" setup>
const route = useRoute();
</script>

<template>
  <h1 class="text-center text-white uppercase font-semibold text-xl ml-3">
    Dashboard of {{route.params.short_id}}
  </h1>
</template>

<style scoped>
</style>