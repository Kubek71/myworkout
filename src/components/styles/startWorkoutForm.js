import styled from "styled-components";

export const StartWorkoutFormStyled = styled.form`
  width: 100%;
  display: flex;
  flex-direction: column;
  padding: 2rem;
  gap: 1.5rem;
  align-items: center;
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
    width: 1rem;
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
