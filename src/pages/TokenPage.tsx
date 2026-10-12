import { ContractControl } from "../components/ContractControl"
import { InfoCard } from "../components/InfoCard"
import { PageMeta } from "../components/PageMeta"
import { isConfigured, site, tickerLabel } from "../config/site"

const steps = [
  {
    number: "1",
    title: "1 • Verify",
    body: "Wait for a published contract from official channels.",
  },
  {
    number: "2",
    title: "2 • Prepare",
    body: "Use a wallet you control and ETH for gas.",
  },
  {
    number: "3",
    title: "3 • Swap",
    body: "Use a verified link only after launch details are confirmed.",
  },
]

export function TokenPage() {
  return (
    <div className="page">
      <PageMeta
        title={`Token — ${site.name} (${tickerLabel})`}
        description="Preview the intended information layout. Contract address, tokenomics, and social links remain placeholders until confirmed."
        path="/token"
      />

      <header className="page-intro">
        <p className="eyebrow">BUTERIN BEACH BREAK</p>
        <h1>Token details, clearly marked.</h1>
        <p className="lede">
          Preview the intended information layout. Contract address, tokenomics, and social links
          remain placeholders until confirmed.
        </p>
      </header>

      <section className="panel panel-navy token-summary" aria-labelledby="token-name">
        <p className="eyebrow">
          {isConfigured(site.contractAddress)
            ? "ETHEREUM MAINNET • CONTRACT PUBLISHED"
            : "ETHEREUM MAINNET • CONTRACT NOT PUBLISHED"}
        </p>
        <h2 id="token-name">BUTERIN BEACH BREAK</h2>
        <p className="ticker-line">
          Ticker: <span>{tickerLabel}</span>
        </p>
        <p>
          No contract address or tokenomics were supplied for this preview. Do not use a
          placeholder as a real contract.
        </p>
        <ContractControl address={site.contractAddress} />
      </section>

      <div className="grid-3">
        <InfoCard accent="coral" title="Contract address" body="Not published" />
        <InfoCard accent="violet" title="Tokenomics" body="Not provided" />
        <InfoCard accent="turquoise" title="Official links" body="TBD" />
      </div>

      <section className="section" aria-labelledby="tokenomics-heading">
        <p className="eyebrow">TOKENOMICS</p>
        <h2 id="tokenomics-heading">Numbers stay blank until confirmed.</h2>
        <div className="grid-2">
          <InfoCard accent="coral" title="Supply" body="TBD — not provided" />
          <InfoCard accent="violet" title="Taxes" body="TBD — not provided" />
          <InfoCard accent="turquoise" title="Liquidity" body="TBD — not provided" />
          <InfoCard accent="navy" title="Ownership" body="TBD — not provided" />
        </div>
      </section>

      <section className="section" aria-labelledby="buy-heading">
        <p className="eyebrow">HOW TO BUY</p>
        <h2 id="buy-heading">A simple, safety-first flow.</h2>
        <ol className="steps">
          {steps.map((step) => (
            <li className="step-card" key={step.title}>
              <span className="step-badge badge-coral" aria-hidden="true">
                {step.number}
              </span>
              <h3>{step.title}</h3>
              <p>{step.body}</p>
            </li>
          ))}
        </ol>
      </section>

      <aside className="panel panel-sand safety-note">
        <h2>Safety note</h2>
        <p>
          This mockup is not a live buying guide. Contract address, liquidity details, tokenomics,
          and links must be confirmed before publishing.
        </p>
      </aside>
    </div>
  )
}
