// A small data store kept in the browser, seeded with a week of classes.
// The real product swaps this for API calls; the components don't change.

import { useSyncExternalStore } from "react";
import type { Booking, ClassType, Session, User } from "./types";

interface Db {
  users: User[];
  classTypes: ClassType[];
  sessions: Session[];
  bookings: Booking[];
  currentEmail: string | null;
  version: number;
}

const KEY = "studio-booking-db";
const VERSION = 3;

const TYPES: ClassType[] = [
  { id: "power", name: "Power Hour", minutes: 60, color: "#0F6E64", description: "A strong, sweaty vinyasa flow that builds heat and strength." },
  { id: "slow", name: "Slow Flow", minutes: 60, color: "#7A5AF8", description: "Long holds and steady breath. Good for every level." },
  { id: "pilates", name: "Mat Pilates", minutes: 45, color: "#C4320A", description: "Core work on the mat, with small props." },
  { id: "barre", name: "Barre Burn", minutes: 50, color: "#B54708", description: "Ballet-inspired strength with light weights." },
];

const INSTRUCTORS = ["Emma Smith", "John Smith", "Jane Smith", "Ava Brown"];

function at(dayOffset: number, hour: number, minute = 0): string {
  const d = new Date();
  d.setHours(0, 0, 0, 0);
  d.setDate(d.getDate() + dayOffset);
  d.setHours(hour, minute);
  return d.toISOString();
}

function seed(): Db {
  const plan: [number, number, string, number, number][] = [
    // [hour, minute, typeId, capacity, price]
    [7, 0, "slow", 12, 15],
    [12, 15, "pilates", 10, 16],
    [18, 0, "power", 14, 18],
    [19, 30, "barre", 12, 17],
  ];
  const sessions: Session[] = [];
  for (let day = -3; day < 7; day++) {
    plan.forEach(([h, m, typeId, capacity, price], i) => {
      if ((day + i) % 5 === 4) return; // a few gaps, like a real schedule
      sessions.push({ id: `s${day + 3}-${i}`, typeId, start: at(day, h, m), instructor: INSTRUCTORS[(day + 3 + i) % INSTRUCTORS.length], capacity, price });
    });
  }
  const members = ["maya@example.com", "liam@example.com", "noah@example.com", "olivia@example.com", "sofia@example.com"];
  const bookings: Booking[] = [];
  sessions.forEach((s, i) => {
    const n = (i * 7) % (s.capacity + 1); // some full, some nearly full, some empty
    for (let k = 0; k < n; k++) bookings.push({ id: `b${i}-${k}`, sessionId: s.id, email: members[k % members.length].replace("@", `+${k}@`), status: "booked", bookedAt: at(-4, 9) });
  });
  return {
    users: [
      { email: "owner@lotusflow.studio", name: "Emma Smith", role: "owner", password: "studio123" },
      { email: "maya@example.com", name: "Maya Patel", role: "client", password: "yoga1234" },
    ],
    classTypes: TYPES,
    sessions,
    bookings,
    currentEmail: null,
    version: VERSION,
  };
}

function load(): Db {
  try {
    const raw = localStorage.getItem(KEY);
    if (raw) {
      const db = JSON.parse(raw) as Db;
      if (db.version === VERSION) return db;
    }
  } catch {
    /* fall through to a fresh seed */
  }
  return seed();
}

let db: Db = load();
const listeners = new Set<() => void>();

function commit(next: Db) {
  db = next;
  try {
    localStorage.setItem(KEY, JSON.stringify(db));
  } catch {
    /* private mode: keep working in memory */
  }
  listeners.forEach((l) => l());
}

export function useDb(): Db {
  return useSyncExternalStore(
    (l) => {
      listeners.add(l);
      return () => listeners.delete(l);
    },
    () => db,
  );
}

export const store = {
  get: () => db,
  reset() {
    commit(seed());
  },
  signUp(user: User): string | null {
    if (db.users.some((u) => u.email.toLowerCase() === user.email.toLowerCase())) return "An account with this email already exists. Sign in instead.";
    commit({ ...db, users: [...db.users, user], currentEmail: user.email });
    return null;
  },
  signIn(email: string, password: string): string | null {
    const u = db.users.find((x) => x.email.toLowerCase() === email.toLowerCase());
    if (!u || u.password !== password) return "That email and password don't match an account.";
    commit({ ...db, currentEmail: u.email });
    return null;
  },
  signOut() {
    commit({ ...db, currentEmail: null });
  },
  book(sessionId: string, email: string): string | null {
    const s = db.sessions.find((x) => x.id === sessionId);
    if (!s || s.cancelled) return "This class isn't running.";
    const taken = db.bookings.filter((b) => b.sessionId === sessionId && b.status === "booked").length;
    if (taken >= s.capacity) return "Sorry, the last spot just went.";
    if (db.bookings.some((b) => b.sessionId === sessionId && b.email === email && b.status === "booked")) return null;
    const b: Booking = { id: crypto.randomUUID(), sessionId, email, status: "booked", bookedAt: new Date().toISOString() };
    commit({ ...db, bookings: [...db.bookings, b] });
    return null;
  },
  cancel(sessionId: string, email: string, creditReturned: boolean) {
    commit({
      ...db,
      bookings: db.bookings.map((b) =>
        b.sessionId === sessionId && b.email === email && b.status === "booked" ? { ...b, status: "cancelled", cancelledAt: new Date().toISOString(), creditReturned } : b,
      ),
    });
  },
  addSession(s: Omit<Session, "id">) {
    commit({ ...db, sessions: [...db.sessions, { ...s, id: crypto.randomUUID() }] });
  },
  cancelSession(id: string) {
    commit({ ...db, sessions: db.sessions.map((s) => (s.id === id ? { ...s, cancelled: true } : s)) });
  },
};

// Helpers the screens share.
export function spotsLeft(d: Db, s: Session): number {
  return s.capacity - d.bookings.filter((b) => b.sessionId === s.id && b.status === "booked").length;
}

export function currentUser(d: Db): User | null {
  return d.users.find((u) => u.email === d.currentEmail) ?? null;
}

export function typeOf(d: Db, s: Session): ClassType {
  return d.classTypes.find((t) => t.id === s.typeId) ?? d.classTypes[0];
}
