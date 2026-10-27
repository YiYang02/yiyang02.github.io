import type { Metadata } from "next";
import { About } from "@/components/about";
import { Education } from "@/components/education";
import { ExperienceList } from "@/components/experience-list";
import { Hero } from "@/components/hero";
import { Section } from "@/components/section";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { Skills } from "@/components/skills";
import { WorkList } from "@/components/work-list";
import { about, education, experience, person, skills, work } from "@/content/site";

export const metadata: Metadata = {
  alternates: { canonical: "/" },
};

const personJsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: person.name,
  jobTitle: person.jobTitle,
  worksFor: { "@type": "Organization", name: person.worksFor },
  alumniOf: { "@type": "CollegeOrUniversity", name: person.alumniOf },
  url: person.url,
  sameAs: person.sameAs,
};

export default function Home() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd).replace(/</g, "\\u003c") }}
      />
      <SiteHeader />
      <main id="main">
        <Hero />
        <Section id={about.id} label={about.label}>
          <About />
        </Section>
        <Section id={experience.id} label={experience.label}>
          <ExperienceList />
        </Section>
        <Section id={work.id} label={work.label}>
          <WorkList />
        </Section>
        <Section id={skills.id} label={skills.label}>
          <Skills />
        </Section>
        <Section id={education.id} label={education.label}>
          <Education />
        </Section>
      </main>
      <SiteFooter />
    </>
  );
}
