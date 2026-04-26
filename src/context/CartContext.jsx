import { createContext, useContext, useState } from "react";

/* Contexto global del carrito — accesible desde cualquier componente */
const CartContext = createContext(null);

/**
 * CartProvider
 * Envuelve la aplicación y provee el estado del carrito a todos sus hijos.
 * Expone: items, add, remove, updateQty, clear, total, count
 */
export const CartProvider = ({ children }) => {
  /* Lista de productos en el carrito; cada ítem incluye qty (cantidad) */
  const [items, setItems] = useState([]);

  /* Agrega un producto; si ya existe incrementa su cantidad en 1 */
  const add = (product) => {
    setItems((prev) => {
      const existing = prev.find((i) => i.id === product.id);
      if (existing) {
        /* El producto ya está en el carrito → solo incrementar cantidad */
        return prev.map((i) =>
          i.id === product.id ? { ...i, qty: i.qty + 1 } : i,
        );
      }
      /* Producto nuevo → agregar con qty inicial de 1 */
      return [...prev, { ...product, qty: 1 }];
    });
  };

  /* Elimina por completo un producto del carrito usando su id */
  const remove = (id) => setItems((prev) => prev.filter((i) => i.id !== id));

  /* Ajusta la cantidad de un producto; si llega a 0 lo elimina */
  const updateQty = (id, delta) => {
    setItems((prev) => {
      const item = prev.find((i) => i.id === id);
      if (!item) return prev;
      const newQty = item.qty + delta;
      /* Si la nueva cantidad es 0 o negativa, eliminar el producto */
      if (newQty <= 0) return prev.filter((i) => i.id !== id);
      return prev.map((i) => (i.id === id ? { ...i, qty: newQty } : i));
    });
  };

  /* Vacía completamente el carrito */
  const clear = () => setItems([]);

  /* Total monetario — suma de precio × cantidad de cada ítem */
  const total = items.reduce((acc, item) => acc + item.price * item.qty, 0);

  /* Total de unidades en el carrito (para el badge del header) */
  const count = items.reduce((acc, item) => acc + item.qty, 0);

  return (
    <CartContext.Provider
      value={{ items, add, remove, updateQty, clear, total, count }}
    >
      {children}
    </CartContext.Provider>
  );
};

/* Hook personalizado para consumir el carrito desde cualquier componente */
export const useCart = () => useContext(CartContext);
