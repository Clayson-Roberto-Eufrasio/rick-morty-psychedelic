export const portalEntrance = {
  // Estado inicial: Escondido, pequeno e levemente borrado no centro
  hidden: {
    opacity: 0,
    scale: 0,
    filter: 'blur(10px) brightness(2)',
  },
  // Estado final: Visível, tamanho normal e nítido
  visible: {
    opacity: 1,
    scale: 1,
    filter: 'blur(0px) brightness(1)',
    transition: {
      duration: 0.8,
      ease: "easeOut"
    }
  }
};

// Variante para o container (faz os filhos aparecerem um por um)
export const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1 // Atraso de 0.1s entre cada card
    }
  }
};