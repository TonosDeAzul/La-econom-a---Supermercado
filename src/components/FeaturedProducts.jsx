import ProductCard from "./ProductCard";
import products from "../data/products";

/* Cantidad de productos destacados a mostrar en la página de inicio */
const FEATURED_COUNT = 5;

/**
 * FeaturedProducts
 * Sección de productos destacados en la página de inicio.
 * Muestra los primeros FEATURED_COUNT productos del catálogo.
 *
 * Props:
 *   - onViewAll : función que navega al catálogo completo
 */
const FeaturedProducts = ({ onViewAll, onProductClick }) => {
  /* Toma solo los primeros N productos del catálogo */
  const featured = products.slice(0, FEATURED_COUNT);

  return (
    <section className="py-20 px-8 bg-gray-100" id="productos">
      <div className="max-w-7xl mx-auto">
        {/* Encabezado de sección */}
        <div className="text-center mb-12">
          <span className="inline-block bg-brand-light text-brand text-[0.75rem] font-bold uppercase tracking-[0.1em] px-3.5 py-1 rounded-full mb-3">
            Destacados
          </span>
          <h2 className="text-[clamp(1.8rem,3vw,2.5rem)] font-extrabold text-app-dark mb-3">
            Productos Frescos
          </h2>
          <p className="text-gray-500 max-w-[500px] mx-auto">
            Una selección de lo mejor que tenemos para tu hogar.
          </p>
        </div>

        {/* Grilla de tarjetas de productos destacados */}
        <div className="grid grid-cols-[repeat(auto-fill,minmax(230px,1fr))] gap-6">
          {featured.map((p) => (
            <ProductCard
              key={p.id}
              {...p}
              showAdd={false}
              onDetailClick={onProductClick}
            />
          ))}
        </div>

        {/* Pie de sección con contador y botón al catálogo */}
        <div className="text-center mt-10 flex flex-col items-center gap-3">
          <p className="text-gray-400 text-[0.9rem]">
            Tenemos {products.length} productos disponibles en todas las
            categorías
          </p>
          <button
            className="inline-flex items-center gap-2 px-7 py-3 rounded-full bg-brand text-white border-2 border-brand font-semibold text-[0.95rem] cursor-pointer transition-all hover:bg-brand-dark hover:border-brand-dark hover:-translate-y-0.5 shadow-[0_8px_24px_rgba(230,57,70,0.3)]"
            onClick={onViewAll}
          >
            Ver catálogo completo →
          </button>
        </div>
      </div>
    </section>
  );
};

export default FeaturedProducts;
