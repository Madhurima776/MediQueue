import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../../styles/doctor.css";

import API from "../../services/api";
import { DOCTOR_ID } from "../../config/doctorConfig";

function Dashboard() {
  const navigate = useNavigate();

  const [search, setSearch] = useState("");
  const [selectedPatient, setSelectedPatient] = useState(null);

  // Backend data
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // --------------------------------------------------
  // LOAD DOCTOR QUEUE FROM BACKEND
  // --------------------------------------------------

  const loadAppointments = async () => {
    try {
      setLoading(true);
      setError("");

      const response = await API.get(
        `/queue/doctor/${DOCTOR_ID}`
      );

      setAppointments(response.data.queue || []);
    } catch (error) {
      console.error(
        "Failed to load doctor queue:",
        error
      );

      setError(
        error.response?.data?.message ||
          "Failed to load doctor queue"
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadAppointments();
  }, []);

  // --------------------------------------------------
  // SEARCH
  // --------------------------------------------------

  const filteredAppointments = appointments.filter(
    (appointment) =>
      appointment.patient?.name
        ?.toLowerCase()
        .includes(search.toLowerCase())
  );

  // --------------------------------------------------
  // STATISTICS
  // --------------------------------------------------

  const totalPatients = appointments.length;

  const completedPatients = appointments.filter(
    (appointment) =>
      appointment.status === "COMPLETED"
  ).length;

  const waitingPatients = appointments.filter(
    (appointment) =>
      appointment.status === "WAITING"
  ).length;

  const progressPercentage =
    totalPatients > 0
      ? Math.round(
          (completedPatients / totalPatients) * 100
        )
      : 0;

  // --------------------------------------------------
  // NEXT PATIENT
  // --------------------------------------------------

  const nextPatient = appointments.find(
    (appointment) =>
      appointment.status === "WAITING" ||
      appointment.status === "CALLED"
  );

  // --------------------------------------------------
  // START CONSULTATION
  // --------------------------------------------------

  const startConsultation = (appointment) => {
    if (!appointment) return;

    navigate("/doctor/consultation", {
      state: {
        appointment: appointment
      }
    });
  };

  // --------------------------------------------------
  // UI
  // --------------------------------------------------

  return (
    <div className="doctor-page">

      {/* ==================================================
          HEADER
      ================================================== */}

      <div className="doctor-header">

        <div>

          <p className="eyebrow">
            MEDIQUEUE • DOCTOR PORTAL
          </p>

          <h1>
            Good Morning, Doctor 👋
          </h1>

          <p className="header-subtitle">
            Here's what's happening with your patients
            today.
          </p>

        </div>

        <div className="doctor-header-right">

          <div className="today-card">

            <span className="today-icon">
              📅
            </span>

            <div>
              <small>Today</small>

              <strong>
                {new Date().toLocaleDateString(
                  "en-IN",
                  {
                    day: "numeric",
                    month: "long",
                    year: "numeric"
                  }
                )}
              </strong>
            </div>

          </div>

          <div className="doctor-profile-circle">
            DR
          </div>

        </div>

      </div>


      {/* ==================================================
          STATISTICS
      ================================================== */}

      <div className="doctor-stats">

        {/* APPOINTMENTS */}

        <div className="doctor-stat-card blue-card">

          <div className="doctor-stat-icon">
            📅
          </div>

          <div>

            <p>Appointments</p>

            <h2>
              {totalPatients}
            </h2>

            <span>
              Today's schedule
            </span>

          </div>

        </div>


        {/* PATIENTS */}

        <div className="doctor-stat-card green-card">

          <div className="doctor-stat-icon">
            👥
          </div>

          <div>

            <p>Patients</p>

            <h2>
              {totalPatients}
            </h2>

            <span>
              Today's patients
            </span>

          </div>

        </div>


        {/* COMPLETED */}

        <div className="doctor-stat-card purple-card">

          <div className="doctor-stat-icon">
            ✓
          </div>

          <div>

            <p>Completed</p>

            <h2>
              {completedPatients}
            </h2>

            <span>
              Consultations done
            </span>

          </div>

        </div>


        {/* WAITING */}

        <div className="doctor-stat-card orange-card">

          <div className="doctor-stat-icon">
            ⏱
          </div>

          <div>

            <p>Waiting</p>

            <h2>
              {waitingPatients}
            </h2>

            <span>
              Patients waiting
            </span>

          </div>

        </div>

      </div>


      {/* ==================================================
          MAIN CONTENT
      ================================================== */}

      <div className="dashboard-layout">


        {/* ==================================================
            LEFT COLUMN
        ================================================== */}

        <div className="dashboard-main-card">

          <div className="section-top">

            <div>

              <h2>
                Today's Appointments
              </h2>

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

            <span>
              🔍
            </span>

            <input
              type="text"
              placeholder="Search patient by name..."
              value={search}
              onChange={(e) =>
                setSearch(e.target.value)
              }
            />

          </div>


          {/* APPOINTMENT LIST */}

          <div className="dashboard-appointments">

            {/* LOADING */}

            {loading && (
              <div className="no-results">

                <div>
                  ⏳
                </div>

                <h3>
                  Loading patients...
                </h3>

                <p>
                  Please wait while we load today's
                  queue.
                </p>

              </div>
            )}


            {/* ERROR */}

            {!loading && error && (
              <div className="no-results">

                <div>
                  ⚠️
                </div>

                <h3>
                  Unable to load queue
                </h3>

                <p>
                  {error}
                </p>

                <button
                  className="primary-small-btn"
                  onClick={loadAppointments}
                >
                  Retry
                </button>

              </div>
            )}


            {/* APPOINTMENTS */}

            {!loading &&
              !error &&
              filteredAppointments.map(
                (appointment) => (

                  <div
                    className="dashboard-appointment"
                    key={appointment._id}
                  >


                    {/* PATIENT */}

                    <div className="dashboard-patient">

                      <div className="patient-circle">

                        {appointment.patient?.name
                          ?.charAt(0)
                          ?.toUpperCase()}

                      </div>

                      <div>

                        <h3>
                          {appointment.patient?.name ||
                            "Unknown Patient"}
                        </h3>

                        <p>
                          Token #
                          {appointment.tokenNumber ||
                            "—"}
                        </p>

                      </div>

                    </div>


                    {/* TIME */}

                    <div className="appointment-time">

                      <strong>

                        {appointment.appointment
                          ?.appointmentTime ||
                          "—"}

                      </strong>

                      <span>

                        {appointment.appointment
                          ?.reason ||
                          "Consultation"}

                      </span>

                    </div>


                    {/* STATUS */}

                    <span
                      className={`appointment-status ${
                        appointment.status?.toLowerCase() ||
                        ""
                      }`}
                    >

                      {appointment.status ||
                        "WAITING"}

                    </span>


                    {/* ACTIONS */}

                    <div className="dashboard-actions">

                      <button
                        className="outline-btn"
                        onClick={() =>
                          setSelectedPatient(
                            appointment
                          )
                        }
                      >
                        View
                      </button>


                      {appointment.status !==
                        "COMPLETED" && (

                        <button
                          className="primary-small-btn"
                          onClick={() =>
                            startConsultation(
                              appointment
                            )
                          }
                        >
                          Start
                        </button>

                      )}

                    </div>

                  </div>

                )
              )}


            {/* NO RESULTS */}

            {!loading &&
              !error &&
              filteredAppointments.length === 0 && (

                <div className="no-results">

                  <div>
                    🔍
                  </div>

                  <h3>
                    No patient found
                  </h3>

                  <p>
                    {search
                      ? "Try searching for another patient."
                      : "There are no patients in the queue."}
                  </p>

                </div>

              )}

          </div>

        </div>


        {/* ==================================================
            RIGHT COLUMN
        ================================================== */}

        <div className="dashboard-side">


          {/* ==================================================
              NEXT PATIENT
          ================================================== */}

          <div className="next-patient-card">

            <div className="next-patient-heading">

              <div>

                <span>
                  NEXT PATIENT
                </span>

                <h2>

                  {nextPatient?.patient?.name ||
                    "No waiting patient"}

                </h2>

              </div>

              <div className="online-indicator"></div>

            </div>


            <div className="next-patient-info">

              <div className="large-patient-circle">

                {nextPatient?.patient?.name
                  ?.charAt(0)
                  ?.toUpperCase() || "—"}

              </div>

              <div>

                <p>

                  Token #
                  {nextPatient?.tokenNumber ||
                    "—"}

                </p>

                <strong>

                  🕐{" "}

                  {nextPatient?.appointment
                    ?.appointmentTime ||
                    "—"}

                </strong>

              </div>

            </div>


            <div className="consultation-type">

              🩺{" "}

              {nextPatient?.appointment?.reason ||
                "Consultation"}

            </div>


            <button
              className="start-consultation-btn"
              disabled={!nextPatient}
              onClick={() =>
                nextPatient &&
                startConsultation(nextPatient)
              }
            >

              Start Consultation

              <span>
                →
              </span>

            </button>

          </div>


          {/* ==================================================
              QUICK ACTIONS
          ================================================== */}

          <div className="quick-actions-card">

            <div className="quick-heading">

              <h2>
                Quick Actions
              </h2>

              <span>
                ⚡
              </span>

            </div>


            <Link
              to="/doctor/appointments"
              className="quick-action"
            >

              <div className="quick-action-icon blue">
                📅
              </div>

              <div>

                <strong>
                  Appointments
                </strong>

                <small>
                  Manage your schedule
                </small>

              </div>

              <span>
                →
              </span>

            </Link>


            <Link
              to="/doctor/patients"
              className="quick-action"
            >

              <div className="quick-action-icon green">
                👥
              </div>

              <div>

                <strong>
                  My Patients
                </strong>

                <small>
                  View patient records
                </small>

              </div>

              <span>
                →
              </span>

            </Link>


            <Link
              to="/doctor/consultation"
              className="quick-action"
            >

              <div className="quick-action-icon purple">
                🩺
              </div>

              <div>

                <strong>
                  Consultation
                </strong>

                <small>
                  Record consultation
                </small>

              </div>

              <span>
                →
              </span>

            </Link>

          </div>


          {/* ==================================================
              DAILY PROGRESS
          ================================================== */}

          <div className="progress-card">

            <div className="progress-top">

              <div>

                <span>
                  DAILY PROGRESS
                </span>

                <h2>

                  {completedPatients} of{" "}
                  {totalPatients} completed

                </h2>

              </div>

              <strong>

                {progressPercentage}%

              </strong>

            </div>


            <div className="progress-background">

              <div
                className="progress-fill"
                style={{
                  width: `${progressPercentage}%`
                }}
              ></div>

            </div>


            <p>

              {totalPatients -
                completedPatients}{" "}
              appointments remaining today.

            </p>

          </div>

        </div>

      </div>


      {/* ==================================================
          PATIENT POPUP
      ================================================== */}

      {selectedPatient && (

        <div
          className="modal-background"
          onClick={() =>
            setSelectedPatient(null)
          }
        >

          <div
            className="patient-popup"
            onClick={(e) =>
              e.stopPropagation()
            }
          >


            {/* CLOSE */}

            <button
              className="popup-close"
              onClick={() =>
                setSelectedPatient(null)
              }
            >
              ×
            </button>


            {/* PROFILE */}

            <div className="popup-profile">

              <div className="popup-avatar">

                {selectedPatient.patient?.name
                  ?.charAt(0)
                  ?.toUpperCase()}

              </div>

              <div>

                <h2>

                  {selectedPatient.patient?.name ||
                    "Unknown Patient"}

                </h2>

                <p>

                  Patient ID:{" "}

                  {selectedPatient.patient?._id ||
                    "—"}

                </p>

              </div>

            </div>


            {/* DETAILS */}

            <div className="popup-grid">

              <div>

                <span>
                  Token
                </span>

                <strong>

                  #{selectedPatient.tokenNumber ||
                    "—"}

                </strong>

              </div>


              <div>

                <span>
                  Status
                </span>

                <strong>

                  {selectedPatient.status ||
                    "—"}

                </strong>

              </div>


              <div>

                <span>
                  Appointment
                </span>

                <strong>

                  {selectedPatient.appointment
                    ?.appointmentTime ||
                    "—"}

                </strong>

              </div>


              <div>

                <span>
                  Phone
                </span>

                <strong>

                  {selectedPatient.patient?.phone ||
                    "—"}

                </strong>

              </div>

            </div>


            {/* COMPLAINT */}

            <div className="complaint-card">

              <span>
                CURRENT COMPLAINT
              </span>

              <p>

                {selectedPatient.appointment
                  ?.reason ||
                  "No complaint provided"}

              </p>

            </div>


            {/* BUTTONS */}

            <div className="popup-buttons">

              <button
                className="popup-cancel"
                onClick={() =>
                  setSelectedPatient(null)
                }
              >
                Close
              </button>


              {selectedPatient.status !==
                "COMPLETED" && (

                <button
                  className="popup-start"
                  onClick={() =>
                    startConsultation(
                      selectedPatient
                    )
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