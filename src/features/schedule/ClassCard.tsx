// T0.1.4 + T6.1.1 · One class, built from props, with few-spots-left and full states.
import { Link } from "react-router-dom";
import type { ClassInfo } from "../../data/types";
import { BookButton } from "./BookButton";
import { ClassBadge } from "./ClassBadge";
import { ClassDetails } from "./ClassDetails";

interface ClassCardProps {
  info: ClassInfo;
  booked: boolean;
  onToggle: () => void;
}

export function ClassCard({ info, booked, onToggle }: ClassCardProps) {
  const full = info.spotsLeft <= 0;
  const few = !full && info.spotsLeft <= 3;
  return (
    <article className={"card" + (full && !booked ? " card-full" : "")} aria-label={`${info.name}, ${info.time}`}>
      <div className="card-top">
        <ClassBadge name={info.name} color={info.color} />
        {few && <span className="tag tag-warn">Only {info.spotsLeft} left</span>}
        {booked && <span className="tag tag-ok">You're booked</span>}
      </div>
      <ClassDetails time={info.time} instructor={info.instructor} spotsLeft={info.spotsLeft} price={info.price} />
      <div className="card-actions">
        <BookButton booked={booked} full={full} onToggle={onToggle} />
        <Link className="link-quiet" to={`/class/${info.id}`}>
          Details
        </Link>
      </div>
    </article>
  );
}
