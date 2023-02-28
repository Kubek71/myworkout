import React from "react";
import styled from "styled-components";
import {
  BiPencil as EditIcon,
  BiTrash as RemoveIcon,
  BiCaretDown as SlideIcon,
} from "react-icons/bi";
import {
  WorkoutPageStyled,
  Heading,
  ProgramSection,
  ProgramBox,
  ProgramTitle,
  ProgramList,
} from "./styles/workoutPageStyled";

export default function WorkoutPage() {
  return (
    <WorkoutPageStyled>
      <Heading>YOUR WORKOUT PROGRAMS</Heading>
      <ProgramSection>
        <ProgramTitle>PUSH</ProgramTitle>
        <ProgramBox>
          <ProgramList>
            <li>
              <strong>1.</strong>WYCISKANIE
            </li>
            <li>
              <strong>2.</strong>OVER HEAD PRESS
            </li>
            <li>
              <strong>3.</strong>DIPY
            </li>
          </ProgramList>
          <EditIcon className="edit-icon" />
          <RemoveIcon className="remove-icon" />
          <SlideIcon className="slide-icon" />
        </ProgramBox>
      </ProgramSection>
    </WorkoutPageStyled>
  );
}
