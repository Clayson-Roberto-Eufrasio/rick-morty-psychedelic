import { GlobalStyles } from '@/styles/GlobalStyles';
import StyledComponentsRegistry from '@/lib/registry';
import { PortalBackground } from '@/components/PortalBackground';
import { CharacterList } from '@/components/CharacterList';
import { ApiResponse } from '@/types/rickAndMorty';

// Função Server-side para buscar os dados
async function getData(): Promise<ApiResponse> {
  // Adicionamos um revalidate para manter os dados atualizados a cada 24h
  const res = await fetch('https://rickandmortyapi.com/api/character', {
    next: { revalidate: 86400 }
  });

  if (!res.ok) throw new Error('Falha ao conectar com a API');
  return res.json();
}

export default async function Home() {
  const data = await getData();

  return (
    <StyledComponentsRegistry>
      <GlobalStyles />
      <PortalBackground />

      <main style={{ position: 'relative', zIndex: 1, padding: '3rem', maxWidth: '1200px', margin: '0 auto' }}>
        <header style={{ textAlign: 'center', marginBottom: '4rem' }}>
          <h1 style={{
            fontSize: 'clamp(2rem, 8vw, 4rem)', // Fonte responsiva
            color: '#97ce4c',
            textShadow: '3px 3px #ff00ff',
            marginBottom: '1rem'
          }}>
            RICK AND MORTY <br /> PSYCHEDELIC
          </h1>
          <p style={{ color: '#fff', opacity: 0.8 }}>O multiverso ao alcance dos seus olhos</p>
        </header>

        {/* Passamos os resultados da API para o componente que gerencia a busca */}
        <CharacterList initialCharacters={data.results} />
      </main>
    </StyledComponentsRegistry>
  );
}