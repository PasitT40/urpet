<script setup lang="ts">
import { boCategoryNames } from '~/data/backoffice'

const model = defineModel<string>({ required: true })

const tabs = ['ทั้งหมด', ...boCategoryNames]
</script>

<template>
  <div class="flex flex-wrap gap-3">
    <button
      v-for="tab in tabs"
      :key="tab"
      type="button"
      class="flex h-[38px] items-center rounded-pill px-5 text-[14px] transition"
      :class="
        model === tab
          ? 'bg-primary font-semibold text-white'
          : 'border border-bo-border bg-white text-bo-soft hover:bg-white'
      "
      @click="model = tab"
    >
      {{ tab }}
    </button>
  </div>
</template>
