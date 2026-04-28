/**
 * noticesApi.js
 * Capa de servicio para el recurso /posts de JSONPlaceholder.
 * Mapea "posts" al concepto de "Noticias del Super" dentro de la app.
 *
 * JSONPlaceholder es una API REST pública de solo testing:
 *   - Los GET devuelven datos reales.
 *   - POST / PUT / DELETE responden con éxito pero NO persisten cambios en el servidor.
 *     La persistencia se maneja localmente con useState en el componente.
 *
 * Referencia: https://jsonplaceholder.typicode.com/
 */

const BASE_URL = "https://jsonplaceholder.typicode.com/posts";

/**
 * Obtiene una lista de noticias.
 * @param {number} limit - Cantidad máxima de resultados (default 12).
 * @returns {Promise<Array>}
 */
export const getNotices = (limit = 12) =>
  fetch(`${BASE_URL}?_limit=${limit}`)
    .then((res) => {
      if (!res.ok) throw new Error(`Error ${res.status}`);
      return res.json();
    });

/**
 * Crea una nueva noticia (POST).
 * JSONPlaceholder devuelve el objeto con id: 101 (fake); el componente
 * le asigna un id único real antes de guardarlo en el estado local.
 * @param {{ title: string, body: string, userId: number }} data
 * @returns {Promise<Object>}
 */
export const createNotice = (data) =>
  fetch(BASE_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json; charset=UTF-8" },
    body: JSON.stringify(data),
  }).then((res) => {
    if (!res.ok) throw new Error(`Error ${res.status}`);
    return res.json();
  });

/**
 * Actualiza una noticia existente (PUT).
 * @param {number} id - Id del post a actualizar.
 * @param {{ title: string, body: string, userId: number }} data
 * @returns {Promise<Object>}
 */
export const updateNotice = (id, data) =>
  fetch(`${BASE_URL}/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json; charset=UTF-8" },
    body: JSON.stringify({ ...data, id }),
  }).then((res) => {
    if (!res.ok) throw new Error(`Error ${res.status}`);
    return res.json();
  });

/**
 * Elimina una noticia (DELETE).
 * @param {number} id - Id del post a eliminar.
 * @returns {Promise<Object>}
 */
export const deleteNotice = (id) =>
  fetch(`${BASE_URL}/${id}`, { method: "DELETE" }).then((res) => {
    if (!res.ok) throw new Error(`Error ${res.status}`);
    return res.json();
  });
