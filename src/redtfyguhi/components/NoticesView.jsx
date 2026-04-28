import { useState, useEffect } from "react";
import {
  getNotices,
  createNotice,
  updateNotice,
  deleteNotice,
} from "../services/noticesApi";

// ─── Datos de contexto ──────────────────────────────────────────────────────
// Mapea userId (1–10) a un "editor" del supermercado, dando identidad
// a cada post que viene de JSONPlaceholder.
const AUTORES = {
  1: { name: "María García", role: "Gerencia", emoji: "👩‍💼" },
  2: { name: "Carlos López", role: "Promociones", emoji: "📢" },
  3: { name: "Laura Martínez", role: "Panadería", emoji: "👩‍🍳" },
  4: { name: "Roberto Silva", role: "Frescos", emoji: "🥬" },
  5: { name: "Ana Fernández", role: "Bebidas", emoji: "🍷" },
  6: { name: "Pedro Moreno", role: "Snacks", emoji: "🍿" },
  7: { name: "Sofía Ruiz", role: "Lácteos", emoji: "🧀" },
  8: { name: "Miguel Torres", role: "Granos", emoji: "🌾" },
  9: { name: "Valentina Díaz", role: "Marketing", emoji: "📣" },
  10: { name: "Martín Pérez", role: "Dirección", emoji: "🏪" },
};

// Paleta de colores para los encabezados de las tarjetas (varía por id)
const CARD_ACCENTS = [
  "from-red-400 to-rose-500",
  "from-orange-400 to-amber-500",
  "from-yellow-400 to-lime-500",
  "from-teal-400 to-cyan-500",
  "from-blue-400 to-indigo-500",
  "from-purple-400 to-violet-500",
];

// Emojis temáticos para ilustrar las tarjetas de noticias
const CARD_EMOJIS = ["📰", "🏷️", "🛒", "🎉", "📦", "🥳", "🌟", "🔖", "🎁", "💡"];

/**
 * NoticesView
 * Vista de "Noticias del Super" con CRUD completo sobre la API JSONPlaceholder.
 *
 * Operaciones:
 *   - CREATE : botón "Nueva Noticia" → modal con formulario → POST /posts
 *   - READ   : lista paginada de noticias al montar → GET /posts?_limit=12
 *   - UPDATE : botón ✏️ en cada tarjeta → modal pre-llenado → PUT /posts/:id
 *   - DELETE : botón 🗑️ → confirmación inline → DELETE /posts/:id
 *
 * Nota sobre JSONPlaceholder:
 *   Las escrituras (POST, PUT, DELETE) se simulan del lado del servidor pero
 *   no persisten. Los cambios se reflejan en el estado local (useState) para
 *   que la UI sea coherente con lo que el usuario acaba de hacer.
 */
