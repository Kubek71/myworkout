import React, { useState, useEffect } from "react";
import { Main } from "../styles/global/MainStyled";
import { Box } from "../styles/boxStyled.js";
import { date } from "../../utils/getDate";
import {
  Heading,
  ProgramSection,
  StatsSection,
  StatMethodButton,
} from "./AnalitycsPageStyled";
import { WorkoutPlanButton } from "../HistoryPage/HistoryPageStyled";
import styled from "styled-components";
import { useUserData } from "../../utils/userDataContext";
import IsEmptyMessage from "../IsEmptyComponent/IsEmptyMessage";
import { StartWorkoutLinkStyled } from "../WorkoutPage/workoutPageStyled";

const ProgramBox = styled(Box)`
  width: 100%;
  color: ${({ theme }) => theme.colors.light};
  border-bottom: 1px solid ${({ theme }) => theme.colors.light};
  padding: 1rem 0;
`;
const StatMethodBox = styled(Box)`
  width: 100%;
  color: ${({ theme }) => theme.colors.light};
  padding: 1rem;
  flex-direction: column;
`;

const WorkoutBox = styled(Box)`
  flex-direction: column;
  align-items: flex-start;
  text-transform: capitalize;
  gap: 0.5rem;
  & > div {
    width: 100%;
    justify-content: space-between;
  }
  span {
    color: ${({ theme }) => theme.colors.primaryRed};
    font-size: ${({ fontSize }) => (fontSize ? fontSize : "1rem")};
  }
`;

export default function AnalitycsPage() {
  const [workoutPlans, setWorkoutPlans] = useState([]);
  const [workouts, setWorkouts] = useState([]);
  const [activeWorkoutPlan, setActiveWorkoutPlan] = useState();
  const [activeStatMethod, setActiveStatMethod] = useState(0);
  const [error, setError] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const { getWorkoutPlans, getExercises } = useUserData();

  const changeWorkoutPlanHandler = (e) => {
    const workoutPlanName = e.target.innerText;
    // reducing user workout plans array to a single workout plan that was clicked and setting workout array empty
    const newPlan = workoutPlans.find((el) => el.name === workoutPlanName);
    setActiveWorkoutPlan(newPlan);
  };

  useEffect(() => {
    getWorkoutPlans()
      .then((result) => {
        if (!result.empty) {
          const plans = result.docs.map((doc) => doc.data());
          setWorkoutPlans(plans);
          setActiveWorkoutPlan(plans[0]);
        } else {
          setIsLoading(false);
          setError(
            "Start working out and track your workout stats right here!"
          );
        }
      })
      .catch((e) => {
        setIsLoading(false);
        setError("We couldn't get your data from the server, try agian later");
      });
  }, []);

  useEffect(() => {
    // setting workouts array for choosed workout plan on button click
    if (activeWorkoutPlan) {
      activeWorkoutPlan.exercises.forEach((exercise) => {
        setWorkouts([]);
        getExercises(exercise)
          .then((result) => {
            setIsLoading(false);
            const resultObject = result.data();
            setWorkouts((current) => [
              ...current,
              { [exercise]: resultObject.values },
            ]);
          })
          .catch((e) => {
            setIsLoading(false);
            setError(
              "We couldn't get your data from the server, try agian later"
            );
          });
      });
    } else return;
  }, [activeWorkoutPlan]);

  // finding max volume workout for each exercise
  const calculateMaxResult = (exerciseData) => {
    let maxResult = 0;
    let maxResultData = null;
    Object.entries(exerciseData).forEach(([date, sets]) => {
      sets.forEach((set) => {
        const result = parseInt(set.kg) * parseInt(set.rep);
        if (result > maxResult) {
          maxResult = result;
          maxResultData = {
            date,
            rep: set.rep,
            kg: set.kg,
          };
        }
      });
    });
    return maxResultData;
  };

  // finding 1 rep max workout for each exercise
  const findMax1rep = (exerciseData) => {
    let maxRep1 = null;
    Object.entries(exerciseData).forEach(([date, sets]) => {
      sets.forEach((set) => {
        if (set.rep === "1") {
          if (!maxRep1 || parseInt(set.kg) > parseInt(maxRep1.kg)) {
            maxRep1 = {
              date,
              rep: set.rep,
              kg: set.kg,
            };
          }
        }
      });
    });
    return maxRep1;
  };

  return (
    <Main column>
      <Heading>Your personal stats</Heading>
      {!isLoading && !error ? (
        <>
          <ProgramSection>
            <ProgramBox>
              {workoutPlans.map((workoutPlan, index) => {
                return (
                  <WorkoutPlanButton
                    key={index}
                    onClick={changeWorkoutPlanHandler}
                    active={workoutPlan.name === activeWorkoutPlan.name}
                  >
                    {workoutPlan.name}
                  </WorkoutPlanButton>
                );
              })}
            </ProgramBox>
          </ProgramSection>
          <StatsSection>
            <StatMethodBox justifyContent="space-between">
              <Box>
                <StatMethodButton
                  onClick={() => setActiveStatMethod(0)}
                  active={activeStatMethod === 0 ? true : false}
                >
                  1RM
                </StatMethodButton>
                <StatMethodButton
                  onClick={() => setActiveStatMethod(1)}
                  active={activeStatMethod === 1 ? true : false}
                >
                  Highest volume
                </StatMethodButton>
              </Box>
            </StatMethodBox>

            {activeStatMethod === 1
              ? workouts.map((exercise) => {
                  const exerciseName = Object.keys(exercise)[0];
                  const exerciseData = Object.values(exercise)[0];
                  const maxResultData = calculateMaxResult(exerciseData);

                  return (
                    maxResultData && (
                      <Box
                        key={exerciseName}
                        gap="2rem"
                        justifyContent="space-between"
                      >
                        <WorkoutBox fontSize="0.75rem">
                          <p>{exerciseName}</p>
                          <span>{date(maxResultData.date)}</span>
                        </WorkoutBox>

                        <WorkoutBox>
                          <Box>
                            <p>Rep</p>
                            <p>Kg</p>
                          </Box>
                          <Box>
                            <span>{maxResultData.rep}</span>
                            <span>{maxResultData.kg}</span>
                          </Box>
                        </WorkoutBox>
                      </Box>
                    )
                  );
                })
              : workouts.map((exercise) => {
                  const exerciseName = Object.keys(exercise)[0];
                  const exerciseData = Object.values(exercise)[0];
                  const maxRep1 = findMax1rep(exerciseData);

                  return (
                    maxRep1 && (
                      <Box
                        key={exerciseName}
                        gap="2rem"
                        justifyContent="space-between"
                      >
                        <WorkoutBox fontSize="0.75rem">
                          <p>{exerciseName}</p>
                          <span>{date(maxRep1.date)}</span>
                        </WorkoutBox>

                        <WorkoutBox>
                          <Box>
                            <p>Rep</p>
                            <p>Kg</p>
                          </Box>
                          <Box>
                            <span>{maxRep1.rep}</span>
                            <span>{maxRep1.kg}</span>
                          </Box>
                        </WorkoutBox>
                      </Box>
                    )
                  );
                })}

            <Box></Box>
          </StatsSection>
        </>
      ) : (
        <IsEmptyMessage message={error} />
      )}
      <StartWorkoutLinkStyled to="../startworkout">
        Start a workout
      </StartWorkoutLinkStyled>
    </Main>
  );
}
