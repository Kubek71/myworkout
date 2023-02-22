import { ThemeProvider } from "styled-components";
import { theme } from "./components/styles/global/theme";
import { GlobalStyles } from "./components/styles/global/globalStyles";
import Header from "./components/Header";
function App() {
  return (
    <ThemeProvider theme={theme}>
      <>
        <GlobalStyles />
        <div className="App">
          <Header />
        </div>
      </>
    </ThemeProvider>
  );
}

export default App;
