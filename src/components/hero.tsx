import { hero } from "@/content/site";
import { Caret } from "./caret";
import { ExternalLink } from "./external-link";
import { Headshot } from "./headshot";

export function Hero() {
  return (
    <section
      aria-labelledby="intro-heading"
      className="grid pt-12 pb-12 md:grid-cols-[minmax(0,1fr)_128px] md:gap-x-12 md:pt-24 md:pb-[4.5rem]"
    >
      <div className="mb-6 md:col-start-2 md:row-start-1 md:mb-0">
        <Headshot alt={hero.headshotAlt} />
      </div>

      <div className="min-w-0 md:col-start-1 md:row-start-1">
        <p className="font-mono text-meta tracking-[0.02em] text-balance text-accent sm:tracking-[0.04em]">
          {/* Non-breaking space keeps the separator on the first line when the kicker wraps. */}
          {hero.kicker.replace(" · ", "\u00A0· ")}
        </p>
        <h1 id="intro-heading" className="mt-5 max-w-[15ch] text-display text-balance text-ink">
          {hero.heading}
          <Caret />
        </h1>

        <div className="mt-9 flex flex-wrap items-center gap-x-7 gap-y-3 text-[0.9375rem] text-ink-2">
          <p className="inline-flex items-center gap-2.5">
            <span
              aria-hidden="true"
              className="size-2 shrink-0 rounded-full bg-accent shadow-[0_0_0_4px_var(--color-accent-wash)]"
            />
            {hero.status}
          </p>
          <p className="font-mono text-meta">{hero.location}</p>
          <ul role="list" className="flex flex-wrap gap-x-5 gap-y-2">
            {hero.links.map((link) => (
              <li key={link.href}>
                <ExternalLink href={link.href} className="link text-ink">
                  {link.label}
                </ExternalLink>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
