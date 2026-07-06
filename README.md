# optimizaci-n_int — Estrategia INTEREMPREX

Repositorio de documentación estratégica de INTEREMPREX. Aquí vive el plan de negocio, fase a fase, con las decisiones tomadas y el porqué de cada una. El código sigue viviendo en sus propios repos — este es el índice y la memoria de las decisiones, no el producto.

Empieza por [`00-metodologia.md`](./00-metodologia.md) — rige cómo se construye cada documento de este repositorio, es de lectura obligatoria antes de cualquier fase. Después, [`enterprise-blueprint.md`](./enterprise-blueprint.md) — el plano maestro que conecta cada bloque estratégico con el documento que lo desarrolla.

**[`production-readiness-review.md`](./production-readiness-review.md)** — evaluación puntual (no un documento vivo): ¿puede INTEREMPREX vender mañana sin poner en riesgo la empresa? Veredicto: GO CON RESTRICCIONES, con el camino crítico mínimo al primer cliente real. Léase antes de decidir si la prioridad es seguir diseñando o empezar a vender.

**Documentos vivos** (no son fases, se actualizan de forma continua):
- [`fdi-registro.md`](./fdi-registro.md) — Founder Dependency Index: cuánto depende cada proceso del fundador. Definición en `00-metodologia.md`.
- [`kpis.md`](./kpis.md) — registro oficial de indicadores de toda la empresa; cada fase añade solo los suyos. Resuelve el bloque KPIs de `enterprise-blueprint.md` sin necesidad de una fase 16.
- [`inventario-tecnologico.md`](./inventario-tecnologico.md) — inventario oficial: repos, apps, dominios, bases de datos, APIs, proveedores, credenciales (solo referencia), dependencias entre sistemas.
- [`capacidades-ia.md`](./capacidades-ia.md) — registro de toda capacidad de IA detectada en el código, dónde está, qué modelo usa, y si está integrada en la oferta.
- [`capacidades-core.md`](./capacidades-core.md) — inventario de capacidades reales (tecnología/conocimiento ya construido); todo servicio del catálogo debe apoyarse en una o varias.
- [`flywheel-comercial.md`](./flywheel-comercial.md) — estado objetivo del flujo comercial completo (LeadFinder → ... → Nuevas oportunidades), contrastado eslabón a eslabón contra lo que existe hoy.
- [`duplicidad-paneles-gestion.md`](./duplicidad-paneles-gestion.md) — hechos sobre los dos paneles de gestión interna, sin resolución todavía (se decide en Fase 8).
- [`auditoria-preventiva-leadfinder.md`](./auditoria-preventiva-leadfinder.md) — hechos sobre fuentes, licencias, almacenamiento, retención y accesos de datos en `leadfinder`, sin propuesta legal (entrada de hechos para Fase 5). Incluye verificación puntual de una credencial por defecto (2026-07-02).
- [`bci-registro.md`](./bci-registro.md) — Business Criticality Index: impacto de la pérdida temporal de cada capacidad, sistema o proceso. Complementario al FDI. Definición en `00-metodologia.md`.
- [`priorizacion.md`](./priorizacion.md) — toda incidencia/deuda técnica/riesgo clasificado en 5 dimensiones (impacto, esfuerzo, urgencia, dependencia, riesgo de no actuar); consolida lo detectado en fases anteriores.
- [`modelo-precios.md`](./modelo-precios.md) — el procedimiento de 8 factores para calcular precios (no cifras); se aplica en Fase 7 y Fase 14.

## Ecosistema real (verificado, no aspiracional)

