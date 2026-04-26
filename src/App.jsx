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
 * Componente interno que maneja la navegación entre vistas y el estado global de la UI.
 * Vistas posibles: 'home' (página de inicio) | 'catalog' (catálogo completo)
 */
function AppContent() {
  /* Vista activa: 'home' | 'catalog' | 'checkout' */
  const [view, setView] = useState("home");

  /* Vista previa a checkout (para el botón volver del header) */
  const [prevView, setPrevView] = useState("home");

  /* Controla si el drawer del carrito está abierto */
  const [cartOpen, setCartOpen] = useState(false);

  /* Producto seleccionado para el modal de detalle (null = cerrado) */
  const [selectedProduct, setSelectedProduct] = useState(null);

  /* Sección a la que se debe hacer scroll al volver a home (se setea antes de navegar) */
  const [pendingScroll, setPendingScroll] = useState(null);

  /* Texto de búsqueda compartido entre el Header y CatalogView */
  const [catalogSearch, setCatalogSearch] = useState("");

  /* Ejecuta el scroll pendiente una vez que la vista home está montada */
  useEffect(() => {
    if (view === "home" && pendingScroll) {
      const timer = setTimeout(() => {
        document
          .querySelector(pendingScroll)
          ?.scrollIntoView({ behavior: "smooth" });
        setPendingScroll(null);
      }, 80);
      return () => clearTimeout(timer);
    }
  }, [view, pendingScroll]);

  /* Cambia la vista y reinicia la búsqueda al volver a home */
  const navigate = (v) => {
    if (v === "checkout") setPrevView(view);
    setView(v);
    if (v === "home") setCatalogSearch("");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  /* Navega a una sección dentro de home; si estamos en catalog, primero vuelve a home */
  const scrollTo = (selector) => {
    if (view !== "home") {
      setView("home");
      setPendingScroll(selector);
      window.scrollTo({ top: 0, behavior: "smooth" });
    } else {
      document.querySelector(selector)?.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <>
      <Header
        view={view}
        onNavigateTo={navigate}
        onScrollTo={scrollTo}
        onCartOpen={() => setCartOpen(true)}
        onBack={() => navigate(prevView)}
        catalogSearch={catalogSearch}
        onCatalogSearch={setCatalogSearch}
      />
      {view === "home" ? (
        <main>
          <Hero onOrderNow={() => navigate("catalog")} />
          <FeaturedProducts
            onViewAll={() => navigate("catalog")}
            onProductClick={setSelectedProduct}
          />
          <Prices />
          <Contact />
        </main>
      ) : view === "catalog" ? (
        <CatalogView
          externalSearch={catalogSearch}
          onProductClick={setSelectedProduct}
        />
      ) : (
        <CheckoutView
          onConfirm={() => navigate("home")}
          onBack={() => navigate(prevView)}
        />
      )}
      {view !== "checkout" && <Footer />}
      <CartDrawer
        open={cartOpen}
        onClose={() => setCartOpen(false)}
        onCheckout={() => navigate("checkout")}
      />
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
  return (
    <CartProvider>
      <AppContent />
    </CartProvider>
  );
}

export default App;
