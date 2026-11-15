// T6.1.2 · The public schedule, grouped by day.
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { fmtDay, fmtTime } from "../../data/policy";
import { currentUser, spotsLeft, store, typeOf, useDb } from "../../data/store";
import type { ClassInfo, Session } from "../../data/types";
import { useBooking } from "../bookings/useBooking";
import { ClassCard } from "./ClassCard";
import { FilterBar } from "./FilterBar";

export function SchedulePage() {
  const db = useDb();
  const me = currentUser(db);
  const nav = useNavigate();
  const { toggle, dialog } = useBooking();
  const [typeId, setTypeId] = useState("");
  const [onlyOpen, setOnlyOpen] = useState(false);

  const now = Date.now();
  const upcoming = db.sessions
    .filter((s) => !s.cancelled && new Date(s.start).getTime() > now)
    .filter((s) => !typeId || s.typeId === typeId)
    .filter((s) => !onlyOpen || spotsLeft(db, s) > 0)
    .sort((a, b) => a.start.localeCompare(b.start));

  const days = new Map<string, Session[]>();
  upcoming.forEach((s) => {
    const k = new Date(s.start).toDateString();
    days.set(k, [...(days.get(k) ?? []), s]);
  });

  const info = (s: Session): ClassInfo => {
    const t = typeOf(db, s);
    return { id: s.id, name: t.name, time: fmtTime(s.start), instructor: s.instructor, spotsLeft: spotsLeft(db, s), price: s.price, color: t.color };
  };
  const isBooked = (s: Session) => !!me && db.bookings.some((b) => b.sessionId === s.id && b.email === me.email && b.status === "booked");

  return (
    <section>
      <div className="page-head">
        <div>
          <h1>Book a class</h1>
          <p className="muted">Yoga, Pilates and barre at Lotus Flow Studio. Cancel up to 12 hours before and your credit comes back.</p>
        </div>
      </div>
      <FilterBar types={db.classTypes} typeId={typeId} onlyOpen={onlyOpen} onType={setTypeId} onOnlyOpen={setOnlyOpen} />
      {days.size === 0 && <p className="empty">No classes match. Try another class type.</p>}
      {[...days.entries()].map(([k, list]) => (
        <div key={k} className="day">
          <h2 className="day-h">{fmtDay(list[0].start)}</h2>
          <div className="grid">
            {list.map((s) => (
              <ClassCard
                key={s.id}
                info={info(s)}
                booked={isBooked(s)}
                onToggle={() => (me ? toggle(s) : nav("/signin", { state: { back: "/" } }))}
              />
            ))}
          </div>
        </div>
      ))}
      {dialog}
      <p className="foot muted">
        Demo data lives in this browser. <button className="link-btn" onClick={() => store.reset()}>Reset the demo</button>
      </p>
    </section>
  );
}
