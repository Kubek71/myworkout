import { el } from "date-fns/locale";
import React from "react";
import { useEffect, useState } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import { useUserData } from "../../utils/userDataContext";
import { WorkoutName } from "../styles/workoutPageStyled";
import { Box } from "../styles/boxStyled.js";
import styled from "styled-components";
import {
  BiCaretLeft as PreviousIcon,
  BiCaretRight as NextIcon,
  BiDumbbell as DumbellIcon,
  BiTimeFive as TimeIcon,
} from "react-icons/bi";

const ItemBox = styled(Box)`
  gap: 0.25rem;
  font-size: 0.75rem;
  svg {
    color: ${({ theme }) => theme.colors.dark};
  }
  span {
    color: ${({ theme }) => theme.colors.dark};
    font-weight: ${({ theme }) => theme.fontWeight.xBold};
  }
`;
const WorkoutBox = styled(Box)`
  background: ${({ theme }) => theme.colors.light};
  padding: 2rem;
  margin-bottom: 4rem;
`;

export default function HistoryPage() {
  const [workouts, setWorkouts] = useState([]);
  const [hasMore, setHasMore] = useState(true);
  const { getAllWorkouts } = useUserData();

  const getWorkouts = () => {
    // getting user's workouts from firestore with pagination (fetching only 5, whenever user scrolls  to the down of the workouts, fetching another 5 of them ordered by timestamp)
    getAllWorkouts(
      workouts.length > 0
        ? workouts[workouts.length - 1].timestamp
        : 10000000000000
    )
      .then((result) => {
        if (!result.empty) {
          const array = result.docs.map((doc) => doc.data());
          setWorkouts((current) => current.concat(array));
        } else {
          setHasMore(false);
        }
      })
      .catch((e) => console.log(e));
  };

  useEffect(() => {
    getWorkouts();
  }, []);
  return (
    <div style={{ padding: "2rem" }}>
      <InfiniteScroll
        dataLength={workouts.length} //This is important field to render the next data
        next={getWorkouts}
        hasMore={hasMore}
        endMessage={
          <p style={{ textAlign: "center" }}>
            <b>Yay! You have seen it all</b>
          </p>
        }
        loader={<h4 style={{ color: "white" }}>Loading...</h4>}
      >
        {workouts.map((workout, index) => {
          return (
            <WorkoutBox key={index}>
              <WorkoutName>{workout.programName}</WorkoutName>
              <ItemBox>
                <DumbellIcon />
                <span>{workout.exercises.length} exercises</span>
              </ItemBox>
              <ItemBox>
                <TimeIcon />
                <span>60 min</span>
              </ItemBox>
            </WorkoutBox>
          );
        })}
      </InfiniteScroll>
    </div>
  );
}
