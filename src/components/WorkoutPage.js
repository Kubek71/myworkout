import React from "react";
import { useState, useEffect } from "react";
import styled from "styled-components";
import { Heading } from "./styles/newProgramPageStyled";
import {
  WorkoutPageStyled,
  LastWorkoutsSection,
  WorkoutDate,
  WorkoutContainer,
  WorkoutName,
} from "./styles/workoutPageStyled";
import { ProgramBox } from "./styles/programPageStyled";
import { Box } from "./styles/boxStyled.js";
import {
  BiCaretLeft as PreviousIcon,
  BiCaretRight as NextIcon,
  BiDumbbell as DumbellIcon,
  BiTimeFive as TimeIcon,
} from "react-icons/bi";

const ItemBox = styled(Box)`
  gap: 0.25rem;
  font-size: 0.75rem;
  span {
    color: ${({ theme }) => theme.colors.primaryRed};
    font-weight: ${({ theme }) => theme.fontWeight.xBold};
  }
`;

const LastWorkoutsHeading = styled(Heading)`
  font-size: 0.85rem;
  text-align: left;
  padding-left: 1rem;
`;

export default function WorkoutPage() {
  return (
    <WorkoutPageStyled>
      <LastWorkoutsHeading>YOUR LAST WORKOUTS</LastWorkoutsHeading>
      <LastWorkoutsSection>
        <Box>
          <PreviousIcon />
          <WorkoutDate>10.03</WorkoutDate>
          <NextIcon />
        </Box>

        <ProgramBox>
          <WorkoutName>PULL</WorkoutName>
          <ItemBox>
            <DumbellIcon />
            <span>6 exercises</span>
          </ItemBox>
          <ItemBox>
            <TimeIcon />
            <span>60 min</span>
          </ItemBox>
        </ProgramBox>
      </LastWorkoutsSection>
    </WorkoutPageStyled>
  );
}
