import styled from "styled-components";

export const ErrorMessage = styled.p`
  text-align: center;
  display: block;
  padding: 0.25rem;
  color: ${({ theme }) => theme.colors.secondaryRed};
  font-size: 0.75rem;
`;
