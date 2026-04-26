import { useState } from "react";
import * as yup from "yup";

/* Emojis de alimentos que se muestran en el panel visual del hero */
const FOOD_ITEMS = ["🥦", "🍅", "🥕", "🍊", "🥑", "🍓", "🧀", "🥩", "🍞"];

/* Dirección fija del local para el modo retiro */
const STORE_ADDRESS = "C. 56A #3-00, Este, Bogotá";

/* Clave de localStorage para persistir la información de entrega */
const LS_KEY = "delivery_info";

/* Esquema Yup: valida la dirección en modo delivery */
const addressSchema = yup.object({
  address: yup
    .string()
    .required("Ingresá tu dirección completa")
    .min(5, "Mínimo 5 caracteres"),
});

/**
 * Hero
 * Sección principal de bienvenida con llamada a la acción.
 * Props:
 *   - onOrderNow : función que navega al catálogo (viene de App.jsx)
 */
const Hero = ({ onOrderNow }) => {
  /* Modo activo: 'delivery' entrega a domicilio | 'retiro' en local */
  const [mode, setMode] = useState("delivery");

  // Inicializador diferido de useState: en lugar de pasar un valor directo,
  // pasamos una función que React ejecuta UNA sola vez al montar el componente.
  // Esto es ideal para leer localStorage, porque si pasáramos el valor directo
  // esa lectura ocurriría en cada re-render, siendo innecesaria y lenta.
  const [address, setAddress] = useState(() => {
    try {
      // Intentamos recuperar la dirección guardada en el último uso de la app.
      // JSON.parse convierte el string guardado de vuelta a objeto JavaScript.
      // Si no hay nada guardado, usamos {} como fallback para evitar errores.
      return JSON.parse(localStorage.getItem(LS_KEY) || "{}").address || "";
    } catch {
      // Si el valor en localStorage está corrupto o no es JSON válido, empezamos vacío
      return "";
    }
  });

  /* Mensaje de error de validación Yup ("” = sin error) */
  const [error, setError] = useState("");

  /* Dispara la animación de "shake" cuando la validación falla */
  const [shake, setShake] = useState(false);

  /* Cambia el modo y limpia cualquier error previo */
  const handleModeSwitch = (newMode) => {
    setMode(newMode);
    setError("");
  };

  // Función async: usa async/await para esperar la validación de Yup.
  // Las funciones async siempre devuelven una Promise, pero con await
  // podemos escribirlas como si fueran síncronas.
  const handleConfirm = async () => {
    if (mode === "delivery") {
      try {
        // addressSchema.validate() lanza un error si la dirección no cumple las reglas.
        // Si no lanza, la dirección es válida y podemos continuar.
        await addressSchema.validate({ address });
        // Guardamos en localStorage para que esté disponible en CheckoutView
        localStorage.setItem(
          LS_KEY,
          JSON.stringify({ address, mode: "delivery" }),
        );
        setError("");
        onOrderNow(); // Llama la función de App.jsx que cambia la vista a 'catalog'
      } catch (err) {
        // Yup lanza un objeto con .message que contiene el texto del error definido en el esquema
        setError(err.message);
        setShake(true);
        // setTimeout es nativa del navegador: ejecuta la función después de N milisegundos.
        // Aquí usamos para apagar la animación tras 500ms.
        setTimeout(() => setShake(false), 500);
      }
    } else {
      // En modo retiro no se necesita validar: guardamos la dirección del local
      localStorage.setItem(
        LS_KEY,
        JSON.stringify({ address: STORE_ADDRESS, mode: "retiro" }),
      );
      onOrderNow();
    }
  };

  return (
    <section
      className="min-h-screen pt-[72px] bg-white flex flex-col"
      id="inicio"
    >
      {/* Fila principal: texto + visual decorativo */}
      <div className="flex-1 max-w-7xl mx-auto w-full px-8 py-16 grid grid-cols-1 md:grid-cols-2 items-center gap-16">
        {/* Columna de texto */}
        <div>
          <span className="inline-flex items-center gap-2 bg-brand-light text-brand text-[0.78rem] font-bold uppercase tracking-[0.08em] px-4 py-1.5 rounded-full mb-6">
            🚀 Entrega a domicilio
          </span>
          <h1 className="text-[clamp(2.4rem,4.5vw,3.8rem)] font-extrabold leading-[1.15] text-app-dark mb-5">
            No pases hambre,
            <em className="text-brand italic block">¡Solo ordena!</em>
          </h1>
          <p className="text-gray-500 max-w-[440px] mb-10 leading-[1.75]">
            Los mejores productos frescos y de calidad, entregados directo a tu
            puerta. Encontrá todo lo que necesitás al mejor precio del mercado.
          </p>
          {/* Botones de acción */}
          <div className="flex gap-4 flex-wrap">
            <button
              className="inline-flex items-center gap-2 px-7 py-3 rounded-full bg-brand text-white border-2 border-brand font-semibold text-[0.95rem] cursor-pointer transition-all hover:bg-brand-dark hover:border-brand-dark hover:-translate-y-0.5 shadow-[0_8px_24px_rgba(230,57,70,0.3)]"
              onClick={onOrderNow}
            >
              Ordenar Ahora →
            </button>
            <a
              href="#precios"
              className="inline-flex items-center gap-2 px-7 py-3 rounded-full bg-transparent text-app-dark border-2 border-gray-200 font-semibold text-[0.95rem] transition-all hover:bg-gray-100 hover:border-gray-400"
            >
              Ver precios
            </a>
          </div>
        </div>

        {/* Panel decorativo con emojis de alimentos */}
        <div className="relative flex items-center justify-center h-[460px]">
          {/* Blob morfante de fondo */}
          <div className="hero-blob absolute w-[400px] h-[400px] bg-gradient-to-br from-brand-light to-yellow-100/50" />
          {/* Esferas flotantes decorativas */}
          <div className="hero-deco-1 absolute w-20 h-20 bg-yellow-400 rounded-full top-[50px] right-[60px] opacity-90" />
          <div className="hero-deco-2 absolute w-12 h-12 bg-brand rounded-full bottom-[90px] left-[50px] opacity-65" />
          <div className="hero-deco-3 absolute w-7 h-7 bg-yellow-400 rounded-full top-[120px] left-[80px] opacity-70" />
          {/* Tarjeta de emojis */}
          <div className="relative z-10 bg-white rounded-[32px] p-7 shadow-2xl grid grid-cols-3 gap-3.5">
            {FOOD_ITEMS.map((emoji, index) => (
              <div
                key={index}
                className="hero-food-item w-[78px] h-[78px] bg-gray-100 rounded-2xl flex items-center justify-center text-4xl cursor-default hover:scale-110 hover:rotate-6 transition-transform"
              >
                {emoji}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Barra de dirección: delivery o retiro en tienda */}
      <div className="bg-gray-100 px-8 pb-12">
        <div
          className={`max-w-[860px] mx-auto -translate-y-1/2 ${shake ? "animate-[shake_0.4s_ease]" : ""}`}
        >
          {/* Barra principal */}
          <div className="bg-white rounded-full shadow-2xl p-2.5 pl-6 flex items-center gap-3">
            <div className="flex-1 flex items-center gap-2.5 min-w-0">
              <span className="text-xl shrink-0">📍</span>
              {mode === "delivery" ? (
                /* Input de dirección — solo en modo delivery */
                <input
                  type="text"
                  placeholder="Ingresá tu dirección completa..."
                  className="flex-1 border-none outline-none text-[0.95rem] text-app-dark bg-transparent placeholder:text-gray-400 min-w-0"
                  value={address}
                  onChange={(e) => {
                    setAddress(e.target.value);
                    if (error) setError("");
                  }}
                  onKeyDown={(e) => e.key === "Enter" && handleConfirm()}
                />
              ) : (
                /* Dirección fija del local — en modo retiro */
                <span className="flex-1 text-[0.95rem] text-gray-500 truncate">
                  {STORE_ADDRESS}
                </span>
              )}
            </div>
            <div className="flex items-center gap-2.5 shrink-0">
              {/* Botón Delivery — activo = fondo sólido; inactivo = outline */}
              <button
                className={`inline-flex items-center px-7 py-3 rounded-full font-semibold cursor-pointer transition-all border-2 ${
                  mode === "delivery"
                    ? "bg-brand text-white border-brand hover:bg-brand-dark"
                    : "bg-transparent text-brand border-brand hover:bg-brand hover:text-white"
                }`}
                onClick={() =>
                  mode === "delivery"
                    ? handleConfirm()
                    : handleModeSwitch("delivery")
                }
              >
                Delivery
              </button>
              <span className="text-gray-400 text-sm">o</span>
              {/* Botón Retiro — activo = fondo sólido; inactivo = outline */}
              <button
                className={`inline-flex items-center px-7 py-3 rounded-full font-semibold cursor-pointer transition-all border-2 ${
                  mode === "retiro"
                    ? "bg-brand text-white border-brand hover:bg-brand-dark"
                    : "bg-transparent text-brand border-brand hover:bg-brand hover:text-white"
                }`}
                onClick={() =>
                  mode === "retiro"
                    ? handleConfirm()
                    : handleModeSwitch("retiro")
                }
              >
                Retiro
              </button>
            </div>
          </div>
          {/* Error de validación Yup — solo visible en delivery con error */}
          {error && (
            <p className="text-red-500 text-[0.8rem] font-medium mt-2 ml-6 flex items-center gap-1">
              ⚠ {error}
            </p>
          )}
        </div>
      </div>
    </section>
  );
};

export default Hero;
