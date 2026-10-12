import { useEffect, useState } from "react"
import { isConfigured } from "../config/site"

export function ContractControl({ address }: { address: string | null }) {
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

  if (!isConfigured(address)) {
    return (
      <div className="contract-control">
        <button type="button" className="btn btn-primary" disabled aria-disabled="true">
          CONTRACT: TBD
        </button>
        <p className="contract-status">Contract not published</p>
      </div>
    )
  }

  async function copyAddress() {
    try {
      if (!navigator.clipboard?.writeText) {
        throw new Error("Clipboard API is unavailable")
      }
      await navigator.clipboard.writeText(address as string)
      setStatus("copied")
      setMessage("Copied")
    } catch {
      setStatus("error")
      setMessage("Clipboard isn’t available. Select the address below and copy it manually.")
    }
  }

  return (
    <div className="contract-control">
      <button type="button" className="btn btn-primary" onClick={copyAddress}>
        {status === "copied" ? "Copied" : "Copy contract"}
      </button>
      <p className="contract-status" role="status" aria-live="polite">
        {message}
      </p>
      <p className="copy-address">{address}</p>
    </div>
  )
}
