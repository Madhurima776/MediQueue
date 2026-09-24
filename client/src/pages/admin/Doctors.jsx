function Doctors() {
  const doctors = [
    {
      id: 1,
      name: "Dr. Ravi Kumar",
      department: "Cardiology",
      specialization: "Cardiologist",
      status: "Available",
    },
    {
      id: 2,
      name: "Dr. Priya Sharma",
      department: "Neurology",
      specialization: "Neurologist",
      status: "Available",
    },
    {
      id: 3,
      name: "Dr. Anil Reddy",
      department: "Orthopedics",
      specialization: "Orthopedic Specialist",
      status: "Unavailable",
    },
  ];

  return (
    <div>
      <h1>Doctors Management</h1>

      <table border="1" cellPadding="10" cellSpacing="0">
        <thead>
          <tr>
            <th>Name</th>
            <th>Department</th>
            <th>Specialization</th>
            <th>Status</th>
          </tr>
        </thead>

        <tbody>
          {doctors.map((doctor) => (
            <tr key={doctor.id}>
              <td>{doctor.name}</td>
              <td>{doctor.department}</td>
              <td>{doctor.specialization}</td>
              <td>{doctor.status}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Doctors;