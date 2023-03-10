import styled from "styled-components";

export const HeaderStyled = styled.header`
  position: sticky;
  z-index: 1;
  top: 0;
  left: 0;
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: ${({ theme }) => theme.colors.dark};
  border-bottom: 1px solid ${({ theme }) => theme.colors.light};
  position: relative;

  // hides logo, nav spans on mobile
  @media (max-width: 1024px) {
    .reponsive-logo,
    span {
      display: none;
    }
  }

  // changes nav flex behaviour on dekstop
  @media (min-width: 1024px) {
    nav {
      justify-content: end;
      margin-right: 6rem;
    }

    // hides menu button on dekstop
    .menu-button {
      display: none;
    }
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
    background: ${({ theme }) => theme.colors.dark};

    // displays spans whenever menu is open
    span {
      display: inherit;
    }

    // displays rest of nav elements whenever menu is open
    > * {
      &:nth-child(n + 3) {
        display: inherit;
      }
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

  // hides rest of menu on mobile, when menu is closed
  @media (max-width: 1024px) {
    > * {
      &:nth-child(n + 3) {
        display: none;
      }
    }
  } ;
`;
