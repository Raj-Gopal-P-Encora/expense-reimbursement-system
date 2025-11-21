import React from "react";
import "../styles/Unauthorized.css";
import { Link } from "react-router-dom";

function Unauthorized() {
  return (
    <div className="unauthorized-container">
      <div className="unauthorized-card">
        <div className="unauthorized-icon" aria-hidden="true">
          🚨
        </div>
        <h1 className="unauthorized-heading" style={{color:"#F52323"}}>
          ACCESS DENIED: Unauthorized Area
        </h1>
        <p className="unauthorized-message">
          **Warning!** You attempted to access a page that requires higher
          privileges or a different user role. Your current credentials do not
          permit viewing this content.
        </p>
        <p className="unauthorized-message">
          If you believe this is an error, please try logging in with an
          authorized account or contact support.
        </p>
        <Link to="/" className="unauthorized-button">
          Go to Homepage
        </Link>
      </div>
    </div>
  );
}

export default Unauthorized;