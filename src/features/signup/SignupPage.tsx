import { Link, useLocation, useNavigate } from "react-router-dom";
import { store } from "../../data/store";
import { SignupForm } from "./SignupForm";

export function SignupPage() {
  const nav = useNavigate();
  const back = (useLocation().state as { back?: string } | null)?.back ?? "/";
  return (
    <section className="narrow">
      <h1>Join Lotus Flow</h1>
      <p className="muted">Create an account to book classes.</p>
      <SignupForm
        onSubmit={(v) => {
          const err = store.signUp({ email: v.email, name: v.fullName, role: "client", password: v.password });
          if (!err) nav(back);
          return err;
        }}
      />
      <p className="muted">Already have an account? <Link to="/signin" state={{ back }}>Sign in</Link></p>
    </section>
  );
}
