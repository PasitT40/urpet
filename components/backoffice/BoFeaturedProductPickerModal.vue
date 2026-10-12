<script setup lang="ts">
import { ref, computed } from 'vue'
import type { BoProduct } from '~/data/backoffice'

const props = defineProps<{ products: BoProduct[] }>()
const emit = defineEmits<{ add: [id: string]; close: [] }>()

const search = ref('')

const filtered = computed(() =>
  props.products.filter((p) => p.name.toLowerCase().includes(search.value.trim().toLowerCase()))
)
</script>

<template>
  <BoModal title="เพิ่มสินค้าแนะนำ" @close="emit('close')">
    <div class="p-6 pt-5">
      <div class="relative">
        <span class="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-[14px] text-bo-muted">⌕</span>
        <input
          v-model="search"
          class="h-11 w-full rounded-[10px] bg-bo-canvas pl-8 pr-4 text-[14px] text-primary placeholder:text-bo-muted focus:outline-none"
          placeholder="ค้นหาสินค้า..."
        />
      </div>

      <div class="mt-4 space-y-4">
        <div v-for="product in filtered" :key="product.id" class="flex items-center gap-3">
          <div class="h-[52px] w-[52px] shrink-0 rounded-[10px]" :class="product.thumbClass"></div>
          <div class="flex-1">
            <p class="text-[15px] font-semibold text-primary">{{ product.name }}</p>
            <span class="mt-1 inline-block rounded-[6px] border border-bo-border bg-bo-canvas px-2 py-0.5 text-[11px] text-bo-soft">
              {{ product.category }}
            </span>
          </div>
          <button
            type="button"
            class="h-9 rounded-[10px] bg-bo-active px-4 text-[13px] font-semibold text-primary"
            @click="emit('add', product.id)"
          >
            + เพิ่ม
          </button>
        </div>
      </div>
    </div>

    <template #footer>
      <div class="border-t border-bo-divider px-6 py-5">
        <button
          type="button"
          class="h-12 w-full rounded-[10px] bg-primary text-[14px] font-semibold text-white transition hover:bg-primary-dark"
          @click="emit('close')"
        >
          เสร็จสิ้น
        </button>
      </div>
    </template>
  </BoModal>
</template>
