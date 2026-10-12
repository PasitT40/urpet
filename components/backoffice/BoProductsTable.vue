<script setup lang="ts">
import type { BoProduct } from '~/data/backoffice'

defineProps<{ products: BoProduct[] }>()
defineEmits<{ edit: [product: BoProduct]; delete: [product: BoProduct] }>()

const cols = 'grid-cols-[minmax(0,4fr)_2fr_1.5fr_2fr_auto]'
</script>

<template>
  <div class="overflow-hidden rounded-2xl border border-bo-border bg-white">
    <!-- Header -->
    <div
      class="grid h-[46px] items-center bg-bo-canvas px-6 text-[12px] font-semibold text-bo-muted"
      :class="cols"
    >
      <span>สินค้า</span>
      <span>หมวดหมู่</span>
      <span>ราคา</span>
      <span>สถานะ</span>
      <span></span>
    </div>

    <!-- Rows -->
    <div
      v-for="(product, i) in products"
      :key="product.id"
      class="grid h-[89px] items-center px-6"
      :class="[cols, i < products.length - 1 ? 'border-b border-bo-divider' : '']"
    >
      <div class="flex items-center gap-4">
        <div
          class="flex h-14 w-14 shrink-0 items-center justify-center rounded-[10px] text-[9px] text-gray-400"
          :class="product.thumbClass"
        ></div>
        <span class="text-[15px] font-semibold text-primary">{{ product.name }}</span>
      </div>
      <span class="text-[14px] text-bo-soft">{{ product.category }}</span>
      <span class="text-[15px] font-bold text-primary">฿{{ product.price.toLocaleString() }}</span>
      <span>
        <BoStatusPill :status="product.status" />
      </span>
      <div class="flex items-center gap-2">
        <BoIconButton icon="pencil" @click="$emit('edit', product)" />
        <BoIconButton icon="trash" @click="$emit('delete', product)" />
      </div>
    </div>
  </div>
</template>
