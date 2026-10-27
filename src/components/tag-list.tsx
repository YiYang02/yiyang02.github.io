interface TagListProps {
  tags: readonly string[];
  className?: string;
}

/** Technology tags: mono, accent, wrapping freely so long tokens never force horizontal scroll. */
export function TagList({ tags, className = "" }: TagListProps) {
  if (tags.length === 0) return null;

  return (
    <ul role="list" className={`flex flex-wrap gap-x-4 gap-y-1 font-mono text-meta text-accent ${className}`}>
      {tags.map((tag) => (
        <li key={tag} className="[overflow-wrap:anywhere]">
          {tag}
        </li>
      ))}
    </ul>
  );
}
