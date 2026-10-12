<script setup lang="ts">
import type { BoCategory } from '~/data/backoffice'

defineProps<{ category: BoCategory }>()
defineEmits<{ edit: []; delete: [] }>()
</script>

<template>
  <div class="overflow-hidden rounded-2xl border border-bo-border bg-white">
    <div class="h-[178px] w-full" :class="category.thumbClass"></div>
    <div class="p-4">
      <p class="text-[16px] font-bold text-primary">{{ category.name }}</p>
      <p class="mt-1 text-[13px] text-bo-muted">{{ category.productCount }} สินค้า</p>
      <div class="mt-3 flex gap-2">
        <button
          type="button"
          class="h-10 flex-1 rounded-[10px] bg-bo-canvas text-[14px] text-primary"
          @click="$emit('edit')"
        >
          แก้ไข
        </button>
        <button
          type="button"
          class="flex h-10 w-10 items-center justify-center rounded-[10px] bg-bo-canvas"
          @click="$emit('delete')"
        >
          <svg
            class="h-[15px] w-[15px] stroke-current text-bo-muted"
            viewBox="0 0 24 24"
            fill="none"
            stroke-width="1.8"
            stroke-linecap="round"
            stroke-linejoin="round"
          >
            <path d="M4 6.5h16M9 6.5V5a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v1.5M6.5 6.5l1 12.5a1 1 0 0 0 1 1h7a1 1 0 0 0 1-1l1-12.5" />
          </svg>
        </button>
      </div>
    </div>
  </div>
</template>
