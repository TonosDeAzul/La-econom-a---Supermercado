# Supermercado La Economía - React App

Proyecto web del **Supermercado La Economía** construido con **React + Vite**.
Incluye catálogo de productos, lista de precios, carrito de compras, formulario de contacto y flujo de checkout.

## Tecnologías usadas

- [React 19](https://react.dev/) - Librería para construir interfaces
- [Vite 8](https://vite.dev/) - Bundler y servidor de desarrollo rápido
- [Tailwind CSS v4](https://tailwindcss.com/) - Utilidades CSS (via `@tailwindcss/vite`)
- [Yup](https://github.com/jquense/yup) - Validación de formularios

## Estructura del proyecto

```
supermercado-react/
├── public/
│   └── images/                  # Imágenes de los productos
├── src/
│   ├── components/
│   │   ├── Header.jsx           # Encabezado y navegación (home / catálogo / checkout)
│   │   ├── Hero.jsx             # Sección principal con barra delivery/retiro
│   │   ├── FeaturedProducts.jsx # Grilla de productos destacados
│   │   ├── ProductCard.jsx      # Tarjeta individual de producto
│   │   ├── ProductModal.jsx     # Modal de detalle del producto
│   │   ├── StarRating.jsx       # Componente de estrellas de rating
│   │   ├── Prices.jsx           # Sección de lista de precios por categoría
│   │   ├── Contact.jsx          # Formulario de contacto con validación Yup
│   │   ├── CatalogView.jsx      # Vista del catálogo con filtros y ordenamiento
│   │   ├── CartDrawer.jsx       # Panel lateral deslizante del carrito
│   │   ├── CheckoutView.jsx     # Flujo de checkout (pago → resumen → confirmación)
│   │   └── Footer.jsx           # Pie de página
│   ├── context/
│   │   └── CartContext.jsx      # Contexto global del carrito
│   ├── data/
│   │   └── products.js          # Catálogo de 100 productos
│   ├── App.jsx                  # Componente raíz y navegación entre vistas
│   ├── main.jsx                 # Punto de entrada de React
│   └── index.css                # Tema Tailwind + animaciones globales
├── index.html
└── vite.config.js
```

## Requisitos previos

Asegurate de tener instalado:

- [Node.js](https://nodejs.org/) versión 18 o superior
- npm (incluido con Node.js)

Para verificar tus versiones ejecuta:

```bash
node --version
npm --version
```

## Instalación

1. Clona o descarga el repositorio y entra a la carpeta del proyecto:

```bash
cd supermercado-react
```

2. Instala las dependencias:

```bash
npm install
```

## Ejecución en desarrollo

Inicia el servidor con recarga automática (HMR):

```bash
npm run dev
```

## Agregar o modificar productos

Todos los productos están en `src/data/products.js`. Cada producto tiene la siguiente forma:

```js
{
  id: 101,
  name: 'Nombre del producto',
  emoji: '🛒',
  price: 2.50,
  category: 'Granos',       // Categoría existente del catálogo
  rating: 4.5,
  reviews: 80,
  description: 'Descripción breve del producto.',
  trend: 'up',              // 'up' | 'down' | 'stable'
  variation: 5,             // Porcentaje de cambio de precio
}
```

## Componentes

| Componente         | Descripción                                                                                   |
| ------------------ | --------------------------------------------------------------------------------------------- |
| `Header`           | Barra de navegación fija. Adapta su diseño según la vista activa (home / catálogo / checkout) |
| `Hero`             | Sección de bienvenida con barra de delivery o retiro en tienda                                |
| `FeaturedProducts` | Grilla con los primeros productos del catálogo                                                |
| `ProductCard`      | Tarjeta con imagen/emoji, rating, precio y botón de carrito                                   |
| `ProductModal`     | Ventana centrada con el detalle completo del producto                                         |
| `StarRating`       | Estrellas de rating (llenas, media y vacías)                                                  |
| `Prices`           | Lista de precios filtrada por categoría con badge de tendencia                                |
| `Contact`          | Formulario con validación Yup campo por campo                                                 |
| `CatalogView`      | Catálogo completo con dropdown de categoría, ordenamiento y búsqueda                          |
| `CartDrawer`       | Panel lateral deslizante con resumen del carrito                                              |
| `CheckoutView`     | Flujo de 3 pasos: método de pago → resumen → confirmación                                     |
| `Footer`           | Pie de página con navegación, categorías y datos de contacto                                  |

## Funcionalidades principales

- **Carrito de compras** con contexto global (agregar, quitar, actualizar cantidad, vaciar)
- **Búsqueda** en tiempo real desde el header del catálogo
- **Filtros** por categoría y ordenamiento (precio, rating, nombre)
- **Modal de producto** al hacer clic en cualquier tarjeta (cierra con Escape o clic fuera)
- **Delivery / Retiro**: el Hero guarda la selección en `localStorage` (`delivery_info`) y valida la dirección con Yup en modo delivery
- **Checkout**: selección de pago en efectivo (tarjeta próximamente), resumen del pedido y confirmación
- **Validación de contacto**: errores por campo al salir del input (`onBlur`) con esquema Yup
