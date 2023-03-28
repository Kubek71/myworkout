import React from "react";
import { NavLink } from "react-router-dom";
import { useRef, useState } from "react";
import {
  HeaderStyled,
  HeaderLogo,
  NavbarStyled,
  WorkoutNavSection,
} from "../styles/headerStyled";
import { Box } from "../styles/boxStyled.js.js";
import styled from "styled-components";
import {
  BiDumbbell as WorkoutsIcon,
  BiMenu as MenuIcon,
  BiUser as AccountIcon,
  BiSpreadsheet as ProgramsIcon,
  BiStats as AnalitycsIcon,
  BiInfoCircle as AboutIcon,
  BiLogOut as LogoutIcon,
} from "react-icons/bi";
import { RegisterH1 } from "../RegisterPage/RegisterPageStyled";
import { useAuth } from "../../utils/authContext";
import { useEffect } from "react";

const RegisterHeading = styled(RegisterH1)`
  padding: 2rem;
  color: ${({ theme }) => theme.colors.light};
`;

export default function Header() {
  const { currentUser, logoutUser } = useAuth();
  const headerRef = useRef();
  const showNavbar = () => {
    headerRef.current.classList.toggle("open");
  };

  return (
    <HeaderStyled>
      {/* <RegisterHeading>Sign In</RegisterHeading> */}
      <HeaderLogo className="reponsive-logo">asdas</HeaderLogo>
      <Box onClick={showNavbar}>
        <MenuIcon className="menu-button" />
      </Box>
      <NavbarStyled ref={headerRef}>
        <NavLink to="/workoutprograms" onClick={showNavbar}>
          <Box>
            <ProgramsIcon />
            <span>PROGRAMS</span>
          </Box>
        </NavLink>

        <NavLink to="/workouts" onClick={showNavbar}>
          <Box>
            <WorkoutsIcon />
            <span>WORKOUT</span>
          </Box>
        </NavLink>

        <Box onClick={showNavbar}>
          <AnalitycsIcon />
          <span>ANALITYCS</span>
        </Box>
        <Box onClick={showNavbar}>
          <AboutIcon />
          <span>ABOUT</span>
        </Box>
        <Box onClick={logoutUser}>
          <LogoutIcon />
          <span>LOGOUT</span>
        </Box>
      </NavbarStyled>
      <Box onClick={showNavbar}>
        <AccountIcon className="account-button" />
      </Box>
    </HeaderStyled>
  );
}
