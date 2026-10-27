import { contact } from "@/content/site";
import { ExternalLink } from "./external-link";
import { Section } from "./section";

export function SiteFooter() {
  return (
    <Section id={contact.id} label={contact.label} as="footer" className="pb-16 md:pb-20">
      <p className="text-statement text-ink">{contact.line}</p>
      <p className="mt-3 text-ink-2">{contact.text}</p>
      <ul role="list" className="mt-6 flex flex-wrap gap-x-6 gap-y-2">
        {contact.links.map((link) => (
          <li key={link.href}>
            <ExternalLink href={link.href} className="link text-ink">
              {link.label}
            </ExternalLink>
          </li>
        ))}
      </ul>

      <div className="mt-14 flex flex-wrap items-baseline justify-between gap-x-8 gap-y-3 font-mono text-[0.75rem] text-muted">
        <p>
          {contact.smallPrint}
          <ExternalLink href={contact.source.href}>{contact.source.label}</ExternalLink>
        </p>
        <p aria-hidden="true" className="spark-hint">
          {contact.hint}
        </p>
      </div>
    </Section>
  );
}
