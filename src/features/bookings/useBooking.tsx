// Booking and cancelling from any screen: booking is instant, cancelling asks first (T7.3.1).
import { useState } from "react";
import { currentUser, store, useDb } from "../../data/store";
import type { Session } from "../../data/types";
import { CancelDialog } from "./CancelDialog";

export function useBooking() {
  const db = useDb();
  const me = currentUser(db);
  const [cancelling, setCancelling] = useState<Session | null>(null);
  const [msg, setMsg] = useState("");

  const toggle = (s: Session) => {
    if (!me) return;
    const booked = db.bookings.some((b) => b.sessionId === s.id && b.email === me.email && b.status === "booked");
    if (booked) return setCancelling(s);
    const err = store.book(s.id, me.email);
    setMsg(err ?? "");
  };

  const dialog = (
    <>
      {msg && <p className="toast" role="status" onClick={() => setMsg("")}>{msg}</p>}
      {cancelling && me && (
        <CancelDialog
          session={cancelling}
          onClose={() => setCancelling(null)}
          onConfirm={(returned) => {
            store.cancel(cancelling.id, me.email, returned);
            setCancelling(null);
          }}
        />
      )}
    </>
  );
  return { toggle, dialog };
}
