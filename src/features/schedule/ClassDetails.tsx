import type { ClassInfo } from "./ClassInfo";

interface ClassDetailsProps {
  info: ClassInfo;
}

export function ClassDetails({ info }: ClassDetailsProps) {
  return (
    <div>
      <p>{info.time} · with {info.instructor}</p>
      <p>{info.spotsLeft} spots left · ${info.price}</p>
    </div>
  );
}
