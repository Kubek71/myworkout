import React from "react";
import { useEffect, useState } from "react";
import { useUserData } from "../../utils/userDataContext";
import { Main } from "../styles/global/MainStyled";
import { Box } from "../styles/boxStyled.js";
import { MdOutlineMonitorWeight as WeightIcon } from "react-icons/md";
import { IoIosStats as StatsIcon } from "react-icons/io";
import { GiForkKnifeSpoon as CaloriesIcon } from "react-icons/gi";
import { RiErrorWarningFill as AlertIcon } from "react-icons/ri";
import { Link } from "react-router-dom";
import { StartWorkoutLinkStyled } from "../WorkoutPage/workoutPageStyled";
import { getfirstDayOfTheMonth } from "../../utils/getDate";

import {
  UserNameHeading,
  UserInfoSection,
  TextSpan,
  ResultH3,
} from "./UserProfileStyled";
import { BiUserCircle as UserIcon } from "react-icons/bi";
import useCountCalories from "./useCountCalories";
import styled from "styled-components";
import IsEmptyMessage from "../IsEmptyComponent/IsEmptyMessage";

const UserBox = styled(Box)`
  svg {
    font-size: 1.25rem;
  }
`;
export default function UserProfile() {
  const [workoutsAmount, setWorkoutsAmount] = useState();
  const [user, setUser] = useState();
  const { getUserInfo, countWorkouts } = useUserData();
  const [error, setError] = useState();
  const { countCalories } = useCountCalories();
  useEffect(() => {
    // pulling user info data from firestore on the first component render, counting amount of workouts in current month with firestore server count and date fns method
    const unsubscribe = () => {
      getUserInfo().then((result) => {
        if (result.exists()) {
          const user = result.data();
          setUser(user);
          countWorkouts(getfirstDayOfTheMonth()).then((result) => {
            if (result.data().count > 0) {
              setWorkoutsAmount(result.data().count);
            } else setError("You dont have any workouts yet");
          });
        }
      });
    };
    return unsubscribe;
  }, []);
  return (
    <Main column>
      {user && (
        <>
          {" "}
          <UserBox gap="0.5rem">
            <UserIcon />
            <UserNameHeading>{user.userName}</UserNameHeading>
          </UserBox>
          <UserInfoSection>
            {workoutsAmount ? (
              <Box alignItems="flex-start" gap="0.5rem" flexDirection="column">
                <TextSpan>Training sessions in this month</TextSpan>
                <Box>
                  <StatsIcon />
                  <ResultH3>{workoutsAmount}</ResultH3>
                </Box>
              </Box>
            ) : (
              <Link to="../startworkout">
                <IsEmptyMessage
                  message={error}
                  secondColor
                  additionalMessage={"start a workout!"}
                />
              </Link>
            )}

            <Box alignItems="flex-start" gap="0.5rem" flexDirection="column">
              <TextSpan>Your daily calorie requirement</TextSpan>
              <Box>
                <CaloriesIcon />
                <ResultH3>
                  {
                    // counting calories for user with countcalories custom hook
                    countCalories(
                      user.userWeight,
                      user.userHeight,
                      user.userGender === "male" ? true : false,
                      user.userAge,
                      user.userActivity
                    )
                  }
                </ResultH3>
              </Box>
            </Box>
            <Box alignItems="flex-start" gap="0.5rem" flexDirection="column">
              <TextSpan>Your current weight</TextSpan>
              <Box>
                <WeightIcon />
                <ResultH3>{user.userWeight}kg</ResultH3>
              </Box>
            </Box>
          </UserInfoSection>
        </>
      )}
      <StartWorkoutLinkStyled to="../startworkout">
        Start a workout
      </StartWorkoutLinkStyled>
    </Main>
  );
}
