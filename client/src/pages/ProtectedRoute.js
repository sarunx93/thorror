import React from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import { toast } from "react-toastify";
const ProtectedRoute = ({ children }) => {
  const { user } = useSelector((store) => store.user);
  if (!user) {
    toast.error("Please login or register");
    return <Navigate to="/" />;
  }

  return children;
};

export default ProtectedRoute;
