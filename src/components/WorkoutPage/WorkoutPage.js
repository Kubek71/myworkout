import React from "react";
import { useState, useEffect } from "react";
import { useUserData } from "../../utils/userDataContext";
import styled from "styled-components";
import { Heading } from "../styles/newProgramPageStyled";
import { date } from "../../utils/getDate";
import { fromUnixTime, format } from "date-fns";
import { Outlet } from "react-router-dom";
import {
  WorkoutPageStyled,
  LastWorkoutsSection,
  WorkoutDate,
  WorkoutName,
  StartWorkoutButton,
  WorkoutBox,
  StartWorkoutLink,
  NoteBox,
  WorkoutTable,
} from "../styles/workoutPageStyled";
import { BiNote as NoteIcon } from "react-icons/bi";
import { MdOutlineMonitorWeight as WeightIcon } from "react-icons/md";
import { ProgramBox } from "../styles/programPageStyled";
import { Box } from "../styles/boxStyled.js.js";
import {
  BiCaretLeft as PreviousIcon,
  BiCaretRight as NextIcon,
  BiDumbbell as DumbellIcon,
  BiTimeFive as TimeIcon,
} from "react-icons/bi";

const ItemBox = styled(Box)`
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

const LastWorkoutsHeading = styled(Heading)`
  font-size: 0.85rem;
  text-align: left;
  padding-left: 1rem;
`;

export default function WorkoutPage() {
  const { getWorkouts } = useUserData();
  const [workouts, setWorkouts] = useState([]);
  const [currentWorkoutIndex, setCurrentWorkoutIndex] = useState(0);
  const [isWorkoutOpened, setIsWorkoutOpened] = useState(false);
  const [renderNote, setRenderNote] = useState(false);
  const [currentWorkout, setCurrentWorkout] = useState();
  useEffect(() => {
    // getting 3 last workouts from firestore for current user on component's render
    getWorkouts(true)
      .then((result) => {
        const userWorkouts = result.docs.map((doc) => doc.data());
        setWorkouts(userWorkouts);
        setCurrentWorkout(userWorkouts[0]);
        console.log(userWorkouts);
        const date = Math.round(userWorkouts[0].timestamp / 1000);
        console.log(fromUnixTime(date));
      })
      .catch((e) => {
        console.log(e);
      });
  }, []);

  useEffect(() => {
    currentWorkout && currentWorkout.workoutNote.length > 0
      ? setRenderNote(true)
      : setRenderNote(false);
  }, [currentWorkout]);
  const changeCurrentWorkoutHandler = (previous) => {
    // choosing an index of workout in array to display on buttons click < , >
    previous
      ? setCurrentWorkoutIndex((current) =>
          current === 0 ? workouts.length - 1 : current - 1
        )
      : setCurrentWorkoutIndex((current) =>
          current === workouts.length - 1 ? 0 : current + 1
        );

    setIsWorkoutOpened(false);
  };

  useEffect(() => {
    // setting current workout state to a single element from workout array
    if (workouts.length > 0) {
      setCurrentWorkout(workouts[currentWorkoutIndex]);
    }
  }, [currentWorkoutIndex]);
  return (
    <WorkoutPageStyled>
      <LastWorkoutsHeading>YOUR LAST WORKOUTS</LastWorkoutsHeading>
      {currentWorkout && (
        <LastWorkoutsSection>
          <Box>
            <PreviousIcon onClick={() => changeCurrentWorkoutHandler(true)} />
            <WorkoutDate>{date(currentWorkout.timestamp)}</WorkoutDate>
            <NextIcon onClick={() => changeCurrentWorkoutHandler(false)} />
          </Box>

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
        </LastWorkoutsSection>
      )}
      <StartWorkoutLink to="startworkout">START A WORKOUT</StartWorkoutLink>
    </WorkoutPageStyled>
  );
}
