import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { BiPlusMedical as NewProgramIcon } from "react-icons/bi";
import {
  ProgramPageStyled,
  Heading,
  ProgramSection,
  ProgramTitle,
  AddNewProgramButton,
} from "./styles/programPageStyled";
import WorkoutProgram from "./WorkoutProgram";
import styled from "styled-components";
import { Box } from "./styles/boxStyled.js.js";

const NewProgramBox = styled(Box)`
  gap: 0.5rem;
  font-size: 1rem;
  span {
    color: ${({ theme }) => theme.colors.primaryRed};
    font-weight: ${({ theme }) => theme.fontWeight.xBold};
  }
`;

export default function ProgramPage() {
  const navigateToNewProgramPage = useNavigate();
  const [isOpenProgramBox, setIsOpenProgramBox] = useState(false);
  const openProgramHandler = () => {
    setIsOpenProgramBox((current) => !current);
    console.log(isOpenProgramBox);
  };

  return (
    <ProgramPageStyled>
      <Heading>YOUR WORKOUT PROGRAMS</Heading>
      <ProgramSection onClick={openProgramHandler}>
        <ProgramTitle>PUSH</ProgramTitle>
        <WorkoutProgram isOpenProgramBox={isOpenProgramBox} />
      </ProgramSection>

      <AddNewProgramButton>
        <NewProgramBox
          onClick={() => {
            navigateToNewProgramPage("/newprogram");
          }}
        >
          <span>NEW</span>
          <NewProgramIcon />
        </NewProgramBox>
      </AddNewProgramButton>
    </ProgramPageStyled>
  );
}
