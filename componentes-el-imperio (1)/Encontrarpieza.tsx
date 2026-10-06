import {
  FunctionComponent,
  FormEvent,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from "react";
import HeaderEncontrarpieza from "./HeaderEncontrarpieza";
import FooterEncontrarpieza from "./FooterEncontrarpieza";
import ContainerEncontrarpieza from "./ContainerEncontrarpieza";
import Container from "./Container";
import Container1 from "./Container1";
import ButtonEncontrarpieza from "./ButtonEncontrarpieza";
import { NavKey } from "./Header";
import {
  PIEZAS,
  FILTROS_INICIALES,
  Filtros,
  Pieza,
  estadoStock,
  filtrarPiezas,
} from "./piezas";
import styles from "./Encontrarpieza.module.css";

export type EncontrarpiezaType = {
  className?: string;
  onNavigate?: (key: NavKey) => void;
  onAsesorClick?: () => void;
};

const FORM_INICIAL = { nombre: "", email: "", cantidad: "1", mensaje: "" };

const ETIQUETA_STOCK = {
  disponible: "En stock",
  bajo: "Stock bajo",
  agotado: "Agotado",
} as const;

const Encontrarpieza: FunctionComponent<EncontrarpiezaType> = ({
  className = "",
  onNavigate,
  onAsesorClick,
}) => {
  const [filtros, setFiltros] = useState<Filtros>(FILTROS_INICIALES);
  const [seleccion, setSeleccion] = useState<Pieza | null>(null);
  const [form, setForm] = useState(FORM_INICIAL);
  const [errores, setErrores] = useState<Record<string, string>>({});
  const [enviado, setEnviado] = useState(false);

  const resultados = useMemo(() => filtrarPiezas(PIEZAS, filtros), [filtros]);

  const cambiarFiltros = (cambios: Partial<Filtros>) =>
    setFiltros((prev) => ({ ...prev, ...cambios }));

  const abrir = (pieza: Pieza) => {
    setSeleccion(pieza);
    setForm(FORM_INICIAL);
    setErrores({});
    setEnviado(false);
  };

  const cerrar = useCallback(() => setSeleccion(null), []);

  useEffect(() => {
    if (!seleccion) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && cerrar();
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [seleccion, cerrar]);

  const enviar = (e: FormEvent) => {
    e.preventDefault();
    const nuevos: Record<string, string> = {};
    if (form.nombre.trim().length < 2) nuevos.nombre = "Escribe tu nombre.";
    if (!/^\S+@\S+\.\S+$/.test(form.email)) nuevos.email = "Escribe un correo válido, como nombre@empresa.com.";
    if (!(Number(form.cantidad) >= 1)) nuevos.cantidad = "La cantidad mínima es 1.";
    setErrores(nuevos);
    if (Object.keys(nuevos).length === 0) {
      // Aquí conecta tu API: fetch("/api/cotizaciones", { method: "POST", body: ... })
      setEnviado(true);
    }
  };

  const campo = (k: keyof typeof FORM_INICIAL, v: string) =>
    setForm((prev) => ({ ...prev, [k]: v }));

  return (
    <div className={[styles.page, className].join(" ")}>
      <HeaderEncontrarpieza onNavigate={onNavigate} onAsesorClick={onAsesorClick} />

      <section className={styles.hero}>
        <div className={styles.heroInner}>
          <h1 className={styles.heroTitle}>Encuentra tu pieza en segundos</h1>
          <p className={styles.heroText}>
            Busca por nombre, referencia o medida. Filtra por categoría y material, y pide
            cotización de lo que necesitas.
          </p>
        </div>
      </section>

      <main className={styles.main}>
        <div className={styles.panelWrap}>
          <ContainerEncontrarpieza
            filtros={filtros}
            total={resultados.length}
            onChange={cambiarFiltros}
            onReset={() => setFiltros(FILTROS_INICIALES)}
          />
        </div>

        <Container title="Piezas disponibles" subtitle="Elige una pieza para solicitar su cotización.">
          {resultados.length === 0 ? (
            <div className={styles.empty}>
              <p className={styles.emptyTitle}>No hay piezas con esos filtros</p>
              <p className={styles.emptyText}>
                Revisa la ortografía, quita algún filtro o habla con un asesor para buscarla por ti.
              </p>
              <ButtonEncontrarpieza variant="secondary" onClick={() => setFiltros(FILTROS_INICIALES)}>
                Limpiar filtros
              </ButtonEncontrarpieza>
            </div>
          ) : (
            <ul className={styles.grid}>
              {resultados.map((p) => {
                const estado = estadoStock(p.stock);
                return (
                  <li key={p.id} className={styles.card}>
                    <div className={styles.cardTop}>
                      <span className={styles.icon} aria-hidden="true">{p.icono}</span>
                      <span className={[styles.badge, styles[estado]].join(" ")}>
                        {ETIQUETA_STOCK[estado]}
                      </span>
                    </div>
                    <h3 className={styles.name}>{p.nombre}</h3>
                    <p className={styles.ref}>{p.id}</p>
                    <p className={styles.desc}>{p.descripcion}</p>
                    <dl className={styles.specs}>
                      <div><dt>Material</dt><dd>{p.material}</dd></div>
                      <div><dt>Medida</dt><dd>{p.medida}</dd></div>
                      <div><dt>Unidades</dt><dd>{p.stock}</dd></div>
                    </dl>
                    <ButtonEncontrarpieza
                      variant={estado === "agotado" ? "ghost" : "primary"}
                      fullWidth
                      onClick={() => abrir(p)}
                    >
                      {estado === "agotado" ? "Consultar disponibilidad" : "Solicitar cotización"}
                    </ButtonEncontrarpieza>
                  </li>
                );
              })}
            </ul>
          )}
        </Container>

        <Container1 onClick={onAsesorClick} />
      </main>

      <FooterEncontrarpieza />

      {seleccion && (
        <div className={styles.overlay} onClick={cerrar}>
          <div
            className={styles.modal}
            role="dialog"
            aria-modal="true"
            aria-labelledby="titulo-cotizacion"
            onClick={(e) => e.stopPropagation()}
          >
            <button type="button" className={styles.close} aria-label="Cerrar" onClick={cerrar}>
              ✕
            </button>

            {enviado ? (
              <div className={styles.success}>
                <h2 id="titulo-cotizacion">Solicitud enviada</h2>
                <p>
                  Recibimos tu cotización de {form.cantidad} × {seleccion.nombre} ({seleccion.id}).
                  Te escribiremos a {form.email} en menos de un día hábil.
                </p>
                <ButtonEncontrarpieza onClick={cerrar}>Seguir buscando</ButtonEncontrarpieza>
              </div>
            ) : (
              <form onSubmit={enviar} noValidate>
                <h2 id="titulo-cotizacion" className={styles.modalTitle}>Cotizar {seleccion.nombre}</h2>
                <p className={styles.modalSub}>
                  {seleccion.id} · {seleccion.material} · {seleccion.medida}
                </p>

                <div className={styles.fieldGroup}>
                  <label htmlFor="q-nombre">Nombre</label>
                  <input id="q-nombre" value={form.nombre} onChange={(e) => campo("nombre", e.target.value)} />
                  {errores.nombre && <span className={styles.error}>{errores.nombre}</span>}
                </div>
                <div className={styles.fieldGroup}>
                  <label htmlFor="q-email">Correo</label>
                  <input id="q-email" type="email" value={form.email} onChange={(e) => campo("email", e.target.value)} />
                  {errores.email && <span className={styles.error}>{errores.email}</span>}
                </div>
                <div className={styles.fieldGroup}>
                  <label htmlFor="q-cant">Cantidad</label>
                  <input id="q-cant" type="number" min={1} value={form.cantidad} onChange={(e) => campo("cantidad", e.target.value)} />
                  {errores.cantidad && <span className={styles.error}>{errores.cantidad}</span>}
                </div>
                <div className={styles.fieldGroup}>
                  <label htmlFor="q-msg">Comentarios (opcional)</label>
                  <textarea id="q-msg" rows={3} value={form.mensaje} onChange={(e) => campo("mensaje", e.target.value)} />
                </div>

                <div className={styles.actions}>
                  <ButtonEncontrarpieza variant="ghost" onClick={cerrar}>Cancelar</ButtonEncontrarpieza>
                  <ButtonEncontrarpieza type="submit">Enviar solicitud</ButtonEncontrarpieza>
                </div>
              </form>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default Encontrarpieza;
