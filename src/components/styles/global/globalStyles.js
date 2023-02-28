import { createGlobalStyle } from "styled-components";

export const GlobalStyles = createGlobalStyle`

* {
    box-sizing: border-box;
}

body, html, .App {
    min-height: 100%;
    min-width: 100%;
    margin: 0;
    padding: 0;
}

body {
    font-size: 16px;
    font-family: 'Comfortaa', serif;
    background: ${({ theme }) => theme.colors.dark};

    svg {
    color: ${({ theme }) => theme.colors.light};
    font-size: 22px;
  }
}

`;
