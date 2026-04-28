import { createContext, useContext, useState } from "react";

// ─── ¿Por qué Context y no simplemente pasar props? ──────────────────────────
//
// En React, la forma "normal" de compartir datos es pasarlos de padre a hijo
// a través de props. Pero imagina que el Header necesita la cantidad de productos
// del carrito y el CartDrawer también: habría que pasar esos datos por muchos
// componentes intermedios que no los necesitan. Eso se llama "prop drilling".
//
// Context resuelve esto creando un "estado global" al que cualquier componente
// puede acceder directamente sin que los intermedios lo sepan.
//
// Patrón que usamos:
//   1. createContext()  → crea el "canal" de comunicación
//   2. <Provider>       → envuelve la app y publica los datos en ese canal
//   3. useContext()     → cualquier hijo lee los datos del canal

/* Crea el contexto del carrito. null es el valor por defecto si no hay Provider */
const CartContext = createContext(null);

/**
 * CartProvider
 * Envuelve la aplicación y provee el estado del carrito a todos sus hijos.
 * Expone: items, add, remove, updateQty, clear, total, count
 *
 * Uso en App.jsx:
 *   <CartProvider>
 *     <AppContent />   ← puede leer el carrito con useCart()
 *   </CartProvider>
 */
export const CartProvider = ({ children }) => {
  // useState([]) crea una variable de estado llamada `items` con valor inicial [].
  // En React, cuando un estado cambia, el componente se vuelve a renderizar
  // automáticamente mostrando los datos actualizados en pantalla.
  // setItems es la función que usamos para actualizar ese estado.
  const [items, setItems] = useState([]);

  /* Agrega un producto; si ya existe incrementa su cantidad en 1 */
  const add = (product) => {
    // Usamos la forma funcional de setItems: recibe el estado anterior (prev)
    // y devuelve el nuevo estado. Esto garantiza que trabajamos con el valor
    // más reciente, incluso si hay múltiples actualizaciones en cadena.
    setItems((prev) => {
      const existing = prev.find((i) => i.id === product.id);
      if (existing) {
        // El producto ya está en el carrito → solo incrementar cantidad.
        // map() recorre el array y devuelve uno nuevo; no modifica el original
        // (React requiere inmutabilidad: no se puede mutar el estado directamente).
        return prev.map((i) =>
          i.id === product.id ? { ...i, qty: i.qty + 1 } : i,
        );
      }
      // Producto nuevo → agregar al final con qty inicial de 1.
      // El spread "...product" copia todas las propiedades del producto.
      return [...prev, { ...product, qty: 1 }];
    });
  };

  /* Elimina por completo un producto del carrito usando su id */
  // filter() devuelve un nuevo array sin el elemento que cumple la condición.
  const remove = (id) => setItems((prev) => prev.filter((i) => i.id !== id));

  /* Ajusta la cantidad de un producto en +1 o -1 (delta = diferencia) */
  const updateQty = (id, delta) => {
    setItems((prev) => {
      const item = prev.find((i) => i.id === id);
      if (!item) return prev; // Si el producto no existe, devuelve el estado sin cambios
      const newQty = item.qty + delta;
      // Si la nueva cantidad llega a 0 o menos, eliminar el producto del carrito
      if (newQty <= 0) return prev.filter((i) => i.id !== id);
      return prev.map((i) => (i.id === id ? { ...i, qty: newQty } : i));
    });
  };

  /* Vacía completamente el carrito */
  const clear = () => setItems([]);

  // Estos valores se calculan derivados del estado `items` en cada render.
  // No necesitan ser estados separados porque siempre se pueden calcular desde items.

  /* Total monetario — suma de precio × cantidad de cada ítem */
  const total = items.reduce((acc, item) => acc + item.price * item.qty, 0);

  /* Total de unidades en el carrito (para el badge del header) */
  const count = items.reduce((acc, item) => acc + item.qty, 0);

  return (
    // El Provider publica los valores en el contexto.
    // Todo componente dentro de <CartProvider> puede leerlos con useCart().
    // `children` representa todos los componentes que envuelve este Provider.
    <CartContext.Provider
      value={{ items, add, remove, updateQty, clear, total, count }}
    >
      {children}
    </CartContext.Provider>
  );
};

// Hook personalizado: simplifica el acceso al contexto.
// En lugar de escribir `useContext(CartContext)` en cada componente,
// solo escribimos `useCart()`. Más limpio y reutilizable.
export const useCart = () => useContext(CartContext);
