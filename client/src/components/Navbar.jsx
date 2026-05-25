import React, { useState, useEffect, useRef } from "react";
import styled, { keyframes } from "styled-components";
import LogoImg from "../utils/Images/Logo.png";
import { Link as LinkR, NavLink, useNavigate } from "react-router-dom";
import { FiMenu, FiX, FiSun, FiMoon, FiUser, FiLogOut, FiChevronDown, FiChevronsLeft, FiGrid, FiZap, FiBookOpen, FiFileText, FiMail, FiShield } from "react-icons/fi";

const fadeInUp = keyframes`
  from { opacity: 0; transform: translateY(8px); }
  to   { opacity: 1; transform: translateY(0); }
`;

const MobileHeader = styled.div`
  display: none;
  @media (max-width: 768px) {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 12px 16px;
    background: ${({ theme }) => theme.card}CC;
    backdrop-filter: blur(16px);
    border-bottom: 1px solid ${({ theme }) => theme.border};
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    z-index: 999;
  }
`;

const MobileLogo = styled(LinkR)`
  display: flex;
  align-items: center;
  gap: 10px;
  font-weight: 800;
  font-size: 18px;
  text-decoration: none;
  color: ${({ theme }) => theme.text_primary};
  letter-spacing: -0.5px;
`;

const MobileMenuBtn = styled.button`
  display: none;
  background: none;
  border: none;
  cursor: pointer;
  color: ${({ theme }) => theme.text_primary};
  font-size: 22px;
  padding: 4px;
  border-radius: 8px;
  transition: all 0.2s ease;

  &:hover {
    background: ${({ theme }) => theme.primary}12;
    color: ${({ theme }) => theme.primary};
  }

  @media screen and (max-width: 768px) {
    display: flex;
    align-items: center;
  }
`;

const Backdrop = styled.div`
  display: none;
  @media (max-width: 768px) {
    display: ${({ open }) => open ? "block" : "none"};
    position: fixed;
    inset: 0;
    background: rgba(0, 0, 0, 0.5);
    z-index: 998;
  }
`;

const Sidebar = styled.div`
  position: fixed;
  left: 0;
  top: 0;
  width: ${({ collapsed }) => collapsed ? "64px" : "260px"};
  height: 100vh;
  background: ${({ theme }) => theme.card};
  border-right: 1px solid ${({ theme }) => theme.border};
  display: flex;
  flex-direction: column;
  z-index: 1000;
  transition: width 0.3s ease, transform 0.3s ease;
  overflow: hidden;

  @media (max-width: 768px) {
    width: 260px;
    top: 56px;
    height: calc(100dvh - 56px);
    transform: ${({ open }) => open ? "translateX(0)" : "translateX(-100%)"};
    box-shadow: 4px 0 24px rgba(0, 0, 0, 0.15);
  }
`;

const SidebarInner = styled.div`
  display: flex;
  flex-direction: column;
  align-items: ${({ collapsed }) => collapsed ? "center" : "stretch"};
  height: 100%;
  padding: ${({ collapsed }) => collapsed ? "20px 0" : "20px"};
  overflow-y: auto;
  min-height: 0;
  overscroll-behavior: contain;

  @media (max-width: 768px) {
    padding: 20px 20px 24px;
  }
`;

const SidebarHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  margin-bottom: 32px;
  flex-shrink: 0;
`;

const NavLogo = styled(LinkR)`
  display: flex;
  align-items: center;
  gap: 10px;
  font-weight: 800;
  font-size: 20px;
  text-decoration: none;
  color: ${({ theme }) => theme.text_primary};
  letter-spacing: -0.5px;
  overflow: hidden;

  @media (max-width: 768px) {
    display: none;
  }
`;

const Logo = styled.img`
  height: 36px;
  flex-shrink: 0;
`;

const CollapseBtn = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 32px;
  height: 32px;
  background: none;
  border: none;
  color: ${({ theme }) => theme.text_secondary};
  cursor: pointer;
  border-radius: 8px;
  transition: all 0.2s ease;
  flex-shrink: 0;

  &:hover {
    background: ${({ theme }) => theme.primary}12;
    color: ${({ theme }) => theme.primary};
  }

  @media (max-width: 768px) {
    display: none;
  }
`;

