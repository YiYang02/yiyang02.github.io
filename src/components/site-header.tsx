import Link from "next/link";
import { header } from "@/content/site";
import { ExternalLink } from "./external-link";
import { ThemeToggle } from "./theme-toggle";

const navLinkClass =
  "inline-flex min-h-6 items-center font-mono text-label text-muted uppercase transition-colors duration-150 hover:text-ink";

interface SiteHeaderProps {
  /** The 404 page shows only the wordmark, linking home. */
  minimal?: boolean;
}

export function SiteHeader({ minimal = false }: SiteHeaderProps) {
  const wordmarkClass = "text-[0.9375rem] font-semibold text-ink";

  return (
    <header
      id={minimal ? undefined : "top"}
      className="flex flex-wrap items-baseline justify-between gap-x-8 gap-y-4 border-b border-rule pt-8 pb-5 md:pt-10"
    >
      {minimal ? (
        <Link href="/" className={wordmarkClass}>
          {header.wordmark.label}
        </Link>
      ) : (
        <a href={header.wordmark.href} className={wordmarkClass}>
          {header.wordmark.label}
        </a>
      )}

      {minimal ? null : (
        <div className="flex flex-wrap items-baseline gap-x-4 gap-y-1 sm:gap-x-7">
          <nav>
            <ul className="flex flex-wrap gap-x-4 gap-y-1 sm:gap-x-7">
              {header.nav.map((item) => (
                <li key={item.href}>
                  {item.external ? (
                    <ExternalLink href={item.href} className={navLinkClass}>
                      {item.label}
                    </ExternalLink>
                  ) : (
                    <a href={item.href} className={navLinkClass}>
                      {item.label}
                    </a>
                  )}
                </li>
              ))}
            </ul>
          </nav>
          <ThemeToggle />
        </div>
      )}
    </header>
  );
}
