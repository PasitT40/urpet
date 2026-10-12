# BACKOFFICE_PLAN.md — urpet Backoffice (UI-only)

Ground truth: `design-reference/bo-01` … `bo-08` (exported from Figma, artboard = **1440px-wide desktop frame**; the PNGs are 1843px wide with transparent margin — all px numbers below are measured inside the 1440 frame at 1:1).
All hex values below were **pixel-sampled with Python/PIL (mode color over patches)** from the PNGs — not guessed.

**Scope:** UI only. No Firebase, no auth, no persistence. All data lives in reactive local state seeded from mock arrays (same pattern as `data/products.ts` / `data/categories.ts`). Modals open/close, forms edit refs, table re-renders — nothing is saved anywhere real.

---

## 1. Design language — IMPORTANT deviation from storefront

The backoffice is **NOT** neo-brutalist. It is a clean, flat SaaS-admin style:

- **No** `shadow-sticker`, **no** `border-2 border-primary`, **no** `rounded-card`/`rounded-pill` heavy sticker styling on cards.
- Thin 1px borders (`#E4E9EE`), very light gray canvas (`#F7F9FB`), white surfaces, soft radii.
- The **only storefront tokens reused**: `primary` `#0B2C4A` (all dark buttons, active states, headings, logo square), `accent-coral` `#EE4D2D` (Shopee chip), `rounded-pill` (tabs + status pills only), `font-body` (Inter).
- Headings in the admin are plain bold sans (Inter-weight look), **not** Bricolage Grotesque. Use `font-body font-bold` for admin headings. *(Judgment call — flagged.)*
- Thai text everywhere: add `'Noto Sans Thai'` to the `font-body` fallback stack (via Google Fonts, same way existing fonts are loaded) so Thai glyphs don't fall back to system serif. *(Judgment call — flagged.)*

### 1.1 New Tailwind tokens to add (`tailwind.config.ts` → `theme.extend.colors.bo`)

All sampled; none exist in the current config:

| Token (suggested name) | Hex | Sampled from / used for |
|---|---|---|
| `bo.canvas` | `#F7F9FB` | content-area bg, input bg, table header bg, inactive segment bg, gray secondary buttons |
| `bo.border` | `#E4E9EE` | sidebar right border, card borders, input/button borders |
| `bo.divider` | `#F0F3F5` | table row dividers, modal header/footer dividers |
| `bo.active` | `#EAF3FB` | sidebar active item bg, "+ เพิ่ม" pill bg, Admin avatar bg |
| `bo.muted` | `#9AA7B2` | subtitles, table column headers, placeholders, labels, dashed-button text |
| `bo.soft` | `#5B6B77` | secondary body text (category column, inactive nav/tab text) |
| `bo.successBg` / `bo.successText` | `#E9F7EF` / `#1E7E42` | status pill "แสดงอยู่" |
| `bo.dangerBg` / `bo.dangerText` | `#FDEDEC` / `#B3261E` | status pill "ซ่อนอยู่", delete-icon circle |
| `bo.danger` | `#C0362C` | delete confirm "ลบ" button |
| `bo.lazada` | `#101A8C` | Lazada "L" chip |
| `bo.tiktok` | `#111111` | TikTok "T" chip |

Shopee "S" chip = existing `accent-coral` `#EE4D2D` (exact sampled match).

### 1.2 Radii convention (visual measurement)

- Cards / modals / table card: **`rounded-2xl` (16px)**
- Buttons, inputs, nav items, thumbnails, icon buttons, segmented control: **`rounded-[10px]`**
- Category filter tabs + status pills + "+ เพิ่ม" pill: **`rounded-pill`** (fully round)
- Product/category thumbnails in table & modals: `rounded-[10px]`; larger images (hero, category card photo): `rounded-xl` / top corners of card.

### 1.3 Photos

