import { useEffect, useState } from "react";

function Dashboard() {
  const [userCount, setUserCount] = useState(0);
  const [departmentCount, setDepartmentCount] = useState(0);

  useEffect(() => {
    // Get users
    fetch("http://localhost:5000/api/admin/users")
      .then((response) => response.json())
      .then((data) => {
        setUserCount(data.length);
      })
      .catch((error) => {
        console.error("Error fetching users:", error);
      });

    // Get departments
    fetch("http://localhost:5000/api/admin/departments")
      .then((response) => response.json())
      .then((data) => {
        setDepartmentCount(data.length);
      })
      .catch((error) => {
        console.error("Error fetching departments:", error);
      });
  }, []);

  return (
    <div>
      <h1>Admin Dashboard</h1>

      <div>
        <div>
          <h2>Total Users</h2>
          <p>{userCount}</p>
        </div>

        <div>
          <h2>Total Departments</h2>
          <p>{departmentCount}</p>
        </div>

        <div>
          <h2>Total Doctors</h2>
          <p>0</p>
        </div>

        <div>
          <h2>Total Appointments</h2>
          <p>0</p>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;