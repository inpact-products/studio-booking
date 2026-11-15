// The app's main page. Your screens get shown from here.
import type { ClassInfo } from "./features/schedule/ClassInfo";
import { ClassCard } from "./features/schedule/ClassCard";

const powerHour: ClassInfo = { name: "Power Hour", time: "Tuesday 6:00 PM", instructor: "Emma Smith", spotsLeft: 4, price: 18 };
const slowFlow: ClassInfo = { name: "Slow Flow", time: "Thursday 7:30 AM", instructor: "John Smith", spotsLeft: 9, price: 15 };

export default function App() {
  return (
    <main>
      <ClassCard info={powerHour} />
      <ClassCard info={slowFlow} />
    </main>
  );
}
