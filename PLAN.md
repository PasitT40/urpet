# Urpet — Project Plan

แหล่งอ้างอิง: Figma (`futSpDUf4KuAMaD48urEXL`) — ไฟล์แปลงมาจาก HTML จริงด้วยปลั๊กอิน html.to.design (ไม่มี Dev Mode/paid access ในบัญชีนี้ ค่าสี/ระยะห่างด้านล่างจึงเป็นการประมาณจากภาพ ไม่ใช่ค่า hex ที่ดึงตรงจาก Figma — แนะนำให้ refine ทีหลังถ้ามี Figma Dev Mode หรือ eyedropper)

**ภาพอ้างอิงจริง (export จาก Figma แล้ว)**: ดูโฟลเดอร์ `design-reference/`
- `01-home.png` — หน้า Home
- `02-shop-listing.png` — หน้า Shop / Product Listing (PLP)
- `03-product-detail.png` — หน้า Product Detail (PDP) — **ยังไม่ได้ build ใน Nuxt**

## 1. Inventory จาก Figma

Storefront มี **3 หน้าหลัก** ไม่ใช่ 2 หน้าอย่างที่วางแผนไว้ตอนแรก (เจอ PDP เพิ่มตอนไล่ export ภาพ):

### 1.1 Home (`01-home.png`) — ✅ built
- **Nav**: โลโก้ `urpet.`, เมนู Home / Shop / About, ปุ่ม "Buy on app"
- **Hero**: badge "100% PET-APPROVED", หัวข้อ "Happy stuff for good boys & cool cats", ปุ่ม "Shop Now", แถบ "3 stores", รูปสัตว์เลี้ยง + badge "NEW DROP!" + rating "★★★★★ 2,400+ happy pets"
- **Categories bar**: "What does your pet need?" + pill 5 อัน (Food & Treats, Toys, Collars & Leads, Beds & Homes, Care & Grooming)
- **This week's favorites**: badge "HOT 🔥", grid การ์ดสินค้า 3 ใบ (รูป, ชื่อ, ราคา, ปุ่ม Buy, บาง card มี badge ลดราคา เช่น "-10%")
- **Marketplace**: "Checkout on your favorite app 📱" — การ์ดลิงก์ไป Shopee / Lazada / TikTok Shop พร้อมปุ่ม "Open app →"
- **Footer**: โลโก้ + ลิงก์ Shop/About/Contact + copyright

### 1.2 Shop / Product Listing — PLP (`02-shop-listing.png`) — ✅ built (ต้องเสริม)
- Breadcrumb: "Home / Shop / Food & Treats"
- หัวข้อหมวดหมู่ + badge จำนวนสินค้า เช่น "Food & Treats" + "42 items"
- Filter tab: **All, Dogs, Cats, On Sale, New** (ปัจจุบัน Nuxt page มี All/Dogs/Cats/Food & Treats/New — ต้องแก้ให้ตรง: เปลี่ยน "Food & Treats" → "On Sale")
- **Sort dropdown** ด้านขวา (เช่น "Sort: Popular ▾") — **ยังไม่ได้ทำใน Nuxt**
- Search box (มีอยู่แล้วใน Nuxt)
- Product card ในหน้านี้มี subtitle บรรทัดที่ 2 ใต้ชื่อ (เช่น "Dry food · 2 kg", "Toys · Pack of 3") และ badge อื่นๆ เช่น "Best seller" นอกจาก "-20%" — **ProductCard component ควรเพิ่ม prop `subtitle`**
- Pagination ที่ล่างสุด

### 1.3 Product Detail — PDP (`03-product-detail.png`) — ❌ ยังไม่ได้ build
หน้านี้เพิ่งเจอตอน export ภาพ ต้องเพิ่มเป็นงานถัดไป (`pages/shop/[slug].vue`):
- Breadcrumb: "Home / Shop / Food & Treats / Premium Dog Food"
- Badge หมวดหมู่ "🍖 FOOD & TREATS" + badge "BEST SELLER" บนรูป
- Gallery รูปสินค้า (รูปใหญ่ + thumbnail 3 รูป + "+2" more)
- ชื่อสินค้า, rating "★★★★★ 4.8 · 2,400+ reviews"
- ราคาปัจจุบัน + ราคาก่อนลด (ขีดฆ่า) เช่น "฿690" ~~"฿890"~~
- คำอธิบายสินค้าสั้นๆ
- ตัวเลือกไซส์ (pill button): 2 kg / 6 kg / 10 kg
- การ์ด "ซื้อได้แล้วบนแอปของคุณ" — ลิงก์ Shopee/Lazada/TikTok Shop (เหมือนหน้า Home แต่เป็น layout แนวตั้ง) พร้อม trust badge ย่อยๆ (จัดส่งฟรี/คืนสินค้าได้/รีวิว)
- 2 การ์ดข้อมูล: "รายละเอียดสินค้า" (คำอธิบายยาว) และ "ข้อมูลจำเพาะ" (ตาราง key-value ภาษาไทย: น้ำหนัก, ประเภทอาหาร, ส่วนผสมหลัก, แหล่งผลิต ฯลฯ)
- Section "สินค้าที่คล้ายกัน" (related products) — ใช้ ProductGrid component เดิมได้เลย

