# Capacidades Core — INTEREMPREX

No es un catálogo de servicios — es el inventario oficial de **capacidades reales** (tecnología, conocimiento y procesos ya construidos) sobre las que se construye todo servicio y toda ventaja estratégica de INTEREMPREX. Regla desde aquí: **ningún servicio se define sin apoyarse en una o varias capacidades de este documento.** Si un servicio no tiene ninguna capacidad Core detrás, no es un servicio vendible todavía — es una ambición, y se marca como tal.

## Capacidades reales (con evidencia verificada)

### 1. Desarrollo web a medida

- **Propósito**: dar a un negocio presencia digital propia, sin depender de plantillas genéricas — es la puerta de entrada física de casi toda la relación con un cliente nuevo.
- **Descripción**: sitios web implementados directamente en HTML/CSS/JS, sin plantillas ni page builders, con SEO técnico básico integrado desde el diseño.
- **Tecnologías**: HTML5, CSS3, JavaScript vanilla, GSAP (animaciones), Google Fonts.
- **Motores donde participa**: Motor A (etapas Diagnóstico e Implementación).
- **Procesos donde interviene**: eslabón "Implementación" del flywheel empresarial (`flywheel-comercial.md`).
- **Reutilización**: alta — mismo patrón ya usado en 3 proyectos reales (`interemprex`, `bbabogados`, `costafloragardens`), aunque cada uno se construyó desde cero, no desde una base común todavía.
- **Nivel de madurez**: alta — 3 casos reales, 1 confirmado en producción.
- **Dependencia del fundador (FDI)**: alta. FDI = "Exclusivo del fundador" (registrado en `fdi-registro.md` como "ejecución de un proyecto tipo de implementación").
- **Potencial de automatización**: medio — un starter kit reutilizable reduciría tiempo de entrega y FDI; no existe todavía.
- **Impacto estratégico**: es la capacidad de mayor volumen de uso (3 de 3 proyectos la usan) — cualquier mejora aquí (plantilla base, checklist) se multiplica por cada cliente nuevo de Motor A.
- **Posibilidad futura de producto**: baja como producto independiente — el valor está en la ejecución a medida, no en algo empaquetable y revendible tal cual.

### 2. CRM / gestión comercial propia

- **Propósito**: que INTEREMPREX gestione su propio pipeline, clientes y cobros sin depender de herramientas de terceros de pago — y, con el tiempo, demostrar capacidad técnica real ante un cliente enseñando la propia herramienta.
- **Descripción**: gestión de clientes, pipeline de ventas, tareas y pagos/suscripciones en un panel único.
- **Tecnologías**: Next.js 16, Prisma 7, SQLite, Stripe, JWT + bcrypt.
- **Motores donde participa**: Motor B (ambas líneas, como sistema de gestión interno); candidato natural de Motor D si se productiza en el futuro.
- **Procesos donde interviene**: eslabones "CRM" y "Pipeline" del flywheel empresarial.
- **Reutilización**: hoy uso interno único — no se ha reutilizado todavía en ningún cliente.
- **Nivel de madurez**: media-alta — funcional, con dos incidencias abiertas (R5 base single-tenant, R13 sin repositorio remoto — ver `03-modelo-negocio.md`).
- **Dependencia del fundador (FDI)**: alta. FDI = "Exclusivo del fundador" (registrado como "desarrollo y mantenimiento del stack propio").
- **Potencial de automatización**: alto en su función (sincroniza pagos solo, vía webhooks); bajo en su propio mantenimiento.
- **Impacto estratégico**: es la capacidad de mayor riesgo de continuidad (R13) y, a la vez, la prueba central de la promesa de posicionamiento "empresa de tecnología, no agencia" (`01-posicionamiento.md`).
- **Posibilidad futura de producto**: alta — es el candidato más claro a Motor D si se decide productizar, precisamente porque ya resuelve un problema que cualquier agencia pequeña tiene (gestión de clientes/pagos sin herramientas de pago de terceros).

### 3. Prospección automatizada (scraping + scoring)

