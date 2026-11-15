// The shapes the whole app shares.

export type Role = "owner" | "client";

export interface User {
  email: string;
  name: string;
  role: Role;
  password: string;
}

export interface ClassType {
  id: string;
  name: string;
  minutes: number;
  color: string;
  description: string;
}

export interface Session {
  id: string;
  typeId: string;
  start: string; // ISO date-time
  instructor: string;
  capacity: number;
  price: number;
  cancelled?: boolean;
}

export interface Booking {
  id: string;
  sessionId: string;
  email: string;
  status: "booked" | "cancelled";
  bookedAt: string;
  cancelledAt?: string;
  creditReturned?: boolean;
}

// What a class card needs to show one class (T0.1.4's ClassInfo, grown up).
export interface ClassInfo {
  id: string;
  name: string;
  time: string;
  instructor: string;
  spotsLeft: number;
  price: number;
  color: string;
}
