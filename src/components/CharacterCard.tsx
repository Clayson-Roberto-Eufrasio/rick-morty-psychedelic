'use client';
import { useState } from 'react';
import styled from 'styled-components';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { Character } from '@/types/rickAndMorty';

// Estilização do Card com Styled Components
const Card = styled(motion.div)`
  border: 2px solid #97ce4c;
  border-radius: 12px;
  background: rgba(20, 20, 20, 0.8);
  overflow: hidden;
  cursor: pointer;
  position: relative;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.5);
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

export function CharacterCard({ character }: { character: Character }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <Card
        // --- LÓGICA DE APARIÇÃO SUAVE ---
        // initial: Como o card começa (invisível, levemente abaixo e desfocado)
        initial={{ opacity: 0, y: 30, filter: 'blur(10px)' }}

        // whileInView: Como ele fica quando entra na tela
        whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}

        // viewport: Garante que a animação rode assim que 10% do card aparecer
        viewport={{ once: true, amount: 0.1 }}

        // transition: Controla a VELOCIDADE (aumentei para 1.5s para ser bem visível)
        transition={{
          duration: 1.5,
          ease: "easeOut"
        }}

        // Efeitos de interação com o mouse
        whileHover={{
          scale: 1.05,
          boxShadow: "0px 0px 25px #97ce4c",
          border: "2px solid #ff00ff"
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

        <div style={{ padding: '1.2rem', textAlign: 'center' }}>
          <h3 style={{ color: '#fff', fontSize: '1.2rem', marginBottom: '0.5rem' }}>
            {character.name}
          </h3>
          <p style={{ color: '#97ce4c', fontWeight: 'bold', fontSize: '0.9rem' }}>
            {character.species}
          </p>
        </div>
      </Card>

      {/* Modal - Animação de entrada do detalhe */}
      <AnimatePresence>
        {isOpen && (
          <ModalOverlay
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsOpen(false)}
          >
            <motion.div
              initial={{ scale: 0.5, opacity: 0, rotate: -5 }}
              animate={{ scale: 1, opacity: 1, rotate: 0 }}
              exit={{ scale: 0.5, opacity: 0 }}
              onClick={e => e.stopPropagation()}
              style={{
                background: '#1a1a1a',
                padding: '2.5rem',
                borderRadius: '24px',
                border: '3px solid #ff00ff',
                textAlign: 'center',
                maxWidth: '400px',
                width: '100%',
                boxShadow: '0 0 40px rgba(255, 0, 255, 0.4)'
              }}
            >
              <div style={{ position: 'relative', width: '180px', height: '180px', margin: '0 auto 1.5rem' }}>
                <Image
                  src={character.image}
                  alt={character.name}
                  fill
                  style={{ borderRadius: '50%', border: '4px solid #97ce4c' }}
                />
              </div>
              <h2 style={{ color: '#ff00ff', fontSize: '2rem', marginBottom: '1rem' }}>
                {character.name}
              </h2>
              <div style={{ textAlign: 'left', color: '#ccc', lineHeight: '1.6' }}>
                <p><strong>Status:</strong> {character.status}</p>
                <p><strong>Espécie:</strong> {character.species}</p>
                <p><strong>Origem:</strong> {character.origin.name}</p>
                <p><strong>Localização:</strong> {character.location.name}</p>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                style={{
                  marginTop: '2rem',
                  padding: '0.8rem 2.5rem',
                  background: '#97ce4c',
                  color: '#000',
                  border: 'none',
                  borderRadius: '50px',
                  fontWeight: '900',
                  cursor: 'pointer'
                }}
              >
                VOLTAR
              </button>
            </motion.div>
          </ModalOverlay>
        )}
      </AnimatePresence>
    </>
  );
}