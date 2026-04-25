interface RatingStarsProps {
  count?: number;
  starSize?: number;
}

export default function RatingStars({ count = 5, starSize = 10 }: RatingStarsProps) {
  const starH = starSize * 0.95;
  return (
    <div style={{ display: "flex", alignItems: "center" }}>
      {Array.from({ length: 5 }, (_, i) => (
        <svg
          key={i}
          width={starSize}
          height={starH}
          viewBox="0 0 24 24"
          fill={i < count ? "#EAB308" : "#E1E2EB"}
          style={{ flexShrink: 0 }}
        >
          <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
        </svg>
      ))}
    </div>
  );
}
