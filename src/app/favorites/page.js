'use client';

import { useEffect, useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { getUserFavorites } from '../../lib/favorites';
import MovieCard from '@/components/moviecard';

// Función auxiliar para formatear la fecha
function formatDate(dateString) {
  const date = new Date(dateString);
  return date.toLocaleDateString('es-ES', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
}

export default function FavoritesPage() {
  const { user } = useAuth();
  const [favorites, setFavorites] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    const loadFavorites = async () => {
      if (!user) {
        setLoading(false);
        return;
      }

      try {
        const { success, favorites: userFavorites, error } = await getUserFavorites(user.uid);
        if (success) {
          // Convertir los datos de Firestore al formato que espera MovieCard
          const formattedFavorites = userFavorites.map(fav => ({
            id: fav.movieId,
            title: fav.movieTitle,
            poster: fav.moviePoster,
            addedAt: fav.addedAt,
            userName: fav.userName
          }));
          setFavorites(formattedFavorites);
        } else {
          setError(error || 'Error al cargar favoritos');
        }
      } catch (err) {
        setError('Error al cargar favoritos');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    loadFavorites();
  }, [user]);

  if (!mounted) {
    return null; // Evita el renderizado inicial en el servidor
  }

  if (!user) {
    return (
      <div className="min-h-screen p-6 bg-gray-100 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-800 mb-4">Inicia sesión para ver tus favoritos</h1>
          <a 
            href="/signin" 
            className="inline-block bg-purple-600 text-white px-6 py-2 rounded-lg hover:bg-purple-700 transition-colors"
          >
            Iniciar sesión
          </a>
        </div>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="min-h-screen p-6 bg-gray-100 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Cargando favoritos...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen p-6 bg-gray-100 flex items-center justify-center">
        <div className="text-center text-red-600">
          <p>{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen p-6 bg-gray-100">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold mb-6 text-gray-800">Mis Películas Favoritas</h1>
        
        {favorites.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-600 text-lg">No tienes películas favoritas aún</p>
            <a 
              href="/feedback" 
              className="inline-block mt-4 bg-purple-600 text-white px-6 py-2 rounded-lg hover:bg-purple-700 transition-colors"
            >
              Ver recomendaciones
            </a>
          </div>
        ) : (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {favorites.map(movie => (
              <div key={movie.id} className="relative">
                <MovieCard movie={movie} />
                <p className="text-sm text-gray-500 mt-2">
                  Agregado el {formatDate(movie.addedAt)}
                </p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
} 