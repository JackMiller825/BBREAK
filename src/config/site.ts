export interface SiteConfig {
  name: string
  ticker: string
  network: string
  contractAddress: string | null
  tokenomics: {
    supply: string | null
    taxes: string | null
    liquidity: string | null
    ownership: string | null
  }
  links: {
    domain: string | null
    twitter: string | null
    telegram: string | null
    trade: string | null
    chart: string | null
    explorer: string | null
  }
  deployment: {
    host: string | null
    repository: string | null
  }
}

export const site: SiteConfig = {
  name: "Buterin Beach Break",
  ticker: "BBREAK",
  network: "Ethereum Mainnet",
  contractAddress: "0xdbba341bb3b143371452580cbf5eb1058cea9f8e",
  tokenomics: {
    supply: "1,000,000,000",
    taxes: "0%",
    liquidity: "Burn",
    ownership: "Renounce",
  },
  links: {
    domain: "https://bbreak.site",
    twitter: "https://x.com/bbreak_eth",
    telegram: "https://t.me/BBREAK_ETH",
    trade: null,
    chart: null,
    explorer: null,
  },
  deployment: {
    host: "GitHub Pages",
    repository: "https://github.com/JackMiller825/BBREAK",
  },
}

export function isConfigured(value: string | null | undefined): value is string {
  return typeof value === "string" && value.trim().length > 0
}

export const tickerLabel = `$${site.ticker}`

export const comingSoon = "Coming Soon.."

export const tokenomicItems = [
  { title: "Total Supply", body: site.tokenomics.supply ?? comingSoon, accent: "coral" },
  { title: "Buy / Sell tax", body: site.tokenomics.taxes ?? comingSoon, accent: "violet" },
  { title: "Liquidity Status", body: site.tokenomics.liquidity ?? comingSoon, accent: "turquoise" },
  { title: "Ownership Status", body: site.tokenomics.ownership ?? comingSoon, accent: "navy" },
] as const

export const assets = {
  logo: "/assets/bbreak/bbreak-logo-transparent.png",
  bannerWide: "/assets/bbreak/bbreak-banner-3to1.png",
  bannerCommunity: "/assets/bbreak/bbreak-banner-1100x520.png",
  stickerDir: "/assets/bbreak/stickers/chat-512",
} as const

export const navItems = [
  { label: "Home", to: "/" },
  { label: "Story", to: "/story" },
  { label: "Tokenomics", to: "/token" },
  { label: "Community", to: "/community" },
] as const

export const joinPath = "/community#join"

export const stickers = [
  { file: "001-bbreak-happy.png", label: "Happy" },
  { file: "002-bbreak-laughing.png", label: "Laughing" },
  { file: "003-bbreak-excited.png", label: "Excited" },
  { file: "004-bbreak-sad.png", label: "Sad" },
  { file: "005-bbreak-angry.png", label: "Angry" },
  { file: "006-bbreak-scared.png", label: "Scared" },
  { file: "007-bbreak-shocked.png", label: "Shocked" },
  { file: "008-bbreak-confused.png", label: "Confused" },
  { file: "009-bbreak-smug.png", label: "Smug" },
  { file: "010-bbreak-embarrassed.png", label: "Embarrassed" },
  { file: "011-bbreak-loving.png", label: "Loving" },
  { file: "012-bbreak-tired.png", label: "Tired" },
] as const

export const logoAlt =
  "Fictional travel-poster mascot with tousled brown hair, a teal tropical shirt, and a violet crystal conference badge, pointing at the badge beside a sunset beach and palm tree."

export function stickerFileNames(): string[] {
  return typeof __BBREAK_STICKERS__ === "undefined" ? [] : __BBREAK_STICKERS__
}

export function pageUrl(path: string): string {
  if (!isConfigured(site.links.domain)) return path
  return new URL(path, site.links.domain).href
}
