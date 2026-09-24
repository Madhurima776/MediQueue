import { useEffect, useState } from "react";

function Departments() {
  const [departments, setDepartments] = useState([]);
  const [editingDepartment, setEditingDepartment] = useState(null);

  const [newDepartment, setNewDepartment] = useState({
    name: "",
    description: "",
    location: "",
  });

  // Fetch departments
  useEffect(() => {
    fetch("http://localhost:5000/api/admin/departments")
      .then((response) => response.json())
      .then((data) => {
        setDepartments(data);
      })
      .catch((error) => {
        console.error("Error fetching departments:", error);
      });
  }, []);

  // Create department
  const handleCreate = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(
        "http://localhost:5000/api/admin/departments",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(newDepartment),
        }
      );

      const data = await response.json();

      if (response.ok) {
        alert("Department created successfully");

        setDepartments([...departments, data.department]);

        setNewDepartment({
          name: "",
          description: "",
          location: "",
        });
      } else {
        alert(data.message || "Failed to create department");
      }
    } catch (error) {
      console.error("Error creating department:", error);
      alert("Something went wrong");
    }
  };

  // Update department
  const handleUpdate = async () => {
    try {
      const response = await fetch(
        `http://localhost:5000/api/admin/departments/${editingDepartment._id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            name: editingDepartment.name,
            description: editingDepartment.description,
            location: editingDepartment.location,
            isActive: editingDepartment.isActive,
          }),
        }
      );

      const data = await response.json();

      if (response.ok) {
        alert("Department updated successfully");

        setDepartments(
          departments.map((department) =>
            department._id === editingDepartment._id
              ? data.department
              : department
          )
        );

        setEditingDepartment(null);
      } else {
        alert(data.message || "Failed to update department");
      }
    } catch (error) {
      console.error("Error updating department:", error);
      alert("Something went wrong");
    }
  };

  // Delete department
  const handleDelete = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this department?"
    );

    if (!confirmDelete) {
      return;
    }

    try {
      const response = await fetch(
        `http://localhost:5000/api/admin/departments/${id}`,
        {
          method: "DELETE",
        }
      );

      const data = await response.json();

      if (response.ok) {
        alert(data.message);

        setDepartments(
          departments.filter((department) => department._id !== id)
        );
      } else {
        alert(data.message || "Failed to delete department");
      }
    } catch (error) {
      console.error("Error deleting department:", error);
      alert("Something went wrong");
    }
  };

  return (
    <div>
      <h1>Departments Management</h1>

      {/* Edit Department */}
      {editingDepartment && (
        <div>
          <h2>Edit Department</h2>

          <input
            type="text"
            value={editingDepartment.name}
            placeholder="Department Name"
            onChange={(e) =>
              setEditingDepartment({
                ...editingDepartment,
                name: e.target.value,
              })
            }
          />

          <br />
          <br />

          <input
            type="text"
            value={editingDepartment.description || ""}
            placeholder="Description"
            onChange={(e) =>
              setEditingDepartment({
                ...editingDepartment,
                description: e.target.value,
              })
            }
          />

          <br />
          <br />

          <input
            type="text"
            value={editingDepartment.location || ""}
            placeholder="Location"
            onChange={(e) =>
              setEditingDepartment({
                ...editingDepartment,
                location: e.target.value,
              })
            }
          />

          <br />
          <br />

          <label>
            <input
              type="checkbox"
              checked={editingDepartment.isActive}
              onChange={(e) =>
                setEditingDepartment({
                  ...editingDepartment,
                  isActive: e.target.checked,
                })
              }
            />
            Active
          </label>

          <br />
          <br />

          <button onClick={handleUpdate}>Save Changes</button>

          <button onClick={() => setEditingDepartment(null)}>
            Cancel
          </button>
        </div>
      )}

      <br />

      {/* Create Department */}
      <h2>Add Department</h2>

      <form onSubmit={handleCreate}>
        <input
          type="text"
          placeholder="Department Name"
          value={newDepartment.name}
          onChange={(e) =>
            setNewDepartment({
              ...newDepartment,
              name: e.target.value,
            })
          }
          required
        />

        <br />
        <br />

        <input
          type="text"
          placeholder="Description"
          value={newDepartment.description}
          onChange={(e) =>
            setNewDepartment({
              ...newDepartment,
              description: e.target.value,
            })
          }
        />

        <br />
        <br />

        <input
          type="text"
          placeholder="Location"
          value={newDepartment.location}
          onChange={(e) =>
            setNewDepartment({
              ...newDepartment,
              location: e.target.value,
            })
          }
        />

        <br />
        <br />

        <button type="submit">Add Department</button>
      </form>

      <br />

      {/* Departments Table */}
      <table border="1" cellPadding="10" cellSpacing="0">
        <thead>
          <tr>
            <th>Name</th>
            <th>Description</th>
            <th>Location</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>

        <tbody>
          {departments.map((department) => (
            <tr key={department._id}>
              <td>{department.name}</td>
              <td>{department.description || "N/A"}</td>
              <td>{department.location || "N/A"}</td>
              <td>
                {department.isActive ? "Active" : "Inactive"}
              </td>

              <td>
                <button
                  onClick={() => setEditingDepartment(department)}
                >
                  Edit
                </button>

                <button
                  onClick={() => handleDelete(department._id)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Departments;