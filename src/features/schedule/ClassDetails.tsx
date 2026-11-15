const time: string = "Tuesday 6:00 PM";
const instructor: string = "Emma Smith";
const spotsLeft: number = 4;
const price: number = 18;

export function ClassDetails() {
  return (
    <div>
      <p>{time} · with {instructor}</p>
      <p>{spotsLeft} spots left · ${price}</p>
    </div>
  );
}
