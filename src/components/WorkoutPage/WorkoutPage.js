import React from "react";
import { useState, useEffect } from "react";
import { useUserData } from "../../utils/userDataContext";
import styled from "styled-components";
import { Heading } from "../WorkoutProgramsPage/NewProgramPage/newProgramPageStyled";
import { date } from "../../utils/getDate";
import { useNavigate } from "react-router-dom";
import {
  WorkoutPageStyled,
  LastWorkoutsSection,
  WorkoutDate,
  StartWorkoutLinkStyled,
} from "./workoutPageStyled";

import { Box } from "../styles/boxStyled.js.js";
import Workout from "./Workout";
import {
  BiCaretLeft as PreviousIcon,
  BiCaretRight as NextIcon,
} from "react-icons/bi";
import IsEmptyMessage from "../IsEmptyComponent/IsEmptyMessage";

const LastWorkoutsHeading = styled(Heading)`
  font-size: 0.85rem;
  text-align: left;
  padding-left: 1rem;
`;

export default function WorkoutPage() {
  const { getWorkouts, workoutArray } = useUserData();
  const [workouts, setWorkouts] = useState([]);
  const [currentWorkoutIndex, setCurrentWorkoutIndex] = useState(0);
  const [isWorkoutOpened, setIsWorkoutOpened] = useState(false);
  const [renderNote, setRenderNote] = useState(false);
  const [currentWorkout, setCurrentWorkout] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState();
  const navigate = useNavigate();
  useEffect(() => {
    if (workoutArray.length > 0) {
      navigate("/startworkout");
    } else {
      // getting 3 last workouts from firestore for current user on component's render
      getWorkouts(true)
        .then((result) => {
          setIsLoading(false);
          if (!result.empty) {
            setError();
            const userWorkouts = result.docs.map((doc) => doc.data());
            setWorkouts(userWorkouts);
            setCurrentWorkout(userWorkouts[0]);
          } else {
            setError("You dont have any workouts yet!");
          }
        })
        .catch((e) => {
          setIsLoading(false);
          setError(
            "We couldn't get your data from the server, try agian later"
          );
        });
    }
  }, []);

  useEffect(() => {
    currentWorkout && currentWorkout.workoutNote.length > 0
      ? setRenderNote(true)
      : setRenderNote(false);
  }, [currentWorkout]);
  useEffect(() => {
    // setting current workout state to a single element from workout array
    if (workouts.length > 0) {
      setCurrentWorkout(workouts[currentWorkoutIndex]);
    }
  }, [currentWorkoutIndex]);
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

  return (
    <WorkoutPageStyled>
      {!isLoading && (
        <>
          <LastWorkoutsHeading>YOUR LAST WORKOUTS</LastWorkoutsHeading>
          {currentWorkout && (
            <LastWorkoutsSection>
              <Box>
                <PreviousIcon
                  onClick={() => changeCurrentWorkoutHandler(true)}
                />
                <WorkoutDate>{date(currentWorkout.timestamp)}</WorkoutDate>
                <NextIcon onClick={() => changeCurrentWorkoutHandler(false)} />
              </Box>

              <Workout
                currentWorkout={currentWorkout}
                renderNote={renderNote}
                isWorkoutOpened={isWorkoutOpened}
                setIsWorkoutOpened={setIsWorkoutOpened}
              />
            </LastWorkoutsSection>
          )}
        </>
      )}

      {error && <IsEmptyMessage message={error} />}
      <StartWorkoutLinkStyled to="startworkout">
        Start a workout
      </StartWorkoutLinkStyled>
    </WorkoutPageStyled>
  );
}
