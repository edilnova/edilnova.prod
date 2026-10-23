import React from "react";
import { services } from "../services";
import PaymentMethods from "./PaymentMethods";
import s from "../styles/Institutional.module.css";
import {
  ContactAction,
  ContactDetails,
  ContactValue,
} from "./ProtectedContact";
function Brand() {
  return (
    <span className={s.brand}>
      <svg viewBox="0 0 48 44" fill="none" aria-hidden="true">
        <path
          d="M4 39V20L24 3l20 17v19M35 12V3"
          stroke="currentColor"
          strokeWidth="5"
        />
        <path d="M13 40V25l11-10 11 10v15" stroke="#1b3040" strokeWidth="5" />
      </svg>
      <span>
        EDIL<span className={s.accent}>NOVA</span>
        <small>SOLUCIONES EDILICIAS INTEGRALES</small>
      </span>
    </span>
  );
}
export function Header() {
  return (
    <header className={s.nav}>
      <a href="#inicio" aria-label="EDILNOVA, inicio">
        <Brand />
      </a>
      <nav aria-label="Navegación principal">
        <a href="#servicios">Servicios</a>
        <a href="#trabajos">Trabajos</a>
        <a href="#contacto">Contacto</a>
      </nav>
      <ContactAction className={"btn " + s.headerContact} label="Contactar a EDILNOVA por WhatsApp">
        <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M20.52 3.48A11.88 11.88 0 0 0 12.05 0C5.46 0 .1 5.36.1 11.95c0 2.1.55 4.16 1.6 5.97L0 24l6.24-1.64a11.92 11.92 0 0 0 5.81 1.48h.01c6.59 0 11.95-5.36 11.95-11.95a11.87 11.87 0 0 0-3.49-8.41ZM12.06 21.82a9.9 9.9 0 0 1-5.04-1.38l-.36-.21-3.7.97.99-3.61-.24-.37a9.91 9.91 0 0 1-1.52-5.27c0-5.48 4.46-9.94 9.94-9.94a9.88 9.88 0 0 1 7.03 2.91 9.87 9.87 0 0 1 2.9 7.03c0 5.48-4.46 9.94-9.94 9.94Zm5.45-7.44c-.3-.15-1.77-.87-2.05-.97-.27-.1-.47-.15-.67.15-.2.3-.77.97-.94 1.17-.17.2-.35.22-.64.07-.3-.15-1.26-.46-2.4-1.48-.89-.79-1.48-1.77-1.66-2.07-.17-.3-.02-.46.13-.61.13-.13.3-.35.44-.52.15-.17.2-.3.3-.5.1-.2.05-.37-.03-.52-.07-.15-.67-1.62-.92-2.22-.24-.58-.49-.5-.67-.51h-.57c-.2 0-.52.07-.8.37-.27.3-1.04 1.02-1.04 2.49s1.07 2.89 1.22 3.09c.15.2 2.1 3.21 5.09 4.5.71.31 1.27.49 1.7.63.71.23 1.36.2 1.87.12.57-.09 1.77-.72 2.02-1.42.25-.7.25-1.3.17-1.42-.07-.12-.27-.2-.57-.35Z"/></svg>
        <ContactValue field="localDisplay" />
      </ContactAction>
    </header>
  );
}
export function Hero() {
  return (
    <section className={s.hero} id="inicio">
      <div className="wrap">
        <p className="eyebrow">MONTEVIDEO · URUGUAY</p>
        <h1>
          Instalaciones, reparaciones,
          <br className={s.break} /> reformas y <em>mantenimiento edilicio</em>
        </h1>
        <ContactAction className={s.textLink}>
          Consultar por un trabajo ↗
        </ContactAction>
      </div>
    </section>
  );
}
export function Services({ onSelect }) {
  return (
    <section className={s.services} id="servicios">
      <div className="wrap">
        <p className="eyebrow">NUESTROS SERVICIOS</p>
        <h2>
          Soluciones para <em>cada necesidad.</em>
        </h2>
        <div className={s.cards}>
          {services.map((service) => (
            <a
              href="#trabajos"
              key={service.name}
              onClick={() => onSelect(service.name)}
              className={s.service}
            >
              <svg
                viewBox="0 0 24 26"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.7"
                strokeLinejoin="round"
                strokeLinecap="round"
                aria-hidden="true"
              >
                <path d={service.icon} />
              </svg>
              <h3>{service.name}</h3>
              <p>{service.description}</p>
              <span>Ver trabajos ↗</span>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
export function Contact() {
  return (
    <section className={s.contact} id="contacto">
      <div className="wrap">
        <div>
          <p className="eyebrow">CONTACTO</p>
          <h2>
            Conversemos sobre <em>su proyecto.</em>
          </h2>
          <p>
            Estamos a disposición para conocer sus necesidades y coordinar una
            evaluación.
          </p>
        </div>
        <div className={s.actions}>
          <ContactAction className="btn">Escribir por WhatsApp ↗</ContactAction>
        </div>
        <ContactDetails />
        <PaymentMethods />
      </div>
    </section>
  );
}
export function Footer() {
  return (
    <footer className={s.footer}>
      <div className={"wrap " + s.footerContent}>
        <Brand />
        <p>Jacinto Vera - Montevideo, Uruguay</p>
        <small>© {new Date().getFullYear()} EDILNOVA.</small>
        <ContactAction
          kind="developer"
          className={s.developerCredit}
          message="Hola, vi la página web de EDILNOVA y me interesaría consultar por el desarrollo de una página web."
        >
          <span>Sitio desarrollado por</span>{" "}
          <strong>
            <ContactValue field="developerName" />
          </strong>
        </ContactAction>
      </div>
    </footer>
  );
}
