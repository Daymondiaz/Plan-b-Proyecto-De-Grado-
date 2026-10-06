import { FunctionComponent, FormEvent, useState } from "react";
import ButtonEncontrarpieza from "./ButtonEncontrarpieza";
import styles from "./Section4.module.css";

export type Section4Type = {
  className?: string;
};

const INICIAL = { nombre: "", empresa: "", email: "", mensaje: "" };

const Section4: FunctionComponent<Section4Type> = ({ className = "" }) => {
  const [form, setForm] = useState(INICIAL);
  const [errores, setErrores] = useState<Record<string, string>>({});
  const [enviado, setEnviado] = useState(false);

  const campo = (k: keyof typeof INICIAL, v: string) => setForm((p) => ({ ...p, [k]: v }));

  const enviar = (e: FormEvent) => {
    e.preventDefault();
    const n: Record<string, string> = {};
    if (form.nombre.trim().length < 2) n.nombre = "Escribe tu nombre.";
    if (!/^\S+@\S+\.\S+$/.test(form.email)) n.email = "Escribe un correo válido, como nombre@empresa.com.";
    if (form.mensaje.trim().length < 10) n.mensaje = "Cuéntanos qué necesitas en al menos 10 caracteres.";
    setErrores(n);
    if (Object.keys(n).length === 0) {
      // Aquí conecta tu API: fetch("/api/contacto", { method: "POST", body: JSON.stringify(form) })
      setEnviado(true);
    }
  };

  return (
    <section id="contacto" className={[styles.section, className].join(" ")}>
      <div className={styles.inner}>
        <div className={styles.intro}>
          <h2 className={styles.title}>Cuéntanos qué necesitas</h2>
          <p className={styles.text}>Un asesor te responde en menos de un día hábil, de lunes a viernes.</p>
        </div>

        {enviado ? (
          <div className={styles.success} role="status">
            <h3>Mensaje enviado</h3>
            <p>Gracias, {form.nombre}. Te escribiremos a {form.email}.</p>
            <ButtonEncontrarpieza variant="ghost" onClick={() => { setForm(INICIAL); setEnviado(false); }}>
              Enviar otro mensaje
            </ButtonEncontrarpieza>
          </div>
        ) : (
          <form className={styles.form} onSubmit={enviar} noValidate>
            <div className={styles.row}>
              <div className={styles.field}>
                <label htmlFor="c-nombre">Nombre</label>
                <input id="c-nombre" value={form.nombre} onChange={(e) => campo("nombre", e.target.value)} />
                {errores.nombre && <span className={styles.error}>{errores.nombre}</span>}
              </div>
              <div className={styles.field}>
                <label htmlFor="c-empresa">Empresa (opcional)</label>
                <input id="c-empresa" value={form.empresa} onChange={(e) => campo("empresa", e.target.value)} />
              </div>
            </div>
            <div className={styles.field}>
              <label htmlFor="c-email">Correo</label>
              <input id="c-email" type="email" value={form.email} onChange={(e) => campo("email", e.target.value)} />
              {errores.email && <span className={styles.error}>{errores.email}</span>}
            </div>
            <div className={styles.field}>
              <label htmlFor="c-msg">Mensaje</label>
              <textarea id="c-msg" rows={4} value={form.mensaje} onChange={(e) => campo("mensaje", e.target.value)} />
              {errores.mensaje && <span className={styles.error}>{errores.mensaje}</span>}
            </div>
            <ButtonEncontrarpieza type="submit">Enviar mensaje</ButtonEncontrarpieza>
          </form>
        )}
      </div>
    </section>
  );
};

export default Section4;
