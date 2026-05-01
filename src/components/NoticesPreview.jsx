import { useState, useEffect } from "react";
import { getNotices } from "../services/noticesApi";

/* Cantidad de noticias a mostrar en el preview del inicio */
const PREVIEW_COUNT = 3;

/* Paleta de acentos para las franjas de color superiores de cada tarjeta */
const CARD_ACCENTS = [
  "from-red-400 to-rose-500",
  "from-orange-400 to-amber-500",
  "from-teal-400 to-cyan-500",
];

/* Emojis decorativos por posición */
const CARD_EMOJIS = ["📰", "🏷️", "🎉"];

/**
 * NoticesPreview
 * Sección de la página de inicio que muestra las últimas noticias del super.
 * Es de solo lectura: no tiene botones de editar ni eliminar.
 *
 * Props:
 *   - onVerTodas : navega a la vista completa de noticias
 */
const NoticesPreview = ({ onVerTodas }) => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getNotices(PREVIEW_COUNT)
      .then((data) => setPosts(data))
      .catch(() => setPosts([]))
      .finally(() => setLoading(false));
  }, []);

  return (
    <section className="py-20 px-8 bg-gray-100" id="noticias">
      <div className="max-w-7xl mx-auto">

        {/* Encabezado */}
        <div className="text-center mb-12">
          <span className="inline-block bg-brand-light text-brand text-[0.75rem] font-bold uppercase tracking-[0.1em] px-3.5 py-1 rounded-full mb-3">
            Novedades
          </span>
          <h2 className="text-[clamp(1.8rem,3vw,2.5rem)] font-extrabold text-app-dark mb-3">
            Noticias del Super
          </h2>
          <p className="text-gray-500 max-w-[500px] mx-auto">
            Enterate de las últimas promociones, novedades y avisos importantes
            de La Economía.
          </p>
        </div>

        {/* Contenido */}
        {loading ? (
          <div className="flex justify-center py-12">
            <div className="w-10 h-10 border-4 border-brand border-t-transparent rounded-full animate-spin" />
          </div>
        ) : posts.length === 0 ? (
          <p className="text-center text-gray-400 py-12">
            No hay noticias disponibles por el momento.
          </p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {posts.map((post, idx) => (
              <article
                key={post.id}
                className="bg-white rounded-2xl shadow-sm hover:shadow-md hover:-translate-y-1 transition-all flex flex-col overflow-hidden border border-gray-100"
              >
                {/* Franja de color superior */}
                <div className={`bg-gradient-to-r ${CARD_ACCENTS[idx % CARD_ACCENTS.length]} h-2`} />

                <div className="p-5 flex flex-col gap-3 flex-1">
                  {/* Emoji + badge */}
                  <div className="flex items-center justify-between">
                    <span className="text-3xl">{CARD_EMOJIS[idx % CARD_EMOJIS.length]}</span>
                    <span className="text-[0.7rem] font-bold text-gray-400 bg-gray-100 px-2.5 py-0.5 rounded-full uppercase tracking-wide">
                      #{post.id}
                    </span>
                  </div>

                  {/* Título */}
                  <h3 className="text-[0.95rem] font-bold text-app-dark leading-snug line-clamp-2 capitalize">
                    {post.title}
                  </h3>

                  {/* Cuerpo truncado */}
                  <p className="text-gray-500 text-[0.82rem] leading-relaxed line-clamp-3 flex-1">
                    {post.body}
                  </p>
                </div>
              </article>
            ))}
          </div>
        )}

        {/* Pie de sección con botón a la vista completa */}
        <div className="text-center mt-10">
          <button
            className="inline-flex items-center gap-2 px-7 py-3 rounded-full bg-brand text-white border-2 border-brand font-semibold text-[0.95rem] cursor-pointer transition-all hover:bg-brand-dark hover:border-brand-dark hover:-translate-y-0.5 shadow-[0_8px_24px_rgba(230,57,70,0.3)]"
            onClick={onVerTodas}
          >
            Ver todas las noticias →
          </button>
        </div>

      </div>
    </section>
  );
};

export default NoticesPreview;
