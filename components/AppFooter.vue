<script setup lang="ts">
// Home ("/") ใน design-reference มี footer แบบมี social icon + dashed border,
// ส่วนหน้า Shop/Product Detail ใช้ footer เรียบแบบเดียวกัน (การ์ด bordered เต็มใบ)
const route = useRoute()
const isHome = computed(() => route.path === '/')
</script>

<template>
  <!-- Home variant -->
  <footer v-if="isHome" class="mx-auto mt-16 max-w-6xl border-t-2 border-dashed border-primary/30 px-6 py-8">
    <div class="flex flex-col items-center justify-between gap-4 md:flex-row">
      <span class="rounded-pill border-2 border-primary bg-white px-4 py-2 font-heading text-base font-bold text-primary">
        urpet.
      </span>
      <nav class="flex gap-3 font-nav text-sm text-primary">
        <NuxtLink to="/shop" class="rounded-pill border-2 border-primary px-4 py-1.5">Shop</NuxtLink>
        <NuxtLink to="/about" class="rounded-pill border-2 border-primary px-4 py-1.5">About</NuxtLink>
        <a href="#contact" class="rounded-pill border-2 border-primary px-4 py-1.5">Contact</a>
      </nav>
      <div class="flex items-center gap-2">
        <span class="flex h-8 w-8 items-center justify-center rounded-full bg-accent-sky text-xs font-bold text-primary">IG</span>
        <span class="flex h-8 w-8 items-center justify-center rounded-full bg-accent-yellow text-xs font-bold text-primary">FB</span>
        <span class="flex h-8 w-8 items-center justify-center rounded-full bg-accent-pink text-xs font-bold text-primary">TT</span>
        <span class="flex h-8 w-8 items-center justify-center rounded-full border-2 border-primary bg-white text-xs font-bold text-primary">LN</span>
      </div>
      <span class="text-xs text-muted">Made with 🐾 in Bangkok · &copy; {{ new Date().getFullYear() }}</span>
    </div>
  </footer>

  <!-- Simple variant: Shop / Product Detail -->
  <footer v-else class="mx-auto mt-16 max-w-6xl px-6 pb-10">
    <div
      class="flex flex-col items-center justify-between gap-4 rounded-card border-2 border-primary bg-white px-8 py-6 shadow-sticker shadow-primary md:flex-row"
    >
      <span class="font-heading text-lg font-bold text-primary">urpet.</span>
      <nav class="flex gap-6 font-nav text-sm font-medium text-primary">
        <NuxtLink to="/shop">Shop</NuxtLink>
        <NuxtLink to="/about">About</NuxtLink>
        <a href="#contact">Contact</a>
      </nav>
      <span class="text-xs text-muted">&copy; {{ new Date().getFullYear() }} urpet · Bangkok</span>
    </div>
  </footer>
</template>
