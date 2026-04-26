import { useCart } from "../context/CartContext";

/**
 * CartDrawer
 * Panel lateral deslizante del carrito de compras.
 * Se abre sobre la pantalla cuando el usuario hace clic en el ícono del carrito.
 *
 * Props:
 *   - open    : booleano que controla si el drawer está abierto
 *   - onClose : función para cerrar el drawer
 */
const CartDrawer = ({ open, onClose, onCheckout }) => {
  const { items, updateQty, remove, clear, total, count } = useCart();

  return (
    <>
      {/* Overlay oscuro — al hacer clic cierra el carrito */}
      <div
        className={`fixed inset-0 z-[2000] bg-black/45 backdrop-blur-[3px] transition-opacity duration-300 ${
          open
            ? "opacity-100 pointer-events-auto"
            : "opacity-0 pointer-events-none"
        }`}
        onClick={onClose}
      />

      {/* Panel deslizante desde la derecha */}
      <div
        className={`fixed top-0 right-0 bottom-0 w-[400px] max-w-full bg-white z-[2001] flex flex-col shadow-2xl transition-transform duration-300 ease-in-out ${
          open ? "translate-x-0" : "translate-x-full"
        }`}
        role="dialog"
        aria-label="Carrito de compras"
      >
        {/* Cabecera del drawer */}
        <div className="px-6 py-5 border-b border-gray-200 flex items-center justify-between">
          <h2 className="text-[1.05rem] font-extrabold text-app-dark flex items-center gap-2 m-0">
            🛒 Mi carrito
            {count > 0 && (
              <span className="bg-brand text-white text-[0.7rem] font-bold px-1.5 py-0.5 rounded-full">
                {count}
              </span>
            )}
          </h2>
          <button
            className="bg-transparent border-none cursor-pointer text-gray-400 text-lg p-1.5 rounded-lg transition-all hover:text-brand hover:bg-brand-light leading-none"
            onClick={onClose}
            aria-label="Cerrar carrito"
          >
            ✕
          </button>
        </div>

        {/* Cuerpo: lista de ítems o estado vacío */}
        {items.length === 0 ? (
          <div className="flex-1 flex flex-col items-center justify-center gap-3 text-center p-8 text-gray-400">
            <span className="text-6xl">🛒</span>
            <h3 className="text-[1.1rem] font-bold text-app-dark">
              Tu carrito está vacío
            </h3>
            <p>Buscá productos y agregálos desde el catálogo</p>
          </div>
        ) : (
          <>
            {/* Lista de productos en el carrito */}
            <div className="flex-1 overflow-y-auto px-5 py-4 flex flex-col gap-3">
              {items.map((item) => (
                <div
                  key={item.id}
                  className="flex gap-3 items-center p-3.5 bg-gray-100 rounded-2xl"
                >
                  {/* Emoji del producto */}
                  <div className="w-[50px] h-[50px] min-w-[50px] bg-white rounded-lg flex items-center justify-center text-2xl shadow-sm">
                    {item.emoji || "🛒"}
                  </div>
                  {/* Nombre y precio */}
                  <div className="flex-1 min-w-0">
                    <p className="text-[0.875rem] font-bold text-app-dark whitespace-nowrap overflow-hidden text-ellipsis mb-0.5">
                      {item.name}
                    </p>
                    <p className="text-[0.82rem] text-brand font-semibold">
                      ${(item.price * item.qty).toFixed(2)}
                    </p>
                  </div>
                  {/* Controles de cantidad */}
                  <div className="flex items-center gap-1.5 shrink-0">
                    <button
                      className="w-[26px] h-[26px] bg-white border-[1.5px] border-gray-200 rounded-md cursor-pointer flex items-center justify-center text-base font-bold text-app-dark transition-all hover:border-brand hover:text-brand"
                      onClick={() => updateQty(item.id, -1)}
                      aria-label="Quitar uno"
                    >
                      &#8722;
                    </button>
                    <span className="text-[0.875rem] font-bold min-w-[22px] text-center">
                      {item.qty}
                    </span>
                    <button
                      className="w-[26px] h-[26px] bg-white border-[1.5px] border-gray-200 rounded-md cursor-pointer flex items-center justify-center text-base font-bold text-app-dark transition-all hover:border-brand hover:text-brand"
                      onClick={() => updateQty(item.id, +1)}
                      aria-label="Agregar uno"
                    >
                      +
                    </button>
                    <button
                      className="w-[26px] h-[26px] bg-white border-[1.5px] border-gray-200 rounded-md cursor-pointer flex items-center justify-center text-xs text-app-dark transition-all hover:bg-brand hover:text-white hover:border-brand"
                      onClick={() => remove(item.id)}
                      aria-label="Eliminar producto"
                    >
                      🗑
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {/* Pie: resumen de precios y acciones */}
            <div className="px-6 py-5 border-t border-gray-200">
              <div className="mb-5">
                {/* Fila subtotal */}
                <div className="flex justify-between items-center py-1.5 text-[0.875rem] text-gray-500">
                  <span>
                    Subtotal ({count} producto{count !== 1 ? "s" : ""})
                  </span>
                  <span>${total.toFixed(2)}</span>
                </div>
                {/* Fila envío gratis */}
                <div className="flex justify-between items-center py-1.5 text-[0.875rem] text-gray-500">
                  <span>Envío</span>
                  <span className="text-green-500 font-semibold">✓ Gratis</span>
                </div>
                {/* Fila total */}
                <div className="flex justify-between items-center pt-2.5 mt-1.5 border-t-[1.5px] border-gray-200 text-base font-extrabold text-app-dark">
                  <span>Total</span>
                  <span className="text-brand">${total.toFixed(2)}</span>
                </div>
              </div>
              {/* Botón checkout */}
              <button
                className="w-full inline-flex items-center justify-center px-7 py-[13px] rounded-full bg-brand text-white border-2 border-brand font-semibold cursor-pointer transition-all hover:bg-brand-dark shadow-[0_8px_24px_rgba(230,57,70,0.3)]"
                onClick={() => {
                  onCheckout?.();
                  onClose();
                }}
              >
                {" "}
                Ir al checkout →
              </button>
              {/* Vaciar carrito */}
              <button
                className="w-full mt-2.5 text-center text-[0.8rem] text-gray-400 bg-transparent border-none cursor-pointer transition-colors hover:text-brand py-1.5"
                onClick={clear}
              >
                Vaciar carrito
              </button>
            </div>
          </>
        )}
      </div>
    </>
  );
};

export default CartDrawer;
