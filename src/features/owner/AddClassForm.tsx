// T5.2.1 · Add a one-off class to the schedule.
import { useState, type FormEvent } from "react";
import { store, useDb } from "../../data/store";

export function AddClassForm({ onDone }: { onDone: () => void }) {
  const db = useDb();
  const [typeId, setTypeId] = useState(db.classTypes[0].id);
  const [date, setDate] = useState(new Date(Date.now() + 864e5).toISOString().slice(0, 10));
  const [time, setTime] = useState("18:00");
  const [instructor, setInstructor] = useState("Emma Smith");
  const [capacity, setCapacity] = useState(12);
  const [price, setPrice] = useState(18);

  function submit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    store.addSession({ typeId, start: new Date(`${date}T${time}`).toISOString(), instructor, capacity, price });
    onDone();
  }

  return (
    <form className="form form-grid" onSubmit={submit}>
      <label>Class<select value={typeId} onChange={(e) => setTypeId(e.target.value)}>{db.classTypes.map((t) => <option key={t.id} value={t.id}>{t.name}</option>)}</select></label>
      <label>Date<input type="date" value={date} onChange={(e) => setDate(e.target.value)} required /></label>
      <label>Start time<input type="time" value={time} onChange={(e) => setTime(e.target.value)} required /></label>
      <label>Instructor<input value={instructor} onChange={(e) => setInstructor(e.target.value)} required /></label>
      <label>Spots<input type="number" min={1} max={60} value={capacity} onChange={(e) => setCapacity(+e.target.value)} required /></label>
      <label>Drop-in price ($)<input type="number" min={0} value={price} onChange={(e) => setPrice(+e.target.value)} required /></label>
      <div className="row"><button className="btn">Add class</button><button type="button" className="btn btn-outline" onClick={onDone}>Cancel</button></div>
    </form>
  );
}
