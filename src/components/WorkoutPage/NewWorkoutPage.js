import React from "react";
import { useEffect, useState } from "react";
import styled from "styled-components";
import { WorkoutPageStyled as Main } from "../styles/workoutPageStyled";
import { Box } from "../styles/boxStyled.js";
import { BiPlusMedical as NewWorkoutIcon } from "react-icons/bi";
import { Heading } from "../styles/newProgramPageStyled";
import { useUserData } from "../../utils/userDataContext";
import StartWorkoutForm from "./StartWorkoutForm";

const ProgramsContainer = styled(Box)`
  justify-content: space-evenly;
  flex-wrap: wrap;
  width: 100%;
`;
const ProgramBox = styled(Box)`
  aspect-ratio: 1/1;
  flex-shrink: 1;
  width: clamp(4rem, 30%, 150px);
  border-radius: 5px;
  font-weight: ${({ theme }) => theme.fontWeight.xBold};
  background: ${({ theme }) => theme.colors.light};
  color: ${({ theme }) => theme.colors.primaryRed};
  padding: 1rem;
  word-break: break-all;

  svg {
    color: ${({ theme }) => theme.colors.primaryRed};
    font-size: clamp(2rem, 5vw, 4rem);
  }

  span {
    font-size: clamp(10px, 3vw, 2rem);
  }
`;
export default function NewWorkoutPage() {
  const [choosedWorkoutTable, setChoosedWorkoutTable] = useState();
  const { getWorkoutProgram } = useUserData();
  const getWorkoutPlansHandler = (e) => {
    const workoutPlanName = e.target.firstChild.innerText;
    getWorkoutProgram(workoutPlanName)
      .then((workoutProgram) => {
        setChoosedWorkoutTable(workoutProgram.data());
      })
      .catch((e) => console.log(e));
  };

  useEffect(() => {
    console.log(choosedWorkoutTable);
  }, [choosedWorkoutTable]);

  return (
    <Main>
      {!choosedWorkoutTable ? (
        <>
          <Heading>Choose your workout program</Heading>
          <ProgramsContainer>
            <ProgramBox onClick={getWorkoutPlansHandler}>
              <span>PUSH</span>
            </ProgramBox>
            <ProgramBox>
              <span>123456789111</span>
            </ProgramBox>
            <ProgramBox>
              <NewWorkoutIcon />
            </ProgramBox>
          </ProgramsContainer>
        </>
      ) : (
        <StartWorkoutForm choosedWorkoutTable={choosedWorkoutTable} />
      )}
    </Main>
  );
}
