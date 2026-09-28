import { NavLink } from "react-router-dom";

function Navbar() {
  return (
    <aside className="sidebar">
      <div className="logo">
        <div className="logo-icon">⚕</div>
        <h2>MediQueue</h2>
      </div>

      <div className="nav-links">
        <NavLink to="/" end>
          ▦ <span>Dashboard</span>
        </NavLink>

        <NavLink to="/doctors">
          ♙ <span>Doctors</span>
        </NavLink>

        <NavLink to="/book">
          ▣ <span>Book Appointment</span>
        </NavLink>

        <NavLink to="/appointments">
          ▤ <span>My Appointments</span>
        </NavLink>

        <NavLink to="/queue">
          ⚡ <span>Queue Status</span>
        </NavLink>
      </div>

      <div className="profile-link">
        ♙ <span>Profile</span>
      </div>
    </aside>
  );
}

export default Navbar;
