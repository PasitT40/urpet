<script setup lang="ts">
import { categories } from '~/data/categories'

const colorClasses: Record<string, string> = {
  sky: 'bg-accent-sky text-primary border-2 border-primary',
  yellow: 'bg-accent-yellow text-primary border-2 border-primary',
  pink: 'bg-accent-pink text-primary border-2 border-primary',
  plain: 'bg-white text-primary border-2 border-primary'
}

defineProps<{ activeId?: string }>()
const emit = defineEmits<{ select: [id: string] }>()
</script>

<template>
  <div class="rounded-card border-2 border-primary bg-white p-6 shadow-sticker shadow-primary">
    <h3 class="mb-4 font-heading text-lg font-bold text-primary">What does your pet need?</h3>
    <div class="flex flex-wrap gap-3">
      <button
        v-for="cat in categories"
        :key="cat.id"
        type="button"
        class="flex items-center gap-2 rounded-pill px-4 py-2 font-nav text-sm font-medium transition"
        :class="[
          colorClasses[cat.color],
          activeId === cat.id ? 'underline underline-offset-4' : ''
        ]"
        @click="emit('select', cat.id)"
      >
        <span>{{ cat.icon }}</span>
        <span>{{ cat.name }}</span>
      </button>
    </div>
  </div>
</template>
