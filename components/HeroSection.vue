<template>
  <section class="mx-auto grid max-w-6xl grid-cols-1 items-center gap-10 px-6 py-10 md:grid-cols-2">
    <div>
      <span
        class="mb-4 inline-block rounded-pill border-2 border-primary bg-white px-4 py-1 text-xs font-semibold text-primary"
      >
        🐾 100% PET-APPROVED 🐶
      </span>
      <h1 class="font-heading text-4xl font-extrabold leading-tight text-primary md:text-5xl">
        Happy stuff for
        <span class="bg-accent-sky px-1">good boys</span>
        &
        <span class="bg-accent-yellow px-1">cool cats</span>
      </h1>
      <p class="mt-4 max-w-md text-muted">
        Toys, treats and cozy things — picked by pet people, delivered from the apps you already use.
      </p>
      <div class="mt-6 flex flex-wrap items-center gap-4">
        <NuxtLink
          to="/shop"
          class="rounded-pill bg-accent-blue px-6 py-3 font-nav text-sm font-semibold text-white transition hover:brightness-95"
        >
          Shop Now →
        </NuxtLink>
        <div class="flex items-center gap-2 rounded-pill border-2 border-primary bg-white px-3 py-2 text-sm text-primary">
          <span class="-ml-1 flex">
            <span class="h-4 w-4 rounded-full border border-white bg-accent-coral" />
            <span class="-ml-1.5 h-4 w-4 rounded-full border border-white bg-primary" />
            <span class="-ml-1.5 h-4 w-4 rounded-full border border-white bg-black" />
          </span>
          3 stores
        </div>
      </div>
    </div>

    <div class="relative">
      <span
        class="absolute -top-3 right-6 z-10 -rotate-6 rounded-pill border-2 border-primary bg-accent-yellow px-3 py-1 text-xs font-bold text-primary shadow-sticker shadow-primary"
      >
        NEW DROP!
      </span>
      <div class="flex aspect-square items-center justify-center rounded-card border-2 border-primary bg-accent-teal text-white/70 shadow-sticker shadow-accent-sky">
        Pet Photo
      </div>
      <div
        class="absolute -bottom-4 left-6 rounded-pill border-2 border-primary bg-white px-4 py-2 text-xs font-semibold text-primary"
      >
        ★★★★★ 2,400+ happy pets
      </div>
    </div>
  </section>
</template>
