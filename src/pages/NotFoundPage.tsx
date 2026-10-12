import { Link } from "react-router-dom"
import { PageMeta } from "../components/PageMeta"
import { site } from "../config/site"

export function NotFoundPage() {
  return (
    <div className="page">
      <PageMeta
        title={`Page not found — ${site.name}`}
        description="That page is not part of the Buterin Beach Break fan site."
        path="/404"
      />
      <header className="page-intro">
        <p className="eyebrow">BUTERIN BEACH BREAK</p>
        <h1>That tide mark isn’t on the map.</h1>
        <p className="lede">This page does not exist. Head back to the beach-break story.</p>
        <Link className="btn btn-primary" to="/">
          BACK TO HOME
        </Link>
      </header>
    </div>
  )
}
