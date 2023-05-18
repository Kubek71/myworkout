import React, { useState } from "react";
import {
  WorkoutBox,
  WorkoutTable,
  NoteBox,
  WorkoutName,
} from "../styles/workoutPageStyled";
import styled from "styled-components";
import { Box } from "../styles/boxStyled.js";
import {
  BiNote as NoteIcon,
  BiDumbbell as DumbellIcon,
  BiTimeFive as TimeIcon,
} from "react-icons/bi";
import { MdOutlineMonitorWeight as WeightIcon } from "react-icons/md";

export const ItemBox = styled(Box)`
  gap: 0.25rem;
  font-size: 0.75rem;
  svg {
    color: ${({ theme }) => theme.colors.dark};
  }
  span {
    color: ${({ theme }) => theme.colors.dark};
    font-weight: ${({ theme }) => theme.fontWeight.xBold};
  }
`;

export default function Workout({
  currentWorkout,
  renderNote,
  isWorkoutOpened,
  setIsWorkoutOpened,
}) {
  return (
    <WorkoutBox onClick={() => setIsWorkoutOpened((current) => !current)}>
      {isWorkoutOpened ? (
        <WorkoutTable>
          {currentWorkout.exercises.map((exercise) => {
            return (
              <div>
                <thead>
                  <tr>
                    <th>Exercise</th>
                    <th>Set</th>
                    <th>Rep</th>
                    <th>Kg</th>
                  </tr>
                </thead>
                <tbody>
                  {exercise.sets.map((set, setIndex) => {
                    return (
                      <tr>
                        <td
                          className={
                            setIndex > 0 ? "sets-table-data" : "first-row"
                          }
                        >
                          {setIndex === 0 ? exercise.name : null}
                        </td>
                        <td>{setIndex + 1}</td>
                        <td>{set.rep}</td>
                        <td>{set.kg}</td>
                      </tr>
                    );
                  })}
                </tbody>
              </div>
            );
          })}
          {renderNote && (
            <>
              {currentWorkout.userWeight && (
                <NoteBox weight>
                  <span>
                    <WeightIcon />
                    Weight: {currentWorkout.userWeight} kg
                  </span>
                </NoteBox>
              )}

              <NoteBox>
                <span>
                  <NoteIcon />
                  Note:
                </span>
                <p>{currentWorkout.workoutNote}</p>
              </NoteBox>
            </>
          )}
        </WorkoutTable>
      ) : (
        <>
          <WorkoutName>{currentWorkout.programName}</WorkoutName>
          <ItemBox>
            <DumbellIcon />
            <span>{currentWorkout.exercises.length} exercises</span>
          </ItemBox>
          <ItemBox>
            <TimeIcon />
            <span>60 min</span>
          </ItemBox>
        </>
      )}
    </WorkoutBox>
  );
}
