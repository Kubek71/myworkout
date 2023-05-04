import styled from "styled-components";
import { Box } from "./boxStyled.js";
export const NoteBox = styled(Box)`
  svg {
    color: ${({ theme }) => theme.colors.primaryRed};
  }
`;

export const NoteForm = styled.form`
  width: 100%;
  max-width: 600px;
  textarea,
  input {
    color: ${({ theme }) => theme.colors.dark};
    background: none;
    font-size: 1rem;
    width: 100%;
    display: block;
    border: none;
  }
  input {
    background: ${({ theme }) => theme.colors.light};
    border-radius: 5px;
    padding: 0.5rem;
    margin-bottom: 1rem;
    width: clamp(8rem, 25vw, 150px);
  }
`;

export const Button = styled.button`
  padding: 0.5rem;
  color: ${({ theme }) => theme.colors.light};
  font-weight: ${({ theme }) => theme.fontWeight.xBold};
  border-radius: 5px;
  background: ${({ theme, positive }) =>
    positive ? theme.colors.primaryRed : theme.colors.dark};
`;

export const NoteSection = styled.div`
  background: ${({ theme }) => theme.colors.light};
  border-radius: 5px;
  width: 100%;
  padding: 0.5rem;
  margin-bottom: 2rem;
`;

export const NoteSpan = styled.span`
  color: ${({ theme }) => theme.colors.light};
  svg {
    color: ${({ theme }) => theme.colors.primaryRed};
    font-size: 1rem;
    margin-inline: 0.5rem;
  }
`;
