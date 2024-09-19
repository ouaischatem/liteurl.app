<template>
  <Transition
      enter-active-class="transition transform duration-300 ease-out"
      enter-from-class="scale-75 opacity-0"
      enter-to-class="scale-100 opacity-100"
      leave-active-class="transition transform duration-200 ease-in"
      leave-from-class="scale-100 opacity-100"
      leave-to-class="scale-75 opacity-0"
  >
    <div v-if="isVisible" class="fixed inset-0 bg-slate-950 bg-opacity-80 flex items-center justify-center px-4 lg:px-8">
      <div class="bg-slate-900 rounded-xl p-6 shadow-2xl max-w-md lg:max-w-lg w-full">
        <slot/>
      </div>
    </div>
  </Transition>
</template>

<script lang="ts" setup>
defineProps({
  isVisible: Boolean
});
</script>

<style scoped>
</style>