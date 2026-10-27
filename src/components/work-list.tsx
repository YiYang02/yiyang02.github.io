import { work } from "@/content/site";
import { BulletList } from "./bullet-list";
import { ExternalLink } from "./external-link";
import { TagList } from "./tag-list";

export function WorkList() {
  return (
    <>
      <p className="max-w-[62ch] text-pretty text-ink-2">{work.intro}</p>

      <ul role="list" className="mt-8">
        {work.items.map((item) => (
          <li key={item.title} className="border-t border-rule py-8 first:border-t-0 first:pt-0">
            <div className="flex flex-wrap items-center gap-x-3 gap-y-1">
              <h3 className="text-title text-ink">{item.title}</h3>
              <span className="rounded-full border border-rule px-2 font-mono text-[0.75rem] leading-5 text-muted">
                {item.badge}
              </span>
            </div>
            <p className="mt-2 max-w-[62ch] text-pretty text-ink-2">{item.summary}</p>
            <BulletList items={item.highlights} className="mt-3 text-ink" />
            <TagList tags={item.tags} className="mt-4" />
          </li>
        ))}
      </ul>

      <p className="border-t border-rule pt-6">
        <ExternalLink href={work.more.href} className="link text-ink">
          {work.more.label}
        </ExternalLink>
      </p>
    </>
  );
}
