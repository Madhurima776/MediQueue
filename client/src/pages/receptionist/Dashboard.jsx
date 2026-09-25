import React from "react";

function Dashboard() {
  const appointments = [
    {
      id: "A001",
      patientName: "Rahul",
      doctorName: "Dr. Priya",
      time: "10:00 AM",
      status: "Booked",
    },
    {
      id: "A002",
      patientName: "Sneha",
      doctorName: "Dr. Kumar",
      time: "10:30 AM",
      status: "Confirmed",
    },
    {
      id: "A003",
      patientName: "Arjun",
      doctorName: "Dr. Priya",
      time: "11:00 AM",
      status: "Booked",
    },
  ];

  return (
    <div style={{ padding: "30px" }}>
      <h1>Receptionist Dashboard</h1>

      <h2>Today's Appointments</h2>

      {appointments.length === 0 ? (
        <p>No appointments available.</p>
      ) : (
        <table
          border="1"
          cellPadding="10"
          style={{ borderCollapse: "collapse", marginTop: "20px" }}
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
              <tr key={appointment.id}>
                <td>{appointment.id}</td>
                <td>{appointment.patientName}</td>
                <td>{appointment.doctorName}</td>
                <td>{appointment.time}</td>
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