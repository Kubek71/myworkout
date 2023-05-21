import React from "react";
import { useEffect, useState, useRef } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import { useUserData } from "../../utils/userDataContext";
import { WorkoutName } from "../styles/workoutPageStyled";
import { ItemBox } from "../WorkoutPage/Workout";
import { date } from "../../utils/getDate";
import { Box } from "../styles/boxStyled.js";
import { Main, WorkoutPlanButton, WorkoutBox } from "./HistoryPageStyled";
import {
  BiDumbbell as DumbellIcon,
  BiTimeFive as TimeIcon,
} from "react-icons/bi";
import { Link } from "react-router-dom";
export default function HistoryPage({ headerHeightRef }) {
  // destructuring fetching methods from userDataContext
  const { getAllWorkouts, getWorkoutPlans } = useUserData();

  const [workouts, setWorkouts] = useState([]);
  const [workoutPlans, setWorkoutPlans] = useState([]);
  const [activeWorkoutPlan, setActiveWorkoutPlan] = useState();
  const [hasMore, setHasMore] = useState(true);
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
          const array = result.docs.map((doc) => doc.data());
          setWorkouts((current) => current.concat(array));
        } else {
          setHasMore(false);
        }
      })
      .catch((e) => console.log(e));
  };

  useEffect(() => {
    // setting headerHeight state to header ref offsetHeight
    setHeaderHeight(headerHeightRef.current.offsetHeight);
    const unsubscribe = () => {
      if (workouts.length === 0) {
        getWorkoutPlans()
          .then((result) => {
            const plans = result.docs.map((doc) => doc.data());
            setWorkoutPlans(plans);
            setActiveWorkoutPlan(plans[0].name);
          })
          .catch((error) => console.log(error));
      } else return;
    };
    return unsubscribe;
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
    <Main headerHeight={headerHeight}>
      {workoutPlans && (
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
      )}
      {headerHeight > 0 && (
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
      )}
    </Main>
  );
}
