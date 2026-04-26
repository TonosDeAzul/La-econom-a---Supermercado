import { useEffect, useState } from "react";
import { useCart } from "../context/CartContext";
import StarRating from "./StarRating";

/* Configuración visual de las tendencias de precio */
const TREND_CONFIG = {
  up: {
    label: "↑ Subió",
    cls: "bg-red-50 text-red-600 border border-red-200",
  },
  down: {
    label: "↓ Bajó",
    cls: "bg-green-50 text-green-700 border border-green-200",
  },
  stable: {
    label: "→ Estable",
    cls: "bg-slate-50 text-slate-400 border border-slate-200",
  },
};

/**
 * ProductModal
 * Ventana centrada (estilo visor) para ver el detalle de un producto.
 * Se cierra con el botón X, haciendo clic en el overlay o presionando Escape.
 *
 * Props:
 *   - product : objeto completo del producto a mostrar
 *   - onClose : función para cerrar el modal
 */
const ProductModal = ({ product, onClose }) => {
  const { add, remove, items } = useCart();
  const [isHover, setIsHover] = useState(false);

  /* Indica si el producto ya está en el carrito (para cambiar el botón) */
  const inCart = items.some((i) => i.id === product.id);

  /* Cierra el modal al presionar Escape */
  useEffect(() => {
    const handleKey = (e) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", handleKey);
    return () => document.removeEventListener("keydown", handleKey);
  }, [onClose]);

  /* Bloquea el scroll del body mientras el modal está abierto */
  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, []);

  const trend = TREND_CONFIG[product.trend] ?? TREND_CONFIG.stable;

  return (
    <>
      {/* Overlay oscuro */}
      <div
        className="fixed inset-0 z-[3000] bg-black/70 backdrop-blur-sm"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Contenedor centrador — clic en fondo también cierra */}
      <div
        className="fixed inset-0 z-[3001] flex items-center justify-center p-4"
        onClick={onClose}
        role="dialog"
        aria-modal="true"
        aria-label={product.name}
      >
        {/* Tarjeta del modal — detiene la propagación para no cerrar al hacer clic dentro */}
        <div
          className="relative bg-white rounded-3xl shadow-2xl w-full max-w-2xl overflow-hidden flex flex-col sm:flex-row animate-[fadeInPop_0.25s_ease_both]"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Botón cerrar */}
          <button
            className="absolute top-4 right-4 z-10 w-8 h-8 flex items-center justify-center bg-white rounded-full text-gray-400 border border-gray-200 transition-all hover:text-brand hover:bg-brand-light hover:border-brand cursor-pointer"
            onClick={onClose}
            aria-label="Cerrar"
          >
            ✕
          </button>

          {/* Columna izquierda: emoji o imagen del producto */}
          <div className="sm:w-[42%] bg-gray-100 flex items-center justify-center p-10 min-h-[240px]">
            <span className="text-[5.5rem] select-none">
              {product.emoji || "🛒"}
            </span>
          </div>

          {/* Columna derecha: información detallada */}
          <div className="flex-1 p-8 flex flex-col gap-3">
            {/* Badge de categoría */}
            <span className="self-start bg-yellow-400 text-yellow-900 text-[0.68rem] font-bold px-2.5 py-0.5 rounded-full uppercase tracking-wide">
              {product.category}
            </span>

            {/* Nombre del producto */}
            <h2 className="text-[1.35rem] font-extrabold text-app-dark leading-tight pr-8">
              {product.name}
            </h2>

            {/* Rating con estrellas */}
            {product.rating != null && (
              <StarRating rating={product.rating} reviews={product.reviews} />
            )}

            {/* Descripción */}
            {product.description && (
              <p className="text-[0.9rem] text-gray-500 leading-[1.75]">
                {product.description}
              </p>
            )}

            {/* Badge de tendencia de precio */}
            {product.trend && (
              <span
                className={`self-start inline-flex items-center gap-1 text-[0.72rem] font-bold px-2.5 py-0.5 rounded-full ${trend.cls}`}
              >
                {trend.label}
                {product.variation > 0 && (
                  <span className="opacity-80">{product.variation}%</span>
                )}
              </span>
            )}

            {/* Pie: precio + botón de carrito */}
            <div className="flex items-center justify-between mt-auto pt-4 border-t border-gray-100">
              <span className="text-[1.8rem] font-extrabold text-brand">
                ${product.price.toFixed(2)}
              </span>
              <button
                className={`px-5 py-2.5 rounded-full font-bold text-[0.85rem] cursor-pointer transition-all border-none ${
                  inCart
                    ? "bg-green-500 text-white hover:bg-red-500"
                    : "bg-brand text-white hover:bg-brand-dark"
                }`}
                onClick={() => (inCart ? remove(product.id) : add(product))}
                onMouseEnter={() => setIsHover(true)}
                onMouseLeave={() => setIsHover(false)}
              >
                {inCart ? (isHover ? "✕ Quitar" : "✓ En carrito") : "+ Agregar"}
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProductModal;
