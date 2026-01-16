import { SlidersHorizontal } from "lucide-react";

interface Props {
  value?: string | undefined;
  onChange: (v: string) => void;
  onOpenFilters?: () => void;
}

export default function SearchBar({ value, onChange, onOpenFilters }: Props) {
  return (
    <div className="flex items-center
      w-full
      max-w-xl sm:max-w-2xl lg:max-w-3xl
      mx-auto
      bg-zinc-900/80 backdrop-blur-md
      rounded-full overflow-hidden
      border border-white/10
      focus-within:border-violet-500
      transition"
    >
      <input
        type="text"
        placeholder="Buscar filmes..."
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="flex-1 bg-transparent px-4 sm:px-6 py-3 sm:py-4 text-white outline-none placeholder-zinc-400"
      />

      <button
        aria-label="Filter Button"
        onClick={onOpenFilters}
        className="px-5 h-full flex items-center justify-center text-zinc-300 hover:text-violet-500 transition cursor-pointer"
      >
        <SlidersHorizontal size={22} />
      </button>
    </div>
  );
}
