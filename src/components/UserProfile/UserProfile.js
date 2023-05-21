import React from "react";
import { useEffect, useState } from "react";
import { useUserData } from "../../utils/userDataContext";
import { Main } from "../styles/global/MainStyled";
import { Heading } from "../styles/newProgramPageStyled";
import { Box } from "../styles/boxStyled.js";
import { BiUserCircle as UserIcon } from "react-icons/bi";
import styled from "styled-components";

const UserBox = styled(Box)`
  gap: 0.5rem;
  svg {
    font-size: 2rem;
  }
`;
export default function UserProfile() {
  const [workoutsAmount, setWorkoutsAmount] = useState(0);
  const { countWorkouts } = useUserData();

  useEffect(() => {
    countWorkouts()
      .then((result) => setWorkoutsAmount(result.data().count))
      .catch((e) => console.log(e));
  }, []);
  return (
    <Main column>
      <UserBox>
        <UserIcon />
        <Heading>Jakub</Heading>
      </UserBox>
    </Main>
  );
}
