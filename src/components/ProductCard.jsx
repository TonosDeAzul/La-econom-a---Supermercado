import { useState } from "react";
import { useCart } from "../context/CartContext";
import StarRating from "./StarRating";

/**
 * ProductCard
 * Tarjeta individual de producto. Muestra imagen o emoji de respaldo,
 * nombre, rating, precio y botón para agregar al carrito.
 *
 * Props:
 *   - id       : identificador único del producto
 *   - name     : nombre del producto
 *   - image    : nombre del archivo de imagen (opcional)
 *   - emoji    : emoji de respaldo cuando no hay imagen
 *   - price    : precio numérico
 *   - category : categoría del producto (muestra badge)
 *   - rating   : puntuación decimal 0–5 (opcional)
 *   - reviews  : cantidad de reseñas (opcional)
 *   - showAdd  : muestra el botón de agregar al carrito (opcional)
 */
const ProductCard = ({
  id,
  name,
  image,
  emoji,
  price,
  category,
  rating,
  reviews,
  description,
  trend,
  variation,
  showAdd = true,
  onDetailClick,
}) => {
  const [isHover, setIsHover] = useState(false);

  const { add, remove, items } = useCart();

  /* Estado de error de imagen: si falla la carga se muestra el emoji */
  const [imgError, setImgError] = useState(false);

  /* Indica si el producto ya está en el carrito (para cambiar el botón) */
  const inCart = items.some((i) => i.id === id);

  /* Agrega el producto al carrito con todos sus datos */
  const handleAdd = () => {
    add({ id, name, image, emoji, price, category, rating, reviews });
  };

  /* Remover el producto al carrito con todos sus datos */
  const handleRemove = () => {
    remove(id);
  };

  return (
    /* Tarjeta con elevación al hacer hover; clic abre el detalle del producto */
    <div
      className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-md hover:-translate-y-1.5 transition-all relative flex flex-col cursor-pointer"
      onClick={() =>
        onDetailClick?.({
          id,
          name,
          image,
          emoji,
          price,
          category,
          rating,
          reviews,
          description,
          trend,
          variation,
        })
      }
    >
      {/* Badge de categoría — posición absoluta sobre la imagen */}
      {category && (
        <span className="absolute top-3 left-3 bg-yellow-400 text-yellow-900 text-[0.68rem] font-bold px-2.5 py-0.5 rounded-full uppercase tracking-wide z-10">
          {category}
        </span>
      )}

      {/* Área de imagen o emoji de respaldo */}
      <div className="h-44 overflow-hidden bg-gray-100 flex items-center justify-center">
        {image && !imgError ? (
          <img
            src={`/images/${image}`}
            alt={name}
            className="w-full h-full object-cover transition-transform hover:scale-105"
            onError={() => setImgError(true)}
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-6xl bg-gray-100">
            {emoji || "🛒"}
          </div>
        )}
      </div>

      {/* Información del producto: nombre, rating y precio */}
      <div className="p-5 flex-1 flex flex-col gap-3">
        <h3 className="text-base font-bold text-app-dark">{name}</h3>
        {rating != null && <StarRating rating={rating} reviews={reviews} />}
        <div className="flex items-center justify-between mt-auto">
          <span className="text-[1.3rem] font-extrabold text-brand">
            ${price.toFixed(2)}
          </span>
          {showAdd && (
            <button
              className={`border-none px-4 py-2 rounded-full text-[0.8rem] font-bold cursor-pointer transition-all ${
                inCart
                  ? "bg-green-500 text-white hover:bg-red-500 hover:text-white"
                  : "bg-brand-light text-brand hover:bg-brand hover:text-white"
              }`}
              onClick={(e) => {
                e.stopPropagation();
                inCart ? handleRemove() : handleAdd();
              }}
              onMouseEnter={() => setIsHover(true)}
              onMouseLeave={() => setIsHover(false)}
            >
              {inCart ? (isHover ? "✕ Quitar" : "✓ En carrito") : "+ Agregar"}
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
