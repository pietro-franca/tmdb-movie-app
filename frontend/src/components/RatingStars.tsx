interface Props {
  value?: number;
  onRate: (value: number) => void;
}

export default function RatingStars({ value, onRate }: Props) {
  const safeValue = value ?? 0;
  
  return (
    <div className="flex gap-1">
      {[1, 2, 3, 4, 5].map((star) => (
        <button
          key={star}
          onClick={() => onRate(star)}
          className="text-xl hover:-translate-y-0.5 transition cursor-pointer"
        >
          <span
            className={
              star <= safeValue
                ? "text-yellow-400"
                : "text-gray-400 hover:text-yellow-300"
            }
          >
            ★
          </span>
        </button>
      ))}
    </div>
  );
}
