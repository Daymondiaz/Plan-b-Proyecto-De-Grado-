import { FunctionComponent } from "react";
import Footer from "./Footer";
import styles from "./Footercatalogoproductos.module.css";

export type FootercatalogoproductosType = {
  className?: string;
};

const Footercatalogoproductos: FunctionComponent<FootercatalogoproductosType> = ({
  className = "",
}) => {
  return <Footer className={[styles.footer, className].join(" ")} />;
};

export default Footercatalogoproductos;
