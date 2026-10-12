// Mock data — จะสลับไปดึงจาก Firestore collection `products` ในเฟส Firebase
export interface Product {
  id: string
  slug: string
  name: string
  subtitle?: string
  price: number
  originalPrice?: number
  categoryId: string
  badge?: string
  /** 'label' = pill มุมซ้ายบน สีเข้ม (เช่น Best seller) | 'sale' = pill มุมขวาบน สีแดง (เช่น -20%) */
  badgeType?: 'label' | 'sale'
  animal?: 'dog' | 'cat' | 'both'
}

export const products: Product[] = [
  {
    id: 'p1',
    slug: 'premium-dog-food',
    name: 'Premium Dog Food',
    subtitle: 'Dry food · 2 kg',
    price: 690,
    categoryId: 'food-treats',
    badge: 'Best seller',
    badgeType: 'label',
    animal: 'dog'
  },
  {
    id: 'p2',
    slug: 'grooming-kit',
    name: 'Grooming Kit',
    subtitle: 'Care · All breeds',
    price: 460,
    categoryId: 'care-grooming',
    animal: 'both'
  },
  {
    id: 'p3',
    slug: 'cozy-pet-bed',
    name: 'Cozy Pet Bed',
    subtitle: 'Bedding · Size M',
    price: 790,
    originalPrice: 990,
    categoryId: 'beds-homes',
    badge: '-20%',
    badgeType: 'sale',
    animal: 'both'
  },
  {
    id: 'p4',
    slug: 'chew-toy-set',
    name: 'Chew Toy Set',
    subtitle: 'Toys · Pack of 3',
    price: 250,
    categoryId: 'toys',
    animal: 'both'
  },
  {
    id: 'p5',
    slug: 'cat-tower-deluxe',
    name: 'Cat Tower Deluxe',
    subtitle: 'Furniture · 120 cm',
    price: 1890,
    categoryId: 'beds-homes',
    animal: 'cat'
  },
  {
    id: 'p6',
    slug: 'travel-carrier',
    name: 'Travel Carrier',
    subtitle: 'Accessories · M/L',
    price: 990,
    categoryId: 'collars-leads',
    animal: 'both'
  },
  {
    id: 'p7',
    slug: 'salmon-treats',
    name: 'Salmon Treats',
    subtitle: 'Treats · 150 g',
    price: 190,
    categoryId: 'food-treats',
    animal: 'cat'
  },
  {
    id: 'p8',
    slug: 'catnip-mix',
    name: 'Catnip Mix',
    subtitle: 'Treats · 60 g',
    price: 120,
    categoryId: 'food-treats',
    animal: 'cat'
  }
]

export const favoriteProducts: Product[] = [
  products.find((p) => p.slug === 'premium-dog-food')!,
  products.find((p) => p.slug === 'cat-tower-deluxe')!,
  products.find((p) => p.slug === 'cozy-pet-bed')!
]

export const foodTreatsProducts: Product[] = products

// ข้อมูลเพิ่มเติมสำหรับหน้า Product Detail (PDP) — ทำครบเฉพาะสินค้าใน mockup Figma ก่อน
// สินค้าอื่นจะ fallback เป็นข้อความ generic ใน pages/shop/[slug].vue
export interface ProductDetail {
  rating: number
  reviewCount: number
  description: string
  /** ราคาก่อนลด แสดงเฉพาะหน้า PDP (การ์ดในกริดอื่นๆ ใช้ product.originalPrice ของตัวเองแยกกัน) */
  originalPrice?: number
  sizes: string[]
  detailText: string
  specs: { label: string; value: string }[]
}

export const productDetails: Record<string, ProductDetail> = {
  'premium-dog-food': {
    rating: 4.9,
    reviewCount: 2400,
    description:
      'Grain-free recipe made with real chicken and salmon — gentle on tummies, great for shiny coats. Suitable for adult dogs of all breeds.',
    originalPrice: 850,
    sizes: ['2 kg', '5 kg', '10 kg'],
    detailText:
      'อาหารสุนัขสูตรพรีเมียม ปราศจากธัญพืช ทำจากเนื้อไก่และปลาแซลมอนแท้ ช่วยระบบย่อยอาหารและทำให้ขนเงางาม เหมาะสำหรับสุนัขโตทุกสายพันธุ์ อุดมด้วยโอเมก้า 3 และ 6',
    specs: [
      { label: 'น้ำหนัก', value: '2 / 5 / 10 kg' },
      { label: 'อายุที่เหมาะสม', value: 'สุนัขโต 1 ปีขึ้นไป' },
      { label: 'ส่วนผสมหลัก', value: 'ไก่ แซลมอน ข้าวโอ๊ต' },
      { label: 'ผลิตในประเทศ', value: 'ไทย' }
    ]
  }
}
