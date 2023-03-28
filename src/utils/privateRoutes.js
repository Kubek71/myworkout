import React from "react";
import { Outlet, Navigate } from "react-router-dom";
import { useAuth } from "./authContext";
export default function PrivateRoutes() {
  const { currentUser } = useAuth();
  return currentUser ? <Outlet /> : <Navigate to="/login" />;
}
