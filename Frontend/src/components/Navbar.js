import React from "react";
import { Link } from "react-router-dom";

function Navbar() {
  const user = JSON.parse(localStorage.getItem("user"));

  const handleLogout = () => {
    localStorage.removeItem("user");
    window.location.href = "/login";
  };

  return (
    <nav style={styles.nav}>
      <div style={styles.left}>
        <Link to="/" style={styles.brand}>ExpenseApp</Link>
      </div>

      <div style={styles.right}>

        {!user && (
          <>
            <Link to="/login" style={styles.link}>Login</Link>
            <Link to="/register" style={styles.link}>Register</Link>
          </>
        )}

        {user && user.role === "EMPLOYEE" && (
          <>
            <Link to={`/expenses/${user.id}`} style={styles.link}>My Expenses</Link>
            <Link to={`/add-expense/${user.id}`} style={styles.link}>Add Expense</Link>
            <Link to="/profile" style={styles.link}>Profile</Link>
            <span onClick={handleLogout} style={styles.logout}>Logout</span>
          </>
        )}

        {user && user.role === "MANAGER" && (
          <>
            <Link to={`/expenses/${user.id}`} style={styles.link}>My Expenses</Link>
            <Link to={`/add-expense/${user.id}`} style={styles.link}>Add Expense</Link>            
            <Link to="/manager" style={styles.link}>Manage Expenses</Link>
            <Link to="/employees" style={styles.link}>View Employees</Link>
            <Link to="/profile" style={styles.link}>Profile</Link>
            <span onClick={handleLogout} style={styles.logout}>Logout</span>
          </>
        )}

      </div>
    </nav>
  );
}

const styles = {
  nav: {
    display: "flex",
    justifyContent: "space-between",
    padding: "15px 30px",
    backgroundColor: "#333",
    color: "white",
    alignItems: "center"
  },
  brand: {
    color: "white",
    textDecoration: "none",
    fontSize: "20px",
    fontWeight: "bold"
  },
  link: {
    color: "white",
    textDecoration: "none",
    marginLeft: "20px",
    fontSize: "16px"
  },
  logout: {
    color: "red",
    marginLeft: "20px",
    fontSize: "16px",
    cursor: "pointer"
  },
  left: {},
  right: {
    display: "flex",
    alignItems: "center"
  }
};

export default Navbar;
