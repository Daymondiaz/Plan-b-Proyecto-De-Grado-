import { FunctionComponent, ButtonHTMLAttributes } from "react";
import styles from "./ButtonEncontrarpieza.module.css";

export type ButtonEncontrarpiezaType = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: "primary" | "secondary" | "ghost";
  fullWidth?: boolean;
};

const ButtonEncontrarpieza: FunctionComponent<ButtonEncontrarpiezaType> = ({
  variant = "primary",
  fullWidth = false,
  className = "",
  type = "button",
  children,
  ...rest
}) => {
  return (
    <button
      type={type}
      className={[styles.button, styles[variant], fullWidth ? styles.full : "", className].join(" ")}
      {...rest}
    >
      {children}
    </button>
  );
};

export default ButtonEncontrarpieza;
