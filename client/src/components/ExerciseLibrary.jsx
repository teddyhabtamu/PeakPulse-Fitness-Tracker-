import React, { useState, useMemo } from "react";
import styled from "styled-components";
import { FiSearch, FiX, FiZap, FiClock, FiChevronRight, FiActivity } from "react-icons/fi";
import { categories, getExercisesByCategory, searchExercises } from "../utils/exercises";

const Overlay = styled.div`
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.6);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 5000;
  padding: 24px;

  @media (max-width: 600px) {
    padding: 8px;
    align-items: flex-end;
  }
`;

const Modal = styled.div`
  width: 100%;
  max-width: 680px;
  max-height: 80vh;
  background: ${({ theme }) => theme.card};
  border: 1px solid ${({ theme }) => theme.border};
  border-radius: 20px;
  display: flex;
  flex-direction: column;
  overflow: hidden;
  animation: fadeIn 0.2s ease;

  @keyframes fadeIn {
    from { opacity: 0; transform: translateY(10px); }
    to { opacity: 1; transform: translateY(0); }
  }

  @media (max-width: 600px) {
    max-height: 90vh;
    border-radius: 20px 20px 0 0;
    max-width: 100%;
  }
`;

const Header = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 20px 24px;
  border-bottom: 1px solid ${({ theme }) => theme.border};

  @media (max-width: 600px) {
    padding: 16px;
  }
`;

const HeaderTitle = styled.h2`
  margin: 0;
  font-size: 18px;
  font-weight: 700;
  color: ${({ theme }) => theme.text_primary};
  display: flex;
  align-items: center;
  gap: 10px;
`;

const CloseBtn = styled.button`
  background: none;
  border: none;
  color: ${({ theme }) => theme.text_secondary};
  cursor: pointer;
  font-size: 20px;
  padding: 4px;
  border-radius: 8px;
  transition: all 0.2s;
  display: flex;

  &:hover {
    background: ${({ theme }) => theme.primary}12;
    color: ${({ theme }) => theme.primary};
  }
`;

const SearchWrapper = styled.div`
  padding: 16px 24px;
  position: relative;

  @media (max-width: 600px) {
    padding: 12px 16px;
  }
`;

const SearchInput = styled.input`
  width: 100%;
  padding: 12px 16px 12px 44px;
  background: ${({ theme }) => theme.bg};
  border: 1px solid ${({ theme }) => theme.border};
  border-radius: 12px;
  color: ${({ theme }) => theme.text_primary};
  font-size: 15px;
  outline: none;
  box-sizing: border-box;
  transition: border-color 0.2s;

  &:focus {
    border-color: ${({ theme }) => theme.primary};
    box-shadow: 0 0 0 3px ${({ theme }) => theme.primary}20;
  }

  &::placeholder {
    color: ${({ theme }) => theme.text_secondary};
  }
`;

const SearchIcon = styled(FiSearch)`
  position: absolute;
  left: 40px;
  top: 50%;
  transform: translateY(-50%);
  color: ${({ theme }) => theme.text_secondary};
  pointer-events: none;

  @media (max-width: 600px) {
    left: 32px;
  }
`;

const TabBar = styled.div`
  display: flex;
  align-items: center;
  gap: 6px;
  padding: 8px 24px 16px;
  overflow-x: auto;
  overflow-y: hidden;
  scrollbar-width: none;
  width: 100%;
  flex-shrink: 0;
  min-width: 0;
  min-height: 42px;
  box-sizing: border-box;

  &::-webkit-scrollbar { display: none; }

  @media (max-width: 600px) {
    padding: 8px 16px 12px;
  }
`;

const Tab = styled.button`
  padding: 8px 16px;
  background: ${({ active, theme }) => active ? theme.primary + "20" : theme.bg};
  border: 1px solid ${({ active, theme }) => active ? theme.primary + "40" : theme.border};
  border-radius: 20px;
  color: ${({ active, theme }) => active ? theme.primary : theme.text_secondary};
  font-size: 13px;
  font-weight: 600;
  cursor: pointer;
  white-space: nowrap;
  transition: all 0.2s;
  flex-shrink: 0;

  &:hover {
    border-color: ${({ theme }) => theme.primary}40;
    color: ${({ theme }) => theme.primary};
  }
`;

const ExerciseList = styled.div`
  flex: 1;
  overflow-y: auto;
  padding: 4px 24px 24px;
  display: flex;
  flex-direction: column;
  gap: 6px;

  @media (max-width: 600px) {
    padding: 4px 16px 16px;
  }
