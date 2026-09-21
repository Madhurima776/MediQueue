import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../../styles/doctor.css";

function Patients() {

  const navigate = useNavigate();

  const [search, setSearch] = useState("");
  const [genderFilter, setGenderFilter] = useState("All");
  const [selectedPatient, setSelectedPatient] = useState(null);

  const patients = [
    {
      id: 1,
      name: "Rahul Kumar",
      age: 28,
      gender: "Male",
      phone: "9876543210",
      condition: "Fever",
      lastVisit: "15 Sep 2026",
      symptoms: "Fever and headache"
    },
    {
      id: 2,
      name: "Priya Sharma",
      age: 35,
      gender: "Female",
      phone: "9876501234",
      condition: "Diabetes",
      lastVisit: "12 Sep 2026",
      symptoms: "Diabetes follow-up"
    },
    {
      id: 3,
      name: "Arjun Reddy",
      age: 42,
      gender: "Male",
      phone: "9123456780",
      condition: "Hypertension",
      lastVisit: "10 Sep 2026",
      symptoms: "High blood pressure"
    },
    {
      id: 4,
      name: "Sneha Rao",
      age: 24,
      gender: "Female",
      phone: "9988776655",
      condition: "Migraine",
      lastVisit: "08 Sep 2026",
      symptoms: "Frequent headaches"
    }
  ];


  const filteredPatients = patients.filter((patient) => {

    const matchesSearch =
      patient.name
        .toLowerCase()
        .includes(search.toLowerCase());

    const matchesGender =
      genderFilter === "All" ||
      patient.gender === genderFilter;

    return matchesSearch && matchesGender;

  });


  const startConsultation = (patient) => {

    navigate("/doctor/consultation", {
      state: {
        appointment: {
          patient: patient.name,
          age: patient.age,
          gender: patient.gender,
          symptoms: patient.symptoms,
          phone: patient.phone
        }
      }
    });

  };


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
            <small>Male</small>
            <strong>2</strong>
          </div>

        </div>


        <div className="mini-patient-stat">

          <span>♀</span>

          <div>
            <small>Female</small>
            <strong>2</strong>
          </div>

        </div>

      </div>


      {/* PATIENT CARD */}

      <div className="patients-page-card">


        {/* TOOLBAR */}

        <div className="patients-toolbar">

          <div className="large-search">

            <span>🔍</span>

            <input
              type="text"
              placeholder="Search patients by name..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />

          </div>


          <div className="filter-buttons">

            {["All", "Male", "Female"].map((gender) => (

              <button
                key={gender}
                className={
                  genderFilter === gender
                    ? "filter-btn active"
                    : "filter-btn"
                }
                onClick={() => setGenderFilter(gender)}
              >
                {gender}
              </button>

            ))}

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
                  {patient.name.charAt(0)}
                </div>

                <span className="patient-active">
                  Active
                </span>

              </div>


              <h2>
                {patient.name}
              </h2>

              <p className="patient-id">
                Patient ID: MQ-00{patient.id}
              </p>


              <div className="patient-basic-info">

                <div>
                  <span>AGE</span>
                  <strong>
                    {patient.age}
                  </strong>
                </div>

                <div>
                  <span>GENDER</span>
                  <strong>
                    {patient.gender}
                  </strong>
                </div>

                <div>
                  <span>CONDITION</span>
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

              <div>🔍</div>

              <h2>
                No patients found
              </h2>

              <p>
                Try another search.
              </p>

            </div>

          )}

        </div>

      </div>


      {/* PATIENT PROFILE MODAL */}

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
                {selectedPatient.name.charAt(0)}
              </div>

              <div>

                <h2>
                  {selectedPatient.name}
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
                <span>Phone</span>
                <strong>
                  {selectedPatient.phone}
                </strong>
              </div>

              <div>
                <span>Condition</span>
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
                onClick={() => setSelectedPatient(null)}
              >
                Close
              </button>

              <button
                className="popup-start"
                onClick={() =>
                  startConsultation(selectedPatient)
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