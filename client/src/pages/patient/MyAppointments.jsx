function MyAppointments() {

  const appointments = [
    {
      id: 1,
      doctor: "Dr. Sarah Wilson",
      department: "Neurology",
      date: "18 Aug 2026",
      time: "10:30 AM",
      status: "Confirmed"
    },
    {
      id: 2,
      doctor: "Dr. John Smith",
      department: "Cardiology",
      date: "25 Aug 2026",
      time: "11:00 AM",
      status: "Booked"
    }
  ];

  return (
    <div className="page appointments-page">

      <h1>My Appointments</h1>

      <p className="page-description">
        View and manage your appointments.
      </p>

      <div className="appointments-list">

        {appointments.map((appointment) => (

          <div
            className="appointment-item"
            key={appointment.id}
          >

            <div className="appointment-doctor">

              <div className="doctor-avatar">
                {appointment.doctor
                  .split(" ")
                  .slice(1)
                  .map((word) => word[0])
                  .join("")}
              </div>

              <div>
                <h2>{appointment.doctor}</h2>

                <p>
                  {appointment.department}
                </p>
              </div>

            </div>


            <div className="appointment-date">

              <p>Date</p>

              <strong>
                {appointment.date}
              </strong>

            </div>


            <div className="appointment-time">

              <p>Time</p>

              <strong>
                {appointment.time}
              </strong>

            </div>


            <span className="appointment-status">
              {appointment.status}
            </span>

          </div>

        ))}

      </div>

    </div>
  );
}

export default MyAppointments;