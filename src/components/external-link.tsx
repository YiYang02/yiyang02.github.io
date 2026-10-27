import type { ReactNode } from "react";
import { ui } from "@/content/site";

interface ExternalLinkProps {
  href: string;
  children: ReactNode;
  className?: string;
}

/**
 * Opens in a new tab; the ↗ is decorative and the new-tab notice is for screen readers only.
 * U+FE0E requests the text (not emoji) presentation of the arrow on iOS.
 */
export function ExternalLink({ href, children, className = "link" }: ExternalLinkProps) {
  return (
    <a href={href} target="_blank" rel="noopener noreferrer" className={className}>
      {children}
      <span aria-hidden="true">{`\u00a0${ui.externalArrow}\ufe0e`}</span>
      <span className="sr-only">{` ${ui.newTab}`}</span>
    </a>
  );
}
