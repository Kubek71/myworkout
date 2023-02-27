import styled from "styled-components";

export const HeaderStyled = styled.header`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: ${({ theme }) => theme.colors.dark};
  border-bottom: 1px solid ${({ theme }) => theme.colors.light};
  position: relative;
  @media (max-width: 1024px) {
    .reponsive-logo,
    span {
      display: none;
    }
  }

  @media (min-width: 1024px) {
    nav {
      justify-content: end;
      margin-right: 6rem;
    }
    .menu-button {
      display: none;
    }
  }
  svg {
    color: ${({ theme }) => theme.colors.light};
    font-size: 22px;
  }

  .menu-button {
    position: absolute;
    top: 2rem;
    left: 2rem;
    z-index: 1;
  }
  .account-button {
    position: absolute;
    top: 2rem;
    right: 2rem;
    z-index: 1;
  }

  .open {
    position: absolute;
    top: 0;
    left: 0;
    height: 100vh;
    flex-direction: column;
    z-index: 0;

    span {
      display: inherit;
    }
  }
`;

export const HeaderLogo = styled.div`
  justify-content: center;
  align-items: center;
  width: 100%;
  color: white;
`;

export const NavbarStyled = styled.nav`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  color: ${({ theme }) => theme.colors.primaryRed};
  padding: 2rem;
  gap: 2rem;
`;
