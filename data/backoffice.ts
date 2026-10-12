// Mock data สำหรับ Backoffice (UI-only) — แยกจาก data/products.ts โดยเจตนา
// ค่าตรงกับ design-reference/bo-*.png (บางค่าต่างจาก storefront เช่น Grooming Kit ฿450, มีหมวด Accessories)
// เฟส Firebase จะสลับไปดึงจาก Firestore ภายหลัง
export type BoProductStatus = 'visible' | 'hidden'

export interface BoProduct {
  id: string
  name: string
  category: string // display name, ตรงกับ label ของ tab
  price: number
  status: BoProductStatus
  thumbClass: string // placeholder bg class จนกว่าจะมีรูปจริง
  links: { shopee?: string; lazada?: string; tiktok?: string }
}

export interface BoCategory {
  id: string
  name: string
  productCount: number
  thumbClass: string
}

export interface BoSiteContent {
  heroTitle: string
  heroTagline: string
  heroImageClass: string // placeholder
  featuredProductIds: string[]
}

// Seed products — bo-01 rows, top→bottom
export const boProductsSeed: BoProduct[] = [
  {
    id: 'bp1',
    name: 'Premium Dog Food',
    category: 'Food & Treats',
    price: 690,
    status: 'visible',
    thumbClass: 'bg-accent-teal',
    links: {
      shopee: 'https://shopee.co.th/urpet-dogfood',
      lazada: 'https://lazada.co.th/urpet-dogfood',
      tiktok: ''
    }
  },
  {
    id: 'bp2',
    name: 'Cat Tower Deluxe',
    category: 'Beds & Homes',
    price: 1890,
    status: 'visible',
    thumbClass: 'bg-gray-200',
    links: {}
  },
  {
    id: 'bp3',
    name: 'Cozy Pet Bed',
    category: 'Beds & Homes',
    price: 790,
    status: 'hidden',
    thumbClass: 'bg-accent-yellow',
    links: {}
  },
  {
    id: 'bp4',
    name: 'Chew Toy Set',
    category: 'Toys',
    price: 250,
    status: 'visible',
    thumbClass: 'bg-gray-200',
    links: {}
  },
  {
    id: 'bp5',
    name: 'Grooming Kit',
    category: 'Care & Grooming',
    price: 450,
    status: 'visible',
    thumbClass: 'bg-accent-teal',
    links: {}
  },
  {
    id: 'bp6',
    name: 'Travel Carrier',
    category: 'Accessories',
    price: 990,
    status: 'hidden',
    thumbClass: 'bg-gray-200',
    links: {}
  }
]

// Seed categories — bo-02, reading order
export const boCategoriesSeed: BoCategory[] = [
  { id: 'bc1', name: 'Food & Treats', productCount: 42, thumbClass: 'bg-gray-200' },
  { id: 'bc2', name: 'Toys', productCount: 28, thumbClass: 'bg-gray-200' },
  { id: 'bc3', name: 'Accessories', productCount: 19, thumbClass: 'bg-gray-200' },
  { id: 'bc4', name: 'Care & Grooming', productCount: 15, thumbClass: 'bg-accent-teal' },
  { id: 'bc5', name: 'Beds & Homes', productCount: 12, thumbClass: 'bg-accent-yellow' },
  { id: 'bc6', name: 'Collars & Leads', productCount: 12, thumbClass: 'bg-gray-200' }
]

// Seed site content — bo-03
export const boSiteContentSeed: BoSiteContent = {
  heroTitle: 'Happy stuff for good boys & cool cats',
  heroTagline:
    'Toys, treats and cozy things — picked by pet people, delivered from the apps you already use.',
  heroImageClass: 'bg-accent-teal',
  featuredProductIds: ['bp1', 'bp2', 'bp3']
}

// รายชื่อหมวดหมู่สำหรับ tab/filter บนหน้า Products (รวม Accessories ตาม bo-01)
export const boCategoryNames: string[] = [
  'Food & Treats',
  'Toys',
  'Accessories',
  'Care & Grooming',
  'Beds & Homes',
  'Collars & Leads'
]
