import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { useRef } from "react";
import { ChevronLeft, ChevronRight, ArrowLeft } from "lucide-react";

import type { Movie } from "../types/Movie";
import type { CastMember } from "../types/Cast";

import Loader from "../components/Loader";
import RatingStars from "../components/RatingStars";

import { getRatings, createRating, deleteRating } from "../api/ratings";
import { getMovieDetails, getMovieCredits } from "../api/tmdb";
 

export default function MovieDetails() {
  const { id } = useParams();

  const [movie, setMovie] = useState<Movie | null>(null);
  const [cast, setCast] = useState<CastMember[]>([]);

  const [loading, setLoading] = useState(true);
  const [isFirstLoad, setIsFirstLoad] = useState(true);

  const [error, setError] = useState<string | null>(null);
  const [showSuccessMsg, setShowSuccessMsg] = useState(false);
  
  const [userRating, setUserRating] = useState<number | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const scrollRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  const scroll = (direction: 'left' | 'right') => {
    if (scrollRef.current) {
      const { scrollLeft, clientWidth } = scrollRef.current;
      
      const scrollTo = direction === 'left' 
        ? scrollLeft - clientWidth * 0.8 
        : scrollLeft + clientWidth * 0.8;

      scrollRef.current.scrollTo({ left: scrollTo, behavior: "smooth" });
    }
  };

  const handleSaveRating = async (rate: number) => {
    if (!movie) return;

    const payload = {
      tmdb_id: movie.id,
      title: movie.title,
      poster_path: movie.poster_path,
      rating: rate,
      overview: movie.overview 
    };

    try {
      await createRating(payload);
      setUserRating(rate); 
      setShowSuccessMsg(true);

      setTimeout(() => {
        setIsModalOpen(false);
        setShowSuccessMsg(false);
      }, 1500);

    } catch (err) {
      console.error("Erro ao salvar avaliação", err);
    }
  };

  const handleRemoveRating = async () => {
    if (!movie) return;
    try {
      await deleteRating(movie.id);
      setUserRating(null); 
      setIsModalOpen(false);
    } catch (err) {
      console.error("Erro ao remover avaliação", err);
    }
  };

  useEffect(() => {
    if (!id) return;

    const fetchData = async () => {
      try {
        setLoading(true);
        const [movieRes, castRes] = await Promise.all([
          getMovieDetails(Number(id)),
          getMovieCredits(Number(id)),
        ]);
        setMovie(movieRes.data);
        setCast(castRes.data.cast.slice(0, 10)); // Aumentei para 10 atores
      } catch {
        setError("Erro ao carregar detalhes");
      } finally {
        setLoading(false);
        setIsFirstLoad(false);
      }
    };

    const loadRating = async () => {
      try {
        const res = await getRatings();
        const found = res.data.find((r: any) => r.tmdb_id === Number(id));
        if (found) setUserRating(found.rating);
      } catch (e) {
        console.log("Ainda não avaliado");
      }
    };

    fetchData();
    loadRating();
  }, [id]);

  if (error) {
    return (
      <div className="min-h-screen bg-zinc-950 flex items-center justify-center text-red-500">
        <p>{error}</p>
      </div>
    );
  }
  
  if (isFirstLoad && loading) {
    return (
      <div className="min-h-screen bg-zinc-950 flex items-center justify-center">
        <Loader />
      </div>
    )
  }

  if (!movie) {
    return (
      <div className="min-h-screen bg-zinc-950 flex items-center justify-center">
        <p>Filme não encontrado.</p>
      </div>
    );
  }

  return (
    <div className="relative min-h-screen bg-zinc-950 text-white pb-20">
      <button
        onClick={() => navigate(-1)}
        className="
          absolute top-24 left-6 md:left-12
          z-40
          flex items-center gap-2
          text-sm font-semibold
          text-white/80 hover:text-white
          transition
          bg-black/40 hover:bg-black/70
          backdrop-blur-md
          px-4 py-2 rounded-full
          border border-white/10
          cursor-pointer
        "
      >
        <ArrowLeft size={16} />
        Voltar
      </button>
      {/* Backdrop */}
      <div className="absolute top-0 w-full h-[70vh]">
        <img
          src={`https://image.tmdb.org/t/p/original${movie.backdrop_path}`} 
          className="w-full h-full object-cover opacity-30"
          alt=""
        />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-zinc-950/60 to-zinc-950" />
      </div>

      <div className="relative pt-40 px-12 flex flex-col md:flex-row gap-15">
        {/* Poster */}
        <img
          src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} 
          className="w-80 rounded-2xl shadow-2xl border border-white/10 self-center md:self-start hover:scale-105 transition"
          alt={movie.title}
        />
        
        {/* Info */}
        <div className="flex-1 flex flex-col gap-6">
          <h1 className="text-6xl font-black tracking-tighter">{movie.title}</h1>
          
          <div className="flex flex-wrap gap-4 text-zinc-400 items-center">
            <span className="bg-white/10 px-3 py-1 rounded text-white font-bold">
              {movie.release_date?.split('-')[0]}
            </span>
            <span className="text-yellow-500 font-bold text-lg flex items-center gap-1">
              ★ {movie.vote_average?.toFixed(1)}
            </span>
            <div className="flex gap-2">
              {movie.genres?.map(g => (
                <span key={g.id} className="border border-white/20 px-3 py-1 rounded-full text-xs">
                  {g.name}
                </span>
              ))}
            </div>
          </div>

          <p className="text-xl text-zinc-300 max-w-3xl leading-relaxed italic opacity-80">
            {movie.overview}
          </p>

          <div className="mt-4">
            <button 
              onClick={() => setIsModalOpen(true)}
              className="bg-violet-600 hover:bg-violet-700 px-10 py-4 rounded-full font-bold transition-all hover:scale-105 flex items-center gap-3 shadow-xl shadow-violet-900/20 cursor-pointer"
            >
              {userRating ? "Mudar minha nota" : "Avaliar este filme"}
              {userRating && <span className="bg-white/20 px-2 py-0.5 rounded text-sm">{userRating} ★</span>}
            </button>
          </div>
        </div>
      </div>

      {/* Elenco */}
      <div className="relative mt-24 px-12 group">
        <h2 className="text-3xl font-bold mb-10 border-l-4 border-violet-600 pl-4">
          Elenco Principal
        </h2>

        <div className="relative sm:flex items-center grid">
          {/* Seta Esquerda */}
          <button
            aria-label="Scroll Left"
            onClick={() => scroll('left')}
            className="absolute -left-6 z-20 p-2 bg-black/50 hover:bg-violet-600 rounded-full border border-white/10 transition-all opacity-0 group-hover:opacity-100 hidden sm:block cursor-pointer"
          >
            <ChevronLeft size={32} />
          </button>

          {/* Lista de Atores */}
          <div
            ref={scrollRef}
            className="
              grid grid-cols-2 gap-4
              sm:flex sm:gap-6
              sm:overflow-x-auto no-scrollbar sm:scroll-smooth sm:snap-x
            ">
            {cast.map((actor) => (
              <div 
                key={actor.id} 
                className="min-w-[160px] md:min-w-[200px] snap-start"
              >
                <div className="overflow-hidden rounded-3xl mb-3 h-64 shadow-lg border border-white/5">
                  <img
                    src={actor.profile_path 
                      ? `https://image.tmdb.org/t/p/w185${actor.profile_path}` 
                      : "https://via.placeholder.com/185x278?text=Sem+Foto"} 
                    className="w-full h-full object-cover"
                    alt={actor.name}
                  />
                </div>
                <p className="font-bold text-sm">{actor.name}</p>
                <p className="text-xs text-zinc-500">{actor.character}</p>
              </div>
            ))}
          </div>

          {/* Seta Direita */}
          <button
            aria-label="Scroll Right"
            onClick={() => scroll('right')}
            className="absolute -right-6 z-20 p-2 bg-black/50 hover:bg-violet-600 rounded-full border border-white/10 transition-all opacity-0 group-hover:opacity-100 hidden sm:block cursor-pointer"
          >
            <ChevronRight size={32} />
          </button>
        </div>
      </div>

      {/* Modal de Avaliação */}
      {isModalOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          {/* Backdrop com Blur */}
          <div 
            className="absolute inset-0 bg-black/60 backdrop-blur-md" 
            onClick={() => setIsModalOpen(false)} 
          />
          
          {/* Card do Modal */}
          <div className="relative bg-zinc-900 border border-[#8B5CF6]/30 p-8 rounded-[2rem] w-full max-w-sm text-center shadow-[0_0_50px_rgba(139,92,246,0.15)] overflow-hidden">
            {!showSuccessMsg ? (
              <div className="animate-in fade-in zoom-in duration-300">
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-1/2 h-1 bg-[#8B5CF6] shadow-[0_0_15px_#8B5CF6] rounded-full" />
                  <h3 className="text-2xl font-black mb-1 uppercase italic tracking-tighter">
                    Sua <span className="text-[#8B5CF6]">Avaliação</span>
                  </h3>
                  <p className="text-zinc-500 text-xs mb-8 uppercase tracking-widest font-bold">
                    {movie.title}
                  </p>
                  
                  <div className="flex justify-center mb-8 scale-175">
                    <RatingStars 
                      value={userRating || 0} 
                      onRate={(v) => handleSaveRating(v)} 
                    />
                  </div>

                  <div className="flex flex-col gap-4">
                    {/* Só mostra botão de remover se houver avaliação prévia */}
                    {userRating && (
                      <button 
                        onClick={handleRemoveRating}
                        className="text-red-500/60 hover:text-red-500 text-xs font-bold uppercase tracking-widest transition-colors cursor-pointer py-2"
                      >
                        Remover minha avaliação
                      </button>
                    )}

                    <button 
                      onClick={() => setIsModalOpen(false)}
                      className="bg-zinc-800 hover:bg-zinc-700 text-white w-full py-4 rounded-2xl font-bold transition-all text-sm uppercase tracking-widest cursor-pointer"
                    >
                      Fechar
                    </button>
                  </div>
              </div>
            ) : (
              <div className="animate-in zoom-in fade-in duration-500 flex flex-col items-center">
                <div className="w-20 h-20 bg-[#8B5CF6]/20 rounded-full flex items-center justify-center mb-6 shadow-[0_0_30px_rgba(139,92,246,0.4)] border border-[#8B5CF6]/40">
                  <svg className="w-10 h-10 text-[#8B5CF6] animate-[bounce_1s_infinite]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <h3 className="text-xl font-black uppercase italic tracking-tighter">Avaliação Salva!</h3>
                <p className="text-zinc-500 text-xs mt-2 uppercase tracking-widest">Sincronizando com o banco...</p>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}