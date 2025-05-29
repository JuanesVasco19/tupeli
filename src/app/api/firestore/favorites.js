import { getFirestore, collection, addDoc, deleteDoc, doc, getDocs, query, where } from 'firebase/firestore';
import firebase_app from '../../../../firebase/firebase';

const db = getFirestore(firebase_app);

// Agregar una película a favoritos
export async function addToFavorites(userId, movie) {
    try {
        const favoritesRef = collection(db, 'favorites');
        const q = query(favoritesRef, where('userId', '==', userId), where('movieId', '==', movie.id));
        const querySnapshot = await getDocs(q);
        
        if (!querySnapshot.empty) {
            return { error: 'La película ya está en favoritos' };
        }

        const docRef = await addDoc(favoritesRef, {
            userId,
            movieId: movie.id,
            movieTitle: movie.title,
            moviePoster: movie.poster,
            addedAt: new Date().toISOString()
        });

        return { success: true, id: docRef.id };
    } catch (error) {
        console.error('Error al agregar a favoritos:', error);
        return { error: error.message };
    }
}

// Remover una película de favoritos
export async function removeFromFavorites(userId, movieId) {
    try {
        const favoritesRef = collection(db, 'favorites');
        const q = query(favoritesRef, where('userId', '==', userId), where('movieId', '==', movieId));
        const querySnapshot = await getDocs(q);
        
        if (querySnapshot.empty) {
            return { error: 'La película no está en favoritos' };
        }

        const docRef = doc(db, 'favorites', querySnapshot.docs[0].id);
        await deleteDoc(docRef);

        return { success: true };
    } catch (error) {
        console.error('Error al remover de favoritos:', error);
        return { error: error.message };
    }
}

// Obtener todas las películas favoritas de un usuario
export async function getUserFavorites(userId) {
    try {
        const favoritesRef = collection(db, 'favorites');
        const q = query(favoritesRef, where('userId', '==', userId));
        const querySnapshot = await getDocs(q);
        
        const favorites = [];
        querySnapshot.forEach((doc) => {
            favorites.push({ id: doc.id, ...doc.data() });
        });

        return { success: true, favorites };
    } catch (error) {
        console.error('Error al obtener favoritos:', error);
        return { error: error.message };
    }
}

// Verificar si una película está en favoritos
export async function isMovieInFavorites(userId, movieId) {
    try {
        const favoritesRef = collection(db, 'favorites');
        const q = query(favoritesRef, where('userId', '==', userId), where('movieId', '==', movieId));
        const querySnapshot = await getDocs(q);
        
        return { success: true, isFavorite: !querySnapshot.empty };
    } catch (error) {
        console.error('Error al verificar favoritos:', error);
        return { error: error.message };
    }
} 