import React from "react";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { BiPlusMedical as NewProgramIcon } from "react-icons/bi";
import {
  ProgramPageStyled,
  Heading,
  ProgramSection,
  ProgramTitle,
  AddNewProgramButton,
} from "../styles/programPageStyled";
import WorkoutProgram from "./WorkoutProgram";
import styled from "styled-components";
import { Box } from "../styles/boxStyled.js.js";
import { useUserData } from "../../utils/userDataContext";
import { useAuth } from "../../utils/authContext";
const NewProgramBox = styled(Box)`
  gap: 0.5rem;
  font-size: 1rem;
  span {
    color: ${({ theme }) => theme.colors.primaryRed};
    font-weight: ${({ theme }) => theme.fontWeight.xBold};
  }
`;

export default function ProgramPage() {
  const { currentUser } = useAuth();
  const { getWorkoutPlans } = useUserData();
  const navigateToNewProgramPage = useNavigate();
  const [isOpenProgramBox, setIsOpenProgramBox] = useState(false);
  const [workoutPlan, setWorkoutPlan] = useState([]);
  const openProgramHandler = () => {
    setIsOpenProgramBox((current) => !current);
    console.log(isOpenProgramBox);
  };

  useEffect(() => {
    if (workoutPlan.length === 0) {
      // getting all docs from the workoutplans collections for current user
      getWorkoutPlans()
        .then((result) => {
          const plans = result.docs.map((doc) => doc.data());
          setWorkoutPlan(plans);
        })
        .catch((error) => console.log(error));
    }
    return;
  }, []);

  return (
    <ProgramPageStyled>
      <Heading>YOUR WORKOUT PROGRAMS</Heading>
      <ProgramSection onClick={openProgramHandler}>
        {workoutPlan.length > 0 &&
          workoutPlan.map((plan) => {
            const { duration, name, exercises } = plan;
            return (
              <>
                <ProgramTitle>{name}</ProgramTitle>
                <WorkoutProgram
                  isOpenProgramBox={isOpenProgramBox}
                  duration={duration}
                  name={name}
                  exercises={exercises}
                />
              </>
            );
          })}
      </ProgramSection>

      <AddNewProgramButton>
        <NewProgramBox
          onClick={() => {
            navigateToNewProgramPage("/newprogram");
          }}
        >
          <span>NEW</span>
          <NewProgramIcon />
        </NewProgramBox>
      </AddNewProgramButton>
    </ProgramPageStyled>
  );
}
