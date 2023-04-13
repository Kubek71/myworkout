import React from "react";
import styled from "styled-components";
import {
  BiPencil as EditIcon,
  BiTrash as RemoveIcon,
  BiCaretDown as SlideIcon,
  BiDumbbell as DumbellIcon,
  BiTimeFive as TimeIcon,
} from "react-icons/bi";
import { Box } from "../styles/boxStyled.js.js";
import { ProgramBox, ProgramList } from "../styles/programPageStyled";

const ItemBox = styled(Box)`
  gap: 0.25rem;
  font-size: 0.75rem;
  span {
    color: ${({ theme }) => theme.colors.primaryRed};
    font-weight: ${({ theme }) => theme.fontWeight.xBold};
  }
`;

export default function WorkoutProgram({
  isOpenProgramBox,
  duration,
  name,
  exercises,
}) {
  return (
    <ProgramBox>
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
              <li>
                <strong>{i + 1}.</strong>
                {exercise}
              </li>
            );
          })}
        </ProgramList>
      )}

      <EditIcon className="edit-icon" />
      <RemoveIcon className="remove-icon" />
      <SlideIcon className="slide-icon" />
    </ProgramBox>
  );
}
