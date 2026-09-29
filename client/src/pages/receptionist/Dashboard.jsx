import React, { useEffect, useState } from "react";

function Dashboard() {
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState("");

  useEffect(() => {
    fetchAppointments();
  }, []);

  const fetchAppointments = async () => {
    try {
      const response = await fetch(
        "http://localhost:5000/api/checkin/appointments"
      );

      const data = await response.json();

      if (response.ok) {
        setAppointments(data);
      } else {
        setMessage(data.message || "Failed to load appointments.");
      }
    } catch (error) {
      setMessage("Cannot connect to server.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ padding: "30px" }}>
      <h1>Receptionist Dashboard</h1>

      <h2>Today's Appointments</h2>

      {loading && <p>Loading appointments...</p>}

      {message && <p>{message}</p>}

      {!loading && !message && appointments.length === 0 && (
        <p>No appointments available today.</p>
      )}

      {!loading && appointments.length > 0 && (
        <table
          border="1"
          cellPadding="10"
          style={{
            borderCollapse: "collapse",
            marginTop: "20px",
          }}
        >
          <thead>
            <tr>
              <th>Appointment ID</th>
              <th>Patient Name</th>
              <th>Doctor</th>
              <th>Time</th>
              <th>Status</th>
            </tr>
          </thead>

          <tbody>
            {appointments.map((appointment) => (
              <tr key={appointment._id}>
                <td>{appointment._id}</td>
                <td>
                  {appointment.patientId
                    ? appointment.patientId.name
                    : "Unknown"}
                </td>
                <td>
  {appointment.doctorId && appointment.doctorId.userId
    ? appointment.doctorId.userId.name
    : "Unknown"}
</td>not working

    
                <td>{appointment.appointmentTime}</td>
                <td>{appointment.status}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default Dashboard;