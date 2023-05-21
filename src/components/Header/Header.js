import React from "react";
import { NavLink } from "react-router-dom";
import { useRef, useState } from "react";
import {
  HeaderStyled,
  HeaderLogo,
  NavbarStyled,
  WorkoutNavSection,
} from "../styles/headerStyled";
import Logo from "../../assets/Logo/Logo";
import { Box } from "../styles/boxStyled.js.js";
import styled from "styled-components";
import {
  BiDumbbell as WorkoutsIcon,
  BiMenu as MenuIcon,
  BiUser as AccountIcon,
  BiSpreadsheet as ProgramsIcon,
  BiStats as AnalitycsIcon,
  BiHistory as HistoryIcon,
  BiLogOut as LogoutIcon,
} from "react-icons/bi";
import { RegisterH1 } from "../RegisterPage/RegisterPageStyled";
import { useAuth } from "../../utils/authContext";
import { useEffect } from "react";

const RegisterHeading = styled(RegisterH1)`
  padding: 2rem;
  color: ${({ theme }) => theme.colors.light};
`;

export default function Header({ headerHeightRef }) {
  const { currentUser, logoutUser } = useAuth();
  const headerRef = useRef();
  const showNavbar = () => {
    headerRef.current.classList.toggle("open");
  };
  const closeNavbar = () => {
    headerRef.current.classList.remove("open");
  };

  return (
    <HeaderStyled ref={headerHeightRef}>
      {/* <RegisterHeading>Sign In</RegisterHeading> */}
      <HeaderLogo className="reponsive-logo">
        <NavLink to="/">
          <Logo />
        </NavLink>
      </HeaderLogo>
      <Box onClick={showNavbar}>
        <MenuIcon className="menu-button" />
      </Box>
      <NavbarStyled ref={headerRef}>
        <NavLink to="/workoutprograms" onClick={closeNavbar}>
          <Box>
            <ProgramsIcon />
            <span>PROGRAMS</span>
          </Box>
        </NavLink>

        <NavLink to="/" onClick={closeNavbar}>
          <Box>
            <WorkoutsIcon />
            <span>WORKOUT</span>
          </Box>
        </NavLink>

        <NavLink to="history" onClick={closeNavbar}>
          <Box>
            <HistoryIcon />
            <span>HISTORY</span>
          </Box>
        </NavLink>

        <Box onClick={closeNavbar}>
          <AnalitycsIcon />
          <span>ANALITYCS</span>
        </Box>

        <Box
          onClick={() => {
            logoutUser();
            closeNavbar();
          }}
        >
          <LogoutIcon />
          <span>LOGOUT</span>
        </Box>
      </NavbarStyled>
      <NavLink to="/profile" onClick={closeNavbar}>
        <Box>
          <AccountIcon className="account-button" />
        </Box>
      </NavLink>
    </HeaderStyled>
  );
}
