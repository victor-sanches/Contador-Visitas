import { useEffect, useState } from 'react';

export default function Home() {
  const [visitas, setVisitas] = useState(0);

  useEffect(() => {
    fetch('/api/visitas')
      .then(res => res.json())
      .then(data => setVisitas(data.total));
  }, []);

  return (
    <main style={{ padding: '2rem', fontFamily: 'Arial' }}>
      <h1>Meu portfólio no GitHub</h1>
      <p>Este perfil foi visitado {visitas} vezes 🚀</p>
    </main>
  );
}