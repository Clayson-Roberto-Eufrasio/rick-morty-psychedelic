'use client';
import { useState, useEffect, useRef, useCallback } from 'react';
import styled from 'styled-components';
import { motion, Variants } from 'framer-motion';
import { Character, ApiResponse } from '@/types/rickAndMorty';
import { CharacterCard } from './CharacterCard';
import { SearchSection } from './SearchSection';

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: 2.5rem;
  width: 100%;
  padding-bottom: 5rem;
`;

const LoaderSection = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 3rem;
  min-height: 100px;
`;

// Animação inicial do cabeçalho
const portalHeader: Variants = {
  hidden: { scale: 0.5, opacity: 0, filter: 'blur(20px)' },
  visible: {
    scale: 1,
    opacity: 1,
    filter: 'blur(0px)',
    transition: { type: "spring", stiffness: 80, duration: 1 }
  }
};

export function CharacterList({ initialCharacters }: { initialCharacters: Character[] }) {
  const [characters, setCharacters] = useState<Character[]>(initialCharacters);
  const [searchTerm, setSearchTerm] = useState('');
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [isLoading, setIsLoading] = useState(false);

  const observerTarget = useRef<HTMLDivElement>(null);

  // Função para buscar novos personagens na API
  const fetchNextPage = useCallback(async () => {
    if (isLoading || !hasMore) return;

    setIsLoading(true);
    try {
      const nextPage = page + 1;
      const res = await fetch(`https://rickandmortyapi.com/api/character?page=${nextPage}`);
      const data: ApiResponse = await res.json();

      if (data.results) {
        // Adiciona os novos personagens à lista existente
        setCharacters((prev) => [...prev, ...data.results]);
        setPage(nextPage);
      }

      if (!data.info.next) setHasMore(false);
    } catch (error) {
      console.error("Erro interdimensional:", error);
    } finally {
      setIsLoading(false);
    }
  }, [page, isLoading, hasMore]);

  // Observer para detectar o fim da página com margem de segurança
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        // Dispara o fetch quando o usuário está a 1500px do fim
        if (entries[0].isIntersecting && hasMore && !isLoading && searchTerm === '') {
          fetchNextPage();
        }
      },
      { rootMargin: '1500px', threshold: 0.01 }
    );

    if (observerTarget.current) observer.observe(observerTarget.current);
    return () => observer.disconnect();
  }, [fetchNextPage, hasMore, searchTerm, isLoading]);

  // Filtro de busca local
  const filteredCharacters = characters.filter((char) =>
    char.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <>
      {/* Cabeçalho Animado */}
      <motion.div variants={portalHeader} initial="hidden" animate="visible">
        <header style={{ textAlign: 'center', marginBottom: '4rem' }}>
          <h1 style={{
            fontSize: 'clamp(2.5rem, 10vw, 5.5rem)',
            color: '#97ce4c',
            textShadow: '0 0 20px rgba(151, 206, 76, 0.4), 5px 5px #ff00ff',
            marginBottom: '0.5rem',
            fontFamily: 'monospace',
            letterSpacing: '-2px'
          }}>
            RICK AND MORTY
          </h1>
          <p style={{ color: '#fff', fontSize: '1.3rem', letterSpacing: '3px', opacity: 0.8 }}>
            REVELANDO DIMENSÕES
          </p>
        </header>

        <SearchSection searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
      </motion.div>

      {/* Listagem de Cards */}
      {filteredCharacters.length > 0 ? (
        <>
          <Grid>
            {filteredCharacters.map((char) => (
              <CharacterCard key={char.id} character={char} />
            ))}
          </Grid>

          {/* Alvo do Observer */}
          <LoaderSection ref={observerTarget}>
            {isLoading && (
              <motion.div
                animate={{ rotate: 360, scale: [1, 1.2, 1] }}
                transition={{ duration: 1.5, repeat: Infinity }}
                style={{ fontSize: '3rem' }}
              >
                🌀
              </motion.div>
            )}
          </LoaderSection>
        </>
      ) : (
        <div style={{ textAlign: 'center', padding: '5rem' }}>
          <h2 style={{ color: '#b2ff00' }}>Nenhum sinal de vida nesta coordenada... 🛸</h2>
        </div>
      )}
    </>
  );
}