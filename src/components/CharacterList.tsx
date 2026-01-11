'use client';
import { useState } from 'react';
import styled from 'styled-components';
import { motion, Variants } from 'framer-motion'; // Importamos Variants para tipagem correta
import { Character } from '@/types/rickAndMorty';
import { CharacterCard } from './CharacterCard';
import { SearchSection } from './SearchSection';

const Grid = styled(motion.div)`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: 2.5rem;
  width: 100%;
`;

// Definindo as animações com a tipagem Variants para evitar o erro de 'string'
const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1 // Atraso entre os filhos (efeito cascata)
    }
  }
};

const portalEmergence: Variants = {
  hidden: {
    scale: 0,
    opacity: 0,
    rotate: -180
  },
  visible: {
    scale: 1,
    opacity: 1,
    rotate: 0,
    transition: {
      type: "spring", // O 'as const' ou a tipagem Variants resolve o erro aqui
      stiffness: 100,
      duration: 0.8
    }
  }
};

export function CharacterList({ initialCharacters }: { initialCharacters: Character[] }) {
  const [searchTerm, setSearchTerm] = useState('');

  // Filtra os personagens baseado no que o usuário digita
  const filteredCharacters = initialCharacters.filter((char) =>
    char.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <>
      {/* Seção de cabeçalho e busca que surge do centro */}
      <motion.div
        variants={portalEmergence}
        initial="hidden"
        animate="visible"
      >
        <header style={{ textAlign: 'center', marginBottom: '4rem' }}>
          <h1 style={{
            fontSize: 'clamp(2rem, 8vw, 4rem)',
            color: '#97ce4c',
            textShadow: '3px 3px #ff00ff',
            marginBottom: '1rem'
          }}>
            RICK AND MORTY <br /> PSYCHEDELIC
          </h1>
          <p style={{ color: '#fff', opacity: 0.8 }}>Explore as dimensões</p>
        </header>

        <SearchSection searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
      </motion.div>

      {/* Grid de cards com animação de entrada coordenada */}
      {filteredCharacters.length > 0 ? (
        <Grid
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {filteredCharacters.map((char) => (
            <CharacterCard key={char.id} character={char} />
          ))}
        </Grid>
      ) : (
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          style={{ textAlign: 'center', color: '#b2ff00', fontSize: '1.5rem', marginTop: '3rem' }}
        >
          Nenhum personagem encontrado nesta dimensão! 🛸
        </motion.p>
      )}
    </>
  );
}