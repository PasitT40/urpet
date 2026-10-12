<script setup lang="ts">
defineProps<{ title: string; subtitle: string }>()
</script>

<template>
  <header class="flex h-[112px] items-center justify-between border-b border-bo-border bg-white px-8">
    <div>
      <h1 class="text-[20px] font-bold text-primary">{{ title }}</h1>
      <p class="mt-1 text-[13px] text-bo-muted">{{ subtitle }}</p>
    </div>
    <div class="flex items-center gap-3">
      <slot />
    </div>
  </header>
</template>
