import { ContractControl } from "../components/ContractControl"
import { InfoCard } from "../components/InfoCard"
import { PageMeta } from "../components/PageMeta"
import { comingSoon, isConfigured, site, tickerLabel, tokenomicItems } from "../config/site"

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
        title={`Tokenomics — ${site.name} (${tickerLabel})`}
        description="Tokenomics for Buterin Beach Break. The contract address is not published yet."
        path="/token"
      />

      <header className="page-intro">
        <p className="eyebrow">BUTERIN BEACH BREAK</p>
        <h1>Tokenomics, clearly marked.</h1>
        <p className="lede">
          Supply, tax, liquidity, and ownership are listed below. The contract address is not
          published yet.
        </p>
      </header>

      <section className="panel panel-navy token-summary" aria-labelledby="token-name">
        <p className="eyebrow">
          {isConfigured(site.contractAddress)
            ? "ETHEREUM MAINNET • CONTRACT PUBLISHED"
            : "ETHEREUM MAINNET • CONTRACT COMING SOON"}
        </p>
        <h2 id="token-name">BUTERIN BEACH BREAK</h2>
        <p className="ticker-line">
          Ticker: <span>{tickerLabel}</span>
        </p>
        <p>Do not use a placeholder as a real contract. The address shown can still be copied.</p>
        <ContractControl address={site.contractAddress} />
      </section>

      <div className="grid-3">
        <InfoCard
          accent="coral"
          title="Contract address"
          body={isConfigured(site.contractAddress) ? site.contractAddress : comingSoon}
        />
        <InfoCard accent="violet" title="Tokenomics" body="Confirmed below" />
        <InfoCard accent="turquoise" title="Official links" body="X and Telegram" />
      </div>

      <section className="section" aria-labelledby="tokenomics-heading">
        <p className="eyebrow">TOKENOMICS</p>
        <h2 id="tokenomics-heading">Tokenomics</h2>
        <div className="grid-2">
          {tokenomicItems.map((item) => (
            <InfoCard key={item.title} accent={item.accent} title={item.title} body={item.body} />
          ))}
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
          This is not a live buying guide until a contract address is published. Confirm the
          Ethereum mainnet address before interacting.
        </p>
      </aside>
    </div>
  )
}
