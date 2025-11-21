import React from "react";
import { Navigate, useParams } from "react-router-dom";

function ProtectedRoute({ children, role }) {

    const user = JSON.parse(localStorage.getItem("user"));
    const params = useParams();
    const routeEmployeeId = params.employeeId;
    if (!user) {
        return <Navigate to="/login" />;
    }

    if (role && user.role !== role) {
        return <Navigate to="/login" />;
    }

    if (routeEmployeeId) {
        const loggedInId = user.id.toString();
        if (routeEmployeeId !== loggedInId) {
            return <Navigate to="/unauthorized" />;
        }
    }

    return children;
}

export default ProtectedRoute;