> หมายเหตุ: หน้า PDP มี label ภาษาไทยปนอังกฤษ (เป็นไปได้ว่า mockup ต้นฉบับรองรับ 2 ภาษา) — ควรถามทีมว่าจะทำเป็น bilingual (i18n) หรือ Thai ล้วนสำหรับหน้านี้

## 1.4 Backoffice (แอดมิน) — `urpet-backoffice-all-screens.bundle` (ทำทีหลัง)
- **Products**: ตารางรายการสินค้า (รูป, ชื่อ, หมวดหมู่, ราคา, สถานะ, action แก้ไข/ลบ)
- **Categories**: กริดจัดการหมวดหมู่ (รูป, ชื่อ, จำนวนสินค้า)
- **Site Content**: แก้ไขเนื้อหาหน้าเว็บ (ภาษาไทย) — hero text, banner image, ลิงก์ marketplace
- **Add/Edit Product**: modal ฟอร์มเพิ่ม/แก้สินค้า (ชื่อ, ราคา, หมวดหมู่, รูป, สถานะ)

## 2. Design tokens (สกัดจริงจาก design-reference/*.png ด้วย pixel sampling — ไม่ใช่ค่าประมาณแล้ว)

Font (ค่าจริงจาก Figma Text Styles):
- Heading: **Bricolage Grotesque**
- Body: **Inter**
- Nav/Button: **Schibsted Grotesk**

สี (RGB sampled จริงจากภาพ):
| ใช้งาน | ค่า hex |
|---|---|
| Primary (border หนา 2px รอบทุก card/button/pill, nav pill active) | `#0B2C4A` |
| Accent blue (ปุ่ม CTA หลัก "Shop Now", ราคาสินค้า) | `#2E9BE6` |
| Accent เหลือง | `#FFD84D` |
| Accent ชมพู | `#FFB4C8` |
| Accent ฟ้าอ่อน (sky) | `#A9D9F8` |
| Accent teal (พื้นหลังรูปสัตว์เลี้ยงในฮีโร่) | `#0080AD` |
| แดง/ส้ม (ป้ายลดราคา, ใช้สีเดียวกับ Shopee brand) | `#EE4D2D` |
| พื้นหลังหน้า | `#EAF5FD` |
| ตัวหนังสือหลัก (heading) | `#0B2C4A` |
| ตัวหนังสือรอง (body/caption) | `#3D5A73` |

