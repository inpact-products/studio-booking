// T7.3.1 · Explains what cancelling means before it happens.
import { useEffect, useRef } from "react";
import { cancelOutcome, CUTOFF_HOURS, fmtWhen } from "../../data/policy";
import { typeOf, useDb } from "../../data/store";
import type { Session } from "../../data/types";

interface CancelDialogProps {
  session: Session;
  onClose: () => void;
  onConfirm: (creditReturned: boolean) => void;
}

export function CancelDialog({ session, onClose, onConfirm }: CancelDialogProps) {
  const db = useDb();
  const ref = useRef<HTMLDialogElement>(null);
  const { returned } = cancelOutcome(session.start);
  useEffect(() => {
    ref.current?.showModal();
  }, []);
  return (
    <dialog ref={ref} className="dialog" onClose={onClose} aria-labelledby="cancel-h">
      <h2 id="cancel-h">Cancel {typeOf(db, session).name}?</h2>
      <p className="muted">{fmtWhen(session.start)}</p>
      <p className={returned ? "note note-ok" : "note note-warn"}>
        {returned
          ? "You're cancelling in good time, so your class credit comes back to you."
          : `This class starts in less than ${CUTOFF_HOURS} hours, so the studio keeps the credit.`}
      </p>
      <div className="row">
        <button className="btn btn-danger" onClick={() => onConfirm(returned)}>Cancel my booking</button>
        <button className="btn btn-outline" onClick={() => ref.current?.close()}>Keep it</button>
      </div>
    </dialog>
  );
}
