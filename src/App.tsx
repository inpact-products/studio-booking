import { HashRouter, Route, Routes } from "react-router-dom";
import { Header } from "./components/Header";
import { SignInPage } from "./features/auth/SignInPage";
import { MyBookingsPage } from "./features/bookings/MyBookingsPage";
import { OwnerPage } from "./features/owner/OwnerPage";
import { ClassDetailPage } from "./features/schedule/ClassDetailPage";
import { SchedulePage } from "./features/schedule/SchedulePage";
import { SignupPage } from "./features/signup/SignupPage";

export default function App() {
  return (
    <HashRouter>
      <Header />
      <main className="main">
        <Routes>
          <Route path="/" element={<SchedulePage />} />
          <Route path="/class/:id" element={<ClassDetailPage />} />
          <Route path="/bookings" element={<MyBookingsPage />} />
          <Route path="/signin" element={<SignInPage />} />
          <Route path="/signup" element={<SignupPage />} />
          <Route path="/owner" element={<OwnerPage />} />
        </Routes>
      </main>
      <footer className="ftr">Built by learners on <a href="/" target="_top">INPACT</a> · Studio Booking</footer>
    </HashRouter>
  );
}
