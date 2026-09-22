import { useEffect, useState } from "react";

const Departments = () => {
  const [departments, setDepartments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchDepartments = async () => {
      try {
        const response = await fetch(
          "http://localhost:5000/api/departments"
        );

        if (!response.ok) {
          throw new Error("Failed to fetch departments");
        }

        const data = await response.json();
        setDepartments(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchDepartments();
  }, []);

  if (loading) {
    return <p>Loading departments...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <div>
      <h2>Departments</h2>

      {departments.length === 0 ? (
        <p>No departments available.</p>
      ) : (
        departments.map((department) => (
          <div key={department._id}>
            <h3>{department.name}</h3>

            <p>
              {department.description || "No description available"}
            </p>

            {department.location && (
              <p>Location: {department.location}</p>
            )}
          </div>
        ))
      )}
    </div>
  );
};

export default Departments;