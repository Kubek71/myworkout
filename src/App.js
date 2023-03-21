import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "styled-components";
import { theme } from "./components/styles/global/theme";
import { GlobalStyles } from "./components/styles/global/globalStyles";
import Header from "./components/Header";
import NewProgramPage from "./components/NewProgramPage";
import ProgramPage from "./components/ProgramPage";
import WorkoutPage from "./components/WorkoutPage";
import RegisterPage from "./components/RegisterPage/RegisterPage";
import LoginPage from "./components/LoginPage/LoginPage";
function App() {
  return (
    <ThemeProvider theme={theme}>
      <>
        <GlobalStyles />
        <BrowserRouter>
          <div className="App">
            <Header />
            <Routes>
              <Route path="/" />
              <Route path="/workoutprograms" element={<ProgramPage />} />
              <Route path="newprogram" element={<NewProgramPage />} />
              <Route path="workouts" element={<WorkoutPage />} />
              <Route path="register" element={<RegisterPage />} />
              <Route path="login" element={<LoginPage />} />
            </Routes>
          </div>
        </BrowserRouter>
      </>
    </ThemeProvider>
  );
}

export default App;
