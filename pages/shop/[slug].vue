<script setup lang="ts">
import { ref, computed } from 'vue'
import { products, productDetails } from '~/data/products'
import { categories } from '~/data/categories'

const route = useRoute()
const slug = computed(() => String(route.params.slug))

const product = computed(() => products.find((p) => p.slug === slug.value))
const category = computed(() => categories.find((c) => c.id === product.value?.categoryId))
const detail = computed(() => productDetails[slug.value])

const rating = computed(() => detail.value?.rating ?? 4.5)
const reviewCount = computed(() => detail.value?.reviewCount ?? 100)
const description = computed(() => detail.value?.description ?? product.value?.subtitle ?? '')
const sizes = computed(() => detail.value?.sizes ?? ['Standard'])
const detailText = computed(
  () => detail.value?.detailText ?? `รายละเอียดสินค้า ${product.value?.name ?? ''} — ข้อมูลเพิ่มเติมจะอัปเดตเร็ว ๆ นี้`
)
const specs = computed(() => detail.value?.specs ?? [])
const originalPrice = computed(() => detail.value?.originalPrice ?? product.value?.originalPrice)

const selectedSize = ref(sizes.value[0])

const relatedProducts = computed(() =>
  products.filter((p) => p.categoryId === product.value?.categoryId && p.slug !== product.value?.slug).slice(0, 3)
)
</script>

<template>
  <section v-if="product" class="mx-auto max-w-6xl px-6 py-10">
    <p class="text-sm text-muted">
      Home / Shop / {{ category?.name ?? 'Shop' }} / {{ product.name }}
    </p>

    <div class="mt-4 grid grid-cols-1 gap-10 md:grid-cols-2">
      <!-- Gallery -->
      <div>
        <div class="relative flex aspect-square items-center justify-center rounded-card border-2 border-primary bg-gray-200 text-gray-400 shadow-sticker shadow-accent-sky">
          <span
            v-if="product.badge && product.badgeType === 'label'"
            class="absolute right-3 top-3 rotate-3 rounded-pill border-2 border-primary bg-accent-yellow px-3 py-1 text-xs font-bold text-primary"
          >
            {{ product.badge.toUpperCase() }}
          </span>
          Product Photo
        </div>
        <div class="mt-3 grid grid-cols-4 gap-3">
          <div
            v-for="n in 3"
            :key="n"
            class="flex aspect-square items-center justify-center rounded-card border-2 border-primary bg-gray-200 text-xs text-gray-400"
          >
            {{ n }}
          </div>
          <div
            class="flex aspect-square items-center justify-center rounded-card border-2 border-dashed border-primary/40 text-xs font-medium text-muted"
          >
            +2
          </div>
        </div>
      </div>

      <!-- Info -->
      <div>
        <span
          v-if="category"
          class="inline-flex items-center gap-1 rounded-pill border-2 border-primary bg-accent-sky px-3 py-1 text-xs font-semibold uppercase text-primary"
        >
          {{ category.icon }} {{ category.name }}
        </span>

        <h1 class="mt-3 font-heading text-3xl font-bold text-primary">{{ product.name }}</h1>

        <p class="mt-1 text-sm text-muted">
          ★★★★★ {{ rating }} · {{ reviewCount.toLocaleString() }} reviews
        </p>

        <p class="mt-4 font-heading text-2xl font-bold text-accent-blue">
          ฿{{ product.price.toLocaleString() }}
          <span v-if="originalPrice" class="ml-2 text-base font-normal text-muted line-through">
            ฿{{ originalPrice.toLocaleString() }}
          </span>
        </p>

        <p class="mt-3 max-w-md text-sm text-muted">{{ description }}</p>

        <div class="mt-5">
          <p class="mb-2 text-xs font-semibold uppercase tracking-wide text-muted">Size</p>
          <div class="flex flex-wrap gap-2">
            <button
              v-for="size in sizes"
              :key="size"
              type="button"
              class="rounded-pill border-2 border-primary px-4 py-2 font-nav text-sm font-medium transition"
              :class="selectedSize === size ? 'bg-primary text-white' : 'bg-white text-primary'"
              @click="selectedSize = size"
            >
              {{ size }}
            </button>
          </div>
        </div>

        <PdpBuyCard class="mt-6" />
      </div>
    </div>

    <!-- Detail / Specs -->
    <div class="mt-12 grid grid-cols-1 gap-6 md:grid-cols-2">
      <div class="rounded-card border-2 border-primary bg-white p-6 shadow-sticker shadow-accent-sky">
        <h3 class="font-heading text-lg font-bold text-primary">รายละเอียดสินค้า</h3>
        <p class="mt-3 text-sm leading-relaxed text-muted">{{ detailText }}</p>
      </div>
      <div class="rounded-card border-2 border-primary bg-white p-6 shadow-sticker shadow-accent-yellow">
        <h3 class="font-heading text-lg font-bold text-primary">ข้อมูลจำเพาะ</h3>
        <dl class="mt-3 space-y-2 text-sm">
          <div v-for="spec in specs" :key="spec.label" class="flex justify-between border-b border-primary/15 pb-2">
            <dt class="text-muted">{{ spec.label }}</dt>
            <dd class="font-medium text-ink">{{ spec.value }}</dd>
          </div>
          <p v-if="!specs.length" class="text-muted">ยังไม่มีข้อมูลจำเพาะสำหรับสินค้านี้</p>
        </dl>
      </div>
    </div>

    <!-- Related -->
    <section v-if="relatedProducts.length" class="mt-14">
      <h2 class="mb-6 font-heading text-2xl font-bold text-primary">สินค้าที่คล้ายกัน</h2>
      <ProductGrid :products="relatedProducts" />
    </section>
  </section>

  <section v-else class="mx-auto max-w-6xl px-6 py-20 text-center">
    <p class="font-heading text-2xl font-bold text-primary">ไม่พบสินค้านี้</p>
    <NuxtLink to="/shop" class="mt-4 inline-block rounded-pill bg-primary px-5 py-2 text-sm font-semibold text-white">
      กลับไปหน้า Shop
    </NuxtLink>
  </section>
</template>
