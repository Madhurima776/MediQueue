import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../../styles/doctor.css";

function Dashboard() {
  const navigate = useNavigate();

  const [search, setSearch] = useState("");
  const [selectedPatient, setSelectedPatient] = useState(null);

  const appointments = [
    {
      id: 1,
      patient: "Rahul Kumar",
      age: 28,
      gender: "Male",
      time: "10:00 AM",
      type: "General Consultation",
      status: "Completed",
      symptoms: "Fever and headache",
      phone: "9876543210"
    },
    {
      id: 2,
      patient: "Priya Sharma",
      age: 35,
      gender: "Female",
      time: "10:30 AM",
      type: "Follow-up",
      status: "Waiting",
      symptoms: "Diabetes follow-up",
      phone: "9876501234"
    },
    {
      id: 3,
      patient: "Arjun Reddy",
      age: 42,
      gender: "Male",
      time: "11:00 AM",
      type: "General Consultation",
      status: "Waiting",
      symptoms: "High blood pressure",
      phone: "9123456780"
    },
    {
      id: 4,
      patient: "Sneha Rao",
      age: 24,
      gender: "Female",
      time: "11:30 AM",
      type: "Check-up",
      status: "Upcoming",
      symptoms: "Regular health check-up",
      phone: "9988776655"
    }
  ];

  const filteredAppointments = appointments.filter((appointment) =>
    appointment.patient.toLowerCase().includes(search.toLowerCase())
  );

  const startConsultation = (appointment) => {
    navigate("/doctor/consultation", {
      state: {
        appointment: appointment
      }
    });
  };

  return (
    <div className="doctor-page">

      {/* HEADER */}

      <div className="doctor-header">

        <div>
          <p className="eyebrow">
            MEDIQUEUE • DOCTOR PORTAL
          </p>

          <h1>
            Good Morning, Doctor 👋
          </h1>

          <p className="header-subtitle">
            Here's what's happening with your patients today.
          </p>
        </div>

        <div className="doctor-header-right">

          <div className="today-card">
            <span className="today-icon">📅</span>

            <div>
              <small>Today</small>
              <strong>17 September 2026</strong>
            </div>
          </div>

          <div className="doctor-profile-circle">
            DR
          </div>

        </div>

      </div>


      {/* STATISTICS */}

      <div className="doctor-stats">

        <div className="doctor-stat-card blue-card">

          <div className="doctor-stat-icon">
            📅
          </div>

          <div>
            <p>Appointments</p>
            <h2>12</h2>
            <span>Today's schedule</span>
          </div>

        </div>


        <div className="doctor-stat-card green-card">

          <div className="doctor-stat-icon">
            👥
          </div>

          <div>
            <p>Patients</p>
            <h2>10</h2>
            <span>Today's patients</span>
          </div>

        </div>


        <div className="doctor-stat-card purple-card">

          <div className="doctor-stat-icon">
            ✓
          </div>

          <div>
            <p>Completed</p>
            <h2>7</h2>
            <span>Consultations done</span>
          </div>

        </div>


        <div className="doctor-stat-card orange-card">

          <div className="doctor-stat-icon">
            ⏱
          </div>

          <div>
            <p>Waiting</p>
            <h2>3</h2>
            <span>Patients waiting</span>
          </div>

        </div>

      </div>


      {/* MAIN CONTENT */}

      <div className="dashboard-layout">


        {/* APPOINTMENTS */}

        <div className="dashboard-main-card">

          <div className="section-top">

            <div>
              <h2>Today's Appointments</h2>

              <p>
                Your scheduled patient consultations
              </p>
            </div>

            <Link
              to="/doctor/appointments"
              className="view-all-link"
            >
              View All →
            </Link>

          </div>


          {/* SEARCH */}

          <div className="doctor-search">

            <span>🔍</span>

            <input
              type="text"
              placeholder="Search patient by name..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />

          </div>


          {/* APPOINTMENT LIST */}

          <div className="dashboard-appointments">

            {filteredAppointments.map((appointment) => (

              <div
                className="dashboard-appointment"
                key={appointment.id}
              >

                <div className="dashboard-patient">

                  <div className="patient-circle">
                    {appointment.patient.charAt(0)}
                  </div>

                  <div>
                    <h3>{appointment.patient}</h3>

                    <p>
                      {appointment.age} years • {appointment.gender}
                    </p>
                  </div>

                </div>


                <div className="appointment-time">

                  <strong>
                    {appointment.time}
                  </strong>

                  <span>
                    {appointment.type}
                  </span>

                </div>


                <span
                  className={`appointment-status ${appointment.status.toLowerCase()}`}
                >
                  {appointment.status}
                </span>


                <div className="dashboard-actions">

                  <button
                    className="outline-btn"
                    onClick={() =>
                      setSelectedPatient(appointment)
                    }
                  >
                    View
                  </button>

                  {appointment.status !== "Completed" && (

                    <button
                      className="primary-small-btn"
                      onClick={() =>
                        startConsultation(appointment)
                      }
                    >
                      Start
                    </button>

                  )}

                </div>

              </div>

            ))}


            {filteredAppointments.length === 0 && (

              <div className="no-results">

                <div>🔍</div>

                <h3>No patient found</h3>

                <p>
                  Try searching for another patient.
                </p>

              </div>

            )}

          </div>

        </div>


        {/* RIGHT COLUMN */}

        <div className="dashboard-side">


          {/* NEXT PATIENT */}

          <div className="next-patient-card">

            <div className="next-patient-heading">

              <div>
                <span>NEXT PATIENT</span>

                <h2>
                  Priya Sharma
                </h2>
              </div>

              <div className="online-indicator"></div>

            </div>


            <div className="next-patient-info">

              <div className="large-patient-circle">
                P
              </div>

              <div>

                <p>
                  35 years • Female
                </p>

                <strong>
                  🕐 10:30 AM
                </strong>

              </div>

            </div>


            <div className="consultation-type">
              🩺 Follow-up Consultation
            </div>


            <button
              className="start-consultation-btn"
              onClick={() =>
                startConsultation(appointments[1])
              }
            >
              Start Consultation
              <span>→</span>
            </button>

          </div>


          {/* QUICK ACTIONS */}

          <div className="quick-actions-card">

            <div className="quick-heading">

              <h2>
                Quick Actions
              </h2>

              <span>⚡</span>

            </div>


            <Link
              to="/doctor/appointments"
              className="quick-action"
            >

              <div className="quick-action-icon blue">
                📅
              </div>

              <div>
                <strong>Appointments</strong>
                <small>Manage your schedule</small>
              </div>

              <span>→</span>

            </Link>


            <Link
              to="/doctor/patients"
              className="quick-action"
            >

              <div className="quick-action-icon green">
                👥
              </div>

              <div>
                <strong>My Patients</strong>
                <small>View patient records</small>
              </div>

              <span>→</span>

            </Link>


            <Link
              to="/doctor/consultation"
              className="quick-action"
            >

              <div className="quick-action-icon purple">
                🩺
              </div>

              <div>
                <strong>Consultation</strong>
                <small>Record consultation</small>
              </div>

              <span>→</span>

            </Link>

          </div>


          {/* PROGRESS */}

          <div className="progress-card">

            <div className="progress-top">

              <div>
                <span>DAILY PROGRESS</span>

                <h2>
                  7 of 12 completed
                </h2>
              </div>

              <strong>
                58%
              </strong>

            </div>


            <div className="progress-background">

              <div className="progress-fill"></div>

            </div>


            <p>
              Keep going! 5 appointments remaining today.
            </p>

          </div>

        </div>

      </div>


      {/* PATIENT POPUP */}

      {selectedPatient && (

        <div
          className="modal-background"
          onClick={() => setSelectedPatient(null)}
        >

          <div
            className="patient-popup"
            onClick={(e) => e.stopPropagation()}
          >

            <button
              className="popup-close"
              onClick={() => setSelectedPatient(null)}
            >
              ×
            </button>


            <div className="popup-profile">

              <div className="popup-avatar">
                {selectedPatient.patient.charAt(0)}
              </div>

              <div>

                <h2>
                  {selectedPatient.patient}
                </h2>

                <p>
                  Patient ID: MQ-00{selectedPatient.id}
                </p>

              </div>

            </div>


            <div className="popup-grid">

              <div>
                <span>Age</span>
                <strong>
                  {selectedPatient.age} years
                </strong>
              </div>

              <div>
                <span>Gender</span>
                <strong>
                  {selectedPatient.gender}
                </strong>
              </div>

              <div>
                <span>Appointment</span>
                <strong>
                  {selectedPatient.time}
                </strong>
              </div>

              <div>
                <span>Phone</span>
                <strong>
                  {selectedPatient.phone}
                </strong>
              </div>

            </div>


            <div className="complaint-card">

              <span>
                CURRENT COMPLAINT
              </span>

              <p>
                {selectedPatient.symptoms}
              </p>

            </div>


            <div className="popup-buttons">

              <button
                className="popup-cancel"
                onClick={() => setSelectedPatient(null)}
              >
                Close
              </button>


              {selectedPatient.status !== "Completed" && (

                <button
                  className="popup-start"
                  onClick={() =>
                    startConsultation(selectedPatient)
                  }
                >
                  🩺 Start Consultation
                </button>

              )}

            </div>

          </div>

        </div>

      )}

    </div>
  );
}

export default Dashboard;