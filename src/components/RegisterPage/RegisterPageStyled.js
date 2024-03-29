import styled from "styled-components";

export const RegisterPageStyled = styled.main`
  position: absolute;
  top: 0;
  left: 0;
  width: 100vw;
  max-width: 100vw;
  height: 100vh;
  z-index: 1;
  padding: 2rem;
  background: ${({ theme }) => theme.colors.dark};
  display: flex;
  flex-direction: column;
  align-items: center;

  input {
    font-size: 16px;
    font-family: "Comfortaa", serif;
    color: ${({ theme }) => theme.colors.light};
  }

  .css-1dimb5e-singleValue {
    color: ${({ theme }) => theme.colors.light};
  }
`;

export const InputContainer = styled.div`
  position: relative;
  width: 100%;

  svg {
    position: absolute;
    left: 0;
    top: 0.25rem;
    color: ${({ theme }) => theme.colors.light};
  }
  p {
    height: 1rem;
    text-align: left;
  }
`;

export const Select = styled.select`
  padding: 0.5rem 0 0.5rem 2rem;
  background: none;
  border: none;
  border: 1px solid ${({ theme }) => theme.colors.light};
  width: 100%;
  color: ${({ theme }) => theme.colors.light};

  option {
    background: none;
    border: none;
    background-color: none;
  }
  .option {
    padding: 5rem;
  }
`;

export const RegisterH1 = styled.h1`
  color: ${({ theme }) => theme.colors.secondaryRed};
  font-size: 1.25rem;
  display: block;
  width: 100%;
  padding: 0.5rem 0;
  text-align: center;
  text-transform: capitalize;
`;

export const RegisterForm = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
  width: 100%;
  padding: 2.5rem 0;
  max-width: 800px;
`;

export const TextInput = styled.input`
  padding: 0.5rem 0 0.5rem 2rem;
  background: none;
  border: none;
  border-bottom: 1px solid ${({ theme }) => theme.colors.light};
  width: 100%;
  color: ${({ theme }) => theme.colors.light};

  &::placeholder {
    color: ${({ theme }) => theme.colors.light};
  }
`;
export const NextButton = styled.button`
  background: ${({ theme }) => theme.colors.primaryRed};
  padding: 0.75rem;
  text-align: center;
  border: none;
  color: ${({ theme }) => theme.colors.light};
  font-weight: ${({ theme }) => theme.fontWeight.xBold};
  letter-spacing: 3px;
  text-transform: uppercase;
  border-radius: 15px;
  width: 50%;
`;

export const LoginPageSpan = styled.span`
  display: block;
  width: 100%;
  color: ${({ theme }) => theme.colors.light};
  text-align: center;
`;
