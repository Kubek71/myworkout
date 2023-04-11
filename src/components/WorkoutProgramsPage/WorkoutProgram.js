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
import { useUserData } from "../../utils/userDataContext.js";
import { Navigate } from "react-router-dom";
import { useNavigate } from "react-router-dom";

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
  const navigate = useNavigate();
  const editWorkoutPlanHandler = () => {
    navigate("/newprogram", {
      state: {
        workoutToEditName: name,
        workoutToEditDuration: duration,
        workoutToEditExercises: exercises,
      },
    });
  };
  const deleteWorkoutPlanHandler = () => {
    navigate("/deleteProgram", { state: name });
  };
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

      <EditIcon className="edit-icon" onClick={editWorkoutPlanHandler} />
      <RemoveIcon className="remove-icon" onClick={deleteWorkoutPlanHandler} />
      <SlideIcon className="slide-icon" />
    </ProgramBox>
  );
}