Reference PNGs use real pet photos. Project convention (storefront) is placeholder blocks until real assets exist. **Decision: use solid-color placeholder blocks** reusing accent tokens per item (Premium Dog Food = `accent-blue`-ish photo → use `accent-teal` block; Cozy Pet Bed = `accent-yellow`; others `bg-gray-200`) with tiny centered label, same as `ProductCard.vue` does. Flagged: swap for real images later; layout/sizing must still match the PNG boxes exactly.

---

## 2. Routes & files

| Route | File | Screen |
|---|---|---|
| `/backoffice` | `pages/backoffice/index.vue` | redirect → `/backoffice/products` (`navigateTo` in setup) |
| `/backoffice/products` | `pages/backoffice/products.vue` | bo-01 |
| `/backoffice/categories` | `pages/backoffice/categories.vue` | bo-02 |
| `/backoffice/site-content` | `pages/backoffice/site-content.vue` | bo-03 |

All three pages use `definePageMeta({ layout: 'backoffice' })`. Modals (bo-04…08) are components rendered inside pages, **not routes**.

---

## 3. Layout — `layouts/backoffice.vue` (bo-01/02/03 shell)

Structure: `min-h-screen flex` on white; left `<BackofficeSidebar>` fixed-width; right `<main class="flex-1 flex flex-col bg-bo-canvas">` containing `<BackofficeTopbar>` (white) + `<div class="flex-1 p-8">` page content (`<slot/>`).

### 3.1 Sidebar (identical on all 3 screens)

- **Width 256px**, `bg-white`, `border-r border-bo-border`, full height, `flex flex-col`, padding `px-4 pt-6 pb-5` (measured: content inset ~16–24px).
- **Logo row** (top): 30×30px `bg-primary rounded-[8px]` square containing white lowercase **"u"** (bold, 14px) + text **"urpet admin"** — 15px, `font-bold text-primary`. Gap 10px.
- **Section label**: `MENU` — 11px, uppercase, `tracking-widest`, `text-bo-muted`, margin-top ~28px, margin-bottom ~10px.
- **Nav items** (3): `Products`, `Categories`, `Site Content` — each a `NuxtLink`, height **38px**, `rounded-[10px] px-3 flex items-center gap-3`, 14px text.
  - Leading icon: small 16px outline icon per item (Products = square/box outline, Categories = grid/columns outline, Site Content = note/pen outline). Inline SVG, `stroke-current`.
  - **Active**: `bg-bo-active text-primary font-semibold` (sampled `#EAF3FB` bg). Driven by current route.
  - **Inactive**: transparent bg, `text-bo-soft`, hover `bg-bo-canvas`.
- **Spacer** `flex-1`.
- **"ORDERS & STOCK" card** (bottom, above admin row): `bg-bo-canvas rounded-xl p-4`.
  - Label: `ORDERS & STOCK` — 11px uppercase `tracking-widest text-bo-muted`.
  - Copy (13px, `text-bo-soft`, `Bigseller` in `font-bold text-primary`): `จัดการใน Bigseller — เว็บนี้เป็น catalog`
  - Button full-width, height 40px, `bg-white border border-bo-border rounded-[10px]`, 13px `font-semibold text-primary`: `เปิด Bigseller ↗`
- **Admin row** (very bottom, mt-4): 26px circle `bg-bo-active` with `A` (11px bold `text-primary`) + two lines: **`Admin`** (13px bold `text-primary`) / `urpet team` (11px `text-bo-muted`).

### 3.2 Topbar — `BackofficeTopbar.vue`

