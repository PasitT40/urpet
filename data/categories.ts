// Mock data — จะสลับไปดึงจาก Firestore collection `categories` ในเฟส Firebase
export interface Category {
  id: string
  name: string
  icon: string
  color: 'sky' | 'yellow' | 'plain' | 'pink'
}

// สีตรงกับ pill จริงใน 01-home.png: Food & Treats=sky, Toys=yellow, Collars & Leads=plain,
// Beds & Homes=pink, Care & Grooming=plain (ไม่ใช่เขียว อย่างที่เข้าใจผิดตอนแรก)
export const categories: Category[] = [
  { id: 'food-treats', name: 'Food & Treats', icon: '🦴', color: 'sky' },
  { id: 'toys', name: 'Toys', icon: '🧸', color: 'yellow' },
  { id: 'collars-leads', name: 'Collars & Leads', icon: '🔗', color: 'plain' },
  { id: 'beds-homes', name: 'Beds & Homes', icon: '🏠', color: 'pink' },
  { id: 'care-grooming', name: 'Care & Grooming', icon: '🧴', color: 'plain' }
]
