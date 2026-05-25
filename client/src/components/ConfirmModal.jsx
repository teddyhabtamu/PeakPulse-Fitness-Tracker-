import React, { useState, useEffect } from "react";
import styled, { keyframes } from "styled-components";
import { FiX, FiAlertTriangle, FiInfo, FiEdit3 } from "react-icons/fi";

const overlayIn = keyframes`
  from { opacity: 0; }
  to { opacity: 1; }
`;

const modalIn = keyframes`
  from { opacity: 0; transform: translateY(24px) scale(0.96); }
  to { opacity: 1; transform: translateY(0) scale(1); }
`;

const Overlay = styled.div`
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.55);
  backdrop-filter: blur(4px);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 5000;
  padding: 24px;
  animation: ${overlayIn} 0.2s ease;
`;

const Modal = styled.div`
  background: ${({ theme }) => theme.card};
  border: 1px solid ${({ theme }) => theme.border};
  border-radius: 20px;
  width: 100%;
  max-width: 420px;
  animation: ${modalIn} 0.25s cubic-bezier(0.16, 1, 0.3, 1);
  overflow: hidden;
`;

const ModalHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 20px 24px 0;
`;

const ModalBody = styled.div`
  padding: 16px 24px 24px;
`;

const IconWrapper = styled.div`
  width: 44px;
  height: 44px;
  border-radius: 14px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 20px;
  margin-bottom: 14px;
  background: ${({ $variant, theme }) =>
    $variant === "danger"
      ? theme.red + "15"
      : $variant === "prompt"
      ? theme.primary + "15"
      : theme.primary + "12"};
  color: ${({ $variant, theme }) =>
    $variant === "danger"
      ? theme.red
      : $variant === "prompt"
      ? theme.primary
      : theme.primary};
`;

const ModalTitle = styled.h3`
  font-size: 17px;
  font-weight: 700;
  color: ${({ theme }) => theme.text_primary};
  margin: 0 0 6px;
`;

const ModalMessage = styled.p`
  font-size: 14px;
  line-height: 1.6;
  color: ${({ theme }) => theme.text_secondary};
  margin: 0;
`;

const Input = styled.input`
  width: 100%;
  box-sizing: border-box;
  margin-top: 16px;
  padding: 12px 14px;
  font-size: 14px;
  border: 1px solid ${({ theme }) => theme.border};
  border-radius: 10px;
  background: ${({ theme }) => theme.input_bg};
  color: ${({ theme }) => theme.text_primary};
  outline: none;
  font-family: inherit;
  transition: border-color 0.2s;

  &:focus {
    border-color: ${({ theme }) => theme.primary};
    box-shadow: 0 0 0 3px ${({ theme }) => theme.primary}20;
  }
`;

const Actions = styled.div`
  display: flex;
  gap: 10px;
  justify-content: flex-end;
  padding: 0 24px 20px;
`;

const Btn = styled.button`
  padding: 10px 20px;
  font-size: 14px;
  font-weight: 600;
  border: none;
  border-radius: 10px;
  cursor: pointer;
  font-family: inherit;
  transition: all 0.2s ease;
  min-width: 80px;

  &:hover {
    transform: translateY(-1px);
  }
`;

const CancelBtn = styled(Btn)`
  background: ${({ theme }) => theme.input_bg};
  color: ${({ theme }) => theme.text_secondary};
  border: 1px solid ${({ theme }) => theme.border};

  &:hover {
    background: ${({ theme }) => theme.card_hover};
  }
`;

const ConfirmBtn = styled(Btn)`
  background: ${({ $variant, theme }) =>
    $variant === "danger" ? theme.red : theme.primary};
  color: ${({ theme }) => theme.button_text_primary};

  &:hover {
    box-shadow: 0 4px 14px
      ${({ $variant, theme }) =>
        $variant === "danger" ? theme.red + "40" : theme.primary + "40"};
  }
`;

const CloseBtn = styled.button`
  background: none;
  border: none;
  color: ${({ theme }) => theme.text_secondary};
  cursor: pointer;
  padding: 4px;
  display: flex;
  border-radius: 6px;
  transition: all 0.2s;

  &:hover {
    background: ${({ theme }) => theme.input_bg};
    color: ${({ theme }) => theme.text_primary};
  }
`;

const ConfirmModal = ({ open, variant = "confirm", title, message, confirmLabel, cancelLabel, onConfirm, onCancel }) => {
  const [inputValue, setInputValue] = useState("");

  useEffect(() => {
    if (open) setInputValue("");
  }, [open]);

  if (!open) return null;

  const isDanger = variant === "danger";
  const isAlert = variant === "alert";
  const isPrompt = variant === "prompt";

  const icon = isDanger ? <FiAlertTriangle size={22} /> : isPrompt ? <FiEdit3 size={22} /> : <FiInfo size={22} />;

  const handleConfirm = () => {
    if (isPrompt) onConfirm?.(inputValue);
    else onConfirm?.();
  };

  return (
    <Overlay onClick={(e) => { if (e.target === e.currentTarget) onCancel?.(); }}>
      <Modal role="dialog" aria-modal="true">
        <ModalHeader>
          <IconWrapper $variant={variant}>{icon}</IconWrapper>
          {!isAlert && <CloseBtn onClick={onCancel}><FiX size={18} /></CloseBtn>}
        </ModalHeader>
        <ModalBody>
          <ModalTitle>{title}</ModalTitle>
          <ModalMessage>{message}</ModalMessage>
          {isPrompt && (
            <Input
              autoFocus
              placeholder="Paste URL here..."
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyDown={(e) => { if (e.key === "Enter") handleConfirm(); }}
            />
          )}
        </ModalBody>
        <Actions>
          {!isAlert && <CancelBtn onClick={onCancel}>{cancelLabel || "Cancel"}</CancelBtn>}
          <ConfirmBtn $variant={isDanger ? "danger" : "primary"} onClick={handleConfirm} autoFocus={!isPrompt}>
            {confirmLabel || (isAlert ? "OK" : "Confirm")}
          </ConfirmBtn>
        </Actions>
      </Modal>
    </Overlay>
  );
};

export default ConfirmModal;
