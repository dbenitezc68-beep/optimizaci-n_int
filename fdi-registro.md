# FDI — Registro de procesos

Registro vivo del Founder Dependency Index. Escala y reglas definidas en [`00-metodologia.md`](./00-metodologia.md). No es una fase — es un rastro continuo que se actualiza cada vez que una fase documenta, crea o modifica un proceso. No tiene número de fase porque no representa una decisión puntual, sino un estado que cambia con el tiempo.

## Registro

| Proceso | Nivel | Puntuación | Fase de origen | Nota |
|---|---|---|---|---|
| Cierre de ventas / conversión de Motor A a Motor B | Exclusivo del fundador | 3 | Fase 2 — Modelo de negocio (riesgo R2) | Sin proceso comercial documentado todavía |
| Desarrollo y mantenimiento del stack propio (dashboard, leadfinder) | Exclusivo del fundador | 3 | Fase 2 — Modelo de negocio (riesgo R12) | Único desarrollador; sin continuidad documentada |
| Ejecución de un "proyecto tipo" de implementación (Motor A) | Exclusivo del fundador | 3 | Fase 2 — Modelo de negocio (riesgo R7) | No existe plantilla ni proceso escrito |
| Generación de pipeline de leads (`leadfinder`) | Automatizado | 0 | Fase 0 — Análisis inicial | Ya corre con scheduler propio (`ENABLE_INPROCESS_SCHEDULER`), sin intervención habitual |
| Sincronización de pagos y MRR (Stripe vía `interemprex-dashboard`) | Automatizado | 0 | Fase 0 — Análisis inicial | Webhooks gestionan el flujo sin intervención manual |
| Comprensión global de cómo funciona la empresa (onboarding de una persona nueva) | Totalmente documentado | 1 | Fase 3 — Arquitectura de la oferta | Antes de `enterprise-blueprint.md` esto era "Exclusivo del fundador" (nadie más podía explicar el sistema completo); el blueprint lo documenta, aunque ejecutar cada pieza siga dependiendo de otros procesos con su propio nivel |
| Saber qué servicio se vende, a qué nivel y por qué precio | Totalmente documentado | 1 | Fase 4 — Catálogo de servicios | Antes de `05-catalogo-servicios.md` esto vivía solo en la cabeza del fundador (qué se puede vender hoy y qué no); ahora está escrito y es la fuente única de verdad |
| Decidir qué incidencia/mejora/riesgo se atiende primero | Totalmente documentado | 1 | Fase 4 — mejoras estructurales | Antes de `priorizacion.md` esta decisión era intuitiva y solo del fundador; ahora sigue un criterio de 5 dimensiones escrito y consultable |
| Calcular el precio de un servicio nuevo o una cotización caso a caso | Totalmente documentado | 1 | Fase 4 — mejoras estructurales | Antes de `modelo-precios.md` esto era criterio personal del fundador; ahora es un procedimiento de 8 pasos, aunque las cifras finales sigan pendientes de datos reales (Fase 14) |
| Mantener y revisar el cumplimiento legal (LIA, avisos, DPAs) | Exclusivo del fundador | 3 | Fase 5 — Legal y Cumplimiento | `06-legal-cumplimiento.md` documenta qué hay que hacer, pero no existe todavía un proceso periódico de revisión — es la excepción a la mejora general de esta fase, declarada honestamente en vez de omitida |

**FDI medio actual (10 procesos registrados): 1,5 / 3.** Cifra orientativa — sube respecto a la ronda anterior porque el nuevo proceso de cumplimiento legal entra con dependencia alta del fundador; es un resultado esperado de auditar un área nueva, no un retroceso de las mejoras ya conseguidas en las demás.

## Cómo se actualiza este registro

Cada fase que documenta, crea o rediseña un proceso añade una fila aquí, citando la fase de origen. Cuando una fase posterior cambia el nivel de un proceso ya existente (por ejemplo, documentar el cierre de ventas y moverlo de "Exclusivo del fundador" a "Totalmente documentado"), se actualiza la fila existente y se anota en la columna de nota qué fase hizo el cambio y cuándo.
