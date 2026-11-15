import type { ClassInfo } from "./ClassInfo";
import { ClassBadge } from "./ClassBadge";
import { ClassDetails } from "./ClassDetails";
import { BookButton } from "./BookButton";

interface ClassCardProps {
  info: ClassInfo;
}

export function ClassCard({ info }: ClassCardProps) {
  return (
    <article className="class-card">
      <ClassBadge name={info.name} />
      <ClassDetails info={info} />
      <BookButton name={info.name} />
    </article>
  );
}