const NavLabel = styled.span`
  font-size: 11px;
  text-transform: uppercase;
  letter-spacing: 0.8px;
  font-weight: 700;
  color: ${({ theme }) => theme.text_secondary};
  padding: 0 12px;
  margin-bottom: 8px;
  margin-top: 4px;
  white-space: nowrap;
  overflow: hidden;
`;

const NavItems = styled.nav`
  display: flex;
  flex-direction: column;
  gap: 2px;
  flex: 1;
`;

const Navlink = styled(NavLink)`
  display: flex;
  align-items: center;
  justify-content: ${({ collapsed }) => collapsed ? "center" : "flex-start"};
  gap: 12px;
  color: ${({ theme }) => theme.text_secondary};
  font-weight: 500;
  font-size: 14px;
  cursor: pointer;
  transition: all 0.2s ease;
  text-decoration: none;
  padding: ${({ collapsed }) => collapsed ? "0" : "10px 12px"};
  border-radius: 10px;
  ${({ collapsed }) => collapsed && "width: 36px; height: 36px;"}

  &:hover {
    color: ${({ theme }) => theme.primary};
    background: ${({ theme }) => theme.primary}12;
  }
  &.active {
    color: ${({ theme }) => theme.primary};
    font-weight: 600;
    background: ${({ theme }) => theme.primary}15;
  }

  svg {
    flex-shrink: 0;
  }
`;

const BottomSection = styled.div`
  border-top: 1px solid ${({ theme }) => theme.border};
  padding-top: 16px;
  margin-top: auto;
`;

const ProfileWrapper = styled.div`
  position: relative;
`;

const AvatarButton = styled.button`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: ${({ collapsed }) => collapsed ? "center" : "flex-start"};
  gap: 10px;
  padding: ${({ collapsed }) => collapsed ? "10px" : "10px 12px"};
  background: ${({ theme }) => theme.bg};
  border: 1px solid ${({ theme }) => theme.border};
  border-radius: 12px;
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    border-color: ${({ theme }) => theme.primary};
    box-shadow: 0 0 0 3px ${({ theme }) => theme.primary}20;
  }
`;

const Avatar = styled.div`
  width: 34px;
  height: 34px;
  border-radius: 50%;
  background: linear-gradient(135deg, ${({ theme }) => theme.primary}, ${({ theme }) => theme.secondary});
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 700;
  font-size: 14px;
  flex-shrink: 0;
`;

const AvatarName = styled.span`
  font-size: 14px;
  font-weight: 600;
  color: ${({ theme }) => theme.text_primary};
  flex: 1;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  text-align: left;
`;

const ChevronIcon = styled(FiChevronDown)`
  color: ${({ theme }) => theme.text_secondary};
  transition: transform 0.2s ease;
  ${({ open }) => open && "transform: rotate(180deg);"}
`;

const Dropdown = styled.div`
  position: absolute;
  bottom: calc(100% + 10px);
  left: 0;
  right: 0;
  min-width: 240px;
  background: ${({ theme }) => theme.card};
  border: 1px solid ${({ theme }) => theme.border};
  border-radius: 16px;
  box-shadow: 0 16px 40px ${({ theme }) => theme.shadow};
  overflow: hidden;
  animation: ${fadeInUp} 0.2s ease;
  z-index: 2000;
`;

const DropdownHeader = styled.div`
  padding: 16px 20px;
  border-bottom: 1px solid ${({ theme }) => theme.border};
`;

const DropdownName = styled.div`
  font-size: 15px;
  font-weight: 700;
  color: ${({ theme }) => theme.text_primary};
`;

const DropdownEmail = styled.div`
  font-size: 12px;
  color: ${({ theme }) => theme.text_secondary};
  margin-top: 2px;
`;

const DropdownSection = styled.div`
  padding: 8px;
`;

