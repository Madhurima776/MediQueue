import React, { useEffect, useState } from "react";
import API from "../../services/api";
import { DOCTOR_ID } from "../../config/doctorConfig";
import { useNavigate } from "react-router-dom";
import "../../styles/doctor.css";

function Appointments() {

  const navigate = useNavigate();

  const [filter, setFilter] = useState("All");
  const [search, setSearch] = useState("");
  const [selectedAppointment, setSelectedAppointment] = useState(null);

  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
  fetchAppointments();
}, []);

const fetchAppointments = async () => {
  try {
    setLoading(true);

    const response = await API.get(
      `/queue/doctor/${DOCTOR_ID}`
    );

    setAppointments(response.data.queue);
  } catch (error) {
    console.error("Error fetching appointments:", error);

    setError(
      error.response?.data?.message ||
      "Failed to load appointments"
    );
  } finally {
    setLoading(false);
  }
};

  const filteredAppointments = appointments.filter((appointment) => {

    const matchesFilter =
      filter === "All" || appointment.status === filter;

    const matchesSearch =
      appointment.patient
        .toLowerCase()
        .includes(search.toLowerCase());

    return matchesFilter && matchesSearch;
  });


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


      {/* SUMMARY */}

      <div className="appointment-summary">

        <div className="summary-box">

          <span className="summary-icon blue">
            📅
          </span>

          <div>
            <small>Total</small>
            <strong>12</strong>
          </div>

        </div>


        <div className="summary-box">

          <span className="summary-icon orange">
            ⏱
          </span>

          <div>
            <small>Waiting</small>
            <strong>3</strong>
          </div>

        </div>


        <div className="summary-box">

          <span className="summary-icon green">
            ✓
          </span>

          <div>
            <small>Completed</small>
            <strong>7</strong>
          </div>

        </div>


        <div className="summary-box">

          <span className="summary-icon purple">
            🕐
          </span>

          <div>
            <small>Upcoming</small>
            <strong>2</strong>
          </div>

        </div>

      </div>


      {/* MAIN CARD */}

      <div className="appointments-page-card">


        {/* SEARCH + FILTER */}

        <div className="appointment-toolbar">

          <div className="large-search">

            <span>🔍</span>

            <input
              type="text"
              placeholder="Search patient..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />

          </div>


          <div className="filter-buttons">

            {["All", "Waiting", "Upcoming", "Completed"].map(
              (item) => (

                <button
                  key={item}
                  className={
                    filter === item
                      ? "filter-btn active"
                      : "filter-btn"
                  }
                  onClick={() => setFilter(item)}
                >
                  {item}
                </button>

              )
            )}

          </div>

        </div>


        {/* APPOINTMENTS */}

        <div className="appointment-cards">

          {filteredAppointments.map((appointment) => (

            <div
              className="appointment-full-card"
              key={appointment.id}
            >

              <div className="appointment-card-top">

                <div className="appointment-person">

                  <div className="appointment-avatar">
                    {appointment.patient.charAt(0)}
                  </div>

                  <div>

                    <h2>
                      {appointment.patient}
                    </h2>

                    <p>
                      Patient ID: MQ-00{appointment.id}
                    </p>

                  </div>

                </div>


                <span
                  className={`appointment-status ${appointment.status.toLowerCase()}`}
                >
                  {appointment.status}
                </span>

              </div>


              <div className="appointment-details">

                <div>

                  <span>AGE</span>

                  <strong>
                    {appointment.age} years
                  </strong>

                </div>


                <div>

                  <span>GENDER</span>

                  <strong>
                    {appointment.gender}
                  </strong>

                </div>


                <div>

                  <span>TIME</span>

                  <strong>
                    🕐 {appointment.time}
                  </strong>

                </div>


                <div>

                  <span>TYPE</span>

                  <strong>
                    🩺 {appointment.type}
                  </strong>

                </div>

              </div>


              <div className="appointment-card-bottom">

                <div className="symptom-preview">

                  <span>
                    PATIENT COMPLAINT
                  </span>

                  <p>
                    {appointment.symptoms}
                  </p>

                </div>


                <div className="card-action-buttons">

                  <button
                    className="outline-btn large"
                    onClick={() =>
                      setSelectedAppointment(appointment)
                    }
                  >
                    View Details
                  </button>


                  {appointment.status !== "Completed" && (

                    <button
                      className="primary-btn"
                      onClick={() =>
                        startConsultation(appointment)
                      }
                    >
                      🩺 Start Consultation
                    </button>

                  )}

                </div>

              </div>

            </div>

          ))}


          {filteredAppointments.length === 0 && (

            <div className="empty-page">

              <div>
                🔍
              </div>

              <h2>
                No appointments found
              </h2>

              <p>
                Try changing your search or filter.
              </p>

            </div>

          )}

        </div>

      </div>


      {/* DETAILS MODAL */}

      {selectedAppointment && (

        <div
          className="modal-background"
          onClick={() => setSelectedAppointment(null)}
        >

          <div
            className="appointment-modal"
            onClick={(e) => e.stopPropagation()}
          >

            <button
              className="popup-close"
              onClick={() => setSelectedAppointment(null)}
            >
              ×
            </button>


            <div className="modal-title">

              <div className="popup-avatar">
                {selectedAppointment.patient.charAt(0)}
              </div>

              <div>

                <h2>
                  {selectedAppointment.patient}
                </h2>

                <p>
                  Appointment Details
                </p>

              </div>

            </div>


            <div className="modal-details-grid">

              <div>
                <span>AGE</span>
                <strong>
                  {selectedAppointment.age} years
                </strong>
              </div>

              <div>
                <span>GENDER</span>
                <strong>
                  {selectedAppointment.gender}
                </strong>
              </div>

              <div>
                <span>TIME</span>
                <strong>
                  {selectedAppointment.time}
                </strong>
              </div>

              <div>
                <span>STATUS</span>
                <strong>
                  {selectedAppointment.status}
                </strong>
              </div>

            </div>


            <div className="modal-complaint">

              <span>
                CURRENT COMPLAINT
              </span>

              <p>
                {selectedAppointment.symptoms}
              </p>

            </div>


            <div className="popup-buttons">

              <button
                className="popup-cancel"
                onClick={() => setSelectedAppointment(null)}
              >
                Close
              </button>


              {selectedAppointment.status !== "Completed" && (

                <button
                  className="popup-start"
                  onClick={() =>
                    startConsultation(selectedAppointment)
                  }
                >
                  Start Consultation
                </button>

              )}

            </div>

          </div>

        </div>

      )}

    </div>

  );
}

export default Appointments;