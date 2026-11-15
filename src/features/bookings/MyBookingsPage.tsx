// T7.2.1 · A client's bookings, with Upcoming and Past tabs.
import { useState } from "react";
import { Link, Navigate } from "react-router-dom";
import { fmtWhen } from "../../data/policy";
import { currentUser, typeOf, useDb } from "../../data/store";
import { useBooking } from "./useBooking";

export function MyBookingsPage() {
  const db = useDb();
  const me = currentUser(db);
  const [tab, setTab] = useState<"up" | "past">("up");
  const { toggle, dialog } = useBooking();
  if (!me) return <Navigate to="/signin" state={{ back: "/bookings" }} />;
  const now = Date.now();
  const mine = db.bookings
    .filter((b) => b.email === me.email)
    .map((b) => ({ b, s: db.sessions.find((s) => s.id === b.sessionId)! }))
    .filter((x) => x.s);
  const up = mine.filter((x) => x.b.status === "booked" && new Date(x.s.start).getTime() > now).sort((a, b) => a.s.start.localeCompare(b.s.start));
  const past = mine.filter((x) => !(x.b.status === "booked" && new Date(x.s.start).getTime() > now)).sort((a, b) => b.s.start.localeCompare(a.s.start));
  const list = tab === "up" ? up : past;
  return (
    <section>
      <h1>My bookings</h1>
      <div className="tabs" role="tablist">
        <button role="tab" aria-selected={tab === "up"} onClick={() => setTab("up")}>Upcoming ({up.length})</button>
        <button role="tab" aria-selected={tab === "past"} onClick={() => setTab("past")}>Past and cancelled ({past.length})</button>
      </div>
      {list.length === 0 && (
        <p className="empty">{tab === "up" ? <>No upcoming classes. <Link to="/">Book one</Link></> : "Nothing here yet."}</p>
      )}
      <ul className="list">
        {list.map(({ b, s }) => {
          const t = typeOf(db, s);
          return (
            <li key={b.id} className="list-row">
              <span className="dot" style={{ background: t.color }} />
              <div className="grow">
                <Link to={`/class/${s.id}`} className="strong">{t.name}</Link>
                <p className="muted">{fmtWhen(s.start)} · {s.instructor}</p>
              </div>
              {tab === "up" ? (
                <button className="btn btn-outline btn-sm" onClick={() => toggle(s)}>Cancel</button>
              ) : (
                <span className={"tag " + (b.status === "cancelled" ? "tag-warn" : "tag-ok")}>
                  {b.status === "cancelled" ? (b.creditReturned ? "Cancelled · credit back" : "Cancelled · late") : "Attended"}
                </span>
              )}
            </li>
          );
        })}
      </ul>
      {dialog}
    </section>
  );
}
