<script setup lang="ts">
import { ref, computed } from 'vue'

definePageMeta({ layout: 'backoffice' })

const { products, siteContent, addFeatured, removeFeatured } = useBackofficeData()

const search = ref('')
const showPicker = ref(false)

const featuredProducts = computed(() =>
  siteContent.value.featuredProductIds
    .map((id) => products.value.find((p) => p.id === id))
    .filter((p): p is NonNullable<typeof p> => !!p)
)

const availableProducts = computed(() =>
  products.value.filter((p) => !siteContent.value.featuredProductIds.includes(p.id))
)

function saveHero(data: { heroTitle: string; heroTagline: string }) {
  siteContent.value.heroTitle = data.heroTitle
  siteContent.value.heroTagline = data.heroTagline
}
</script>

<template>
  <BackofficeTopbar title="เนื้อหาหน้าเว็บ" subtitle="แก้ไข Hero และสินค้าแนะนำหน้าแรก">
    <div class="relative">
      <span class="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-[14px] text-bo-muted">⌕</span>
      <input
        v-model="search"
        class="h-10 w-[250px] rounded-[10px] bg-bo-canvas pl-8 pr-3 text-[13px] text-primary placeholder:text-bo-muted focus:outline-none"
        placeholder="ค้นหา..."
      />
    </div>
  </BackofficeTopbar>

  <div class="flex-1 p-8">
    <div class="grid grid-cols-2 gap-[18px]">
      <BoHeroEditor :content="siteContent" @save="saveHero" />
      <BoFeaturedProductsCard
        :products="featuredProducts"
        @remove="removeFeatured"
        @add="showPicker = true"
      />
    </div>
  </div>

  <BoFeaturedProductPickerModal
    v-if="showPicker"
    :products="availableProducts"
    @add="addFeatured"
    @close="showPicker = false"
  />
</template>
