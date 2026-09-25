import React, { useState } from "react";

function CheckIn() {
  const [appointmentId, setAppointmentId] = useState("");
  const [patientId, setPatientId] = useState("");
  const [checkedInBy, setCheckedInBy] = useState("");
  const [message, setMessage] = useState("");

  const handleCheckIn = async () => {
    if (appointmentId === "") {
      setMessage("Please enter appointment ID.");
      return;
    }

    if (patientId === "") {
      setMessage("Please enter patient ID.");
      return;
    }

    if (checkedInBy === "") {
      setMessage("Please enter receptionist ID.");
      return;
    }

    try {
      const response = await fetch("http://localhost:5000/api/checkin", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          appointmentId,
          patientId,
          checkedInBy,
          method: "reception",
        }),
      });

      const data = await response.json();

      if (response.ok) {
        setMessage("Patient checked in successfully!");
      } else {
        setMessage(data.message || "Check-in failed.");
      }
    } catch (error) {
      setMessage("Cannot connect to server.");
    }
  };

  return (
    <div style={{ padding: "30px" }}>
      <h1>Patient Check-In</h1>

      <p>Receptionist can verify and check in a patient.</p>

      <label>Appointment ID</label>
      <br />

      <input
        type="text"
        placeholder="Enter appointment ID"
        value={appointmentId}
        onChange={(e) => setAppointmentId(e.target.value)}
      />

      <br /><br />

      <label>Patient ID</label>
      <br />

      <input
        type="text"
        placeholder="Enter patient ID"
        value={patientId}
        onChange={(e) => setPatientId(e.target.value)}
      />

      <br /><br />

      <label>Receptionist ID</label>
      <br />

      <input
        type="text"
        placeholder="Enter receptionist ID"
        value={checkedInBy}
        onChange={(e) => setCheckedInBy(e.target.value)}
      />

      <br /><br />

      <button onClick={handleCheckIn}>
        Check In Patient
      </button>

      {message && <p>{message}</p>}
    </div>
  );
}

export default CheckIn;