<script setup lang="ts">
import { ref } from 'vue'
import type { BoSiteContent } from '~/data/backoffice'

const props = defineProps<{ content: BoSiteContent }>()
const emit = defineEmits<{ save: [data: { heroTitle: string; heroTagline: string }] }>()

const title = ref(props.content.heroTitle)
const tagline = ref(props.content.heroTagline)

const inputCls =
  'w-full h-11 bg-bo-canvas rounded-[10px] px-4 text-[14px] text-primary placeholder:text-bo-muted focus:outline-none focus:ring-1 focus:ring-bo-border'
</script>

<template>
  <div class="rounded-2xl border border-bo-border bg-white p-6">
    <p class="text-[16px] font-bold text-primary">แก้ไข Hero หน้าแรก</p>

    <p class="mb-2 mt-5 text-[12px] text-bo-muted">หัวข้อหลัก</p>
    <input v-model="title" :class="inputCls" />

    <p class="mb-2 mt-5 text-[12px] text-bo-muted">คำโปรย</p>
    <textarea
      v-model="tagline"
      rows="2"
      class="w-full rounded-[10px] bg-bo-canvas px-4 py-3 text-[14px] text-primary placeholder:text-bo-muted focus:outline-none focus:ring-1 focus:ring-bo-border"
    />

    <p class="mb-2 mt-5 text-[12px] text-bo-muted">รูปภาพ Hero</p>
    <div class="h-[220px] w-full rounded-xl" :class="content.heroImageClass"></div>

    <button
      type="button"
      class="mt-6 h-12 rounded-[10px] bg-primary px-6 text-[14px] font-semibold text-white transition hover:bg-primary-dark"
      @click="emit('save', { heroTitle: title, heroTagline: tagline })"
    >
      บันทึกการเปลี่ยนแปลง
    </button>
  </div>
</template>
