"use client";
import React from "react";
import signUp from "../../../firebase/auth/signup"; 
import { useRouter } from 'next/navigation'
import Link from "next/link";
import Image from "next/image";

export default function SignUp() {
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [error, setError] = React.useState("");
  const router = useRouter();

  const handleForm = async (event) => {
    event.preventDefault();
    setError("");
    const { result, error } = await signUp(email, password);
    if (error) {
      setError("Error al registrarse. Intenta con otro email o contraseña más segura.");
      console.log(error);
      return;
    }
    console.log(result);
    return router.push("/signin");
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-black text-white relative">
      {/* Fondo con imagen de fondo */}
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
        <div className="w-full max-w-md p-8 rounded-xl bg-gradient-to-b from-pink-900/50 to-pink-800/30 backdrop-blur-sm border border-pink-700/30 shadow-lg">
          <div className="flex justify-center mb-6">
            <div className="relative w-20 h-20">
              <Image
                src="/ai-movies-icon.png"
                alt="AI Movies Icon"
                width={80}
                height={80}
                className="rounded-full shadow-lg shadow-pink-500/30"
              />
            </div>
          </div>
          <h1 className="text-3xl font-bold text-center text-transparent bg-clip-text bg-gradient-to-r from-pink-400 via-red-500 to-orange-500 mb-4">
            Registrarse
          </h1>
          {error && (
            <div className="bg-red-500/20 border border-red-500 text-red-300 px-4 py-3 rounded mb-4 text-sm">
              {error}
            </div>
          )}
          <form onSubmit={handleForm} className="space-y-6">
            <div>
              <label className="block mb-1 font-medium text-pink-200">
                Correo electrónico
              </label>
              <input
                type="email"
                className="w-full px-4 py-3 rounded-lg bg-black/30 text-white border border-pink-500/30 focus:outline-none focus:ring-2 focus:ring-pink-500"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div>
              <label className="block mb-1 font-medium text-pink-200">
                Contraseña
              </label>
              <input
                type="password"
                className="w-full px-4 py-3 rounded-lg bg-black/30 text-white border border-pink-500/30 focus:outline-none focus:ring-2 focus:ring-pink-500"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                minLength={6}
              />
              <p className="text-xs text-gray-400 mt-1">La contraseña debe tener al menos 6 caracteres</p>
            </div>
            <button
              type="submit"
              className="w-full py-3 px-6 rounded-lg bg-gradient-to-r from-pink-600 to-red-600 text-white font-bold text-lg hover:from-pink-700 hover:to-red-700 shadow-lg shadow-pink-500/30 transition transform hover:scale-105"
            >
              Registrarse
            </button>
          </form>
          <div className="mt-6 text-center text-gray-300">
            ¿Ya tienes una cuenta?{" "}
            <Link
              href="/signin"
              className="text-pink-400 hover:underline font-semibold"
            >
              Inicia sesión
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
