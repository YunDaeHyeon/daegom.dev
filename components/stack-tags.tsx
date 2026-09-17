export function StackTags({ stack }: { stack: string[] }) {
  if (stack.length === 0) return null;
  return (
    <ul className="mt-2 flex flex-wrap gap-1.5">
      {stack.map((tech) => (
        <li
          key={tech}
          className="rounded-sm bg-muted px-2 py-0.5 font-mono text-[11px] text-muted-foreground"
        >
          {tech}
        </li>
      ))}
    </ul>
  );
}
