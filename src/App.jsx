// ─── Árbol de componentes de la aplicación ──────────────────────────────────────
//
// App (raíz exportada)
// └── CartProvider          ← provee el carrito a todos sus hijos
//     └── AppContent         ← controla qué vista mostrar
//         ├── Header         ← siempre visible
//         ├── Hero | CatalogView | CheckoutView  (solo una a la vez)
//         ├── Footer         ← oculto en checkout
//         ├── CartDrawer     ← panel lateral siempre disponible
//         └── ProductModal   ← modal de detalle (solo cuando hay producto seleccionado)

import { useState, useEffect } from "react";
import { CartProvider } from "./context/CartContext";
import Header from "./components/Header";
import Hero from "./components/Hero";
import FeaturedProducts from "./components/FeaturedProducts";
import Prices from "./components/Prices";
import Contact from "./components/Contact";
import Footer from "./components/Footer";
import CatalogView from "./components/CatalogView";
import CartDrawer from "./components/CartDrawer";
import ProductModal from "./components/ProductModal";
import CheckoutView from "./components/CheckoutView";

/**
 * AppContent
 * Componente que concentra toda la lógica de navegación y estado global de la UI.
 *
 * Esta app NO usa React Router (libreria de rutas). En cambio, tiene un estado
 * `view` que indica qué "página" mostrar. Cuando `view` cambia, React vuelve a
 * renderizar este componente y muestra el JSX correspondiente.
 *
 * Vistas posibles: 'home' | 'catalog' | 'checkout'
 */
