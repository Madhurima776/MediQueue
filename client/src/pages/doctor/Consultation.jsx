import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "../../styles/doctor.css";

function Consultation() {

  const navigate = useNavigate();
  const location = useLocation();

  const appointment = location.state?.appointment;


  const [symptoms, setSymptoms] = useState(
    appointment?.symptoms || ""
  );

  const [diagnosis, setDiagnosis] = useState("");

  const [tests, setTests] = useState("");

  const [notes, setNotes] = useState("");

  const [followUp, setFollowUp] = useState("");

  const [saved, setSaved] = useState(false);


  const [medicines, setMedicines] = useState([
    {
      medicine: "",
      dosage: "",
      duration: ""
    }
  ]);


  const addMedicine = () => {

    setMedicines([
      ...medicines,
      {
        medicine: "",
        dosage: "",
        duration: ""
      }
    ]);

  };


  const removeMedicine = (index) => {

    if (medicines.length === 1) {
      return;
    }

    setMedicines(
      medicines.filter((_, i) => i !== index)
    );

  };


  const updateMedicine = (index, field, value) => {

    const updatedMedicines = [...medicines];

    updatedMedicines[index][field] = value;

    setMedicines(updatedMedicines);

  };


  const handleSave = (e) => {

    e.preventDefault();

    if (!appointment) {
      alert("Please select an appointment first.");
      return;
    }

    if (!symptoms || !diagnosis) {
      alert("Please enter symptoms and diagnosis.");
      return;
    }

    setSaved(true);

    setTimeout(() => {
      navigate("/doctor/appointments");
    }, 1500);

  };


  return (

    <div className="doctor-page">

      {/* HEADER */}

      <div className="inner-page-header">

        <div>

          <p className="eyebrow">
            DOCTOR PORTAL • CONSULTATION
          </p>

          <h1>
            Patient Consultation
          </h1>

          <p>
            Record consultation details and treatment information.
          </p>

        </div>


        <button
          className="back-button"
          onClick={() =>
            navigate("/doctor/appointments")
          }
        >
          ← Back to Appointments
        </button>

      </div>


      {/* PATIENT INFORMATION */}

      {appointment ? (

        <div className="consultation-patient-card">

          <div className="consultation-patient-avatar">
            {appointment.patient.charAt(0)}
          </div>

          <div className="consultation-patient-info">

            <span>
              CURRENT PATIENT
            </span>

            <h2>
              {appointment.patient}
            </h2>

            <p>
              {appointment.age} years • {appointment.gender}
            </p>

          </div>


          <div className="consultation-patient-details">

            <div>
              <span>APPOINTMENT</span>

              <strong>
                🕐 {appointment.time || "Today"}
              </strong>
            </div>

            <div>
              <span>TYPE</span>

              <strong>
                🩺 {appointment.type || "Consultation"}
              </strong>
            </div>

          </div>

        </div>

      ) : (

        <div className="no-patient-card">

          <div>
            ⚠️
          </div>

          <div>

            <h3>
              No patient selected
            </h3>

            <p>
              Please select an appointment before starting a consultation.
            </p>

          </div>

          <button
            className="primary-btn"
            onClick={() =>
              navigate("/doctor/appointments")
            }
          >
            View Appointments
          </button>

        </div>

      )}


      {/* CONSULTATION FORM */}

      <form
        className="consultation-form"
        onSubmit={handleSave}
      >


        {/* SYMPTOMS */}

        <div className="consultation-section">

          <div className="form-section-heading">

            <div className="form-number">
              01
            </div>

            <div>
              <h2>
                Symptoms
              </h2>

              <p>
                Record the symptoms reported by the patient.
              </p>
            </div>

          </div>


          <textarea
            className="consultation-textarea"
            placeholder="Enter patient's symptoms..."
            value={symptoms}
            onChange={(e) =>
              setSymptoms(e.target.value)
            }
          />

        </div>


        {/* DIAGNOSIS */}

        <div className="consultation-section">

          <div className="form-section-heading">

            <div className="form-number">
              02
            </div>

            <div>
              <h2>
                Diagnosis
              </h2>

              <p>
                Enter the doctor's diagnosis.
              </p>
            </div>

          </div>


          <textarea
            className="consultation-textarea"
            placeholder="Enter diagnosis..."
            value={diagnosis}
            onChange={(e) =>
              setDiagnosis(e.target.value)
            }
          />

        </div>


        {/* MEDICINES */}

        <div className="consultation-section">

          <div className="form-section-heading">

            <div className="form-number">
              03
            </div>

            <div>

              <h2>
                Prescription
              </h2>

              <p>
                Add medicines, dosage and duration.
              </p>

            </div>

          </div>


          <div className="medicine-list">

            {medicines.map((medicine, index) => (

              <div
                className="medicine-row"
                key={index}
              >

                <div className="medicine-number">
                  {index + 1}
                </div>


                <input
                  type="text"
                  placeholder="Medicine name"
                  value={medicine.medicine}
                  onChange={(e) =>
                    updateMedicine(
                      index,
                      "medicine",
                      e.target.value
                    )
                  }
                />


                <input
                  type="text"
                  placeholder="Dosage e.g. 1-0-1"
                  value={medicine.dosage}
                  onChange={(e) =>
                    updateMedicine(
                      index,
                      "dosage",
                      e.target.value
                    )
                  }
                />


                <input
                  type="text"
                  placeholder="Duration e.g. 5 days"
                  value={medicine.duration}
                  onChange={(e) =>
                    updateMedicine(
                      index,
                      "duration",
                      e.target.value
                    )
                  }
                />


                <button
                  type="button"
                  className="remove-medicine"
                  onClick={() =>
                    removeMedicine(index)
                  }
                >
                  ×
                </button>

              </div>

            ))}

          </div>


          <button
            type="button"
            className="add-medicine-btn"
            onClick={addMedicine}
          >
            + Add Medicine
          </button>

        </div>


        {/* TESTS */}

        <div className="consultation-section">

          <div className="form-section-heading">

            <div className="form-number">
              04
            </div>

            <div>

              <h2>
                Recommended Tests
              </h2>

              <p>
                Add laboratory or diagnostic tests if required.
              </p>

            </div>

          </div>


          <textarea
            className="consultation-textarea"
            placeholder="Enter recommended tests..."
            value={tests}
            onChange={(e) =>
              setTests(e.target.value)
            }
          />

        </div>


        {/* NOTES */}

        <div className="consultation-section">

          <div className="form-section-heading">

            <div className="form-number">
              05
            </div>

            <div>

              <h2>
                Doctor's Notes
              </h2>

              <p>
                Add additional instructions or observations.
              </p>

            </div>

          </div>


          <textarea
            className="consultation-textarea"
            placeholder="Enter additional notes..."
            value={notes}
            onChange={(e) =>
              setNotes(e.target.value)
            }
          />

        </div>


        {/* FOLLOW UP */}

        <div className="consultation-section">

          <div className="form-section-heading">

            <div className="form-number">
              06
            </div>

            <div>

              <h2>
                Follow-up
              </h2>

              <p>
                Select the next appointment date.
              </p>

            </div>

          </div>


          <div className="date-input-wrapper">

            <span>
              📅
            </span>

            <input
              type="date"
              value={followUp}
              onChange={(e) =>
                setFollowUp(e.target.value)
              }
            />

          </div>

        </div>


        {/* ACTIONS */}

        <div className="consultation-actions">

          <button
            type="button"
            className="cancel-consultation"
            onClick={() =>
              navigate("/doctor/appointments")
            }
          >
            Cancel
          </button>


          <button
            type="submit"
            className="save-consultation"
          >
            ✓ Save Consultation
          </button>

        </div>


        {saved && (

          <div className="save-success">

            <div>
              ✓
            </div>

            <div>
              <strong>
                Consultation Saved Successfully
              </strong>

              <p>
                Patient consultation has been recorded.
              </p>
            </div>

          </div>

        )}

      </form>

    </div>

  );
}

export default Consultation;