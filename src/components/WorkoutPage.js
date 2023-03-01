import React from "react";
import { useState } from "react";
import styled from "styled-components";
import {
  BiPencil as EditIcon,
  BiTrash as RemoveIcon,
  BiCaretDown as SlideIcon,
  BiDumbbell as DumbellIcon,
  BiTimeFive as TimeIcon,
} from "react-icons/bi";
import {
  WorkoutPageStyled,
  Heading,
  ProgramSection,
  ProgramBox,
  ProgramTitle,
  ProgramList,
} from "./styles/workoutPageStyled";
import { Box } from "./styles/boxStyled.js";

const ItemBox = styled(Box)`
  gap: 0.25rem;
  font-size: 0.75rem;
  span {
    color: ${({ theme }) => theme.colors.primaryRed};
    font-weight: ${({ theme }) => theme.fontWeight.xBold};
  }
`;

export default function WorkoutPage() {
  const [isOpenProgramBox, setIsOpenProgramBox] = useState(false);
  const openProgramHandler = () => {
    setIsOpenProgramBox((current) => !current);
    console.log(isOpenProgramBox);
  };

  return (
    <WorkoutPageStyled>
      <Heading>YOUR WORKOUT PROGRAMS</Heading>
      <ProgramSection onClick={openProgramHandler}>
        <ProgramTitle>PUSH</ProgramTitle>
        <ProgramBox>
          {isOpenProgramBox === false ? (
            <>
              <ItemBox>
                <DumbellIcon />
                <span>6 exercises</span>
              </ItemBox>
              <ItemBox>
                <TimeIcon />
                <span>60 min</span>
              </ItemBox>
            </>
          ) : (
            isOpenProgramBox === true && (
              <ProgramList>
                <li>
                  <strong>1.</strong>BENCH PRESS
                </li>
                <li>
                  <strong>2.</strong>OVER HEAD PRESS
                </li>
                <li>
                  <strong>3.</strong>TRICEPS DIPS
                </li>
              </ProgramList>
            )
          )}

          <EditIcon className="edit-icon" />
          <RemoveIcon className="remove-icon" />
          <SlideIcon className="slide-icon" />
        </ProgramBox>
      </ProgramSection>
    </WorkoutPageStyled>
  );
}
