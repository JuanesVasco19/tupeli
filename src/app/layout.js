import { Inter } from 'next/font/google';
import './globals.css';
import { AuthContextProvider } from './context/AuthContext';
import Navigation from "./components/Navigation";

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  title: 'TuPeli - Recomendaciones de Películas',
  description: 'Descubre películas personalizadas con IA',
};

export default function RootLayout({ children }) {
  return (
    <html lang="es">
      <body className={inter.className}>
        <AuthContextProvider>
          <Navigation />
          {children}
        </AuthContextProvider>
      </body>
    </html>
  );
}
