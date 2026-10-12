export function InfoCard({
  title,
  body,
  accent = "coral",
}: {
  title: string
  body: string
  accent?: "coral" | "violet" | "turquoise" | "navy"
}) {
  return (
    <article className={`info-card accent-${accent}`}>
      <h3>{title}</h3>
      <p>{body}</p>
    </article>
  )
}
