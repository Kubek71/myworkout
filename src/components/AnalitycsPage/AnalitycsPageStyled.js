import styled from "styled-components";

export const Heading = styled.h2`
  width: 100%;
  text-align: center;
  font-size: clamp(1rem, 2vh, 2rem);
  color: ${({ theme }) => theme.colors.light};
`;

export const ProgramSection = styled.section`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 2.5rem;
  max-width: 600px;
  width: 100%;
`;

export const StatsSection = styled.section`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 2.5rem;
  max-width: 600px;
  width: 100%;
  color: ${({ theme }) => theme.colors.light};
  & > div {
    width: 100%;
  }
`;
export const StatMethodButton = styled.button`
  text-transform: uppercase;
  padding: 0.25rem;
  border-bottom: ${({ active, theme }) =>
    active ? `2px solid ${theme.colors.primaryRed}` : "none"};
`;
