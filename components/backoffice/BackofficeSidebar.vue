<script setup lang="ts">
import { useRoute } from 'vue-router'

const route = useRoute()

const navItems = [
  { label: 'Products', to: '/backoffice/products', icon: 'box' },
  { label: 'Categories', to: '/backoffice/categories', icon: 'grid' },
  { label: 'Site Content', to: '/backoffice/site-content', icon: 'note' }
] as const

function isActive(to: string) {
  return route.path === to || route.path.startsWith(to + '/')
}
</script>

<template>
  <aside class="flex w-64 flex-col border-r border-bo-border bg-white px-4 pb-5 pt-6">
    <!-- Logo -->
    <div class="flex items-center gap-2.5 px-2">
      <div class="flex h-[30px] w-[30px] items-center justify-center rounded-[8px] bg-primary text-sm font-bold text-white">
        u
      </div>
      <span class="text-[15px] font-bold text-primary">urpet admin</span>
    </div>

    <!-- Menu -->
    <p class="mb-2.5 mt-7 px-2 text-[11px] uppercase tracking-widest text-bo-muted">MENU</p>
    <nav class="flex flex-col gap-1">
      <NuxtLink
        v-for="item in navItems"
        :key="item.to"
        :to="item.to"
        class="flex h-[38px] items-center gap-3 rounded-[10px] px-3 text-[14px] transition"
        :class="
          isActive(item.to)
            ? 'bg-bo-active font-semibold text-primary'
            : 'text-bo-soft hover:bg-bo-canvas'
        "
      >
        <svg
          v-if="item.icon === 'box'"
          class="h-4 w-4 stroke-current"
          viewBox="0 0 24 24"
          fill="none"
          stroke-width="1.8"
        >
          <rect x="3.5" y="3.5" width="17" height="17" rx="2.5" />
        </svg>
        <svg
          v-else-if="item.icon === 'grid'"
          class="h-4 w-4 stroke-current"
          viewBox="0 0 24 24"
          fill="none"
          stroke-width="1.8"
        >
          <rect x="3.5" y="3.5" width="7" height="17" rx="1.5" />
          <rect x="13.5" y="3.5" width="7" height="17" rx="1.5" />
        </svg>
        <svg
          v-else
          class="h-4 w-4 stroke-current"
          viewBox="0 0 24 24"
          fill="none"
          stroke-width="1.8"
          stroke-linecap="round"
          stroke-linejoin="round"
        >
          <path d="M5 4.5h9l5 5v10a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V5.5a1 1 0 0 1 1-1Z" />
          <path d="M8.5 12h7M8.5 15.5h7" />
        </svg>
        {{ item.label }}
      </NuxtLink>
    </nav>

    <div class="flex-1" />

    <!-- Orders & Stock card -->
    <div class="rounded-xl bg-bo-canvas p-4">
      <p class="text-[11px] uppercase tracking-widest text-bo-muted">ORDERS &amp; STOCK</p>
      <p class="mt-2 text-[13px] leading-snug text-bo-soft">
        จัดการใน <span class="font-bold text-primary">Bigseller</span> — เว็บนี้เป็น catalog
      </p>
      <button
        type="button"
        class="mt-3 h-10 w-full rounded-[10px] border border-bo-border bg-white text-[13px] font-semibold text-primary"
      >
        เปิด Bigseller ↗
      </button>
    </div>

    <!-- Admin row -->
    <div class="mt-4 flex items-center gap-2.5 px-1">
      <div class="flex h-[26px] w-[26px] items-center justify-center rounded-full bg-bo-active text-[11px] font-bold text-primary">
        A
      </div>
      <div class="leading-tight">
        <p class="text-[13px] font-bold text-primary">Admin</p>
        <p class="text-[11px] text-bo-muted">urpet team</p>
      </div>
    </div>
  </aside>
</template>
