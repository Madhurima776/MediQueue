import { BrowserRouter, Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar";

import PatientDashboard from "./pages/patient/Dashboard";
import Doctors from "./pages/patient/Doctors";
import BookAppointment from "./pages/patient/BookAppointment";
import MyAppointments from "./pages/patient/MyAppointments";
import Departments from "./pages/patient/Departments";

import ReceptionistDashboard from "./pages/receptionist/Dashboard";
import CheckIn from "./pages/receptionist/CheckIn";

function App() {
  return (
    <BrowserRouter>
      <div className="app">

        <Navbar />

        <main className="main">

          <header className="topbar">

            <div></div>

            <div className="user-area">

              <span className="notification">
                🔔
              </span>

              <div className="user">

                <div className="user-circle">
                  N
                </div>

                <b>User</b>

                <span>v</span>

              </div>

            </div>

          </header>

          <Routes>

            {/* M2 - Patient Module */}

            <Route
              path="/"
              element={<PatientDashboard />}
            />

            <Route
              path="/departments"
              element={<Departments />}
            />

            <Route
              path="/doctors"
              element={<Doctors />}
            />

            <Route
              path="/book"
              element={<BookAppointment />}
            />

            <Route
              path="/appointments"
              element={<MyAppointments />}
            />

            {/* M5 - Receptionist & Check-In */}

            <Route
              path="/receptionist"
              element={<ReceptionistDashboard />}
            />

            <Route
              path="/checkin"
              element={<CheckIn />}
            />

          </Routes>

        </main>

      </div>
    </BrowserRouter>
  );
}

export default App;