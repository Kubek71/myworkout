import React from "react";
import { auth } from "./firebaseConfig";
import { useContext, useState, useEffect } from "react";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { Navigate } from "react-router-dom";

const AuthContext = React.createContext();

export function useAuth() {
  return useContext(AuthContext);
}
export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState();
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setCurrentUser(user);
      console.log(user);
    });

    return () => {
      unsubscribe();
    };
  }, []);

  const logoutUser = () => {
    signOut(auth)
      .then(() => {
        // Sign-out successful.
        console.log("user logged out");
        setCurrentUser(undefined);
        <Navigate to="/login" />;
      })
      .catch((error) => {
        // An error happened.
      });
  };
  const value = {
    currentUser,
    logoutUser,
  };
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