**สไตล์ที่เจอเพิ่มตอน sampling** (implement แล้วใน component):
- การ์ด/ปุ่ม/pill เกือบทุกอันมี border หนา 2px สีน้ำเงินเข้ม (#0B2C4A) ไม่ใช่ border บางๆ สีอ่อนแบบที่เดาไว้ตอนแรก — เป็นสไตล์ neo-brutalist/sticker
- การ์ดสินค้าและการ์ด marketplace มี "sticker shadow" (offset shadow 4px 4px สีสด — สลับ sky/yellow/pink) แทนเงาปกติ — implement เป็น Tailwind `boxShadow.sticker` + `shadow-{color}` ใน `tailwind.config.ts`
- โลโก้ "urpet." และปุ่ม nav (Home/Shop/About) เป็น pill แยกกันแต่ละอัน มี border รอบตัวเอง ไม่ใช่ container เดียวที่มี pill ข้างในลอยๆ
- การ์ด marketplace (Shopee/Lazada/TikTok Shop) เป็น layout แนวตั้ง จัดกึ่งกลาง (ไอคอนกลม → ชื่อร้าน → subtitle มี rating → ปุ่ม Open app) ไม่ใช่แถวนอน
- การ์ดสินค้ามี badge 2 แบบ: label (มุมซ้ายบน พื้นขาว border navy เช่น "Best seller") กับ sale (มุมขวาบน พื้นแดง เช่น "-20%")

ยังไม่ได้ทำ (ผลกระทบน้อย รอได้): ไอคอน heart/wishlist แบบเต็ม, ไอคอน social จริงในหน้า footer (ใส่แค่ตัวอักษรย่อไปก่อน), รูปสินค้า/สัตว์เลี้ยงจริง (ตอนนี้เป็น placeholder เทา/teal รอรูปจริงจาก Firebase Storage)

## 3. Tech stack & โครงสร้างโปรเจค

```
urpet/
├─ PLAN.md
├─ README.md
├─ design-reference/       (ภาพ export จาก Figma จริง — 01-home, 02-shop-listing, 03-product-detail)
├─ nuxt.config.ts
├─ tailwind.config.ts
├─ app.vue
├─ assets/css/main.css
├─ layouts/default.vue
├─ components/
│  ├─ AppHeader.vue
│  ├─ AppFooter.vue
│  ├─ HeroSection.vue
│  ├─ CategoryPills.vue
│  ├─ ProductCard.vue
│  ├─ ProductGrid.vue
│  └─ MarketplaceLinks.vue
├─ pages/
│  ├─ index.vue           (Home) ✅
│  └─ shop/
│     ├─ index.vue        (Listing/PLP) ✅
│     └─ [slug].vue        (Product Detail/PDP) ❌ ยังไม่ทำ — ดูข้อ 1.3
├─ data/
│  ├─ products.ts         (mock — ย้ายไป Firestore ทีหลัง)
│  └─ categories.ts
└─ composables/           (จะเพิ่ม useProducts/useAuth ตอนต่อ Firebase)
```

ตอนนี้ข้อมูลสินค้า/หมวดหมู่เป็น mock data ในไฟล์ `data/*.ts` ก่อน เพื่อให้ UI เสร็จและตรง Figma ก่อน ค่อยสลับไปดึงจาก Firestore ทีหลังโดยไม่ต้องแก้ component (แค่เปลี่ยน source ใน composable)

## 4. Firebase (แผนไว้ก่อน — ยังไม่ implement)

**Firestore collections:**
- `products`: `{ name, price, categoryId, imageUrl, badge?, status, createdAt }`
- `categories`: `{ name, icon, color, order }`
- `siteContent`: doc เดียว (singleton) เก็บ hero title/subtitle, banner image, marketplace links
- `orders` (ถ้าต้องมี checkout ในระบบเอง — ตอนนี้ยังเป็นลิงก์ออก marketplace ภายนอก จึงยังไม่จำเป็น)

**Auth**: Firebase Auth (email/password หรือ Google) — ใช้คุมสิทธิ์เข้า `/admin/*` เท่านั้น ฝั่ง storefront ไม่ต้อง login

**Storage**: เก็บรูปสินค้า/หมวดหมู่/banner

**ขั้นตอนตอนพร้อมทำ Firebase:**
1. สร้าง Firebase project + เปิด Firestore, Auth, Storage
2. ติดตั้ง `nuxt-vuefire` module
3. ใส่ security rules: read เปิดสาธารณะสำหรับ storefront (`products`, `categories`, `siteContent`), write ต้อง auth (admin เท่านั้น)
4. เปิด Firebase Emulator สำหรับ dev local ไม่กิน quota จริง
5. สลับ mock data → composable ที่ query Firestore

## 5. Workflow การทำงานกับ Claude ให้คุ้ม token

1. ทำทีละหน้า/section ตาม task list — ไม่ prompt รวมทั้งแอปทีเดียว
2. อ้างอิงไฟล์ `PLAN.md` + `data/*.ts` แทนการอธิบายซ้ำทุกรอบ
3. หลัง component เสร็จ รัน dev server + screenshot เทียบกับ Figma frame เดิม แก้จุดที่เพี้ยนทันที
4. Component ที่ reuse ได้ (ปุ่ม, การ์ด, pill) สร้างครั้งเดียวใน `components/` แล้วเรียกซ้ำทุกหน้า
5. เก็บ Firebase ไว้เป็น phase 2 ตามที่ตกลง — โฟกัส storefront UI ให้เสร็จสวยงามตรง Figma ก่อน
