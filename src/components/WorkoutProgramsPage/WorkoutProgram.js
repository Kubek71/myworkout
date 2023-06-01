import React, { useState } from "react";
import styled from "styled-components";
import {
  BiPencil as EditIcon,
  BiTrash as RemoveIcon,
  BiCaretDown as SlideIcon,
  BiDumbbell as DumbellIcon,
  BiTimeFive as TimeIcon,
} from "react-icons/bi";
import { Box } from "../styles/boxStyled.js.js";
import { ProgramBox, ProgramList } from "./programPageStyled";

import { Link } from "react-router-dom";

const ItemBox = styled(Box)`
  gap: 0.25rem;
  font-size: 0.75rem;
  span {
    color: ${({ theme }) => theme.colors.primaryRed};
    font-weight: ${({ theme }) => theme.fontWeight.xBold};
  }
`;

export default function WorkoutProgram({ duration, name, exercises }) {
  const [isOpenProgramBox, setIsOpenProgramBox] = useState(false);
  return (
    <ProgramBox onClick={() => setIsOpenProgramBox((current) => !current)}>
      {isOpenProgramBox === false ? (
        <>
          <ItemBox>
            <DumbellIcon />
            <span>{exercises.length} exercises</span>
          </ItemBox>
          <ItemBox>
            <TimeIcon />
            <span>{duration} min</span>
          </ItemBox>
        </>
      ) : (
        <ProgramList justifyItemsLeft>
          {exercises.map((exercise, i) => {
            return (
              <li key={i}>
                <strong>{i + 1}.</strong>
                {exercise}
              </li>
            );
          })}
        </ProgramList>
      )}
      <Link
        to="newprogram"
        state={{
          workoutToEditName: name,
          workoutToEditDuration: duration,
          workoutToEditExercises: exercises,
        }}
      >
        <EditIcon className="edit-icon" />
      </Link>
      <Link to="deleteProgram" state={{ name: name }}>
        <RemoveIcon className="remove-icon" />
      </Link>

      <SlideIcon className="slide-icon" />
    </ProgramBox>
  );
}
