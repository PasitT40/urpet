# urpet — storefront

Nuxt 3 + Tailwind สร้างตาม Figma (`futSpDUf4KuAMaD48urEXL`) — รายละเอียดสถาปัตยกรรม/Firebase plan ดูที่ `PLAN.md`

## เริ่มใช้งาน

```bash
npm install
npm run dev
```

เปิด http://localhost:3000 — มี 2 หน้า: Home (`/`) และ Shop (`/shop`)

> ถ้าเจอปัญหากับ `node_modules` หรือ `.nuxt` ที่ค้างจากการทดสอบระหว่างสร้างโปรเจค ลบทั้งสองโฟลเดอร์แล้ว `npm install` ใหม่ได้เลย ไม่กระทบซอร์สโค้ด

## สถานะ
- [x] Storefront: Home, Shop/Listing, Header, Footer, Hero, Category pills, Product card/grid, Marketplace links
- [x] Product Detail page (PDP) — `pages/shop/[slug].vue`: gallery, rating, price+ราคาก่อนลด, size selector, การ์ดซื้อผ่าน marketplace, รายละเอียด/spec, สินค้าที่คล้ายกัน (มี fallback content สำหรับสินค้าที่ยังไม่มีข้อมูล PDP เต็ม)
- [x] Shop/Listing: filter ตรง Figma แล้ว (All/Dogs/Cats/On Sale/New), เพิ่ม sort dropdown, item count badge, subtitle ใน ProductCard, badge 2 แบบ (label/sale)
- [x] Backoffice (Products, Categories, Site Content, Add Product) — UI-only admin panel style flat SaaS (ไม่ใช่ neo-brutalist storefront): layout `backoffice` + sidebar/topbar, 3 หน้า (`/backoffice/products|categories|site-content`, `/backoffice` redirect), ตาราง/กริด/การ์ด, modal เพิ่ม-แก้ไขสินค้า/หมวดหมู่, ยืนยันลบ, picker สินค้าแนะนำ — state ใน `composables/useBackofficeData.ts` (in-memory, ไม่ persist) seed จาก `data/backoffice.ts`; token `bo.*` + `Noto Sans Thai` เพิ่มใน config; สกัดสี/ระยะ pixel-close จาก `design-reference/bo-01…08.png` (ดู `BACKOFFICE_PLAN.md`)
- [ ] Firebase (Firestore, Auth, Storage) — วางแผนไว้ใน PLAN.md ยังไม่ implement
- [x] Refine สี/spacing ให้ตรง Figma แบบ pixel-close — สกัดสีจริงจาก `design-reference/*.png` ด้วย Python/PIL (pixel sampling) แล้วอัปเดต `tailwind.config.ts` + component ทุกตัว (border หนา 2px, sticker shadow, marketplace card แนวตั้ง, logo/nav pill แยกชิ้น) ดูรายละเอียดใน PLAN.md ข้อ 2
- [ ] เติมข้อมูล PDP เต็ม (`productDetails` ใน `data/products.ts`) ให้ครบทุกสินค้า ตอนนี้ทำเต็มแค่ "Premium Dog Food"
- [ ] เพิ่ม `pages/about.vue` (ตอนนี้ nav ลิงก์ไปแล้วแต่ยังไม่มีหน้า — เจอ Vue Router warning ตอน build)
- [ ] รูปสินค้า/สัตว์เลี้ยงจริง (ตอนนี้เป็น placeholder เทา/teal), ไอคอน social จริงในหน้า footer
- [x] แก้ ProductCard ให้แถวราคา/ปุ่ม Buy ชิดขอบล่างเสมอ (`flex h-full flex-col` + `justify-between`) กันการ์ดเยื้องกันเวลาบางใบมี subtitle/ราคาก่อนลด บางใบไม่มี
- [x] ตรวจสอบเทียบ design-reference กับโค้ดจริงโดย agent อิสระ (model: fable) แล้วแก้ตาม: arrow glyph (↗ แทน → ยกเว้น Shop Now), shadow-sticker ที่ขาด (CategoryPills/Hero/PDP cards), heart icon ย้ายเข้าแถวชื่อ, footer 2 variant (Home มี social+LN, หน้าอื่นเรียบ), PdpBuyCard สีพื้นจาง+ข้อความ+trust badge ตรงภาพ, ข้อมูล PDP (rating 4.9, ราคาก่อนลด ฿850, size 2/5/10kg, spec label ภาษาไทยตรงภาพ), เอา search box ออกจากหน้า Shop, filter "On Sale" สีชมพู, pagination เป็นสี่เหลี่ยม+ปุ่มลูกศร
