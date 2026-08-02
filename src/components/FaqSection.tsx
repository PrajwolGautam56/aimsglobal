export interface FaqItem {
  question: string;
  answer: string;
}

export function FaqSection({
  items,
  title = "Frequently Asked Questions",
  intro,
}: {
  items: FaqItem[];
  title?: string;
  intro?: string;
}) {
  return (
    <section className="py-16">
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-bold text-text-primary">{title}</h2>
        {intro && <p className="mt-3 max-w-3xl leading-relaxed text-text-muted">{intro}</p>}
        <dl className="mt-8 divide-y divide-border border-y border-border">
          {items.map((item) => (
            <div key={item.question} className="py-6">
              <dt className="text-lg font-semibold text-text-primary">{item.question}</dt>
              <dd className="mt-2 leading-relaxed text-text-muted">{item.answer}</dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}
