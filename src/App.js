import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "styled-components";
import { theme } from "./components/styles/global/theme";
import { GlobalStyles } from "./components/styles/global/globalStyles";
import Header from "./components/Header";
import NewProgramPage from "./components/NewProgramPage";
import ProgramPage from "./components/ProgramPage";
import WorkoutPage from "./components/WorkoutPage";
import RegisterPage from "./components/RegisterPage/RegisterPage";
import LoginPage from "./components/LoginPage/LoginPage";

import { useEffect, useState } from "react";
import { useAuth } from "./utils/authContext";
import PrivateRoutes from "./utils/privateRoutes";
function App() {
  const { currentUser } = useAuth();
  useEffect(() => {
    if (currentUser !== undefined) {
      console.log(currentUser);
    }
  }, [currentUser]);
  return (
    <>
      <GlobalStyles />
      <Router>
        <div className="App">
          {currentUser && <Header />}
          <Routes>
            <Route element={<PrivateRoutes />}>
              <Route path="/" element={<WorkoutPage />} exact />
              <Route path="/workoutprograms" element={<ProgramPage />} />
              <Route path="/newprogram" element={<NewProgramPage />} />
              <Route path="/workouts" element={<WorkoutPage />} />
            </Route>
            <Route path="/login" element={<LoginPage />} />
            <Route path="/signup" element={<RegisterPage />} />
          </Routes>
        </div>
      </Router>
    </>
  );
}

export default App;
