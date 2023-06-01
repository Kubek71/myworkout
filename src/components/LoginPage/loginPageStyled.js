import styled from "styled-components";

export const LoginPageStyled = styled.main`
  position: absolute;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  max-width: unset;
  z-index: 1;
  padding: 2rem;
  background: ${({ theme }) => theme.colors.dark};
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const LogoBox = styled.div`
  width: 100%;
  padding-inline: 4rem;
  max-width: 400px;
  svg {
    fill: ${({ theme }) => theme.colors.primaryRed};
  }
`;
