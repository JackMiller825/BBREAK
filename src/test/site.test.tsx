import { fireEvent, render, screen } from "@testing-library/react"
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
    story.unmount()
  })

  it("opens story, token, and community directly", () => {
    const story = renderAt("/story")
    expect(screen.getByRole("heading", { name: /three frames\. one beach break/i })).toBeInTheDocument()
    story.unmount()

    const token = renderAt("/token")
    expect(
      screen.getByRole("heading", { level: 1, name: /token details, clearly marked/i }),
    ).toBeInTheDocument()
    expect(screen.getByRole("button", { name: /contract: tbd/i })).toBeDisabled()
    expect(screen.getByText("Contract not published")).toBeInTheDocument()
    expect(screen.queryByRole("button", { name: /copy contract/i })).not.toBeInTheDocument()
    token.unmount()

    renderAt("/community")
    expect(
      screen.getByRole("heading", { level: 1, name: /meet us by the palm shadow/i }),
    ).toBeInTheDocument()
    expect(screen.getAllByRole("img", { name: /sticker image is not available/i })).toHaveLength(12)
  })

  it("keeps unpublished social destinations disabled", () => {
    renderAt("/")
    const pending = screen.getAllByRole("button", { name: /telegram link tbd/i })
    expect(pending.length).toBeGreaterThan(0)
    pending.forEach((button) => expect(button).toBeDisabled())
    expect(screen.queryByRole("link", { name: /telegram link tbd/i })).not.toBeInTheDocument()
    expect(screen.getByRole("link", { name: /explore the story/i })).toHaveAttribute("href", "/story")
  })

  it("navigates from home to the story", () => {
    renderAt("/")
    fireEvent.click(screen.getByRole("link", { name: /explore the story/i }))
    expect(screen.getByRole("heading", { level: 1, name: /the badge took a day off/i })).toBeInTheDocument()
  })

  it("expands and collapses FAQ answers from the keyboard control", () => {
    renderAt("/community")
    const question = screen.getByRole("button", { name: /what is the contract address/i })
    expect(question).toHaveAttribute("aria-expanded", "false")
    fireEvent.click(question)
    expect(question).toHaveAttribute("aria-expanded", "true")
    expect(
      screen.getByText(/a contract address will only be added when confirmed/i),
    ).toBeVisible()
    fireEvent.click(question)
    expect(question).toHaveAttribute("aria-expanded", "false")
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
    fireEvent.click(screen.getByRole("button", { name: /copy contract/i }))
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
    fireEvent.click(screen.getByRole("button", { name: /copy contract/i }))
    expect(await screen.findByText(/select the address below/i)).toBeInTheDocument()
    expect(screen.getByText("0xdef456")).toBeInTheDocument()
  })
})
