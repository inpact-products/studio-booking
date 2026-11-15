// The app's main page. Your screens get shown from here.
import { ClassBadge } from "./features/schedule/ClassBadge";
import { ClassDetails } from "./features/schedule/ClassDetails";

export default function App() {
  return (
    <main>
      <ClassBadge />
      <ClassDetails />
    </main>
  );
}
