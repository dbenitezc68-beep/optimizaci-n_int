# Capacidades Core — INTEREMPREX

No es un catálogo de servicios — es el inventario de **capacidades reales** (tecnología, conocimiento y procesos ya construidos) sobre las que Fase 4 debe construir cada servicio. Regla desde aquí: **ningún servicio del catálogo se define sin apoyarse en una o varias capacidades de este documento.** Si un servicio no tiene ninguna capacidad Core detrás, no es un servicio vendible todavía — es una ambición, y se marca como tal.

## Capacidades reales (con evidencia verificada)

### 1. Desarrollo web a medida

- **Descripción**: sitios web implementados directamente en HTML/CSS/JS, sin plantillas ni page builders, con SEO técnico básico integrado desde el diseño.
- **Tecnologías**: HTML5, CSS3, JavaScript vanilla, GSAP (animaciones), Google Fonts.
- **Motores donde participa**: Motor A (etapas Diagnóstico e Implementación).
- **Reutilización**: alta — mismo patrón ya usado en 3 proyectos reales (`interemprex`, `bbabogados`, `costafloragardens`), aunque cada uno se construyó desde cero, no desde una base común todavía.
- **Nivel de madurez**: alta — 3 casos reales, 1 confirmado en producción.
- **Dependencia del fundador**: alta. FDI = "Exclusivo del fundador" (ya registrado en `fdi-registro.md` como "ejecución de un proyecto tipo de implementación").
- **Potencial de automatización**: medio — un starter kit reutilizable reduciría tiempo de entrega y FDI; no existe todavía.

### 2. CRM / gestión comercial propia

- **Descripción**: gestión de clientes, pipeline de ventas, tareas y pagos/suscripciones en un panel único.
- **Tecnologías**: Next.js 16, Prisma 7, SQLite, Stripe, JWT + bcrypt.
- **Motores donde participa**: Motor B (ambas líneas, como sistema de gestión interno); candidato natural de Motor D si se productiza en el futuro.
- **Reutilización**: hoy uso interno único — no se ha reutilizado todavía en ningún cliente.
- **Nivel de madurez**: media-alta — funcional, con dos incidencias abiertas (R5 base single-tenant, R13 sin repositorio remoto).
- **Dependencia del fundador**: alta. FDI = "Exclusivo del fundador" (ya registrado como "desarrollo y mantenimiento del stack propio").
- **Potencial de automatización**: alto en su función (sincroniza pagos solo, vía webhooks); bajo en su propio mantenimiento.

### 3. Prospección automatizada (scraping + scoring)

- **Descripción**: encuentra negocios sin presencia web, los puntúa por potencial comercial, con cobertura rotativa por provincia.
- **Tecnologías**: FastAPI, SQLAlchemy, APScheduler, API de Overpass (OpenStreetMap).
- **Motores donde participa**: no es un motor de ingresos en sí — alimenta la entrada del funnel, antes de Motor A. Candidato a Motor D si se ofrece a terceros (ya anotado como observación en `04-arquitectura-oferta.md`).
- **Reutilización**: alta — cubre cualquier provincia española por configuración, sin cambio de código.
- **Nivel de madurez**: alta — con autenticación, scoring, exportación e historial de ejecuciones.
- **Dependencia del fundador**: alta para mantenimiento (FDI = "Exclusivo del fundador", registrado); baja para operación diaria (ya automatizada vía scheduler).
- **Potencial de automatización**: ya alto en operación — el eslabón débil es la conexión manual al CRM (ver `flywheel-comercial.md`).

### 4. Automatización con IA aplicada

