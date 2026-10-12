import { Link } from "react-router-dom"
import { assets } from "../config/site"

export function BrandLockup({ href = "/" }: { href?: string }) {
  return (
    <Link className="brand" to={href}>
      <img src={assets.logo} alt="" width={1024} height={1024} />
      <span className="brand-text">
        <span className="brand-stack">
          BUTERIN
          <span>BEACH BREAK</span>
        </span>
        <span className="brand-single">BUTERIN BEACH BREAK</span>
      </span>
    </Link>
  )
}
