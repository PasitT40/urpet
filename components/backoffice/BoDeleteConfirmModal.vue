<script setup lang="ts">
defineProps<{ itemName: string }>()
const emit = defineEmits<{ confirm: []; close: [] }>()
</script>

<template>
  <Teleport to="body">
    <div
      class="fixed inset-0 z-50 flex items-center justify-center bg-primary/40 p-4"
      @click.self="emit('close')"
    >
      <div class="w-[520px] rounded-2xl bg-white p-8 text-center font-body shadow-xl">
        <div class="mx-auto flex h-11 w-11 items-center justify-center rounded-full bg-bo-dangerBg">
          <svg
            class="h-[18px] w-[18px] stroke-current text-primary"
            viewBox="0 0 24 24"
            fill="none"
            stroke-width="1.8"
            stroke-linecap="round"
            stroke-linejoin="round"
          >
            <path d="M4 6.5h16M9 6.5V5a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v1.5M6.5 6.5l1 12.5a1 1 0 0 0 1 1h7a1 1 0 0 0 1-1l1-12.5" />
          </svg>
        </div>
        <p class="mt-4 text-[16px] font-bold text-primary">ลบ "{{ itemName }}" ?</p>
        <p class="mt-2 text-[13px] text-bo-muted">การลบไม่สามารถย้อนกลับได้</p>
        <div class="mt-6 grid grid-cols-2 gap-3">
          <button
            type="button"
            class="h-11 rounded-[10px] border border-bo-border bg-white text-[14px] text-primary"
            @click="emit('close')"
          >
            ยกเลิก
          </button>
          <button
            type="button"
            class="h-11 rounded-[10px] bg-bo-danger text-[14px] font-semibold text-white"
            @click="emit('confirm')"
          >
            ลบ
          </button>
        </div>
      </div>
    </div>
  </Teleport>
</template>
