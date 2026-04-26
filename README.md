# Supermercado La Economia - React App

Proyecto web del **Supermercado La Economia** migrado a **React + Vite**.
Incluye una galeria de productos, tabla de precios y formulario de contacto.

## Tecnologias usadas

- [React 19](https://react.dev/) - Libreria para construir interfaces
- [Vite](https://vite.dev/) - Bundler y servidor de desarrollo rapido
- CSS plano (estilos globales en `src/index.css`)

## Estructura del proyecto

```
supermercado-react/
├── public/
│   └── images/              # Imagenes de los productos
├── src/
│   ├── components/
│   │   ├── Header.jsx       # Encabezado y navegacion
│   │   ├── Productos.jsx    # Seccion con la galeria de productos
│   │   ├── ProductoItem.jsx # Tarjeta individual de producto
│   │   ├── Precios.jsx      # Tabla de precios
│   │   └── Contacto.jsx     # Formulario de contacto controlado
│   ├── data/
│   │   └── productos.js     # Datos centralizados de los productos
│   ├── App.jsx              # Componente raiz
│   ├── main.jsx             # Punto de entrada de React
│   └── index.css            # Estilos globales
├── index.html
└── vite.config.js
```

## Requisitos previos

Asegurate de tener instalado:

- [Node.js](https://nodejs.org/) version 18 o superior
- npm (incluido con Node.js)

Para verificar tus versiones ejecuta:

```bash
node --version
npm --version
```

## Instalacion

1. Clona o descarga el repositorio y entra a la carpeta del proyecto:

```bash
cd supermercado-react
```

2. Instala las dependencias:

```bash
npm install
```

## Ejecucion en desarrollo

Inicia el servidor con recarga automatica (HMR):

```bash
npm run dev
```

Abre tu navegador en **http://localhost:5173**

## Construccion para produccion

Genera archivos optimizados en la carpeta `dist/`:

```bash
npm run build
```

Para previsualizar el build localmente:

```bash
npm run preview
```

## Agregar o modificar productos

Todos los productos estan en `src/data/productos.js`. Para agregar uno nuevo:

```js
{
  id: 5,
  nombre: 'Aceite',
  imagen: 'aceite.jpg',   // Coloca el archivo en public/images/
  precio: 2.50,
}
```

## Componentes

| Componente       | Descripcion                                         |
|-----------------|-----------------------------------------------------|
| `Header`        | Titulo del supermercado y enlaces de navegacion     |
| `Productos`     | Grid con todas las tarjetas de producto             |
| `ProductoItem`  | Tarjeta individual (imagen + nombre)                |
| `Precios`       | Tabla con nombre y precio de cada producto          |
| `Contacto`      | Formulario controlado con nombre y correo           |

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.
