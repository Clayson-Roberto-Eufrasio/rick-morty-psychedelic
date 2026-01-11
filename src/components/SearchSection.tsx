'use client';
import styled from 'styled-components';

const SearchContainer = styled.div`
  display: flex;
  justify-content: center;
  margin-bottom: 3rem;
  width: 100%;
`;

const StyledInput = styled.input`
  width: 100%;
  max-width: 500px;
  padding: 1rem 1.5rem;
  font-size: 1.2rem;
  background: rgba(0, 0, 0, 0.6);
  border: 2px solid #97ce4c;
  border-radius: 50px;
  color: white;
  outline: none;
  transition: all 0.3s ease;
  box-shadow: 0 0 10px rgba(151, 206, 76, 0.2);

  &:focus {
    box-shadow: 0 0 20px #97ce4c, 0 0 10px #ff00ff;
    border-color: #ff00ff;
    transform: scale(1.02);
  }

  &::placeholder {
    color: rgba(255, 255, 255, 0.5);
  }
`;

// Tipagem para as props do componente
interface SearchProps {
  searchTerm: string;
  setSearchTerm: (value: string) => void;
}

export function SearchSection({ searchTerm, setSearchTerm }: SearchProps) {
  return (
    <SearchContainer>
      <StyledInput
        type="text"
        placeholder="Procure um personagem (ex: Rick, Morty...)"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
    </SearchContainer>
  );
}