- White, `border-b border-bo-border`, height **~112px** (content vertically centered), `px-8 flex items-center justify-between`.
- Left: page title (20px `font-bold text-primary`) + subtitle below (13px `text-bo-muted`, mt-1). Props: `title`, `subtitle`.
- Right (`flex items-center gap-3`), via slot:
  - **Search input**: width **250px**, height 40px, `bg-bo-canvas rounded-[10px] px-3`, leading 14px magnifier icon `text-bo-muted`, placeholder `ค้นหา...` (`ค้นหาสินค้า...` variants stay per-modal; topbar is always `ค้นหา...`), 13px. Present on all 3 screens. Non-functional filter of local list is fine (products page) / decorative (others).
  - **Primary action button** (Products & Categories only): height 40px, `bg-primary text-white rounded-[10px] px-4`, 13px `font-semibold`, hover `bg-primary-dark`. Text: `+ เพิ่มสินค้า` (products) / `+ เพิ่มหมวดหมู่` (categories). Site Content has **no** button (search only — see bo-03).

Per-page topbar copy (verbatim):

| Page | title | subtitle |
|---|---|---|
| Products | `สินค้า` | `จัดการสินค้าในแคตตาล็อกหน้าเว็บ` |
| Categories | `หมวดหมู่` | `จัดกลุ่มสินค้าให้ลูกค้าเลือกง่าย` |
| Site Content | `เนื้อหาหน้าเว็บ` | `แก้ไข Hero และสินค้าแนะนำหน้าแรก` |

---

## 4. Component breakdown (all new, in `components/backoffice/` → auto-import prefix `Backoffice*` or explicit names below)

| Component | Responsibility | Key tokens |
|---|---|---|
| `BackofficeSidebar.vue` | Sidebar shell per §3.1 (logo, nav, Bigseller card, admin row) | `primary`, `bo.active`, `bo.border`, `bo.muted`, `bo.canvas` |
| `BackofficeTopbar.vue` | Title/subtitle + search + action-slot per §3.2 | `primary`, `bo.canvas`, `bo.border`, `bo.muted` |
| `BoStatusPill.vue` | Status pill; prop `status: 'visible' \| 'hidden'` → `แสดงอยู่` / `ซ่อนอยู่` | `rounded-pill`, `bo.successBg/Text`, `bo.dangerBg/Text` |
| `BoIconButton.vue` | 36×36 square icon button (pencil ✏️-style / trash); props `icon`, emits `click` | `bg-white border-bo-border rounded-[10px]` |
| `BoCategoryTabs.vue` | Pill filter row on Products page; `ทั้งหมด` + category names; v-model active | `rounded-pill`, `primary` (active), `bo.border`, `bo.soft` |
| `BoProductsTable.vue` | White card + header row + product rows; emits `edit(product)`, `delete(product)` | `bo.canvas` (header), `bo.divider`, `primary` |
| `BoCategoryCard.vue` | Photo card with name, count, `แก้ไข` button + trash; emits `edit`, `delete` | `bo.border`, `bo.canvas`, `primary` |
| `BoHeroEditor.vue` | Left card on Site Content: hero title/tagline/image + save button | `bo.canvas` inputs, `primary` button |
| `BoFeaturedProductsCard.vue` | Right card: featured rows + dashed add button; emits `remove(id)`, `add` | `bo.border`, `bo.muted` |
| `BoModal.vue` | Base modal: fixed overlay + centered 520px white panel, header (title + ×), body slot, footer slot; `Teleport to body`, closes on × / overlay click | `rounded-2xl`, `bo.divider` |
| `BoModalFooter.vue` (or slot markup) | Two-button footer: `ยกเลิก` (white/border) + primary action | `primary`, `bo.border` |
| `BoAddEditProductModal.vue` | bo-04/05 form; prop `product?` (null ⇒ add mode); emits `save(formData)`, `close` | `primary`, `accent-coral`, `bo.lazada`, `bo.tiktok`, `bo.canvas` |
| `BoAddEditCategoryModal.vue` | bo-06 form; prop `category?`; emits `save`, `close` | same input styles |
| `BoDeleteConfirmModal.vue` | bo-07; prop `itemName`; emits `confirm`, `close` | `bo.dangerBg`, `bo.danger` |
| `BoFeaturedProductPickerModal.vue` | bo-08; search + addable product rows; emits `add(id)`, `close` | `bo.active` pill, `primary` footer button |

