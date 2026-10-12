<script setup lang="ts">
import { computed } from 'vue'
import type { Product } from '~/data/products'

const props = withDefaults(defineProps<{ product: Product; accent?: 'sky' | 'yellow' | 'pink' }>(), {
  accent: 'sky'
})

const shadowClass = computed(
  () => ({ sky: 'shadow-accent-sky', yellow: 'shadow-accent-yellow', pink: 'shadow-accent-pink' })[props.accent]
)
</script>

<template>
  <NuxtLink
    :to="`/shop/${product.slug}`"
    class="group relative flex h-full flex-col overflow-hidden rounded-card border-2 border-primary bg-white shadow-sticker transition hover:-translate-y-0.5"
    :class="shadowClass"
  >
    <span
      v-if="product.badge && product.badgeType === 'label'"
      class="absolute left-3 top-3 z-10 rounded-pill border-2 border-primary bg-white px-3 py-1 text-xs font-semibold text-primary"
    >
      {{ product.badge }}
    </span>
    <span
      v-if="product.badge && product.badgeType !== 'label'"
      class="absolute right-3 top-3 z-10 rounded-pill bg-accent-coral px-3 py-1 text-xs font-semibold text-white"
    >
      {{ product.badge }}
    </span>
    <div class="flex aspect-square shrink-0 items-center justify-center bg-gray-200 text-sm text-gray-400">
      Product Photo
    </div>

    <!-- info: flex-1 + justify-between ทำให้แถวราคา/ปุ่ม Buy ชิดขอบล่างเสมอ ไม่ว่า subtitle/ราคาก่อนลดจะมีหรือไม่ก็ตาม -->
    <div class="flex flex-1 flex-col justify-between gap-3 border-t-2 border-primary p-4">
      <div class="flex items-start justify-between gap-2">
        <div class="min-w-0">
          <p class="truncate font-nav text-sm font-medium text-ink">{{ product.name }}</p>
          <p v-if="product.subtitle" class="truncate text-xs text-muted">{{ product.subtitle }}</p>
        </div>
        <span class="shrink-0 text-lg leading-none text-primary/40">♡</span>
      </div>
      <div class="flex items-end justify-between gap-2">
        <p class="font-heading text-base font-bold text-accent-blue">
          ฿{{ product.price.toLocaleString() }}
          <span v-if="product.originalPrice" class="ml-1 text-xs font-normal text-muted line-through">
            ฿{{ product.originalPrice.toLocaleString() }}
          </span>
        </p>
        <button
          type="button"
          class="shrink-0 rounded-pill bg-primary px-4 py-2 font-nav text-sm font-semibold text-white transition group-hover:bg-primary-dark"
        >
          Buy ↗
        </button>
      </div>
    </div>
  </NuxtLink>
</template>
