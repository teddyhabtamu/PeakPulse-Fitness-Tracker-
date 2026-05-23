import { CircularProgress } from "@mui/material";
import React from "react";
import styled from "styled-components";

const Button = styled.div`
  border-radius: 8px;
  color: ${({ type, theme }) => type === "secondary" ? theme.button_text_secondary : theme.button_text_primary};
  font-weight: 700;
  font-size: 14px;
  cursor: pointer;
  transition: all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1);
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 6px;
  height: min-content;
  padding: 16px 26px;
  box-shadow: 0px 4px 10px ${({ type, theme }) => type === "secondary" ? theme.secondary + '40' : theme.primary + '40'};
  @media (max-width: 600px) {
    padding: 8px 12px;
  }

  ${({ type, theme }) =>
    type === "secondary"
      ? `
  background: ${theme.secondary};
  border: 1px solid ${theme.secondary};
  `
      : `
  background: ${theme.primary};
`}

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0px 8px 15px ${({ type, theme }) => type === "secondary" ? theme.secondary + '60' : theme.primary + '60'};
  }

  ${({ isDisabled }) =>
    isDisabled &&
    `
  opacity: 0.8;
  cursor: not-allowed;

  `}
  ${({ isLoading }) =>
    isLoading &&
    `
    opacity: 0.8;
  cursor: not-allowed;
`}
${({ flex }) =>
    flex &&
    `
    flex: 1;
`}

${({ small }) =>
    small &&
    `
padding: 10px 28px;
`}
  ${({ outlined, theme }) =>
    outlined &&
    `
background: transparent;
color: ${theme.primary};
  box-shadow: none;
`}
  ${({ full }) =>
    full &&
    `
  width: 100%;`}
`;

const button = ({
  text,
  isLoading,
  isDisabled,
  rightIcon,
  leftIcon,
  type,
  onClick,
  flex,
  small,
  outlined,
  full,
}) => {
  return (
    <Button
      onClick={(e) =>
        !isDisabled && !isLoading && typeof onClick === "function" && onClick(e)
      }
      disabled={isDisabled || isLoading} // The button is disabled if isDisabled or isLoading is true
      type={type}
      isLoading={isLoading}
      flex={flex}
      small={small}
      outlined={outlined}
      full={full}
    >
      {isLoading && (
        <CircularProgress
          style={{ width: "18px", height: "18px", color: "inherit" }}
        />
      )}
      {leftIcon}
      {text}
      {isLoading && <> . . .</>}
      {rightIcon}
    </Button>
  );
};

export default button;
