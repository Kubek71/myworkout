import React, { useEffect } from "react";
import { WorkoutTable, NoteBox } from "../styles/workoutPageStyled";
import { useLocation } from "react-router-dom";
import { BiNote as NoteIcon, BiTimeFive as TimeIcon } from "react-icons/bi";
import { MdOutlineMonitorWeight as WeightIcon } from "react-icons/md";
import { useState } from "react";
import styled from "styled-components";
import { Heading } from "../styles/newProgramPageStyled";
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

const WorkoutBox = styled.section`
  border-radius: 5px;
  background: ${({ theme }) => theme.colors.light};
  cursor: pointer;
  width: 100%;
  max-width: 1000px;
`;

const InfoBox = styled(Box)`
  width: 100%;
  h2 {
    padding: 0.5rem;
    font-size: 2rem;
  }
  div {
    display: flex;
    width: 100%;
    color: ${({ theme }) => theme.colors.light};
    font-size: 1.5rem;
    svg {
      font-size: 2.5rem;
      color: ${({ theme }) => theme.colors.primaryRed};
    }
  }
`;
const NoteContainer = styled.div`
  background: ${({ theme }) => theme.colors.light};
  max-width: 600px;
  padding: 1.5rem;
  border-radius: 5px;
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  span {
    color: ${({ theme }) => theme.colors.primaryRed};
    font-weight: ${({ theme }) => theme.fontWeight.xBold};
    text-transform: uppercase;
    display: block;
    width: 100%;

    p {
      color: ${({ theme }) => theme.colors.dark};
    }
  }
  svg {
    color: ${({ theme }) => theme.colors.dark};
  }
`;
export const BackButton = styled.button`
  color: ${({ theme }) => theme.colors.light};
  text-transform: uppercase;
  font-size: ${({ fontSize }) => (fontSize ? fontSize : "1.25rem")};
  width: 100%;
  display: block;
  text-align: ${({ textAlign }) => (textAlign ? textAlign : "left")};
  padding: 0.25rem 1rem;
  font-weight: ${({ theme }) => theme.fontWeight.xBold};

  span {
    position: relative;
    z-index: 100;
    &::after {
      content: "";
      width: 2em;
      right: 50%;
      transform: translateX(calc(50% - 1rem));
      bottom: -5px;
      height: 5px;
      border-radius: 1px;
      background: ${({ theme }) => theme.colors.primaryRed};
      position: absolute;
      z-index: 0;
    }
  }
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
        <Box>
          <TimeIcon /> <h2>3:58</h2>
        </Box>
      </InfoBox>

      <WorkoutBox>
        <WorkoutTable>
          {workout.exercises.map((exercise) => {
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
        </WorkoutTable>
      </WorkoutBox>
    </Main>
  ) : (
    <h1>nie ma jeszcze</h1>
  );
}
