import { Link } from "react-router-dom"
import { PageMeta } from "../components/PageMeta"
import { assets, logoAlt, site } from "../config/site"

const chapters = [
  {
    number: "1",
    title: "01 • BADGE ON",
    body: "A glowing crystal pass survives the final panel.",
    tone: "aqua",
  },
  {
    number: "2",
    title: "02 • SHADOW OFF",
    body: "A palm silhouette gives the badge vacation ideas.",
    tone: "sand",
  },
  {
    number: "3",
    title: "03 • BEACH MODE",
    body: "The mascot follows the shadow into a sunset poster.",
    tone: "lavender",
  },
]

export function StoryPage() {
  return (
    <div className="page">
      <PageMeta
        title={`Story — ${site.name} ($${site.ticker})`}
        description="A fictional travel-poster origin story for an independent Ethereum community concept."
        path="/story"
      />

      <header className="page-intro">
        <p className="eyebrow">BUTERIN BEACH BREAK</p>
        <h1>The badge took a day off.</h1>
        <p className="lede">
          A fictional travel-poster origin story for an independent Ethereum community concept.
        </p>
      </header>

      <section className="panel panel-sand split" aria-labelledby="origin-heading">
        <div>
          <p className="eyebrow">ORIGIN STORY</p>
          <h2 id="origin-heading">From conference pass to beach-day badge.</h2>
          <p>
            One imaginary afternoon, the conference ended early. The violet crystal badge caught
            the sun; its shadow looked suspiciously like a palm tree. The mascot followed it to the
            shore.
          </p>
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

      <figure className="banner-frame banner-wide">
        <img
          src={assets.bannerWide}
          alt="Wide travel poster reading Buterin Beach Break and $BBREAK, showing the fictional mascot pointing at a violet crystal badge beside a palm tree at sunset."
          width={1500}
          height={500}
          loading="lazy"
          decoding="async"
        />
      </figure>

      <section className="section" aria-labelledby="chapters-heading">
        <p className="eyebrow">STORY / CHAPTERS</p>
        <h2 id="chapters-heading">Three frames. One beach break.</h2>
        <div className="chapters">
          {chapters.map((chapter) => (
            <article className={`chapter chapter-${chapter.tone}`} key={chapter.title}>
              <span className={`step-badge badge-${chapter.tone}`} aria-hidden="true">
                {chapter.number}
              </span>
              <h3>{chapter.title}</h3>
              <p>{chapter.body}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="panel panel-navy split" aria-labelledby="joke-heading">
        <div>
          <p className="eyebrow">THE VISUAL JOKE</p>
          <h2 id="joke-heading">A badge with a beach shadow.</h2>
          <p>
            The crystal badge stays polished and official-looking; its palm-tree shadow absolutely
            does not. The contrast is the joke and the core visual motif.
          </p>
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

      <section className="panel panel-aqua independence" aria-labelledby="independence-heading">
        <p className="eyebrow">INDEPENDENCE NOTE</p>
        <h2 id="independence-heading">Fan concept, not an endorsement.</h2>
        <p>
          The character is a playful caricature inspired by Vitalik Buterin. The token and
          community are not created, approved, or supported by Vitalik or the Ethereum Foundation.
        </p>
        <Link className="btn btn-primary" to="/token">
          TOKEN DETAILS
        </Link>
      </section>
    </div>
  )
}
