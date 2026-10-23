export const services = [
  [
    "Sanitaria",
    "Instalaciones, reparación de pérdidas, griferías y desagües.",
    "M4 10h16M8 10V6h8v4M12 6V3m-3 0h6M6 10v7h5v4m9-11v5h-5",
  ],
  [
    "Mantenimiento edilicio",
    "Conservación y reparaciones para hogares, edificios y comercios.",
    "m14 6 4-4a7 7 0 0 0-9 9L2 18l4 4 7-7a7 7 0 0 0 9-9l-4 4Z",
  ],
  [
    "Pintura",
    "Pintura interior y exterior y preparación de superficies.",
    "M3 3h14v7H3zM17 6h4v8h-9v7",
  ],
  [
    "Impermeabilización",
    "Tratamientos para humedad, filtraciones y protección de azoteas.",
    "M12 2S5 10 5 15a7 7 0 0 0 14 0c0-5-7-13-7-13Z",
  ],
  [
    "Yeso",
    "Tabiques, cielorrasos, revestimientos y terminaciones en yeso.",
    "m12 2 10 6-10 6L2 8Zm-10 11 10 6 10-6M2 18l10 6 10-6",
  ],
  [
    "Reformas",
    "Renovación de baños, cocinas y otros espacios existentes.",
    "M2 3h20v18H2zM2 9h20M2 15h20M8 3v6m8 0v6m-8 0v6",
  ],
  [
    "Electricidad",
    "Instalaciones, reparaciones y adecuaciones eléctricas.",
    "m14 2-9 12h7l-2 8 9-13h-7Z",
  ],
].map(([name, description, icon]) => ({ name, description, icon }));
export function matchesService(category, service) {
  const aliases = {
    "Instalaciones sanitarias": ["Sanitaria"],
    "Pintura e impermeabilización": ["Pintura", "Impermeabilización"],
    "Yeso y obra seca": ["Yeso"],
    Mantenimiento: ["Mantenimiento edilicio"],
    "Electricidad y reparaciones": ["Electricidad"],
  };
  return category === service || (aliases[category] || []).includes(service);
}
