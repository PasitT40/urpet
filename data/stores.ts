export interface MarketplaceStore {
  name: string
  initial: string
  color: string
  shadow: string
  rowBg: string
  subtitle: string
  url: string
}

export const stores: MarketplaceStore[] = [
  { name: 'Shopee', initial: 'S', color: 'bg-accent-coral', shadow: 'shadow-accent-coral', rowBg: 'bg-[#FFF0EC]', subtitle: 'urpet official · ★ 4.9', url: '#' },
  { name: 'Lazada', initial: 'L', color: 'bg-primary', shadow: 'shadow-accent-blue', rowBg: 'bg-[#EEF0FF]', subtitle: 'LazMall store · ★ 4.9', url: '#' },
  { name: 'TikTok Shop', initial: 'T', color: 'bg-black', shadow: 'shadow-accent-yellow', rowBg: 'bg-[#F0F0F0]', subtitle: 'Live every Friday · ★ 4.8', url: '#' }
]