function AppContent() {
  // ─── useState — concepto clave de React ────────────────────────────────
  // useState(valorInicial) devuelve dos cosas:
  //   [valorActual, funciónParaActualizar]
  // Cuando llamás a la función de actualización, React vuelve a renderizar
  // el componente con el nuevo valor. Nunca modifiques la variable directamente.

  /* Vista activa: determina qué pantalla se muestra */
  const [view, setView] = useState("home");

  /* Guarda qué vista estaba activa antes de entrar a checkout (para el botón “volver”) */
  const [prevView, setPrevView] = useState("home");

  /* true = el panel lateral del carrito está visible; false = oculto */
  const [cartOpen, setCartOpen] = useState(false);

  /* El producto cuyos detalles se están viendo en el modal. null significa que el modal está cerrado */
  const [selectedProduct, setSelectedProduct] = useState(null);

  /* Selector CSS de la sección a la que hay que hacer scroll después de volver a home */
  const [pendingScroll, setPendingScroll] = useState(null);

  /* Texto de búsqueda compartido: el Header lo escribe, CatalogView lo lee */
  const [catalogSearch, setCatalogSearch] = useState("");

  // ─── useEffect — otro concepto clave de React ─────────────────────────────
  // useEffect(función, [dependencias]) ejecuta la función DESPUÉS de que
  // React termina de renderizar el componente. Se vuelve a ejecutar cada vez
  // que cambia alguno de los valores en el array de dependencias.
  //
  // Problema a resolver: cuando el usuario hace clic en un link de sección
  // desde el catálogo, primero debemos cambiar la vista a 'home' y LUEGO
  // hacer scroll. Si intentáramos hacer scroll inmediatamente, la sección
  // todavía no existe en el DOM porque la vista home aún no se dibujó.
  // useEffect nos permite esperar a que React termine de renderizar.
  useEffect(() => {
    if (view === "home" && pendingScroll) {
      // setTimeout agrega un pequeño retraso extra (80ms) para asegurar
      // que el DOM ya esté completamente pintado antes del scroll
      const timer = setTimeout(() => {
        document
          .querySelector(pendingScroll)
          ?.scrollIntoView({ behavior: "smooth" });
        setPendingScroll(null); // Limpia el pendiente para no hacer scroll de nuevo
      }, 80);
      // La función que devuelve useEffect se llama "limpieza" (cleanup).
      // React la ejecuta si el componente se desmonta o si el efecto corre de nuevo.
      // Aquí cancela el timer si la vista cambia antes de que se cumpla el plazo.
      return () => clearTimeout(timer);
    }
  }, [view, pendingScroll]); // ← Este efecto solo corre cuando `view` o `pendingScroll` cambian

  // ─── navigate — la función de ruteo manual de esta app ─────────────────
  // Esta función se pasa como prop a Header, Hero, FeaturedProducts, etc.
  // Cuando un hijo la llama con navigate('catalog'), este componente
  // actualiza `view` y todos los hijos que dependen de `view` se re-renderizan.
  // Esto se llama "elevar el estado" (lifting state up): el estado vive en el
  // padre común y los hijos solo lo leen o notifican cambios a través de props.
  const navigate = (v) => {
    // Antes de ir al checkout, guardamos desde dónde venimos para poder volver
    if (v === "checkout") setPrevView(view);
    setView(v);
    // Al volver a inicio, limpiamos la búsqueda para que no quede texto residual
    if (v === "home") setCatalogSearch("");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  /* Navega a una sección dentro de home; si estamos en otra vista, primero vuelve a home */
  const scrollTo = (selector) => {
    if (view !== "home") {
      // No podemos hacer scroll a una sección que aún no está en pantalla.
      // Primero cambiamos la vista y guardamos el scroll pendiente.
      // El useEffect de arriba se encargará del scroll cuando la vista esté lista.
      setView("home");
      setPendingScroll(selector);
      window.scrollTo({ top: 0, behavior: "smooth" });
    } else {
      // Ya estamos en home: el elemento existe, podemos scrollear directo
      document.querySelector(selector)?.scrollIntoView({ behavior: "smooth" });
    }
  };

  // ─── JSX devuelto por el componente ──────────────────────────────────────────
  // En React, cada componente devuelve JSX: una mezcla de HTML y JavaScript.
  // El Fragment (<>) es un contenedor invisible; evita agregar un <div> extra al DOM.
  //
  // Props: cada atributo que pasamos a un componente hijo es una prop.
  // Por ejemplo, `view={view}` le pasa el valor de `view` al Header.
  // Las props que empiezan con `on` son funciones de callback: el hijo las
  // llama cuando ocurre algo (clic, cambio, etc.) y el padre reacciona.
  return (
    <>
      {/* Header siempre visible; recibe la vista activa y las funciones de navegación */}
      <Header
        view={view}
        onNavigateTo={navigate}
        onScrollTo={scrollTo}
        onCartOpen={() => setCartOpen(true)}
        onBack={() => navigate(prevView)}
        catalogSearch={catalogSearch}
        onCatalogSearch={setCatalogSearch}
      />

      {/*
        Renderizado condicional: solo se muestra UNA de estas tres opciones.
        Es como un if/else pero dentro de JSX.
        - view === "home"    → muestra la página de inicio con todas sus secciones
        - view === "catalog" → muestra el catálogo completo con búsqueda y filtros
        - cualquier otro    → muestra el checkout (en este caso solo puede ser "checkout")
      */}
      {view === "home" ? (
        <main>
          {/* onOrderNow es la prop que Hero usará para navegar al catálogo */}
          <Hero onOrderNow={() => navigate("catalog")} />
          <FeaturedProducts onViewAll={() => navigate("catalog")} />
          <Prices />
          <Contact />
        </main>
      ) : view === "catalog" ? (
        <CatalogView
          externalSearch={catalogSearch} // búsqueda escrita en el header
          onProductClick={setSelectedProduct} // al hacer clic en producto → abre modal
        />
      ) : (
        <CheckoutView
          onConfirm={() => navigate("home")} // al confirmar compra → vuelve a inicio
          onBack={() => navigate(prevView)} // al volver → regresa a la vista anterior
        />
      )}

      {/* El footer se oculta durante el checkout para no distraer al usuario */}
      {view !== "checkout" && <Footer />}

      {/* CartDrawer siempre está en el DOM pero visualmente oculto hasta que open=true */}
      <CartDrawer
        open={cartOpen}
        onClose={() => setCartOpen(false)}
        onCheckout={() => navigate("checkout")}
      />

      {/*
        El modal solo se renderiza si hay un producto seleccionado.
        Cuando onClose lo llama, setSelectedProduct(null) lo elimina del DOM.
        Este patrón (renderizar condicionalmente) es más eficiente que
        tener el modal siempre en el DOM con display:none.
      */}
      {selectedProduct && (
        <ProductModal
          product={selectedProduct}
          onClose={() => setSelectedProduct(null)}
        />
      )}
    </>
  );
}

function App() {
  // CartProvider envuelve a AppContent para que useCart() funcione en cualquier
  // componente del árbol, sin necesidad de pasar `items`, `add`, etc. como props
  // en cada nivel. Es el "proveedor de contexto" del carrito.
  return (
    <CartProvider>
      <AppContent />
    </CartProvider>
  );
}

export default App;
