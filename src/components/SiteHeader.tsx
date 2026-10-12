import { useEffect, useId, useRef, useState } from "react"
import { Link, NavLink, useLocation } from "react-router-dom"
import { joinPath, navItems } from "../config/site"
import { BrandLockup } from "./BrandLockup"

export function SiteHeader() {
  const [open, setOpen] = useState(false)
  const location = useLocation()
  const menuId = useId()
  const toggleRef = useRef<HTMLButtonElement>(null)
  const panelRef = useRef<HTMLDivElement>(null)
  const closeRef = useRef<HTMLButtonElement>(null)

  useEffect(() => {
    setOpen(false)
  }, [location.pathname, location.hash])

  useEffect(() => {
    document.body.classList.toggle("menu-open", open)
    if (!open) return

    closeRef.current?.focus()
    const panel = panelRef.current

    function onKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setOpen(false)
        toggleRef.current?.focus()
        return
      }
      if (event.key !== "Tab" || !panel) return
      const focusable = Array.from(panel.querySelectorAll<HTMLElement>("a, button"))
      const first = focusable[0]
      const last = focusable[focusable.length - 1]
      if (!first || !last) return
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault()
        last.focus()
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault()
        first.focus()
      }
    }

    document.addEventListener("keydown", onKeyDown)
    return () => {
      document.removeEventListener("keydown", onKeyDown)
      document.body.classList.remove("menu-open")
    }
  }, [open])

  return (
    <header className="site-header">
      <div className="header-bar">
        <BrandLockup />
        <nav className="desktop-nav" aria-label="Primary">
          {navItems.map((item) => (
            <NavLink key={item.to} to={item.to} end={item.to === "/"} className="nav-link">
              {item.label}
            </NavLink>
          ))}
        </nav>
        <Link className="btn btn-primary header-cta" to={joinPath}>
          JOIN THE CLUB
        </Link>
        <button
          ref={toggleRef}
          type="button"
          className="menu-toggle"
          aria-expanded={open}
          aria-controls={menuId}
          onClick={() => setOpen((value) => !value)}
        >
          <span className="sr-only">{open ? "Close menu" : "Open menu"}</span>
          <span className="menu-bars" aria-hidden="true" />
        </button>
      </div>
      {open ? (
        <div className="menu-layer" onClick={() => setOpen(false)}>
          <div
            id={menuId}
            ref={panelRef}
            className="mobile-panel"
            role="dialog"
            aria-modal="true"
            aria-label="Site menu"
            onClick={(event) => event.stopPropagation()}
          >
            <div className="mobile-panel-top">
              <p className="mobile-brand">BUTERIN BEACH BREAK</p>
              <button
                ref={closeRef}
                type="button"
                className="menu-close"
                onClick={() => {
                  setOpen(false)
                  toggleRef.current?.focus()
                }}
              >
                <span aria-hidden="true">×</span>
                <span className="sr-only">Close menu</span>
              </button>
            </div>
            <nav className="mobile-nav" aria-label="Mobile">
              {navItems.map((item) => (
                <NavLink key={item.to} to={item.to} end={item.to === "/"} className="mobile-link">
                  {item.label}
                </NavLink>
              ))}
            </nav>
            <Link className="btn btn-primary mobile-join" to={joinPath}>
              JOIN THE CLUB
            </Link>
            <span className="mobile-accent" aria-hidden="true" />
          </div>
        </div>
      ) : null}
    </header>
  )
}
