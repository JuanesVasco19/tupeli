import { getAuth, signOut } from 'firebase/auth';
import firebase_app from '../../firebase/firebase';

const auth = getAuth(firebase_app);

export async function logout() {
    try {
        await signOut(auth);
        return { success: true };
    } catch (error) {
        console.error('Error al cerrar sesión:', error);
        return { error: error.message };
    }
} 