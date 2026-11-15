interface BookButtonProps {
  name: string;
}

export function BookButton({ name }: BookButtonProps) {
  return (
    <button type="button" onClick={() => console.log("Booked " + name)}>
      Book
    </button>
  );
}
