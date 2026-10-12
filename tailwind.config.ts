import type { Config } from 'tailwindcss'

export default <Partial<Config>>{
  content: [
    './components/**/*.{vue,js,ts}',
    './layouts/**/*.vue',
    './pages/**/*.vue',
    './data/**/*.{ts,js}',
    './app.vue'
  ],
  theme: {
    extend: {
      // ค่าจริงที่สกัดจาก design-reference/*.png ด้วย pixel sampling (ไม่ใช่ค่าประมาณแล้ว)
      colors: {
        primary: {
          DEFAULT: '#0B2C4A',
          dark: '#082036'
        },
        accent: {
          blue: '#2E9BE6', // ปุ่ม CTA หลัก (Shop Now), ราคาสินค้า, ลิงก์เน้น
          yellow: '#FFD84D',
          pink: '#FFB4C8',
          sky: '#A9D9F8',
          coral: '#EE4D2D', // ป้ายลดราคา
          teal: '#0080AD' // พื้นหลังรูปสัตว์เลี้ยง/สินค้า (placeholder แทนรูปจริง)
        },
        page: '#EAF5FD',
        ink: '#0B2C4A',
        muted: '#3D5A73',
        // Backoffice (admin) tokens — flat SaaS style, pixel-sampled จาก design-reference/bo-*.png
        bo: {
          canvas: '#F7F9FB',
          border: '#E4E9EE',
          divider: '#F0F3F5',
          active: '#EAF3FB',
          muted: '#9AA7B2',
          soft: '#5B6B77',
          successBg: '#E9F7EF',
          successText: '#1E7E42',
          dangerBg: '#FDEDEC',
          dangerText: '#B3261E',
          danger: '#C0362C',
          lazada: '#101A8C',
          tiktok: '#111111'
        }
      },
      fontFamily: {
        heading: ['Bricolage Grotesque', 'sans-serif'],
        body: ['Inter', 'Noto Sans Thai', 'sans-serif'],
        nav: ['Schibsted Grotesk', 'sans-serif']
      },
      borderRadius: {
        card: '20px',
        pill: '999px'
      },
      boxShadow: {
        sticker: '4px 4px 0 0 var(--tw-shadow-color)'
      }
    }
  },
  plugins: []
}
