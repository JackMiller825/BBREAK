import { FAQ } from "../components/FAQ"
import { InfoCard } from "../components/InfoCard"
import { PageMeta } from "../components/PageMeta"
import { SocialActions } from "../components/SocialActions"
import {
  assets,
  isConfigured,
  logoAlt,
  site,
  stickerFileNames,
  stickers,
  tickerLabel,
} from "../config/site"

const faqs = [
  {
    question: "Is Buterin Beach Break affiliated with Vitalik?",
    answer:
      "No. It is an independent fan concept; no endorsement or partnership is implied.",
  },
  {
    question: "What is the contract address?",
    answer:
      "Not published. A contract address will only be added when confirmed through official project channels.",
  },
  {
    question: "What are the tokenomics?",
    answer:
      "Not provided. Supply, taxes, liquidity, and ownership details remain blank until confirmed.",
  },
  {
    question: "How do I buy?",
    answer:
      "No buying link is available yet. Wait for a confirmed contract and verified trading links, then confirm the Ethereum mainnet network and contract address before interacting.",
  },
]

export function CommunityPage() {
  const available = new Set(stickerFileNames())
  const missing = stickers.filter((sticker) => !available.has(sticker.file))

  return (
    <div className="page">
      <PageMeta
        title={`Community — ${site.name} (${tickerLabel})`}
        description="Community page concept for an independent fan project. Social destinations are placeholders until official links are supplied."
        path="/community"
      />

      <header className="page-intro">
        <p className="eyebrow">BUTERIN BEACH BREAK</p>
        <h1>Meet us by the palm shadow.</h1>
        <p className="lede">
          Community page concept for an independent fan project. Social destinations are
          placeholders until official links are supplied.
        </p>
      </header>

      <section id="join" className="panel panel-navy split" aria-labelledby="join-heading">
        <div>
          <p className="eyebrow">COMMUNITY / INVITE</p>
          <h2 id="join-heading">A place for the beach crew.</h2>
          <p>
            Share the running jokes, the crystal badge, and your own beach-break reactions. Join
            buttons stay inactive until official links are supplied.
          </p>
          <SocialActions />
          <div className="promise">
            <p className="promise-label">COMMUNITY PROMISE</p>
            <p>Independent fan project • No endorsement • No financial promises</p>
          </div>
        </div>
        <img
          className="panel-mark"
          src={assets.logo}
          alt={logoAlt}
          width={1024}
          height={1024}
          loading="lazy"
          decoding="async"
        />
      </section>

      <figure className="banner-frame banner-community">
        <img
          src={assets.bannerCommunity}
          alt="Travel poster of the fictional mascot seated in a beach chair, pointing at a glowing violet crystal badge, with the words Buterin Beach Break and $BBREAK."
          width={1100}
          height={520}
          loading="lazy"
          decoding="async"
        />
      </figure>

      <div className="grid-3">
        <InfoCard
          accent="coral"
          title="Telegram"
          body={
            isConfigured(site.links.telegram)
              ? "Official invite link is available above."
              : "Community invite link: TBD"
          }
        />
        <InfoCard
          accent="violet"
          title="X / Twitter"
          body={
            isConfigured(site.links.twitter)
              ? "Official profile link is available above."
              : "Official profile link: TBD"
          }
        />
        <InfoCard
          accent="turquoise"
          title="Community rules"
          body="Respectful, transparent, and no fake endorsements."
        />
      </div>

      <section className="section" aria-labelledby="sticker-heading">
        <h2 id="sticker-heading">Pick your beach-break reaction.</h2>
        {missing.length > 0 ? (
          <p className="notice" role="status">
            Sticker images are not in this workspace yet
            {missing.length === stickers.length
              ? " (bbreak-12-stickers-v2.zip was not supplied)"
              : ""}
            . Emotion labels below match the approved 12-sticker set.
          </p>
        ) : null}
        <ul className="sticker-grid">
          {stickers.map((sticker) => {
            const ready = available.has(sticker.file)
            return (
              <li key={sticker.file}>
                <figure>
                  {ready ? (
                    <img
                      src={`${assets.stickerDir}/${sticker.file}`}
                      alt={`Buterin Beach Break sticker showing a ${sticker.label.toLowerCase()} reaction.`}
                      width={512}
                      height={512}
                      loading="lazy"
                      decoding="async"
                    />
                  ) : (
                    <div
                      className="sticker-fallback"
                      role="img"
                      aria-label={`${sticker.label} sticker image is not available`}
                    >
                      <span>{sticker.label}</span>
                    </div>
                  )}
                  <figcaption>{sticker.label}</figcaption>
                </figure>
              </li>
            )
          })}
        </ul>
      </section>

      <FAQ items={faqs} heading="Frequently asked before the tide comes in." />
    </div>
  )
}
