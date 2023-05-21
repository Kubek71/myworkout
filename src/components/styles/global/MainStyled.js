import styled from "styled-components";

export const Main = styled.main`
  padding: 2rem;
  display: flex;
  flex-direction: ${({ column }) => (column ? "column" : "row")};
  align-items: ${({ column }) => (column ? "center" : "unset")};
  justify-content: ${({ column }) => (column ? "unset" : "center")};
  width: 100%;
`;