- **Descripción**: generación de resumen y propuesta de abordaje sobre un registro (hoy, un lead), usando un modelo de lenguaje.
- **Tecnologías**: API de Anthropic, modelo Claude Haiku 4.5.
- **Motores donde participa**: Motor C — es, en sí misma, el prototipo real de lo que sería un servicio de automatización con IA a medida.
- **Reutilización**: el patrón (llamar a un LLM sobre un registro estructurado y guardar el resultado) es replicable a cualquier otro proceso — no se ha reutilizado todavía fuera de `leadfinder`.
- **Nivel de madurez**: baja-media — construida, sin confirmar uso real (depende de si hay clave de API configurada en el entorno real, no verificado).
- **Dependencia del fundador**: alta — única persona que la ha implementado.
- **Potencial de automatización**: es automatización en sí misma; el potencial está en replicar el patrón a otros procesos del negocio.

### 5. Integración de pagos y facturación recurrente

- **Descripción**: sincronización de pagos, suscripciones y MRR con Stripe, con webhooks en tiempo real.
- **Tecnologías**: Stripe API, rutas de API de Next.js.
- **Motores donde participa**: Motor B (ambas líneas) — es la base técnica de que "operación continua" genere ingreso medible sin trabajo manual.
- **Reutilización**: diseñado para escalar a cualquier cliente nuevo del CRM sin cambio de código.
- **Nivel de madurez**: alta — funcional con webhooks reales.
- **Dependencia del fundador**: media — la configuración inicial depende de él, la operación diaria ya es automática.
- **Potencial de automatización**: ya alto.

### 6. SEO técnico estructurado

- **Descripción**: marcado semántico (JSON-LD), sitemap y robots.txt como parte de la entrega de un sitio.
- **Tecnologías**: JSON-LD (schema.org: `LocalBusiness`, `LegalService`), `sitemap.xml`, `robots.txt`.
- **Motores donde participa**: Motor A (etapa Implementación, como parte de la entrega) y Motor B, línea Gestión del crecimiento (si se mantiene y amplía después).
- **Reutilización**: patrón ya aplicado en `bbabogados`, replicable a cualquier cliente nuevo.
- **Nivel de madurez**: media — aplicado en un caso real, sin checklist/plantilla formalizada todavía.
- **Dependencia del fundador**: alta hoy.
- **Potencial de automatización**: medio-alto — candidato claro a checklist reutilizable.

## Capacidades pendientes de construir (mencionadas como ambición, sin evidencia de código)

Estas líneas aparecían en el planteamiento original del proyecto. **No hay evidencia de herramienta, código o proceso construido para ninguna de ellas.** No se listan como capacidades Core — si en Fase 4 se quiere ofrecer un servicio de esta categoría, debe marcarse explícitamente como "sin capacidad Core todavía, requiere construirla antes de venderla", nunca darse por hecho:

- Automatización con n8n / Make / Power Automate / Zapier.
- ERP o CRM a medida **para clientes** (el CRM Core de arriba es de uso interno, no se ha construido ni adaptado para ningún cliente).
- Gestión de campañas SEM / Google Ads / Meta Ads.
- Power Query, Excel avanzado, dashboards BI a medida para clientes.
- Integraciones API a medida para terceros.
- Digitalización documental / OCR.

## Regla para Fase 4

Todo servicio del catálogo debe citar qué capacidad o capacidades Core lo sostienen. Un servicio sin ninguna capacidad Core detrás no entra en el catálogo como oferta activa — entra, si acaso, en una sección aparte de "líneas futuras" explícitamente marcada como no vendible todavía.

---

**Qué modifica**: no fija decisiones de negocio — es el inventario de capacidades reales, la base obligatoria sobre la que se construye el Catálogo (Fase 4).

**Qué documentos dependen de este**: la futura Fase 4 (Catálogo de servicios) depende directamente — cada servicio debe referenciar una capacidad de aquí. `flywheel-comercial.md` referencia las capacidades 1, 3 y 5 desde sus eslabones.

**Qué documentos deben revisarse si este cambia**: `inventario-tecnologico.md` (mismo universo técnico, distinta vista) y la Fase 4 en cuanto exista.
