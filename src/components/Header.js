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
  BiDumbbell as Workouts,
  BiMenu as Menu,
  BiUser as Account,
  BiSpreadsheet as Programs,
} from "react-icons/bi";

export default function Header() {
  const navRef = useRef();
  const [openCategories, setOpenCategories] = useState(false);
  const showNavbar = () => {
    navRef.current.classList.toggle("responsive-nav");
  };

  return (
    <HeaderStyled>
      <HeaderLogo className="reponsive-logo">asdas</HeaderLogo>
      <Box onClick={showNavbar}>
        <Menu className="responsive-menu" />
      </Box>
      <NavbarStyled ref={navRef}>
        <WorkoutNavSection>
          <Box>
            <Programs />
            <span>PROGRAMS</span>
          </Box>
          <Box>
            <Workouts />
            <span>WORKOUT</span>
          </Box>
        </WorkoutNavSection>
      </NavbarStyled>
      <Box>
        <Account />
      </Box>
    </HeaderStyled>
  );
}
