import styled from "styled-components";

export const WorkoutPageStyled = styled.main`
  width: 100%;
  display: flex;
  flex-direction: column;
  padding: 2rem;
  gap: 1.5rem;
`;

export const Heading = styled.h2`
  font-size: 0.8rem;
  color: ${({ theme }) => theme.colors.light};
  font-weight: ${({ theme }) => theme.fontWeight.xBold};
  display: block;
  width: 100%;
`;

export const ProgramSection = styled.section`
  padding: 0.75rem;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

export const ProgramTitle = styled.h3`
  font-size: 0.75rem;
  color: ${({ theme }) => theme.colors.primaryRed};
  font-weight: ${({ theme }) => theme.fontWeight.Bold};
  display: block;
  width: 100%;
`;
export const ProgramBox = styled.div`
  width: 100%;
  padding: 0.5rem;
  border-radius: 5px;
  background: ${({ theme }) => theme.colors.light};
  position: relative;
  text-align: left;
  max-width: 600px;

  svg {
    font-size: 1.2rem;
    color: ${({ theme }) => theme.colors.dark};
  }

  .edit-icon {
    position: absolute;
    top: 0.5rem;
    right: 0.5rem;
  }
  .remove-icon {
    color: ${({ theme }) => theme.colors.primaryRed};
    position: absolute;
    bottom: 0.5rem;
    right: 0.5rem;
  }
  .slide-icon {
    position: absolute;
    bottom: 0;
    right: 50%;
    transform: translateX(0.6rem);
  }
`;

export const ProgramList = styled.ul`
  padding-bottom: 1rem;
  li {
    list-style-type: none;
    font-weight: ${({ theme }) => theme.fontWeight.xBold};
    padding: 0.25rem;
    strong {
      padding-right: 0.75rem;
    }
  }
`;
