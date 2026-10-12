<script setup lang="ts">
import { ref, computed } from 'vue'
import { products } from '~/data/products'

const filters = ['All', 'Dogs', 'Cats', 'On Sale', 'New'] as const
const activeFilter = ref<(typeof filters)[number]>('All')
const sortBy = ref<'popular' | 'price-asc' | 'price-desc'>('popular')
const page = ref(1)
const perPage = 8

const filteredProducts = computed(() => {
  let list = products
  if (activeFilter.value === 'Dogs') list = list.filter((p) => p.animal === 'dog' || p.animal === 'both')
  if (activeFilter.value === 'Cats') list = list.filter((p) => p.animal === 'cat' || p.animal === 'both')
  if (activeFilter.value === 'On Sale') list = list.filter((p) => p.badgeType === 'sale')
  if (activeFilter.value === 'New') list = list.filter((p) => p.badge === 'New')

  const sorted = [...list]
  if (sortBy.value === 'price-asc') sorted.sort((a, b) => a.price - b.price)
  if (sortBy.value === 'price-desc') sorted.sort((a, b) => b.price - a.price)
  return sorted
})

const totalPages = computed(() => Math.max(1, Math.ceil(filteredProducts.value.length / perPage)))
const pagedProducts = computed(() => {
  const start = (page.value - 1) * perPage
  return filteredProducts.value.slice(start, start + perPage)
})

function setFilter(f: (typeof filters)[number]) {
  activeFilter.value = f
  page.value = 1
}
</script>

<template>
  <section class="mx-auto max-w-6xl px-6 py-10">
    <p class="text-sm text-muted">Home / Shop / Food & Treats</p>
    <div class="mt-2 flex flex-wrap items-center justify-between gap-4">
      <h1 class="flex items-center gap-2 font-heading text-3xl font-bold text-primary">
        Food & Treats
        <span class="rounded-pill border-2 border-primary bg-accent-yellow px-3 py-1 text-xs font-bold text-primary">
          {{ filteredProducts.length }} items
        </span>
      </h1>
    </div>

    <div class="mt-6 flex flex-wrap items-center justify-between gap-4">
      <div class="flex flex-wrap gap-2">
        <button
          v-for="f in filters"
          :key="f"
          type="button"
          class="rounded-pill border-2 border-primary px-4 py-2 font-nav text-sm font-medium transition"
          :class="[
            activeFilter === f
              ? 'bg-primary text-white'
              : f === 'On Sale'
                ? 'bg-accent-pink text-primary'
                : 'bg-white text-primary'
          ]"
          @click="setFilter(f)"
        >
          {{ f }}
        </button>
      </div>

      <select
        v-model="sortBy"
        class="rounded-pill border-2 border-primary px-4 py-2 font-nav text-sm text-primary focus:outline-none focus:ring-2 focus:ring-accent-blue"
      >
        <option value="popular">Sort: Popular</option>
        <option value="price-asc">Price: Low to High</option>
        <option value="price-desc">Price: High to Low</option>
      </select>
    </div>

    <div class="mt-8">
      <ProductGrid :products="pagedProducts" />
    </div>

    <div class="mt-10 flex justify-center gap-2">
      <button
        type="button"
        class="flex h-10 w-10 items-center justify-center rounded-xl border-2 border-primary bg-white font-nav text-primary transition disabled:opacity-40"
        :disabled="page === 1"
        @click="page = Math.max(1, page - 1)"
      >
        ←
      </button>
      <button
        v-for="n in totalPages"
        :key="n"
        type="button"
        class="h-10 w-10 rounded-xl border-2 border-primary font-nav text-sm font-medium transition"
        :class="page === n ? 'bg-primary text-white' : 'bg-white text-primary'"
        @click="page = n"
      >
        {{ n }}
      </button>
      <button
        type="button"
        class="flex h-10 w-10 items-center justify-center rounded-xl border-2 border-primary bg-white font-nav text-primary transition disabled:opacity-40"
        :disabled="page === totalPages"
        @click="page = Math.min(totalPages, page + 1)"
      >
        →
      </button>
    </div>
  </section>
</template>
