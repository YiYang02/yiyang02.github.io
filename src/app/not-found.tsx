import Link from "next/link";
import { SiteHeader } from "@/components/site-header";
import { notFound, ui } from "@/content/site";

// Next adds <meta name="robots" content="noindex"> here; no canonical is inherited from the layout.
export default function NotFound() {
  return (
    <>
      <SiteHeader minimal />
      <main id="main" className="pt-12 pb-24 md:pt-24 md:pb-32">
        <h1 className="max-w-[15ch] text-display text-balance text-ink">{notFound.heading}</h1>
        <p className="mt-7 max-w-[62ch] text-lede text-ink-2">{notFound.text}</p>
        <p className="mt-9 text-[0.9375rem]">
          <Link href={notFound.link.href} className="link text-ink">
            {notFound.link.label}
            <span aria-hidden="true">{`\u00a0${ui.internalArrow}`}</span>
          </Link>
        </p>
      </main>
    </>
  );
}
