// T16.1.1 · Classes held, average fill rate and booking count for the last 7 days.
import { spotsLeft, useDb } from "../../data/store";

export function KpiCards() {
  const db = useDb();
  const now = Date.now(), weekAgo = now - 7 * 864e5;
  const held = db.sessions.filter((s) => !s.cancelled && new Date(s.start).getTime() < now && new Date(s.start).getTime() > weekAgo);
  const fill = held.length ? held.reduce((n, s) => n + (s.capacity - spotsLeft(db, s)) / s.capacity, 0) / held.length : 0;
  const upcoming = db.sessions.filter((s) => !s.cancelled && new Date(s.start).getTime() > now);
  const booked = upcoming.reduce((n, s) => n + s.capacity - spotsLeft(db, s), 0);
  const cards = [
    { label: "Classes held · last 7 days", value: String(held.length) },
    { label: "Average fill rate", value: Math.round(fill * 100) + "%" },
    { label: "Upcoming bookings", value: String(booked) },
    { label: "Upcoming classes", value: String(upcoming.length) },
  ];
  return (
    <div className="kpis">
      {cards.map((c) => (
        <div key={c.label} className="kpi">
          <p className="kpi-v">{c.value}</p>
          <p className="kpi-l">{c.label}</p>
        </div>
      ))}
    </div>
  );
}
