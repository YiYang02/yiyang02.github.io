import { skills } from "@/content/site";

export function Skills() {
  return (
    <dl className="space-y-3">
      {skills.groups.map((group) => (
        <div
          key={group.label}
          className="grid gap-x-6 gap-y-0.5 sm:grid-cols-[132px_minmax(0,1fr)] sm:items-baseline"
        >
          <dt className="font-mono text-meta text-muted">{group.label}</dt>
          <dd className="text-ink">{group.items.join(", ")}</dd>
        </div>
      ))}
    </dl>
  );
}
