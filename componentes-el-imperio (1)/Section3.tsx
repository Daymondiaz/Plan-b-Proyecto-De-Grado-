import { FunctionComponent } from "react";
import styles from "./Section3.module.css";

export type Section3Type = {
  className?: string;
};

const CIFRAS = [
  { valor: "25+", etiqueta: "años fabricando" },
  { valor: "1.200", etiqueta: "referencias activas" },
  { valor: "340", etiqueta: "empresas atendidas" },
];

const Section3: FunctionComponent<Section3Type> = ({ className = "" }) => {
  return (
    <section className={[styles.section, className].join(" ")}>
      <div className={styles.inner}>
        <dl className={styles.stats}>
          {CIFRAS.map((c) => (
            <div key={c.etiqueta} className={styles.stat}>
              <dd className={styles.value}>{c.valor}</dd>
              <dt className={styles.label}>{c.etiqueta}</dt>
            </div>
          ))}
        </dl>
        <p className={styles.note}>
          Cifras de ejemplo: reemplázalas por los datos reales de la empresa.
        </p>
      </div>
    </section>
  );
};

export default Section3;
