import React from "react";
import styled from "styled-components";
import { ProgramPageStyled as DeleteWorkoutPlanContainer } from "../../styles/programPageStyled";
import { Heading } from "../../styles/newProgramPageStyled";
import { Box } from "../../styles/boxStyled.js";
import { useLocation, useNavigate } from "react-router-dom";
import { useUserData } from "../../../utils/userDataContext";

const Button = styled.button`
  padding: 0.5rem 1rem;
  border-radius: 4px;
  color: ${({ theme }) => theme.colors.light};
  background: ${({ theme, not }) =>
    not ? theme.colors.primaryRed : theme.colors.dark};
  border: none;
  text-align: center;
  text-transform: uppercase;
`;

export default function DeleteWorkoutPlan() {
  //getting state which is a workout name that we passed in with useNavigate at WorkoutProgram.js
  const { state } = useLocation();

  //getting fn that delete workout plan with name that we pass in to the fn
  const { deleteWorkoutPlan } = useUserData();
  const navigate = useNavigate();
  const deleteWorkoutPlanHandler = () => {
    // removing workout plan from firestore collection then going back to the previous page
    deleteWorkoutPlan(state.name).then(() => {
      navigate(-1);
    });
  };
  return (
    <DeleteWorkoutPlanContainer>
      <Heading>
        Are u sure you want to remove {state.name.toLowerCase()}
      </Heading>
      <Box>
        <Button onClick={deleteWorkoutPlanHandler}>Yes</Button>
        <Button not onClick={() => navigate(-1)}>
          No
        </Button>
      </Box>
    </DeleteWorkoutPlanContainer>
  );
}
