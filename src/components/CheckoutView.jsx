import { useState, useMemo } from "react";
import { useCart } from "../context/CartContext";

/* Clave de localStorage donde Hero guarda la info de entrega */
const LS_KEY = "delivery_info";

/**
 * CheckoutView
 * Flujo de checkout en 3 pasos:
 *   1. "payment"  — selección del método de pago
 *   2. "summary"  — resumen completo del pedido + confirmación
 *   3. "success"  — pantalla de pedido confirmado
 *
 * Props:
 *   - onConfirm : función que navega a 'home' tras confirmar el pedido
 *   - onBack    : función que vuelve a la vista anterior (catálogo)
 */
const CheckoutView = ({ onConfirm, onBack }) => {
  const { items, total, count, clear } = useCart();

  /* Paso actual del flujo */
  const [step, setStep] = useState("payment");

  /* Método de pago seleccionado — solo 'cash' disponible por ahora */
  const [paymentMethod, setPaymentMethod] = useState("cash");

  /* Número de pedido aleatorio — estable durante toda la sesión del componente */
  const orderNumber = useMemo(
    () => Math.floor(Math.random() * 90000) + 10000,
    [],
  );

  /* Lee la info de entrega guardada por Hero en localStorage */
  const deliveryInfo = useMemo(() => {
    try {
      return JSON.parse(localStorage.getItem(LS_KEY) || "{}");
    } catch {
      return {};
    }
  }, []);

  /* Confirma el pedido: limpia el carrito y muestra la pantalla de éxito */
  const handleConfirmOrder = () => {
    clear();
    setStep("success");
  };

  /* ── Pantalla de éxito ─────────────────────────────────── */
  if (step === "success") {
    return (
      <div className="pt-16 min-h-screen bg-gray-100 flex items-center justify-center p-8">
        <div className="bg-white rounded-3xl p-12 shadow-lg max-w-md w-full text-center flex flex-col items-center gap-4 animate-[fadeInPop_0.35s_ease_both]">
          <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center text-5xl">
            ✅
          </div>
          <h2 className="text-[1.6rem] font-extrabold text-app-dark">
            ¡Pedido confirmado!
          </h2>
          <p className="text-gray-500 max-w-[280px]">
            Gracias por tu compra. Estamos preparando tu pedido para{" "}
            {deliveryInfo.mode === "retiro" ? "que lo retires" : "enviarlo"}.
          </p>
          <div className="bg-gray-50 border border-gray-200 rounded-xl px-6 py-3 text-sm text-gray-500">
            Número de pedido:{" "}
            <span className="font-bold text-app-dark">#{orderNumber}</span>
          </div>
          {deliveryInfo.address && (
            <div className="flex items-center gap-2 text-[0.85rem] text-gray-400">
              <span>{deliveryInfo.mode === "retiro" ? "🏪" : "🛵"}</span>
              <span>{deliveryInfo.address}</span>
            </div>
          )}
          <button
            className="mt-4 inline-flex items-center gap-2 px-7 py-3 rounded-full bg-brand text-white border-2 border-brand font-semibold cursor-pointer transition-all hover:bg-brand-dark shadow-[0_8px_24px_rgba(230,57,70,0.3)]"
            onClick={onConfirm}
          >
            Volver al inicio
          </button>
        </div>
      </div>
    );
  }

  /* ── Paso 2: resumen del pedido ────────────────────────── */
  if (step === "summary") {
    return (
      <div className="pt-16 min-h-screen bg-gray-100">
        <div className="max-w-2xl mx-auto px-6 py-10">
          <h1 className="text-[1.5rem] font-extrabold text-app-dark mb-8">
            Resumen del pedido
          </h1>

          {/* Lista de productos */}
          <div className="bg-white rounded-2xl shadow-sm mb-5 overflow-hidden">
            <div className="px-6 py-4 border-b border-gray-100 flex items-center justify-between">
              <h3 className="font-bold text-app-dark">Productos ({count})</h3>
            </div>
            <div className="divide-y divide-gray-100">
              {items.map((item) => (
                <div
                  key={item.id}
                  className="flex items-center gap-3 px-6 py-4"
                >
                  <span className="text-2xl w-8 text-center shrink-0">
                    {item.emoji}
                  </span>
                  <div className="flex-1 min-w-0">
                    <p className="text-[0.875rem] font-semibold text-app-dark truncate">
                      {item.name}
                    </p>
                    <p className="text-[0.8rem] text-gray-400">
                      {item.qty} × ${item.price.toFixed(2)}
                    </p>
                  </div>
                  <span className="text-[0.875rem] font-bold text-brand shrink-0">
                    ${(item.price * item.qty).toFixed(2)}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Información de entrega */}
          <div className="bg-white rounded-2xl shadow-sm mb-5 px-6 py-5">
            <h3 className="font-bold text-app-dark mb-3">Entrega</h3>
            <div className="flex items-center gap-3 text-[0.9rem] text-gray-500">
              <span className="text-xl shrink-0">
                {deliveryInfo.mode === "retiro" ? "🏪" : "🛵"}
              </span>
              <div>
                <span className="block font-semibold text-app-dark capitalize">
                  {deliveryInfo.mode === "retiro"
                    ? "Retiro en tienda"
                    : "Delivery"}
                </span>
                <span>{deliveryInfo.address || "No especificada"}</span>
              </div>
            </div>
          </div>

          {/* Método de pago */}
          <div className="bg-white rounded-2xl shadow-sm mb-5 px-6 py-5">
            <h3 className="font-bold text-app-dark mb-3">Método de pago</h3>
            <div className="flex items-center gap-3 text-[0.9rem]">
              <span className="text-xl">💵</span>
              <span className="font-semibold text-app-dark">Efectivo</span>
            </div>
          </div>

          {/* Desglose de total */}
          <div className="bg-white rounded-2xl shadow-sm mb-8 px-6 py-5">
            <div className="flex justify-between items-center py-1.5 text-[0.875rem] text-gray-500">
              <span>
                Subtotal ({count} producto{count !== 1 ? "s" : ""})
              </span>
              <span>${total.toFixed(2)}</span>
            </div>
            <div className="flex justify-between items-center py-1.5 text-[0.875rem] text-gray-500">
              <span>Envío</span>
              <span className="text-green-500 font-semibold">✓ Gratis</span>
            </div>
            <div className="flex justify-between items-center pt-2.5 mt-1.5 border-t border-gray-200 text-base font-extrabold text-app-dark">
              <span>Total</span>
              <span className="text-brand">${total.toFixed(2)}</span>
            </div>
          </div>

          {/* Acciones */}
          <div className="flex flex-col gap-3">
            <button
              className="w-full inline-flex items-center justify-center px-7 py-[13px] rounded-full bg-brand text-white border-2 border-brand font-semibold cursor-pointer transition-all hover:bg-brand-dark shadow-[0_8px_24px_rgba(230,57,70,0.3)]"
              onClick={handleConfirmOrder}
            >
              Confirmar compra ✓
            </button>
            <button
              className="w-full text-center text-[0.85rem] text-gray-400 bg-transparent border-none cursor-pointer transition-colors hover:text-brand py-1.5"
              onClick={() => setStep("payment")}
            >
              ← Volver a método de pago
            </button>
          </div>
        </div>
      </div>
    );
  }

  /* ── Paso 1: selección del método de pago ──────────────── */
  return (
    <div className="pt-16 min-h-screen bg-gray-100">
      <div className="max-w-2xl mx-auto px-6 py-10">
        <h1 className="text-[1.5rem] font-extrabold text-app-dark mb-2">
          Método de pago
        </h1>
        <p className="text-gray-500 mb-8">Elegí cómo querés abonar tu pedido</p>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-10">
          {/* Efectivo — activo */}
          <button
            className={`relative flex flex-col items-center gap-3 p-7 rounded-2xl border-2 cursor-pointer transition-all text-left ${
              paymentMethod === "cash"
                ? "border-brand bg-brand-light shadow-md"
                : "border-gray-200 bg-white hover:border-brand"
            }`}
            onClick={() => setPaymentMethod("cash")}
          >
            {paymentMethod === "cash" && (
              <span className="absolute top-3 right-3 w-5 h-5 bg-brand rounded-full flex items-center justify-center text-white text-xs">
                ✓
              </span>
            )}
            <span className="text-4xl">💵</span>
            <span className="font-bold text-app-dark">Efectivo</span>
            <span className="text-[0.78rem] text-gray-400 text-center">
              Pagá al momento de la entrega
            </span>
          </button>

          {/* Tarjeta — bloqueada */}
          <div
            className="relative flex flex-col items-center gap-3 p-7 rounded-2xl border-2 border-gray-200 bg-gray-50 opacity-50 cursor-not-allowed select-none"
            title="Próximamente disponible"
          >
            <span className="absolute top-3 right-3 text-gray-400 text-lg">
              🔒
            </span>
            <span className="text-4xl grayscale">💳</span>
            <span className="font-bold text-gray-400">Tarjeta</span>
            <span className="text-[0.78rem] text-gray-400 text-center">
              Próximamente disponible
            </span>
          </div>
        </div>

        <button
          className="w-full inline-flex items-center justify-center px-7 py-[13px] rounded-full bg-brand text-white border-2 border-brand font-semibold cursor-pointer transition-all hover:bg-brand-dark shadow-[0_8px_24px_rgba(230,57,70,0.3)]"
          onClick={() => setStep("summary")}
        >
          Continuar →
        </button>
        <button
          className="w-full mt-3 text-center text-[0.85rem] text-gray-400 bg-transparent border-none cursor-pointer transition-colors hover:text-brand py-1.5"
          onClick={onBack}
        >
          ← Volver al catálogo
        </button>
      </div>
    </div>
  );
};

export default CheckoutView;
