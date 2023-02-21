import { ThemeProvider } from "styled-components";
import { theme } from "./components/styles/global/theme";
import { GlobalStyles } from "./components/styles/global/globalStyles";
function App() {
  return (
    <ThemeProvider theme={theme}>
      <div className="App">
        <GlobalStyles />
      </div>
    </ThemeProvider>
  );
}

export default App;
