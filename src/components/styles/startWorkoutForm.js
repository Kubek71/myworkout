import styled from "styled-components";
import { Link } from "react-router-dom";

export const StartWorkoutFormStyled = styled.form`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  align-items: center;

  @media (min-width: 768px) {
    h2 {
      width: unset;
    }
  }

  h2 {
    color: ${({ theme }) => theme.colors.primaryRed};
    border-bottom: 1px solid ${({ theme }) => theme.colors.light};
    padding-bottom: 0.5rem;
  }
`;

export const WorkoutTable = styled.table`
  text-align: left;
  width: 100%;
  border-collapse: collapse;

  td,
  th {
    padding: 0.5rem;
    font-size: clamp(10px, 2vw, 1rem);
  }

  th {
    color: ${({ theme }) => theme.colors.primaryRed};
    border-bottom: 1px solid ${({ theme }) => theme.colors.light};
  }

  td {
    color: ${({ theme }) => theme.colors.light};
    border-bottom: 1px solid ${({ theme }) => theme.colors.primaryRed};
    svg {
      color: ${({ theme }) => theme.colors.primaryRed};
      font-size: min(1rem, 3vw);
    }
  }

  input {
    width: 2rem;
    border: none;
    border-bottom: 1px solid ${({ theme }) => theme.colors.light};
    background: none;
    padding: 0.25rem;
    color: ${({ theme }) => theme.colors.light};

    &:focus {
      outline: none;
      box-shadow: 0px 0px 2px ${({ theme }) => theme.colors.light};
    }
  }
`;
export const SaveWorkoutLink = styled(Link)`
  background: ${({ theme }) => theme.colors.primaryRed};
  color: ${({ theme }) => theme.colors.light};
  font-weight: ${({ theme }) => theme.fontWeight.xBold};
  padding: 0.5rem;
  border-radius: 5px;
  width: 100%;
  text-align: center;
`;
export const WorkoutSection = styled.section`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  padding: 0.5rem 2.5rem;
  align-items: center;
  background: ${({ theme }) => theme.colors.light};
  margin-top: 4rem;
  border-radius: 5px;
  max-width: 600px;

  .container {
    width: 100%;
  }

  .remove-icon {
    color: ${({ theme }) => theme.colors.primaryRed};
    width: 2rem;
  }
  .set-icon {
    color: ${({ theme }) => theme.colors.dark};
    transform: rotate(45deg);
  }

  h2 {
    font-size: 1rem;
    color: ${({ theme }) => theme.colors.dark};
    font-weight: ${({ theme }) => theme.fontWeight.xBold};
    display: block;
    width: 100%;
    text-align: left;
  }
`;
