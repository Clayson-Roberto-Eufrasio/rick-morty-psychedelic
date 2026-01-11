'use client';
import { useState } from 'react';
import styled from 'styled-components';
import { Character } from '@/types/rickAndMorty';
import { CharacterCard } from './CharacterCard';
import { SearchSection } from './SearchSection';

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: 2.5rem;
  width: 100%;
`;

const NoResults = styled.p`
  text-align: center;
  font-size: 1.5rem;
  color: #ff00ff;
  text-shadow: 0 0 10px #ff00ff;
  margin-top: 2rem;
`;

export function CharacterList({ initialCharacters }: { initialCharacters: Character[] }) {
  const [searchTerm, setSearchTerm] = useState('');

  // Lógica de filtro: converte tudo para minúsculo para busca não ser case-sensitive
  const filteredCharacters = initialCharacters.filter((char) =>
    char.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <>
      {/* Passamos o estado e o setter para o componente de busca */}
      <SearchSection searchTerm={searchTerm} setSearchTerm={setSearchTerm} />

      {filteredCharacters.length > 0 ? (
        <Grid>
          {filteredCharacters.map((char) => (
            <CharacterCard key={char.id} character={char} />
          ))}
        </Grid>
      ) : (
        <NoResults>Nenhum personagem encontrado nesta dimensão! 🛸</NoResults>
      )}
    </>
  );
}