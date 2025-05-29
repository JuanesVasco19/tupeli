'use client';

import { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { addToFavorites, removeFromFavorites, isMovieInFavorites } from '../../lib/favorites';
import { FaHeart, FaRegHeart } from 'react-icons/fa';

export default function FavoriteButton({ movie }) {
    const { user } = useAuth();
    const [isFavorite, setIsFavorite] = useState(false);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const checkFavoriteStatus = async () => {
            if (user) {
                const { success, isFavorite } = await isMovieInFavorites(user.uid, movie.id);
                if (success) {
                    setIsFavorite(isFavorite);
                }
            }
            setIsLoading(false);
        };

        checkFavoriteStatus();
    }, [user, movie.id]);

    const handleFavoriteClick = async () => {
        if (!user) {
            // Aquí podrías redirigir al login o mostrar un mensaje
            alert('Debes iniciar sesión para agregar a favoritos');
            return;
        }

        setIsLoading(true);
        try {
            if (isFavorite) {
                const { success } = await removeFromFavorites(user.uid, movie.id);
                if (success) {
                    setIsFavorite(false);
                }
            } else {
                const { success } = await addToFavorites(user.uid, movie);
                if (success) {
                    setIsFavorite(true);
                }
            }
        } catch (error) {
            console.error('Error al manejar favoritos:', error);
        }
        setIsLoading(false);
    };

    if (isLoading) {
        return <div className="w-8 h-8 animate-pulse bg-gray-200 rounded-full"></div>;
    }

    return (
        <button
            onClick={handleFavoriteClick}
            className={`p-2 rounded-full transition-all duration-200 ${
                isFavorite 
                    ? 'text-red-500 hover:text-red-600' 
                    : 'text-gray-400 hover:text-red-500'
            }`}
            disabled={isLoading}
        >
            {isFavorite ? <FaHeart size={24} /> : <FaRegHeart size={24} />}
        </button>
    );
} 