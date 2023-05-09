import styled from "styled-components";
import { Link } from "react-router-dom";
export const WorkoutPageStyled = styled.main`
  width: 100%;
  display: flex;
  flex-direction: column;
  padding: 2rem;
  gap: 1.5rem;
  align-items: center;
`;
export const LastWorkoutsSection = styled.section`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  align-items: center;
  position: relative;
`;
export const WorkoutDate = styled.h3`
  font-size: 1.15rem;
  color: ${({ theme }) => theme.colors.light};
  text-align: center;
`;
export const WorkoutContainer = styled.div`
  padding: 0.5rem;
  background: blue;
`;
export const WorkoutName = styled.span`
  color: ${({ theme }) => theme.colors.primaryRed};
  font-size: 0.85rem;
  font-weight: ${({ theme }) => theme.fontWeight.xBold};
  border-bottom: 1px solid ${({ theme }) => theme.colors.dark};
  text-align: center;
  display: block;
  padding-bottom: 0.5rem;
  width: 100%;
`;
export const WorkoutBox = styled.div`
  cursor: pointer;
  width: 100%;
  padding: 1.5rem 0.5rem;
  border-radius: 5px;
  background: ${({ theme }) => theme.colors.light};
  text-align: left;
  max-width: 600px;
  max-height: 45vh;
  overflow-y: scroll;

  &::after {
    position: absolute;
    content: "";
    height: 10%;
    width: 100%;
    bottom: 0;
    left: 0;
    background: linear-gradient(
      0deg,
      rgba(242, 222, 215, 1) 50%,
      rgba(255, 255, 255, 0) 100%
    );
  }
`;

export const StartWorkoutLink = styled(Link)`
  background: ${({ theme }) => theme.colors.primaryRed};
  color: ${({ theme }) => theme.colors.light};
  font-weight: ${({ theme }) => theme.fontWeight.xBold};
  padding: 0.5rem;
  border-radius: 5px;
  width: 25%;
  text-align: center;

  @media (max-width: 768px) {
    position: fixed;
    bottom: 0;
    right: 0;
    width: 100%;
    border-radius: 0;
    padding: 1rem;
  }
`;

export const WorkoutTable = styled.table`
  width: 100%;
  border-collapse: collapse;

  div {
    width: 100%;
    margin-bottom: 1.5rem;
    padding: 0.5rem;
  }

  td,
  th {
    width: 100%;
    padding: 0.5rem;
    font-size: clamp(10px, 2vw, 1rem);
  }

  th {
    color: ${({ theme }) => theme.colors.primaryRed};
    text-align: center;
    border-bottom: 1px solid ${({ theme }) => theme.colors.light};
  }

  td {
    color: ${({ theme }) => theme.colors.dark};
    border-bottom: 1px solid ${({ theme }) => theme.colors.dark};
    text-align: left;
  }

  .sets-table-data {
    border: none;
  }
  .first-row {
    font-weight: ${({ theme }) => theme.fontWeight.bold};
    color: ${({ theme }) => theme.colors.primaryRed};
  }
`;
