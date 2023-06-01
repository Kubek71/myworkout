import React, { useEffect } from "react";
import { WorkoutTable } from "../WorkoutPage/workoutPageStyled";
import { useLocation } from "react-router-dom";
import { BiNote as NoteIcon, BiTimeFive as TimeIcon } from "react-icons/bi";
import { MdOutlineMonitorWeight as WeightIcon } from "react-icons/md";
import { useState } from "react";
import styled from "styled-components";
import { Heading } from "../WorkoutProgramsPage/NewProgramPage/newProgramPageStyled";
import {
  BackButton,
  NoteContainer,
  InfoBox,
  WorkoutBox,
} from "./OpenedWorkoutStyled";
import { date } from "../../utils/getDate";
import { Box } from "../styles/boxStyled.js";
import { useNavigate } from "react-router-dom";

const Main = styled.main`
  padding: 2rem;
  max-width: 1200px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 2rem;
`;

export default function OpenedWorkout() {
  const { state } = useLocation();
  const [workout, setWorkout] = useState();
  const [renderNote, setRenderNote] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    setWorkout(state);
    state.workoutNote && setRenderNote(true);
  }, []);
  return workout ? (
    <Main>
      <BackButton onClick={() => navigate(-1)}>
        <span>Back</span>
      </BackButton>

      {renderNote && (
        <NoteContainer note>
          {workout.userWeight && (
            <span>
              <WeightIcon />
              Weight: <p>{workout.userWeight} kg</p>
            </span>
          )}

          <span>
            <NoteIcon />
            Note: <p>{workout.workoutNote}</p>
          </span>
        </NoteContainer>
      )}

      <InfoBox>
        <Heading>{date(workout.timestamp)}</Heading>
        <Box flexWrap>
          <TimeIcon /> <h2>{workout.workoutDuration}</h2>
        </Box>
      </InfoBox>

      <WorkoutBox>
        <WorkoutTable>
          {workout.exercises.map((exercise, index) => {
            return (
              <div key={index}>
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
                      <tr key={setIndex}>
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
        </WorkoutTable>
      </WorkoutBox>
    </Main>
  ) : (
    <h1>Loading...</h1>
  );
}
