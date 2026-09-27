import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import Dashboard from "./pages/doctor/Dashboard";
import Appointments from "./pages/doctor/Appointments";
import Patients from "./pages/doctor/Patients";
import Consultation from "./pages/doctor/Consultation";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar";
import Dashboard from "./pages/patient/Dashboard";
import Doctors from "./pages/patient/Doctors";
import BookAppointment from "./pages/patient/BookAppointment";
import MyAppointments from "./pages/patient/MyAppointments";
import Departments from "./pages/patient/Departments";


function App() {
  return (
    <BrowserRouter>

      <Routes>

        <Route
          path="/"
          element={
            <Navigate
              to="/doctor/dashboard"
              replace
            />
          }
        />

        <Route
          path="/doctor/dashboard"
          element={<Dashboard />}
        />

        <Route
          path="/doctor/appointments"
          element={<Appointments />}
        />

        <Route
          path="/doctor/patients"
          element={<Patients />}
        />

        <Route
          path="/doctor/consultation"
          element={<Consultation />}
        />

      </Routes>
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
            <Route
              path="/departments"
              element={<Departments />}
            />
            
            <Route
              path="/"
              element={<Dashboard />}
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

          </Routes>

        </main>

      </div>

    </BrowserRouter>
  );
}

export default App;