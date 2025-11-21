import React, { useEffect, useState } from "react";
import api from "../api/axiosConfig";
import '../styles/Profile.css'; // Import the CSS file

function Profile() {

  const user = JSON.parse(localStorage.getItem("user"));
  const [employee, setEmployee] = useState(null);

  useEffect(() => {
    // Only fetch if a user is available in localStorage
    if (user && user.id) {
        api.get(`/api/employees/${user.id}`)
          .then(res => setEmployee(res.data))
          .catch(err => console.error("Error fetching employee profile:", err));
    }
  }, [user?.id]); // Depend on user.id to re-fetch if necessary

  if (!employee) return <div className="profile-container"><h2 className="loading-text">Loading profile...</h2></div>;

  return (
    <div className="profile-container">
      <div className="profile-card">
        <h2>My Profile</h2>
        <div className="profile-details">
            <p className="detail-item"><strong>Name:</strong> {employee.name}</p>
            <p className="detail-item"><strong>Email:</strong> {employee.email}</p>
            <p className="detail-item"><strong>Role:</strong> {employee.role}</p>
        </div>
      </div>
    </div>
  );
}

export default Profile;