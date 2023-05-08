import styled from "styled-components";

export const ProgramPageStyled = styled.main`
  width: 100%;
  display: flex;
  flex-direction: column;
  padding: 2rem;
  gap: 1.5rem;
  align-items: center;
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
  width: 100%;
`;

export const ProgramTitle = styled.h3`
  font-size: 0.75rem;
  color: ${({ theme }) => theme.colors.primaryRed};
  font-weight: ${({ theme }) => theme.fontWeight.Bold};
  display: block;
  width: 100%;
`;
export const ProgramBox = styled.div`
  cursor: pointer;
  width: 100%;
  padding: 1.5rem 0.5rem;
  border-radius: 5px;
  background: ${({ theme }) => theme.colors.light};
  position: relative;
  text-align: left;
  max-width: 600px;
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
  justify-content: center;

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
  width: 100%;
  input {
    border: none;
    background: none;
    cursor: pointer;
    text-transform: uppercase;
  }
  li {
    list-style-type: none;
    color: ${({ theme }) => theme.colors.dark};
    font-weight: ${({ theme }) => theme.fontWeight.xBold};
    padding: 0.25rem;
    width: 100%;
    text-transform: uppercase;
    display: flex;
    align-items: center;
    justify-content: ${({ justifyItemsLeft }) =>
      justifyItemsLeft ? "initial" : "space-between"};
    gap: 1rem;
    svg {
      color: ${({ theme }) => theme.colors.primaryRed};
      flex-shrink: 0;
    }
    strong {
      color: ${({ theme }) => theme.colors.primaryRed};
      padding-right: 0.75rem;
    }
  }
`;
export const AddNewProgramButton = styled.button`
  background: none;
  border: none;
  padding: none;
  cursor: pointer;
  width: fit-content;
`;
