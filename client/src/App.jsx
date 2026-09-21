import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import Dashboard from "./pages/doctor/Dashboard";
import Appointments from "./pages/doctor/Appointments";
import Patients from "./pages/doctor/Patients";
import Consultation from "./pages/doctor/Consultation";

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

    </BrowserRouter>
  );
}

export default App;