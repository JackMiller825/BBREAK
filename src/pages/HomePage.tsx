import { Link } from "react-router-dom"
import { InfoCard } from "../components/InfoCard"
import { PageMeta } from "../components/PageMeta"
import { SocialActions } from "../components/SocialActions"
import { assets, isConfigured, joinPath, logoAlt, site } from "../config/site"

export function HomePage() {
  return (
    <div className="page">
      <PageMeta
        title={`${site.name} ($${site.ticker})`}
        description="Vitalik-inspired Ethereum culture takes a playful day off. A fan-made story about conferences, crystals, and catching the last light."
        path="/"
      />

      <section className="hero panel panel-aqua">
        <div className="hero-copy">
          <p className="eyebrow">AN UNOFFICIAL ETHEREUM BEACH BREAK</p>
          <h1>
            The conference is out.
            <br />
            The beach is in.
          </h1>
          <p className="lede">
            Vitalik-inspired Ethereum culture takes a playful day off. A fan-made story about
            conferences, crystals, and catching the last light.
          </p>
          <div className="button-row">
            <Link className="btn btn-primary" to="/story">
              EXPLORE THE STORY
            </Link>
            <Link className="btn btn-secondary" to={joinPath}>
              COMMUNITY LINKS TBD
              <span className="sr-only">
                {" "}
                Opens the community section. Social profiles are not published yet.
              </span>
            </Link>
          </div>
          <p className="name-badge">NAME: BUTERIN BEACH BREAK</p>
        </div>
        <div
          className="hero-art"
          tabIndex={0}
          aria-describedby="hero-art-hint"
        >
          <img
            src={assets.logo}
            alt={logoAlt}
            width={1024}
            height={1024}
            decoding="sync"
          />
          <p id="hero-art-hint" className="sr-only">
            Hover or focus to preview a restrained crystal-badge glow and palm-shadow shimmer.
          </p>
        </div>
      </section>

      <section className="section" aria-labelledby="story-teaser-heading">
        <p className="eyebrow">THE STORY</p>
        <h2 id="story-teaser-heading">A beach break with an Ethereum twist</h2>
        <p className="lede">
          The conference badge is off duty. The crystal still glows. Explore the independent fan
          story behind the mascot.
        </p>
        <div className="grid-3">
          <InfoCard
            accent="coral"
            title="THE ORIGIN"
            body="A conference badge becomes a beach pass. The story is invented meme fiction, not an official Vitalik project."
          />
          <InfoCard
            accent="violet"
            title="THE MASCOT"
            body="A playful Vitalik-inspired traveler points to a glowing violet crystal and a palm-tree shadow."
          />
          <InfoCard
            accent="turquoise"
            title="THE DISCLAIMER"
            body="Independent community concept. No endorsement or affiliation is implied."
          />
        </div>
      </section>

      <section className="section" aria-labelledby="token-snapshot-heading">
        <p className="eyebrow">THE TOKEN</p>
        <h2 id="token-snapshot-heading">Token snapshot</h2>
        <p className="lede">
          Ethereum mainnet concept • Contract address: not published • Tokenomics: not provided
        </p>
        <div className="grid-3">
          <InfoCard accent="coral" title="Contract" body="Not published" />
          <InfoCard accent="violet" title="Tokenomics" body="Not provided" />
          <InfoCard
            accent="turquoise"
            title="Social links"
            body={
              isConfigured(site.links.twitter) || isConfigured(site.links.telegram)
                ? "Official links configured"
                : "TBD"
            }
          />
        </div>
      </section>

      <section className="panel panel-navy cta-panel" aria-labelledby="community-cta-heading">
        <div>
          <p className="eyebrow">COME FIND YOUR BEACH CHAIR</p>
          <h2 id="community-cta-heading">A little sun. A little Ethereum.</h2>
          <p>
            Join the community when official social links are ready. No purchase links or contract
            address are published in this preview.
          </p>
          <SocialActions />
        </div>
        <img
          className="panel-mark"
          src={assets.logo}
          alt=""
          width={1024}
          height={1024}
          loading="lazy"
          decoding="async"
        />
      </section>
    </div>
  )
}
