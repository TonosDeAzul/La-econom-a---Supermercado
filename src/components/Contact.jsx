import { useState } from "react";
import * as yup from "yup";

/* Esquema de validación Yup para los tres campos del formulario */
const schema = yup.object({
  name: yup
    .string()
    .required("El nombre es requerido")
    .min(3, "Mínimo 3 caracteres"),
  email: yup
    .string()
    .required("El correo es requerido")
    .email("Ingresá un correo válido"),
  message: yup
    .string()
    .required("El mensaje es requerido")
    .min(10, "Mínimo 10 caracteres")
    .max(500, "Máximo 500 caracteres"),
});

const EMPTY_FORM = { name: "", email: "", message: "" };
const EMPTY_ERRORS = { name: "", email: "", message: "" };
const EMPTY_TOUCHED = { name: false, email: false, message: false };

/**
 * Contact
 * Sección de contacto con información del local y formulario de mensaje.
 * Valida con Yup en tiempo real (blur) y al intentar enviar.
 */
const Contact = () => {
  const [form, setForm] = useState(EMPTY_FORM);
  const [errors, setErrors] = useState(EMPTY_ERRORS);
  const [touched, setTouched] = useState(EMPTY_TOUCHED);
  const [sent, setSent] = useState(false);

  /* Valida un campo individual con Yup y actualiza su error */
  const validateField = (name, value) => {
    schema
      .validateAt(name, { ...form, [name]: value })
      .then(() => setErrors((prev) => ({ ...prev, [name]: "" })))
      .catch((err) => setErrors((prev) => ({ ...prev, [name]: err.message })));
  };

  /* Actualiza el valor y revalida si el campo ya fue tocado */
  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    if (touched[name]) validateField(name, value);
  };

  /* Marca el campo como tocado y dispara validación al salir */
  const handleBlur = (e) => {
    const { name, value } = e.target;
    setTouched((prev) => ({ ...prev, [name]: true }));
    validateField(name, value);
  };

  /* Valida todo el formulario; envía si no hay errores */
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await schema.validate(form, { abortEarly: false });
      setSent(true);
      setForm(EMPTY_FORM);
      setErrors(EMPTY_ERRORS);
      setTouched(EMPTY_TOUCHED);
      setTimeout(() => setSent(false), 5000);
    } catch (err) {
      const newErrors = { ...EMPTY_ERRORS };
      err.inner.forEach((ve) => {
        newErrors[ve.path] = ve.message;
      });
      setErrors(newErrors);
      setTouched({ name: true, email: true, message: true });
    }
  };

  /* Clases del input: cambia el borde a rojo si hay error en ese campo */
  const inputCls = (field) =>
    `w-full px-[18px] py-[13px] border-[1.5px] rounded-lg text-[0.95rem] text-app-dark bg-white outline-none transition-all resize-none ${
      errors[field]
        ? "border-red-400 focus:border-red-400 focus:ring-2 focus:ring-red-100"
        : "border-gray-200 focus:border-brand focus:ring-2 focus:ring-brand/10"
    }`;

  return (
    <section className="py-20 px-8 bg-gray-100" id="contacto">
      <div className="max-w-7xl mx-auto">
        {/* Encabezado de sección */}
        <div className="text-center mb-12">
          <span className="inline-block bg-brand-light text-brand text-[0.75rem] font-bold uppercase tracking-[0.1em] px-3.5 py-1 rounded-full mb-3">
            Contacto
          </span>
          <h2 className="text-[clamp(1.8rem,3vw,2.5rem)] font-extrabold text-app-dark mb-3">
            ¿Hablamos?
          </h2>
          <p className="text-gray-500 max-w-[500px] mx-auto">
            Estamos para ayudarte. Escribínos y te respondemos a la brevedad.
          </p>
        </div>

        {/* Grilla: información + formulario */}
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.4fr] gap-12 items-start">
          {/* Panel de información de contacto */}
          <div>
            <h3 className="text-2xl font-extrabold text-app-dark mb-4">
              Encontranos
            </h3>
            <p className="text-gray-500 text-[0.95rem] leading-[1.75] mb-8">
              Visitá nuestro local o escribínos por cualquier consulta.
              Atendemos de Lunes a Viernes de 8:00 a 18:00 hs y Sábados de 9:00
              a 12:00 hs. ¡Te esperamos!
            </p>
            {/* Detalles de contacto */}
            <div className="flex flex-col gap-4">
              {[
                {
                  icon: "📍",
                  label: "Dirección",
                  value: "C. 56A #3-00, Este, Bogotá",
                },
                {
                  icon: "📞",
                  label: "Teléfono",
                  value: "018000180779 - 3134771607",
                },
                {
                  icon: "✉️",
                  label: "Email",
                  value: "archivo@poligran.edu.co",
                },
                {
                  icon: "🕐",
                  label: "Horario",
                  value: "Lun–Vie: 8:00 – 18:00 hs, Sáb: 9:00 – 12:00 hs",
                },
              ].map(({ icon, label, value }) => (
                <div key={label} className="flex items-center gap-3.5">
                  <div className="w-[46px] h-[46px] min-w-[46px] bg-white rounded-lg flex items-center justify-center text-xl shadow-sm">
                    {icon}
                  </div>
                  <div>
                    <strong className="block text-[0.82rem] font-bold text-app-dark">
                      {label}
                    </strong>
                    <span className="text-[0.9rem] text-gray-500">{value}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Formulario de contacto */}
          <div className="bg-white rounded-3xl p-10 shadow-md">
            <h3 className="text-[1.3rem] font-extrabold text-app-dark mb-7">
              Enviános un mensaje
            </h3>
            {sent ? (
              /* Mensaje de éxito tras el envío */
              <div className="text-center py-12 px-8 flex flex-col items-center gap-3">
                <span className="text-6xl">✅</span>
                <strong className="text-[1.1rem] font-bold text-app-dark">
                  ¡Mensaje enviado!
                </strong>
                <p className="text-gray-500">Te respondemos a la brevedad.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} noValidate>
                {/* Campo nombre */}
                <div className="flex flex-col gap-1.5 mb-5">
                  <label className="text-[0.82rem] font-semibold text-app-dark">
                    Nombre completo
                  </label>
                  <input
                    className={inputCls("name")}
                    type="text"
                    name="name"
                    placeholder="Tu nombre"
                    value={form.name}
                    onChange={handleChange}
                    onBlur={handleBlur}
                  />
                  {errors.name && (
                    <span className="text-[0.78rem] text-red-500 flex items-center gap-1">
                      ⚠ {errors.name}
                    </span>
                  )}
                </div>
                {/* Campo correo */}
                <div className="flex flex-col gap-1.5 mb-5">
                  <label className="text-[0.82rem] font-semibold text-app-dark">
                    Correo electrónico
                  </label>
                  <input
                    className={inputCls("email")}
                    type="email"
                    name="email"
                    placeholder="tu@email.com"
                    value={form.email}
                    onChange={handleChange}
                    onBlur={handleBlur}
                  />
                  {errors.email && (
                    <span className="text-[0.78rem] text-red-500 flex items-center gap-1">
                      ⚠ {errors.email}
                    </span>
                  )}
                </div>
                {/* Campo mensaje */}
                <div className="flex flex-col gap-1.5 mb-5">
                  <label className="text-[0.82rem] font-semibold text-app-dark">
                    Mensaje
                  </label>
                  <textarea
                    className={`${inputCls("message")} h-[130px]`}
                    name="message"
                    placeholder="¿En qué podemos ayudarte?"
                    value={form.message}
                    onChange={handleChange}
                    onBlur={handleBlur}
                  />
                  {errors.message && (
                    <span className="text-[0.78rem] text-red-500 flex items-center gap-1">
                      ⚠ {errors.message}
                    </span>
                  )}
                </div>
                <button
                  type="submit"
                  className="w-full inline-flex items-center justify-center px-7 py-3.5 rounded-full bg-brand text-white border-2 border-brand font-semibold text-base cursor-pointer transition-all hover:bg-brand-dark hover:border-brand-dark hover:-translate-y-0.5 shadow-[0_8px_24px_rgba(230,57,70,0.3)]"
                >
                  Enviar mensaje
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
