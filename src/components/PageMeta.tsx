import { useEffect } from "react"
import { pageUrl } from "../config/site"

function setMeta(selector: string, attribute: "name" | "property", key: string, content: string) {
  let element = document.head.querySelector<HTMLMetaElement>(selector)
  if (!element) {
    element = document.createElement("meta")
    element.setAttribute(attribute, key)
    document.head.appendChild(element)
  }
  element.setAttribute("content", content)
}

export function PageMeta({
  title,
  description,
  path,
}: {
  title: string
  description: string
  path: string
}) {
  useEffect(() => {
    document.title = title
    const url = pageUrl(path)
    setMeta('meta[name="description"]', "name", "description", description)
    setMeta('meta[property="og:title"]', "property", "og:title", title)
    setMeta('meta[property="og:description"]', "property", "og:description", description)
    setMeta('meta[property="og:url"]', "property", "og:url", url)
    setMeta('meta[name="twitter:title"]', "name", "twitter:title", title)
    setMeta('meta[name="twitter:description"]', "name", "twitter:description", description)
    const canonical = document.querySelector<HTMLLinkElement>('link[rel="canonical"]')
    if (canonical) canonical.href = url
  }, [title, description, path])

  return null
}
