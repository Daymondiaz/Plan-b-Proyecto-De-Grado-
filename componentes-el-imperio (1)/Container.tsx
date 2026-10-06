import { FunctionComponent, ReactNode } from "react";
import styles from "./Container.module.css";

export type ContainerType = {
  className?: string;
  title?: string;
  subtitle?: string;
  children?: ReactNode;
};

const Container: FunctionComponent<ContainerType> = ({
  className = "",
  title,
  subtitle,
  children,
}) => {
  return (
    <section className={[styles.container, className].join(" ")}>
      {(title || subtitle) && (
        <div className={styles.heading}>
          {title && <h2 className={styles.title}>{title}</h2>}
          {subtitle && <p className={styles.subtitle}>{subtitle}</p>}
        </div>
      )}
      {children}
    </section>
  );
};

export default Container;
