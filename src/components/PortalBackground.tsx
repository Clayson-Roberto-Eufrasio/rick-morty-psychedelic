'use client';
import styled, { keyframes } from 'styled-components';

// Animação para o portal girar e pulsar
const portalAnimation = keyframes`
  0% {
    transform: rotate(0deg) scale(1);
    filter: hue-rotate(0deg);
  }
  50% {
    transform: rotate(180deg) scale(1.2);
    filter: hue-rotate(90deg); // Muda as cores durante a animação
  }
  100% {
    transform: rotate(360deg) scale(1);
    filter: hue-rotate(0deg);
  }
`;

const PortalContainer = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  z-index: -1; // Fica atrás de tudo
  background: #050505;
  overflow: hidden;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const PortalCircle = styled.div`
  width: 150vmax; // Garante que cubra a tela toda mesmo girando
  height: 150vmax;
  background: radial-gradient(
    circle,
    rgba(151, 206, 76, 0.4) 0%,
    rgba(30, 60, 0, 0.2) 40%,
    transparent 70%
  );
  animation: ${portalAnimation} 15s linear infinite;
  opacity: 0.6;
`;

export function PortalBackground() {
  return (
    <PortalContainer>
      <PortalCircle />
    </PortalContainer>
  );
}