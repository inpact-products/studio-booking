import type { ClassInfo } from "./ClassInfo";

interface ClassDetailsProps {
  info: ClassInfo;
  spotsLeft: number;
}

export function ClassDetails({ info, spotsLeft }: ClassDetailsProps) {
  return (
    <div>
      <p>{info.time} · with {info.instructor}</p>
      <p>{spotsLeft} spots left · ${info.price}</p>
    </div>
  );
}
