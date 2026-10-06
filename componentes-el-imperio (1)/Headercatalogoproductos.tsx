import { FunctionComponent } from "react";
import Linkcatalogoproductos from "./Linkcatalogoproductos";
import { NAV_ITEMS, NavKey } from "./Header";
import styles from "./Headercatalogoproductos.module.css";

export type HeadercatalogoproductosType = {
  className?: string;
  onNavigate?: (key: NavKey) => void;
  onAsesorClick?: () => void;
};

const Headercatalogoproductos: FunctionComponent<HeadercatalogoproductosType> = ({
  className = "",
  onNavigate,
  onAsesorClick,
}) => {
  return (
    <header className={[styles.header, className].join(" ")}>
      <div className={styles.inner}>
        <button type="button" className={styles.brand} onClick={() => onNavigate?.("inicio")}>
          <span className={styles.logoIcon} aria-hidden="true">🔧</span>
          <span>Metal Mecanica El Imperio</span>
        </button>
        <nav className={styles.nav} aria-label="Principal">
          {NAV_ITEMS.map((item) => (
            <Linkcatalogoproductos
              key={item.key}
              label={item.label}
              active={item.key === "catalogo"}
              onClick={() => onNavigate?.(item.key)}
            />
          ))}
        </nav>
        <button type="button" className={styles.asesorBtn} onClick={onAsesorClick}>
          Acceso asesor
        </button>
      </div>
    </header>
  );
};

export default Headercatalogoproductos;
