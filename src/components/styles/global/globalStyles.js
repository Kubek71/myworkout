import { createGlobalStyle } from "styled-components";

export const GlobalStyles = createGlobalStyle`

* {
    box-sizing: border-box;
    padding: 0;
    margin: 0;
}

html, body, #root, .App {
    height: 100vh;
    width: 100vw;
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

.active {
    color: ${({ theme }) => theme.colors.light};
}

a { 
     text-decoration: none;
     color: inherit;
}
`;
