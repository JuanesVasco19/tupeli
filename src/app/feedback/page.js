"use client";

import { useEffect, useState } from "react";
import MovieCard from "@/components/MovieCard";

// Simulación de API o lógica basada en preferencias
const mockFetchRecommendedMovies = async (preferences) => {
  // Simulación de respuesta
  return [
    {
      title: "Inception",
      poster: "/public/movie-discovery.png", // Reemplaza con URL real
      genre: ["Sci-Fi", "Action"],
    },
    {
      title: "Interstellar",
      poster: "/public/movie-collage-bg.jpg",
      genre: ["Sci-Fi", "Drama"],
    },
  ];
};

export default function FeedbackPage() {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const preferences = JSON.parse(localStorage.getItem("userPreferences"));
    if (!preferences) {
      // Redirigir si no hay preferencias
      window.location.href = "/signup";
      return;
    }

    mockFetchRecommendedMovies(preferences).then((data) => {
      setMovies(data);
      setLoading(false);
    });
  }, []);

  return (
    <div className="min-h-screen p-6 bg-gray-100">
      <h1 className="text-3xl font-bold mb-6">Tus películas recomendadas</h1>
      {loading ? (
        <p>Cargando recomendaciones...</p>
      ) : (
        <div className="flex flex-wrap gap-4">
          {movies.map((movie, index) => (
            <MovieCard key={index} movie={movie} />
          ))}
        </div>
      )}
    </div>
  );
}