/**
 * StarRating
 * Muestra estrellas llenas, media estrella y vacías según el rating.
 * La media estrella se activa cuando el decimal es >= 0.3.
 *
 * Props:
 *   - rating  : número decimal entre 0 y 5
 *   - reviews : cantidad total de reseñas (opcional)
 */
const StarRating = ({ rating, reviews }) => {
  /* Cantidad de estrellas completas */
  const fullCount  = Math.floor(rating);

  /* Mostrar media estrella si el decimal supera el umbral de 0.3 */
  const hasHalf    = rating % 1 >= 0.3;

  /* Estrellas vacías para completar las 5 posiciones */
  const emptyCount = 5 - fullCount - (hasHalf ? 1 : 0);

  return (
    <div className="flex items-center gap-1.5">
      {/* Fila de estrellas */}
      <div className="flex gap-px">
        {/* Estrellas llenas */}
        {Array.from({ length: fullCount }).map((_, i) => (
          <span key={`full-${i}`} className="text-[0.9rem] leading-none text-yellow-400">★</span>
        ))}
        {/* Media estrella — usa clase CSS para el gradiente (ver index.css) */}
        {hasHalf && <span className="star-half text-[0.9rem] leading-none">★</span>}
        {/* Estrellas vacías */}
        {Array.from({ length: emptyCount }).map((_, i) => (
          <span key={`empty-${i}`} className="text-[0.9rem] leading-none text-gray-300">★</span>
        ))}
      </div>
      {/* Número de rating y cantidad de reseñas */}
      <span className="text-[0.75rem] text-gray-400">
        <span className="font-bold text-app-dark">{rating.toFixed(1)}</span>
        {reviews != null && <span> ({reviews})</span>}
      </span>
    </div>
  );
};

export default StarRating;
