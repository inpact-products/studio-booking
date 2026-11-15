// The app's main page. Your screens get shown from here.
import { ClassBadge } from "./features/schedule/ClassBadge";
import { ClassDetails } from "./features/schedule/ClassDetails";
import { BookButton } from "./features/schedule/BookButton";

export default function App() {
  return (
    <main>
      <ClassBadge />
      <ClassDetails />
      <BookButton />
    </main>
  );
}
