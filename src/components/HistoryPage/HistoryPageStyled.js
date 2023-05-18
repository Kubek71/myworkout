import styled from "styled-components";
import { Link } from "react-router-dom";
export const Main = styled.main`
  width: 100%;
  padding: 2rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  ${({ headerHeight }) =>
    headerHeight && `height: calc(100% - ${headerHeight}px)`};

  *::after {
    display: none;
  }
  & > div {
    width: 100%;
    max-width: 600px;
    padding-bottom: 2rem;
  }

  .infinite-scroll-component__outerdiv {
    max-height: calc(100% - 2rem);
  }

  .infiniteScroll-container {
    align-items: center;
    flex-direction: column;
    display: flex;
    gap: 2rem;
    background: ${({ color }) => color};
    max-height: 100%;
    padding-inline: 0.5rem;
  }
`;

export const WorkoutPlanButton = styled.button`
  background: ${({ theme, active }) =>
    active ? theme.colors.primaryRed : theme.colors.light};
  color: ${({ theme, active }) =>
    active ? theme.colors.light : theme.colors.dark};
  padding: 0.5rem;
  border-radius: 0.75rem;
  font-weight: ${({ theme }) => theme.fontWeight.xBold};
`;

export const WorkoutBox = styled.div`
  cursor: pointer;
  width: 100%;
  padding: 1.5rem 0.5rem;
  border-radius: 5px;
  background: ${({ theme }) => theme.colors.light};
`;
