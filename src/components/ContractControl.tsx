import { useEffect, useState } from "react"
import { comingSoon, isConfigured } from "../config/site"

function selectVisibleAddress() {
  const node = document.querySelector(".copy-address")
  const selection = window.getSelection()
  if (!node || !selection) return
  const range = document.createRange()
  range.selectNodeContents(node)
  selection.removeAllRanges()
  selection.addRange(range)
}

function copyWithSelection(value: string) {
  selectVisibleAddress()
  const area = document.createElement("textarea")
  area.value = value
  area.setAttribute("readonly", "")
  area.style.position = "fixed"
  area.style.top = "0"
  area.style.left = "0"
  document.body.appendChild(area)
  area.focus()
  area.select()
  const copied = document.execCommand("copy")
  document.body.removeChild(area)
  if (!copied) throw new Error("Copy command was rejected")
}

export function ContractControl({ address }: { address: string | null }) {
  const value = isConfigured(address) ? address : comingSoon
  const [status, setStatus] = useState<"idle" | "copied" | "error">("idle")
  const [message, setMessage] = useState("")

  useEffect(() => {
    if (status !== "copied") return
    const timeout = window.setTimeout(() => {
      setStatus("idle")
      setMessage("")
    }, 2500)
    return () => window.clearTimeout(timeout)
  }, [status])

  async function copyAddress() {
    let legacyCopied = false
    try {
      copyWithSelection(value)
      legacyCopied = true
    } catch {
      legacyCopied = false
    }

    try {
      if (navigator.clipboard?.writeText) {
        await navigator.clipboard.writeText(value)
      } else if (!legacyCopied) {
        throw new Error("Clipboard API is unavailable")
      }
      setStatus("copied")
      setMessage("Copied")
    } catch {
      if (legacyCopied) {
        setStatus("copied")
        setMessage("Copied")
        return
      }
      selectVisibleAddress()
      setStatus("error")
      setMessage("Clipboard isn’t available. Select the address below and copy it manually.")
    }
  }

  return (
    <div className="contract-control">
      <button type="button" className="btn btn-primary" onClick={copyAddress}>
        {status === "copied" ? "Copied" : "Copy Address"}
      </button>
      <p className="contract-status" role="status" aria-live="polite">
        {message}
      </p>
      <p className="copy-address">{value}</p>
    </div>
  )
}
