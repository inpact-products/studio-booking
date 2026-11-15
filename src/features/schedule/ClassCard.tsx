import { useState } from "react";
import type { ClassInfo } from "./ClassInfo";
import { ClassBadge } from "./ClassBadge";
import { ClassDetails } from "./ClassDetails";
import { BookButton } from "./BookButton";

interface ClassCardProps {
  info: ClassInfo;
}

export function ClassCard({ info }: ClassCardProps) {
  const [booked, setBooked] = useState(false);
  const spotsLeft = booked ? info.spotsLeft - 1 : info.spotsLeft;

  return (
    <article className="class-card">
      <ClassBadge name={info.name} />
      <ClassDetails info={info} spotsLeft={spotsLeft} />
      <BookButton booked={booked} onToggle={() => setBooked(!booked)} />
    </article>
  );
}
