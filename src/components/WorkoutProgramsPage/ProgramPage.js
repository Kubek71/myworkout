import React from "react";
import { useState, useEffect } from "react";
import { BiPlusMedical as NewProgramIcon } from "react-icons/bi";
import {
  ProgramPageStyled,
  Heading,
  ProgramSection,
  ProgramTitle,
} from "./programPageStyled";
import { StartWorkoutLinkStyled } from "../WorkoutPage/workoutPageStyled";
import WorkoutProgram from "./WorkoutProgram";
import styled from "styled-components";
import { Box } from "../styles/boxStyled.js.js";
import { useUserData } from "../../utils/userDataContext";
import { Link } from "react-router-dom";
import IsEmptyMessage from "../IsEmptyComponent/IsEmptyMessage";
const NewProgramBox = styled(Box)`
  gap: 0.5rem;
  font-size: 1rem;
  span {
    color: ${({ theme }) => theme.colors.primaryRed};
    font-weight: ${({ theme }) => theme.fontWeight.xBold};
  }
`;

export default function ProgramPage() {
  const { getWorkoutPlans } = useUserData();
  const [workoutPlan, setWorkoutPlan] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState();

  useEffect(() => {
    if (workoutPlan.length === 0) {
      // getting all docs from the workoutplans collections for current user
      getWorkoutPlans()
        .then((result) => {
          setIsLoading(false);
          if (!result.empty) {
            setError();
            const plans = result.docs.map((doc) => doc.data());
            setWorkoutPlan(plans);
          } else setError("You dont have any workout programs yet");
        })
        .catch((e) => {
          setIsLoading(false);
          setError(
            "We couldn't get your data from the server, try agian later"
          );
        });
    } else return;
  }, []);

  return (
    !isLoading && (
      <ProgramPageStyled>
        <Heading>YOUR WORKOUT PROGRAMS</Heading>
        <ProgramSection>
          {workoutPlan.length > 0 &&
            workoutPlan.map((plan, index) => {
              const { duration, name, exercises } = plan;
              return (
                <div className="outer-div" key={index}>
                  <ProgramTitle>{name}</ProgramTitle>
                  <WorkoutProgram
                    duration={duration}
                    name={name}
                    exercises={exercises}
                  />
                </div>
              );
            })}
          {error && <IsEmptyMessage message={error} />}
        </ProgramSection>

        <Link to="newprogram">
          <NewProgramBox>
            <span>NEW</span>
            <NewProgramIcon />
          </NewProgramBox>
        </Link>
        {!error && (
          <StartWorkoutLinkStyled to="../startworkout">
            Start a workout
          </StartWorkoutLinkStyled>
        )}
      </ProgramPageStyled>
    )
  );
}
