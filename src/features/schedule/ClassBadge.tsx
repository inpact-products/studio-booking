interface ClassBadgeProps {
  name: string;
}

export function ClassBadge({ name }: ClassBadgeProps) {
  return (
    <span className="badge">{name}</span>
  );
}
