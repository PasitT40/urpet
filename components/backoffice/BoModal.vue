<script setup lang="ts">
const props = defineProps<{ title: string }>()
const emit = defineEmits<{ close: [] }>()
</script>

<template>
  <Teleport to="body">
    <div
      class="fixed inset-0 z-50 flex items-center justify-center bg-primary/40 p-4"
      @click.self="emit('close')"
    >
      <div class="flex max-h-[90vh] w-[520px] flex-col rounded-2xl bg-white font-body shadow-xl">
        <!-- Header -->
        <div class="flex h-16 items-center justify-between border-b border-bo-divider px-6">
          <h2 class="text-[17px] font-bold text-primary">{{ props.title }}</h2>
          <button
            type="button"
            class="text-[20px] leading-none text-bo-muted transition hover:text-primary"
            @click="emit('close')"
          >
            &times;
          </button>
        </div>

        <!-- Body -->
        <div class="min-h-0 flex-1 overflow-y-auto">
          <slot />
        </div>

        <!-- Footer -->
        <div v-if="$slots.footer">
          <slot name="footer" />
        </div>
      </div>
    </div>
  </Teleport>
</template>
