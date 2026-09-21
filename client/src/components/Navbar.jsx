import { Link } from "react-router-dom";

function Navbar() {
  return (
    <aside className="sidebar">

      <div className="logo">
        <div className="logo-icon">⚕</div>
        <h2>MediQueue</h2>
      </div>

      <div className="nav-links">

        <Link to="/" className="active">
          ▦ <span>Dashboard</span>
        </Link>

        <Link to="/doctors">
          ♙ <span>Doctors</span>
        </Link>

        <Link to="/book">
          ▣ <span>Book Appointment</span>
        </Link>

        <Link to="/appointments">
          ▤ <span>My Appointments</span>
        </Link>

        <Link to="/queue">
          ⚡ <span>Queue Status</span>
        </Link>

      </div>

      <div className="profile-link">
        ♙ <span>Profile</span>
      </div>

    </aside>
  );
}

export default Navbar;