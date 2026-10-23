import React, { useSyncExternalStore } from "react";
import s from "./ProtectedContact.module.css";
const encoded = {
  localDisplay: [109,100,100,125,111,100,111,125,105,107,110],
  developerPhone: [104,100,101,100,111,110,105,100,100,100,101],
  developerName: [27,56,47,51,60,51,57,50,125,24,46,62,50,63,60,49],
  phone: [104, 100, 101, 100, 100, 111, 100, 111, 105, 107, 110],
  display: [
    118, 104, 100, 101, 125, 100, 100, 125, 111, 100, 111, 125, 105, 107, 110,
  ],
  email: [
    56, 57, 52, 49, 51, 50, 43, 60, 115, 40, 36, 29, 58, 48, 60, 52, 49, 115,
    62, 50, 48,
  ],
  name: [
    23, 50, 46, 158, 244, 125, 27, 56, 47, 51, 60, 51, 57, 50, 125, 24, 46, 62,
    50, 63, 60, 49, 125, 15, 52, 39, 39, 50,
  ],
};
function decode(key) {
  return new TextDecoder().decode(Uint8Array.from(encoded[key], (v) => v ^ 93));
}
export function ContactAction({
  kind = "whatsapp",
  children,
  className,
  label,
  message = "Hola, quisiera consultar por un trabajo",
}) {
  function open() {
    if (kind === "email") {
      window.location.href = "mailto:" + decode("email");
      return;
    }
    if (kind === "phone") {
      window.location.href = "tel:+" + decode("phone");
      return;
    }
    window.open(
      "https://wa.me/" +
        decode(kind === "developer" ? "developerPhone" : "phone") +
        "?text=" +
        encodeURIComponent(message),
      "_blank",
      "noopener,noreferrer",
    );
  }
  return (
    <button type="button" className={className || s.action} aria-label={label} onClick={open}>
      {children}
    </button>
  );
}
const subscribe = () => () => {};
const placeholders = {
  localDisplay: "Contacto",
  developerName: "el equipo de desarrollo",
  phone: "Teléfono",
  display: "Contacto",
  email: "Correo electrónico",
  name: "Responsable de EDILNOVA",
};
export function ContactValue({ field }) {
  const value = useSyncExternalStore(
    subscribe,
    () => decode(field),
    () => placeholders[field],
  );
  return <>{value}</>;
}
export function ContactDetails() {
  return (
    <div className={s.details}>
      <div className={s.data} role="region" aria-label="Datos de contacto">
        <p>
          <ContactValue field="name" />
          <br />
          <span>Técnico de mantenimiento edilicio</span>
        </p>
        <ContactAction kind="phone">
          <ContactValue field="display" />
        </ContactAction>
        <ContactAction kind="email">
          <ContactValue field="email" />
        </ContactAction>
      </div>
    </div>
  );
}
