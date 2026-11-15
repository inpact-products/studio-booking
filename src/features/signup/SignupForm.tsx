// T1.1.1 · Signup form with labelled inputs and a show/hide password button.
import { useState, type FormEvent } from "react";

export interface SignupValues {
  fullName: string;
  email: string;
  password: string;
}

interface SignupFormProps {
  onSubmit: (values: SignupValues) => string | null;
  submitLabel?: string;
}

export function SignupForm({ onSubmit, submitLabel = "Create account" }: SignupFormProps) {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [show, setShow] = useState(false);
  const [error, setError] = useState("");

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (password.length < 8) return setError("Use at least 8 characters for your password.");
    setError(onSubmit({ fullName: fullName.trim(), email: email.trim(), password }) ?? "");
  }

  return (
    <form className="form" onSubmit={handleSubmit} noValidate={false}>
      <label htmlFor="fullName">Full name</label>
      <input id="fullName" value={fullName} onChange={(e) => setFullName(e.target.value)} autoComplete="name" required />
      <label htmlFor="email">Email</label>
      <input id="email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} autoComplete="email" required />
      <label htmlFor="password">Password</label>
      <div className="pw">
        <input id="password" type={show ? "text" : "password"} value={password} onChange={(e) => setPassword(e.target.value)} autoComplete="new-password" required />
        <button type="button" className="eye" onClick={() => setShow(!show)} aria-label={show ? "Hide password" : "Show password"} aria-pressed={show}>
          {show ? "🙈" : "👁"}
        </button>
      </div>
      <p className="hint">At least 8 characters.</p>
      {error && <p className="error" role="alert">{error}</p>}
      <button type="submit" className="btn btn-block">{submitLabel}</button>
    </form>
  );
}