State composable: **`composables/useBackofficeData.ts`** — wraps `useState` refs seeded from `data/backoffice.ts` (products, categories, siteContent) plus helpers (`addProduct`, `updateProduct`, `removeProduct`, same for categories, `addFeatured`, `removeFeatured`). Pure in-memory; shared between the three pages so edits survive client-side navigation.

---

## 5. Mock data — `data/backoffice.ts`

Do **not** mutate `data/products.ts` (storefront uses it). Backoffice gets its own seed matching the PNGs exactly (note: values intentionally differ from storefront data — Grooming Kit is **฿450** here vs 460 in storefront; there is an **`Accessories`** category that doesn't exist in `data/categories.ts`; Travel Carrier is under `Accessories` here vs `collars-leads` in storefront. **Flagged — reproduce the PNG, don't reconcile.**)

```ts
// interfaces only — implementer writes the seed arrays below verbatim from this table
export type BoProductStatus = 'visible' | 'hidden'
export interface BoProduct {
  id: string
  name: string
  category: string          // display name, matches tab labels
  price: number
  status: BoProductStatus
  thumbClass: string        // placeholder bg class until real images
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
  heroImageClass: string    // placeholder
  featuredProductIds: string[]
}
```

**Seed products (bo-01 rows, top→bottom, verbatim):**

| name | category | price | status |
|---|---|---|---|
| Premium Dog Food | Food & Treats | 690 | visible (`แสดงอยู่`) |
| Cat Tower Deluxe | Beds & Homes | 1890 | visible |
| Cozy Pet Bed | Beds & Homes | 790 | **hidden** (`ซ่อนอยู่`) |
| Chew Toy Set | Toys | 250 | visible |
| Grooming Kit | Care & Grooming | 450 | visible |
| Travel Carrier | Accessories | 990 | **hidden** |

Premium Dog Food links (bo-05): shopee `https://shopee.co.th/urpet-dogfood`, lazada `https://lazada.co.th/urpet-dogfood`, tiktok empty.

**Seed categories (bo-02, reading order):** Food & Treats / 42, Toys / 28, Accessories / 19, Care & Grooming / 15, Beds & Homes / 12, Collars & Leads / 12.

**Seed site content (bo-03):** heroTitle `Happy stuff for good boys & cool cats`; heroTagline `Toys, treats and cozy things — picked by pet people, delivered from the apps you already use.`; featured = [Premium Dog Food, Cat Tower Deluxe, Cozy Pet Bed].

---

## 6. Screen-by-screen spec

### 6.1 bo-01 — Products (`/backoffice/products`)

Content area (`p-8`, bg `bo.canvas`):

1. **`BoCategoryTabs`** row: `flex flex-wrap gap-3`. Pills height **38px**, `px-5`, 14px, `rounded-pill`.
   - Labels in order: `ทั้งหมด`, `Food & Treats`, `Toys`, `Accessories`, `Care & Grooming`, `Beds & Homes`, `Collars & Leads` (7 tabs — includes Accessories).
   - Active (`ทั้งหมด` in PNG): `bg-primary text-white font-semibold`. Inactive: `bg-white border border-bo-border text-bo-soft`. Clicking filters the table by category (local computed).
