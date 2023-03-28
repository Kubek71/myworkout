import React from "react";
import { NavLink } from "react-router-dom";
import { useRef, useState } from "react";
import {
  HeaderStyled,
  HeaderLogo,
  NavbarStyled,
  WorkoutNavSection,
} from "./styles/headerStyled";
import { Box } from "./styles/boxStyled.js";
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
import { RegisterH1 } from "./RegisterPage/RegisterPageStyled";
import { useAuth } from "../utils/authContext";

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
        <NavLink to="/workoutprograms">
          <Box>
            <ProgramsIcon />
            <span>PROGRAMS</span>
          </Box>
        </NavLink>

        <NavLink to="/workouts">
          <Box>
            <WorkoutsIcon />
            <span>WORKOUT</span>
          </Box>
        </NavLink>

        <Box>
          <AnalitycsIcon />
          <span>ANALITYCS</span>
        </Box>
        <Box>
          <AboutIcon />
          <span>ABOUT</span>
        </Box>
        <Box onClick={logoutUser}>
          <LogoutIcon />
          <span>LOGOUT</span>
        </Box>
      </NavbarStyled>
      <Box>
        <AccountIcon className="account-button" />
      </Box>
    </HeaderStyled>
  );
}
