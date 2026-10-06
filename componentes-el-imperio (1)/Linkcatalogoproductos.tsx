import { FunctionComponent } from "react";
import styles from "./Linkcatalogoproductos.module.css";

export type LinkcatalogoproductosType = {
  className?: string;
  label: string;
  href?: string;
  active?: boolean;
  onClick?: () => void;
};

const Linkcatalogoproductos: FunctionComponent<LinkcatalogoproductosType> = ({
  className = "",
  label,
  href = "#",
  active = false,
  onClick,
}) => {
  return (
    <a
      href={href}
      aria-current={active ? "page" : undefined}
      className={[styles.link, active ? styles.active : "", className].join(" ")}
      onClick={(e) => {
        if (onClick) {
          e.preventDefault();
          onClick();
        }
      }}
    >
      {label}
    </a>
  );
};

export default Linkcatalogoproductos;
