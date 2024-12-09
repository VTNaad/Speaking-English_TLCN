import React, { useEffect, useState } from "react";

const ProfileScreen = () => {
  const [user, setUser] = useState(null);
  const apiUrl = process.env.REACT_APP_API_URL;
  
  // Hàm lấy thông tin người dùng từ token
  const getUserFromToken = async () => {
    try {
      const token = localStorage.getItem("accessToken");
      if (!token) {
        console.error("No token found in localStorage");
        return;
      }
  
      const response = await fetch(`${apiUrl}/user/getUserToken`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });
  
      if (!response.ok) {
        throw new Error(`HTTP status ${response.status}`);
      }
  
      const data = await response.json();
      console.log("API response:", data);
  
      if (data.success) {
        setUser(data.user);
      } else {
        console.error("API did not return success:", data.message);
      }
    } catch (error) {
      console.error("An error occurred:", error);
    }
  };

  useEffect(() => {
    getUserFromToken();
  }, []);

  return (
    <div style={styles.container}>
      {user ? (
        <div style={styles.profileCard}>
          <h2 style={styles.name}>{user.fullname}</h2>
          <p style={styles.info}><strong>Username:</strong> {user.username}</p>
          <p style={styles.info}><strong>Email:</strong> {user.email}</p>
          <p style={styles.info}><strong>Phone:</strong> {user.phone}</p>
          <p style={styles.info}>
            <strong>Status:</strong> {user.isBlocked ? "Blocked" : "Active"}
          </p>
        </div>
      ) : (
        <p style={styles.loadingText}>Loading...</p>
      )}
    </div>
  );
};

// CSS-in-JS cho ProfileScreen
const styles = {
  container: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    minHeight: "100vh",
    backgroundColor: "#f4f4f9",
    padding: "0 20px",
  },
  profileCard: {
    width: "100%",
    maxWidth: "400px",
    padding: "20px",
    backgroundColor: "#fff",
    borderRadius: "8px",
    boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.1)",
    textAlign: "center",
  },
  name: {
    fontSize: "24px",
    fontWeight: "bold",
    color: "#333",
    marginBottom: "15px",
  },
  info: {
    fontSize: "16px",
    color: "#666",
    marginBottom: "10px",
  },
  loadingText: {
    fontSize: "18px",
    color: "#888",
  },
};

export default ProfileScreen;