| Repo | Qué es | Estado |
|---|---|---|
| [interemprex](https://github.com/dbenitezc68-beep/interemprex) | Web pública de INTEREMPREX | Copy en revisión (Fase 1) |
| [interemprex-dashboard](https://github.com/dbenitezc68-beep/interemprex-dashboard) | CRM interno propio (Next.js + Prisma + Stripe): clientes, pipeline, tareas, pagos/MRR | Funcional, uso local (SQLite) |
| [leadfinder](https://github.com/dbenitezc68-beep/leadfinder) | Motor de prospección propio (OpenStreetMap): encuentra y puntúa negocios sin web | Funcional |
| [bbabogados](https://github.com/dbenitezc68-beep/bbabogados) | Proyecto piloto — despacho de abogados | En producción (Vercel) |
| [costafloragardens](https://github.com/dbenitezc68-beep/costafloragardens) | Proyecto piloto — jardinería | Construido, sin desplegar |

## Roadmap por fases

Orden fijado el 2026-07-02, ampliado el 2026-07-02 con una fase de Legal y Cumplimiento propia. La web sigue siendo consecuencia de la estrategia, no la estrategia en sí — "Página web" se mantiene cerca del final. No se toca `interemprex/index.html` hasta cerrar Posicionamiento, Modelo de negocio, Arquitectura de la oferta, Catálogo de servicios y Customer Journey como mínimo.

Cada fase termina con aprobación explícita antes de empezar la siguiente. No se avanza fase sin cerrar la anterior.

- [x] `00-metodologia.md` — metodología permanente de trabajo (proceso), incluye la definición del FDI
- [x] **Fase 1 — Posicionamiento** → [`01-posicionamiento.md`](./01-posicionamiento.md)
- [x] **Principios fundacionales** (constitución de contenido) → [`02-principios-fundacionales.md`](./02-principios-fundacionales.md) — aprobado por uso
- [x] **Fase 2 — Modelo de negocio** → [`03-modelo-negocio.md`](./03-modelo-negocio.md) — aprobado (v7)
- [x] **Fase 3 — Arquitectura de la oferta** → [`04-arquitectura-oferta.md`](./04-arquitectura-oferta.md) — aprobado (v2)
- [x] **Fase 4 — Catálogo de servicios (arquitectura comercial)** → [`05-catalogo-servicios.md`](./05-catalogo-servicios.md) — aprobado (v2), estándar permanente; cada servicio responde 10 preguntas obligatorias; hallazgo confirmado: "Gestión del crecimiento" de Motor B solo tiene capacidad parcial; pendiente abierta en `priorizacion.md`: cuándo construir esa capacidad
- [ ] **Fase 5 — Legal y Cumplimiento** → [`06-legal-cumplimiento.md`](./06-legal-cumplimiento.md) — pendiente de aprobación definitiva; marco normativo (RGPD, LOPDGDD, LSSI-CE, ODbL), matriz de cumplimiento, 9 riesgos legales (L1-L9). **No sustituye revisión legal profesional.** Ver razonamiento de ubicación más abajo.
- [ ] Fase 6 — Customer Journey
- [ ] Fase 7 — Sistema comercial
- [ ] Fase 8 — Operaciones — **debe existir `arquitectura-empresarial.md` antes de darse por cerrada** (ver más abajo)
- [ ] Fase 9 — Automatizaciones
- [ ] Fase 10 — IA
- [ ] Fase 11 — Tecnología
- [ ] Fase 12 — Marketing
- [ ] Fase 13 — Página web
- [ ] Fase 14 — Finanzas
- [ ] Fase 15 — Roadmap de ejecución

La numeración de archivo no coincide 1:1 con el número de fase: `00` y `02` son documentos de gobierno (proceso y constitución), no fases del negocio en sí. Ver [`00-metodologia.md`](./00-metodologia.md) para el formato obligatorio que sigue cada fase a partir de aquí.

### Por qué Legal va en la posición 5

Necesita conocer la oferta (Fase 4, Catálogo) para redactar con precisión licencias y propiedad intelectual — por eso no va antes. Pero debe existir antes de diseñar el Customer Journey y el Sistema comercial, porque los contratos, las condiciones y el tratamiento de datos determinan puntos de contacto reales con el cliente — por eso no va después. La parte de "uso de IA" es una excepción: no puede cerrarse del todo hasta que la Fase 10 (IA) exista, así que Fase 5 cubre el marco general y queda pendiente una revisión secundaria tras la Fase 10.

La exposición legal de `leadfinder` (scraping de datos de terceros) y de `interemprex-dashboard` (datos reales de cliente) ya es real hoy, no solo cuando el roadmap llegue a la Fase 5 en su orden — ver pregunta 7 en `03-modelo-negocio.md`.

### Arquitectura Empresarial

Antes de cerrar la Fase 8 (Operaciones) debe existir `arquitectura-empresarial.md`: un mapa de Empresa → Áreas → Procesos → Sistemas → Herramientas → Automatizaciones → Responsables → KPIs, en el que toda la documentación futura debe poder ubicarse. No se construye todavía — depende de que Áreas, Procesos y Sistemas estén definidos en las fases previas. **No es lo mismo que `enterprise-blueprint.md`**: el blueprint mapea la cadena estratégica de documentos (Visión → ... → KPIs); `arquitectura-empresarial.md` mapeará la realidad organizativa (áreas, sistemas, responsables) — son complementarios, no duplicados.

### KPIs — resuelto sin fase propia

`enterprise-blueprint.md` termina la cadena en KPIs. En vez de crear una Fase 16, KPIs vive como documento permanente (`kpis.md`), igual que `fdi-registro.md`: cada fase añade solo los indicadores que le corresponden, sin esperar a un cierre único.

## Principio del proceso

Ningún dato de negocio (precios, cifras, resultados de cliente, proyecciones financieras) se inventa. Si el dato no existe todavía, se marca explícitamente como pendiente en vez de rellenarse con un placeholder que parezca real.
