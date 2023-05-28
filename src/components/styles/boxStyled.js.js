import styled from "styled-components";

export const Box = styled.div`
  display: flex;
  flex-direction: ${({ flexDirection }) =>
    flexDirection ? flexDirection : "row"};
  justify-content: ${({ justifyContent }) =>
    justifyContent ? justifyContent : "center"};
  align-items: ${({ alignItems }) => (alignItems ? alignItems : "center")};
  gap: ${({ gap }) => (gap ? gap : "1rem")};
`;
