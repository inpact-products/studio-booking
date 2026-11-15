// T6.3.1 · Everything about one class, at its own address.
import { Link, useNavigate, useParams } from "react-router-dom";
import { fmtWhen, money } from "../../data/policy";
import { currentUser, spotsLeft, typeOf, useDb } from "../../data/store";
import { useBooking } from "../bookings/useBooking";
import { BookButton } from "./BookButton";
import { ClassBadge } from "./ClassBadge";

export function ClassDetailPage() {
  const { id } = useParams();
  const db = useDb();
  const nav = useNavigate();
  const me = currentUser(db);
  const { toggle, dialog } = useBooking();
  const s = db.sessions.find((x) => x.id === id);
  if (!s) return <p className="empty">We couldn't find that class. <Link to="/">Back to the schedule</Link></p>;
  const t = typeOf(db, s);
  const left = spotsLeft(db, s);
  const booked = !!me && db.bookings.some((b) => b.sessionId === s.id && b.email === me.email && b.status === "booked");
  return (
    <section className="detail">
      <Link to="/" className="link-quiet">← All classes</Link>
      <div className="detail-card">
        <ClassBadge name={t.name} color={t.color} />
        <h1>{t.name}</h1>
        <p className="muted">{t.description}</p>
        <dl className="facts">
          <div><dt>When</dt><dd>{fmtWhen(s.start)} · {t.minutes} min</dd></div>
          <div><dt>Instructor</dt><dd>{s.instructor}</dd></div>
          <div><dt>Spots</dt><dd>{left > 0 ? `${left} of ${s.capacity} left` : "Full"}</dd></div>
          <div><dt>Drop-in price</dt><dd>{money(s.price)}</dd></div>
        </dl>
        {s.cancelled ? <p className="tag tag-warn">The studio cancelled this class.</p> : <BookButton booked={booked} full={left <= 0} onToggle={() => (me ? toggle(s) : nav("/signin", { state: { back: `/class/${s.id}` } }))} />}
      </div>
      {dialog}
    </section>
  );
}
