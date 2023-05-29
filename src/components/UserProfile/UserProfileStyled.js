import styled from "styled-components";

export const UserInfoSection = styled.section`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 1.5rem;
  width: 100%;
  margin-top: 2rem;

  strong {
    color: ${({ theme }) => theme.colors.primaryRed};
  }
`;

export const UserNameHeading = styled.h2`
  color: ${({ theme }) => theme.colors.light};
  font-size: 1.25rem;
  text-transform: capitalize;
`;

export const TextSpan = styled.span`
  color: ${({ theme }) => theme.colors.light};
  font-size: ${({ fontSize }) => (fontSize ? fontSize : "0.85rem")};
  width: 60vw;
`;
export const ResultH3 = styled.span`
  color: ${({ theme }) => theme.colors.primaryRed};
  font-weight: ${({ theme }) => theme.fontWeight.xBold};
  font-size: 1.75rem;
`;
