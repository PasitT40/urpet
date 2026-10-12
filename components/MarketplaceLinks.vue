<script setup lang="ts">
import { stores } from '~/data/stores'
</script>

<template>
  <section id="marketplace" class="mx-auto max-w-6xl px-6 py-12 text-center">
    <h3 class="font-heading text-2xl font-bold text-primary">
      Checkout on <span class="bg-accent-sky px-1">your favorite app</span> 📱
    </h3>
    <p class="mt-2 text-sm text-muted">Official urpet stores. Same price everywhere, coins & vouchers apply.</p>

    <div class="mt-6 grid grid-cols-1 gap-6 sm:grid-cols-3">
      <a
        v-for="store in stores"
        :key="store.name"
        :href="store.url"
        class="flex h-full flex-col items-center rounded-card border-2 border-primary bg-white p-6 shadow-sticker transition-transform hover:-translate-y-0.5"
        :class="store.shadow"
      >
        <span
          class="flex h-14 w-14 items-center justify-center rounded-full text-lg font-bold text-white"
          :class="store.color"
        >
          {{ store.initial }}
        </span>
        <p class="mt-3 font-heading text-lg font-bold text-primary">{{ store.name }}</p>
        <p class="mt-1 text-xs text-muted">{{ store.subtitle }}</p>
        <span class="mt-4 inline-block rounded-pill bg-primary px-4 py-2 text-xs font-semibold text-white">
          Open app ↗
        </span>
      </a>
    </div>
  </section>
</template>
