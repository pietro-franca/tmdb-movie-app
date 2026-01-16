import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Star, ChevronRight } from "lucide-react";

import type { RatedMovie } from "../types/Movie";
import Loader from "../components/Loader";
import { getRatings } from "../api/ratings";

export default function RatedMovies() {
  const [movies, setMovies] = useState<RatedMovie[]>([]);
  const [loading, setLoading] = useState(true);
  const [isFirstLoad, setIsFirstLoad] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchRatings = async () => {
    try {
      setLoading(true);
      const res = await getRatings();
      setMovies(res.data);
    } catch {
      setError("Erro ao carregar filmes avaliados");
    } finally {
      setLoading(false);
      setIsFirstLoad(false);
    }
  };

    fetchRatings();
  }, []);

  if (error) return <p>{error}</p>;

  if (isFirstLoad && loading) {
    return (
      <div className="min-h-screen bg-zinc-950 flex items-center justify-center">
        <Loader />
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-zinc-950 text-white pt-32 px-6 md:px-20 pb-20">
      <header className="mb-12">
        <h1 className="text-4xl font-black uppercase tracking-tighter border-l-4 border-violet-600 pl-6">
          Meus Filmes <span className="text-violet-600">Avaliados</span>
        </h1>
        <p className="text-zinc-500 mt-2 pl-10">Você avaliou {movies.length} filmes até agora.</p>
      </header>

      <div className="flex flex-col gap-6 max-w-5xl mx-auto">
        {movies.length > 0 ? (
          movies.map((movie) => (
            <div 
              key={movie.tmdb_id}
              onClick={() => navigate(`/movie/${movie.tmdb_id}`)}
              className="group relative bg-zinc-900/40 border border-white/5 rounded-3xl overflow-hidden flex flex-col md:flex-row hover:bg-zinc-900/80 transition-all cursor-pointer hover:border-violet-600/30 shadow-xl"
            >
              <div className="w-full md:w-48 h-72 shrink-0 overflow-hidden">
                <img 
                  src={movie.poster_path ? `https://image.tmdb.org/t/p/w500${movie.poster_path}` : "https://via.placeholder.com/500x750?text=Sem+Poster"} 
                  alt={movie.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
              </div>

              <div className="p-8 flex flex-col justify-between flex-1">
                <div>
                  <div className="flex justify-between items-start mb-4">
                    <h2 className="text-2xl w-75 font-bold group-hover:text-violet-500 transition">{movie.title}</h2>
                    <div className="flex gap-1">
                      {[...Array(5)].map((_, i) => (
                        <Star 
                          key={i}
                          size={20}
                          className={`${i < movie.rating ? "fill-yellow-500 text-yellow-500" : "text-zinc-700"}`}
                        />
                      ))}
                    </div>
                  </div>
                  
                  <p className="text-zinc-400 text-md line-clamp-3">
                    {movie.overview || "Nenhuma sinopse encontrada para esse filme"}
                  </p>
                </div>

                <div className="mt-6 flex items-center text-sm font-bold text-violet-500 uppercase tracking-widest opacity-0 group-hover:opacity-100 transition-opacity">
                  Ver detalhes <ChevronRight size={16} />
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="text-center py-32 bg-zinc-900/20 rounded-3xl border border-dashed border-white/10">
            <p className="text-zinc-500 text-lg">Você ainda não avaliou nenhum filme.</p>
            <button 
              onClick={() => navigate("/")}
              className="mt-4 text-violet-500 font-bold hover:underline cursor-pointer"
            >
              Começar a explorar
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
