// T4.1.1 · One class type the studio offers.
import type { ClassType } from "../../data/types";

export function ClassTypeCard({ type, upcoming }: { type: ClassType; upcoming: number }) {
  return (
    <article className="ctype" style={{ borderTopColor: type.color }}>
      <h3>{type.name}</h3>
      <p className="muted">{type.description}</p>
      <p className="strong">{type.minutes} min · {upcoming} upcoming</p>
    </article>
  );
}
