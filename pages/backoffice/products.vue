<script setup lang="ts">
import { ref, computed } from 'vue'
import type { BoProduct } from '~/data/backoffice'

definePageMeta({ layout: 'backoffice' })

const { products, addProduct, updateProduct, removeProduct } = useBackofficeData()

const activeTab = ref('ทั้งหมด')
const search = ref('')

const filtered = computed(() =>
  products.value.filter((p) => {
    const byTab = activeTab.value === 'ทั้งหมด' || p.category === activeTab.value
    const bySearch = p.name.toLowerCase().includes(search.value.trim().toLowerCase())
    return byTab && bySearch
  })
)

// Modals
const showProductModal = ref(false)
const editing = ref<BoProduct | null>(null)
const deleting = ref<BoProduct | null>(null)

function openAdd() {
  editing.value = null
  showProductModal.value = true
}
function openEdit(product: BoProduct) {
  editing.value = product
  showProductModal.value = true
}
function onSave(data: Omit<BoProduct, 'id'>) {
  if (editing.value) updateProduct(editing.value.id, data)
  else addProduct(data)
  showProductModal.value = false
}
function confirmDelete() {
  if (deleting.value) removeProduct(deleting.value.id)
  deleting.value = null
}
</script>

<template>
  <BackofficeTopbar title="สินค้า" subtitle="จัดการสินค้าในแคตตาล็อกหน้าเว็บ">
    <div class="relative">
      <span class="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-[14px] text-bo-muted">⌕</span>
      <input
        v-model="search"
        class="h-10 w-[250px] rounded-[10px] bg-bo-canvas pl-8 pr-3 text-[13px] text-primary placeholder:text-bo-muted focus:outline-none"
        placeholder="ค้นหา..."
      />
    </div>
    <button
      type="button"
      class="h-10 rounded-[10px] bg-primary px-4 text-[13px] font-semibold text-white transition hover:bg-primary-dark"
      @click="openAdd"
    >
      + เพิ่มสินค้า
    </button>
  </BackofficeTopbar>

  <div class="flex-1 p-8">
    <BoCategoryTabs v-model="activeTab" />
    <div class="mt-6">
      <BoProductsTable :products="filtered" @edit="openEdit" @delete="(p) => (deleting = p)" />
    </div>
  </div>

  <BoAddEditProductModal
    v-if="showProductModal"
    :product="editing"
    @save="onSave"
    @close="showProductModal = false"
  />
  <BoDeleteConfirmModal
    v-if="deleting"
    :item-name="deleting.name"
    @confirm="confirmDelete"
    @close="deleting = null"
  />
</template>
