'use client';
import { useState } from 'react';
import styled from 'styled-components';
import Image from 'next/image';
import { motion, AnimatePresence, Variants } from 'framer-motion';
import { Character } from '@/types/rickAndMorty';

// Estilização do Card com Styled Components + Framer Motion
const Card = styled(motion.div)`
  border: 2px solid #97ce4c;
  border-radius: 12px;
  background: rgba(20, 20, 20, 0.8);
  overflow: hidden;
  cursor: pointer;
  position: relative;
`;

const ImageContainer = styled.div`
  width: 100%;
  height: 250px;
  position: relative;
  overflow: hidden;
`;

const ModalOverlay = styled(motion.div)`
  position: fixed;
  top: 0; left: 0; width: 100%; height: 100%;
  background: rgba(0, 0, 0, 0.85);
  backdrop-filter: blur(15px);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
  padding: 20px;
`;

const ModalContent = styled(motion.div)`
  background: #1a1a1a;
  padding: 2rem;
  border-radius: 20px;
  border: 3px solid #b2ff00;
  text-align: center;
  max-width: 400px;
  width: 100%;
  box-shadow: 0 0 30px rgba(255, 0, 255, 0.3);
`;

// Variantes do Card corrigidas com o tipo Variants
const cardItemVariants: Variants = {
  hidden: { y: 50, opacity: 0, scale: 0.5 },
  visible: {
    y: 0,
    opacity: 1,
    scale: 1,
    transition: {
      type: "spring", // O segredo é que agora o TypeScript sabe que isso é Variants
      bounce: 0.4
    }
  }
};

export function CharacterCard({ character }: { character: Character }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <Card
        variants={cardItemVariants}
        whileHover={{
          scale: 1.05,
          rotate: 2,
          boxShadow: "0px 0px 20px #97ce4c",
          zIndex: 10
        }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setIsOpen(true)}
      >
        <ImageContainer>
          <Image
            src={character.image}
            alt={character.name}
            fill
            sizes="250px"
            style={{ objectFit: 'cover' }}
          />
        </ImageContainer>
        <div style={{ padding: '1rem' }}>
          <h3 style={{ color: '#fff' }}>{character.name}</h3>
          <p style={{ color: '#97ce4c' }}>{character.species}</p>
        </div>
      </Card>

      <AnimatePresence>
        {isOpen && (
          <ModalOverlay
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsOpen(false)}
          >
            <ModalContent
              initial={{ scale: 0, rotate: -10 }}
              animate={{ scale: 1, rotate: 0 }}
              exit={{ scale: 0, opacity: 0 }}
              onClick={e => e.stopPropagation()}
            >
              <div style={{ position: 'relative', width: '150px', height: '150px', margin: '0 auto 1rem' }}>
                <Image
                  src={character.image}
                  alt={character.name}
                  fill
                  style={{ borderRadius: '50%', border: '4px solid #97ce4c' }}
                />
              </div>
              <h2 style={{ color: '#b2ff00', marginBottom: '1rem' }}>{character.name}</h2>
              <div style={{ textAlign: 'left', color: '#eee', marginBottom: '1.5rem' }}>
                <p><strong>Status:</strong> {character.status}</p>
                <p><strong>Espécie:</strong> {character.species}</p>
                <p><strong>Gênero:</strong> {character.gender}</p>
                <p><strong>Origem:</strong> {character.origin.name}</p>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                style={{
                  padding: '0.8rem 2rem',
                  background: '#97ce4c',
                  border: 'none',
                  borderRadius: '50px',
                  fontWeight: 'bold',
                  cursor: 'pointer'
                }}
              >
                VOLTAR
              </button>
            </ModalContent>
          </ModalOverlay>
        )}
      </AnimatePresence>
    </>
  );
}