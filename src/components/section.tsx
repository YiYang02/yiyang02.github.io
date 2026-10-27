import type { ReactNode } from "react";

interface SectionProps {
  id: string;
  label: string;
  as?: "section" | "footer";
  className?: string;
  children: ReactNode;
}

/** Page section: mono label column (the section's H2) beside a content column, top rule. */
export function Section({ id, label, as: Tag = "section", className = "", children }: SectionProps) {
  const headingId = `${id}-heading`;

  return (
    <Tag
      id={id}
      aria-labelledby={headingId}
      className={`grid gap-5 border-t border-rule py-10 md:grid-cols-[200px_minmax(0,1fr)] md:gap-8 md:py-14 ${className}`}
    >
      <h2 id={headingId} className="font-mono text-label text-muted uppercase md:pt-[3px]">
        {label}
      </h2>
      <div className="min-w-0">{children}</div>
    </Tag>
  );
}
