import React from "react";
import styled from "styled-components";
import { Box } from "../styles/boxStyled.js";
import { RiErrorWarningFill as AlertIcon } from "react-icons/ri";
const ErrorContainer = styled(Box)`
  margin: 2.5rem 0;
  flex-direction: column;
  span {
    font-size: 1rem;
    color: ${({ theme, secondColor }) =>
      secondColor ? theme.colors.light : theme.colors.secondaryRed};
    font-weight: ${({ theme }) => theme.fontWeight.thin};
  }
`;

export default function IsEmptyMessage({
  message,
  secondColor,
  additionalMessage,
}) {
  return (
    <ErrorContainer secondColor={secondColor}>
      <Box>
        <AlertIcon />
        {additionalMessage ? (
          <span>
            {message}. <strong>{additionalMessage}</strong>
          </span>
        ) : (
          <span>{message}</span>
        )}
      </Box>
    </ErrorContainer>
  );
}
