// import React, { useEffect } from "react";
// import {
//   Heading,
//   Input,
//   NewProgramPageStyled,
//   SaveProgramButton,
// } from "../../styles/newProgramPageStyled";
// import { ProgramBox, ProgramList } from "../../styles/programPageStyled";
// import { ErrorMessage } from "../../styles/global/errorMessage";
// import { Box } from "../../styles/boxStyled.js.js";
// import {
//   BiPlusMedical as NewProgramIcon,
//   BiTrash as RemoveIcon,
// } from "react-icons/bi";
// import { useForm } from "react-hook-form";
// import { useLocation, useNavigate } from "react-router-dom";
// import { useState } from "react";
// import styled from "styled-components";

// const Main = styled(NewProgramPageStyled)`
//   button {
//     background: none;
//     cursor: pointer;
//     border: none;
//   }
// `;
// const WorkoutTitle = styled(Heading)`
//   color: ${({ theme }) => theme.colors.primaryRed};
//   text-transform: uppercase;
// `;

// export default function EditWorkoutPlan() {
//   const { register, handleSubmit, resetField, formState: errors } = useForm();
//   const [exerciseStringIsEmptyError, setExerciseStringIsEmptyError] =
//     useState();
//   const [exerciseTable, setExerciseTable] = useState([]);
//   const { state } = useLocation();

//   useEffect(() => {
//     if (exerciseTable.length === 0) {
//       setExerciseTable([]);
//       setExerciseTable((currentTable) => [...currentTable, state]);
//     }
//   }, []);
//   const submitExercise = (data) => {
//     setExerciseTable((currentTable) => [...currentTable, data.exercise]);
//     resetField("exercise");
//     console.log(exerciseTable);
//   };
//   const saveWorkoutProgram = () => {
//     if (workoutName !== undefined && exerciseTable.length > 0) {
//       if (!exerciseTable.includes("")) {
//         addWorkoutPlan(state, workoutDuration, exerciseTable)
//           .then(() => {
//             console.log("udalo sie");
//           })
//           .catch((error) => console.log(error));
//       } else setExerciseStringIsEmptyError("Every exercise has to have a name");
//     }
//     return;
//   };
//   // removing exercise from exercise table in state, when user clicks on remove icon
//   const removeExerciseFromArray = (exerciseIndex) => {
//     setExerciseTable((currentTable) =>
//       currentTable.filter((items, index) => index !== exerciseIndex)
//     );
//   };

//   // updating exercise name in array onChange from exercise input
//   const changeExerciseNameInArray = (newExerciseName, exerciseIndex) => {
//     setExerciseTable((currentTable) =>
//       currentTable.map((exercise, i) =>
//         i === exerciseIndex ? newExerciseName : exercise
//       )
//     );
//   };
//   return (
//     <>
//       <Main>
//         <Heading>ADD EXERCISE</Heading>
//         <form onSubmit={handleSubmit(submitExercise)}>
//           <Box>
//             <Input
//               type="Text"
//               {...register("exercise", {
//                 maxLength: {
//                   value: 20,
//                   message: "maximum amount of characters is 20",
//                 },
//                 required: "name your exercise",
//               })}
//             ></Input>
//             <button type="submit" className="add-exercise-button">
//               <NewProgramIcon></NewProgramIcon>
//             </button>
//           </Box>
//           <ErrorMessage>{errors.exercise?.message}</ErrorMessage>
//         </form>
//         <section>
//           <ProgramBox>
//             <WorkoutTitle>{state}</WorkoutTitle>
//             <ProgramList>
//               {exerciseTable.map((exercise, i) => {
//                 return (
//                   <li>
//                     <Box>
//                       <strong>{i + 1}.</strong>{" "}
//                       <input
//                         requiered
//                         onChange={(e) =>
//                           changeExerciseNameInArray(e.currentTarget.value, i)
//                         }
//                         value={exercise}
//                       />
//                     </Box>

//                     <RemoveIcon onClick={() => removeExerciseFromArray(i)} />
//                   </li>
//                 );
//               })}
//             </ProgramList>
//             {exerciseStringIsEmptyError && (
//               <ErrorMessage>{exerciseStringIsEmptyError}</ErrorMessage>
//             )}
//           </ProgramBox>
//           <SaveProgramButton onClick={() => saveWorkoutProgram()}>
//             SAVE PROGRAM
//           </SaveProgramButton>
//         </section>
//       </Main>
//     </>
//   );
// }
