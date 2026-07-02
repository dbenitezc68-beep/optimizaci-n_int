# optimizaci-n_int — Estrategia INTEREMPREX

Repositorio de documentación estratégica de INTEREMPREX. Aquí vive el plan de negocio, fase a fase, con las decisiones tomadas y el porqué de cada una. El código sigue viviendo en sus propios repos — este es el índice y la memoria de las decisiones, no el producto.

Empieza por [`00-metodologia.md`](./00-metodologia.md) — rige cómo se construye cada documento de este repositorio, es de lectura obligatoria antes de cualquier fase.

## Ecosistema real (verificado, no aspiracional)

| Repo | Qué es | Estado |
|---|---|---|
| [interemprex](https://github.com/dbenitezc68-beep/interemprex) | Web pública de INTEREMPREX | Copy en revisión (Fase 1) |
| [interemprex-dashboard](https://github.com/dbenitezc68-beep/interemprex-dashboard) | CRM interno propio (Next.js + Prisma + Stripe): clientes, pipeline, tareas, pagos/MRR | Funcional, uso local (SQLite) |
| [leadfinder](https://github.com/dbenitezc68-beep/leadfinder) | Motor de prospección propio (OpenStreetMap): encuentra y puntúa negocios sin web | Funcional |
| [bbabogados](https://github.com/dbenitezc68-beep/bbabogados) | Proyecto piloto — despacho de abogados | En producción (Vercel) |
| [costafloragardens](https://github.com/dbenitezc68-beep/costafloragardens) | Proyecto piloto — jardinería | Construido, sin desplegar |

## Roadmap por fases

Orden fijado el 2026-07-02: la web es consecuencia de la estrategia, no la estrategia en sí — por eso "Página web" se mueve al final, justo antes de Finanzas y Roadmap de ejecución. No se toca `interemprex/index.html` hasta cerrar Posicionamiento, Modelo de negocio, Arquitectura de la oferta, Catálogo de servicios y Customer Journey como mínimo.

Cada fase termina con aprobación explícita antes de empezar la siguiente. No se avanza fase sin cerrar la anterior.

- [x] `00-metodologia.md` — metodología permanente de trabajo (proceso)
- [x] **Fase 1 — Posicionamiento** → [`01-posicionamiento.md`](./01-posicionamiento.md)
- [x] **Principios fundacionales** (constitución de contenido) → [`02-principios-fundacionales.md`](./02-principios-fundacionales.md) — aprobado por uso: el usuario construye la metodología y la Fase 2 directamente sobre él sin objeciones
- [ ] **Fase 2 — Modelo de negocio** → [`03-modelo-negocio.md`](./03-modelo-negocio.md) — propuesto, pendiente de aprobación
- [ ] Fase 3 — Arquitectura de la oferta
- [ ] Fase 4 — Catálogo de servicios
- [ ] Fase 5 — Customer Journey
- [ ] Fase 6 — Sistema comercial
- [ ] Fase 7 — Operaciones
- [ ] Fase 8 — Automatizaciones
- [ ] Fase 9 — IA
- [ ] Fase 10 — Tecnología
- [ ] Fase 11 — Marketing
- [ ] Fase 12 — Página web
- [ ] Fase 13 — Finanzas
- [ ] Fase 14 — Roadmap de ejecución

La numeración de archivo no coincide 1:1 con el número de fase: `00` y `02` son documentos de gobierno (proceso y constitución), no fases del negocio en sí. Ver [`00-metodologia.md`](./00-metodologia.md) para el formato obligatorio que sigue cada fase a partir de aquí.

## Principio del proceso

Ningún dato de negocio (precios, cifras, resultados de cliente, proyecciones financieras) se inventa. Si el dato no existe todavía, se marca explícitamente como pendiente en vez de rellenarse con un placeholder que parezca real.
