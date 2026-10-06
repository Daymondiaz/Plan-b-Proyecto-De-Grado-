import { FunctionComponent } from "react";
import Link from "./Link";
import styles from "./Header.module.css";

export type NavKey = "inicio" | "catalogo" | "encontrar" | "contacto";

export type HeaderType = {
  className?: string;
  activeKey?: NavKey;
  onNavigate?: (key: NavKey) => void;
  onAsesorClick?: () => void;
};

export const NAV_ITEMS: { key: NavKey; label: string }[] = [
  { key: "inicio", label: "Inicio" },
  { key: "catalogo", label: "Catálogo" },
  { key: "encontrar", label: "Encontrar mi pieza" },
  { key: "contacto", label: "Contacto" },
];

const Header: FunctionComponent<HeaderType> = ({
  className = "",
  activeKey,
  onNavigate,
  onAsesorClick,
}) => {
  return (
    <header className={[styles.header, className].join(" ")}>
      <div className={styles.inner}>
        <button type="button" className={styles.brand} onClick={() => onNavigate?.("inicio")}>
          <span className={styles.logoIcon} aria-hidden="true">🔧</span>
          <span className={styles.brandName}>Metal Mecanica El Imperio</span>
        </button>
        <nav className={styles.nav} aria-label="Principal">
          {NAV_ITEMS.map((item) => (
            <Link
              key={item.key}
              label={item.label}
              active={activeKey === item.key}
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

export default Header;
