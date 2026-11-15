// T0.1.2 · The class's time, instructor, spots left and price.
import { money } from "../../data/policy";

interface ClassDetailsProps {
  time: string;
  instructor: string;
  spotsLeft: number;
  price: number;
}

export function ClassDetails({ time, instructor, spotsLeft, price }: ClassDetailsProps) {
  const spots = spotsLeft === 1 ? "1 spot left" : `${spotsLeft} spots left`;
  return (
    <div className="details">
      <p className="muted">
        {time} · with {instructor}
      </p>
      <p className="strong">
        {spotsLeft > 0 ? spots : "Full"} · {money(price)}
      </p>
    </div>
  );
}
