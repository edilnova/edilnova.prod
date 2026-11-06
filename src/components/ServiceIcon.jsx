import React from "react";
import { services } from "../services";

export default function ServiceIcon({ name }) {
  const service = services.find((item) => item.name === name);
  if (!service) return null;
  return (
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
  );
}
