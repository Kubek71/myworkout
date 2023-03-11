import styled from "styled-components";

export const RegisterPageStyled = styled.main`
  padding: 2rem;
  background: ${({ theme }) => theme.colors.dark};
`;

export const RegisterHeading = styled.h1`
  color: ${({ theme }) => theme.colors.primaryRed};
  font-size: 1.25rem;
  display: block;
  width: 100%;
  text-align: center;
`;

export const RegisterForm = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
  width: 100%;
  padding: 2.5rem 0;
`;

export const TextInput = styled.input`
  background: ${({ theme }) => theme.colors.light};
  padding: 0.5rem;
  border-radius: 5px;
  border: none;
  width: 50%;
  max-width: 400px;
`;

export const heroSection = styled.section`
  width: 100%;
`;
