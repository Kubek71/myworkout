import React from "react";
import { NavLink } from "react-router-dom";
import { useRef } from "react";
import { HeaderStyled, HeaderLogo, NavbarStyled } from "./headerStyled";
import Logo from "../../assets/Logo/Logo";
import { Box } from "../styles/boxStyled.js.js";
import {
  BiDumbbell as WorkoutsIcon,
  BiMenu as MenuIcon,
  BiUser as AccountIcon,
  BiSpreadsheet as ProgramsIcon,
  BiStats as AnalitycsIcon,
  BiHistory as HistoryIcon,
  BiLogOut as LogoutIcon,
} from "react-icons/bi";
import { useAuth } from "../../utils/authContext";

export default function Header({ headerHeightRef }) {
  const { logoutUser } = useAuth();
  const headerRef = useRef();
  const showNavbar = () => {
    headerRef.current.classList.toggle("open");
  };
  const closeNavbar = () => {
    headerRef.current.classList.remove("open");
  };

  return (
    <HeaderStyled ref={headerHeightRef}>
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
        <NavLink to="analitycs" onClick={closeNavbar}>
          <Box>
            <AnalitycsIcon />
            <span>ANALITYCS</span>
          </Box>
        </NavLink>
        <button
          onClick={() => {
            logoutUser();
            closeNavbar();
          }}
        >
          <Box>
            <LogoutIcon />
            <span>LOGOUT</span>
          </Box>
        </button>
      </NavbarStyled>
      <NavLink to="/profile" onClick={closeNavbar}>
        <Box>
          <AccountIcon className="account-button" />
        </Box>
      </NavLink>
    </HeaderStyled>
  );
}
