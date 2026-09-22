import { useEffect, useState } from "react";

function BookAppointment() {
  const [doctor, setDoctor] = useState("");
  const [department, setDepartment] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [reason, setReason] = useState("");

  const [doctors, setDoctors] = useState([]);
  const [departments, setDepartments] = useState([]);

  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  // Fetch doctors and departments
  useEffect(() => {
    const fetchData = async () => {
      try {
        const [doctorsResponse, departmentsResponse] =
          await Promise.all([
            fetch("http://localhost:5000/api/doctors"),
            fetch("http://localhost:5000/api/departments")
          ]);

        if (!doctorsResponse.ok || !departmentsResponse.ok) {
          throw new Error("Failed to load doctors or departments");
        }

        const doctorsData = await doctorsResponse.json();
        const departmentsData = await departmentsResponse.json();

        setDoctors(doctorsData);
        setDepartments(departmentsData);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const bookAppointment = async () => {
    setMessage("");
    setError("");

    if (!doctor || !department || !date || !time) {
      setError("Please fill all required fields.");
      return;
    }

    const token = localStorage.getItem("token");

    if (!token) {
      setError("Please login before booking an appointment.");
      return;
    }

    try {
      const response = await fetch(
        "http://localhost:5000/api/appointments",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`
          },
          body: JSON.stringify({
            doctorId: doctor,
            departmentId: department,
            appointmentDate: date,
            appointmentTime: time,
            reason
          })
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.message || "Failed to book appointment"
        );
      }

      setMessage("Appointment booked successfully!");

      setDoctor("");
      setDepartment("");
      setDate("");
      setTime("");
      setReason("");
    } catch (err) {
      setError(err.message);
    }
  };

  if (loading) {
    return <p>Loading appointment details...</p>;
  }

  return (
    <div className="page book-page">
      <h1>Book Appointment</h1>

      <p className="page-description">
        Schedule an appointment with your preferred doctor.
      </p>

      <div className="booking-card">
        <h2>Appointment Details</h2>

        {message && (
          <p style={{ color: "green" }}>{message}</p>
        )}

        {error && (
          <p style={{ color: "red" }}>{error}</p>
        )}

        <label>Doctor</label>

        <select
          value={doctor}
          onChange={(e) => setDoctor(e.target.value)}
        >
          <option value="">Select Doctor</option>

          {doctors.map((item) => (
            <option key={item._id} value={item._id}>
              {item.userId?.name || "Doctor"}
            </option>
          ))}
        </select>

        <label>Department</label>

        <select
          value={department}
          onChange={(e) => setDepartment(e.target.value)}
        >
          <option value="">Select Department</option>

          {departments.map((item) => (
            <option key={item._id} value={item._id}>
              {item.name}
            </option>
          ))}
        </select>

        <label>Appointment Date</label>

        <input
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
        />

        <label>Appointment Time</label>

        <input
          type="time"
          value={time}
          onChange={(e) => setTime(e.target.value)}
        />

        <label>Reason for Visit</label>

        <textarea
          placeholder="Enter reason for your visit"
          value={reason}
          onChange={(e) => setReason(e.target.value)}
        />

        <button
          onClick={bookAppointment}
          className="book-submit"
        >
          Book Appointment
        </button>
      </div>
    </div>
  );
}

export default BookAppointment;