- **Propósito**: generar pipeline propio sin depender al 100% de marketing entrante — encontrar exactamente al cliente ideal (negocio sin web) antes de que sepa que lo necesita.
- **Descripción**: encuentra negocios sin presencia web, los puntúa por potencial comercial, con cobertura rotativa por provincia.
- **Tecnologías**: FastAPI, SQLAlchemy, APScheduler, API de Overpass (OpenStreetMap).
- **Motores donde participa**: no es un motor de ingresos en sí — alimenta la entrada del funnel, antes de Motor A. Candidato a Motor D si se ofrece a terceros (ya anotado como observación en `04-arquitectura-oferta.md`).
- **Procesos donde interviene**: eslabones "LeadFinder" y "Scoring" del flywheel empresarial — los dos primeros.
- **Reutilización**: alta — cubre cualquier provincia española por configuración, sin cambio de código.
- **Nivel de madurez**: alta — con autenticación, scoring, exportación e historial de ejecuciones.
- **Dependencia del fundador (FDI)**: alta para mantenimiento (FDI = "Exclusivo del fundador", registrado); baja para operación diaria (ya automatizada vía scheduler).
- **Potencial de automatización**: ya alto en operación — el eslabón débil es la conexión manual al CRM (ver `flywheel-comercial.md`).
- **Impacto estratégico**: es la única capacidad que genera pipeline sin coste marginal por lead — el activo más apalancado de toda la empresa hoy.
- **Posibilidad futura de producto**: media-alta — venderla como servicio de generación de leads a otras agencias/consultoras es la observación ya registrada en `04-arquitectura-oferta.md`, sin decisión tomada.

### 4. Automatización con IA aplicada

- **Propósito**: demostrar, con un caso real y no con una promesa, que INTEREMPREX construye automatización con IA de verdad — coherente con el principio constitucional de no vender la etiqueta "IA" sin sustancia detrás.
- **Descripción**: generación de resumen y propuesta de abordaje sobre un registro (hoy, un lead), usando un modelo de lenguaje.
- **Tecnologías**: API de Anthropic, modelo Claude Haiku 4.5.
- **Motores donde participa**: Motor C — es, en sí misma, el prototipo real de lo que sería un servicio de automatización con IA a medida.
- **Procesos donde interviene**: no está integrada todavía en ningún eslabón del flywheel más allá del scoring de leads — es una capacidad construida pero aislada.
- **Reutilización**: el patrón (llamar a un LLM sobre un registro estructurado y guardar el resultado) es replicable a cualquier otro proceso — no se ha reutilizado todavía fuera de `leadfinder`.
- **Nivel de madurez**: baja-media — construida, sin confirmar uso real (depende de si hay clave de API configurada en el entorno real, no verificado).
- **Dependencia del fundador (FDI)**: alta — única persona que la ha implementado.
- **Potencial de automatización**: es automatización en sí misma; el potencial está en replicar el patrón a otros procesos del negocio.
- **Impacto estratégico**: es la capacidad con mayor potencial de margen (Motor C) por unidad de esfuerzo, precisamente porque el patrón ya existe y solo hay que adaptarlo, no inventarlo cada vez.
- **Posibilidad futura de producto**: media — el patrón en sí (auditoría de registros con IA) podría generalizarse a un módulo del CRM ofrecible a clientes, no solo a leads internos.

### 5. Integración de pagos y facturación recurrente

- **Propósito**: que el ingreso recurrente (Motor B) se cobre y se mida solo, sin trabajo administrativo manual — condición técnica para que "operación continua" sea un negocio de verdad y no una promesa de factura mensual manual.
- **Descripción**: sincronización de pagos, suscripciones y MRR con Stripe, con webhooks en tiempo real.
- **Tecnologías**: Stripe API, rutas de API de Next.js.
- **Motores donde participa**: Motor B (ambas líneas) — es la base técnica de que "operación continua" genere ingreso medible sin trabajo manual.
- **Procesos donde interviene**: eslabón "Operación continua" del flywheel, y es la fuente de datos real del indicador de MRR en `kpis.md` el día que haya ingresos que medir.
- **Reutilización**: diseñado para escalar a cualquier cliente nuevo del CRM sin cambio de código.
- **Nivel de madurez**: alta — funcional con webhooks reales.
- **Dependencia del fundador (FDI)**: media — la configuración inicial depende de él, la operación diaria ya es automática.
- **Potencial de automatización**: ya alto.
- **Impacto estratégico**: es la capacidad que convierte el Modelo de negocio (Fase 2, en papel) en un sistema que factura de verdad — sin ella, "Motor B" sería solo una idea.
- **Posibilidad futura de producto**: baja — es infraestructura interna, no algo que tenga sentido vender por separado.

