export type Categoria = "Bisagras" | "Bujes" | "Soportes" | "Lengüetas";
export type Material = "Acero" | "Acero inoxidable" | "Bronce" | "Aluminio" | "Nylon";
export type Orden = "relevancia" | "nombre" | "stock";
export type EstadoStock = "disponible" | "bajo" | "agotado";

export interface Pieza {
  id: string;
  nombre: string;
  categoria: Categoria;
  material: Material;
  medida: string;
  stock: number;
  descripcion: string;
  icono: string;
}

export interface Filtros {
  busqueda: string;
  categoria: Categoria | "Todas";
  material: Material | "Todos";
  soloStock: boolean;
  orden: Orden;
}

export const CATEGORIAS: Categoria[] = ["Bisagras", "Bujes", "Soportes", "Lengüetas"];
export const MATERIALES: Material[] = ["Acero", "Acero inoxidable", "Bronce", "Aluminio", "Nylon"];

export const FILTROS_INICIALES: Filtros = {
  busqueda: "",
  categoria: "Todas",
  material: "Todos",
  soloStock: false,
  orden: "relevancia",
};

export const PIEZAS: Pieza[] = [
  { id: "BIS-001", nombre: "Bisagra de piano", categoria: "Bisagras", material: "Acero inoxidable", medida: "1200 x 32 mm", stock: 48, descripcion: "Bisagra continua para tapas y puertas de maquinaria.", icono: "🔩" },
  { id: "BIS-004", nombre: "Bisagra industrial reforzada", categoria: "Bisagras", material: "Acero", medida: "120 x 80 mm", stock: 120, descripcion: "Soporta cargas altas en compuertas y armarios metálicos.", icono: "🔩" },
  { id: "BIS-007", nombre: "Bisagra oculta regulable", categoria: "Bisagras", material: "Aluminio", medida: "95 x 30 mm", stock: 0, descripcion: "Ajuste en tres ejes, sin tornillería visible.", icono: "🔩" },
  { id: "BUJ-002", nombre: "Buje autolubricado", categoria: "Bujes", material: "Bronce", medida: "Ø25 x 30 mm", stock: 300, descripcion: "Bronce sinterizado para ejes de giro lento y carga alta.", icono: "⚙️" },
  { id: "BUJ-005", nombre: "Buje de nylon", categoria: "Bujes", material: "Nylon", medida: "Ø20 x 25 mm", stock: 520, descripcion: "Ligero y silencioso, apto para ambientes húmedos.", icono: "⚙️" },
  { id: "BUJ-009", nombre: "Buje de acero templado", categoria: "Bujes", material: "Acero", medida: "Ø40 x 50 mm", stock: 15, descripcion: "Alta resistencia al desgaste en ejes de transmisión.", icono: "⚙️" },
  { id: "SOP-015", nombre: "Soporte angular", categoria: "Soportes", material: "Acero", medida: "80 x 80 x 40 mm", stock: 0, descripcion: "Referencia descontinuada; consulta alternativas con un asesor.", icono: "📐" },
  { id: "SOP-018", nombre: "Soporte de eje con rodamiento", categoria: "Soportes", material: "Acero", medida: "Ø30 mm", stock: 64, descripcion: "Base fundida con rodamiento sellado y engrasador.", icono: "📐" },
  { id: "SOP-021", nombre: "Soporte de pared ajustable", categoria: "Soportes", material: "Aluminio", medida: "200 x 150 mm", stock: 38, descripcion: "Ranuras de ajuste para estantes y paneles de control.", icono: "📐" },
  { id: "LEN-005", nombre: "Lengüeta de sujeción", categoria: "Lengüetas", material: "Acero inoxidable", medida: "25 x 10 mm", stock: 800, descripcion: "Fija cables y mangueras en estructuras metálicas.", icono: "📎" },
  { id: "LEN-008", nombre: "Lengüeta de resorte", categoria: "Lengüetas", material: "Acero", medida: "40 x 12 mm", stock: 260, descripcion: "Mantiene presión constante en contactos y cierres.", icono: "📎" },
  { id: "LEN-011", nombre: "Lengüeta aislante", categoria: "Lengüetas", material: "Nylon", medida: "30 x 15 mm", stock: 75, descripcion: "Aislamiento eléctrico en tableros y conexiones.", icono: "📎" },
];

const normalizar = (t: string) =>
  t.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase().trim();

export function estadoStock(stock: number): EstadoStock {
  if (stock === 0) return "agotado";
  return stock <= 20 ? "bajo" : "disponible";
}

export function filtrarPiezas(piezas: Pieza[], f: Filtros): Pieza[] {
  const tokens = normalizar(f.busqueda).split(/\s+/).filter(Boolean);
  const res = piezas.filter((p) => {
    if (f.categoria !== "Todas" && p.categoria !== f.categoria) return false;
    if (f.material !== "Todos" && p.material !== f.material) return false;
    if (f.soloStock && p.stock === 0) return false;
    const texto = normalizar(
      `${p.id} ${p.nombre} ${p.categoria} ${p.material} ${p.medida} ${p.descripcion}`
    );
    return tokens.every((t) => texto.includes(t));
  });
  if (f.orden === "nombre") return [...res].sort((a, b) => a.nombre.localeCompare(b.nombre, "es"));
  if (f.orden === "stock") return [...res].sort((a, b) => b.stock - a.stock);
  return res;
}
