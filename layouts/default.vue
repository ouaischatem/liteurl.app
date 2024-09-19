<script setup lang="ts">
import { SpeedInsights } from '@vercel/speed-insights/vue';
</script>

<template>
  <SpeedInsights />
  <div class="min-h-screen bg-slate-950 flex flex-col justify-center gap-y-7 p-4 lg:p-8">
    <slot/>
  </div>
</template>