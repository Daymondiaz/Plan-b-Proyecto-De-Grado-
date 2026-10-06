import { FunctionComponent } from "react";
import Header, { NavKey } from "./Header";
import styles from "./HeaderEncontrarpieza.module.css";

export type HeaderEncontrarpiezaType = {
  className?: string;
  onNavigate?: (key: NavKey) => void;
  onAsesorClick?: () => void;
};

const HeaderEncontrarpieza: FunctionComponent<HeaderEncontrarpiezaType> = ({
  className = "",
  onNavigate,
  onAsesorClick,
}) => {
  return (
    <Header
      className={[styles.header, className].join(" ")}
      activeKey="encontrar"
      onNavigate={onNavigate}
      onAsesorClick={onAsesorClick}
    />
  );
};

export default HeaderEncontrarpieza;