### 6. SEO técnico estructurado

- **Propósito**: que cada sitio entregado tenga una base técnica de visibilidad correcta desde el primer día, sin depender de una campaña de SEO aparte para lo básico.
- **Descripción**: marcado semántico (JSON-LD), sitemap y robots.txt como parte de la entrega de un sitio.
- **Tecnologías**: JSON-LD (schema.org: `LocalBusiness`, `LegalService`), `sitemap.xml`, `robots.txt`.
- **Motores donde participa**: Motor A (etapa Implementación, como parte de la entrega) y Motor B, línea Gestión del crecimiento (si se mantiene y amplía después).
- **Procesos donde interviene**: eslabón "Implementación", y potencialmente "Operación continua" si se mantiene en el tiempo.
- **Reutilización**: patrón ya aplicado en `bbabogados`, replicable a cualquier cliente nuevo.
- **Nivel de madurez**: media — aplicado en un caso real, sin checklist/plantilla formalizada todavía.
- **Dependencia del fundador (FDI)**: alta hoy.
- **Potencial de automatización**: medio-alto — candidato claro a checklist reutilizable.
- **Impacto estratégico**: es la única capacidad real que sostiene, aunque sea parcialmente, la línea Gestión del crecimiento de Motor B — sin ella esa línea no tendría ninguna capacidad detrás, ni siquiera parcial.
- **Posibilidad futura de producto**: baja — es un componente técnico de otras entregas, no un producto independiente.

## Capacidades pendientes de construir (mencionadas como ambición, sin evidencia de código)

Estas líneas aparecían en el planteamiento original del proyecto. **No hay evidencia de herramienta, código o proceso construido para ninguna de ellas.** No se listan como capacidades Core — si se quiere ofrecer un servicio de esta categoría, debe marcarse explícitamente como "sin capacidad Core todavía, requiere construirla antes de venderla", nunca darse por hecho:

- Automatización con n8n / Make / Power Automate / Zapier.
- ERP o CRM a medida **para clientes** (el CRM Core de arriba es de uso interno, no se ha construido ni adaptado para ningún cliente).
- Gestión de campañas SEM / Google Ads / Meta Ads.
- Power Query, Excel avanzado, dashboards BI a medida para clientes.
- Integraciones API a medida para terceros.
- Digitalización documental / OCR.

## Regla para el catálogo

Todo servicio debe citar qué capacidad o capacidades Core lo sostienen, qué proceso del flywheel activa, y qué impacto tiene sobre el FDI de la empresa. Un servicio sin ninguna capacidad Core detrás no entra en el catálogo como oferta activa — entra, si acaso, en una sección aparte de "líneas futuras" explícitamente marcada como no vendible todavía.

---

**Qué modifica**: no fija decisiones de negocio — es el inventario de capacidades reales, la base obligatoria sobre la que se construye toda la arquitectura comercial (`05-catalogo-servicios.md`).

**Qué documentos dependen de este**: `05-catalogo-servicios.md` depende directamente — cada servicio debe referenciar una capacidad de aquí. `flywheel-comercial.md` referencia las capacidades 1, 2, 3 y 5 desde sus eslabones. `enterprise-blueprint.md` cita este documento como el eslabón "Mejora de capacidades" del ciclo de valor.

**Qué documentos deben revisarse si este cambia**: `inventario-tecnologico.md` (mismo universo técnico, distinta vista), `05-catalogo-servicios.md` y `flywheel-comercial.md`.
