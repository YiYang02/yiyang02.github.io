import { about } from "@/content/site";

export function About() {
  return (
    <div className="max-w-[60ch] space-y-4 text-[1.0625rem] text-ink-2">
      {about.paragraphs.map((paragraph) => (
        <p key={paragraph} className="text-pretty">
          {paragraph}
        </p>
      ))}
    </div>
  );
}
