interface BookButtonProps {
  booked: boolean;
  onToggle: () => void;
}

export function BookButton({ booked, onToggle }: BookButtonProps) {
  return (
    <button type="button" onClick={onToggle}>
      {booked ? "Booked ✓ · Cancel" : "Book"}
    </button>
  );
}
