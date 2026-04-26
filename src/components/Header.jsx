import { useState } from "react";
import { useCart } from "../context/CartContext";

const Header = ({
  view,
  onNavigateTo,
  onScrollTo,
  onCartOpen,
  onBack,
  catalogSearch,
  onCatalogSearch,
}) => {
  const [menuOpen, setMenuOpen] = useState(false);
  const { count } = useCart();

  const closeMenu = () => setMenuOpen(false);

  const handleSection = (selector) => {
    onScrollTo(selector);
    closeMenu();
  };

  /* ── Modo checkout: barra mínima con botón volver ── */
  if (view === "checkout") {
    return (
      <header className="fixed top-0 left-0 right-0 z-[1000] bg-white border-b border-gray-200 shadow-sm h-16">
        <div className="h-full max-w-7xl mx-auto px-6 flex items-center gap-4">
          <button
            className="w-9 h-9 flex items-center justify-center border-[1.5px] border-gray-200 rounded-full bg-transparent cursor-pointer text-lg text-app-dark transition-all hover:border-brand hover:text-brand hover:bg-brand-light"
            onClick={onBack}
            aria-label="Volver"
          >
            &#8592;
          </button>
          <div className="flex items-center gap-3">
            <div className="p-1.5 bg-brand rounded-lg flex items-center justify-center text-xl text-white shadow-[0_8px_24px_rgba(230,57,70,0.3)]">
              🛒
            </div>
            <span className="font-extrabold text-app-dark text-[1rem]">
              Checkout
            </span>
          </div>
          <div className="ml-auto">
            <span className="text-[0.78rem] font-semibold text-green-600 bg-green-50 border border-green-200 px-3 py-1 rounded-full">
              🔒 Pago seguro
            </span>
          </div>
        </div>
      </header>
    );
  }

  /* ── Modo catálogo: barra compacta con búsqueda ── */
  if (view === "catalog") {
    return (
      <header className="fixed top-0 left-0 right-0 z-[1000] bg-white border-b border-gray-200 shadow-sm h-16">
        <div className="h-full max-w-7xl mx-auto px-6 flex items-center gap-3 justify-between">
          {/* Izquierda: botón volver + ícono logo */}
          <div className="flex items-center gap-1 shrink-0">
            <button
              className="w-9 h-9 flex items-center justify-center border-[1.5px] border-gray-200 rounded-full bg-transparent cursor-pointer text-lg text-app-dark transition-all hover:border-brand hover:text-brand hover:bg-brand-light"
              onClick={() => onNavigateTo("home")}
              aria-label="Volver al inicio"
            >
              &#8592;
            </button>
            <button
              className="p-1.5 bg-brand rounded-lg flex items-center justify-center text-2xl text-white shadow-[0_8px_24px_rgba(230,57,70,0.3)] cursor-pointer"
              onClick={() => onNavigateTo("home")}
              aria-label="Inicio"
            >
              🛒
            </button>
          </div>

          {/* Barra de búsqueda central */}
          <div className="flex-1 flex items-center gap-2 bg-gray-100 border-[1.5px] border-gray-200 rounded-full px-4 py-[7px] max-w-[600px] transition-all focus-within:border-brand focus-within:ring-2 focus-within:ring-brand/10 focus-within:bg-white">
            <span className="text-sm text-gray-400 shrink-0">🔍</span>
            <input
              type="text"
              className="flex-1 border-none bg-transparent text-[0.95rem] text-app-dark outline-none placeholder:text-gray-400"
              placeholder="Buscar productos..."
              value={catalogSearch}
              onChange={(e) => onCatalogSearch(e.target.value)}
              autoFocus
            />
            {catalogSearch && (
              <button
                className="bg-transparent border-none cursor-pointer text-gray-400 text-sm px-1 transition-colors hover:text-brand"
                onClick={() => onCatalogSearch("")}
                aria-label="Limpiar"
              >
                ✕
              </button>
            )}
          </div>

          {/* Botón del carrito */}
          <button
            className="relative bg-transparent border-none cursor-pointer text-2xl text-app-dark p-1.5 rounded-lg transition-all hover:text-brand hover:bg-brand-light"
            onClick={onCartOpen}
            aria-label="Carrito"
          >
            🛒
            {count > 0 && (
              <span className="absolute top-0 right-0 bg-brand text-white text-[0.65rem] font-bold w-[18px] h-[18px] rounded-full flex items-center justify-center">
                {count > 99 ? "99+" : count}
              </span>
            )}
          </button>
        </div>
      </header>
    );
  }

  /* ── Modo home: navegación completa ── */
  return (
    <header className="fixed top-0 left-0 right-0 z-[1000] bg-white shadow-sm px-8 h-[72px]">
      <div className="max-w-7xl mx-auto h-full flex items-center gap-8 justify-between">
        {/* Logo como botón */}
        <button
          className="flex items-center gap-3 shrink-0 bg-transparent border-none cursor-pointer p-0"
          onClick={() => {
            onNavigateTo("home");
            closeMenu();
          }}
          aria-label="Ir al inicio"
        >
          <div className="p-1.5 bg-brand rounded-lg flex items-center justify-center text-2xl text-white shadow-[0_8px_24px_rgba(230,57,70,0.3)]">
            🛒
          </div>
          <div className="flex flex-col leading-tight">
            <span className="text-[1.1rem] font-extrabold text-app-dark">
              La Economía
            </span>
            <span className="text-[0.7rem] font-medium text-gray-400 uppercase tracking-[0.05em]">
              Supermercado
            </span>
          </div>
        </button>

        {/* Navegación — oculta en mobile, visible en desktop; o abierta por hamburguesa */}
        <nav
          className={`${
            menuOpen ? "flex" : "hidden"
          } md:flex flex-col md:flex-row items-start md:items-center gap-1 absolute md:static top-[72px] left-0 right-0 bg-white md:bg-transparent p-4 md:p-0 shadow-lg md:shadow-none z-50`}
        >
          <button
            className="px-4 py-1.5 rounded-full text-sm font-medium text-brand bg-brand-light border-none cursor-pointer w-full md:w-auto text-left md:text-center"
            onClick={() => {
              onNavigateTo("home");
              closeMenu();
            }}
          >
            Inicio
          </button>
          <button
            className="px-4 py-1.5 rounded-full text-sm font-medium text-gray-500 bg-transparent border-none cursor-pointer transition-all hover:text-brand hover:bg-brand-light w-full md:w-auto text-left md:text-center"
            onClick={() => handleSection("#productos")}
          >
            Productos
          </button>
          <button
            className="px-4 py-1.5 rounded-full text-sm font-medium text-gray-500 bg-transparent border-none cursor-pointer transition-all hover:text-brand hover:bg-brand-light w-full md:w-auto text-left md:text-center"
            onClick={() => handleSection("#precios")}
          >
            Precios
          </button>
          <button
            className="px-4 py-1.5 rounded-full text-sm font-medium text-gray-500 bg-transparent border-none cursor-pointer transition-all hover:text-brand hover:bg-brand-light w-full md:w-auto text-left md:text-center"
            onClick={() => handleSection("#contacto")}
          >
            Contacto
          </button>
        </nav>

        {/* Carrito + hamburguesa */}
        <div className="flex items-center gap-2 shrink-0 ml-auto md:ml-0 md:hidden">
          {/* <button
            className="relative bg-transparent border-none cursor-pointer text-2xl text-app-dark p-1.5 rounded-lg transition-all hover:text-brand hover:bg-brand-light"
            onClick={onCartOpen}
            aria-label="Carrito"
          >
            🛒
            {count > 0 && (
              <span className="absolute top-0 right-0 bg-brand text-white text-[0.65rem] font-bold w-[18px] h-[18px] rounded-full flex items-center justify-center">
                {count > 99 ? '99+' : count}
              </span>
            )}
          </button> */}
          {/* Botón hamburguesa — solo visible en mobile */}
          <button
            className="md:hidden bg-transparent border-none cursor-pointer text-2xl text-app-dark p-1"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Menú"
          >
            {menuOpen ? "✕" : "☰"}
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;
