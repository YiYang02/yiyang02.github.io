import { Fragment } from "react";
import { education, ui } from "@/content/site";

const rowClass = "grid gap-x-6 sm:grid-cols-[132px_minmax(0,1fr)] sm:items-baseline";
const labelClass =
  "order-first mb-1 font-mono text-meta text-muted sm:order-none sm:col-start-1 sm:row-start-1 sm:mb-0";

export function Education() {
  return (
    <div className="space-y-8">
      {education.schools.map((school) => (
        <div key={school.name} className={rowClass}>
          <h3 className="text-entry font-medium text-ink sm:col-start-2 sm:row-start-1">{school.name}</h3>
          <p className={labelClass}>{school.year}</p>
          <p className="text-ink-2 sm:col-start-2">{school.degree}</p>
          <p className="font-mono text-meta text-muted sm:col-start-2">{school.location}</p>
        </div>
      ))}

      <div className={rowClass}>
        <h3 className={labelClass}>{education.honors.label}</h3>
        {/* Each honor stays whole; the separator stays with the honor before it. */}
        <p className="text-ink sm:col-start-2 sm:row-start-1">
          {education.honors.items.map((item, index) => (
            <Fragment key={item}>
              {index > 0 ? `\u00a0${ui.separator} ` : null}
              <span className="whitespace-nowrap">{item}</span>
            </Fragment>
          ))}
        </p>
      </div>
    </div>
  );
}
