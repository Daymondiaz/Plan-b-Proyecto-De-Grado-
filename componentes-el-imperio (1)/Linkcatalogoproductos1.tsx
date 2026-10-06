import { FunctionComponent } from "react";
import styles from "./Linkcatalogoproductos1.module.css";

export type Linkcatalogoproductos1Type = {
  className?: string;
  label: string;
  count?: number;
  active?: boolean;
  onClick?: () => void;
};

const Linkcatalogoproductos1: FunctionComponent<Linkcatalogoproductos1Type> = ({
  className = "",
  label,
  count,
  active = false,
  onClick,
}) => {
  return (
    <button
      type="button"
      aria-pressed={active}
      className={[styles.link, active ? styles.active : "", className].join(" ")}
      onClick={onClick}
    >
      <span>{label}</span>
      {count !== undefined && <span className={styles.count}>{count}</span>}
    </button>
  );
};

export default Linkcatalogoproductos1;
