import styled from "styled-components";

export const NewProgramPageStyled = styled.main`
  width: 100%;
  display: flex;
  flex-direction: column;
  padding: 2rem;
  gap: 1.5rem;
  align-items: center;
`;

export const NewProgramForm = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
  width: 100%;
  padding: 1.5rem 0.5rem;

  .add-exercise-button {
    padding: 0;
    border: 0;
    cursor: pointer;
    background: none;
  }
`;

export const Heading = styled.h2`
  font-size: 1rem;
  color: ${({ theme }) => theme.colors.light};
  font-weight: ${({ theme }) => theme.fontWeight.xBold};
  display: block;
  width: 100%;
  text-align: center;
`;
export const NextStepButton = styled.button`
  background: ${({ theme }) => theme.colors.primaryRed};
  color: ${({ theme }) => theme.colors.dark};
  font-weight: ${({ theme }) => theme.fontWeight.xBold};
  padding: 0.5rem;
  border-radius: 5px;
  border: none;
  width: 25%;
`;

export const Input = styled.input`
  padding: 0.5rem;
  border: none;
  background: none;
  border-bottom: 1px solid ${({ theme }) => theme.colors.primaryRed};
  color: ${({ theme }) => theme.colors.light};
`;

export const SaveProgramButton = styled.button`
  color: ${({ theme }) => theme.colors.light};
  font-weight: ${({ theme }) => theme.fontWeight.xBold};
  background: ${({ theme }) => theme.colors.primaryRed};
  padding: 0.5rem;
  border: none;
  border-radius: 5px;
  cursor: pointer;
`;
