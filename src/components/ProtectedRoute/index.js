import React from "react";
import { Navigate } from "react-router-dom";
import jsCookie from "js-cookie";

const ProtectedRoute = ({ element }) => {
  const token = jsCookie.get("jwt_token");
  return token ? element : <Navigate to="/login" />;
};

export default ProtectedRoute;
