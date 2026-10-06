import { FunctionComponent } from "react";
import styles from "./Link.module.css";

export type LinkType = {
  className?: string;
  label: string;
  href?: string;
  active?: boolean;
  onClick?: () => void;
};

const Link: FunctionComponent<LinkType> = ({
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

export default Link;
