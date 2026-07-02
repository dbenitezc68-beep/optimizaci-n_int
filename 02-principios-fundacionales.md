# 02 — Principios fundacionales

Estado: **propuesto, pendiente de aprobación.**

Esta es la constitución de INTEREMPREX. Cada fase posterior (modelo de negocio, catálogo, arquitectura de la oferta...) se juzga contra este documento, no al revés: si una decisión futura contradice un principio de aquí, se cambia la decisión o se cambia el principio explícitamente — nunca se ignora en silencio.

## 1. Qué tipo de empresa queremos construir

Una empresa de tecnología pequeña y de alto margen, apalancada en software propio reutilizable — no una agencia de horas facturables. Cada cliente nuevo debe dejar el sistema más fuerte (mejora el CRM, el leadfinder, las plantillas internas), no ser un proyecto aislado que se construye desde cero.

## 2. Qué nunca hará INTEREMPREX

- Publicar una cifra, caso o resultado que no se pueda respaldar con datos reales.
- Competir por precio como estrategia permanente. El descuento de lanzamiento (Fase 1) es una excepción temporal y limitada, no el modelo.
- Entregar una plantilla genérica sin adaptar presentándola como "a medida".
- Aceptar un proyecto sin acceso real a los sistemas del cliente — rompe el método de implementación directa que es la base de la ventaja competitiva.
- Crecer el equipo antes de intentar resolver con software propio o automatización primero.
- Bloquear al cliente en un sistema que no pueda llevarse si se va (vendor lock-in punitivo).

## 3. Qué estándares de calidad tendrá

- Todo lo que sea aplicable se prueba primero internamente en las propias herramientas de INTEREMPREX antes de venderlo (dogfooding — ya es el caso con el CRM y leadfinder).
- Cero datos inventados en cualquier material de cara al cliente: web, propuestas, informes, casos.
- Todo compromiso de precio o plazo se documenta por escrito; se cumple o se renegocia explícitamente, nunca se incumple en silencio.
- Lo que se entrega debe ser mantenible por otra persona, no solo por el fundador — evita que toda la operación dependa de un único punto de fallo.

## 4. Principios innegociables

- No inventar datos, bajo ninguna circunstancia. (Ya era la regla de `gestion-interemprex`; aquí deja de ser una regla de una skill y pasa a ser principio de empresa.)
- Transparencia con el cliente sobre qué parte del trabajo es automatización/IA y qué parte es trabajo humano directo.
- El cliente es dueño de sus datos y sistemas.
- El cumplimiento legal (RGPD, facturación, contratos) no es "para más adelante" — se resuelve en la Fase 11 (Documentación), no se pospone indefinidamente.

## 5. Cómo tomaremos decisiones cuando haya varias opciones

Toda decisión relevante se justifica desde tres ángulos. Si no compite bien en al menos dos de los tres, se descarta:

1. **Valor para el cliente** — ¿resuelve un problema real y verificable?
2. **Rentabilidad para INTEREMPREX** — ¿el margen y el esfuerzo son sostenibles a escala, no solo en el primer proyecto?
3. **Automatización** — ¿esto se puede convertir en sistema reutilizable, o consume tiempo humano cada vez que se repite?

Ante la duda entre "vender más rápido" y "vender con datos reales", se elige lo segundo — ya se resolvió así al quitar las métricas inventadas en la Fase 1, y ese precedente es vinculante.

## 6. Qué significa "premium" para INTEREMPREX

No es precio alto por sí solo. Es: prueba verificable de capacidad (software propio que se puede enseñar, no prometer), selectividad real (rechazar activamente al cliente que no encaja, según el criterio del punto 9), ejecución directa sin intermediarios, y ausencia total de relleno — sin stock photos, sin cifras vacías, sin jerga de moda sin sustancia detrás. Comportarse como si cada cliente fuera una referencia pública, incluso el primero.

## 7. Qué tareas automatizaremos siempre antes de contratar personas

- Prospección y generación de leads (ya resuelto: `leadfinder`).
- Seguimiento de pipeline, pagos y facturación (ya resuelto: `interemprex-dashboard` + Stripe).
- Cualquier tarea repetitiva de reporting o extracción/consolidación de datos.

Regla general: antes de contratar a alguien para una tarea, primero se evalúa si esa tarea se puede convertir en herramienta interna reutilizable. Es el mismo ADN que ya produjo el CRM y el leadfinder — construir la herramienta antes que añadir manos.

## 8. Qué tecnologías evitaremos aunque sean populares

- Cualquier plataforma cerrada que no permita al cliente exportar su web, sus datos o su código si se va (contradice el punto 2).
- Adoptar una herramienta de moda sin necesidad real del cliente detrás, solo por marketing propio — especialmente con IA: no se vende la etiqueta "IA" sin una automatización real que la sostenga.
- Cualquier tecnología fuera del stack ya dominado (Next.js/TypeScript/Prisma, Python) sin una razón de negocio concreta que lo justifique — la dispersión técnica es un coste oculto en una operación pequeña.

## 9. Criterios para aceptar o rechazar clientes

Heredado y fijado desde la Fase 1, ahora como criterio permanente:

- Debe dar acceso real a sus sistemas — sin eso, el método de implementación directa no funciona.
- Debe tener intención de continuidad, no solo un encargo puntual — el modelo de ingresos depende de recurrencia (se define en Fase 2).
- No puede exigir garantías de resultado de marketing en plazos irreales.
- Debe tener capacidad de pago sostenible: el precio de lanzamiento es una puerta de entrada, no la expectativa de precio permanente del cliente.

## 10. Cómo mediremos el éxito dentro de 5 años

Aquí no se fija una cifra — poner un número de facturación ahora sería inventar un dato, exactamente lo que este documento prohíbe en el punto 2. Lo que sí se fija es la **forma** de medir, y las cifras reales se calculan en la Fase 13 (Finanzas) con datos reales de la empresa:

- Proporción de ingresos recurrentes (mantenimiento, suscripciones) frente a proyectos puntuales — cuánto del ingreso es predecible.
- Proporción de trabajo interno cubierto por herramientas propias frente a horas humanas.
- Retención y renovación de clientes existentes, no solo captación de clientes nuevos.

---

## Cómo se usa este documento

A partir de aquí, cada fase del roadmap debe, antes de cerrarse:

1. Declarar qué depende de fases anteriores y qué decisiones de esas fases la condicionan.
2. Justificar cada recomendación relevante desde los tres ángulos del punto 5.
3. Señalar explícitamente si contradice algún principio de este documento — y si es así, decidir conscientemente si se cambia la decisión o se reescribe el principio, nunca ambas cosas en silencio.