const DropdownLabel = styled.div`
  font-size: 11px;
  text-transform: uppercase;
  letter-spacing: 0.8px;
  font-weight: 600;
  color: ${({ theme }) => theme.text_secondary};
  padding: 8px 12px 4px;
`;

const DropdownItem = styled.button`
  width: 100%;
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 10px 12px;
  background: none;
  border: none;
  border-radius: 10px;
  cursor: pointer;
  font-size: 14px;
  font-weight: 500;
  color: ${({ danger, theme }) => danger ? theme.red : theme.text_primary};
  transition: all 0.15s ease;
  text-align: left;

  &:hover {
    background: ${({ danger, theme }) => danger ? theme.red + "12" : theme.primary + "12"};
    color: ${({ danger, theme }) => danger ? theme.red : theme.primary};
  }

  svg {
    flex-shrink: 0;
  }
`;

const DropdownDivider = styled.div`
  height: 1px;
  background: ${({ theme }) => theme.border};
  margin: 4px 12px;
`;

const ThemeToggle = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 10px 12px;
  border-radius: 10px;
`;

const ThemeLabel = styled.span`
  font-size: 14px;
  font-weight: 500;
  color: ${({ theme }) => theme.text_primary};
  flex: 1;
`;

const ToggleSwitch = styled.button`
  position: relative;
  width: 44px;
  height: 24px;
  background: ${({ active, theme }) => active ? theme.primary : theme.border};
  border: none;
  border-radius: 12px;
  cursor: pointer;
  transition: background 0.3s ease;
  flex-shrink: 0;

  &::after {
    content: "";
    position: absolute;
    top: 3px;
    left: ${({ active }) => active ? "23px" : "3px"};
    width: 18px;
    height: 18px;
    background: white;
    border-radius: 50%;
    transition: left 0.3s ease;
    box-shadow: 0 1px 4px rgba(0,0,0,0.2);
  }
