<script setup lang="ts">
import type { Product } from '~/data/products'

defineProps<{ products: Product[] }>()

// สลับสี sticker border ตามตำแหน่งการ์ด ให้ได้ฟีลเดียวกับ 01-home.png / 02-shop-listing.png
const accents = ['sky', 'yellow', 'pink'] as const
function accentFor(index: number) {
  return accents[index % accents.length]
}
</script>

<template>
  <div class="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
    <ProductCard
      v-for="(product, index) in products"
      :key="product.id"
      :product="product"
      :accent="accentFor(index)"
    />
  </div>
</template>
