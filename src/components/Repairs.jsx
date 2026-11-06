import React from "react";
import { ContactAction } from "./ProtectedContact";
import ServiceIcon from "./ServiceIcon";
import s from "./Repairs.module.css";

const examples = [
  ["Pérdidas y desagües", "Griferías, cañerías y problemas de sanitaria.", "Sanitaria"],
  ["Reparaciones eléctricas", "Solución de fallas en tomacorrientes, interruptores e iluminación.", "Electricidad"],
  ["Arreglos del día a día", "Puertas, muebles, revestimientos y desperfectos del hogar.", "Mantenimiento edilicio"],
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
          {examples.map(([title, description, service]) => (
            <li key={title}>
              <span className={s.icon}><ServiceIcon name={service} /></span>
              <div><h3>{title}</h3><p>{description}</p></div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