`;

const ExerciseItem = styled.button`
  width: 100%;
  display: flex;
  align-items: center;
  gap: 14px;
  padding: 14px 16px;
  background: ${({ theme }) => theme.bg};
  border: 1px solid ${({ theme }) => theme.border};
  border-radius: 14px;
  cursor: pointer;
  transition: all 0.2s;
  text-align: left;

  &:hover {
    border-color: ${({ theme }) => theme.primary}50;
    background: ${({ theme }) => theme.primary}08;
    transform: translateX(4px);
  }
`;

const ExerciseIcon = styled.div`
  width: 42px;
  height: 42px;
  border-radius: 12px;
  background: ${({ theme }) => theme.primary}15;
  color: ${({ theme }) => theme.primary};
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 18px;
  flex-shrink: 0;
`;

const ExerciseInfo = styled.div`
  flex: 1;
  min-width: 0;
`;

const ExerciseName = styled.div`
  font-size: 15px;
  font-weight: 600;
  color: ${({ theme }) => theme.text_primary};
`;

const ExerciseMeta = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  margin-top: 4px;
  font-size: 12px;
  color: ${({ theme }) => theme.text_secondary};
  flex-wrap: wrap;

  @media (max-width: 600px) {
    gap: 4px;
    font-size: 11px;
  }
`;

const MetaTag = styled.span`
  display: flex;
  align-items: center;
  gap: 4px;
`;

const Chevron = styled(FiChevronRight)`
  color: ${({ theme }) => theme.text_secondary};
  flex-shrink: 0;
  transition: transform 0.2s;

  ${ExerciseItem}:hover & {
    transform: translateX(2px);
    color: ${({ theme }) => theme.primary};
  }
`;

const EmptyState = styled.div`
  text-align: center;
  padding: 48px 24px;
  color: ${({ theme }) => theme.text_secondary};
  font-size: 14px;
`;

const ExerciseLibrary = ({ onSelect, onClose }) => {
  const [activeCategory, setActiveCategory] = useState("All");
  const [search, setSearch] = useState("");

  const filtered = useMemo(() => {
    if (search.trim()) return searchExercises(search);
    if (activeCategory === "All") {
      const all = [];
      categories.forEach((cat) => all.push(...getExercisesByCategory(cat)));
      return all;
    }
    return getExercisesByCategory(activeCategory);
  }, [activeCategory, search]);

  const handleSelect = (exercise) => {
    onSelect(exercise);
    onClose();
  };

  return (
    <Overlay onClick={(e) => e.target === e.currentTarget && onClose()}>
      <Modal>
        <Header>
          <HeaderTitle>
            <FiZap size={20} />
            Exercise Library
          </HeaderTitle>
          <CloseBtn onClick={onClose}><FiX size={20} /></CloseBtn>
        </Header>

        <SearchWrapper>
          <SearchInput
            placeholder="Search exercises..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            autoFocus
          />
          <SearchIcon size={18} />
        </SearchWrapper>

        {!search && (
          <TabBar>
            <Tab active={activeCategory === "All"} onClick={() => setActiveCategory("All")}>All</Tab>
            {categories.map((cat) => (
              <Tab key={cat} active={activeCategory === cat} onClick={() => setActiveCategory(cat)}>
                {cat}
              </Tab>
            ))}
          </TabBar>
        )}

        <ExerciseList>
          {filtered.length === 0 ? (
            <EmptyState>
              <FiActivity size={32} style={{ marginBottom: 12, opacity: 0.4 }} />
              <div>No exercises found</div>
            </EmptyState>
          ) : (
            filtered.map((ex, i) => (
              <ExerciseItem key={`${ex.name}-${i}`} onClick={() => handleSelect(ex)}>
                <ExerciseIcon>
                  <FiZap />
                </ExerciseIcon>
                <ExerciseInfo>
                  <ExerciseName>{ex.name}</ExerciseName>
                  <ExerciseMeta>
                    <MetaTag>{ex.category}</MetaTag>
                    {ex.defaultSets && <MetaTag><FiZap size={11} /> {ex.defaultSets} sets</MetaTag>}
                    {ex.defaultReps > 0 && <MetaTag>×{ex.defaultReps} reps</MetaTag>}
                    {ex.defaultDuration && <MetaTag><FiClock size={11} /> {ex.defaultDuration} min</MetaTag>}
                    <MetaTag>•</MetaTag>
                    <MetaTag>{ex.description}</MetaTag>
                  </ExerciseMeta>
                </ExerciseInfo>
                <Chevron size={18} />
              </ExerciseItem>
            ))
          )}
        </ExerciseList>
      </Modal>
    </Overlay>
  );
};

export default ExerciseLibrary;
