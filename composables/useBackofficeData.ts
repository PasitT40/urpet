// State composable สำหรับ Backoffice — in-memory เท่านั้น (ไม่ persist ข้ามการ reload)
// ใช้ useState เพื่อแชร์ state ระหว่างหน้า Products/Categories/Site Content ตอน client-side navigate
import {
  boProductsSeed,
  boCategoriesSeed,
  boSiteContentSeed,
  type BoProduct,
  type BoCategory,
  type BoSiteContent
} from '~/data/backoffice'

let idCounter = 1000
function nextId(prefix: string) {
  idCounter += 1
  return `${prefix}${idCounter}`
}

export function useBackofficeData() {
  const products = useState<BoProduct[]>('bo-products', () =>
    boProductsSeed.map((p) => ({ ...p, links: { ...p.links } }))
  )
  const categories = useState<BoCategory[]>('bo-categories', () =>
    boCategoriesSeed.map((c) => ({ ...c }))
  )
  const siteContent = useState<BoSiteContent>('bo-site-content', () => ({
    ...boSiteContentSeed,
    featuredProductIds: [...boSiteContentSeed.featuredProductIds]
  }))

  // Products
  function addProduct(data: Omit<BoProduct, 'id'>) {
    products.value.push({ ...data, id: nextId('bp') })
  }
  function updateProduct(id: string, data: Partial<BoProduct>) {
    const idx = products.value.findIndex((p) => p.id === id)
    if (idx !== -1) products.value[idx] = { ...products.value[idx], ...data }
  }
  function removeProduct(id: string) {
    products.value = products.value.filter((p) => p.id !== id)
    siteContent.value.featuredProductIds = siteContent.value.featuredProductIds.filter(
      (fid) => fid !== id
    )
  }

  // Categories
  function addCategory(data: Omit<BoCategory, 'id'>) {
    categories.value.push({ ...data, id: nextId('bc') })
  }
  function updateCategory(id: string, data: Partial<BoCategory>) {
    const idx = categories.value.findIndex((c) => c.id === id)
    if (idx !== -1) categories.value[idx] = { ...categories.value[idx], ...data }
  }
  function removeCategory(id: string) {
    categories.value = categories.value.filter((c) => c.id !== id)
  }

  // Featured products (site content)
  function addFeatured(id: string) {
    if (!siteContent.value.featuredProductIds.includes(id)) {
      siteContent.value.featuredProductIds.push(id)
    }
  }
  function removeFeatured(id: string) {
    siteContent.value.featuredProductIds = siteContent.value.featuredProductIds.filter(
      (fid) => fid !== id
    )
  }

  return {
    products,
    categories,
    siteContent,
    addProduct,
    updateProduct,
    removeProduct,
    addCategory,
    updateCategory,
    removeCategory,
    addFeatured,
    removeFeatured
  }
}
