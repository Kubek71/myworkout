import styled from "styled-components";

export const LoginPageStyled = styled.main`
  padding: 2rem;
  background: ${({ theme }) => theme.colors.dark};
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const LogoBox = styled.div`
  width: 100%;
  padding-inline: 4rem;
  svg {
    fill: ${({ theme }) => theme.colors.primaryRed};
  }
`;
