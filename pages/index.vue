<script setup lang="ts">
import { favoriteProducts } from '~/data/products'
</script>

<template>
  <div>
    <HeroSection />

    <div class="mx-auto max-w-6xl px-6">
      <CategoryPills />
    </div>

    <section class="mx-auto max-w-6xl px-6 py-12">
      <h2 class="mb-6 flex items-center gap-2 font-heading text-2xl font-bold text-primary">
        This week's favorites
        <span class="rounded-pill border-2 border-primary bg-accent-yellow px-3 py-1 text-xs font-bold text-primary">HOT 🔥</span>
      </h2>
      <ProductGrid :products="favoriteProducts" />
    </section>

    <MarketplaceLinks />
  </div>
</template>
