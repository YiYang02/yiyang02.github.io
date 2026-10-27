import { experience, ui } from "@/content/site";
import type { EarlierEntry, ExperienceEntry } from "@/content/site";
import { BulletList } from "./bullet-list";
import { TagList } from "./tag-list";

// Dates sit in a 132px column from 640px up; below that they stack above the entry.
// The heading comes first in the DOM so screen-reader heading navigation lands on the role.
const rowClass = "grid gap-x-6 sm:grid-cols-[132px_minmax(0,1fr)] sm:items-baseline";
const datesClass =
  "order-first mb-1 font-mono text-meta text-muted sm:order-none sm:col-start-1 sm:row-start-1 sm:mb-0";

// A non-breaking space keeps each separator on the line it follows; names never split.
const joiner = `\u00a0${ui.separator} `;

function Entry({ entry }: { entry: ExperienceEntry }) {
  return (
    <li className={rowClass}>
      <h3 className="text-entry sm:col-start-2 sm:row-start-1">
        <span className="font-medium text-ink">{entry.role}</span>
        <span className="text-ink-2">
          {joiner}
          <span className="whitespace-nowrap">{entry.org}</span>
        </span>
        {entry.team ? (
          <span className="text-muted">
            {joiner}
            <span className="whitespace-nowrap">{entry.team}</span>
          </span>
        ) : null}
      </h3>
      <p className={datesClass}>{entry.dates}</p>
      {entry.location ? (
        <p className="font-mono text-meta text-muted sm:col-start-2">{entry.location}</p>
      ) : null}
      {entry.context ? (
        <p className="mt-3 max-w-[68ch] text-pretty text-ink-2 sm:col-start-2">{entry.context}</p>
      ) : null}
      <BulletList items={entry.bullets} className="mt-3 text-ink sm:col-start-2" />
      <TagList tags={entry.tags} className="mt-4 sm:col-start-2" />
    </li>
  );
}

function EarlierRow({ entry }: { entry: EarlierEntry }) {
  return (
    <li className={rowClass}>
      <p className="max-w-[68ch] text-pretty sm:col-start-2 sm:row-start-1">
        <span className="font-medium text-ink">{entry.role}</span>
        <span className="text-ink-2">
          {joiner}
          <span className="whitespace-nowrap">{`${entry.org}\u00a0${ui.emDash}`}</span>
          {` ${entry.summary}`}
        </span>
      </p>
      <p className={datesClass}>{entry.dates}</p>
    </li>
  );
}

export function ExperienceList() {
  return (
    <>
      <ol role="list" className="space-y-10">
        {experience.entries.map((entry) => (
          <Entry key={`${entry.dates}-${entry.org}`} entry={entry} />
        ))}
      </ol>

      <h3 className="mt-14 font-mono text-label text-muted uppercase">{experience.earlier.heading}</h3>
      <ul role="list" className="mt-4 space-y-4">
        {experience.earlier.entries.map((entry) => (
          <EarlierRow key={`${entry.dates}-${entry.org}`} entry={entry} />
        ))}
      </ul>
    </>
  );
}
