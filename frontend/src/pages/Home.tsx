import { useEffect, useState, useRef, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { X } from "lucide-react";

import MovieCard from "../components/MovieCard";
import SearchBar from "../components/SearchBar";
import FilterModal from "../components/FilterModal";
import LoadingSkeleton from "../components/LoadingSkeleton";
import Loader from "../components/Loader";

import { discoverMovies, searchMovies } from "../api/tmdb";

export default function Home() {
  const [query, setQuery] = useState("");
  const [movies, setMovies] = useState<any[]>([]);
  
  const [loading, setLoading] = useState(true);
  const [isFirstLoad, setIsFirstLoad] = useState(true); 
  
  const [activeFilters, setActiveFilters] = useState<any>(null);
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);

  const navigate = useNavigate();

  const backdrops = [
    "hero-bg-1",
    "hero-bg-2",
    "hero-bg-3",
    "hero-bg-4",
    "hero-bg-5",
    "hero-bg-6",
    "hero-bg-7",
    "hero-bg-8",
    "hero-bg-9"
  ];

  const [heroBackdrop, setHeroBackdrop] = useState(backdrops[0])

  const handleApplyFilters = async (filters: any) => {
    if (!filters.with_genres && !filters["primary_release_date.gte"] && !filters["primary_release_date.lte"]) {
      setActiveFilters(null);
    } else {
      setActiveFilters(filters);
    }
  };

  const fetchMovies = async (
    searchQuery: string,
    filters: any,
    pageNumber: number,
    reset = false
  ) => {
    setLoading(true);

    try {
      let res;

      if (filters && (filters.with_genres || filters["primary_release_date.gte"])) {
        res = await discoverMovies({
          ...filters,
          page: pageNumber,
          include_adult: false,
          with_text_query: searchQuery || undefined,
          sort_by: "popularity.desc",
        });
      } else if (searchQuery) {
        res = await searchMovies(searchQuery, pageNumber);
      } else {
        res = await discoverMovies({
          sort_by: "popularity.desc",
          page: pageNumber,
        });
      }

      setMovies((prev) =>
        reset ? res.data.results : [...prev, ...res.data.results]
      );

      setHasMore(pageNumber < res.data.total_pages);
    } catch (err) {
      console.error("Erro na busca", err);
    } finally {
      setLoading(false);
      setIsFirstLoad(false);
    }
  };

  useEffect(() => {
    const randomBg =
      backdrops[Math.floor(Math.random() * backdrops.length)];
    setHeroBackdrop(randomBg);
  }, []);

  useEffect(() => {
    setMovies([]);
    setPage(1);
    setHasMore(true);

    const timer = setTimeout(() => {
      fetchMovies(query, activeFilters, 1, true);
    }, 500);

    return () => clearTimeout(timer);
  }, [query, activeFilters]);

  const observer = useRef<IntersectionObserver | null>(null);

  const lastMovieRef = useCallback(
    (node: HTMLDivElement | null) => {
      if (loading) return;

      if (observer.current) observer.current.disconnect();

      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && hasMore) {
          const nextPage = page + 1;
          setPage(nextPage);
          fetchMovies(query, activeFilters, nextPage);
        }
      });

      if (node) observer.current.observe(node);
    },
    [loading, hasMore, page, query, activeFilters]
  );

  if (isFirstLoad) {
    return (
      <div className="min-h-screen bg-zinc-950 flex items-center justify-center">
        <Loader />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-white px-8">
      <section 
        className={`hero-backdrop ${heroBackdrop} min-h-[70vh] flex flex-col items-center justify-center`}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/60 to-black pointer-events-none" />

        <div className="relative z-10 w-full max-w-3xl px-4 sm:px-6 animate-fade-in flex flex-col items-center text-center">
          <h1 className="text-3xl sm:text-4xl md:text-5xl px-3 font-black mb-6 leading-snug break-words">
            Descubra, explore e <span className="text-violet-500">avalie</span> filmes
          </h1>

          <p className="text-zinc-300 text-lg mb-10 px-3">
            Busque seus filmes favoritos, avalie e acompanhe tudo em um só lugar.
          </p>

          <SearchBar value={query} onChange={setQuery} onOpenFilters={() => setIsFilterOpen(true)}/>
        </div>

        {activeFilters && (
          <div className="relative z-20 flex items-center mt-3 gap-2 bg-violet-500/40 border border-violet-500/90 px-4 py-1.5 rounded-full">
            <span className="text-xs font-bold text-white uppercase tracking-widest">Filtros Ativos</span>
            <button 
              onClick={() => {
                setActiveFilters(null);
                setQuery("");
              }}
              className="text-white transition cursor-pointer"
              title="Remover todos os filtros"
            >
              <X size={14} />
            </button>
          </div>
        )}
        
      </section>

      <section className="pb-20">
        <h2 className="text-2xl font-semibold mb-10">Lista de Filmes</h2>
        {loading && (
          <p className="text-center text-zinc-400">Buscando filmes...</p>
        ) && <LoadingSkeleton />}

        {!loading && movies.length > 0 && (
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-6">
            {movies.map((movie, index) => {
              const isLast = index === movies.length - 1;

              return (
                <div
                  key={movie.id}
                  ref={isLast ? lastMovieRef : null}
                >
                  <MovieCard
                    movie={movie}
                    onClick={() => navigate(`/movie/${movie.id}`)}
                    onRate={(rating) => console.log(rating)}
                  />
                </div>
              );
            })}
          </div>
        )}
      </section>

      {!isFirstLoad && loading && (
        <div className="flex justify-center py-12">
          <LoadingSkeleton />
        </div>
      )}

      <FilterModal 
        isOpen={isFilterOpen} 
        onClose={() => setIsFilterOpen(false)} 
        onApply={handleApplyFilters}
      />
    </div>
  );
}
