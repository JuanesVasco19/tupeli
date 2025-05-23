export default function MovieCard({ movie }) {
  return (
    <div className="rounded-lg shadow-md bg-white p-4 w-60">
      <img src={movie.poster} alt={movie.title} className="w-full h-80 object-cover rounded" />
      <h2 className="text-xl font-semibold mt-2">{movie.title}</h2>
      <p className="text-gray-600 text-sm">{movie.genre.join(", ")}</p>
    </div>
  );
}