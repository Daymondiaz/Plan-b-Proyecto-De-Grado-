import { FunctionComponent } from "react";
import styles from "./Section2.module.css";

export type Section2Type = {
  className?: string;
};

const BENEFICIOS = [
  { titulo: "Despacho en 48 horas", texto: "Las piezas en stock salen el mismo día de confirmar el pedido y llegan a tu planta en dos días hábiles." },
  { titulo: "Tolerancias certificadas", texto: "Cada lote incluye ficha técnica con materiales y tolerancias medidas." },
  { titulo: "Fabricación a medida", texto: "Si la referencia no existe o fue descontinuada, un asesor te propone una alternativa o la fabricamos." },
];

const Section2: FunctionComponent<Section2Type> = ({ className = "" }) => {
  return (
    <section className={[styles.section, className].join(" ")}>
      <div className={styles.inner}>
        <h2 className={styles.title}>Por qué comprar en El Imperio</h2>
        <ul className={styles.list}>
          {BENEFICIOS.map((b) => (
            <li key={b.titulo} className={styles.item}>
              <h3 className={styles.itemTitle}>{b.titulo}</h3>
              <p className={styles.itemText}>{b.texto}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
};

export default Section2;
