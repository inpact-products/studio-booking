// T1.3.1 · Sign-in form with error and loading states.
import { useState, type FormEvent } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { store } from "../../data/store";

export function SignInPage() {
  const nav = useNavigate();
  const back = (useLocation().state as { back?: string } | null)?.back;
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);

  function submit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setBusy(true);
    setTimeout(() => {
      const err = store.signIn(email.trim(), password);
      setBusy(false);
      if (err) return setError(err);
      const u = store.get().users.find((x) => x.email.toLowerCase() === email.trim().toLowerCase());
      nav(back ?? (u?.role === "owner" ? "/owner" : "/"));
    }, 350);
  }

  return (
    <section className="narrow">
      <h1>Sign in</h1>
      <form className="form" onSubmit={submit}>
        <label htmlFor="si-email">Email</label>
        <input id="si-email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} autoComplete="email" required />
        <label htmlFor="si-pw">Password</label>
        <input id="si-pw" type="password" value={password} onChange={(e) => setPassword(e.target.value)} autoComplete="current-password" required />
        {error && <p className="error" role="alert">{error}</p>}
        <button className="btn btn-block" disabled={busy}>{busy ? "Signing in…" : "Sign in"}</button>
      </form>
      <p className="muted">New here? <Link to="/signup" state={{ back }}>Create an account</Link></p>
      <div className="note">
        <b>Demo accounts</b>
        <br />Client: maya@example.com · yoga1234
        <br />Owner: owner@lotusflow.studio · studio123
      </div>
    </section>
  );
}
