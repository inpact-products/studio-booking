// T6.2.1 · Controlled filter inputs for the public schedule.
import type { ClassType } from "../../data/types";

interface FilterBarProps {
  types: ClassType[];
  typeId: string;
  onlyOpen: boolean;
  onType: (id: string) => void;
  onOnlyOpen: (v: boolean) => void;
}

export function FilterBar({ types, typeId, onlyOpen, onType, onOnlyOpen }: FilterBarProps) {
  return (
    <div className="filters" role="group" aria-label="Filter classes">
      <label>
        Class
        <select value={typeId} onChange={(e) => onType(e.target.value)}>
          <option value="">All classes</option>
          {types.map((t) => (
            <option key={t.id} value={t.id}>
              {t.name}
            </option>
          ))}
        </select>
      </label>
      <label className="check">
        <input type="checkbox" checked={onlyOpen} onChange={(e) => onOnlyOpen(e.target.checked)} /> Only classes with spots
      </label>
    </div>
  );
}
