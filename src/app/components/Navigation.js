'use client';

import { useAuth } from '../context/AuthContext';
import { logout } from '../../lib/auth';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

export default function Navigation() {
  const { user } = useAuth();
  const router = useRouter();
  const [isLoggingOut, setIsLoggingOut] = useState(false);

  const handleLogout = async () => {
    try {
      setIsLoggingOut(true);
      const { success, error } = await logout();
      if (success) {
        router.push('/');
      } else {
        console.error('Error al cerrar sesión:', error);
        alert('Error al cerrar sesión. Por favor, intenta de nuevo.');
      }
    } catch (error) {
      console.error('Error al cerrar sesión:', error);
      alert('Error al cerrar sesión. Por favor, intenta de nuevo.');
    } finally {
      setIsLoggingOut(false);
    }
  };

  return (
    <nav className="bg-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex">
            <Link href="/" className="flex items-center">
              <span className="text-xl font-bold text-purple-600">TuPeli</span>
            </Link>
          </div>

          <div className="flex items-center space-x-4">
            {user ? (
              <>
                <Link 
                  href="/favorites" 
                  className="text-gray-600 hover:text-purple-600 transition-colors"
                >
                  Mis Favoritos
                </Link>
                <Link 
                  href="/feedback" 
                  className="text-gray-600 hover:text-purple-600 transition-colors"
                >
                  Recomendaciones
                </Link>
                <button
                  onClick={handleLogout}
                  disabled={isLoggingOut}
                  className={`text-gray-600 hover:text-purple-600 transition-colors ${
                    isLoggingOut ? 'opacity-50 cursor-not-allowed' : ''
                  }`}
                >
                  {isLoggingOut ? 'Cerrando sesión...' : 'Cerrar sesión'}
                </button>
              </>
            ) : (
              <>
                <Link 
                  href="/signin" 
                  className="text-gray-600 hover:text-purple-600 transition-colors"
                >
                  Iniciar sesión
                </Link>
                <Link 
                  href="/signup" 
                  className="bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700 transition-colors"
                >
                  Registrarse
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
} 