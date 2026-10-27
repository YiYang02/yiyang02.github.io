import { ui } from "@/content/site";

interface BulletListProps {
  items: readonly string[];
  className?: string;
}

/** Bullets with a muted mono "–" marker. role="list" keeps list semantics in Safari with list-style: none. */
export function BulletList({ items, className = "" }: BulletListProps) {
  if (items.length === 0) return null;

  return (
    <ul role="list" className={`max-w-[68ch] space-y-2 ${className}`}>
      {items.map((item) => (
        <li key={item} className="grid grid-cols-[auto_minmax(0,1fr)] gap-x-3">
          <span aria-hidden="true" className="font-mono text-muted">
            {ui.dash}
          </span>
          <span>{item}</span>
        </li>
      ))}
    </ul>
  );
}
