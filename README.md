# optimizaci-n_int — Estrategia INTEREMPREX

Repositorio de documentación estratégica de INTEREMPREX. Aquí vive el plan de negocio, fase a fase, con las decisiones tomadas y el porqué de cada una. El código sigue viviendo en sus propios repos — este es el índice y la memoria de las decisiones, no el producto.

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

- [x] **Fase 1 — Posicionamiento** → [`01-posicionamiento.md`](./01-posicionamiento.md)
- [ ] **Principios fundacionales** (constitución, no cuenta como fase numerada) → [`02-principios-fundacionales.md`](./02-principios-fundacionales.md) — propuesto, pendiente de aprobación
- [ ] Fase 2 — Modelo de negocio
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

## Metodología a partir de la Fase 2

Nivel de exigencia elevado desde aquí: no se documentan listas de ideas, se diseña un sistema empresarial donde cada pieza encaja con las demás. Cada fase debe, antes de cerrarse:

1. **Declarar dependencias** — qué decisiones de fases anteriores la condicionan, y qué de esta fase condiciona a las siguientes.
2. **Cuestionar la escalabilidad** — señalar explícitamente cualquier decisión que limite crecer de 1 a 100 clientes, aunque funcione bien con el primero.
3. **Justificar cada recomendación relevante desde tres ángulos**: valor para el cliente, rentabilidad para INTEREMPREX, y posibilidad de automatización. Si una opción no compite bien en al menos dos de los tres, se descarta.
4. **Contrastarla contra `02-principios-fundacionales.md`** — si contradice un principio, se decide conscientemente cambiar la decisión o reescribir el principio; nunca se ignora en silencio.

## Principio del proceso

Ningún dato de negocio (precios, cifras, resultados de cliente, proyecciones financieras) se inventa. Si el dato no existe todavía, se marca explícitamente como pendiente en vez de rellenarse con un placeholder que parezca real.
