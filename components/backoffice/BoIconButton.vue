<script setup lang="ts">
const props = withDefaults(
  defineProps<{ icon: 'pencil' | 'trash'; size?: number }>(),
  { size: 36 }
)
defineEmits<{ click: [] }>()
</script>

<template>
  <button
    type="button"
    class="flex items-center justify-center rounded-[10px] border border-bo-border bg-white transition hover:bg-bo-canvas"
    :style="{ width: props.size + 'px', height: props.size + 'px' }"
    @click="$emit('click')"
  >
    <svg
      v-if="props.icon === 'pencil'"
      class="h-[15px] w-[15px] stroke-current text-[#B08A2E]"
      viewBox="0 0 24 24"
      fill="none"
      stroke-width="1.8"
      stroke-linecap="round"
      stroke-linejoin="round"
    >
      <path d="M16.5 4.5l3 3M4 20l1-4L16 5l3 3L8 19l-4 1Z" />
    </svg>
    <svg
      v-else
      class="h-[15px] w-[15px] stroke-current text-bo-muted"
      viewBox="0 0 24 24"
      fill="none"
      stroke-width="1.8"
      stroke-linecap="round"
      stroke-linejoin="round"
    >
      <path d="M4 6.5h16M9 6.5V5a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v1.5M6.5 6.5l1 12.5a1 1 0 0 0 1 1h7a1 1 0 0 0 1-1l1-12.5" />
    </svg>
  </button>
</template>
