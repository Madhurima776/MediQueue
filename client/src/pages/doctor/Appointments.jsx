import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../../styles/doctor.css";

import API from "../../services/api";

const getUserIdFromToken = () => {
  const token = localStorage.getItem("token");

  if (!token) return null;

  try {
    const payload = JSON.parse(atob(token.split(".")[1]));
    return payload.userId;
  } catch (error) {
    console.error("Invalid token:", error);
    return null;
  }
};

function Appointments() {
  const navigate = useNavigate();

  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("All");

  const [appointments, setAppointments] = useState([]);
  const [doctorId, setDoctorId] = useState(null);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // --------------------------------------------------
  // LOAD LOGGED-IN DOCTOR
  // --------------------------------------------------

  const loadDoctor = async () => {
    try {
      const response = await API.get("/doctors");

      const userId = getUserIdFromToken();

      const doctor = response.data.find(
        (item) =>
          item.userId?._id?.toString() === userId?.toString() ||
          item.userId?.toString() === userId?.toString()
      );

      if (!doctor) {
        throw new Error("Doctor profile not found");
      }

      setDoctorId(doctor._id);
    } catch (error) {
      console.error("Failed to load doctor:", error);

      setError(
        error.response?.data?.message ||
          error.message ||
          "Failed to load doctor profile"
      );

      setLoading(false);
    }
  };

  // --------------------------------------------------
  // LOAD DOCTOR QUEUE
  // --------------------------------------------------

  const loadAppointments = async (id) => {
    try {
      setLoading(true);
      setError("");

      const response = await API.get(`/queue/doctor/${id}`);

      setAppointments(response.data.queue || []);
    } catch (error) {
      console.error("Failed to load appointments:", error);

      setError(
        error.response?.data?.message ||
          "Failed to load appointments"
      );
    } finally {
      setLoading(false);
    }
  };

  // --------------------------------------------------
  // INITIAL LOAD
  // --------------------------------------------------

  useEffect(() => {
    loadDoctor();
  }, []);

  useEffect(() => {
    if (doctorId) {
      loadAppointments(doctorId);
    }
  }, [doctorId]);

  // --------------------------------------------------
  // FILTER + SEARCH
  // --------------------------------------------------

  const filteredAppointments = appointments.filter(
    (appointment) => {
      const patientName =
        appointment.patient?.name ||
        appointment.patient ||
        "";

      const status = appointment.status || "";

      const matchesSearch = patientName
        .toLowerCase()
        .includes(search.toLowerCase());

      let matchesFilter = true;

      if (filter === "Waiting") {
        matchesFilter = status === "WAITING";
      }

      if (filter === "Completed") {
        matchesFilter = status === "COMPLETED";
      }

      if (filter === "Upcoming") {
        matchesFilter =
          status !== "WAITING" &&
          status !== "COMPLETED";
      }

      return matchesSearch && matchesFilter;
    }
  );

  // --------------------------------------------------
  // STATISTICS
  // --------------------------------------------------

  const totalAppointments = appointments.length;

  const waitingAppointments = appointments.filter(
    (appointment) =>
      appointment.status === "WAITING"
  ).length;

  const completedAppointments = appointments.filter(
    (appointment) =>
      appointment.status === "COMPLETED"
  ).length;

  const upcomingAppointments = appointments.filter(
    (appointment) =>
      appointment.status !== "WAITING" &&
      appointment.status !== "COMPLETED"
  ).length;

  // --------------------------------------------------
  // START CONSULTATION
  // --------------------------------------------------

  const startConsultation = (appointment) => {
    if (!appointment) return;

    navigate("/doctor/consultation", {
      state: {
        appointment: {
          ...appointment,

          // Keep the real appointment ID
          _id:
            appointment.appointment?._id ||
            appointment.appointmentId ||
            appointment._id,

          // Make patient information easier for Consultation.jsx
          patient:
            appointment.patient?.name ||
            appointment.patient ||
            "Patient",

          // M2 appointment uses "reason"
          symptoms:
            appointment.symptoms ||
            appointment.appointment?.reason ||
            ""
        }
      }
    });
  };

  // --------------------------------------------------
  // LOADING
  // --------------------------------------------------

  if (loading) {
    return (
      <div className="doctor-page">
        <div className="inner-page-header">
          <div>
            <p className="eyebrow">
              DOCTOR PORTAL • SCHEDULE
            </p>

            <h1>Appointments</h1>

            <p>
              Loading your appointments...
            </p>
          </div>
        </div>
      </div>
    );
  }

  // --------------------------------------------------
  // UI
  // --------------------------------------------------

  return (
    <div className="doctor-page">

      {/* HEADER */}

      <div className="inner-page-header">

        <div>

          <p className="eyebrow">
            DOCTOR PORTAL • SCHEDULE
          </p>

          <h1>
            Appointments
          </h1>

          <p>
            Manage your scheduled appointments and consultations.
          </p>

        </div>

        <div className="page-header-icon">
          📅
        </div>

      </div>


      {/* ERROR */}

      {error && (
        <div className="error-message">
          {error}
        </div>
      )}


      {/* SUMMARY */}

      <div className="appointment-summary">

        <div className="summary-box">

          <span className="summary-icon blue">
            📅
          </span>

          <div>
            <small>Total</small>
            <strong>
              {totalAppointments}
            </strong>
          </div>

        </div>


        <div className="summary-box">

          <span className="summary-icon orange">
            ⏱
          </span>

          <div>
            <small>Waiting</small>
            <strong>
              {waitingAppointments}
            </strong>
          </div>

        </div>


        <div className="summary-box">

          <span className="summary-icon green">
            ✓
          </span>

          <div>
            <small>Completed</small>
            <strong>
              {completedAppointments}
            </strong>
          </div>

        </div>


        <div className="summary-box">

          <span className="summary-icon purple">
            📌
          </span>

          <div>
            <small>Upcoming</small>
            <strong>
              {upcomingAppointments}
            </strong>
          </div>

        </div>

      </div>


      {/* SEARCH + FILTER */}

      <div className="appointment-controls">

        <input
          type="text"
          placeholder="Search patient..."
          value={search}
          onChange={(e) =>
            setSearch(e.target.value)
          }
        />

        <select
          value={filter}
          onChange={(e) =>
            setFilter(e.target.value)
          }
        >

          <option value="All">
            All
          </option>

          <option value="Waiting">
            Waiting
          </option>

          <option value="Upcoming">
            Upcoming
          </option>

          <option value="Completed">
            Completed
          </option>

        </select>

      </div>


      {/* APPOINTMENTS */}

      <div className="appointments-list">

        {filteredAppointments.length === 0 ? (

          <div className="no-patient-card">

            <div>
              📅
            </div>

            <div>

              <h3>
                No appointments found
              </h3>

              <p>
                There are no appointments matching your search or filter.
              </p>

            </div>

          </div>

        ) : (

          filteredAppointments.map(
            (appointment) => {

              const patientName =
                appointment.patient?.name ||
                appointment.patient ||
                "Unknown Patient";

              const appointmentData =
                appointment.appointment ||
                {};

              const appointmentTime =
                appointmentData.appointmentTime ||
                appointment.appointmentTime ||
                "Time not available";

              const reason =
                appointmentData.reason ||
                appointment.reason ||
                "General Consultation";

              const status =
                appointment.status ||
                "UNKNOWN";

              return (
                <div
                  className="appointment-card"
                  key={appointment._id}
                >

                  <div className="appointment-patient">

                    <div className="patient-avatar">
                      {patientName.charAt(0)}
                    </div>

                    <div>

                      <h3>
                        {patientName}
                      </h3>

                      <p>
                        {reason}
                      </p>

                    </div>

                  </div>


                  <div className="appointment-time">

                    <span>
                      🕐
                    </span>

                    <div>

                      <small>
                        Appointment
                      </small>

                      <strong>
                        {appointmentTime}
                      </strong>

                    </div>

                  </div>


                  <div className="appointment-status">

                    <span
                      className={`status-badge ${status.toLowerCase()}`}
                    >
                      {status}
                    </span>

                  </div>


                  <button
                    className="primary-btn"
                    onClick={() =>
                      startConsultation(
                        appointment
                      )
                    }
                  >
                    Start Consultation
                  </button>

                </div>
              );
            }
          )

        )}

      </div>

    </div>
  );
}

export default Appointments;
