import React, { useEffect } from "react";
import { Heading } from "../../styles/newProgramPageStyled";
import { BiNote as NoteIcon } from "react-icons/bi";
import { WorkoutPageStyled as Main } from "../../styles/workoutPageStyled";
import { Box } from "../../styles/boxStyled.js";
import {
  NoteForm,
  NoteBox,
  Button,
  NoteSection,
  NoteSpan,
} from "../../styles/saveWorkoutStyled";
import { useState } from "react";
import { SaveButton } from "./StartWorkoutForm";
import { useUserData } from "../../../utils/userDataContext";
import { getTodaysDate, getTimestamp } from "../../../utils/getDate";
import { useNavigate, useLocation } from "react-router-dom";

export default function SaveWorkout() {
  const [isNoteRendered, setIsNoteRendered] = useState(false);
  const [note, setNote] = useState();
  const [weight, setWeight] = useState();
  const { workoutArray, addWorkout, setWorkoutArray } = useUserData();
  const { state } = useLocation();
  const navigate = useNavigate();

  // saving workout to a database with imported firestore method from userDataContext.js
  const saveWorkoutToFirestore = (e) => {
    e.preventDefault();

    const programName = state.planName;
    addWorkout(Date.now(), note ? note : "", weight ? weight : "", programName)
      .then(() => {
        window.localStorage.removeItem("workout");
        window.localStorage.removeItem("choosedWorkoutPlan");
        setWorkoutArray([]);
        navigate("/workouts");
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
