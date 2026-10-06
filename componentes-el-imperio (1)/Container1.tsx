import { FunctionComponent } from "react";
import ButtonEncontrarpieza from "./ButtonEncontrarpieza";
import styles from "./Container1.module.css";

export type Container1Type = {
  className?: string;
  title?: string;
  text?: string;
  buttonLabel?: string;
  onClick?: () => void;
};

const Container1: FunctionComponent<Container1Type> = ({
  className = "",
  title = "¿No encuentras tu pieza?",
  text = "Envíanos la medida, el material o una foto y un asesor te propone la referencia más cercana o la fabricamos a medida.",
  buttonLabel = "Hablar con un asesor",
  onClick,
}) => {
  return (
    <div className={[styles.container, className].join(" ")}>
      <div className={styles.texts}>
        <h2 className={styles.title}>{title}</h2>
        <p className={styles.text}>{text}</p>
      </div>
      <ButtonEncontrarpieza onClick={onClick}>{buttonLabel}</ButtonEncontrarpieza>
    </div>
  );
};

export default Container1;
