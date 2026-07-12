# Fase 1 — Posicionamiento

Estado: **aprobado**, pendiente de implementar en `interemprex/index.html` y `interemprex/precios-y-packs.md`.

## Titular

> Construimos el software que hace operar tu negocio. Lo probamos primero con el nuestro.

## Quiénes somos

Empresa de tecnología, no agencia de marketing. Diseñamos e implementamos software, automatización e IA aplicada sobre problemas operativos reales — construido primero para nuestra propia operación (CRM propio, motor de prospección propio) antes de ofrecerlo a nadie.

## Qué hacemos

Soluciones personalizadas sobre una base de software propia: automatización de procesos, agentes e IA aplicada, integraciones y APIs, dashboards a medida, y la infraestructura que lo sostiene todo. Implementación directa sobre los sistemas reales del cliente, no plantilla adaptada.

El listado completo de servicios con precio, cliente ideal y margen va en la Fase 4 (Catálogo de servicios) [corregido 2026-07-12: la numeración original decía "Fase 3", desfasada tras insertar Legal como Fase 5] — aquí solo entra la categoría, no el inventario de herramientas.

## Por qué somos diferentes

La mayoría de agencias de "digitalización" no tienen tecnología propia que enseñar. INTEREMPREX sí: el CRM interno (`interemprex-dashboard`) y el motor de prospección (`leadfinder`) son la prueba, no la promesa.

## Qué problema resolvemos

Pymes españolas con procesos manuales (Excel disperso, sin CRM, sin pipeline de ventas, sin presencia digital que convierta) que no tienen tiempo ni conocimiento técnico para digitalizarse solas.

## Qué clientes rechazamos

- El que busca "lo más barato posible" y no da acceso real a sus sistemas — el método de implementación directa no funciona sin eso.
- El proyecto de encargo único sin intención de continuidad — el modelo de ingresos (Fase 2) depende de mantenimiento/suscripción, no solo de proyectos sueltos.
- Cualquier cliente que exija garantizar resultados de marketing en un plazo irreal.

## Mercado

Horizontal en el mensaje público: "procesos operativos complejos, cualquier sector" — no se ancla la marca a un nicho todavía. Foco táctico privado en 1-2 sectores se decide en Fase 9 (Automatizaciones/prospección) [corregido 2026-07-12: la numeración original decía "Fase 6", que hoy es Customer Journey; Automatizaciones es la Fase 9], porque leadfinder necesita categorías OSM concretas para operar; es una decisión de configuración, no de copy.

Evidencia real actual: un despacho de abogados (bbabogados) y una empresa de jardinería (costafloragardens) — ninguno de los dos encaja limpiamente con "procesos operativos complejos" ni con la tesis original de import/export del copy antiguo. Dato honesto: hoy no hay todavía evidencia que respalde un nicho concreto.

## Ventaja competitiva

1. Software propio, usado internamente antes de venderlo — es demo, no promesa.
2. No vendemos ese software fijo: construimos soluciones a medida sobre él.
3. Pipeline propio vía leadfinder, no dependencia total de marketing de terceros.
4. Tarifa de lanzamiento por tiempo limitado para proyectos seleccionados (tope real gestionado en privado, ver más abajo).

## Percepción deseada en la web

Empresa de producto que hace consultoría, no agencia de marketing genérica. Estética tipo Linear/Vercel (la base tipográfica actual, Space Grotesk/Inter, ya apunta ahí). Evidencia técnica real en vez de stock photos. Cero cifras sin respaldo.

---

## Correcciones aprobadas sobre el estado actual de la web

**1. Sección "Misiones completadas" (`interemprex/index.html`, líneas 517-522)**
Presenta −80% tareas manuales, 25→1 proveedores y "0 errores" como caso cerrado de un cliente real ("Distribución alimentaria"). Confirmado: es ilustrativo, no real. Se sustituye por una sección **"Cómo trabajamos"**: dashboard + leadfinder como prueba técnica, bbabogados y costaflora presentados como **"proyectos piloto en marcha"**, sin cifras inventadas.

**2. Precio de lanzamiento**
Wording público: *"Tarifa de lanzamiento disponible por tiempo limitado, para un número reducido de proyectos seleccionados."* No se publica el número de plazas ni la fecha — comunica escasez por elección, no por falta de clientes.

Tope real, gestionado en privado (no en la web): **3 clientes cerrados desde el 2026-07-02, o hasta el 2026-09-30, lo que ocurra antes.** Cuando se cumpla, la oferta se retira de verdad — si "por tiempo limitado" deja de ser cierto, es el mismo problema que la métrica inventada del punto 1, solo que reubicado.

---

## Registro de decisiones (por qué quedó así y no de otra forma)

| Decisión | Alternativa descartada | Motivo |
|---|---|---|
| Reposicionar como "empresa de tecnología", no agencia | Mantener framing de "agencia de digitalización operativa" | El propio software interno (dashboard, leadfinder) hace la afirmación literal, no aspiracional |
| Evitar "consultora especializada en digitalización, automatización e IA para pymes" en el titular | Usar esa frase (propuesta inicial del usuario) | Es la frase genérica que usa toda la competencia desde 2023; premium se transmite con especificidad y prueba, no con la lista de categorías |
| Mercado horizontal en el mensaje, sin nicho de sector en el copy | Anclar a un sector (import/export, o el original del sitio) | La evidencia real actual (bbabogados, costaflora) no respalda ningún nicho concreto todavía; forzar uno sería inventar una tesis sin datos |
| Descuento con tope real pero número no publicado | Publicar "primeros 3 clientes" | Publicar el número comunica "no tenemos clientes"; ocultarlo y mantener selección privada es más premium, siempre que el tope siga siendo real |
| Quitar "Misiones completadas" con cifras inventadas | Mantenerlas como "ejemplo ilustrativo" con aviso pequeño | Riesgo de publicidad engañosa si un prospecto las lee como reales; más barato en confianza quitarlas que arriesgarse |

---

**Qué modifica**: fija el mensaje público de marca, el criterio de aceptación/rechazo de clientes, y sustituye la sección de resultados inventados por "Cómo trabajamos".

**Qué documentos dependen de este**: `02-principios-fundacionales.md` (hereda el criterio de qué significa "premium"), `03-modelo-negocio.md` (hereda el rechazo a clientes sin continuidad), `04-arquitectura-oferta.md` (hereda "pensar en plataformas, no en servicios"), y la futura Fase 13 (Página web), que implementa este copy directamente.

**Qué documentos deben revisarse si este cambia**: todos los anteriores — un cambio de posicionamiento obliga a revisar si el modelo de negocio, la arquitectura de la oferta y el futuro copy web siguen siendo coherentes con el nuevo mensaje.
