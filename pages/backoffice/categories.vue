<script setup lang="ts">
import { ref } from 'vue'
import type { BoCategory } from '~/data/backoffice'

definePageMeta({ layout: 'backoffice' })

const { categories, addCategory, updateCategory, removeCategory } = useBackofficeData()

const search = ref('')

const showModal = ref(false)
const editing = ref<BoCategory | null>(null)
const deleting = ref<BoCategory | null>(null)

function openAdd() {
  editing.value = null
  showModal.value = true
}
function openEdit(category: BoCategory) {
  editing.value = category
  showModal.value = true
}
function onSave(data: Omit<BoCategory, 'id'>) {
  if (editing.value) updateCategory(editing.value.id, data)
  else addCategory(data)
  showModal.value = false
}
function confirmDelete() {
  if (deleting.value) removeCategory(deleting.value.id)
  deleting.value = null
}
</script>

<template>
  <BackofficeTopbar title="หมวดหมู่" subtitle="จัดกลุ่มสินค้าให้ลูกค้าเลือกง่าย">
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
      + เพิ่มหมวดหมู่
    </button>
  </BackofficeTopbar>

  <div class="flex-1 p-8">
    <div class="grid grid-cols-3 gap-4">
      <BoCategoryCard
        v-for="category in categories"
        :key="category.id"
        :category="category"
        @edit="openEdit(category)"
        @delete="deleting = category"
      />
    </div>
  </div>

  <BoAddEditCategoryModal
    v-if="showModal"
    :category="editing"
    @save="onSave"
    @close="showModal = false"
  />
  <BoDeleteConfirmModal
    v-if="deleting"
    :item-name="deleting.name"
    @confirm="confirmDelete"
    @close="deleting = null"
  />
</template>
