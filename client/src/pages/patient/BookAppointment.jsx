import { useState } from "react";

function BookAppointment() {

  const [doctor, setDoctor] = useState("");
  const [department, setDepartment] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [reason, setReason] = useState("");

  const doctors = [
    {
      id: 1,
      name: "Dr. John Smith",
      department: "Cardiology"
    },
    {
      id: 2,
      name: "Dr. Sarah Wilson",
      department: "Neurology"
    },
    {
      id: 3,
      name: "Dr. David Brown",
      department: "Orthopedics"
    }
  ];

  const bookAppointment = () => {

    if (!doctor || !department || !date || !time) {
      alert("Please fill all required fields.");
      return;
    }

    alert("Appointment details submitted!");

    console.log({
      doctor,
      department,
      date,
      time,
      reason
    });
  };

  return (
    <div className="page book-page">

      <h1>Book Appointment</h1>

      <p className="page-description">
        Schedule an appointment with your preferred doctor.
      </p>


      <div className="booking-card">

        <h2>Appointment Details</h2>


        <label>Doctor</label>

        <select
          value={doctor}
          onChange={(e) => {

            setDoctor(e.target.value);

            const selectedDoctor = doctors.find(
              (item) => item.id === Number(e.target.value)
            );

            if (selectedDoctor) {
              setDepartment(selectedDoctor.department);
            }

          }}
        >

          <option value="">
            Select Doctor
          </option>

          {doctors.map((item) => (

            <option
              key={item.id}
              value={item.id}
            >
              {item.name}
            </option>

          ))}

        </select>


        <label>Department</label>

        <select
          value={department}
          onChange={(e) => setDepartment(e.target.value)}
        >

          <option value="">
            Select Department
          </option>

          <option value="Cardiology">
            Cardiology
          </option>

          <option value="Neurology">
            Neurology
          </option>

          <option value="Orthopedics">
            Orthopedics
          </option>

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