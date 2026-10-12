import { NavLink } from "react-router-dom"
import { assets, isConfigured, logoAlt, navItems, site, tickerLabel } from "../config/site"

function StatusLink({
  href,
  pending,
  ready,
}: {
  href: string | null
  pending: string
  ready: string
}) {
  if (!isConfigured(href)) return <span>{pending}</span>
  return (
    <a href={href} target="_blank" rel="noopener noreferrer">
      {ready}
    </a>
  )
}

export function SiteFooter() {
  const contractText = isConfigured(site.contractAddress)
    ? `CONTRACT: ${site.contractAddress}`
    : "CONTRACT: NOT PUBLISHED"

  return (
    <footer className="site-footer">
      <div className="footer-inner">
        <div className="footer-brand">
          <img src={assets.logo} alt={logoAlt} width={1024} height={1024} />
          <div>
            <p className="footer-name">BUTERIN BEACH BREAK</p>
            <p className="footer-tag">A fan-made Ethereum beach break.</p>
          </div>
        </div>
        <nav className="footer-nav" aria-label="Footer">
          {navItems.map((item) => (
            <NavLink key={item.to} to={item.to} end={item.to === "/"}>
              {item.label}
            </NavLink>
          ))}
        </nav>
        <p className="footer-status">
          <StatusLink href={site.links.twitter} pending="X: LINK TBD" ready="X" />
          <span aria-hidden="true"> • </span>
          <StatusLink href={site.links.telegram} pending="TELEGRAM: LINK TBD" ready="TELEGRAM" />
          <span aria-hidden="true"> • </span>
          {isConfigured(site.links.explorer) && isConfigured(site.contractAddress) ? (
            <a href={site.links.explorer} target="_blank" rel="noopener noreferrer">
              {contractText}
            </a>
          ) : (
            <span className={isConfigured(site.contractAddress) ? "selectable" : undefined}>
              {contractText}
            </span>
          )}
        </p>
        <p className="footer-note">
          Independent fan concept inspired by Ethereum culture. No Vitalik Buterin endorsement or
          affiliation is implied. Fan concept only; no endorsement or affiliation is implied.
        </p>
        <p className="sr-only">
          {site.name} ({tickerLabel}) is an independent fictional concept on {site.network}. It is
          not created, approved, endorsed, or partnered with Vitalik Buterin or the Ethereum
          Foundation.
        </p>
      </div>
    </footer>
  )
}
