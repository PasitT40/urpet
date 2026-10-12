<script setup lang="ts">
import type { BoProduct } from '~/data/backoffice'

defineProps<{ products: BoProduct[] }>()
defineEmits<{ remove: [id: string]; add: [] }>()
</script>

<template>
  <div class="rounded-2xl border border-bo-border bg-white p-6">
    <p class="text-[16px] font-bold text-primary">สินค้าแนะนำหน้าแรก</p>

    <div class="mt-4 space-y-3">
      <div
        v-for="product in products"
        :key="product.id"
        class="flex h-[66px] items-center gap-3 rounded-xl border border-bo-border px-3"
      >
        <div class="h-11 w-11 shrink-0 rounded-[10px]" :class="product.thumbClass"></div>
        <span class="flex-1 text-[15px] font-semibold text-primary">{{ product.name }}</span>
        <BoIconButton icon="trash" @click="$emit('remove', product.id)" />
      </div>
    </div>

    <button
      type="button"
      class="mt-4 h-12 w-full rounded-xl border border-dashed border-bo-muted/60 text-[13px] text-bo-muted"
      @click="$emit('add')"
    >
      + เพิ่มสินค้าแนะนำ
    </button>
  </div>
</template>
