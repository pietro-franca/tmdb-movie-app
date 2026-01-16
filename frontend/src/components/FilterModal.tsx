import { useEffect, useState } from "react";
import { getGenres } from "../api/tmdb";
import { X } from "lucide-react";

interface FilterModalProps {
  isOpen: boolean;
  onClose: () => void;
  onApply: (filters: any) => void;
}

export default function FilterModal({ isOpen, onClose, onApply }: FilterModalProps) {
  const [genres, setGenres] = useState<{ id: number; name: string }[]>([]);
  const [selectedGenres, setSelectedGenres] = useState<number[]>([]);
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  useEffect(() => {
    getGenres().then((res) => setGenres(res.data.genres));
  }, []);

  const toggleGenre = (id: number) => {
    setSelectedGenres(prev => 
      prev.includes(id) ? prev.filter(g => g !== id) : [...prev, id]
    );
  };

  const handleApply = () => {
    onApply({
      with_genres: selectedGenres.join(","),
      "primary_release_date.gte": startDate,
      "primary_release_date.lte": endDate,
    });
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 backdrop-blur-md p-4">
      <div className="bg-zinc-900 border border-white/10 w-full max-w-2xl rounded-3xl p-8 shadow-2xl overflow-y-auto max-h-[90vh] no-scrollbar">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-2xl font-bold">Filtros Avançados</h2>
          <button aria-label="Exit Button" onClick={onClose} className="text-zinc-500 hover:text-white cursor-pointer"><X /></button>
        </div>

        {/* filtro por data de lançamento */}
        <div className="mb-8">
          <h3 className="text-sm font-semibold text-zinc-400 mb-4 uppercase tracking-wider">Período de Lançamento</h3>
          <div className="flex gap-4 mb-2 font-medium">
            <p className="flex-1">Início:</p>
            <p className="flex-1">Fim:</p>
          </div>
          <div className="flex gap-4">
            <input
              aria-label="Date Start" 
              type="date" 
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
              className="flex-1 bg-black border border-white/10 rounded-xl p-3 text-sm focus:ring-2 focus:ring-violet-600 outline-none cursor-text"
            />
            <input
              aria-label="Date End" 
              type="date" 
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
              className="flex-1 bg-black border border-white/10 rounded-xl p-3 text-sm focus:ring-2 focus:ring-violet-600 outline-none cursor-text"
            />
          </div>
        </div>

        {/* filtro por gênero */}
        <div className="mb-10">
          <h3 className="text-sm font-semibold text-zinc-400 mb-4 uppercase tracking-wider">Gêneros</h3>
          <div className="flex flex-wrap gap-2">
            {genres.map(genre => (
              <button
                key={genre.id}
                onClick={() => toggleGenre(genre.id)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                  selectedGenres.includes(genre.id) 
                    ? "bg-violet-600 text-white shadow-lg shadow-violet-900/40" 
                    : "bg-white/5 text-zinc-400 hover:bg-white/10"
                }`}
              >
                {genre.name}
              </button>
            ))}
          </div>
        </div>

        <button 
          onClick={handleApply}
          className="w-full bg-white text-black font-bold py-4 rounded-2xl hover:bg-violet-500 transition cursor-pointer"
        >
          Aplicar Filtros
        </button>
      </div>
    </div>
  );
}