2. **Table card** (mt-6): `bg-white rounded-2xl border border-bo-border overflow-hidden`.
   - **Header row**: height **46px**, `bg-bo-canvas`, 12px `font-semibold text-bo-muted`, columns: `สินค้า` `หมวดหมู่` `ราคา` `สถานะ` + empty actions column.
   - Column layout (grid, measured x-centers at 1440): product cell ≈ 40% (thumb at x≈310, name x≈395), หมวดหมู่ ≈ 18% (x≈745), ราคา ≈ 12% (x≈905), สถานะ ≈ 15% (x≈1078), actions right-aligned (x≈1335–1390). Suggest `grid-cols-[minmax(0,4fr)_2fr_1.5fr_2fr_auto]` with `px-6`.
   - **Rows**: height **89px**, divider `border-b border-bo-divider` (last row none).
     - Thumb: **56×56px**, `rounded-[10px]`, placeholder block.
     - Name: 15px `font-semibold text-primary`.
     - Category: 14px `text-bo-soft`.
     - Price: 15px `font-bold text-primary`, format `฿690` / `฿1,890` (`toLocaleString`).
     - Status: `BoStatusPill` — height 26px, `px-3`, 12px `font-semibold`, `rounded-pill`. `แสดงอยู่` = bg `#E9F7EF` text `#1E7E42`; `ซ่อนอยู่` = bg `#FDEDEC` text `#B3261E`.
     - Actions: two `BoIconButton` (gap-2): pencil (opens `BoAddEditProductModal` in edit mode), trash (opens `BoDeleteConfirmModal`). 36×36, white bg, `border-bo-border`, icon 15px (pencil rendered in a mustard/yellow tone `#B08A2E`-ish in PNG — acceptable to use a small ✏️-style SVG in `text-[#B08A2E]`; trash in `text-bo-muted`).
3. Topbar search filters rows by name (client-side).

### 6.2 bo-02 — Categories (`/backoffice/categories`)

- **Grid**: `grid grid-cols-3 gap-4` (measured card width ≈365px, gap ≈16px).
- **`BoCategoryCard`**: `bg-white rounded-2xl border border-bo-border overflow-hidden`.
  - Photo: full-width, height **178px** (`h-[178px]`), `object-cover` (placeholder block for now).
  - Body `p-4`: name 16px `font-bold text-primary`; count line 13px `text-bo-muted` mt-1 — format **`{n} สินค้า`** (e.g. `42 สินค้า`).
  - Footer row (mt-3, `flex gap-2`): `แก้ไข` button `flex-1 h-10 bg-bo-canvas rounded-[10px]` 14px `text-primary` (opens `BoAddEditCategoryModal`); trash `BoIconButton` variant `h-10 w-10 bg-bo-canvas` (opens delete confirm).
- 6 cards, order per §5 seed.

### 6.3 bo-03 — Site Content (`/backoffice/site-content`)

Two cards side-by-side: `grid grid-cols-2 gap-[18px]` (each ≈552px at 1440).

**Left — `BoHeroEditor`** (`bg-white rounded-2xl border border-bo-border p-6`):
- Card title: `แก้ไข Hero หน้าแรก` — 16px `font-bold text-primary`.
- Field label style (all labels in backoffice forms): 12px `text-bo-muted`, mb-2, mt-5.
- `หัวข้อหลัก` → text input, value `Happy stuff for good boys & cool cats`. Input style (global): `w-full h-11 bg-bo-canvas rounded-[10px] px-4 text-[14px] text-primary` (no visible border; `focus:ring-1 ring-bo-border`).
- `คำโปรย` → textarea (2 rows, ~60px), value `Toys, treats and cozy things — picked by pet people, delivered from the apps you already use.`
- `รูปภาพ Hero` → image block `w-full h-[220px] rounded-xl object-cover` (placeholder: `bg-accent-teal` block — PNG shows dog-in-yellow-shirt photo).
- Save button (mt-6): `h-12 px-6 bg-primary text-white rounded-[10px]` 14px `font-semibold`: `บันทึกการเปลี่ยนแปลง` (updates local state only; optional brief "saved" toast NOT in design — omit).

