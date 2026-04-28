/**
 * Footer
 * Pie de página con logo, navegación, categorías, contacto y copyright.
 * El año se calcula dinámicamente para no requerir actualizaciones manuales.
 */
const Footer = () => {
  /* Año actual para el texto de copyright */
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-[#1a1a2e] text-white/65 pt-16 px-8 pb-6">
      <div className="max-w-7xl mx-auto">
        {/* Grilla principal del footer */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-[2fr_1fr_1fr_1.5fr] gap-12 mb-12">
          {/* Columna de marca */}
          <div>
            <div className="flex items-center gap-3 mb-4">
              <div className="w-11 h-11 bg-brand rounded-lg flex items-center justify-content-center text-2xl text-white shadow-[0_8px_24px_rgba(230,57,70,0.3)] flex items-center justify-center">
                🛒
              </div>
              <div className="flex flex-col leading-tight">
                <span className="text-[1.1rem] font-extrabold text-white">
                  La Economía
                </span>
                <span className="text-[0.7rem] font-medium text-white/60 uppercase tracking-[0.05em]">
                  Supermercado
                </span>
              </div>
            </div>
            <p className="text-sm leading-[1.75] text-white/55 mb-6">
              Tu supermercado de confianza con los mejores productos frescos y
              precios justos para toda la familia.
            </p>
          </div>

          {/* Columna navegación */}
          <div>
            <h4 className="text-[0.82rem] font-bold text-white uppercase tracking-[0.08em] mb-5">
              Navegación
            </h4>
            <ul className="flex flex-col gap-2.5">
              {[
                ["#inicio", "Inicio"],
                ["#productos", "Productos"],
                ["#precios", "Precios"],
                ["#contacto", "Contacto"],
              ].map(([href, label]) => (
                <li key={href}>
                  <a
                    href={href}
                    className="text-[0.9rem] text-white/55 transition-colors hover:text-brand"
                  >
                    {label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Columna categorías */}
          <div>
            <h4 className="text-[0.82rem] font-bold text-white uppercase tracking-[0.08em] mb-5">
              Categorías
            </h4>
            <ul className="flex flex-col gap-2.5">
              {["Frescos", "Lácteos", "Panadería", "Granos"].map((cat) => (
                <li key={cat}>
                  <a
                    href="#productos"
                    className="text-[0.9rem] text-white/55 transition-colors hover:text-brand"
                  >
                    {cat}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Columna contacto */}
          <div>
            <h4 className="text-[0.82rem] font-bold text-white uppercase tracking-[0.08em] mb-5">
              Contacto
            </h4>
            <ul className="flex flex-col gap-2.5">
              {[
                ["📍 C. 56A #3-00, Este, Bogotá"],
                ["📞 018000180779 - 3134771607"],
                ["✉️ archivo@poligran.edu.co"],
                ["🕐 Lun–Vie: 8:00 – 18:00 hs, Sáb: 9:00 – 12:00 hs"],
              ].map(([text], i) => (
                <li key={i}>
                  <a
                    href="#contacto"
                    className="text-[0.9rem] text-white/55 transition-colors hover:text-brand"
                  >
                    {text}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Barra inferior de copyright */}
        <div className="border-t border-white/10 pt-6 flex flex-col sm:flex-row justify-between items-center gap-4 text-[0.85rem]">
          <span>
            © {currentYear} Supermercado La Economía. Todos los derechos
            reservados.
          </span>
          <div className="flex gap-6">
            <a
              href="#"
              className="text-white/40 transition-colors hover:text-brand"
            >
              Privacidad
            </a>
            <a
              href="#"
              className="text-white/40 transition-colors hover:text-brand"
            >
              Términos
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
