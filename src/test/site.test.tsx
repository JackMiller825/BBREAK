import { fireEvent, render, screen, within } from "@testing-library/react"
import { MemoryRouter } from "react-router-dom"
import { describe, expect, it, vi } from "vitest"
import { AppRoutes } from "../App"
import { ContractControl } from "../components/ContractControl"

function renderAt(path: string) {
  return render(
    <MemoryRouter
      initialEntries={[path]}
      future={{ v7_startTransition: true, v7_relativeSplatPath: true }}
    >
      <AppRoutes />
    </MemoryRouter>,
  )
}

describe("routes and pending facts", () => {
  it("renders home and story headings", () => {
    const home = renderAt("/")
    expect(
      screen.getByRole("heading", { level: 1, name: /the conference is out/i }),
    ).toBeInTheDocument()
    home.unmount()

    const story = renderAt("/story")
    expect(screen.getByRole("heading", { level: 1, name: /the badge took a day off/i })).toBeInTheDocument()
    expect(screen.queryByText(/no official vitalik connection is claimed/i)).not.toBeInTheDocument()
    expect(screen.queryByText(/invented community lore/i)).not.toBeInTheDocument()
    story.unmount()
  })

  it("opens story, token, and community directly", () => {
    const story = renderAt("/story")
    expect(screen.getByRole("heading", { name: /three frames\. one beach break/i })).toBeInTheDocument()
    story.unmount()

    const token = renderAt("/token")
    expect(
      screen.getByRole("heading", { level: 1, name: /tokenomics, clearly marked/i }),
    ).toBeInTheDocument()
    expect(screen.getByRole("button", { name: /copy address/i })).toBeEnabled()
    expect(screen.getAllByText("Coming Soon..").length).toBeGreaterThan(0)
    expect(screen.getByText("1,000,000,000")).toBeInTheDocument()
    expect(screen.queryByText(/ethereum mainnet • contract coming soon/i)).not.toBeInTheDocument()
    expect(screen.queryByText(/do not use a placeholder/i)).not.toBeInTheDocument()
    expect(screen.queryByText(/the contract address is not published yet/i)).not.toBeInTheDocument()
    expect(screen.queryByRole("heading", { name: /safety note/i })).not.toBeInTheDocument()
    token.unmount()

    renderAt("/community")
    expect(
      screen.getByRole("heading", { level: 1, name: /meet us by the palm shadow/i }),
    ).toBeInTheDocument()
    expect(screen.queryByText(/was not supplied/i)).not.toBeInTheDocument()
    expect(screen.getAllByRole("img", { name: /sticker showing a/i })).toHaveLength(12)
    expect(screen.queryByRole("img", { name: /sticker image is not available/i })).not.toBeInTheDocument()
    expect(screen.queryByRole("heading", { name: /frequently asked/i })).not.toBeInTheDocument()
  })

  it("links the published social profiles", () => {
    renderAt("/")
    const footer = screen.getByRole("contentinfo")
    expect(within(footer).queryByRole("link", { name: /^home$/i })).not.toBeInTheDocument()
    expect(within(footer).queryByRole("link", { name: /^story$/i })).not.toBeInTheDocument()
    expect(within(footer).queryByRole("link", { name: /^tokenomics$/i })).not.toBeInTheDocument()
    expect(within(footer).queryByRole("link", { name: /^community$/i })).not.toBeInTheDocument()
    expect(within(footer).getByRole("link", { name: /^telegram$/i })).toHaveAttribute(
      "href",
      "https://t.me/BBREAK_ETH",
    )
    expect(within(footer).getByRole("link", { name: /^x$/i })).toHaveAttribute(
      "href",
      "https://x.com/bbreak_eth",
    )
    expect(screen.getAllByRole("link", { name: /^telegram$/i })).toHaveLength(2)
    expect(screen.getAllByRole("link", { name: /^x$/i })).toHaveLength(2)
    expect(screen.queryByText("NAME: BUTERIN BEACH BREAK")).not.toBeInTheDocument()
    expect(screen.queryByText(/contract: not published/i)).not.toBeInTheDocument()
    expect(screen.getByRole("link", { name: /explore the story/i })).toHaveAttribute("href", "/story")
  })

  it("navigates from home to the story", () => {
    renderAt("/")
    fireEvent.click(screen.getByRole("link", { name: /explore the story/i }))
    expect(screen.getByRole("heading", { level: 1, name: /the badge took a day off/i })).toBeInTheDocument()
  })

})

describe("contract copy", () => {
  it("copies a configured address and reports clipboard denial", async () => {
    const writeText = vi.fn().mockResolvedValue(undefined)
    Object.defineProperty(navigator, "clipboard", {
      configurable: true,
      value: { writeText },
    })

    const { unmount } = render(<ContractControl address="0xabc123" />)
    fireEvent.click(screen.getByRole("button", { name: /copy address/i }))
    expect(await screen.findByRole("button", { name: "Copied" })).toBeInTheDocument()
    expect(writeText).toHaveBeenCalledWith("0xabc123")
    expect(screen.getByText("0xabc123")).toHaveClass("copy-address")
    unmount()

    Object.defineProperty(navigator, "clipboard", {
      configurable: true,
      value: {
        writeText: vi.fn().mockRejectedValue(new Error("denied")),
      },
    })
    render(<ContractControl address="0xdef456" />)
    fireEvent.click(screen.getByRole("button", { name: /copy address/i }))
    expect(await screen.findByText(/select the address and copy it manually/i)).toBeInTheDocument()
    expect(screen.getByText("0xdef456")).toBeInTheDocument()
  })

  it("copies Coming Soon when no contract is published", async () => {
    const writeText = vi.fn().mockResolvedValue(undefined)
    Object.defineProperty(navigator, "clipboard", {
      configurable: true,
      value: { writeText },
    })
    render(<ContractControl address={null} />)
    fireEvent.click(screen.getByRole("button", { name: /copy address/i }))
    expect(await screen.findByRole("button", { name: "Copied" })).toBeInTheDocument()
    expect(writeText).toHaveBeenCalledWith("Coming Soon..")
  })
})
