# Buterin Beach Break ($BBREAK)

Fan site for an independent Ethereum beach-break story. The mascot is a fictional travel-poster caricature: tousled brown hair, a teal tropical shirt, and a violet crystal badge.

Fan concept only; no endorsement or affiliation is implied.

Live site: [https://bbreak.site](https://bbreak.site)

## Pages

| Route | Page |
| --- | --- |
| `/` | Home |
| `/story` | Story |
| `/token` | Tokenomics |
| `/community` | Community and the 12 reaction stickers |

The header links to Home, Story, Tokenomics, and Community. **JOIN THE CLUB** goes to `/community#join`. The footer shows the brand plus X and Telegram icons.

## Published facts

Facts shown on the site come from [`src/config/site.ts`](src/config/site.ts).

| Fact | Value |
| --- | --- |
| Network | Ethereum Mainnet |
| Contract address | `0xdbba341bb3b143371452580cbf5eb1058cea9f8e` |
| Total supply | 1,000,000,000 |
| Buy / sell tax | 0% |
| Liquidity status | Burn |
| Ownership status | Renounce |
| X | [https://x.com/bbreak_eth](https://x.com/bbreak_eth) |
| Telegram | [https://t.me/BBREAK_ETH](https://t.me/BBREAK_ETH) |

**Copy Address** copies `contractAddress` from that file. Trade, chart, and explorer links stay empty until they are set there.

## Local development

```bash
npm ci
npm run dev
```

Other scripts:

```bash
npm test
npm run lint
npm run build
npm run preview
```

Stack: Vite, React, TypeScript, React Router, and plain CSS.

## Assets

Public images live under `public/assets/bbreak/`:

- `hero-stage.jpg` — homepage banner
- `bbreak-logo-transparent.png`
- `bbreak-banner-3to1.png`
- `bbreak-banner-1100x520.png`
- `stickers/chat-512/` — the 12 chat stickers used on the community page

Source copies of the logo, banners, and 1024px sticker masters stay in `assets/source/` and are not served by the site. Design previews in `docs/design-reference/` stay out of the public bundle.

## Deploy

Pushes to `main` build the site and deploy `dist` with GitHub Actions. `public/CNAME` is `bbreak.site`. The build copies `index.html` to `404.html` so direct routes such as `/story` still load the app on GitHub Pages.
