import React, { useEffect } from "react";
import { Heading } from "../../styles/newProgramPageStyled";
import { BiNote as NoteIcon } from "react-icons/bi";
import { WorkoutPageStyled as Main } from "../../styles/workoutPageStyled";
import { Box } from "../../styles/boxStyled.js";
import styled from "styled-components";
import { useState } from "react";
import { SaveButton } from "./StartWorkoutForm";
import { useUserData } from "../../../utils/userDataContext";

const NoteBox = styled(Box)`
  svg {
    color: ${({ theme }) => theme.colors.primaryRed};
  }
`;

const NoteForm = styled.form`
  width: 100%;
  max-width: 600px;
  textarea,
  input {
    color: ${({ theme }) => theme.colors.dark};
    background: none;
    font-size: 1rem;
    width: 100%;
    display: block;
    border: none;
  }
  input {
    background: ${({ theme }) => theme.colors.light};
    border-radius: 5px;
    padding: 0.5rem;
    margin-bottom: 1rem;
    width: clamp(8rem, 25vw, 150px);
  }
`;

const Button = styled.button`
  padding: 0.5rem;
  color: ${({ theme }) => theme.colors.light};
  font-weight: ${({ theme }) => theme.fontWeight.xBold};
  border-radius: 5px;
  background: ${({ theme, positive }) =>
    positive ? theme.colors.primaryRed : theme.colors.dark};
`;

const NoteSection = styled.div`
  background: ${({ theme }) => theme.colors.light};
  border-radius: 5px;
  width: 100%;
  padding: 0.5rem;
  margin-bottom: 2rem;
`;

const NoteSpan = styled.span`
  color: ${({ theme }) => theme.colors.light};
  svg {
    color: ${({ theme }) => theme.colors.primaryRed};
    font-size: 1rem;
    margin-inline: 0.5rem;
  }
`;
export default function SaveWorkout() {
  const [isNoteRendered, setIsNoteRendered] = useState(false);
  const [note, setNote] = useState();
  const [weight, setWeight] = useState();
  const { workoutArray, setWorkoutArray } = useUserData();
  const saveWorkoutToFirestore = (e) => {
    e.preventDefault();

    console.log({
      Exercises: workoutArray,
      userWeight: weight ? weight : "",
      note: note ? note : "",
    });
  };

  const handleNoteOnChange = (e) => {
    setNote(e.target.value);
  };
  const handleWeightOnChange = (e) => {
    setWeight(e.target.value);
  };

  useEffect(() => {
    console.log(workoutArray);
  }, [workoutArray]);
  return (
    <Main>
      {!isNoteRendered ? (
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
