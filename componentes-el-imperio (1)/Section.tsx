import { FunctionComponent } from "react";
import ButtonEncontrarpieza from "./ButtonEncontrarpieza";
import { NavKey } from "./Header";
import styles from "./Section.module.css";

export type SectionType = {
  className?: string;
  onNavigate?: (key: NavKey) => void;
};

const Section: FunctionComponent<SectionType> = ({ className = "", onNavigate }) => {
  return (
    <section className={[styles.section, className].join(" ")}>
      <div className={styles.inner}>
        <h1 className={styles.title}>Piezas metálicas que tu planta no puede parar sin</h1>
        <p className={styles.text}>
          Bisagras, bujes, soportes y lengüetas para empresas. Busca la referencia exacta o pide
          una fabricación a medida.
        </p>
        <div className={styles.actions}>
          <ButtonEncontrarpieza onClick={() => onNavigate?.("encontrar")}>Encontrar mi pieza</ButtonEncontrarpieza>
          <button type="button" className={styles.secondary} onClick={() => onNavigate?.("catalogo")}>
            Ver catálogo
          </button>
        </div>
      </div>
    </section>
  );
};

export default Section;
