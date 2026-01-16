interface Props {
  movie: any;
  userRating?: number;
  onRate: (rating: number) => void;
  onClick: () => void;
}

export default function MovieCard({ movie, onClick }: Props) {
  return (
    <div
      onClick={onClick} 
      className="relative cursor-pointer transition-transform hover:scale-105 group"
    >
      {/* placeholder para caso o filme não tenha poster */}
      <img
        src={movie.poster_path ? `https://image.tmdb.org/t/p/w500${movie.poster_path}` : "https://placehold.co/500x750/09090b/8b5cf6?text=Sem+Poster"}
        alt={movie.title}
        className="rounded-xl"
      />

      <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-transparent opacity-0 group-hover:opacity-100 transition p-4 flex flex-col justify-end">
        <h3 className="font-bold text-white mb-1">{movie.title}</h3>
        <span className="text-yellow-500 font-semibold text-md mb-2">
          ★ {movie.vote_average?.toFixed(1)}
        </span>
        
        <div onClick={(e) => e.stopPropagation()}>
        </div>
      </div>
    </div>
  );
}
