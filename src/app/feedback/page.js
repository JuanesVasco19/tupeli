'use client';

import { useEffect, useState } from 'react';
import MovieCard from '@/components/moviecard';

const IMAGE_BASE = 'https://image.tmdb.org/t/p/w500';

export default function FeedbackPage() {
  const [movies, setMovies] = useState(null);
  const [error,  setError]  = useState(null);

  useEffect(() => {
    // ——— Recuperar respuestas ———
    const stored = localStorage.getItem('movieQuiz');
    if (!stored) {
      window.location.href = '/Test';
      return;
    }

    // ——— Llamar a nuestro endpoint backend ———
    (async () => {
      try {
        const res = await fetch('/api/recommend', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: stored,
        });
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        const data = await res.json();
        setMovies(data);
      } catch (err) {
        setError('No se pudieron obtener recomendaciones.');
        console.error(err);
      }
    })();
  }, []);

  // ——— Render ———
  if (error)
    return <p className="min-h-screen flex items-center justify-center text-red-600">{error}</p>;

  if (!movies)
    return <p className="min-h-screen flex items-center justify-center">Cargando…</p>;

  return (
    <div className="min-h-screen p-6 bg-gray-100">
      <h1 className="text-3xl font-bold mb-6 text-gray-800">Tus películas recomendadas</h1>
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {movies.map(m => (
          <MovieCard
            key={m.id}
            movie={{
              title:  m.title,
              poster: m.poster_path ? `${IMAGE_BASE}${m.poster_path}` : '/fallback.jpg',
              genre:  [],                 
              year:   m.release_date?.slice(0,4),
              rating: m.vote_average,
            }}
          />
        ))}
      </div>
    </div>
  );
}