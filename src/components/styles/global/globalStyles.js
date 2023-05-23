import { createGlobalStyle } from "styled-components";

export const GlobalStyles = createGlobalStyle`

* {
    box-sizing: border-box;
    padding: 0;
    margin: 0;
}

html, body, #root, .App {
    height: 100vh;
    width: 100%;
}

body {
    font-size: 16px;
    font-family: 'Comfortaa', serif;
    background: ${({ theme }) => theme.colors.dark};

    svg {
    color: ${({ theme }) => theme.colors.light};
    font-size: 22px;
    cursor: pointer;
  }
}

.active {
    color: ${({ theme }) => theme.colors.light};
}

a { 
     text-decoration: none;
     color: inherit;
}

button {
    border: none;
    margin: 0;
    padding: 0;
    width: auto;
    overflow: visible;
    background: none;
    color: inherit;
    font: inherit;
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;

}

main { 
    margin: 0 auto;
    max-width: 1200px;
}

div {
&::-webkit-scrollbar {
  width: 0.5rem
}

/* Track */
&::-webkit-scrollbar-track {
  background: none;
}

/* Handle */
&::-webkit-scrollbar-thumb {
  background: ${({ theme }) => theme.colors.alphaRed};
  border-radius: 5px;
}
}

/* Chrome, Safari, Edge, Opera */
input::-webkit-outer-spin-button,
input::-webkit-inner-spin-button {
  -webkit-appearance: none;
  margin: 0;
}

`;
