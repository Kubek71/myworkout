import styled from "styled-components";
import { Box } from "../styles/boxStyled.js";

export const WorkoutBox = styled.section`
  border-radius: 5px;
  background: ${({ theme }) => theme.colors.light};
  cursor: pointer;
  width: 100%;
  max-width: 1000px;
`;

export const InfoBox = styled(Box)`
  width: 100%;
  @media (max-width: 768px) {
    flex-wrap: wrap;
  }
  h2 {
    padding: 0.5rem;
    font-size: clamp(1rem, 3vh, 2rem);
  }
  div {
    display: flex;
    width: 100%;
    color: ${({ theme }) => theme.colors.light};
    font-size: 1.5rem;
    svg {
      font-size: 2.5rem;
      color: ${({ theme }) => theme.colors.primaryRed};
    }
  }
`;
export const NoteContainer = styled.div`
  background: ${({ theme }) => theme.colors.light};
  max-width: 600px;
  padding: 1.5rem;
  border-radius: 5px;
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  span {
    color: ${({ theme }) => theme.colors.primaryRed};
    font-weight: ${({ theme }) => theme.fontWeight.xBold};
    text-transform: uppercase;
    display: block;
    width: 100%;

    p {
      color: ${({ theme }) => theme.colors.dark};
    }
  }
  svg {
    color: ${({ theme }) => theme.colors.dark};
  }
`;
export const BackButton = styled.button`
  color: ${({ theme }) => theme.colors.light};
  text-transform: uppercase;
  font-size: ${({ fontSize }) => (fontSize ? fontSize : "1.25rem")};
  width: 100%;
  display: block;
  text-align: ${({ textAlign }) => (textAlign ? textAlign : "left")};
  padding: 0.25rem 1rem;
  font-weight: ${({ theme }) => theme.fontWeight.xBold};

  span {
    position: relative;
    z-index: 100;
    &::after {
      content: "";
      width: 2em;
      right: 50%;
      transform: translateX(calc(50% - 1rem));
      bottom: -5px;
      height: 5px;
      border-radius: 1px;
      background: ${({ theme }) => theme.colors.primaryRed};
      position: absolute;
      z-index: 0;
    }
  }
`;
