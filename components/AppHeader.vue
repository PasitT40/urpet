<script setup lang="ts">
const links = [
  { label: 'Home', to: '/' },
  { label: 'Shop', to: '/shop' },
  { label: 'About', to: '/about' }
]
</script>

<template>
  <header class="mx-auto flex max-w-6xl items-center justify-between px-6 py-5">
    <NuxtLink
      to="/"
      class="rounded-pill border-2 border-primary bg-white px-4 py-2 font-heading text-lg font-bold text-primary"
    >
      urpet.
    </NuxtLink>

    <nav class="hidden items-center gap-2 md:flex">
      <NuxtLink
        v-for="link in links"
        :key="link.to"
        :to="link.to"
        class="rounded-pill border-2 border-primary px-5 py-2 font-nav text-sm font-medium text-primary transition"
        active-class="bg-primary text-white"
      >
        {{ link.label }}
      </NuxtLink>
    </nav>

    <a
      href="#marketplace"
      class="rounded-pill bg-accent-yellow px-5 py-2 font-nav text-sm font-semibold text-primary shadow-sticker shadow-primary transition hover:brightness-95"
    >
      Buy on app ↗
    </a>
  </header>
</template>
