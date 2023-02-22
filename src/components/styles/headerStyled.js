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
  padding: 2rem;

  @media (max-width: 1024px) {
    .reponsive-logo,
    span {
      display: none;
    }
  }

  @media (min-width: 1024px) {
    .responsive-menu {
      display: none;
    }
    nav {
      justify-content: end;
    }
  }
  svg {
    color: ${({ theme }) => theme.colors.light};
    font-size: 22px;
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
  color: ${({ theme }) => theme.colors.primaryRed};
`;

export const WorkoutNavSection = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 2rem;
`;
