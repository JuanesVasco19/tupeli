'use client';
import Image from 'next/image';

export default function MovieCard({ movie }) {
  const { title, poster, genre = [], year, rating } = movie;

  return (
    <div className="w-60 rounded-lg bg-white shadow-md overflow-hidden">
      {/* ——— Portada ——— */}
      <Image
        src={poster}
        alt={title}
        width={500}
        height={750}
        className="w-full h-80 object-cover"
        unoptimized      
      />

      {/* ——— Texto ——— */}
      <div className="p-4">
        <h2 className="text-xl font-semibold mt-2 text-gray-800">{title}</h2>

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
      </div>
    </div>
  );
}