import { isConfigured, site } from "../config/site"

function PendingOrLink({
  href,
  pendingText,
  readyText,
  className,
}: {
  href: string | null
  pendingText: string
  readyText: string
  className: string
}) {
  if (!isConfigured(href)) {
    return (
      <button type="button" className={className} disabled aria-disabled="true">
        {pendingText}
        <span className="sr-only"> Official link is not published yet.</span>
      </button>
    )
  }

  return (
    <a className={className} href={href} target="_blank" rel="noopener noreferrer">
      {readyText}
    </a>
  )
}

export function SocialActions() {
  return (
    <div className="button-row">
      <PendingOrLink
        href={site.links.telegram}
        pendingText="TELEGRAM LINK TBD"
        readyText="TELEGRAM"
        className="btn btn-primary"
      />
      <PendingOrLink
        href={site.links.twitter}
        pendingText="X LINK TBD"
        readyText="X"
        className="btn btn-cream"
      />
    </div>
  )
}
