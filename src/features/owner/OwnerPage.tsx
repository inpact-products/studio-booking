import { useState } from "react";
import { Navigate } from "react-router-dom";
import { currentUser, useDb } from "../../data/store";
import { AddClassForm } from "./AddClassForm";
import { ClassTypeCard } from "./ClassTypeCard";
import { KpiCards } from "./KpiCards";
import { WeekGrid } from "./WeekGrid";

export function OwnerPage() {
  const db = useDb();
  const me = currentUser(db);
  const [adding, setAdding] = useState(false);
  if (!me) return <Navigate to="/signin" state={{ back: "/owner" }} />;
  if (me.role !== "owner") return <p className="empty">This page is for the studio's owner.</p>;
  const now = Date.now();
  return (
    <section>
      <div className="page-head">
        <div>
          <h1>Studio dashboard</h1>
          <p className="muted">Lotus Flow Studio · signed in as {me.name}</p>
        </div>
        {!adding && <button className="btn" onClick={() => setAdding(true)}>+ Add a class</button>}
      </div>
      {adding && <div className="panel"><h2>Add a class</h2><AddClassForm onDone={() => setAdding(false)} /></div>}
      <KpiCards />
      <h2>This week</h2>
      <WeekGrid />
      <h2>Class types</h2>
      <div className="grid">
        {db.classTypes.map((t) => (
          <ClassTypeCard key={t.id} type={t} upcoming={db.sessions.filter((s) => s.typeId === t.id && !s.cancelled && new Date(s.start).getTime() > now).length} />
        ))}
      </div>
    </section>
  );
}
