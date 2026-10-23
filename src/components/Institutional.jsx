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
      <ContactAction className="btn">
        WhatsApp · <ContactValue field="display" /> ↗
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
      <div className="wrap">
        <Brand />
        <p>Jacinto Vera - Montevideo, Uruguay</p>
        <small>© {new Date().getFullYear()} EDILNOVA.</small>
      </div>
    </footer>
  );
}
