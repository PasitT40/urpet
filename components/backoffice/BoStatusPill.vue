<script setup lang="ts">
import type { BoProductStatus } from '~/data/backoffice'

const props = defineProps<{ status: BoProductStatus }>()
</script>

<template>
  <span
    class="inline-flex h-[26px] items-center rounded-pill px-3 text-[12px] font-semibold"
    :class="
      props.status === 'visible'
        ? 'bg-bo-successBg text-bo-successText'
        : 'bg-bo-dangerBg text-bo-dangerText'
    "
  >
    {{ props.status === 'visible' ? 'แสดงอยู่' : 'ซ่อนอยู่' }}
  </span>
</template>
