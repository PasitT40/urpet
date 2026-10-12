<script setup lang="ts">
import { ref, computed } from 'vue'
import type { BoCategory } from '~/data/backoffice'

const props = defineProps<{ category?: BoCategory | null }>()
const emit = defineEmits<{ save: [data: Omit<BoCategory, 'id'>]; close: [] }>()

const isEdit = computed(() => !!props.category)

const name = ref(props.category?.name ?? '')
const count = ref(props.category ? String(props.category.productCount) : '')

function submit() {
  emit('save', {
    name: name.value,
    productCount: Number(String(count.value).replace(/[^\d]/g, '')) || 0,
    thumbClass: props.category?.thumbClass ?? 'bg-gray-200'
  })
}

const inputCls =
  'w-full h-11 bg-bo-canvas rounded-[10px] px-4 text-[14px] text-primary placeholder:text-bo-muted focus:outline-none focus:ring-1 focus:ring-bo-border'
</script>

<template>
  <BoModal :title="isEdit ? 'แก้ไขหมวดหมู่' : 'เพิ่มหมวดหมู่'" @close="emit('close')">
    <div class="p-6">
      <p class="mb-2 text-[12px] text-bo-muted">รูปหมวดหมู่</p>
      <div class="flex items-center gap-4">
        <div
          class="h-[84px] w-[84px] rounded-xl"
          :class="isEdit ? category?.thumbClass : 'bg-bo-canvas'"
        ></div>
        <button
          type="button"
          class="h-10 rounded-[10px] border border-dashed border-bo-border px-4 text-[13px] text-bo-muted"
        >
          อัปโหลดรูปใหม่
        </button>
      </div>

      <p class="mb-2 mt-5 text-[12px] text-bo-muted">ชื่อหมวดหมู่</p>
      <input v-model="name" :class="inputCls" placeholder="เช่น Food & Treats" />

      <p class="mb-2 mt-5 text-[12px] text-bo-muted">จำนวนสินค้า</p>
      <input v-model="count" :class="inputCls" placeholder="0" />
    </div>

    <template #footer>
      <div class="grid grid-cols-2 gap-3 border-t border-bo-divider px-6 py-5">
        <button
          type="button"
          class="h-11 rounded-[10px] border border-bo-border bg-white text-[14px] text-primary"
          @click="emit('close')"
        >
          ยกเลิก
        </button>
        <button
          type="button"
          class="h-11 rounded-[10px] bg-primary text-[14px] font-semibold text-white transition hover:bg-primary-dark"
          @click="submit"
        >
          บันทึก
        </button>
      </div>
    </template>
  </BoModal>
</template>
