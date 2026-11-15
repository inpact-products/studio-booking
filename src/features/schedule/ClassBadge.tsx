// T0.1.1 · The rounded label that names a class on its card.
interface ClassBadgeProps {
  name: string;
  color?: string;
}

export function ClassBadge({ name, color }: ClassBadgeProps) {
  return (
    <span className="badge" style={color ? { color, background: color + "1A" } : undefined}>
      {name}
    </span>
  );
}
