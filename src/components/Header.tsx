import { NavLink, useNavigate } from "react-router-dom";
import { currentUser, store, useDb } from "../data/store";

export function Header() {
  const db = useDb();
  const me = currentUser(db);
  const nav = useNavigate();
  return (
    <header className="hdr">
      <NavLink to="/" className="brand"><span className="logo">❀</span> Lotus Flow Studio</NavLink>
      <nav>
        <NavLink to="/" end>Schedule</NavLink>
        {me && <NavLink to="/bookings">My bookings</NavLink>}
        {me?.role === "owner" && <NavLink to="/owner">Dashboard</NavLink>}
        {me ? (
          <button className="link-btn" onClick={() => { store.signOut(); nav("/"); }}>Sign out {me.name.split(" ")[0]}</button>
        ) : (
          <NavLink to="/signin">Sign in</NavLink>
        )}
      </nav>
    </header>
  );
}
