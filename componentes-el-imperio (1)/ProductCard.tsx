import { FunctionComponent } from "react";
import styles from "./ProductCard.module.css";

export type ProductCardType = {
  className?: string;
  icono?: string;
  nombre: string;
  referencia?: string;
  descripcion?: string;
  etiqueta?: string;
  accion?: string;
  onClick?: () => void;
};

const ProductCard: FunctionComponent<ProductCardType> = ({
  className = "",
  icono = "🔩",
  nombre,
  referencia,
  descripcion,
  etiqueta,
  accion = "Ver piezas",
  onClick,
}) => {
  return (
    <article className={[styles.card, className].join(" ")}>
      <div className={styles.top}>
        <span className={styles.icon} aria-hidden="true">{icono}</span>
        {etiqueta && <span className={styles.tag}>{etiqueta}</span>}
      </div>
      <h3 className={styles.name}>{nombre}</h3>
      {referencia && <p className={styles.ref}>{referencia}</p>}
      {descripcion && <p className={styles.desc}>{descripcion}</p>}
      <button type="button" className={styles.action} onClick={onClick}>
        {accion}
      </button>
    </article>
  );
};

export default ProductCard;
