"use client";
import React from "react";
import signIn from "../../../firebase/auth/signin";
import { useRouter } from 'next/navigation'
import Link from "next/link";
import Image from "next/image";

export default function SignIn() {
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [error, setError] = React.useState("");
  const router = useRouter();

  const handleForm = async (event) => {
    event.preventDefault();
    setError("");
    const { result, error } = await signIn(email, password);
    if (error) {
      setError("Error al iniciar sesión. Verifica tus credenciales.");
      console.log(error);
      return;
    }
    console.log(result);
    return router.push("/cartas");
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-black text-white relative">
      {/* Fondo con imagen desenfocada */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/movie-collage-bg.jpg"
          alt="Fondo de películas"
          fill
          className="object-cover opacity-20"
          priority
        />
      </div>

      {/* Capa de superposición oscura */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/50 to-black/90 z-10" />

      {/* Contenido principal */}
      <div className="relative z-20 flex items-center justify-center min-h-screen px-4">
        <div className="w-full max-w-md p-8 rounded-xl bg-gradient-to-b from-purple-900/50 to-purple-800/30 backdrop-blur-sm border border-purple-700/30 shadow-lg">
          <div className="flex justify-center mb-6">
            <div className="relative w-20 h-20">
              <Image
                src="/ai-movies-icon.png"
                alt="AI Movies Icon"
                width={80}
                height={80}
                className="rounded-full shadow-lg shadow-purple-500/30"
              />
            </div>
          </div>
          <h1 className="text-3xl font-bold text-center text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 mb-4">
            Iniciar Sesión
          </h1>
          {error && (
            <div className="bg-red-500/20 border border-red-500 text-red-300 px-4 py-3 rounded mb-4 text-sm">
              {error}
            </div>
          )}
          <form onSubmit={handleForm} className="space-y-6">
            <div>
              <label className="block mb-1 font-medium text-purple-200">
                Correo electrónico
              </label>
              <input
                type="email"
                className="w-full px-4 py-3 rounded-lg bg-black/30 text-white border border-purple-500/30 focus:outline-none focus:ring-2 focus:ring-purple-500"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div>
              <label className="block mb-1 font-medium text-purple-200">
                Contraseña
              </label>
              <input
                type="password"
                className="w-full px-4 py-3 rounded-lg bg-black/30 text-white border border-purple-500/30 focus:outline-none focus:ring-2 focus:ring-purple-500"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <button
              type="submit"
              className="w-full py-3 px-6 rounded-lg bg-gradient-to-r from-purple-600 to-pink-600 text-white font-bold text-lg hover:from-purple-700 hover:to-pink-700 shadow-lg shadow-purple-500/30 transition transform hover:scale-105"
            >
              Iniciar Sesión
            </button>
          </form>
          <div className="mt-6 text-center text-gray-300">
            ¿No tienes una cuenta?{" "}
            <Link
              href="/signup"
              className="text-pink-400 hover:underline font-semibold"
            >
              Regístrate
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
