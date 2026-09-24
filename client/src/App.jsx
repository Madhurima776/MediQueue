import { useState } from "react";

import Dashboard from "./pages/admin/Dashboard";
import Users from "./pages/admin/Users";
import Doctors from "./pages/admin/Doctors";
import Departments from "./pages/admin/Departments";
import Reports from "./pages/admin/Reports";

function App() {
  const [activePage, setActivePage] = useState("dashboard");

  const renderPage = () => {
    switch (activePage) {
      case "dashboard":
        return <Dashboard />;

      case "users":
        return <Users />;

      case "doctors":
        return <Doctors />;

      case "departments":
        return <Departments />;

      case "reports":
        return <Reports />;

      default:
        return <Dashboard />;
    }
  };

  return (
    <div>
      <h1>MediQueue Admin Panel</h1>

      <nav>
        <button onClick={() => setActivePage("dashboard")}>
          Dashboard
        </button>

        <button onClick={() => setActivePage("users")}>
          Users
        </button>

        <button onClick={() => setActivePage("doctors")}>
          Doctors
        </button>

        <button onClick={() => setActivePage("departments")}>
          Departments
        </button>

        <button onClick={() => setActivePage("reports")}>
          Reports
        </button>
      </nav>

      <hr />

      {renderPage()}
    </div>
  );
}

export default App;