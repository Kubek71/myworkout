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
  const [isAuthLoading, setIsAuthLoading] = useState(true);
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setCurrentUser(user);
      setIsAuthLoading(false);
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
    isAuthLoading,
    logoutUser,
  };
  return (
    <AuthContext.Provider value={value}>
      {
        // renders all the children if userState is set
        !isAuthLoading && children
      }
    </AuthContext.Provider>
  );
}
