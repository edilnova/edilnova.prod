import React from "react";
import { ContactAction } from "./ProtectedContact";
import s from "./Repairs.module.css";

const examples = [
  ["Pérdidas y desagües", "Griferías, cañerías y problemas de sanitaria.", "M4 10h16M8 10V6h8v4M12 6V3m-3 0h6M6 10v7h5v4"],
  ["Humedad y filtraciones", "Evaluación del origen y reparación de la zona afectada.", "M12 3S5 11 5 16a7 7 0 0 0 14 0c0-5-7-13-7-13Z"],
  ["Arreglos del día a día", "Puertas, muebles, revestimientos y desperfectos del hogar.", "m14 6 4-4a7 7 0 0 0-9 9L2 18l4 4 7-7a7 7 0 0 0 9-9l-4 4Z"],
];

export default function Repairs({ onViewRepairs }) {
  return (
    <section className={s.section} aria-labelledby="repairs-title">
      <div className={"wrap " + s.layout}>
        <div className={s.intro}>
          <p className="eyebrow">REPARACIONES PARA EL DÍA A DÍA</p>
          <h2 id="repairs-title">Ese arreglo pendiente <em>también es nuestro trabajo.</em></h2>
          <p>Una pérdida, una puerta que no cierra o un revestimiento dañado: atendemos reparaciones puntuales en hogares, edificios y comercios, con una solución acorde a cada problema.</p>
          <div className={s.actions}>
            <ContactAction className="btn" message="Hola, quisiera consultar por una reparación.">Consultar por una reparación ↗</ContactAction>
            <a href="#trabajos" className={s.workLink} onClick={onViewRepairs}>Ver reparaciones realizadas <span aria-hidden="true">→</span></a>
          </div>
        </div>
        <ul className={s.examples}>
          {examples.map(([title, description, path]) => (
            <li key={title}>
              <span className={s.icon}><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d={path} /></svg></span>
              <div><h3>{title}</h3><p>{description}</p></div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
