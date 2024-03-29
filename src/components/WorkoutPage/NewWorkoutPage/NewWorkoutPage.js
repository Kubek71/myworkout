import React from "react";
import { useState, useEffect } from "react";
import styled from "styled-components";
import { WorkoutPageStyled as Main } from "../workoutPageStyled";
import { Box } from "../../styles/boxStyled.js.js";
import { BiPlusMedical as NewWorkoutIcon } from "react-icons/bi";
import { Heading } from "../../WorkoutProgramsPage/NewProgramPage/newProgramPageStyled";
import { useUserData } from "../../../utils/userDataContext";
import StartWorkoutForm from "./StartWorkoutForm";
import { useNavigate } from "react-router-dom";

const ProgramsContainer = styled(Box)`
  justify-content: space-evenly;
  flex-wrap: wrap;
  width: 100%;
`;
const ProgramButton = styled.button`
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
  const { getWorkoutPlans, setWorkoutArray } = useUserData();
  const [userWorkoutPlans, setUserWorkoutPlans] = useState([]);
  const [timestamp, setTimestamp] = useState();

  useEffect(() => {
    const choosedPlanFromLocalStorage =
      window.localStorage.getItem("choosedWorkoutPlan");
    choosedPlanFromLocalStorage !== null
      ? setChoosedWorkoutTable(JSON.parse(choosedPlanFromLocalStorage))
      : setWorkoutArray([]);
    if (userWorkoutPlans.length === 0) {
      // getting all docs from the workoutplans collections for current user
      getWorkoutPlans()
        .then((result) => {
          const plans = result.docs.map((doc) => doc.data());
          setUserWorkoutPlans(plans);
        })
        .catch((error) => console.log(error));
    }
    return;
  }, []);

  useEffect(() => {
    if ((choosedWorkoutTable, timestamp)) {
      window.localStorage.setItem(
        "choosedWorkoutPlan",
        JSON.stringify(choosedWorkoutTable)
      );
      window.localStorage.setItem("workoutStartTime", timestamp);
    }
  }, [choosedWorkoutTable]);

  const getWorkoutPlansHandler = (e) => {
    const workoutPlanName = e.target.firstChild.innerText;
    // reducing user workout plans table to a single workout plan that was clicked

    setChoosedWorkoutTable(
      ...userWorkoutPlans.filter(
        (workoutPlan) => workoutPlan.name === workoutPlanName
      )
    );
    // setting start workout time
    setTimestamp(Date.now());
  };
  const navigate = useNavigate();

  return (
    <Main>
      {!choosedWorkoutTable ? (
        <>
          <Heading>Choose your workout program</Heading>
          <ProgramsContainer>
            {userWorkoutPlans.map((workoutPlan, i) => {
              return (
                <ProgramButton onClick={getWorkoutPlansHandler} key={i}>
                  <span>{workoutPlan.name}</span>
                </ProgramButton>
              );
            })}
            <ProgramButton
              onClick={() => navigate("../workoutprograms/newprogram")}
            >
              <NewWorkoutIcon />
            </ProgramButton>
          </ProgramsContainer>
        </>
      ) : (
        <StartWorkoutForm choosedWorkoutTable={choosedWorkoutTable} />
      )}
    </Main>
  );
}
