import { FunctionComponent, FormEvent, useState } from "react";
import styles from "./AsesorLoginForm.module.css";

export type AsesorLoginFormType = {
  className?: string;
  onLogin: () => void;
  onBack?: () => void;
};

// Credenciales de prueba. Reemplaza esta comprobación por una llamada a tu API.
const DEMO = { email: "asesor@imperio.com", password: "asesor123" };

const AsesorLoginForm: FunctionComponent<AsesorLoginFormType> = ({
  className = "",
  onLogin,
  onBack,
}) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [verClave, setVerClave] = useState(false);
  const [error, setError] = useState("");
  const [cargando, setCargando] = useState(false);

  const enviar = (e: FormEvent) => {
    e.preventDefault();
    if (!/^\S+@\S+\.\S+$/.test(email)) return setError("Escribe un correo válido, como nombre@empresa.com.");
    if (password.length < 6) return setError("La contraseña debe tener al menos 6 caracteres.");
    setError("");
    setCargando(true);
    setTimeout(() => {
      setCargando(false);
      if (email.trim().toLowerCase() === DEMO.email && password === DEMO.password) onLogin();
      else setError("Correo o contraseña incorrectos. Revisa los datos e inténtalo de nuevo.");
    }, 600);
  };

  return (
    <div className={[styles.wrapper, className].join(" ")}>
      <form className={styles.card} onSubmit={enviar} noValidate>
        <div className={styles.logo} aria-hidden="true">🔧</div>
        <h1 className={styles.title}>Acceso asesor</h1>
        <p className={styles.subtitle}>Inicia sesión para ver las solicitudes que requieren tu revisión.</p>

        <div className={styles.field}>
          <label htmlFor="asesor-email">Correo</label>
          <input id="asesor-email" type="email" autoComplete="username" value={email} onChange={(e) => setEmail(e.target.value)} />
        </div>

        <div className={styles.field}>
          <label htmlFor="asesor-clave">Contraseña</label>
          <div className={styles.passwordRow}>
            <input
              id="asesor-clave"
              type={verClave ? "text" : "password"}
              autoComplete="current-password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <button type="button" className={styles.toggle} onClick={() => setVerClave((v) => !v)}>
              {verClave ? "Ocultar" : "Mostrar"}
            </button>
          </div>
        </div>

        {error && <p className={styles.error} role="alert">{error}</p>}

        <button type="submit" className={styles.submit} disabled={cargando}>
          {cargando ? "Entrando..." : "Entrar"}
        </button>
        {onBack && (
          <button type="button" className={styles.back} onClick={onBack}>
            Volver al sitio
          </button>
        )}
      </form>
    </div>
  );
};

export default AsesorLoginForm;
