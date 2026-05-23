import React, { useState, useEffect } from "react";
import styled from "styled-components";
import api from "../utils/api";
import { FiUser, FiMail, FiSave, FiArrowLeft } from "react-icons/fi";
import { useNavigate } from "react-router-dom";

const Container = styled.div`
  flex: 1;
  display: flex;
  justify-content: center;
  padding: 32px 0;
`;

const Wrapper = styled.div`
  flex: 1;
  max-width: 640px;
  display: flex;
  flex-direction: column;
  gap: 24px;
  padding: 0 24px;
`;

const BackButton = styled.button`
  display: flex;
  align-items: center;
  gap: 8px;
  background: none;
  border: none;
  color: ${({ theme }) => theme.primary};
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  padding: 8px 0;
  transition: opacity 0.2s;

  &:hover { opacity: 0.8; }
`;

const Card = styled.div`
  background: ${({ theme }) => theme.card};
  border: 1px solid ${({ theme }) => theme.border};
  border-radius: 16px;
  padding: 32px;
  box-shadow: 0 4px 16px ${({ theme }) => theme.shadow};

  @media (max-width: 600px) {
    padding: 20px;
  }
`;

const CardTitle = styled.h2`
  font-size: 20px;
  font-weight: 700;
  color: ${({ theme }) => theme.text_primary};
  margin: 0 0 24px;
`;

const AvatarCircle = styled.div`
  width: 72px;
  height: 72px;
  border-radius: 50%;
  background: linear-gradient(135deg, ${({ theme }) => theme.primary}, ${({ theme }) => theme.secondary});
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 28px;
  font-weight: 700;
  margin-bottom: 24px;
`;

const FieldGroup = styled.div`
  margin-bottom: 20px;
`;

const Label = styled.label`
  display: flex;
  align-items: center;
  gap: 6px;
  font-size: 13px;
  font-weight: 600;
  color: ${({ theme }) => theme.text_secondary};
  margin-bottom: 6px;
`;

const Input = styled.input`
  width: 100%;
  padding: 12px 16px;
  background: transparent;
  border: 1px solid ${({ theme }) => theme.text_secondary}40;
  border-radius: 12px;
  color: ${({ theme }) => theme.text_primary};
  font-size: 15px;
  outline: none;
  box-sizing: border-box;
  transition: all 0.3s ease;

  &:focus {
    border-color: ${({ theme }) => theme.primary};
    box-shadow: 0 0 0 3px ${({ theme }) => theme.primary}20;
  }
`;

const ReadOnlyInput = styled(Input)`
  opacity: 0.7;
  cursor: not-allowed;
`;

const SaveButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  width: 100%;
  padding: 14px;
  background: ${({ theme }) => theme.primary};
  border: none;
  border-radius: 10px;
  color: ${({ theme }) => theme.button_text_primary};
  font-size: 16px;
  font-weight: 700;
  cursor: pointer;
  box-shadow: 0 4px 10px ${({ theme }) => theme.primary}40;
  transition: all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1);

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 8px 20px ${({ theme }) => theme.primary}60;
  }
  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
    transform: none;
  }
`;

const Message = styled.div`
  padding: 12px 16px;
  border-radius: 10px;
  font-size: 14px;
  font-weight: 500;
  background: ${({ type, theme }) => type === "success" ? theme.primary + "18" : theme.red + "18"};
  color: ${({ type, theme }) => type === "success" ? theme.primary : theme.red};
  text-align: center;
`;

const ProfileSettings = () => {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState(null);

  useEffect(() => {
    const userName = localStorage.getItem("user_name") || "";
    const userEmail = localStorage.getItem("user_email") || "";
    setName(userName);
    setEmail(userEmail);
    setLoading(false);
  }, []);

  const handleSave = async (e) => {
    e.preventDefault();
    if (!name.trim()) {
      setMessage({ type: "error", text: "Name cannot be empty" });
      return;
    }
    setSaving(true);
    setMessage(null);
    try {
      await api.put("/user/profile", { name: name.trim() });
      localStorage.setItem("user_name", name.trim());
      window.dispatchEvent(new Event("user-profile-updated"));
      setMessage({ type: "success", text: "Profile updated successfully" });
    } catch (err) {
      setMessage({ type: "error", text: err.response?.data?.message || "Failed to update profile" });
    } finally {
      setSaving(false);
    }
  };

  const initials = name
    ? name.split(" ").map(w => w[0]).join("").toUpperCase().slice(0, 2)
    : "U";

  if (loading) return null;

  return (
    <Container>
      <Wrapper>
        <BackButton onClick={() => navigate(-1)}>
          <FiArrowLeft size={16} /> Back
        </BackButton>

        <Card>
          <AvatarCircle>{initials}</AvatarCircle>
          <CardTitle>Profile Settings</CardTitle>

          {message && <Message type={message.type}>{message.text}</Message>}

          <form onSubmit={handleSave}>
            <FieldGroup>
              <Label><FiUser size={14} /> Name</Label>
              <Input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Your name"
              />
            </FieldGroup>

            <FieldGroup>
              <Label><FiMail size={14} /> Email</Label>
              <ReadOnlyInput type="email" value={email} readOnly />
            </FieldGroup>

            <SaveButton type="submit" disabled={saving}>
              <FiSave size={16} /> {saving ? "Saving..." : "Save Changes"}
            </SaveButton>
          </form>
        </Card>
      </Wrapper>
    </Container>
  );
};

export default ProfileSettings;
