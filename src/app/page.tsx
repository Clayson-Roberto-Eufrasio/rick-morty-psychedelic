import { CharacterCard } from '@/components/CharacterCard';
import { GlobalStyles } from '@/styles/GlobalStyles';
import StyledComponentsRegistry from '@/lib/registry';
import { ApiResponse, Character } from '@/types/rickAndMorty';
import { PortalBackground } from '@/components/PortalBackground';

async function getData(): Promise<ApiResponse> {
  const res = await fetch('https://rickandmortyapi.com/api/character');
  if (!res.ok) throw new Error('Erro ao buscar personagens');
  return res.json();
}

export default async function Home() {
  const data = await getData();

  return (
    <StyledComponentsRegistry>
      <GlobalStyles />
      <PortalBackground />
      <main style={{ padding: '3rem' }}>
        <header style={{ textAlign: 'center', marginBottom: '4rem' }}>
          <h1 style={{
            fontSize: '4rem',
            color: '#97ce4c',
            textShadow: '3px 3px #ff00ff'
          }}>
            RICK AND MORTY
          </h1>
        </header>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))',
          gap: '2.5rem'
        }}>
          {data.results.map((char: Character) => (
            <CharacterCard key={char.id} character={char} />
          ))}
        </div>
      </main>
    </StyledComponentsRegistry>
  );
}