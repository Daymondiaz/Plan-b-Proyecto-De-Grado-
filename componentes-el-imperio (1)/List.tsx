import { FunctionComponent } from "react";
import styles from "./List.module.css";

export type ListType = {
  className?: string;
  quinesSomos?: string;
  certificaciones?: string;
  clientes?: string;
};

const List: FunctionComponent<ListType> = ({
  className = "",
  quinesSomos,
  certificaciones,
  clientes,
}) => {
  const items = [quinesSomos, certificaciones, clientes].filter(Boolean) as string[];
  return (
    <div className={[styles.list, className].join(" ")}>
      {items.map((texto) => (
        <div key={texto} className={styles.listItem}>
          <div className={styles.texto}>{texto}</div>
        </div>
      ))}
    </div>
  );
};

export default List;
