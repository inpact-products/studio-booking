// T5.5.1 · The owner's week, laid out by day.
import { fmtTime } from "../../data/policy";
import { spotsLeft, store, typeOf, useDb } from "../../data/store";

export function WeekGrid() {
  const db = useDb();
  const start = new Date();
  start.setHours(0, 0, 0, 0);
  const days = Array.from({ length: 7 }, (_, i) => new Date(start.getTime() + i * 864e5));
  return (
    <div className="week">
      {days.map((d) => {
        const list = db.sessions.filter((s) => new Date(s.start).toDateString() === d.toDateString()).sort((a, b) => a.start.localeCompare(b.start));
        return (
          <div key={d.toISOString()} className="week-day">
            <p className="week-h">{d.toLocaleDateString([], { weekday: "short", day: "numeric" })}</p>
            {list.length === 0 && <p className="muted small">No classes</p>}
            {list.map((s) => {
              const t = typeOf(db, s);
              const taken = s.capacity - spotsLeft(db, s);
              return (
                <div key={s.id} className={"slot" + (s.cancelled ? " slot-x" : "")} style={{ borderLeftColor: t.color }}>
                  <b>{fmtTime(s.start)}</b> {t.name}
                  <span className="small muted">{s.cancelled ? "Cancelled" : `${taken}/${s.capacity} booked · ${s.instructor}`}</span>
                  {!s.cancelled && new Date(s.start).getTime() > Date.now() && (
                    <button className="link-btn small" onClick={() => confirm(`Cancel ${t.name} at ${fmtTime(s.start)}?`) && store.cancelSession(s.id)}>Cancel class</button>
                  )}
                </div>
              );
            })}
          </div>
        );
      })}
    </div>
  );
}