const NoticesView = () => {
  // ─── Estado principal ──────────────────────────────────────────────────────
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // ─── Estado del modal de creación/edición ─────────────────────────────────
  // modal === null     → modal cerrado
  // modal === "create" → formulario vacío para nueva noticia
  // modal === post     → formulario pre-llenado para editar ese post
  const [modal, setModal] = useState(null);
  const [form, setForm] = useState({ title: "", body: "" });
  const [saving, setSaving] = useState(false);
  const [formError, setFormError] = useState("");

  // ─── Estado de confirmación de eliminación ────────────────────────────────
  const [confirmDeleteId, setConfirmDeleteId] = useState(null);
  const [deleting, setDeleting] = useState(false);

  // ─── READ: carga inicial ───────────────────────────────────────────────────
  // useEffect con array vacío [] → solo se ejecuta al montar el componente.
  useEffect(() => {
    setLoading(true);
    getNotices(12)
      .then((data) => setPosts(data))
      .catch(() =>
        setError("No se pudieron cargar las noticias. Verificá tu conexión.")
      )
      .finally(() => setLoading(false));
  }, []);

  // ─── Helpers del modal ────────────────────────────────────────────────────
  const openCreate = () => {
    setForm({ title: "", body: "" });
    setFormError("");
    setModal("create");
  };

  const openEdit = (post) => {
    setForm({ title: post.title, body: post.body });
    setFormError("");
    setModal(post);
  };

  const closeModal = () => {
    setModal(null);
    setFormError("");
  };

  // ─── CREATE / UPDATE ──────────────────────────────────────────────────────
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!form.title.trim() || !form.body.trim()) {
      setFormError("Título y contenido son obligatorios.");
      return;
    }

    setSaving(true);
    setFormError("");

    try {
      if (modal === "create") {
        // POST /posts — JSONPlaceholder siempre devuelve id: 101 (fake).
        // Usamos Date.now() para generar un id único en el estado local.
        const created = await createNotice({ ...form, userId: 1 });
        setPosts((prev) => [{ ...created, id: Date.now() }, ...prev]);
      } else {
        // PUT /posts/:id
        await updateNotice(modal.id, { ...form, userId: modal.userId });
        // Actualizar solo el post editado en el array local
        setPosts((prev) =>
          prev.map((p) =>
            p.id === modal.id
              ? { ...p, title: form.title, body: form.body }
              : p
          )
        );
      }
      closeModal();
    } catch {
      setFormError("Ocurrió un error al guardar. Intentá de nuevo.");
    } finally {
      setSaving(false);
    }
  };

  // ─── DELETE ───────────────────────────────────────────────────────────────
  const handleDelete = async (id) => {
    setDeleting(true);
    try {
      await deleteNotice(id);
    } catch {
      // JSONPlaceholder puede fallar para ids > 100 (posts creados localmente).
      // De todas formas removemos del estado porque la intención del usuario es clara.
    } finally {
      setPosts((prev) => prev.filter((p) => p.id !== id));
      setConfirmDeleteId(null);
      setDeleting(false);
    }
  };

  // ─── Helpers de presentación ──────────────────────────────────────────────
  const getAccent = (id) => CARD_ACCENTS[id % CARD_ACCENTS.length];
  const getEmoji = (id) => CARD_EMOJIS[id % CARD_EMOJIS.length];
  const getAutor = (userId) =>
    AUTORES[userId] ?? { name: "Redacción", role: "Noticias", emoji: "📰" };

  // ─── Render: pantalla de carga ─────────────────────────────────────────────
  if (loading) {
    return (
      <div className="pt-16 min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center flex flex-col items-center gap-4">
          <div className="w-12 h-12 border-4 border-brand border-t-transparent rounded-full animate-spin" />
          <p className="text-gray-500 font-medium">Cargando noticias…</p>
        </div>
      </div>
    );
  }

  // ─── Render: pantalla de error ─────────────────────────────────────────────
  if (error) {
    return (
      <div className="pt-16 min-h-screen bg-gray-50 flex items-center justify-center p-8">
        <div className="bg-white rounded-2xl p-10 shadow text-center max-w-md flex flex-col items-center gap-4">
          <span className="text-5xl">😵</span>
          <h2 className="text-xl font-bold text-app-dark">Algo salió mal</h2>
          <p className="text-gray-500 text-sm">{error}</p>
          <button
            className="mt-2 px-6 py-2.5 rounded-full bg-brand text-white font-semibold text-sm cursor-pointer hover:bg-brand-dark transition-colors"
            onClick={() => {
              setError(null);
              setLoading(true);
              getNotices(12)
                .then((data) => setPosts(data))
                .catch(() =>
                  setError(
                    "No se pudieron cargar las noticias. Verificá tu conexión."
                  )
                )
                .finally(() => setLoading(false));
            }}
          >
            Reintentar
          </button>
        </div>
      </div>
    );
  }

  // ─── Render principal ──────────────────────────────────────────────────────
  return (
    <div className="pt-16 min-h-screen bg-gray-50">
      {/* ── Encabezado de sección ──────────────────────────────────────────── */}
      <div className="bg-white border-b border-gray-100 shadow-sm">
        <div className="max-w-7xl mx-auto px-6 py-10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl font-extrabold text-app-dark leading-tight">
              📰 Noticias del Super
            </h1>
            <p className="text-gray-500 text-sm mt-1">
              Novedades, promociones y avisos importantes de{" "}
              <span className="font-semibold text-brand">La Economía</span>.
              <span className="ml-2 text-xs text-gray-400">
                (Datos vía JSONPlaceholder API)
              </span>
            </p>
          </div>

          {/* ── Botón CREATE ─────────────────────────────── */}
          <button
            className="flex items-center gap-2 px-5 py-2.5 rounded-full bg-brand text-white font-semibold text-sm cursor-pointer transition-all hover:bg-brand-dark shadow-[0_6px_18px_rgba(230,57,70,0.3)] shrink-0"
            onClick={openCreate}
          >
            <span className="text-lg leading-none">+</span>
            Nueva Noticia
          </button>
        </div>
      </div>

      {/* ── Grid de noticias ──────────────────────────────────────────────── */}
      <div className="max-w-7xl mx-auto px-6 py-10">
        {posts.length === 0 ? (
          <div className="text-center py-20 text-gray-400">
            <span className="text-5xl block mb-4">📭</span>
            <p className="font-medium">No hay noticias todavía.</p>
            <p className="text-sm mt-1">
              ¡Sé el primero en publicar una!
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {posts.map((post) => {
              const autor = getAutor(post.userId);
              const isConfirmingDelete = confirmDeleteId === post.id;

              return (
                <article
                  key={post.id}
                  className="bg-white rounded-2xl shadow-sm hover:shadow-md hover:-translate-y-1 transition-all flex flex-col overflow-hidden"
                >
                  {/* Franja de color + emoji */}
                  <div
                    className={`bg-gradient-to-r ${getAccent(post.id)} h-2`}
                  />

                  <div className="p-5 flex flex-col flex-1 gap-3">
                    {/* Emoji decorativo + badge */}
                    <div className="flex items-center justify-between">
                      <span className="text-3xl">{getEmoji(post.id)}</span>
                      <span className="text-[0.7rem] font-bold text-gray-400 bg-gray-100 px-2.5 py-0.5 rounded-full uppercase tracking-wide">
                        #{post.id}
                      </span>
                    </div>

                    {/* Título */}
                    <h2 className="text-[0.95rem] font-bold text-app-dark leading-snug line-clamp-2 capitalize">
                      {post.title}
                    </h2>

                    {/* Cuerpo truncado */}
                    <p className="text-gray-500 text-[0.82rem] leading-relaxed line-clamp-3 flex-1">
                      {post.body}
                    </p>

                    {/* Autor */}
                    <div className="flex items-center gap-2 text-[0.78rem] text-gray-400 border-t border-gray-100 pt-3">
                      <span>{autor.emoji}</span>
                      <span className="font-medium text-gray-600">
                        {autor.name}
                      </span>
                      <span>·</span>
                      <span>{autor.role}</span>
                    </div>

                    {/* Acciones */}
                    {isConfirmingDelete ? (
                      /* ── Confirmación de eliminación inline ── */
                      <div className="flex flex-col gap-2 bg-red-50 border border-red-200 rounded-xl p-3 mt-1">
                        <p className="text-[0.8rem] font-semibold text-red-700 text-center">
                          ¿Eliminar esta noticia?
                        </p>
                        <div className="flex gap-2">
                          <button
                            className="flex-1 py-1.5 rounded-lg text-[0.8rem] font-semibold bg-gray-100 text-gray-600 cursor-pointer hover:bg-gray-200 transition-colors border-none"
                            onClick={() => setConfirmDeleteId(null)}
                            disabled={deleting}
                          >
                            Cancelar
                          </button>
                          <button
                            className="flex-1 py-1.5 rounded-lg text-[0.8rem] font-semibold bg-brand text-white cursor-pointer hover:bg-brand-dark transition-colors border-none disabled:opacity-60"
                            onClick={() => handleDelete(post.id)}
                            disabled={deleting}
                          >
                            {deleting ? "Eliminando…" : "Sí, eliminar"}
                          </button>
                        </div>
                      </div>
                    ) : (
                      /* ── Botones Editar / Eliminar ── */
                      <div className="flex gap-2 mt-1">
                        <button
                          className="flex-1 flex items-center justify-center gap-1.5 py-1.5 rounded-xl text-[0.8rem] font-semibold text-gray-600 bg-gray-100 border-none cursor-pointer hover:bg-gray-200 transition-colors"
                          onClick={() => openEdit(post)}
                          title="Editar noticia"
                        >
                          ✏️ Editar
                        </button>
                        <button
                          className="flex-1 flex items-center justify-center gap-1.5 py-1.5 rounded-xl text-[0.8rem] font-semibold text-red-600 bg-red-50 border-none cursor-pointer hover:bg-red-100 transition-colors"
                          onClick={() => setConfirmDeleteId(post.id)}
                          title="Eliminar noticia"
                        >
                          🗑️ Eliminar
                        </button>
                      </div>
                    )}
                  </div>
                </article>
              );
            })}
          </div>
        )}
      </div>

      {/* ── Modal de Crear / Editar ──────────────────────────────────────────── */}
      {modal !== null && (
        /* Overlay */
        <div
          className="fixed inset-0 z-[2000] bg-black/50 flex items-center justify-center p-4"
          onClick={(e) => e.target === e.currentTarget && closeModal()}
        >
          <div className="bg-white rounded-3xl shadow-2xl w-full max-w-lg animate-[fadeInPop_0.25s_ease_both]">
            {/* Cabecera del modal */}
            <div className="flex items-center justify-between px-7 pt-7 pb-4 border-b border-gray-100">
              <h2 className="text-xl font-extrabold text-app-dark">
                {modal === "create" ? "📝 Nueva Noticia" : "✏️ Editar Noticia"}
              </h2>
              <button
                className="w-8 h-8 flex items-center justify-center rounded-full bg-gray-100 text-gray-400 border-none cursor-pointer hover:bg-gray-200 hover:text-app-dark transition-colors text-lg"
                onClick={closeModal}
                aria-label="Cerrar"
              >
                ✕
              </button>
            </div>

            {/* Formulario */}
            <form onSubmit={handleSubmit} className="px-7 py-6 flex flex-col gap-5">
              {/* Campo: Título */}
              <div className="flex flex-col gap-1.5">
                <label className="text-[0.85rem] font-semibold text-app-dark">
                  Título <span className="text-brand">*</span>
                </label>
                <input
                  type="text"
                  className="border-[1.5px] border-gray-200 rounded-xl px-4 py-2.5 text-[0.9rem] text-app-dark outline-none transition-all focus:border-brand focus:ring-2 focus:ring-brand/10"
                  placeholder="Ej: Oferta especial en lácteos esta semana"
                  value={form.title}
                  onChange={(e) =>
                    setForm((prev) => ({ ...prev, title: e.target.value }))
                  }
                  maxLength={120}
                  autoFocus
                />
                <span className="text-[0.72rem] text-gray-400 text-right">
                  {form.title.length}/120
                </span>
              </div>

              {/* Campo: Contenido */}
              <div className="flex flex-col gap-1.5">
                <label className="text-[0.85rem] font-semibold text-app-dark">
                  Contenido <span className="text-brand">*</span>
                </label>
                <textarea
                  className="border-[1.5px] border-gray-200 rounded-xl px-4 py-2.5 text-[0.9rem] text-app-dark outline-none transition-all focus:border-brand focus:ring-2 focus:ring-brand/10 resize-none"
                  placeholder="Escribí el cuerpo de la noticia…"
                  rows={5}
                  value={form.body}
                  onChange={(e) =>
                    setForm((prev) => ({ ...prev, body: e.target.value }))
                  }
                  maxLength={500}
                />
                <span className="text-[0.72rem] text-gray-400 text-right">
                  {form.body.length}/500
                </span>
              </div>

              {/* Error de formulario */}
              {formError && (
                <p className="text-[0.82rem] text-brand font-medium bg-brand-light border border-brand/20 rounded-xl px-4 py-2">
                  ⚠️ {formError}
                </p>
              )}

              {/* Botones */}
              <div className="flex gap-3 pt-1">
                <button
                  type="button"
                  className="flex-1 py-2.5 rounded-full border-[1.5px] border-gray-200 text-gray-600 font-semibold text-sm cursor-pointer hover:bg-gray-100 transition-colors"
                  onClick={closeModal}
                  disabled={saving}
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="flex-1 py-2.5 rounded-full bg-brand text-white font-semibold text-sm cursor-pointer hover:bg-brand-dark transition-colors shadow-[0_4px_14px_rgba(230,57,70,0.3)] disabled:opacity-60 disabled:cursor-not-allowed"
                  disabled={saving}
                >
                  {saving
                    ? "Guardando…"
                    : modal === "create"
                      ? "Publicar"
                      : "Guardar cambios"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default NoticesView;
