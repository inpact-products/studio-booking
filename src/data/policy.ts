// The studio's cancellation policy (T7.3.2): cancel at least 12 hours before the class
// and the credit comes back; any later and the studio keeps it.

export const CUTOFF_HOURS = 12;

export function cancelOutcome(start: string, now = new Date()): { returned: boolean; hoursLeft: number } {
  const hoursLeft = (new Date(start).getTime() - now.getTime()) / 36e5;
  return { returned: hoursLeft >= CUTOFF_HOURS, hoursLeft };
}

export const fmtTime = (iso: string) => new Date(iso).toLocaleTimeString([], { hour: "numeric", minute: "2-digit" });
export const fmtDay = (iso: string) => new Date(iso).toLocaleDateString([], { weekday: "long", month: "short", day: "numeric" });
export const fmtWhen = (iso: string) => new Date(iso).toLocaleString([], { weekday: "long", hour: "numeric", minute: "2-digit" });
export const money = (n: number) => new Intl.NumberFormat("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 0 }).format(n);
