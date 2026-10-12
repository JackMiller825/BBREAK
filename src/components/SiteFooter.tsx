import { NavLink } from "react-router-dom"
import { assets, logoAlt, navItems } from "../config/site"

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
        <nav className="footer-nav" aria-label="Footer">
          {navItems.map((item) => (
            <NavLink key={item.to} to={item.to} end={item.to === "/"}>
              {item.label}
            </NavLink>
          ))}
        </nav>
      </div>
    </footer>
  )
}
