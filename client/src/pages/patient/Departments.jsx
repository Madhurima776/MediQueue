function Departments() {

  const departments = [
    {
      id: 1,
      name: "Cardiology",
      description: "Heart and blood vessel care"
    },
    {
      id: 2,
      name: "Neurology",
      description: "Brain and nervous system care"
    },
    {
      id: 3,
      name: "Orthopedics",
      description: "Bones, joints and muscles care"
    }
  ];

  return (
    <div className="page departments-page">

      <h1>Departments</h1>

      <p className="page-description">
        Choose a department for your healthcare needs.
      </p>

      <div className="department-grid">

        {departments.map((department) => (

          <div
            className="department-card"
            key={department.id}
          >

            <div className="department-icon">
              🏥
            </div>

            <h2>{department.name}</h2>

            <p>
              {department.description}
            </p>

          </div>

        ))}

      </div>

    </div>
  );
}

export default Departments;