**Right — `BoFeaturedProductsCard`** (same card shell):
- Title: `สินค้าแนะนำหน้าแรก`.
- Rows (mt-4, `space-y-3`): each `h-[66px] border border-bo-border rounded-xl px-3 flex items-center gap-3` — thumb 44×44 `rounded-[10px]`, name 15px `font-semibold text-primary` (`flex-1`), trash `BoIconButton`. Rows: Premium Dog Food, Cat Tower Deluxe, Cozy Pet Bed.
- **Dashed add button** (mt-4): `w-full h-12 rounded-xl border border-dashed border-bo-muted/60 text-bo-muted text-[13px]`: `+ เพิ่มสินค้าแนะนำ` → opens `BoFeaturedProductPickerModal`.

### 6.4 bo-04 / bo-05 — Add / Edit Product modal (`BoAddEditProductModal`)

`BoModal` base: overlay `fixed inset-0 bg-primary/40` *(judgment call — PNG artboard shows a flat light-gray demo backdrop `#E2E6EA`, not a real scrim; a 40% navy scrim is the standard reading — flagged)*; panel `w-[520px] max-h-[90vh] bg-white rounded-2xl shadow-xl flex flex-col`, body scrollable.

- **Header**: `h-16 px-6 flex items-center justify-between border-b border-bo-divider`. Title 17px `font-bold text-primary`: `เพิ่มสินค้าใหม่` (add) / `แก้ไขสินค้า` (edit). Close `×` 20px `text-bo-muted`.
- **Body** `p-6`:
  1. Label `รูปสินค้า` → row: 84×84 thumb `rounded-xl` (`bg-bo-canvas` empty in add; product placeholder image in edit) + button `อัปโหลดรูปใหม่` — `h-10 px-4 rounded-[10px] border border-dashed border-bo-border text-bo-muted text-[13px]` (non-functional).
  2. Label `ชื่อสินค้า` → input; add-mode placeholder `เช่น Premium Cat Food`; edit-mode value `Premium Dog Food`.
  3. Two-column row (`grid grid-cols-[1fr_1fr] gap-4`; PNG: left col ≈232px, right ≈230px): `หมวดหมู่` → select with category names, value `Food & Treats`; `ราคา` → input, placeholder `฿0` (add) / value `฿690` (edit).
  4. Label `สถานะ` → **segmented control**: two buttons `grid grid-cols-2 gap-3`, each `h-10 rounded-[10px]` 14px. Active: `bg-primary text-white font-semibold`; inactive: `bg-bo-canvas text-bo-soft`. Labels `แสดงอยู่` / `ซ่อนอยู่`. (Both PNGs show แสดงอยู่ active.)
  5. `border-t border-bo-divider` then section label `ลิงก์ไปซื้อ (ปุ่มในหน้าสินค้า)`.
  6. Three link rows (`space-y-3`), each `flex items-center gap-3`:
     - Chip 28×28 `rounded-[8px]` white bold 13px letter: **S** on `accent-coral`, **L** on `bo.lazada` `#101A8C`, **T** on `bo.tiktok` `#111111`.
     - Input `h-10 bg-bo-canvas rounded-[10px] px-4 text-[13px]`. **Width hugs content in the PNG** (empty ≈100–130px, filled ≈250px). Implement with `field-sizing: content` + `min-w` matching placeholder, or fixed `w-auto` inline-block — *flagged as the one place pixel-fidelity conflicts with normal form UX; do NOT make them `w-full`.* Placeholders: `ลิงก์ Shopee`, `ลิงก์ Lazada`, `ลิงก์ TikTok Shop`. Edit-mode values per §5.
- **Footer**: `p-5 px-6 border-t border-bo-divider grid grid-cols-2 gap-3`. `ยกเลิก`: `h-11 bg-white border border-bo-border rounded-[10px] text-primary` 14px. `บันทึก`: `h-11 bg-primary text-white rounded-[10px] font-semibold`. Save mutates local products state and closes.

### 6.5 bo-06 — Add/Edit Category modal (`BoAddEditCategoryModal`)

