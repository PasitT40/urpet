# 🐾 urpet.

> Happy stuff for good boys & cool cats

ร้านค้าออนไลน์สำหรับสัตว์เลี้ยง สร้างด้วย **Nuxt 3 + Tailwind CSS** ตามดีไซน์ Figma (`futSpDUf4KuAMaD48urEXL`) มาพร้อมทั้งหน้าร้าน (storefront) และระบบหลังบ้าน (backoffice) สำหรับจัดการสินค้าและหมวดหมู่

---

## ✨ ฟีเจอร์หลัก

### หน้าร้าน (Storefront)
- **Home** — Hero section, สินค้าแนะนำ, ลิงก์ไปยัง marketplace
- **Shop / Listing** (`/shop`) — ฟิลเตอร์ตามหมวดหมู่ (All / Dogs / Cats / On Sale / New), เรียงลำดับสินค้า, นับจำนวนรายการ
- **Product Detail (PDP)** (`/shop/[slug]`) — แกลเลอรีรูปภาพ, คะแนนรีวิว, ราคา/ราคาก่อนลด, ตัวเลือกไซซ์, ปุ่มซื้อผ่าน marketplace, สเปกสินค้า, สินค้าที่คล้ายกัน

### หลังบ้าน (Backoffice)
- **Products** — ตารางจัดการสินค้า เพิ่ม/แก้ไข/ลบ
- **Categories** — จัดการหมวดหมู่สินค้าแบบการ์ด
- **Site Content** — แก้ไขเนื้อหาหน้าแรก (hero, สินค้าแนะนำ)

> ปัจจุบันหลังบ้านเป็น UI เท่านั้น (state อยู่ใน memory ผ่าน `composables/useBackofficeData.ts`) ยังไม่เชื่อมต่อฐานข้อมูลจริง

---

## ✅ ความต้องการของระบบ (Requirements)

| เครื่องมือ | เวอร์ชัน | หมายเหตุ |
|---|---|---|
| **Node.js** | `>= 18.20.0` (แนะนำ 20 LTS ขึ้นไป) | ตาม [requirement ของ Nuxt 3](https://nuxt.com/docs/getting-started/installation) — ระบุไว้ใน `engines` ของ `package.json` แล้ว |
| **Package manager** | npm, หรือ bun ก็ได้ | repo มีทั้ง `package-lock.json` และ `bun.lock` — เลือกใช้ตัวใดตัวหนึ่งพอ อย่าสลับไปมาเพื่อไม่ให้ lockfile 2 ไฟล์ขัดกัน |

เช็คเวอร์ชัน Node ที่ใช้อยู่:

```bash
node -v
```

ถ้าต้องสลับเวอร์ชัน Node แนะนำใช้ [nvm](https://github.com/nvm-sh/nvm) หรือ [fnm](https://github.com/Schniz/fnm)

## 🚀 เริ่มใช้งาน

ติดตั้ง dependencies แล้วรันเซิร์ฟเวอร์สำหรับพัฒนา (เลือกใช้ npm หรือ bun อย่างใดอย่างหนึ่ง):

```bash
# ใช้ npm
npm install
npm run dev

# หรือใช้ bun
bun install
bun run dev
```

เปิดเบราว์เซอร์ที่ [http://localhost:3000](http://localhost:3000)

| หน้า | เส้นทาง |
|---|---|
| หน้าแรก | `/` |
| ร้านค้า | `/shop` |
| รายละเอียดสินค้า | `/shop/[slug]` |
| หลังบ้าน | `/backoffice` |

### คำสั่งอื่นๆ

```bash
npm run build      # build สำหรับ production
npm run generate   # static site generation
npm run preview    # preview production build
```

> **หมายเหตุ:** ถ้าเจอปัญหากับ `node_modules` หรือ `.nuxt` ที่ค้างระหว่างพัฒนา ลบทั้งสองโฟลเดอร์แล้วรัน `npm install` ใหม่ได้เลย ไม่กระทบซอร์สโค้ด

---

## 🛠️ สแตกและ Dependencies

| แพ็กเกจ | เวอร์ชัน | ใช้ทำอะไร |
|---|---|---|
| [`nuxt`](https://nuxt.com/) | `^3.14.0` | framework หลัก (routing, SSR/SSG, dev server) |
| [`vue`](https://vuejs.org/) | `^3.5.0` | UI framework ที่ Nuxt ใช้ข้างใน |
| [`vue-router`](https://router.vuejs.org/) | `^4.4.0` | จัดการเส้นทางหน้าเพจ |
| [`@nuxtjs/tailwindcss`](https://tailwindcss.nuxtjs.org/) | `^6.12.0` *(dev)* | Tailwind CSS module สำหรับ Nuxt |

Fonts ที่โหลดผ่าน Google Fonts (ดูใน `nuxt.config.ts`): **Bricolage Grotesque**, **Schibsted Grotesk**, **Inter**, **Noto Sans Thai**

สี/ระยะห่าง/เงาต่างๆ ปรับใน `tailwind.config.ts` โดยสกัดมาจากไฟล์ดีไซน์อ้างอิงใน `design-reference/` แบบ pixel-close เพื่อให้ตรงกับ Figma มากที่สุด

---

## 📁 โครงสร้างโปรเจค

```
components/        UI components (storefront + backoffice/)
pages/              Nuxt pages (/, /shop, /shop/[slug], /backoffice/*)
composables/        state management (useBackofficeData.ts)
data/                mock data (products, categories, stores)
assets/css/          global styles
design-reference/   ภาพอ้างอิงจาก Figma สำหรับเทียบสี/ระยะห่าง
```

---

## 📌 สถานะโปรเจค

รายละเอียดสถาปัตยกรรม, แผน Firebase และ backoffice ดูเพิ่มเติมได้ที่ [`PLAN.md`](./PLAN.md) และ [`BACKOFFICE_PLAN.md`](./BACKOFFICE_PLAN.md)

**เสร็จแล้ว**
- Storefront: Home, Shop/Listing, Header, Footer, Hero, Category pills, Product card/grid, Marketplace links
- Product Detail Page (PDP) ครบองค์ประกอบ
- Backoffice UI: Products, Categories, Site Content
- ปรับสี/spacing ให้ตรง Figma แบบ pixel-close

**ยังไม่เสร็จ**
- [ ] เชื่อมต่อ Firebase (Firestore, Auth, Storage)
- [ ] เติมข้อมูล PDP เต็มให้ครบทุกสินค้า
- [ ] หน้า `/about`
- [ ] รูปสินค้า/สัตว์เลี้ยงจริง และไอคอน social จริงใน footer
