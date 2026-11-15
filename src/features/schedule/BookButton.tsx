// T0.1.3 + T0.1.5 · Reports a press to its card; the card decides what booking means.
interface BookButtonProps {
  booked: boolean;
  full: boolean;
  onToggle: () => void;
}

export function BookButton({ booked, full, onToggle }: BookButtonProps) {
  if (full && !booked) {
    return (
      <button type="button" className="btn btn-block" disabled>
        Class full
      </button>
    );
  }
  return (
    <button type="button" className={booked ? "btn btn-block btn-booked" : "btn btn-block btn-outline"} onClick={onToggle}>
      {booked ? "Booked ✓ · Cancel" : "Book"}
    </button>
  );
}
