import React from "react";
import { useEffect, useState } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import { useUserData } from "../../utils/userDataContext";
import {
  StartWorkoutLinkStyled,
  WorkoutName,
} from "../WorkoutPage/workoutPageStyled";
import { ItemBox } from "../WorkoutPage/Workout";
import { date } from "../../utils/getDate";
import { Box } from "../styles/boxStyled.js";
import { Main, WorkoutPlanButton, WorkoutBox } from "./HistoryPageStyled";
import {
  BiDumbbell as DumbellIcon,
  BiTimeFive as TimeIcon,
} from "react-icons/bi";
import { Link } from "react-router-dom";
import IsEmptyMessage from "../IsEmptyComponent/IsEmptyMessage";
export default function HistoryPage({ headerHeightRef }) {
  // destructuring fetching methods from userDataContext
  const { getAllWorkouts, getWorkoutPlans } = useUserData();

  const [workouts, setWorkouts] = useState([]);
  const [workoutPlans, setWorkoutPlans] = useState([]);
  const [activeWorkoutPlan, setActiveWorkoutPlan] = useState();
  const [hasMore, setHasMore] = useState(true);
  const [error, setError] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const [headerHeight, setHeaderHeight] = useState(0);

  const getWorkouts = (workoutPlanName) => {
    // getting user's workouts from firestore with pagination (fetching only 5, whenever user scrolls  to the down of the workouts, fetching another 5 of them ordered by timestamp)
    const timestamp = () =>
      // returning a timestamp depending on workouts array length, if it is empty returns 10000000000000, otherwise returns timestamp of last workout from the array
      workouts.length > 0
        ? workouts[workouts.length - 1].timestamp
        : 10000000000000;

    getAllWorkouts(timestamp(), workoutPlanName)
      .then((result) => {
        if (!result.empty) {
          setIsLoading(false);
          const array = result.docs.map((doc) => doc.data());
          setWorkouts((current) => current.concat(array));
        } else {
          setHasMore(false);
          if (workouts.length === 0) {
            setIsLoading(false);
            setError(
              "Start working out and save all of your workouts right here!"
            );
          }
        }
      })
      .catch((e) => {
        setIsLoading(false);
        setError("We couldn't get your data from the server, try agian later");
      });
  };

  useEffect(() => {
    // setting headerHeight state to header ref offsetHeight
    setHeaderHeight(headerHeightRef.current.offsetHeight);

    if (workouts.length === 0) {
      getWorkoutPlans()
        .then((result) => {
          if (!result.empty) {
            const plans = result.docs.map((doc) => doc.data());
            setWorkoutPlans(plans);
            setActiveWorkoutPlan(plans[0].name);
          } else {
            setIsLoading(false);
            setError(
              "Start working out and save all of your workouts right here!"
            );
          }
        })
        .catch((e) => {
          setIsLoading(false);
          setError(
            "We couldn't get your data from the server, try agian later"
          );
        });
    } else return;
  }, []);
  useEffect(() => {
    setHasMore(true);
    if (activeWorkoutPlan !== undefined) {
      getWorkouts(activeWorkoutPlan);
    }
    return;
  }, [activeWorkoutPlan]);

  const getWorkoutPlanHandler = (e) => {
    const workoutPlanName = e.target.innerText;
    // reducing user workout plans array to a single workout plan that was clicked and setting workout array empty
    setActiveWorkoutPlan(workoutPlanName);
    setWorkouts([]);
  };
  return (
    headerHeight > 0 && (
      <Main headerHeight={headerHeight}>
        {!error && !isLoading ? (
          <>
            <Box>
              {workoutPlans.map((workoutPlan, index) => {
                return (
                  <WorkoutPlanButton
                    key={index}
                    onClick={getWorkoutPlanHandler}
                    active={workoutPlan.name === activeWorkoutPlan}
                    disabled={workoutPlan.name === activeWorkoutPlan}
                  >
                    {workoutPlan.name}
                  </WorkoutPlanButton>
                );
              })}
            </Box>

            <InfiniteScroll
              dataLength={workouts.length} //This is important field to render the next data
              next={() => getWorkouts(activeWorkoutPlan)}
              hasMore={hasMore}
              className="infiniteScroll-container"
              loader={<h4 style={{ color: "white" }}>Loading...</h4>}
            >
              {workouts.map((workout, index) => {
                return (
                  <Link
                    to={`${workout.timestamp}`}
                    state={workout}
                    style={{ width: "100%" }}
                    key={index}
                  >
                    <WorkoutBox key={index}>
                      <WorkoutName>{date(workout.timestamp)}</WorkoutName>
                      <ItemBox>
                        <DumbellIcon />
                        <span>{workout.exercises.length} exercises</span>
                      </ItemBox>
                      <ItemBox>
                        <TimeIcon />
                        <span>{workout.workoutDuration}</span>
                      </ItemBox>
                    </WorkoutBox>
                  </Link>
                );
              })}
            </InfiniteScroll>
          </>
        ) : (
          !isLoading && (
            <>
              <IsEmptyMessage message={error} />
              <StartWorkoutLinkStyled to="../startworkout">
                Start a workout
              </StartWorkoutLinkStyled>
            </>
          )
        )}
      </Main>
    )
  );
}
