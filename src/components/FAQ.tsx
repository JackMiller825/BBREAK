import { useId, useState } from "react"

export interface FaqItem {
  question: string
  answer: string
}

export function FAQ({ items, heading }: { items: FaqItem[]; heading: string }) {
  const baseId = useId()
  const [openIndex, setOpenIndex] = useState(0)

  return (
    <section className="section" aria-labelledby="faq-heading">
      <p className="eyebrow">COMMUNITY / FAQ</p>
      <h2 id="faq-heading">{heading}</h2>
      <div className="faq-list">
        {items.map((item, index) => {
          const open = openIndex === index
          const buttonId = `${baseId}-button-${index}`
          const panelId = `${baseId}-panel-${index}`
          return (
            <article className={`faq-item${open ? " is-open" : ""}`} key={item.question}>
              <h3>
                <button
                  id={buttonId}
                  type="button"
                  className="faq-button"
                  aria-expanded={open}
                  aria-controls={panelId}
                  onClick={() => setOpenIndex(open ? -1 : index)}
                >
                  <span>{item.question}</span>
                  <span className="faq-mark" aria-hidden="true">
                    {open ? "–" : "+"}
                  </span>
                </button>
              </h3>
              <div id={panelId} role="region" aria-labelledby={buttonId} hidden={!open}>
                <p>{item.answer}</p>
              </div>
            </article>
          )
        })}
      </div>
    </section>
  )
}
