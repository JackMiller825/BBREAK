import { assets, isConfigured, logoAlt, site } from "../config/site"

export function SiteFooter() {
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
        <div className="footer-social">
          {isConfigured(site.links.telegram) ? (
            <a href={site.links.telegram} target="_blank" rel="noopener noreferrer" aria-label="Telegram">
              <svg viewBox="0 0 24 24" aria-hidden="true">
                <path
                  fill="currentColor"
                  d="M21.5 4.4 2.7 11.6c-.9.4-.9 1.1.1 1.4l4.8 1.5 11.1-7c.5-.3 1-.1.6.3l-9 8.1-.3 4.6c.4.6 1 .3 1.3-.1l2.2-2.1 4.6 3.4c.8.5 1.4.2 1.6-.8l2.9-13.7c.3-1.3-.5-1.9-1.1-1.6z"
                />
              </svg>
            </a>
          ) : null}
          {isConfigured(site.links.twitter) ? (
            <a href={site.links.twitter} target="_blank" rel="noopener noreferrer" aria-label="X">
              <svg viewBox="0 0 24 24" aria-hidden="true">
                <path
                  fill="currentColor"
                  d="M14.6 10.2 22.2 2h-1.8l-6.6 7.1L8.5 2H2.2l8 10.9L2.2 22h1.8l7-7.5L15.5 22h6.3l-7.2-11.8Zm-2.5 2.7-.8-1.1-6.4-8.5h2.8l5.2 6.9.8 1.1 6.7 8.9h-2.8l-5.5-7.3Z"
                />
              </svg>
            </a>
          ) : null}
        </div>
      </div>
    </footer>
  )
}
