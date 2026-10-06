import { FunctionComponent } from "react";
import ButtonEncontrarpieza from "./ButtonEncontrarpieza";
import {
  CATEGORIAS,
  MATERIALES,
  FILTROS_INICIALES,
  Filtros,
  Orden,
  Material,
} from "./piezas";
import styles from "./ContainerEncontrarpieza.module.css";

export type ContainerEncontrarpiezaType = {
  className?: string;
  filtros: Filtros;
  total: number;
  onChange: (cambios: Partial<Filtros>) => void;
  onReset: () => void;
};

const ContainerEncontrarpieza: FunctionComponent<ContainerEncontrarpiezaType> = ({
  className = "",
  filtros,
  total,
  onChange,
  onReset,
}) => {
  const hayFiltros = JSON.stringify(filtros) !== JSON.stringify(FILTROS_INICIALES);

  return (
    <div className={[styles.panel, className].join(" ")} role="search">
      <label className={styles.searchLabel} htmlFor="buscar-pieza">
        ¿Qué pieza necesitas?
      </label>
      <div className={styles.searchRow}>
        <input
          id="buscar-pieza"
          type="search"
          className={styles.searchInput}
          placeholder="Escribe el nombre, la referencia o la medida. Ej: buje bronce, BIS-001, Ø25"
          value={filtros.busqueda}
          onChange={(e) => onChange({ busqueda: e.target.value })}
          autoComplete="off"
        />
        {filtros.busqueda && (
          <button
            type="button"
            className={styles.clear}
            aria-label="Borrar búsqueda"
            onClick={() => onChange({ busqueda: "" })}
          >
            ✕
          </button>
        )}
      </div>

      <div className={styles.chips} role="group" aria-label="Categoría">
        {(["Todas", ...CATEGORIAS] as const).map((c) => (
          <button
            key={c}
            type="button"
            aria-pressed={filtros.categoria === c}
            className={[styles.chip, filtros.categoria === c ? styles.chipActive : ""].join(" ")}
            onClick={() => onChange({ categoria: c })}
          >
            {c}
          </button>
        ))}
      </div>

      <div className={styles.filtersRow}>
        <div className={styles.field}>
          <label htmlFor="filtro-material">Material</label>
          <select
            id="filtro-material"
            value={filtros.material}
            onChange={(e) => onChange({ material: e.target.value as Material | "Todos" })}
          >
            <option value="Todos">Todos</option>
            {MATERIALES.map((m) => (
              <option key={m} value={m}>{m}</option>
            ))}
          </select>
        </div>

        <div className={styles.field}>
          <label htmlFor="filtro-orden">Ordenar por</label>
          <select
            id="filtro-orden"
            value={filtros.orden}
            onChange={(e) => onChange({ orden: e.target.value as Orden })}
          >
            <option value="relevancia">Relevancia</option>
            <option value="nombre">Nombre (A-Z)</option>
            <option value="stock">Mayor stock</option>
          </select>
        </div>

        <label className={styles.check}>
          <input
            type="checkbox"
            checked={filtros.soloStock}
            onChange={(e) => onChange({ soloStock: e.target.checked })}
          />
          Solo piezas con stock
        </label>

        <ButtonEncontrarpieza variant="ghost" onClick={onReset} disabled={!hayFiltros}>
          Limpiar filtros
        </ButtonEncontrarpieza>
      </div>

      <p className={styles.count} aria-live="polite">
        {total === 1 ? "1 pieza encontrada" : `${total} piezas encontradas`}
      </p>
    </div>
  );
};

export default ContainerEncontrarpieza;
