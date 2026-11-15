import { useState } from "react";
import type { FormEvent } from "react";

export interface SignupValues {
  fullName: string;
  email: string;
  password: string;
}

interface SignupFormProps {
  initialValues?: SignupValues;
}

export function SignupForm({ initialValues }: SignupFormProps) {
  const [fullName, setFullName] = useState(initialValues?.fullName ?? "");
  const [email, setEmail] = useState(initialValues?.email ?? "");
  const [password, setPassword] = useState(initialValues?.password ?? "");
  const [showPassword, setShowPassword] = useState(false);

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const values: SignupValues = { fullName, email, password };
    console.log(values);
  }

  return (
    <form onSubmit={handleSubmit} className="signup">
      <h2>Create your studio account</h2>
      <div><label htmlFor="fn">Full name</label>
      <input id="fn" value={fullName} onChange={(e) => setFullName(e.target.value)} /></div>
      <div><label htmlFor="em">Email</label>
      <input id="em" type="email" value={email} onChange={(e) => setEmail(e.target.value)} /></div>
      <div><label htmlFor="pw">Password</label>
      <input id="pw" type={showPassword ? "text" : "password"} value={password} onChange={(e) => setPassword(e.target.value)} /></div>
      <button type="button" aria-label={showPassword ? "Hide password" : "Show password"} onClick={() => setShowPassword(!showPassword)}>👁</button>
      <button type="submit">Create account</button>
    </form>
  );
}