`;

const Navbar = ({ currentUser, onLogout, themeMode, toggleTheme, collapsed, onToggleCollapse }) => {
  const navigate = useNavigate();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [dropdownFixedPos, setDropdownFixedPos] = useState({ top: 0, left: 0 });
  const [screenWidth, setScreenWidth] = useState(window.innerWidth);
  const dropdownRef = useRef(null);
  const avatarBtnRef = useRef(null);

  useEffect(() => {
    const handleResize = () => setScreenWidth(window.innerWidth);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const isMobile = screenWidth <= 768;
  const effectiveCollapsed = isMobile ? false : collapsed;

  useEffect(() => {
    const handleClick = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  useEffect(() => {
    if (dropdownOpen && effectiveCollapsed && avatarBtnRef.current) {
      const rect = avatarBtnRef.current.getBoundingClientRect();
      const ddHeight = 320;
      const top = (rect.top + ddHeight > window.innerHeight)
        ? window.innerHeight - ddHeight - 16
        : rect.top;
      setDropdownFixedPos({ top, left: rect.right + 8 });
    }
  }, [dropdownOpen, effectiveCollapsed]);

  if (!currentUser) return null;

  const initials = currentUser?.name
    ? currentUser.name.split(" ").map(w => w[0]).join("").toUpperCase().slice(0, 2)
    : typeof currentUser === "string"
    ? currentUser[0]?.toUpperCase() || "U"
    : "U";

  const displayName = currentUser?.name || (typeof currentUser === "string" ? "User" : "User");
  const displayEmail = currentUser?.email || "";

  const navLinks = [
    { to: "/", label: "Dashboard", icon: <FiGrid size={18} /> },
    { to: "/workouts", label: "Workouts", icon: <FiZap size={18} /> },
    { to: "/tutorials", label: "Tutorials", icon: <FiBookOpen size={18} /> },
    { to: "/blogs", label: "Blog", icon: <FiFileText size={18} /> },
    { to: "/contact", label: "Contact", icon: <FiMail size={18} /> },
    ...(currentUser?.is_admin ? [{ to: "/admin", label: "Admin", icon: <FiShield size={18} /> }] : []),
  ];

  const closeAll = () => {
    setMobileOpen(false);
    setDropdownOpen(false);
  };

  return (
    <>
      <MobileHeader>
        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          <MobileMenuBtn onClick={() => setMobileOpen((o) => !o)}>
            {mobileOpen ? <FiX size={20} /> : <FiMenu size={20} />}
          </MobileMenuBtn>
          <MobileLogo to="/" onClick={closeAll}>
            <Logo src={LogoImg} alt="PeakPulse" />
            PeakPulse
          </MobileLogo>
        </div>
      </MobileHeader>

      <Backdrop open={mobileOpen ? 1 : 0} onClick={() => setMobileOpen(false)} />

      <Sidebar open={mobileOpen ? 1 : 0} collapsed={effectiveCollapsed ? 1 : 0}>
        <SidebarInner collapsed={effectiveCollapsed ? 1 : 0}>
          {!effectiveCollapsed && (
            <SidebarHeader>
              <NavLogo to="/">
                <Logo src={LogoImg} alt="PeakPulse" />
                <span>PeakPulse</span>
              </NavLogo>
              <CollapseBtn onClick={onToggleCollapse} aria-label="Collapse sidebar">
                <FiChevronsLeft size={18} />
              </CollapseBtn>
            </SidebarHeader>
          )}
          {effectiveCollapsed && (
            <CollapseBtn onClick={onToggleCollapse} aria-label="Expand sidebar" style={{ marginBottom: 32 }}>
              <FiChevronsLeft size={18} style={{ transform: "rotate(180deg)" }} />
            </CollapseBtn>
          )}

          {!effectiveCollapsed && <NavLabel>Menu</NavLabel>}

          <NavItems>
            {navLinks.map((link) => (
              <Navlink key={link.to} to={link.to} end={link.to === "/"} collapsed={effectiveCollapsed ? 1 : 0} onClick={() => setMobileOpen(false)}>
                {link.icon}
                {!effectiveCollapsed && <span>{link.label}</span>}
              </Navlink>
            ))}
          </NavItems>

          <BottomSection>
            <ProfileWrapper ref={dropdownRef}>
              <AvatarButton ref={avatarBtnRef} onClick={() => setDropdownOpen((o) => !o)} collapsed={effectiveCollapsed ? 1 : 0}>
                <Avatar>{initials}</Avatar>
                {!effectiveCollapsed && <AvatarName>{displayName}</AvatarName>}
                {!effectiveCollapsed && <ChevronIcon open={dropdownOpen ? 1 : 0} size={14} />}
              </AvatarButton>

              {dropdownOpen && (
                <Dropdown style={effectiveCollapsed ? { position: "fixed", top: dropdownFixedPos.top, left: dropdownFixedPos.left, bottom: "auto", right: "auto", zIndex: 3000 } : {}}>
                  <DropdownHeader>
                    <DropdownName>{displayName}</DropdownName>
                    <DropdownEmail>{displayEmail || "Fitness Enthusiast"}</DropdownEmail>
                  </DropdownHeader>

                  <DropdownSection>
                    <DropdownLabel>Appearance</DropdownLabel>
                    <ThemeToggle>
                      {themeMode === "light" ? <FiSun size={16} /> : <FiMoon size={16} />}
                      <ThemeLabel>{themeMode === "light" ? "Light Mode" : "Dark Mode"}</ThemeLabel>
                      <ToggleSwitch
                        active={themeMode === "dark" ? 1 : 0}
                        onClick={toggleTheme}
                        aria-label="Toggle theme"
                      />
                    </ThemeToggle>
                  </DropdownSection>

                  <DropdownDivider />

                  <DropdownSection>
                    <DropdownItem onClick={() => { navigate("/profile"); setDropdownOpen(false); setMobileOpen(false); }}>
                      <FiUser size={16} />
                      Profile Settings
                    </DropdownItem>
                    <DropdownItem danger onClick={() => { onLogout(); setDropdownOpen(false); }}>
                      <FiLogOut size={16} />
                      Logout
                    </DropdownItem>
                  </DropdownSection>
                </Dropdown>
              )}
            </ProfileWrapper>
          </BottomSection>
        </SidebarInner>
      </Sidebar>

    </>
  );
};

export default Navbar;
