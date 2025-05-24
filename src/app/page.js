import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-black text-white">
      {/* Hero Section */}
      <div className="min-h-screen relative">
        {/* Background Image with Overlay */}
        <div className="absolute inset-0 z-0">
          <Image
            src="/movie-collage-bg.jpg"
            alt="Movie Background"
            fill
            className="object-cover opacity-20"
            priority
          />
        </div>
        
        {/* Overlay con efecto de película */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/50 to-black/90 z-10"></div>
        
        {/* Contenido principal */}
        <div className="relative z-20 container mx-auto px-4 py-16">
          <div className="flex flex-col items-center justify-center pt-10">
            {/* Logo AI + Movies */}
            <div className="relative w-32 h-32 mb-8">
              <Image
                src="/ai-movies-icon.png"
                alt="AI Movies Icon"
                width={128}
                height={128}
                className="rounded-full shadow-lg shadow-purple-500/20"
              />
            </div>

            <div className="text-center mb-16">
              <h1 className="text-6xl font-bold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-pink-500 to-red-500">
                TuPeli
              </h1>
              <p className="text-xl text-gray-300 max-w-2xl mx-auto mb-8">
                Descubre el mundo del cine a través de recomendaciones personalizadas impulsadas por IA.
                Tu próxima película favorita está a solo un clic de distancia.
              </p>
            </div>

            <div className="flex flex-col gap-4 w-full max-w-md mb-16">
              <Link href="/signin" className="transform hover:scale-105 transition duration-300">
                <button className="w-full py-4 px-6 rounded-lg bg-gradient-to-r from-purple-600 to-pink-600 text-white font-bold text-lg hover:from-purple-700 hover:to-pink-700 shadow-lg shadow-purple-500/30">
                  Iniciar Sesión
                </button>
              </Link>
              
              <Link href="/signup" className="transform hover:scale-105 transition duration-300">
                <button className="w-full py-4 px-6 rounded-lg bg-gradient-to-r from-pink-600 to-red-600 text-white font-bold text-lg hover:from-pink-700 hover:to-red-700 shadow-lg shadow-pink-500/30">
                  Registrarse
                </button>
              </Link>
              
              <Link href="/Test" className="transform hover:scale-105 transition duration-300">
                <button className="w-full py-4 px-6 rounded-lg bg-gradient-to-r from-red-600 to-orange-600 text-white font-bold text-lg hover:from-red-700 hover:to-orange-700 shadow-lg shadow-red-500/30 mt-4">
                  Comenzar Test
                </button>
              </Link>
            </div>

            {/* Características */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
              <div className="text-center p-8 rounded-xl bg-gradient-to-b from-purple-900/50 to-purple-800/30 backdrop-blur-sm border border-purple-700/30 shadow-lg transform hover:scale-105 transition duration-300">
                <div className="relative w-16 h-16 mx-auto mb-4">
                  <Image
                    src="/ai-brain.png"
                    alt="AI Personalization"
                    width={64}
                    height={64}
                    className="rounded-lg"
                  />
                </div>
                <h3 className="text-xl font-semibold mb-2 text-purple-300">IA Personalizada</h3>
                <p className="text-gray-400">Recomendaciones únicas basadas en tus preferencias</p>
              </div>
              
              <div className="text-center p-8 rounded-xl bg-gradient-to-b from-pink-900/50 to-pink-800/30 backdrop-blur-sm border border-pink-700/30 shadow-lg transform hover:scale-105 transition duration-300">
                <div className="relative w-16 h-16 mx-auto mb-4">
                  <Image
                    src="/movie-discovery.png"
                    alt="Movie Discovery"
                    width={64}
                    height={64}
                    className="rounded-lg"
                  />
                </div>
                <h3 className="text-xl font-semibold mb-2 text-pink-300">Descubre</h3>
                <p className="text-gray-400">Encuentra nuevas películas cada día</p>
              </div>
              
              <div className="text-center p-8 rounded-xl bg-gradient-to-b from-red-900/50 to-red-800/30 backdrop-blur-sm border border-red-700/30 shadow-lg transform hover:scale-105 transition duration-300">
                <div className="relative w-16 h-16 mx-auto mb-4">
                  <Image
                    src="/save-movie.png"
                    alt="Save Movie"
                    width={64}
                    height={64}
                    className="rounded-lg"
                  />
                </div>
                <h3 className="text-xl font-semibold mb-2 text-red-300">Guarda tus favoritas</h3>
                <p className="text-gray-400">Regresa a tus películas preferidas</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}