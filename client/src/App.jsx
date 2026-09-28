import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

import Navbar from "./components/Navbar";

// Patient pages
import PatientDashboard from "./pages/patient/Dashboard";
import PatientDoctors from "./pages/patient/Doctors";
import BookAppointment from "./pages/patient/BookAppointment";
import MyAppointments from "./pages/patient/MyAppointments";
import PatientDepartments from "./pages/patient/Departments";

// Doctor pages
import DoctorDashboard from "./pages/doctor/Dashboard";
import DoctorAppointments from "./pages/doctor/Appointments";
import DoctorPatients from "./pages/doctor/Patients";
import Consultation from "./pages/doctor/Consultation";

// Admin pages
import AdminDashboard from "./pages/admin/Dashboard";
import Users from "./pages/admin/Users";
import AdminDoctors from "./pages/admin/Doctors";
import AdminDepartments from "./pages/admin/Departments";
import Reports from "./pages/admin/Reports";

function App() {
  return (
    <BrowserRouter>
      <div className="app">
        <Navbar />

        <main className="main">
          <header className="topbar">
            <div></div>

            <div className="user-area">
              <span className="notification">🔔</span>

              <div className="user">
                <div className="user-circle">N</div>
                <b>User</b>
                <span>v</span>
              </div>
            </div>
          </header>

          <Routes>
            {/* Patient routes */}
            <Route path="/" element={<PatientDashboard />} />
            <Route path="/doctors" element={<PatientDoctors />} />
            <Route path="/book" element={<BookAppointment />} />
            <Route
              path="/appointments"
              element={<MyAppointments />}
            />
            <Route
              path="/departments"
              element={<PatientDepartments />}
            />

            {/* Doctor routes */}
            <Route
              path="/doctor/dashboard"
              element={<DoctorDashboard />}
            />
            <Route
              path="/doctor/appointments"
              element={<DoctorAppointments />}
            />
            <Route
              path="/doctor/patients"
              element={<DoctorPatients />}
            />
            <Route
              path="/doctor/consultation"
              element={<Consultation />}
            />

            {/* Admin routes */}
            <Route
              path="/admin"
              element={<AdminDashboard />}
            />
            <Route
              path="/admin/users"
              element={<Users />}
            />
            <Route
              path="/admin/doctors"
              element={<AdminDoctors />}
            />
            <Route
              path="/admin/departments"
              element={<AdminDepartments />}
            />
            <Route
              path="/admin/reports"
              element={<Reports />}
            />
          </Routes>
        </main>
      </div>
    </BrowserRouter>
  );
}

export default App;