import { BrowserRouter, Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar";
import Dashboard from "./pages/patient/Dashboard";
import Doctors from "./pages/patient/Doctors";
import BookAppointment from "./pages/patient/BookAppointment";
import MyAppointments from "./pages/patient/MyAppointments";
import Departments from "./pages/patient/Departments";

import "./styles/patient.css";

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