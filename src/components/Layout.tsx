import { Outlet } from "react-router-dom"
import { SiteFooter } from "./SiteFooter"
import { SiteHeader } from "./SiteHeader"

export function Layout() {
  return (
    <>
      <a className="skip-link" href="#main">
        Skip to content
      </a>
      <SiteHeader />
      <main id="main" tabIndex={-1}>
        <Outlet />
      </main>
      <SiteFooter />
    </>
  )
}
