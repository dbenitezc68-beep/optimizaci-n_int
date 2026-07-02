# Enterprise Blueprint — INTEREMPREX

El plano maestro del proyecto. No es un índice de archivos (eso es `README.md`) — es la cadena de dependencia estratégica: cada bloque solo tiene sentido si el bloque anterior ya está resuelto, y cambiar un bloque obliga a revisar todo lo que cuelga de él hacia abajo. Toda la documentación futura debe poder ubicarse en este mapa.

## Capa transversal (no es un bloque, rige a todos)

`00-metodologia.md` (proceso obligatorio, FDI) y `02-principios-fundacionales.md` (constitución de contenido) no ocupan una posición en la cadena — actúan sobre todos los bloques a la vez. Todo bloque se valida contra ambos.

## La cadena

```
Visión
  ↓
Constitución
  ↓
Modelo de negocio
  ↓
Arquitectura de la oferta
  ↓
Catálogo
  ↓
Legal
  ↓
Customer Journey
  ↓
Sistema comercial
  ↓
Operaciones
  ↓
Automatizaciones
  ↓
IA
  ↓
Tecnología
  ↓
Marketing
  ↓
Finanzas
  ↓
KPIs
```

## Detalle por bloque

| # | Bloque | Documento que lo desarrolla | Depende de | Estado |
|---|---|---|---|---|
| 1 | Visión | `01-posicionamiento.md` | — (es el origen) | Cerrado |
| 2 | Constitución | `02-principios-fundacionales.md` | Visión | Cerrado (autoridad transversal, ver arriba) |
| 3 | Modelo de negocio | `03-modelo-negocio.md` (v4) | Visión, Constitución | Cerrado |
| 4 | Arquitectura de la oferta | `04-arquitectura-oferta.md` | Modelo de negocio | Pendiente de aprobación definitiva |
| 5 | Catálogo | *(futuro, `05-catalogo-servicios.md`)* | Arquitectura de la oferta | Pendiente |
| 6 | Legal | *(futuro, `06-legal-cumplimiento.md`)* — hechos preliminares ya en `auditoria-preventiva-leadfinder.md` | Catálogo (licencias/IP), Modelo de negocio (qué datos maneja cada motor) | Pendiente — auditoría de hechos de LeadFinder ya iniciada |
| 7 | Customer Journey | *(futuro)* | Arquitectura de la oferta (empaquetado), Legal (consentimientos/contratos en el journey) | Pendiente |
| 8 | Sistema comercial | *(futuro)* | Customer Journey, Arquitectura de la oferta (cláusula de empaquetado), Legal (contratos) | Pendiente |
| 9 | Operaciones | *(futuro)* — requiere `arquitectura-empresarial.md` antes de cerrarse | Sistema comercial (qué se vendió, hay que ejecutarlo), Modelo de negocio (motores) | Pendiente |
| 10 | Automatizaciones | *(futuro)* | Operaciones (qué procesos existen), `fdi-registro.md` (qué automatizar primero) | Pendiente |
| 11 | IA | *(futuro)* | Automatizaciones (una automatización con IA es un caso particular) | Pendiente |
| 12 | Tecnología | *(futuro)* — ya tiene tareas asignadas: backups (R6), disparadores de SQLite (R5), base técnica del motor D | Automatizaciones, IA (qué stack las soporta), Modelo de negocio (motor D) | Pendiente |
| 13 | Marketing | *(futuro)* | Visión (mensaje), Catálogo (qué se promociona), Customer Journey (embudo) | Pendiente |
| 14 | Finanzas | *(futuro)* | Todos los bloques anteriores — es donde se calculan cifras reales de todo lo diseñado | Pendiente |
| 15 | KPIs | **no existe todavía ni tiene fase asignada** | Operaciones (KPIs de proceso), Sistema comercial (KPIs comerciales), Finanzas (KPIs financieros) | **Gap detectado, ver más abajo** |

## Capas de salida (no son bloques de decisión, son consecuencia de la cadena)

- **Página web** (Fase 13 del roadmap): no aparece como bloque propio en esta cadena porque es un derivado — su contenido depende de prácticamente todos los bloques de arriba (Visión para el mensaje, Catálogo para lo que ofrece, Legal para privacidad/cookies, Marketing para el embudo). Por eso el roadmap la sitúa cerca del final: es una salida, no una decisión.
- **Roadmap de ejecución** (Fase 15 del roadmap): tampoco es un bloque de contenido — es la secuenciación temporal de implementar todo lo anterior, no una decisión de diseño.

## Gap detectado: KPIs no tiene fase propia

El roadmap de 15 fases (`README.md`) no incluye una fase dedicada a "KPIs" — el usuario la pidió como último bloque de la cadena, pero hoy los indicadores quedarían distribuidos entre Operaciones, Sistema comercial y Finanzas sin que exista un documento que los consolide. No se decide aquí si se crea una fase 16 o si KPIs se resuelve como una sección transversal dentro de Finanzas — queda como pregunta abierta.

---

**Qué modifica**: no fija ninguna decisión de negocio nueva — es la vista consolidada del grafo de dependencia entre todos los documentos del proyecto.

**Qué documentos dependen de este**: ninguno depende de su contenido (no fija reglas), pero todos los documentos futuros deben registrarse aquí al cerrarse, y toda persona nueva en el proyecto debería empezar por este documento después de `00-metodologia.md`.

**Qué documentos deben revisarse si este cambia**: `README.md` (el roadmap debe mantenerse coherente con esta cadena).

**Qué documentos deben revisarse si cambia algún bloque de la cadena**: este documento — cada vez que una fase se cierre, se actualiza su fila en la tabla de arriba.
