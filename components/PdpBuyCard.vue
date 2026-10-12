<script setup lang="ts">
import { stores } from '~/data/stores'
</script>

<template>
  <div>
    <div class="rounded-card border-2 border-primary bg-white p-5 shadow-sticker shadow-primary">
      <p class="font-nav text-sm font-semibold text-primary">ซื้อได้ที่แอปที่คุณใช้ประจำ</p>

      <div class="mt-3 space-y-2">
        <a
          v-for="store in stores"
          :key="store.name"
          :href="store.url"
          class="flex items-center gap-3 rounded-pill p-2 pl-3 transition hover:brightness-95"
          :class="store.rowBg"
        >
          <span
            class="flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-sm font-bold text-white"
            :class="store.color"
          >
            {{ store.initial }}
          </span>
          <span class="font-nav text-sm font-medium text-ink">{{ store.name }}</span>
          <span class="ml-auto rounded-pill bg-primary px-3 py-1 text-xs font-semibold text-white">เปิดแอป ↗</span>
        </a>
      </div>
    </div>

    <div class="mt-3 flex flex-wrap gap-x-4 gap-y-1 text-xs text-muted">
      <span>🚚 ส่งฟรี กทม.</span>
      <span>✅ ของแท้ 100%</span>
      <span>📦 เปลี่ยน/คืนได้ 7 วัน</span>
    </div>
  </div>
</template>
