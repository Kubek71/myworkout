import React from "react";
import { Outlet, Navigate } from "react-router-dom";
import { useAuth } from "./authContext";
export default function UserIsNotLoggedInRoutes() {
  const { currentUser } = useAuth();
  return currentUser ? <Navigate to="/" /> : <Outlet />;
}
