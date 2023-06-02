import React, { useEffect, useState } from "react";
import { Heading } from "../../WorkoutProgramsPage/NewProgramPage/newProgramPageStyled";
import { BiNote as NoteIcon } from "react-icons/bi";
import { WorkoutPageStyled as Main } from "../workoutPageStyled";
import { Box } from "../../styles/boxStyled.js";
import {
  NoteForm,
  NoteBox,
  Button,
  NoteSection,
  NoteSpan,
} from "./saveWorkoutStyled";
import { SaveButton } from "./StartWorkoutForm";
import { useUserData } from "../../../utils/userDataContext";
import { useNavigate, useLocation } from "react-router-dom";
import { timeDistance } from "../../../utils/getDate";
import useCancelWorkout from "../useCancelWorkout";

export default function SaveWorkout() {
  const [isNoteRendered, setIsNoteRendered] = useState(false);
  const [note, setNote] = useState();
  const [weight, setWeight] = useState();
  const { workoutArray, addWorkout, updateWeight, updateExercisesArray } =
    useUserData();
  const { state } = useLocation();
  const navigate = useNavigate();
  const cancelWorkout = useCancelWorkout();

  // saving workout to a database with imported firestore method from userDataContext.js
  const saveWorkoutToFirestore = (e) => {
    e.preventDefault();
    const workoutDuration = timeDistance(
      parseInt(window.localStorage.getItem("workoutStartTime"))
    );
    const programName = state.planName;

    addWorkout(
      Date.now(),
      note ? note : "",
      weight ? weight : "",
      programName,
      workoutDuration
    )
      .then(async () => {
        await workoutArray.forEach((exercise) => {
          updateExercisesArray(exercise.name.toLowerCase(), exercise.sets);
        });
        weight > 0
          ? updateWeight(weight).then(() => {
              // removing all values form local storage, setting workout array empty and navigating to workout page
              cancelWorkout();
            })
          : cancelWorkout();
      })
      .catch((e) => console.log(e));
  };

  const handleNoteOnChange = (e) => {
    setNote(e.target.value);
  };
  const handleWeightOnChange = (e) => {
    setWeight(e.target.value);
  };

  // if workoutArray is empty, navigate to the startworkout page (prevents from pushing an empty workout to the firestore database)
  useEffect(() => {
    if (workoutArray.length === 0) navigate("/startworkout");
  }, [workoutArray]);
  return (
    <Main>
      {isNoteRendered ? (
        <>
          <NoteSpan>
            Pin a <NoteIcon /> for your workout!
          </NoteSpan>
          <NoteForm onSubmit={saveWorkoutToFirestore}>
            <NoteSection>
              <textarea
                required
                rows="3"
                onChange={handleNoteOnChange}
                placeholder="Note..."
              />
            </NoteSection>
            <input
              type="number"
              placeholder="Today's weight:"
              required
              onChange={handleWeightOnChange}
            />
            <SaveButton type="submit">Save your workout</SaveButton>
          </NoteForm>
        </>
      ) : (
        <>
          <NoteBox>
            <Heading>Do you want to add a note ?</Heading>
            <NoteIcon />
          </NoteBox>
          <Box>
            <Button
              positive
              onClick={() => setIsNoteRendered((current) => !current)}
            >
              Yes
            </Button>
            <Button onClick={saveWorkoutToFirestore}>NO</Button>
          </Box>
        </>
      )}
    </Main>
  );
}
