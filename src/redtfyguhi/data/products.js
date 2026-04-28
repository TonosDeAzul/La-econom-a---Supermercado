/**
 * products.js
 * Catálogo completo del supermercado.
 * Cada producto define: id, nombre, emoji, precio, categoría, rating,
 * reseñas, descripción, tendencia de precio y variación porcentual.
 *
 * Campos:
 *   - trend    : 'up' | 'down' | 'stable' — indica si el precio subió, bajó o se mantuvo
 *   - variation: número entero (0–100) que representa el porcentaje de cambio
 */
const products = [
  // ── GRANOS (10) ──────────────────────────────────────────────────────────
  { id: 1, name: 'Arroz largo fino', emoji: '🌾', price: 2.00, category: 'Granos', rating: 4.5, reviews: 128, description: 'Arroz largo fino, ideal para todo tipo de preparaciones. 1 kg.', trend: 'up', variation: 5 },
  { id: 2, name: 'Fideos spaghetti', emoji: '🍝', price: 1.80, category: 'Granos', rating: 4.1, reviews: 74, description: 'Fideos spaghetti 100% trigo semolado, 500g.', trend: 'down', variation: 3 },
  { id: 3, name: 'Atún al natural', emoji: '🐟', price: 3.20, category: 'Granos', rating: 4.2, reviews: 81, description: 'Atún al natural en lata, 170g.', trend: 'up', variation: 8 },
  { id: 4, name: 'Aceite de girasol', emoji: '🫒', price: 4.00, category: 'Granos', rating: 4.5, reviews: 97, description: 'Aceite de girasol 100% puro, 900ml.', trend: 'up', variation: 12 },
  { id: 5, name: 'Lentejas', emoji: '🫘', price: 2.50, category: 'Granos', rating: 4.3, reviews: 62, description: 'Lentejas verdes secas, 500g. Ricas en proteína vegetal.', trend: 'stable', variation: 0 },
  { id: 6, name: 'Garbanzos', emoji: '🫘', price: 2.80, category: 'Granos', rating: 4.1, reviews: 45, description: 'Garbanzos cocidos en lata, listos para usar, 400g.', trend: 'down', variation: 5 },
  { id: 7, name: 'Harina 0000', emoji: '🌾', price: 1.50, category: 'Granos', rating: 4.4, reviews: 90, description: 'Harina de trigo 0000 fina, ideal para repostería. 1 kg.', trend: 'up', variation: 4 },
  { id: 8, name: 'Polenta instantánea', emoji: '🌽', price: 1.20, category: 'Granos', rating: 3.9, reviews: 38, description: 'Polenta de cocción rápida, lista en 5 minutos. 500g.', trend: 'stable', variation: 0 },
  { id: 9, name: 'Sal fina', emoji: '🧂', price: 0.80, category: 'Granos', rating: 4.6, reviews: 210, description: 'Sal fina de mesa yodada, 500g.', trend: 'down', variation: 2 },
  { id: 10, name: 'Azúcar blanca', emoji: '🍬', price: 1.80, category: 'Granos', rating: 4.5, reviews: 165, description: 'Azúcar blanca refinada, 1 kg.', trend: 'up', variation: 7 },

  // ── LÁCTEOS (10) ─────────────────────────────────────────────────────────
  { id: 11, name: 'Leche entera', emoji: '🥛', price: 1.00, category: 'Lácteos', rating: 4.8, reviews: 256, description: 'Leche entera pasteurizada, 1 litro.', trend: 'up', variation: 6 },
  { id: 12, name: 'Yogur natural', emoji: '🍦', price: 2.20, category: 'Lácteos', rating: 4.4, reviews: 112, description: 'Yogur natural cremoso sin azúcar, 500g.', trend: 'stable', variation: 0 },
  { id: 13, name: 'Manteca', emoji: '🧈', price: 3.50, category: 'Lácteos', rating: 4.0, reviews: 62, description: 'Manteca sin sal en barra, 200g.', trend: 'up', variation: 10 },
  { id: 14, name: 'Queso cremoso', emoji: '🧀', price: 4.50, category: 'Lácteos', rating: 4.6, reviews: 134, description: 'Queso crema untable, suave y cremoso. 200g.', trend: 'up', variation: 8 },
  { id: 15, name: 'Queso fresco', emoji: '🧀', price: 5.00, category: 'Lácteos', rating: 4.7, reviews: 98, description: 'Queso fresco artesanal, 350g.', trend: 'down', variation: 4 },
  { id: 16, name: 'Crema de leche', emoji: '🥛', price: 2.80, category: 'Lácteos', rating: 4.3, reviews: 77, description: 'Crema de leche entera, 200ml. Para cocinar o batir.', trend: 'stable', variation: 0 },
  { id: 17, name: 'Dulce de leche', emoji: '🍯', price: 3.20, category: 'Lácteos', rating: 4.9, reviews: 302, description: 'Dulce de leche repostero, 400g.', trend: 'up', variation: 5 },
  { id: 18, name: 'Leche descremada', emoji: '🥛', price: 1.20, category: 'Lácteos', rating: 4.2, reviews: 88, description: 'Leche descremada 0% grasa, 1 litro.', trend: 'up', variation: 6 },
  { id: 19, name: 'Yogur frutado', emoji: '🍓', price: 2.50, category: 'Lácteos', rating: 4.5, reviews: 143, description: 'Yogur frutado de frutilla, 200g.', trend: 'down', variation: 3 },
  { id: 20, name: 'Queso rallado', emoji: '🧀', price: 4.00, category: 'Lácteos', rating: 4.4, reviews: 67, description: 'Queso rallado tipo parmesano, 100g.', trend: 'stable', variation: 0 },

  // ── PANADERÍA (10) ───────────────────────────────────────────────────────
  { id: 21, name: 'Pan lactal', emoji: '🍞', price: 1.50, category: 'Panadería', rating: 4.3, reviews: 98, description: 'Pan lactal blanco, suave y esponjoso. Paquete 500g.', trend: 'up', variation: 4 },
  { id: 22, name: 'Medialunas', emoji: '🥐', price: 2.00, category: 'Panadería', rating: 4.6, reviews: 203, description: 'Medialunas de manteca, pack x6.', trend: 'stable', variation: 0 },
  { id: 23, name: 'Facturas surtidas', emoji: '🥐', price: 2.50, category: 'Panadería', rating: 4.7, reviews: 176, description: 'Facturas variadas de panadería, pack x6.', trend: 'down', variation: 5 },
  { id: 24, name: 'Galletas de agua', emoji: '🍪', price: 1.80, category: 'Panadería', rating: 4.1, reviews: 54, description: 'Galletas de agua livianas, pack 200g.', trend: 'stable', variation: 0 },
  { id: 25, name: 'Tostadas integrales', emoji: '🍞', price: 2.00, category: 'Panadería', rating: 4.2, reviews: 71, description: 'Tostadas de pan integral, caja 300g.', trend: 'up', variation: 3 },
  { id: 26, name: 'Pan integral', emoji: '🫓', price: 2.20, category: 'Panadería', rating: 4.4, reviews: 89, description: 'Pan de molde integral con semillas, 400g.', trend: 'down', variation: 2 },
  { id: 27, name: 'Bizcochos', emoji: '🥖', price: 1.50, category: 'Panadería', rating: 4.0, reviews: 43, description: 'Bizcochos de grasa artesanales, pack x8.', trend: 'stable', variation: 0 },
  { id: 28, name: 'Budín de naranja', emoji: '🍰', price: 3.00, category: 'Panadería', rating: 4.5, reviews: 115, description: 'Budín esponjoso con chips de naranja, 300g.', trend: 'up', variation: 6 },
  { id: 29, name: 'Alfajores x3', emoji: '🍫', price: 2.80, category: 'Panadería', rating: 4.8, reviews: 248, description: 'Alfajores rellenos de dulce de leche bañados en chocolate, pack x3.', trend: 'up', variation: 9 },
  { id: 30, name: 'Vainillas', emoji: '🍪', price: 1.60, category: 'Panadería', rating: 3.9, reviews: 36, description: 'Vainillas esponjosas, ideales para tiramisú, pack 200g.', trend: 'down', variation: 4 },

  // ── FRESCOS (12) ─────────────────────────────────────────────────────────
  { id: 31, name: 'Huevos x12', emoji: '🥚', price: 3.00, category: 'Frescos', rating: 4.7, reviews: 184, description: 'Docena de huevos frescos de campo.', trend: 'up', variation: 15 },
  { id: 32, name: 'Manzanas rojas', emoji: '🍎', price: 2.50, category: 'Frescos', rating: 4.4, reviews: 89, description: 'Manzanas rojas crujientes, kg.', trend: 'down', variation: 8 },
  { id: 33, name: 'Bananas', emoji: '🍌', price: 1.20, category: 'Frescos', rating: 4.5, reviews: 145, description: 'Bananas frescas maduras, kg.', trend: 'stable', variation: 0 },
  { id: 34, name: 'Tomates', emoji: '🍅', price: 2.00, category: 'Frescos', rating: 4.3, reviews: 78, description: 'Tomates redondos maduros, kg.', trend: 'up', variation: 10 },
  { id: 35, name: 'Papas', emoji: '🥔', price: 1.50, category: 'Frescos', rating: 4.4, reviews: 109, description: 'Papas blancas limpias, kg.', trend: 'down', variation: 5 },
  { id: 36, name: 'Zanahorias', emoji: '🥕', price: 1.20, category: 'Frescos', rating: 4.3, reviews: 66, description: 'Zanahorias frescas, bolsa 1 kg.', trend: 'stable', variation: 0 },
  { id: 37, name: 'Cebollas', emoji: '🧅', price: 1.00, category: 'Frescos', rating: 4.2, reviews: 55, description: 'Cebollas blancas frescas, kg.', trend: 'down', variation: 10 },
  { id: 38, name: 'Lechuga', emoji: '🥬', price: 1.80, category: 'Frescos', rating: 4.1, reviews: 48, description: 'Lechuga criolla fresca, unidad.', trend: 'up', variation: 6 },
  { id: 39, name: 'Naranjas', emoji: '🍊', price: 2.20, category: 'Frescos', rating: 4.6, reviews: 132, description: 'Naranjas jugosas de temporada, kg.', trend: 'down', variation: 4 },
  { id: 40, name: 'Peras', emoji: '🍐', price: 2.80, category: 'Frescos', rating: 4.3, reviews: 57, description: 'Peras William maduras, kg.', trend: 'stable', variation: 0 },
  { id: 41, name: 'Uvas', emoji: '🍇', price: 3.50, category: 'Frescos', rating: 4.5, reviews: 83, description: 'Uvas sin semilla, kg.', trend: 'up', variation: 7 },
  { id: 42, name: 'Limones', emoji: '🍋', price: 1.00, category: 'Frescos', rating: 4.4, reviews: 74, description: 'Limones frescos, bolsa x6.', trend: 'up', variation: 12 },

  // ── SNACKS (10) ──────────────────────────────────────────────────────────
  { id: 43, name: 'Papas fritas original', emoji: '🥔', price: 2.80, category: 'Snacks', rating: 3.9, reviews: 77, description: 'Papas fritas crocantes sabor original, 150g.', trend: 'up', variation: 5 },
  { id: 44, name: 'Palitos salados', emoji: '🥨', price: 1.80, category: 'Snacks', rating: 4.0, reviews: 53, description: 'Palitos salados de maíz, 100g.', trend: 'stable', variation: 0 },
  { id: 45, name: 'Maní con sal', emoji: '🥜', price: 2.00, category: 'Snacks', rating: 4.2, reviews: 68, description: 'Maníes tostados con sal, 200g.', trend: 'down', variation: 3 },
  { id: 46, name: 'Chocolate con leche', emoji: '🍫', price: 2.50, category: 'Snacks', rating: 4.7, reviews: 195, description: 'Tableta de chocolate con leche, 100g.', trend: 'up', variation: 8 },
  { id: 47, name: 'Gomitas frutales', emoji: '🍬', price: 1.50, category: 'Snacks', rating: 3.8, reviews: 42, description: 'Gomitas masticables sabores frutales surtidos, 100g.', trend: 'stable', variation: 0 },
  { id: 48, name: 'Chizitos', emoji: '🌽', price: 1.80, category: 'Snacks', rating: 4.1, reviews: 88, description: 'Chizitos crocantes sabor queso, 100g.', trend: 'up', variation: 4 },
  { id: 49, name: 'Nachos con queso', emoji: '🧀', price: 2.20, category: 'Snacks', rating: 4.3, reviews: 61, description: 'Nachos de maíz sabor queso, 150g.', trend: 'down', variation: 5 },
  { id: 50, name: 'Turrón de maní', emoji: '🍯', price: 3.00, category: 'Snacks', rating: 4.4, reviews: 49, description: 'Turrón artesanal de maní con miel, 200g.', trend: 'stable', variation: 0 },
  { id: 51, name: 'Pizza chips', emoji: '🍕', price: 2.50, category: 'Snacks', rating: 4.0, reviews: 35, description: 'Chips sabor pizza, crocantes y sabrosos, 100g.', trend: 'up', variation: 6 },
  { id: 52, name: 'Mix de nueces', emoji: '🌰', price: 4.50, category: 'Snacks', rating: 4.6, reviews: 72, description: 'Mix premium de nueces, castañas y almendras, 200g.', trend: 'down', variation: 7 },

  // ── BEBIDAS (12) ─────────────────────────────────────────────────────────
  { id: 53, name: 'Gaseosa cola', emoji: '🥤', price: 1.50, category: 'Bebidas', rating: 4.2, reviews: 190, description: 'Gaseosa cola, botella 2 litros.', trend: 'up', variation: 5 },
  { id: 54, name: 'Agua mineral', emoji: '💧', price: 0.80, category: 'Bebidas', rating: 4.7, reviews: 310, description: 'Agua mineral sin gas, 1.5 litros.', trend: 'stable', variation: 0 },
  { id: 55, name: 'Jugo de naranja', emoji: '🍊', price: 2.00, category: 'Bebidas', rating: 4.3, reviews: 95, description: 'Jugo exprimido de naranja, 1 litro.', trend: 'down', variation: 3 },
  { id: 56, name: 'Cerveza lager', emoji: '🍺', price: 2.50, category: 'Bebidas', rating: 4.4, reviews: 162, description: 'Cerveza lager rubia, botella 1 litro.', trend: 'up', variation: 7 },
  { id: 57, name: 'Cerveza sin alcohol', emoji: '🍺', price: 2.80, category: 'Bebidas', rating: 3.8, reviews: 44, description: 'Cerveza sin alcohol, lata 473ml.', trend: 'stable', variation: 0 },
  { id: 58, name: 'Vino tinto malbec', emoji: '🍷', price: 8.00, category: 'Bebidas', rating: 4.6, reviews: 118, description: 'Vino tinto Malbec varietal, botella 750ml.', trend: 'up', variation: 10 },
  { id: 59, name: 'Jugo de manzana', emoji: '🍎', price: 2.20, category: 'Bebidas', rating: 4.3, reviews: 79, description: 'Jugo de manzana sin azúcar, 1 litro.', trend: 'down', variation: 4 },
  { id: 60, name: 'Energizante', emoji: '⚡', price: 3.00, category: 'Bebidas', rating: 4.0, reviews: 96, description: 'Bebida energizante con taurina y vitaminas, 500ml.', trend: 'up', variation: 5 },
  { id: 61, name: 'Té helado limón', emoji: '🍵', price: 1.80, category: 'Bebidas', rating: 4.1, reviews: 68, description: 'Té helado sabor limón, 1.5 litros.', trend: 'stable', variation: 0 },
  { id: 62, name: 'Café soluble', emoji: '☕', price: 4.50, category: 'Bebidas', rating: 4.5, reviews: 145, description: 'Café soluble instantáneo, frasco 200g.', trend: 'up', variation: 8 },
  { id: 63, name: 'Limonada', emoji: '🍋', price: 2.00, category: 'Bebidas', rating: 4.2, reviews: 57, description: 'Limonada artesanal con pulpa, 1 litro.', trend: 'down', variation: 6 },
  { id: 64, name: 'Agua saborizada', emoji: '💧', price: 1.20, category: 'Bebidas', rating: 4.0, reviews: 84, description: 'Agua mineral saborizada manzana-pera sin azúcar, 1.5L.', trend: 'stable', variation: 0 },

  // ── LIMPIEZA (10) ────────────────────────────────────────────────────────
  { id: 65, name: 'Detergente limón', emoji: '🧴', price: 2.50, category: 'Limpieza', rating: 4.1, reviews: 44, description: 'Detergente lavavajillas limón desengrasante, 750ml.', trend: 'up', variation: 4 },
  { id: 66, name: 'Lavandina', emoji: '🫧', price: 1.00, category: 'Limpieza', rating: 4.0, reviews: 38, description: 'Lavandina concentrada aroma pino, 1 litro.', trend: 'stable', variation: 0 },
  { id: 67, name: 'Jabón en polvo', emoji: '🧺', price: 5.00, category: 'Limpieza', rating: 4.3, reviews: 72, description: 'Jabón en polvo con suavizante, 3 kg.', trend: 'up', variation: 6 },
  { id: 68, name: 'Suavizante floral', emoji: '🌸', price: 3.50, category: 'Limpieza', rating: 4.4, reviews: 58, description: 'Suavizante ropa aroma floral, 1 litro.', trend: 'down', variation: 3 },
  { id: 69, name: 'Limpia muebles', emoji: '🧹', price: 3.00, category: 'Limpieza', rating: 3.9, reviews: 29, description: 'Limpia muebles con cera protectora, 500ml.', trend: 'stable', variation: 0 },
  { id: 70, name: 'Desinfectante piso', emoji: '🫧', price: 2.80, category: 'Limpieza', rating: 4.2, reviews: 47, description: 'Desinfectante para pisos fragancia lavanda, 1 litro.', trend: 'up', variation: 5 },
  { id: 71, name: 'Esponjas x3', emoji: '🧽', price: 1.50, category: 'Limpieza', rating: 4.1, reviews: 61, description: 'Esponjas doble función abrasiva, pack x3.', trend: 'down', variation: 4 },
  { id: 72, name: 'Trapos rejilla x2', emoji: '🧻', price: 1.80, category: 'Limpieza', rating: 3.8, reviews: 24, description: 'Trapos de piso tejido rejilla, pack x2.', trend: 'stable', variation: 0 },
  { id: 73, name: 'Bolsas de basura', emoji: '🗑️', price: 2.00, category: 'Limpieza', rating: 4.2, reviews: 55, description: 'Bolsas de basura reforzadas 50L, paquete x20.', trend: 'up', variation: 3 },
  { id: 74, name: 'Limpiavidrios', emoji: '🪟', price: 2.50, category: 'Limpieza', rating: 4.3, reviews: 36, description: 'Limpiavidrios en spray sin rayas, 500ml.', trend: 'down', variation: 5 },

  // ── CARNES (8) ───────────────────────────────────────────────────────────
  { id: 75, name: 'Pollo entero', emoji: '🍗', price: 5.00, category: 'Carnes', rating: 4.6, reviews: 133, description: 'Pollo entero fresco, aprox 1.8 kg.', trend: 'up', variation: 12 },
  { id: 76, name: 'Carne molida', emoji: '🥩', price: 6.50, category: 'Carnes', rating: 4.4, reviews: 108, description: 'Carne vacuna molida especial magra, 500g.', trend: 'up', variation: 15 },
  { id: 77, name: 'Milanesas de res', emoji: '🥩', price: 7.00, category: 'Carnes', rating: 4.5, reviews: 92, description: 'Milanesas de nalga listas para rebozar, 500g.', trend: 'down', variation: 5 },
  { id: 78, name: 'Bife de chorizo', emoji: '🥩', price: 9.50, category: 'Carnes', rating: 4.8, reviews: 74, description: 'Bife de chorizo premium, corte selecto, 500g.', trend: 'up', variation: 18 },
  { id: 79, name: 'Jamón cocido', emoji: '🥓', price: 5.50, category: 'Carnes', rating: 4.3, reviews: 81, description: 'Jamón cocido de primera calidad, 200g feteado.', trend: 'stable', variation: 0 },
  { id: 80, name: 'Salame', emoji: '🌭', price: 4.80, category: 'Carnes', rating: 4.2, reviews: 56, description: 'Salame de campo artesanal, 200g.', trend: 'up', variation: 8 },
  { id: 81, name: 'Medallones de soja', emoji: '🫘', price: 3.50, category: 'Carnes', rating: 3.7, reviews: 33, description: 'Medallones vegetales de soja y verduras, pack x6.', trend: 'down', variation: 6 },
  { id: 82, name: 'Panceta ahumada', emoji: '🥓', price: 5.00, category: 'Carnes', rating: 4.4, reviews: 68, description: 'Panceta ahumada feteada lista para cocinar, 200g.', trend: 'up', variation: 10 },

  // ── CONGELADOS (8) ───────────────────────────────────────────────────────
  { id: 83, name: 'Helado vainilla 1L', emoji: '🍦', price: 6.00, category: 'Congelados', rating: 4.7, reviews: 148, description: 'Helado cremoso de vainilla, pote 1 litro.', trend: 'stable', variation: 0 },
  { id: 84, name: 'Pizza congelada', emoji: '🍕', price: 7.50, category: 'Congelados', rating: 4.3, reviews: 97, description: 'Pizza mozzarella congelada lista para hornear, 450g.', trend: 'up', variation: 5 },
  { id: 85, name: 'Papas bastón', emoji: '🍟', price: 4.00, category: 'Congelados', rating: 4.2, reviews: 83, description: 'Papas bastón prefritas congeladas, 800g.', trend: 'down', variation: 4 },
  { id: 86, name: 'Empanadas x12', emoji: '🥟', price: 8.00, category: 'Congelados', rating: 4.6, reviews: 122, description: 'Empanadas de carne congeladas listas para hornear, pack x12.', trend: 'up', variation: 8 },
  { id: 87, name: 'Vegetales mixtos', emoji: '🥦', price: 3.50, category: 'Congelados', rating: 4.1, reviews: 47, description: 'Mix de vegetales congelados (choclo, arvejas, zanahoria), 500g.', trend: 'stable', variation: 0 },
  { id: 88, name: 'Medallones x6', emoji: '🍔', price: 5.50, category: 'Congelados', rating: 4.0, reviews: 60, description: 'Medallones de carne vacuna precocidos, pack x6.', trend: 'up', variation: 6 },
  { id: 89, name: 'Sorrentinos', emoji: '🍝', price: 7.00, category: 'Congelados', rating: 4.5, reviews: 88, description: 'Sorrentinos rellenos de ricotta y espinaca, 500g.', trend: 'down', variation: 3 },
  { id: 90, name: 'Helado chocolate 1L', emoji: '🍫', price: 6.50, category: 'Congelados', rating: 4.8, reviews: 162, description: 'Helado de chocolate con chispas, pote 1 litro.', trend: 'stable', variation: 0 },

  // ── HIGIENE (10) ─────────────────────────────────────────────────────────
  { id: 91, name: 'Jabón de manos', emoji: '🧼', price: 2.00, category: 'Higiene', rating: 4.3, reviews: 76, description: 'Jabón líquido antibacterial aroma menta, 500ml.', trend: 'up', variation: 4 },
  { id: 92, name: 'Shampoo', emoji: '🧴', price: 5.50, category: 'Higiene', rating: 4.5, reviews: 118, description: 'Shampoo hidratante para todo tipo de cabello, 400ml.', trend: 'down', variation: 5 },
  { id: 93, name: 'Acondicionador', emoji: '🧴', price: 5.00, category: 'Higiene', rating: 4.4, reviews: 89, description: 'Acondicionador nutritivo con keratina, 400ml.', trend: 'stable', variation: 0 },
  { id: 94, name: 'Pasta dental', emoji: '🦷', price: 3.50, category: 'Higiene', rating: 4.6, reviews: 134, description: 'Pasta dental blanqueadora con flúor, 90g.', trend: 'up', variation: 7 },
  { id: 95, name: 'Cepillo de dientes', emoji: '🪥', price: 2.80, category: 'Higiene', rating: 4.3, reviews: 72, description: 'Cepillo dental de cerdas suaves, cabezal compacto.', trend: 'down', variation: 3 },
  { id: 96, name: 'Desodorante', emoji: '🧴', price: 4.00, category: 'Higiene', rating: 4.4, reviews: 105, description: 'Desodorante antitranspirante 48hs, aerosol 150ml.', trend: 'up', variation: 5 },
  { id: 97, name: 'Papel higiénico x4', emoji: '🧻', price: 4.50, category: 'Higiene', rating: 4.7, reviews: 198, description: 'Papel higiénico doble hoja, pack x4 rollos.', trend: 'up', variation: 9 },
  { id: 98, name: 'Toallitas húmedas', emoji: '🫧', price: 3.20, category: 'Higiene', rating: 4.2, reviews: 63, description: 'Toallitas húmedas con aloe vera, pack x80.', trend: 'stable', variation: 0 },
  { id: 99, name: 'Algodón', emoji: '☁️', price: 2.50, category: 'Higiene', rating: 4.1, reviews: 44, description: 'Algodón hidrófilo purísimo, bolsa 100g.', trend: 'down', variation: 4 },
  { id: 100, name: 'Crema hidratante', emoji: '🧴', price: 6.00, category: 'Higiene', rating: 4.5, reviews: 91, description: 'Crema corporal hidratante con vitamina E, 400ml.', trend: 'up', variation: 6 },
];

export default products;