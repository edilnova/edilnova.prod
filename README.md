# EDILNOVA — portfolio en React

Sitio público estático con React y Vite. Los estilos están separados en estilos globales y CSS Modules para el portfolio y las secciones institucionales. Conserva servicios, contacto e identidad visual de la web original.

## Desarrollo

Desde esta carpeta:

```sh
npm install
npm run dev
```

Abrir la dirección que indique Vite. Para compilar: `npm run build`. Para revisar la compilación: `npm run preview`.

## Publicaciones

El editor de `../edilnova_localEditor` agrega publicaciones a `src/content/posts.json` y fotos a `public/uploads/`. El portfolio muestra filtros por categoría, trabajos ordenados por fecha y un detalle con galería. No incluye ejemplos ficticios.

El sitio público no tiene servidor de administración, login ni base de datos. El JSON se incorpora al compilar. Guardar una publicación en el editor no modifica el sitio ya desplegado.

## Vercel

1. Subir esta carpeta y su contenido a un repositorio. Si el repositorio contiene ambas carpetas, seleccionar **Root Directory: edilnova_prod**.
2. Seleccionar Vite y Node.js **24.x**. `vercel.json` declara instalación `npm ci`, Build Command `npm run build` y Output Directory `dist`. No se necesitan variables de entorno.
3. Después de cargar trabajos en el editor, incluir **el JSON y todas las fotos nuevas** en el commit y hacer push. El siguiente deploy incorporará los cambios.

El editor local no debe incluirse como aplicación en Vercel. No se realizó ningún deploy desde este cambio.

## Organización

- `src/components/Institutional.jsx`: cabecera, presentación, servicios, nosotros, contacto y pie.
- `src/components/Portfolio.jsx`: filtros, tarjetas y galería de trabajos.
- `src/components/Portfolio.module.css`: estilos del portfolio.
- `src/styles/Institutional.module.css`: estilos de las secciones originales.
- `src/styles/global.css`: tipografía, variables y elementos compartidos.
- `src/content/posts.json`: publicaciones.
- `public/uploads/`: fotografías locales para el deploy.

Contacto conservado: 099 292 463 / edilnova.uy@gmail.com.

## Deploy desde la terminal (alternativa)

Desde `edilnova_prod`, ejecutar `npx vercel` para vincular el proyecto y generar una vista previa. Una vez revisada, ejecutar `npx vercel --prod` para publicar en producción. Si Vercel pregunta la carpeta del código durante la vinculación desde esta carpeta, usar `./`.

Esta carpeta aún no está vinculada a un proyecto de Vercel. Para despliegues automáticos, conectar el repositorio desde el panel de Vercel. Si se sube únicamente el contenido de `edilnova_prod`, usar Root Directory `./`; si se suben ambas carpetas, usar `edilnova_prod`.

## Diseño y especialidades

Cabecera compacta, paleta naranja y azul oscuro, siete servicios enlazados al filtro del portfolio. El detalle organiza las fotografías por Antes, Durante, Después y Fotos según lo cargado en el editor. Las categorías anteriores combinadas siguen siendo visibles mediante sus especialidades correspondientes.

## Contactos y consulta de reparación

La sección principal presenta el diagnóstico, el detalle de trabajos y una cotización clara para reparaciones, reformas y mantenimiento. Como propuesta complementaria, la consulta de $600 UYU se ofrece cuando el operario considera que el cliente puede resolver la reparación siguiendo sus indicaciones. Si el cliente aplica lo indicado y no logra solucionarlo, el operario resuelve sin cargo adicional por el servicio; los materiales se cobran aparte.

Los contactos se mantienen ofuscados en el JavaScript público, sin números, nombres personales ni direcciones de correo en limpio en los archivos compilados. Se decodifican al renderizar, por lo que el visitante los ve normalmente sin tener que revelarlos. Los botones de WhatsApp, teléfono y correo construyen su destino al pulsarlos. Esto dificulta recolectores de código fuente; un bot que ejecute JavaScript puede leer los datos del DOM renderizado o decodificar el paquete. No se usa cifrado ni se requiere CAPTCHA o login.
