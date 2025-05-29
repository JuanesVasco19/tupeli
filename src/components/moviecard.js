'use client';
import Image from 'next/image';
import FavoriteButton from '../app/components/FavoriteButton';

export default function MovieCard({ movie }) {
  const { id, title, poster, genre = [], year, rating } = movie;

  return (
    <div className="relative group hover:shadow-2xl hover:-translate-y-1 transition-all duration-300">
      <div className="w-60 rounded-lg bg-white shadow-md overflow-hidden">
        {/* ——— Portada ——— */}
        <div className="relative">
          <Image
            src={poster}
            alt={title}
            width={500}
            height={750}
            className="w-full h-80 object-cover group-hover:opacity-90 transition duration-300"
            unoptimized      
          />
          {/* Botón de favoritos */}
          <div className="absolute top-2 right-2 z-10">
            <FavoriteButton movie={movie} />
          </div>
        </div>

        {/* ——— Texto ——— */}
        <div className="p-4">
          <h2 className="text-xl font-semibold mt-2 text-gray-800 group-hover:text-purple-600 transition-colors duration-300">{title}</h2>

          {/* Año y rating */}
          {(year || rating) && (
            <p className="text-sm text-gray-500">
              {year && <span>{year}</span>}
              {year && rating && ' · '}
              {rating && <span>⭐ {rating.toFixed(1)}</span>}
            </p>
          )}

          {/* Géneros */}
          {genre.length > 0 && (
            <p className="mt-1 text-xs text-gray-500">
              {genre.join(', ')}
            </p>
          )}

          {/* Link a TMDB */}
          <a
            href={`https://www.themoviedb.org/movie/${id}`}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-2 inline-block text-sm text-purple-600 hover:text-purple-800 transition-colors duration-300"
          >
            Ver en TMDB →
          </a>
        </div>
      </div>
    </div>
  );
}