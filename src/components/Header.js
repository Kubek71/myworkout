import React from "react";
import { useRef, useState } from "react";
import {
  HeaderStyled,
  HeaderLogo,
  NavbarStyled,
  WorkoutNavSection,
} from "./styles/headerStyled";
import { Box } from "./styles/boxStyled.js";
import {
  BiDumbbell as WorkoutsIcon,
  BiMenu as MenuIcon,
  BiUser as AccountIcon,
  BiSpreadsheet as ProgramsIcon,
  BiStats as AnalitycsIcon,
  BiInfoCircle as AboutIcon,
} from "react-icons/bi";

export default function Header() {
  const headerRef = useRef();
  const titlesRef = useRef();
  const [showFullMenu, setShowFullMenu] = useState(false);
  const showNavbar = () => {
    headerRef.current.classList.toggle("open");
    setShowFullMenu((current) => !current);
  };

  return (
    <HeaderStyled>
      <HeaderLogo className="reponsive-logo">asdas</HeaderLogo>
      <Box onClick={showNavbar}>
        <MenuIcon className="menu-button" />
      </Box>
      <NavbarStyled ref={headerRef}>
        <Box>
          <ProgramsIcon />
          <span>PROGRAMS</span>
        </Box>
        <Box>
          <WorkoutsIcon />
          <span>WORKOUT</span>
        </Box>

        {showFullMenu === true && (
          <>
            <Box>
              <AnalitycsIcon />
              <span>ANALITYCS</span>
            </Box>
            <Box>
              <AboutIcon />
              <span>ABOUT</span>
            </Box>
          </>
        )}
      </NavbarStyled>
      <Box>
        <AccountIcon className="account-button" />
      </Box>
    </HeaderStyled>
  );
}
