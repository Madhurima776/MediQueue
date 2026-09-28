import { useEffect, useState } from "react";

function MyAppointments() {
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        const token = localStorage.getItem("token");

        if (!token) {
          throw new Error("Please login to view your appointments.");
        }

        const response = await fetch(
          "http://localhost:5000/api/appointments/my",
          {
            headers: {
              Authorization: `Bearer ${token}`
            }
          }
        );

        const data = await response.json();

        if (!response.ok) {
          throw new Error(
            data.message || "Failed to fetch appointments"
          );
        }

        setAppointments(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchAppointments();
  }, []);

  if (loading) {
    return <p>Loading appointments...</p>;
  }

  return (
    <div className="page appointments-page">
      <h1>My Appointments</h1>

      <p className="page-description">
        View and manage your appointments.
      </p>

      {error && (
        <p style={{ color: "red" }}>
          {error}
        </p>
      )}

      {!error && appointments.length === 0 && (
        <p>No appointments found.</p>
      )}

      <div className="appointments-list">
        {appointments.map((appointment) => {
          const doctorName =
            appointment.doctorId?.userId?.name || "Doctor";

          const departmentName =
            appointment.departmentId?.name || "Department";

          const date = new Date(
            appointment.appointmentDate
          ).toLocaleDateString("en-IN", {
            day: "2-digit",
            month: "short",
            year: "numeric"
          });

          return (
            <div
              className="appointment-item"
              key={appointment._id}
            >
              <div className="appointment-doctor">
                <div className="doctor-avatar">
                  {doctorName
                    .replace("Dr. ", "")
                    .split(" ")
                    .map((word) => word[0])
                    .join("")
                    .slice(0, 2)}
                </div>

                <div>
                  <h2>{doctorName}</h2>
                  <p>{departmentName}</p>
                </div>
              </div>

              <div className="appointment-date">
                <p>Date</p>
                <strong>{date}</strong>
              </div>

              <div className="appointment-time">
                <p>Time</p>
                <strong>
                  {appointment.appointmentTime}
                </strong>
              </div>

              <span className="appointment-status">
                {appointment.status}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default MyAppointments;