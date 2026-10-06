import { FunctionComponent } from "react";
import ProductCard from "./ProductCard";
import { NavKey } from "./Header";
import { CATEGORIAS, PIEZAS } from "./piezas";
import styles from "./Section1.module.css";

export type Section1Type = {
  className?: string;
  onNavigate?: (key: NavKey) => void;
};

const INFO: Record<string, { icono: string; descripcion: string }> = {
  Bisagras: { icono: "🔩", descripcion: "Continuas, reforzadas y ocultas para puertas, tapas y compuertas." },
  Bujes: { icono: "⚙️", descripcion: "Bronce, nylon y acero templado para ejes de giro y transmisión." },
  Soportes: { icono: "📐", descripcion: "Angulares, de pared y de eje con rodamiento." },
  Lengüetas: { icono: "📎", descripcion: "De sujeción, de resorte y aislantes para estructuras y tableros." },
};

const Section1: FunctionComponent<Section1Type> = ({ className = "", onNavigate }) => {
  return (
    <section className={[styles.section, className].join(" ")}>
      <div className={styles.inner}>
        <h2 className={styles.title}>Nuestros productos</h2>
        <p className={styles.subtitle}>Cuatro familias de piezas, siempre con referencia y medida claras.</p>
        <div className={styles.grid}>
          {CATEGORIAS.map((c) => (
            <ProductCard
              key={c}
              icono={INFO[c].icono}
              nombre={c}
              referencia={`${PIEZAS.filter((p) => p.categoria === c).length} referencias`}
              descripcion={INFO[c].descripcion}
              accion="Buscar en esta familia"
              onClick={() => onNavigate?.("encontrar")}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Section1;
