import { Link } from "react-router-dom"
import { InfoCard } from "../components/InfoCard"
import { PageMeta } from "../components/PageMeta"
import { SocialActions } from "../components/SocialActions"
import { ContractControl } from "../components/ContractControl"
import { assets, joinPath, site, tokenomicItems } from "../config/site"

export function HomePage() {
  return (
    <div className="page">
      <PageMeta
        title={`${site.name} ($${site.ticker})`}
        description="Vitalik-inspired Ethereum culture takes a playful day off. A fan-made story about conferences, crystals, and catching the last light."
        path="/"
      />

      <section className="hero hero-with-banner panel panel-aqua">
        <img
          className="hero-banner"
          src={assets.heroBanner}
          alt="Theater stage with a vintage microphone character presenting seated guests under red curtains and warm spotlights."
          width={1280}
          height={720}
          decoding="sync"
        />
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
              JOIN THE COMMUNITY
            </Link>
          </div>
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
            body="Independent community concept. No endorsement or affiliation is implied"
          />
        </div>
      </section>

      <section className="section" aria-labelledby="tokenomics-home-heading">
        <p className="eyebrow">TOKENOMICS</p>
        <h2 id="tokenomics-home-heading">Tokenomics</h2>
        <div className="grid-2">
          {tokenomicItems.map((item) => (
            <InfoCard key={item.title} accent={item.accent} title={item.title} body={item.body} />
          ))}
        </div>
        <ContractControl address={site.contractAddress} />
      </section>

      <section className="panel panel-navy cta-panel" aria-labelledby="community-cta-heading">
        <div>
          <p className="eyebrow">COME FIND YOUR BEACH CHAIR</p>
          <h2 id="community-cta-heading">A little sun. A little Ethereum.</h2>
          <p>Join the community.</p>
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
