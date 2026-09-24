import { useEffect, useState } from "react";

function Reports() {
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
      <h1>Reports</h1>

      <h2>System Overview</h2>

      <table border="1" cellPadding="10" cellSpacing="0">
        <thead>
          <tr>
            <th>Report</th>
            <th>Total</th>
          </tr>
        </thead>

        <tbody>
          <tr>
            <td>Total Users</td>
            <td>{userCount}</td>
          </tr>

          <tr>
            <td>Total Departments</td>
            <td>{departmentCount}</td>
          </tr>

          <tr>
            <td>Total Doctors</td>
            <td>0</td>
          </tr>

          <tr>
            <td>Total Appointments</td>
            <td>0</td>
          </tr>
        </tbody>
      </table>

      <h2>Department Report</h2>

      <p>
        Currently, the system has {departmentCount} department(s)
        registered.
      </p>

      <h2>User Report</h2>

      <p>
        Currently, the system has {userCount} user(s) registered.
      </p>
    </div>
  );
}

export default Reports;