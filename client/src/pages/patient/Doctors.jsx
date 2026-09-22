import { useEffect, useState } from "react";

const Doctors = () => {
  const [doctors, setDoctors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchDoctors = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/doctors");

        if (!response.ok) {
          throw new Error("Failed to fetch doctors");
        }

        const data = await response.json();
        setDoctors(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchDoctors();
  }, []);

  if (loading) {
    return <p>Loading doctors...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <div>
      <h2>Doctors</h2>

      {doctors.length === 0 ? (
        <p>No doctors available.</p>
      ) : (
        doctors.map((doctor) => (
          <div key={doctor._id}>
            <h3>{doctor.userId?.name || "Doctor"}</h3>
            <p>
              Specialization: {doctor.specialization}
            </p>
            <p>
              Department: {doctor.departmentId?.name || "N/A"}
            </p>
            <p>
              Experience: {doctor.experience || 0} years
            </p>
          </div>
        ))
      )}
    </div>
  );
};

export default Doctors;