Same `BoModal` shell (520px). Title: `แก้ไขหมวดหมู่` (edit, shown in PNG) / `เพิ่มหมวดหมู่` (add — *inferred, flagged*). Body:
1. `รูปหมวดหมู่` → 84×84 thumb + dashed `อัปโหลดรูปใหม่` button (identical to product modal).
2. `ชื่อหมวดหมู่` → full-width input, value `Food & Treats`.
3. `จำนวนสินค้า` → full-width input, value `42` (plain text input in the design; keep editable number in local state).
Footer identical (`ยกเลิก` / `บันทึก`).

### 6.6 bo-07 — Delete confirm (`BoDeleteConfirmModal`)

520px panel, **center-aligned** content, `p-8`:
- 44px circle `bg-bo-dangerBg` (`#FDEDEC`) with trash icon 18px `text-primary`, centered.
- Title (mt-4): `ลบ "{itemName}" ?` — 16px `font-bold text-primary` (PNG: `ลบ "Premium Dog Food" ?`).
- Subtitle (mt-2): `การลบไม่สามารถย้อนกลับได้` — 13px `text-bo-muted`.
- Buttons (mt-6, `grid grid-cols-2 gap-3`, full width): `ยกเลิก` (white/border, as §6.4) and `ลบ` — `bg-[#C0362C] text-white h-11 rounded-[10px] font-semibold`. Confirm removes item from local state. Reused for products, categories (and could be for featured, though featured trash removes directly per design — remove featured **without** confirm; only table/card trash icons confirm. *Judgment call — flagged.*)

### 6.7 bo-08 — Featured Product Picker (`BoFeaturedProductPickerModal`)

520px panel:
- Header: `เพิ่มสินค้าแนะนำ` + ×.
- Body `p-6 pt-5`: search input `w-full h-11 bg-bo-canvas rounded-[10px]` with magnifier icon, placeholder `ค้นหาสินค้า...` (filters list client-side).
- Product rows (mt-4, `space-y-4`): only products **not already featured** (PNG shows Chew Toy Set, Grooming Kit, Travel Carrier). Each row `flex items-center gap-3`:
  - Thumb 52×52 `rounded-[10px]`.
  - Name 15px `font-semibold text-primary`; below it a **category chip**: `bg-bo-canvas border border-bo-border rounded-[6px] px-2 py-0.5 text-[11px] text-bo-soft` (`Toys`, `Care & Grooming`, `Accessories`).
  - Right: `+ เพิ่ม` pill — `h-9 px-4 bg-bo-active rounded-[10px] text-primary text-[13px] font-semibold` → adds to featured, row disappears from list.
- Footer `p-5 px-6 border-t border-bo-divider`: **full-width** button `เสร็จสิ้น` — `w-full h-12 bg-primary text-white rounded-[10px] font-semibold` → closes.

---

## 7. Pixel-matching checklist (verify against PNGs after build, at 1440px viewport)

