import { useState, useMemo } from "react";
import products from "../data/products";

/* Metadatos visuales por categoría: color de acento, fondo y emoji */
const CATEGORY_META = {
  Granos: { color: "#f59e0b", bg: "#fffbeb", icon: "🌾" },
  Lácteos: { color: "#0ea5e9", bg: "#f0f9ff", icon: "🥛" },
  Panadería: { color: "#d97706", bg: "#fef9c3", icon: "🍞" },
  Frescos: { color: "#16a34a", bg: "#f0fdf4", icon: "🥬" },
  Snacks: { color: "#e11d48", bg: "#fff1f2", icon: "🍿" },
  Bebidas: { color: "#2563eb", bg: "#eff6ff", icon: "🥤" },
  Limpieza: { color: "#059669", bg: "#ecfdf5", icon: "🧹" },
  Carnes: { color: "#dc2626", bg: "#fef2f2", icon: "🥩" },
  Congelados: { color: "#0891b2", bg: "#ecfeff", icon: "❄️" },
  Higiene: { color: "#9333ea", bg: "#fdf4ff", icon: "🧴" },
};

/* Configuración de badges de tendencia con clases Tailwind directas */
const TREND_CONFIG = {
  up: {
    label: "↑",
    classes: "bg-red-50 text-red-600 border border-red-200",
    text: "Subió",
  },
  down: {
    label: "↓",
    classes: "bg-green-50 text-green-700 border border-green-200",
    text: "Bajó",
  },
  stable: {
    label: "→",
    classes: "bg-slate-50 text-slate-400 border border-slate-200",
    text: "Estable",
  },
};

/**
 * TrendBadge
 * Muestra el badge de tendencia de precio de un producto.
 * Props:
 *   - trend     : 'up' | 'down' | 'stable'
 *   - variation : porcentaje de variación (0 = sin valor visible)
 */
const TrendBadge = ({ trend, variation }) => {
  /* Usa la configuración de 'stable' como fallback si el valor es desconocido */
  const cfg = TREND_CONFIG[trend] ?? TREND_CONFIG.stable;
  return (
    <span
      className={`inline-flex items-center gap-1 text-[0.72rem] font-bold px-2 py-0.5 rounded-full whitespace-nowrap ${cfg.classes}`}
      title={cfg.text}
    >
      {cfg.label}
      {variation > 0 && (
        <span className="text-[0.68rem] opacity-90">{variation}%</span>
      )}
    </span>
  );
};

/* Lista de categorías en el mismo orden que CATEGORY_META */
const CATEGORIES = [...Object.keys(CATEGORY_META)];

/**
 * Prices
 * Sección de lista de precios con pestañas por categoría.
 * Muestra todos los productos de la categoría activa con badge de tendencia.
 */
const Prices = () => {
  /* Categoría cuya pestaña está activa */
  const [activeCategory, setActiveCategory] = useState("Granos");

  /* Productos filtrados por la categoría activa */
  const filtered = useMemo(() => {
    if (activeCategory === "Todos") return products;
    return products.filter((p) => p.category === activeCategory);
  }, [activeCategory]);

  return (
    <section className="py-20 px-8 bg-white" id="precios">
      <div className="max-w-7xl mx-auto">
        {/* Encabezado de sección */}
        <div className="text-center mb-12">
          <span className="inline-block bg-brand-light text-brand text-[0.75rem] font-bold uppercase tracking-[0.1em] px-3.5 py-1 rounded-full mb-3">
            Transparencia
          </span>
          <h2 className="text-[clamp(1.8rem,3vw,2.5rem)] font-extrabold text-app-dark mb-3">
            Lista de Precios
          </h2>
          <p className="text-gray-500 max-w-[500px] mx-auto">
            Precios actualizados sin sorpresas. Lo que ves es lo que pagás.
          </p>
        </div>

        {/* Pestañas de categoría */}
        <div className="flex flex-wrap gap-2 justify-center mb-10">
          {CATEGORIES.map((cat) => {
            const meta = CATEGORY_META[cat];
            const isActive = activeCategory === cat;
            return (
              <button
                key={cat}
                className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full border-2 border-gray-200 bg-white text-gray-600 cursor-pointer text-[0.82rem] font-semibold transition-all hover:border-brand hover:text-brand"
                style={
                  isActive && meta
                    ? {
                        background: meta.color,
                        borderColor: meta.color,
                        color: "#fff",
                      }
                    : {}
                }
                onClick={() => setActiveCategory(cat)}
              >
                {meta && <span>{meta.icon}</span>}
                {cat}
              </button>
            );
          })}
        </div>

        {/* Grilla de tarjetas de precios */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {filtered.map((p) => {
            /* Metadatos de color de la categoría del producto */
            const meta = CATEGORY_META[p.category] || {};
            return (
              <div
                key={p.id}
                className="flex items-center gap-3 p-4 bg-white border border-gray-200 rounded-2xl shadow-sm hover:-translate-y-0.5 hover:shadow-md transition-all"
              >
                {/* Emoji del producto */}
                <span className="text-[1.6rem] shrink-0 w-8 text-center">
                  {p.emoji}
                </span>
                {/* Nombre y descripción */}
                <div className="flex-1 min-w-0">
                  <span className="block text-[0.9rem] font-semibold text-app-dark">
                    {p.name}
                  </span>
                  <span className="block text-[0.75rem] text-gray-400 mt-0.5 leading-[1.4] line-clamp-2">
                    {p.description}
                  </span>
                </div>
                {/* Badge de tendencia + precio */}
                <div className="flex flex-col items-end gap-1.5 shrink-0">
                  {/* Badge de tendencia: indica si el precio subió, bajó o se mantuvo */}
                  <TrendBadge trend={p.trend} variation={p.variation} />
                  <span
                    className="inline-block text-white font-extrabold text-[0.88rem] px-3 py-1 rounded-full whitespace-nowrap"
                    style={{ background: meta.color || "#e63946" }}
                  >
                    ${p.price.toFixed(2)}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Prices;
