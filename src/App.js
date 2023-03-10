import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "styled-components";
import { theme } from "./components/styles/global/theme";
import { GlobalStyles } from "./components/styles/global/globalStyles";
import Header from "./components/Header";
import ProgramPage from "./components/ProgramPage";
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
            </Routes>
          </div>
        </BrowserRouter>
      </>
    </ThemeProvider>
  );
}

export default App;
