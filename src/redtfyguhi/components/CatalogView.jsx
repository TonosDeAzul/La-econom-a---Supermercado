import { useState, useMemo, useRef } from "react";
import products from "../data/products";
import ProductCard from "./ProductCard";

/* Lista de categorías únicas extraída del catálogo, con "Todos" al inicio */
const CATEGORIES = ["Todos", ...new Set(products.map((p) => p.category))];

/* Opciones de ordenamiento disponibles para el select */
const SORT_OPTIONS = [
  { value: "relevance", label: "Relevancia" },
  { value: "price-asc", label: "Precio: menor a mayor" },
  { value: "price-desc", label: "Precio: mayor a menor" },
  { value: "rating", label: "Mejor calificación" },
  { value: "name", label: "Nombre A–Z" },
];

/**
 * CatalogView
 * Vista completa del catálogo de productos con filtros y ordenamiento.
 *
 * Props:
 *   - externalSearch : texto de búsqueda proveniente del header
 */
const CatalogView = ({ externalSearch, onProductClick }) => {
  /* Categoría seleccionada en el dropdown de filtros */
  const [category, setCategory] = useState("Todos");

  /* Criterio de ordenamiento activo */
  const [sort, setSort] = useState("relevance");

  /* Controla si el menú desplegable de categorías está abierto */
  const [dropOpen, setDropOpen] = useState(false);

  /* Referencia al contenedor del dropdown (para control de hover/focus) */
  const dropRef = useRef(null);

  /* Selecciona una categoría y cierra el menú desplegable */
  const handleCategorySelect = (cat) => {
    setCategory(cat);
    setDropOpen(false);
  };

  /* Lista filtrada y ordenada de productos — se recalcula con useMemo */
  const filtered = useMemo(() => {
    let result = [...products];

    /* Filtrar por categoría seleccionada */
    if (category !== "Todos") {
      result = result.filter((p) => p.category === category);
    }

    /* Filtrar por texto de búsqueda del header (nombre, categoría o descripción) */
    if (externalSearch?.trim()) {
      const q = externalSearch.toLowerCase();
      result = result.filter(
        (p) =>
          p.name.toLowerCase().includes(q) ||
          p.category.toLowerCase().includes(q) ||
          p.description?.toLowerCase().includes(q),
      );
    }

    /* Aplicar el ordenamiento seleccionado */
    switch (sort) {
      case "price-asc":
        result.sort((a, b) => a.price - b.price);
        break;
      case "price-desc":
        result.sort((a, b) => b.price - a.price);
        break;
      case "rating":
        result.sort((a, b) => (b.rating ?? 0) - (a.rating ?? 0));
        break;
      case "name":
        result.sort((a, b) => a.name.localeCompare(b.name));
        break;
    }

    return result;
  }, [category, externalSearch, sort]);

  /* Restaura los filtros al estado inicial */
  const clearFilters = () => {
    setCategory("Todos");
    setSort("relevance");
  };

  const closeTimer = useRef(null);

  // Cancela el cierre del menú desplegable si vuelves a entrar
  const handleMouseEnter = () => {
    clearTimeout(closeTimer.current);
    setDropOpen(true);
  };

  // Inicia un temporizador para cerrar el menú desplegable al salir, con un pequeño delay para permitir cruzar el gap
  const handleMouseLeave = () => {
    closeTimer.current = setTimeout(() => {
      setDropOpen(false);
    }, 150); // 150ms de gracia para cruzar el gap
  };

  return (
    <div className="pt-16 min-h-screen bg-gray-100">
      {/* Barra de filtros: dropdown de categoría + select de orden */}
      <div className="bg-white border-b border-gray-200 px-8 py-3.5">
        <div className="max-w-7xl mx-auto flex items-center gap-4 flex-wrap">
          {/* Dropdown de categoría */}
          <div
            className="relative shrink-0"
            ref={dropRef}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
          >
            <button
              className={`flex items-center gap-2 px-4 py-2 rounded-full border-[1.5px] font-semibold text-[0.875rem] cursor-pointer transition-all whitespace-nowrap ${
                category !== "Todos"
                  ? "bg-brand text-white border-brand hover:bg-brand-dark"
                  : "bg-white text-app-dark border-gray-200 hover:border-brand hover:bg-brand-light hover:text-brand"
              }`}
              onClick={() => setDropOpen((o) => !o)}
              aria-expanded={dropOpen}
            >
              <span>🏷️ {category === "Todos" ? "Categorías" : category}</span>
              <span
                className={`text-xs transition-transform duration-200 ${dropOpen ? "rotate-180" : ""}`}
              >
                &#9662;
              </span>
            </button>

            {/* Menú desplegable — visibilidad controlada por React state */}
            <div
              className={`absolute top-[calc(100%+6px)] left-0 min-w-[180px] bg-white border border-gray-200 rounded-2xl shadow-lg z-[500] overflow-hidden transition-all duration-[180ms] ${
                dropOpen
                  ? "opacity-100 translate-y-0 pointer-events-auto"
                  : "opacity-0 -translate-y-1.5 pointer-events-none"
              }`}
              role="menu"
            >
              {CATEGORIES.map((cat) => (
                <button
                  key={cat}
                  role="menuitem"
                  className={`w-full flex items-center justify-between px-4 py-2.5 border-b border-gray-100 last:border-b-0 bg-transparent text-[0.875rem] font-medium cursor-pointer text-left transition-all hover:bg-brand-light hover:text-brand ${
                    category === cat
                      ? "bg-brand-light text-brand font-bold"
                      : "text-app-dark"
                  }`}
                  onClick={() => handleCategorySelect(cat)}
                >
                  {cat === "Todos" ? "🔄 Todos" : cat}
                  {category === cat && (
                    <span className="text-[0.8rem] text-brand">✓</span>
                  )}
                </button>
              ))}
            </div>
          </div>

          {/* Contador de resultados + select de ordenamiento */}
          <div className="flex items-center gap-3 ml-auto">
            <span className="text-[0.82rem] text-gray-400 bg-gray-100 px-3.5 py-1 rounded-full whitespace-nowrap">
              {filtered.length} producto{filtered.length !== 1 ? "s" : ""}
            </span>
            <select
              className="px-3.5 py-2 rounded-full border-[1.5px] border-gray-200 text-[0.82rem] text-app-dark bg-white cursor-pointer outline-none transition-colors focus:border-brand"
              value={sort}
              onChange={(e) => setSort(e.target.value)}
            >
              {SORT_OPTIONS.map((o) => (
                <option key={o.value} value={o.value}>
                  {o.label}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Grilla de productos o estado vacío */}
      <div className="max-w-7xl mx-auto px-8 py-8">
        {filtered.length === 0 ? (
          /* Estado vacío: sin resultados para la búsqueda actual */
          <div className="text-center py-20 flex flex-col items-center gap-4">
            <span className="text-6xl">🔍</span>
            <h3 className="text-[1.3rem] font-bold text-app-dark">
              Sin resultados
            </h3>
            <p className="text-gray-500">
              No encontramos productos que coincidan con tu búsqueda.
            </p>
            <button
              className="mt-4 inline-flex items-center px-6 py-2.5 rounded-full bg-transparent text-brand border-2 border-brand font-semibold text-[0.875rem] cursor-pointer transition-all hover:bg-brand hover:text-white"
              onClick={clearFilters}
            >
              Limpiar filtros
            </button>
          </div>
        ) : (
          /* Grilla responsiva de tarjetas */
          <div className="grid grid-cols-[repeat(auto-fill,minmax(240px,1fr))] gap-6">
            {filtered.map((p) => (
              <ProductCard key={p.id} {...p} onDetailClick={onProductClick} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default CatalogView;
