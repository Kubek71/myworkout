import styled from "styled-components";

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
