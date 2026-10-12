<script setup lang="ts">
import { ref, computed } from 'vue'
import type { BoProduct, BoProductStatus } from '~/data/backoffice'
import { boCategoryNames } from '~/data/backoffice'

const props = defineProps<{ product?: BoProduct | null }>()
const emit = defineEmits<{ save: [data: Omit<BoProduct, 'id'>]; close: [] }>()

const isEdit = computed(() => !!props.product)

const name = ref(props.product?.name ?? '')
const category = ref(props.product?.category ?? 'Food & Treats')
const price = ref(props.product ? String(props.product.price) : '')
const status = ref<BoProductStatus>(props.product?.status ?? 'visible')
const shopee = ref(props.product?.links.shopee ?? '')
const lazada = ref(props.product?.links.lazada ?? '')
const tiktok = ref(props.product?.links.tiktok ?? '')

function submit() {
  emit('save', {
    name: name.value,
    category: category.value,
    price: Number(String(price.value).replace(/[^\d]/g, '')) || 0,
    status: status.value,
    thumbClass: props.product?.thumbClass ?? 'bg-gray-200',
    links: { shopee: shopee.value, lazada: lazada.value, tiktok: tiktok.value }
  })
}

const inputCls =
  'w-full h-11 bg-bo-canvas rounded-[10px] px-4 text-[14px] text-primary placeholder:text-bo-muted focus:outline-none focus:ring-1 focus:ring-bo-border'
</script>

<template>
  <BoModal :title="isEdit ? 'แก้ไขสินค้า' : 'เพิ่มสินค้าใหม่'" @close="emit('close')">
    <div class="p-6">
      <!-- รูปสินค้า -->
      <p class="mb-2 text-[12px] text-bo-muted">รูปสินค้า</p>
      <div class="flex items-center gap-4">
        <div
          class="h-[84px] w-[84px] rounded-xl"
          :class="isEdit ? product?.thumbClass : 'bg-bo-canvas'"
        ></div>
        <button
          type="button"
          class="h-10 rounded-[10px] border border-dashed border-bo-border px-4 text-[13px] text-bo-muted"
        >
          อัปโหลดรูปใหม่
        </button>
      </div>

      <!-- ชื่อสินค้า -->
      <p class="mb-2 mt-5 text-[12px] text-bo-muted">ชื่อสินค้า</p>
      <input v-model="name" :class="inputCls" placeholder="เช่น Premium Cat Food" />

      <!-- หมวดหมู่ / ราคา -->
      <div class="grid grid-cols-[1fr_1fr] gap-4">
        <div>
          <p class="mb-2 mt-5 text-[12px] text-bo-muted">หมวดหมู่</p>
          <select v-model="category" :class="inputCls">
            <option v-for="c in boCategoryNames" :key="c" :value="c">{{ c }}</option>
          </select>
        </div>
        <div>
          <p class="mb-2 mt-5 text-[12px] text-bo-muted">ราคา</p>
          <input v-model="price" :class="inputCls" placeholder="฿0" />
        </div>
      </div>

      <!-- สถานะ -->
      <p class="mb-2 mt-5 text-[12px] text-bo-muted">สถานะ</p>
      <div class="grid grid-cols-2 gap-3">
        <button
          type="button"
          class="h-10 rounded-[10px] text-[14px] transition"
          :class="status === 'visible' ? 'bg-primary font-semibold text-white' : 'bg-bo-canvas text-bo-soft'"
          @click="status = 'visible'"
        >
          แสดงอยู่
        </button>
        <button
          type="button"
          class="h-10 rounded-[10px] text-[14px] transition"
          :class="status === 'hidden' ? 'bg-primary font-semibold text-white' : 'bg-bo-canvas text-bo-soft'"
          @click="status = 'hidden'"
        >
          ซ่อนอยู่
        </button>
      </div>

      <!-- ลิงก์ไปซื้อ -->
      <div class="mt-6 border-t border-bo-divider pt-5">
        <p class="text-[12px] text-bo-muted">ลิงก์ไปซื้อ (ปุ่มในหน้าสินค้า)</p>
        <div class="mt-3 space-y-3">
          <div class="flex items-center gap-3">
            <span class="flex h-7 w-7 shrink-0 items-center justify-center rounded-[8px] bg-accent-coral text-[13px] font-bold text-white">S</span>
            <input v-model="shopee" class="h-10 w-auto min-w-[130px] rounded-[10px] bg-bo-canvas px-4 text-[13px] text-primary placeholder:text-bo-muted focus:outline-none focus:ring-1 focus:ring-bo-border" style="field-sizing: content" placeholder="ลิงก์ Shopee" />
          </div>
          <div class="flex items-center gap-3">
            <span class="flex h-7 w-7 shrink-0 items-center justify-center rounded-[8px] bg-bo-lazada text-[13px] font-bold text-white">L</span>
            <input v-model="lazada" class="h-10 w-auto min-w-[130px] rounded-[10px] bg-bo-canvas px-4 text-[13px] text-primary placeholder:text-bo-muted focus:outline-none focus:ring-1 focus:ring-bo-border" style="field-sizing: content" placeholder="ลิงก์ Lazada" />
          </div>
          <div class="flex items-center gap-3">
            <span class="flex h-7 w-7 shrink-0 items-center justify-center rounded-[8px] bg-bo-tiktok text-[13px] font-bold text-white">T</span>
            <input v-model="tiktok" class="h-10 w-auto min-w-[130px] rounded-[10px] bg-bo-canvas px-4 text-[13px] text-primary placeholder:text-bo-muted focus:outline-none focus:ring-1 focus:ring-bo-border" style="field-sizing: content" placeholder="ลิงก์ TikTok Shop" />
          </div>
        </div>
      </div>
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
