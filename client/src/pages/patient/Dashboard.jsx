import { Link } from "react-router-dom";

function Dashboard() {
  return (
    <div className="page dashboard">

      <h1>Good morning! 👋</h1>

      <p className="welcome">
        Here's what's happening with your appointments and queue today.
      </p>

      {/* Summary Cards */}

      <div className="dashboard-cards">

        <div className="dashboard-card">
          <div className="card-top">
            <h3>Upcoming Appointments</h3>
            <span>📅</span>
          </div>

          <h2>2</h2>
        </div>

        <div className="dashboard-card">
          <div className="card-top">
            <h3>Today's Appointment</h3>
            <span>🕐</span>
          </div>

          <h2>1</h2>
        </div>

        <div className="dashboard-card">
          <div className="card-top">
            <h3>Queue Status</h3>
            <span>⚡</span>
          </div>

          <h2>#A24</h2>
        </div>

      </div>


      {/* Upcoming Appointment */}

      <div className="section-title">

        <h2>UPCOMING APPOINTMENT</h2>

        <Link to="/appointments">
          View all →
        </Link>

      </div>


      <div className="appointment-card">

        <div className="doctor-avatar">
          SJ
        </div>

        <div className="doctor-info">

          <h2>Dr. Sarah Johnson</h2>

          <p>Cardiology</p>

          <p>
            📅 18 Aug 2026
            &nbsp;&nbsp;
            🕐 10:30 AM
          </p>

        </div>


        <div className="appointment-right">

          <span className="status">
            Confirmed
          </span>

          <Link to="/appointments">
            View
          </Link>

        </div>

      </div>


      {/* Queue Status */}

      <div className="section-title">

        <h2>QUEUE STATUS</h2>

      </div>


      <div className="queue-card">

        <div className="queue-token">

          <p>YOUR TOKEN</p>

          <h2>A24</h2>

        </div>


        <div className="queue-token">

          <p>CURRENT TOKEN</p>

          <h2>A20</h2>

        </div>


        <div className="queue-info">

          <h3>3 patients ahead of you</h3>

          <p>
            Estimated wait: ~20 minutes
          </p>

          <div className="progress">
            <div></div>
          </div>

        </div>


        <button>
          View Queue
        </button>

      </div>


      {/* Quick Actions */}

      <h2 className="quick-title">
        QUICK ACTIONS
      </h2>


      <div className="quick-actions">

        <Link to="/doctors">

          <h3>🔍 Find Doctor</h3>

          <p>
            Browse by specialization
          </p>

        </Link>


        <Link to="/book">

          <h3>📅 Book Appointment</h3>

          <p>
            Schedule a new visit
          </p>

        </Link>


        <Link to="/appointments">

          <h3>📋 My Appointments</h3>

          <p>
            View & manage bookings
          </p>

        </Link>

      </div>

    </div>
  );
}

export default Dashboard;