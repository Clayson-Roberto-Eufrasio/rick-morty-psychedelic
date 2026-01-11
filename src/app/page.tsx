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

        {/* Passamos os resultados da API para o componente que gerencia a busca */}
        <CharacterList initialCharacters={data.results} />
      </main>
    </StyledComponentsRegistry>
  );
}