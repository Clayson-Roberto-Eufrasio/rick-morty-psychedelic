'use client';
import { useState } from 'react';
import styled from 'styled-components';
import Image from 'next/image';

// --- Estilos ---
const Card = styled.div`
  border: 2px solid #97ce4c;
  border-radius: 12px;
  background: rgba(20, 20, 20, 0.8);
  overflow: hidden;
  transition: 0.4s;
  cursor: pointer;
  position: relative;

  &:hover {
    transform: translateY(-10px) scale(1.02);
    box-shadow: 0 0 25px #97ce4c, 0 0 50px #ff00ff;
    filter: hue-rotate(15deg); // Efeito psicodélico suave
  }
`;

// Estilizando o componente Image do Next
const StyledImage = styled(Image)`
  object-fit: cover;
  transition: transform 0.5s ease;
`;

const ImageContainer = styled.div`
  width: 100%;
  height: 250px;
  position: relative; // Necessário para imagens com layout 'fill'
  overflow: hidden;
`;

const ModalOverlay = styled.div`
  position: fixed;
  top: 0; left: 0; width: 100%; height: 100%;
  background: rgba(0, 0, 0, 0.7);
  // O segredo do efeito psicodélico no modal:
  backdrop-filter: blur(12px) saturate(180%); 
  -webkit-backdrop-filter: blur(12px) saturate(180%);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
  padding: 20px;
`;

const ModalContent = styled.div`
  background: #1a1a1a;
  border: 3px solid #ff00ff;
  box-shadow: 0 0 30px #ff00ff;
  padding: 2rem;
  border-radius: 20px;
  max-width: 500px;
  width: 100%;
  position: relative;
  text-align: center;

  img {
    border-radius: 50%;
    border: 4px solid #97ce4c;
    margin-bottom: 1rem;
    width: 150px;
  }
`;

// --- Interface de Tipos (TypeScript) ---
interface Character {
  id: number;
  name: string;
  image: string;
  status: string;
  species: string;
  gender: string;
  origin: { name: string };
}

export function CharacterCard({ character }: { character: Character }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <Card onClick={() => setIsOpen(true)}>
        <ImageContainer>
          <StyledImage
            src={character.image}
            alt={character.name}
            fill // Faz a imagem preencher o container pai
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            priority={character.id <= 6} // Carrega as primeiras imagens com prioridade (LCP)
          />
        </ImageContainer>
        <div style={{ padding: '1rem' }}>
          <h3>{character.name}</h3>
          <p style={{ color: '#97ce4c' }}>{character.species}</p>
        </div>
      </Card>

      {isOpen && (
        <ModalOverlay onClick={() => setIsOpen(false)}>
          <ModalContent onClick={e => e.stopPropagation()}>
            <div style={{ position: 'relative', width: '150px', height: '150px', margin: '0 auto 1rem' }}>
              <Image
                src={character.image}
                alt={character.name}
                fill
                style={{ borderRadius: '50%', border: '4px solid #97ce4c' }}
              />
            </div>
            <h2 style={{ color: '#ff00ff', fontSize: '2rem' }}>{character.name}</h2>
            <hr style={{ margin: '1rem 0', borderColor: '#ffffff', color: '#ffffff' }} />
            <p><strong>Status:</strong> {character.status}</p>
            <p><strong>Espécie:</strong> {character.species}</p>
            <p><strong>Gênero:</strong> {character.gender}</p>
            <p><strong>Origem:</strong> {character.origin.name}</p>
            <button
              onClick={() => setIsOpen(false)}
              style={{ marginTop: '1.5rem', padding: '0.5rem 2rem', cursor: 'pointer', background: '#97ce4c', border: 'none', fontWeight: 'bold' }}
            >
              FECHAR
            </button>
          </ModalContent>
        </ModalOverlay>
      )}
    </>
  );
}