import { useEffect, useState } from "react";

function Users() {
  const [users, setUsers] = useState([]);
  const [editingUser, setEditingUser] = useState(null);

  // Fetch users from backend
  useEffect(() => {
    fetch("http://localhost:5000/api/admin/users")
      .then((response) => response.json())
      .then((data) => {
        setUsers(data);
      })
      .catch((error) => {
        console.error("Error fetching users:", error);
      });
  }, []);

  // Delete user
  const handleDelete = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this user?"
    );

    if (!confirmDelete) {
      return;
    }

    try {
      const response = await fetch(
        `http://localhost:5000/api/admin/users/${id}`,
        {
          method: "DELETE",
        }
      );

      const data = await response.json();

      if (response.ok) {
        alert(data.message);

        setUsers(users.filter((user) => user._id !== id));
      } else {
        alert(data.message || "Failed to delete user");
      }
    } catch (error) {
      console.error("Error deleting user:", error);
      alert("Something went wrong");
    }
  };

  // Update user
  const handleUpdate = async () => {
    try {
      const response = await fetch(
        `http://localhost:5000/api/admin/users/${editingUser._id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            name: editingUser.name,
            email: editingUser.email,
            phone: editingUser.phone,
            role: editingUser.role,
            isActive: editingUser.isActive,
          }),
        }
      );

      const data = await response.json();

      if (response.ok) {
        alert(data.message);

        // Update the table with the updated user
        setUsers(
          users.map((user) =>
            user._id === editingUser._id ? data.user : user
          )
        );

        // Close edit form
        setEditingUser(null);
      } else {
        alert(data.message || "Failed to update user");
      }
    } catch (error) {
      console.error("Error updating user:", error);
      alert("Something went wrong");
    }
  };

  return (
    <div>
      <h1>Users Management</h1>

      {/* Edit User Form */}
      {editingUser && (
        <div>
          <h2>Edit User</h2>

          <input
            type="text"
            value={editingUser.name}
            placeholder="Name"
            onChange={(e) =>
              setEditingUser({
                ...editingUser,
                name: e.target.value,
              })
            }
          />

          <br />
          <br />

          <input
            type="email"
            value={editingUser.email}
            placeholder="Email"
            onChange={(e) =>
              setEditingUser({
                ...editingUser,
                email: e.target.value,
              })
            }
          />

          <br />
          <br />

          <input
            type="text"
            value={editingUser.phone || ""}
            placeholder="Phone"
            onChange={(e) =>
              setEditingUser({
                ...editingUser,
                phone: e.target.value,
              })
            }
          />

          <br />
          <br />

          <select
            value={editingUser.role}
            onChange={(e) =>
              setEditingUser({
                ...editingUser,
                role: e.target.value,
              })
            }
          >
            <option value="patient">Patient</option>
            <option value="doctor">Doctor</option>
            <option value="receptionist">Receptionist</option>
            <option value="admin">Admin</option>
          </select>

          <br />
          <br />

          <label>
            <input
              type="checkbox"
              checked={editingUser.isActive}
              onChange={(e) =>
                setEditingUser({
                  ...editingUser,
                  isActive: e.target.checked,
                })
              }
            />
            Active
          </label>

          <br />
          <br />

          <button onClick={handleUpdate}>
            Save Changes
          </button>

          <button onClick={() => setEditingUser(null)}>
            Cancel
          </button>
        </div>
      )}

      <br />

      {/* Users Table */}
      <table border="1" cellPadding="10" cellSpacing="0">
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Phone</th>
            <th>Role</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>

        <tbody>
          {users.map((user) => (
            <tr key={user._id}>
              <td>{user.name}</td>
              <td>{user.email}</td>
              <td>{user.phone || "N/A"}</td>
              <td>{user.role}</td>
              <td>{user.isActive ? "Active" : "Inactive"}</td>

              <td>
                <button onClick={() => setEditingUser(user)}>
                  Edit
                </button>

                <button onClick={() => handleDelete(user._id)}>
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

export default Users;