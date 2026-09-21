import { Link } from "react-router-dom";

function Doctors() {

  const doctors = [
    {
      id: 1,
      name: "Dr. John Smith",
      specialization: "Cardiology",
      experience: 10,
      consultationFee: 500,
      availableDays: "Monday - Friday",
      time: "09:00 AM - 05:00 PM"
    },
    {
      id: 2,
      name: "Dr. Sarah Wilson",
      specialization: "Neurology",
      experience: 8,
      consultationFee: 600,
      availableDays: "Monday, Wednesday, Friday",
      time: "10:00 AM - 06:00 PM"
    },
    {
      id: 3,
      name: "Dr. David Brown",
      specialization: "Orthopedics",
      experience: 12,
      consultationFee: 700,
      availableDays: "Tuesday, Thursday, Saturday",
      time: "09:00 AM - 04:00 PM"
    }
  ];

  return (
    <div className="page doctors-page">

      <h1>Find a Doctor</h1>

      <p className="page-description">
        Choose a doctor based on specialization and availability.
      </p>

      <div className="doctor-grid">

        {doctors.map((doctor) => (

          <div className="doctor-card" key={doctor.id}>

            <div className="doctor-card-top">

              <div className="doctor-avatar">
                {doctor.name
                  .split(" ")
                  .slice(1)
                  .map((word) => word[0])
                  .join("")}
              </div>

              <span className="available">
                Available
              </span>

            </div>

            <h2>{doctor.name}</h2>

            <p className="specialization">
              {doctor.specialization}
            </p>

            <p>
              <b>Experience:</b> {doctor.experience} years
            </p>

            <p>
              <b>Consultation Fee:</b> ₹{doctor.consultationFee}
            </p>

            <p>
              <b>Available:</b> {doctor.availableDays}
            </p>

            <p>
              <b>Time:</b> {doctor.time}
            </p>

            <Link
              to="/book"
              className="book-button"
            >
              Book Appointment
            </Link>

          </div>

        ))}

      </div>

    </div>
  );
}

export default Doctors;