- [ ] Sidebar exactly **256px** wide, white, 1px right border `#E4E9EE`; content bg `#F7F9FB`; topbar white with 1px bottom border, ~112px tall.
- [ ] Sidebar active item bg is light blue `#EAF3FB` (not gray), radius 10px, only the routed item active per page (Products on bo-01, Categories on bo-02, Site Content on bo-03).
- [ ] Logo square is `#0B2C4A`, ~30px, radius ~8px; "urpet admin" bold navy.
- [ ] Topbar action button `#0B2C4A`, 40px tall, radius 10px; search input 250×40 with `#F7F9FB` fill and no border.
- [ ] Products: 7 tabs in the exact order incl. `Accessories`; active tab navy pill; table header row `#F7F9FB` 46px; row height **89px**; row divider `#F0F3F5` (1px, very light — not `#E4E9EE`); thumbs 56px radius 10.
- [ ] Status pills: `แสดงอยู่` `#E9F7EF`/`#1E7E42`, `ซ่อนอยู่` `#FDEDEC`/`#B3261E`, fully rounded, 26px tall. Rows 3 (Cozy Pet Bed) and 6 (Travel Carrier) are `ซ่อนอยู่`.
- [ ] Prices right format with ฿ prefix and comma (`฿1,890`); price column bold navy while category column is gray `#5B6B77`.
- [ ] Categories: 3 columns, ~16px gap, photo area 178px tall, `แก้ไข` fills width minus 40px trash button, both `#F7F9FB` fill.
- [ ] Site Content: two equal cards (~552px) with ~18px gap; hero image ~220px tall; save button navy `บันทึกการเปลี่ยนแปลง`; featured rows 66px with 1px `#E4E9EE` border; dashed add row present.
- [ ] All modals: **520px** wide, radius 16px, header 64px with `×`, footer separated by `#F0F3F5` 1px line; cancel/confirm buttons ~equal halves with 12px gap, 44px tall.
- [ ] Product modal: 84px image thumb; dashed upload button; หมวดหมู่/ราคา side-by-side equal columns; segmented status with navy active; S/L/T chips 28px in `#EE4D2D` / `#101A8C` / `#111111`; link inputs hug content width (do not stretch full width).
- [ ] Delete confirm: pink circle `#FDEDEC` 44px, red button `#C0362C`, quoted product name in title.
- [ ] Picker: category chips are small square-ish (6px radius) gray chips, `+ เพิ่ม` pill bg `#EAF3FB`, footer button full-width navy `เสร็จสิ้น`.
- [ ] No `shadow-sticker` / `border-2 border-primary` anywhere in `/backoffice`.
- [ ] Thai copy matches this document character-for-character (copy-paste from here, don't retype).

---

## 8. Implementation order

1. **Tokens** — add `bo.*` colors to `tailwind.config.ts`; add `Noto Sans Thai` to font-body stack.
2. **`data/backoffice.ts`** + **`composables/useBackofficeData.ts`** (interfaces + seeds from §5).
3. **`layouts/backoffice.vue`** + `BackofficeSidebar` + `BackofficeTopbar` + placeholder pages/redirect (shell verifiable against bo-01 chrome).
4. **Primitives**: `BoStatusPill`, `BoIconButton`, `BoModal` (+ footer pattern).
5. **Products page**: `BoCategoryTabs` + `BoProductsTable` → verify vs bo-01.
6. **Product modals**: `BoAddEditProductModal` (add/edit modes vs bo-04/05) + `BoDeleteConfirmModal` (bo-07), wire to table actions.
7. **Categories page**: `BoCategoryCard` grid (bo-02) + `BoAddEditCategoryModal` (bo-06), reuse delete confirm.
8. **Site Content page**: `BoHeroEditor` + `BoFeaturedProductsCard` (bo-03) + `BoFeaturedProductPickerModal` (bo-08).
9. Run the §7 checklist screen-by-screen; fix drift.

## 9. Flagged judgment calls / ambiguities (for the user)

1. **Backoffice ≠ storefront style** — flat admin design, deliberately dropping sticker shadows/thick borders (§1). Confirm this is intended.
2. **Data mismatches vs storefront**: `Accessories` category exists only in backoffice mocks; Grooming Kit ฿450 (vs 460); Travel Carrier categorized as Accessories. Plan reproduces the PNGs verbatim via a separate `data/backoffice.ts`.
3. **Photos**: PNGs show real pet photos; plan uses placeholder blocks per project convention.
4. **Modal overlay**: PNG artboards show a flat light-gray demo backdrop, not a real scrim — spec'd `bg-primary/40` overlay.
5. **Marketplace link inputs hug their content width** in the design (unusual for forms) — spec'd to match the PNG, not `w-full`.
6. **Add-category modal title** `เพิ่มหมวดหมู่` is inferred (only the edit variant appears in bo-06).
7. **Admin heading font**: spec'd Inter bold (+ Noto Sans Thai), not Bricolage — matches the flat admin look in the PNGs.
