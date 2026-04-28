// ─── Punto de entrada de la aplicación ──────────────────────────────────────
//
// Este archivo es el primero que ejecuta el navegador.
// Su único trabajo es decirle a React dónde debe dibujar la interfaz.
//
// ¿Cómo funciona React?
//   React no modifica el HTML directamente. En cambio, construye un "árbol"
//   de componentes en memoria (Virtual DOM) y solo actualiza el navegador
//   cuando algo cambia, de forma eficiente.
//
// ¿Qué es un componente?
//   Es una función JavaScript que devuelve JSX (código que parece HTML).
//   Por ejemplo: const Saludo = () => <h1>Hola</h1>;
//   Cada componente puede tener su propio estado y lógica.

import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css"; // Estilos globales + tema de colores de Tailwind CSS
import App from "./App.jsx";

// createRoot recibe el <div id="root"> que está en index.html y lo convierte
// en el contenedor de toda la app React.
//
// .render() dibuja el componente <App /> dentro de ese div.
// A partir de aquí, React toma el control de toda la interfaz.
createRoot(document.getElementById("root")).render(
  // StrictMode es solo para desarrollo: no cambia nada visual, pero
  // ejecuta algunas funciones dos veces para ayudarte a detectar errores
  // antes de que lleguen a producción. En producción se desactiva solo.
  <StrictMode>
    <App />
  </StrictMode>,
);
