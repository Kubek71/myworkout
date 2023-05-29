import React from "react";
import { useEffect, useState } from "react";
import { useUserData } from "../../utils/userDataContext";
import { Main } from "../styles/global/MainStyled";
import { Box } from "../styles/boxStyled.js";
import { MdOutlineMonitorWeight as WeightIcon } from "react-icons/md";
import { IoIosStats as StatsIcon } from "react-icons/io";
import { GiForkKnifeSpoon as CaloriesIcon } from "react-icons/gi";
import { RiErrorWarningFill as AlertIcon } from "react-icons/ri";
import { useNavigate, Link } from "react-router-dom";
import { StartWorkoutLinkStyled } from "../styles/workoutPageStyled";
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

const UserBox = styled(Box)`
  svg {
    font-size: 1.25rem;
  }
`;
export default function UserProfile() {
  const [workoutsAmount, setWorkoutsAmount] = useState();
  const [user, setUser] = useState();
  const { getUserInfo, countWorkouts } = useUserData();
  const { countCalories } = useCountCalories();
  const navigate = useNavigate();
  useEffect(() => {
    const unsubscribe = () => {
      console.log(getfirstDayOfTheMonth());
      getUserInfo().then((result) => {
        if (result.exists()) {
          const user = result.data();
          console.log(user);
          const isMale = user.userGender === "male" ? true : false;
          setUser(user);
          countWorkouts(getfirstDayOfTheMonth()).then((result) => {
            console.log(result.data().count);
            setWorkoutsAmount(result.data().count);
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
            {workoutsAmount && workoutsAmount > 0 ? (
              <Box alignItems="flex-start" gap="0.5rem" flexDirection="column">
                <TextSpan>Training sessions in this month</TextSpan>
                <Box>
                  <StatsIcon />
                  <ResultH3>{workoutsAmount}</ResultH3>
                </Box>
              </Box>
            ) : (
              <Link to="../startworkout">
                <Box gap="0.25rem">
                  <AlertIcon />
                  <TextSpan fontSize="0.65rem">
                    You dont have any workouts yet.{" "}
                    <strong>Start a workout</strong>
                  </TextSpan>
                </Box>
              </Link>
            )}

            <Box alignItems="flex-start" gap="0.5rem" flexDirection="column">
              <TextSpan>Your daily calorie requirement</TextSpan>
              <Box>
                <CaloriesIcon />
                <ResultH3>
                  {countCalories(
                    user.userWeight,
                    user.userHeight,
                    user.userGender === "male" ? true : false,
                    user.userAge
                  )}
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
