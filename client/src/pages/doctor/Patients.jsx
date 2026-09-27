import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../../styles/doctor.css";

import API from "../../services/api";

function Patients() {
  const navigate = useNavigate();

  const [doctorId, setDoctorId] = useState(null);

  const [search, setSearch] = useState("");
  const [genderFilter, setGenderFilter] = useState("All");
  const [selectedPatient, setSelectedPatient] = useState(null);

  const [patients, setPatients] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // --------------------------------------------------
  // GET LOGGED-IN USER ID FROM JWT
  // --------------------------------------------------

  const getUserIdFromToken = () => {
    const token = localStorage.getItem("token");

    if (!token) {
      return null;
    }

    try {
      const payload = JSON.parse(atob(token.split(".")[1]));
      return payload.userId;
    } catch (error) {
      console.error("Invalid token:", error);
      return null;
    }
  };

  // --------------------------------------------------
  // LOAD DOCTOR PROFILE
  // --------------------------------------------------

  const loadDoctor = async () => {
    try {
      const userId = getUserIdFromToken();

      if (!userId) {
        throw new Error("Please login again.");
      }

      const response = await API.get("/doctors");

      const doctors = Array.isArray(response.data)
        ? response.data
        : [];

      const doctor = doctors.find(
        (item) =>
          item.userId?._id?.toString() === userId.toString() ||
          item.userId?.toString() === userId.toString()
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
  // LOAD PATIENTS FROM DOCTOR QUEUE
  // --------------------------------------------------

  const loadPatients = async (id) => {
    if (!id) {
      return;
    }

    try {
      setLoading(true);
      setError("");

      const response = await API.get(`/queue/doctor/${id}`);

      const queue = Array.isArray(response.data?.queue)
        ? response.data.queue
        : [];

      const patientData = queue.map((item) => {
        const patient = item.patient || {};
        const appointment = item.appointment || {};

        return {
          id: item._id,

          // Actual appointment ID
          appointmentId:
            appointment._id ||
            item.appointmentId ||
            null,

          name:
            patient.name ||
            (typeof item.patient === "string"
              ? item.patient
              : "Unknown Patient"),

          age:
            patient.age ||
            "N/A",

          gender:
            patient.gender ||
            "N/A",

          phone:
            patient.phone ||
            "N/A",

          condition:
            appointment.reason ||
            item.reason ||
            "General Consultation",

          lastVisit:
            appointment.appointmentDate
              ? new Date(
                  appointment.appointmentDate
                ).toLocaleDateString("en-IN", {
                  day: "2-digit",
                  month: "short",
                  year: "numeric"
                })
              : "N/A",

          symptoms:
            appointment.reason ||
            item.reason ||
            "No symptoms provided",

          status:
            item.status || "WAITING",

          tokenNumber:
            item.tokenNumber || null
        };
      });

      setPatients(patientData);
    } catch (error) {
      console.error("Failed to load patients:", error);

      setPatients([]);

      setError(
        error.response?.data?.message ||
          "Failed to load patients"
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

  // --------------------------------------------------
  // LOAD PATIENTS AFTER DOCTOR ID IS FOUND
  // --------------------------------------------------

  useEffect(() => {
    if (doctorId) {
      loadPatients(doctorId);
    }
  }, [doctorId]);

  // --------------------------------------------------
  // FILTER PATIENTS
  // --------------------------------------------------

  const filteredPatients = patients.filter((patient) => {
    const matchesSearch = patient.name
      .toLowerCase()
      .includes(search.toLowerCase());

    const matchesGender =
      genderFilter === "All" ||
      patient.gender === genderFilter;

    return matchesSearch && matchesGender;
  });

  // --------------------------------------------------
  // GENDER COUNTS
  // --------------------------------------------------

  const maleCount = patients.filter(
    (patient) => patient.gender === "Male"
  ).length;

  const femaleCount = patients.filter(
    (patient) => patient.gender === "Female"
  ).length;

  // --------------------------------------------------
  // START CONSULTATION
  // --------------------------------------------------

  const startConsultation = (patient) => {
    if (!patient) {
      return;
    }

    navigate("/doctor/consultation", {
      state: {
        appointment: {
          _id: patient.appointmentId,

          patient: {
            name: patient.name,
            _id:
              typeof patient.id === "string"
                ? patient.id
                : undefined,
            phone: patient.phone
          },

          age: patient.age,
          gender: patient.gender,
          symptoms: patient.symptoms,
          phone: patient.phone,

          appointmentTime:
            patient.appointmentTime || null,

          reason: patient.condition
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
              DOCTOR PORTAL • PATIENT RECORDS
            </p>

            <h1>
              My Patients
            </h1>

            <p>
              View and manage your patient information.
            </p>
          </div>

          <div className="page-header-icon">
            👥
          </div>

        </div>

        <div className="empty-page">

          <div>⏳</div>

          <h2>
            Loading patients...
          </h2>

          <p>
            Please wait while we load your patients.
          </p>

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
            DOCTOR PORTAL • PATIENT RECORDS
          </p>

          <h1>
            My Patients
          </h1>

          <p>
            View and manage your patient information.
          </p>

        </div>

        <div className="page-header-icon">
          👥
        </div>

      </div>

      {/* ERROR */}

      {error && (
        <div className="empty-page">

          <div>⚠️</div>

          <h2>
            Unable to load patients
          </h2>

          <p>
            {error}
          </p>

          <button
            className="primary-btn"
            onClick={() => {
              if (doctorId) {
                loadPatients(doctorId);
              } else {
                loadDoctor();
              }
            }}
          >
            Retry
          </button>

        </div>
      )}

      {!error && (
        <>

          {/* PATIENT SUMMARY */}

          <div className="patient-summary">

            <div className="patient-summary-main">

              <div className="summary-big-icon">
                👥
              </div>

              <div>

                <span>
                  TOTAL PATIENTS
                </span>

                <h2>
                  {patients.length}
                </h2>

                <p>
                  Active patient records
                </p>

              </div>

            </div>

            <div className="mini-patient-stat">

              <span>♂</span>

              <div>

                <small>
                  Male
                </small>

                <strong>
                  {maleCount}
                </strong>

              </div>

            </div>

            <div className="mini-patient-stat">

              <span>♀</span>

              <div>

                <small>
                  Female
                </small>

                <strong>
                  {femaleCount}
                </strong>

              </div>

            </div>

          </div>

          {/* PATIENT CARD */}

          <div className="patients-page-card">

            {/* TOOLBAR */}

            <div className="patients-toolbar">

              <div className="large-search">

                <span>
                  🔍
                </span>

                <input
                  type="text"
                  placeholder="Search patients by name..."
                  value={search}
                  onChange={(e) =>
                    setSearch(e.target.value)
                  }
                />

              </div>

              <div className="filter-buttons">

                {["All", "Male", "Female"].map(
                  (gender) => (

                    <button
                      key={gender}
                      className={
                        genderFilter === gender
                          ? "filter-btn active"
                          : "filter-btn"
                      }
                      onClick={() =>
                        setGenderFilter(gender)
                      }
                    >
                      {gender}
                    </button>

                  )
                )}

              </div>

            </div>

            {/* PATIENT GRID */}

            <div className="patients-grid">

              {filteredPatients.map((patient) => (

                <div
                  className="patient-profile-card"
                  key={patient.id}
                >

                  <div className="patient-card-header">

                    <div className="patient-card-avatar">

                      {patient.name
                        .charAt(0)
                        .toUpperCase()}

                    </div>

                    <span className="patient-active">
                      Active
                    </span>

                  </div>

                  <h2>
                    {patient.name}
                  </h2>

                  <p className="patient-id">
                    Patient ID:{" "}
                    {patient.id
                      ? `MQ-${String(patient.id)
                          .slice(-4)
                          .padStart(4, "0")}`
                      : "N/A"}
                  </p>

                  <div className="patient-basic-info">

                    <div>

                      <span>
                        AGE
                      </span>

                      <strong>
                        {patient.age}
                      </strong>

                    </div>

                    <div>

                      <span>
                        GENDER
                      </span>

                      <strong>
                        {patient.gender}
                      </strong>

                    </div>

                    <div>

                      <span>
                        CONDITION
                      </span>

                      <strong>
                        {patient.condition}
                      </strong>

                    </div>

                  </div>

                  <div className="patient-phone">
                    📞 {patient.phone}
                  </div>

                  <div className="last-visit">

                    <span>
                      Last Visit
                    </span>

                    <strong>
                      {patient.lastVisit}
                    </strong>

                  </div>

                  <div className="patient-card-actions">

                    <button
                      className="outline-btn large"
                      onClick={() =>
                        setSelectedPatient(patient)
                      }
                    >
                      View Profile
                    </button>

                    <button
                      className="primary-btn"
                      onClick={() =>
                        startConsultation(patient)
                      }
                    >
                      🩺 Consult
                    </button>

                  </div>

                </div>

              ))}

              {filteredPatients.length === 0 && (

                <div className="empty-page">

                  <div>
                    🔍
                  </div>

                  <h2>
                    No patients found
                  </h2>

                  <p>
                    {patients.length === 0
                      ? "There are no patients in your queue."
                      : "Try another search."}
                  </p>

                </div>

              )}

            </div>

          </div>

        </>
      )}

      {/* PATIENT PROFILE MODAL */}

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

            <button
              className="popup-close"
              onClick={() =>
                setSelectedPatient(null)
              }
            >
              ×
            </button>

            <div className="popup-profile">

              <div className="popup-avatar">

                {selectedPatient.name
                  .charAt(0)
                  .toUpperCase()}

              </div>

              <div>

                <h2>
                  {selectedPatient.name}
                </h2>

                <p>
                  Patient ID:{" "}
                  {selectedPatient.id
                    ? `MQ-${String(
                        selectedPatient.id
                      )
                        .slice(-4)
                        .padStart(4, "0")}`
                    : "N/A"}
                </p>

              </div>

            </div>

            <div className="popup-grid">

              <div>

                <span>
                  Age
                </span>

                <strong>
                  {selectedPatient.age}{" "}
                  {selectedPatient.age !== "N/A"
                    ? "years"
                    : ""}
                </strong>

              </div>

              <div>

                <span>
                  Gender
                </span>

                <strong>
                  {selectedPatient.gender}
                </strong>

              </div>

              <div>

                <span>
                  Phone
                </span>

                <strong>
                  {selectedPatient.phone}
                </strong>

              </div>

              <div>

                <span>
                  Condition
                </span>

                <strong>
                  {selectedPatient.condition}
                </strong>

              </div>

            </div>

            <div className="complaint-card">

              <span>
                LAST VISIT
              </span>

              <p>
                {selectedPatient.lastVisit}
              </p>

            </div>

            <div className="complaint-card">

              <span>
                RECENT SYMPTOMS
              </span>

              <p>
                {selectedPatient.symptoms}
              </p>

            </div>

            <div className="popup-buttons">

              <button
                className="popup-cancel"
                onClick={() =>
                  setSelectedPatient(null)
                }
              >
                Close
              </button>

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

            </div>

          </div>

        </div>

      )}

    </div>
  );
}

export default Patients;
