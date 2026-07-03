# 05 — Catálogo de servicios (arquitectura comercial)

Estado: **propuesto, pendiente de aprobación.** Construido según `00-metodologia.md`, validado contra `02-principios-fundacionales.md`, `03-modelo-negocio.md`, `04-arquitectura-oferta.md` y `capacidades-core.md`. No es un listado de servicios — es una arquitectura: cada servicio responde diez preguntas obligatorias, ninguno existe aislado de una capacidad Core, un proceso del flywheel y una vía de crecimiento hacia otro servicio.

## Resumen ejecutivo

Diseñar el catálogo con esta rigurosidad reconfirma el hallazgo de la versión anterior — la línea Gestión del crecimiento de Motor B solo tiene capacidad parcial — y añade una capa nueva: cada servicio queda conectado explícitamente al flywheel empresarial (qué eslabón activa) y al FDI (qué automatización aprovecha o qué proceso sigue dependiendo del fundador). La arquitectura resultante se validó contra seis perspectivas y contra seis escenarios de escala (10 y 50 empleados, 500 clientes, operación internacional, múltiples equipos, productos derivados de Motor D) antes de pedir aprobación.

## Decisiones tomadas

### 1. Niveles de servicio — reconfirmados, justificados desde cinco ángulos nuevos

Se vuelve a cuestionar el modelo de tres niveles (resolver → optimizar → transformar) antes de adoptarlo en esta versión, ahora contra los cinco ángulos pedidos:

- **Experiencia del cliente**: los niveles narran el propio progreso del cliente, no una lista de funcionalidades — un cliente en Nivel 1 entiende que está resolviendo un problema puntual, no que "le falta comprar más cosas".
- **Simplicidad comercial**: tres niveles por motor (más el caso especial de Gestión del crecimiento) son fáciles de explicar en una conversación de venta; una matriz de funcionalidades no lo es.
- **Rentabilidad**: el Nivel 3 de cada motor concentra el mayor margen relativo (mayor compromiso, más capacidades combinadas), coherente con la arquitectura económica de `03-modelo-negocio.md`.
- **Escalabilidad**: la misma lógica de tres niveles funciona igual con 2 clientes que con 500 — no depende del tamaño de la empresa, depende de dónde está el cliente en su propio recorrido.
- **Reutilización de capacidades**: cada nivel superior no es "otra cosa" — es más profundidad de las mismas capacidades Core (ver detalle por servicio, abajo). Esto es lo que impide que subir de nivel signifique inventar un servicio nuevo cada vez.

No se encontró una estructura mejor. Se mantiene el ajuste de vocabulario ya adoptado para Motor A (que construye, no optimiza) de la versión anterior.

### 2. Arquitectura por servicio — Motor A, etapa Diagnóstico (entrada, sin nivel)

**Diagnóstico inicial**
- Problema empresarial que resuelve: el negocio no sabe con precisión qué digitalizar primero ni por qué.
- Capacidades Core: método de diagnóstico descrito en `01-posicionamiento.md` (Diagnóstico → Diseño → Implementación → Optimización) — es proceso y conocimiento, no una capacidad técnica de `capacidades-core.md`.
- Procesos internos que activa: entrada al flywheel, antes del eslabón "Propuesta".
- Entregables: informe breve de qué mejorar y por dónde empezar.
- Automatizaciones que aprovecha: ninguna todavía.
- KPIs que mejora: candidato a alimentar la futura tasa de conversión Diagnóstico → Motor A (no existe todavía en `kpis.md`, se añade en tareas futuras).
- Otros servicios que habilita: cualquier nivel de Motor A, según lo que revele el diagnóstico.
- Upselling: no aplica — es el punto de entrada, no hay nada "antes".
- Cross-selling: no aplica por el mismo motivo.
- Nivel de servicio: sin nivel — es la puerta, no una etapa de evolución.
- Precio: sin equivalente de mercado fijado para "diagnóstico general" (distinto de la Auditoría SEO de `precios-y-packs.md`, 1.275 €). Pendiente de fijar con datos reales.

### 3. Arquitectura por servicio — Motor A, etapa Implementación

**Nivel 1 — Landing page** (cubrir la ausencia de presencia digital)
- Problema: el negocio no tiene web, o la que tiene no lo representa.
- Capacidades Core: 1 (Desarrollo web a medida).
- Procesos que activa: eslabón "Implementación" del flywheel.
- Entregables: sitio de una página, publicado, con SEO técnico básico.
- Automatizaciones: ninguna todavía (capacidad 1 sin starter kit).
- KPIs: sin indicador propio todavía — candidato a "tiempo de entrega" cuando haya datos históricos.
- Habilita: Motor B Nivel 1 (empaquetado obligatorio, `04-arquitectura-oferta.md`).
- Upselling: hacia Nivel 2/3 si el negocio crece.
- Cross-selling: ninguno inmediato — es la entrada.
- Precio: 750 € (tarifa de lanzamiento vigente).

**Nivel 2 — Web corporativa o tienda online estándar, con SEO técnico** (cubrir la necesidad digital completa)
- Problema: el negocio necesita presencia completa, información y en su caso venta online.
- Capacidades Core: 1 + 6 (SEO técnico estructurado).
- Procesos que activa: "Implementación", con base para "Operación continua" más rica que el Nivel 1.
- Entregables: sitio multi-página o tienda estándar, con JSON-LD, sitemap y robots.txt.
- Automatizaciones: ninguna en la construcción; capacidad 6 es candidata a checklist reutilizable.
- KPIs: mismo hueco que Nivel 1.
- Habilita: Motor B Nivel 2, y Motor C si el negocio necesita automatizar un proceso de venta.
- Upselling: hacia Nivel 3 si el negocio escala a plataforma compleja.
- Cross-selling: Motor B línea Gestión del crecimiento Nivel 1 (mantenimiento SEO técnico), ya que el sitio nace con la base técnica que esa línea necesita.
- Precio: 1.125 € (corporativa) / 2.625 € (tienda estándar).

**Nivel 3 — Tienda avanzada o plataforma a medida** (construir la infraestructura digital central)
- Problema: el negocio necesita que su plataforma digital sea el centro de la operación, no un sitio más.
- Capacidades Core: 1 + 6.
- Procesos que activa: "Implementación" a mayor escala; suele preceder a un ciclo de vida de cliente más largo (Año 2-3, `03-modelo-negocio.md`).
- Entregables: plataforma a medida (tienda avanzada o portal), con SEO técnico completo.
- Automatizaciones: ninguna nueva — mismo límite que Nivel 2.
- KPIs: mismo hueco.
- Habilita: Motor C con mayor probabilidad (una plataforma compleja casi siempre revela procesos automatizables).
- Upselling: hacia Motor C Nivel 2/3 directamente, más que hacia "un nivel más" de A, que ya es el techo.
- Cross-selling: Motor B Nivel 3 (partner técnico continuo) — coherente con el nivel de compromiso.
- Precio: 7.500 € (tienda avanzada); a medida más allá de eso, cotización caso a caso, sin techo de mercado equivalente que citar con honestidad.

### 4. Arquitectura por servicio — Motor B, línea Operación técnica

**Nivel 1 — Mantenimiento Básico** (resolver un problema concreto)
- Problema: el sitio/sistema necesita que algo se arregle cuando falla.
- Capacidades Core: 1.
- Procesos que activa: eslabón "Operación continua".
- Entregables: soporte reactivo, sin SLA formal todavía.
- Automatizaciones: ninguna — es soporte manual por diseño en este nivel.
- KPIs: alimenta directamente "% de ingresos recurrentes" de `kpis.md`.
- Habilita: nada nuevo por sí solo — es continuidad de Motor A.
- Upselling: hacia Nivel 2 si el cliente pide mejoras, no solo arreglos.
- Cross-selling: ninguno a este nivel.
- Precio: 38 €/mes.

**Nivel 2 — Mantenimiento Intermedio** (optimizar procesos existentes)
- Problema: el sitio/sistema necesita mejoras continuas, no solo arreglos.
- Capacidades Core: 1 + 5 (pagos/facturación recurrente automatizada).
- Procesos que activa: "Operación continua", con cobro ya automatizado vía Stripe.
- Entregables: mantenimiento + mejoras periódicas.
- Automatizaciones: cobro recurrente ya automatizado (capacidad 5).
- KPIs: mismo indicador que Nivel 1, con mayor peso.
- Habilita: detección de necesidades de Motor C (el "uso diario revela cuellos de botella", `03-modelo-negocio.md`).
- Upselling: hacia Nivel 3.
- Cross-selling: Motor C Nivel 1 si aparece una tarea automatizable puntual.
- Precio: 79 €/mes.

**Nivel 3 — Mantenimiento Avanzado** (transformar el funcionamiento)
- Problema: el negocio quiere un partner técnico continuo, no un proveedor que arregla cosas.
- Capacidades Core: 1 + 5 + 6.
- Procesos que activa: "Operación continua" con SEO técnico mantenido activamente.
- Entregables: mantenimiento + automatizaciones vivas + SEO técnico al día.
- Automatizaciones: capacidad 5 ya automatizada; candidato a incorporar capacidad 4 (IA aplicada) si se replica el patrón de `leadfinder`.
- KPIs: mismo indicador, mayor peso; candidato natural a medir retención (`kpis.md`).
- Habilita: Motor C Nivel 2/3 con mayor probabilidad que los niveles anteriores.
- Upselling: no aplica — es el techo de la línea.
- Cross-selling: Motor B línea Gestión del crecimiento Nivel 1.
- Precio: 128 €/mes.

### 5. Arquitectura por servicio — Motor B, línea Gestión del crecimiento (capacidad parcial)

**Nivel 1 — Mantenimiento SEO técnico** (único nivel vendible hoy)
- Problema: el sitio pierde salud técnica de SEO con el tiempo si nadie la mantiene.
- Capacidades Core: 6, en su alcance limitado (marcado semántico, sitemap, salud técnica — no contenido, no palabras clave, no enlaces).
- Procesos que activa: "Operación continua", variante de crecimiento.
- Entregables: revisión periódica de JSON-LD, sitemap, robots.txt.
- Automatizaciones: ninguna — capacidad 6 no tiene checklist automatizado todavía.
- KPIs: mismo indicador de recurrencia que la línea técnica.
- Habilita: nada por encima — es el techo real de esta línea hoy.
- Upselling: **bloqueado** — no existe Nivel 2/3 vendible (ver abajo).
- Cross-selling: ninguno nuevo respecto a la línea técnica.
- Precio: sin precio de mercado equivalente exacto en `precios-y-packs.md` para este alcance reducido — sería incorrecto usar el precio de "SEO Local" completo (413 €/mes) para un servicio que no incluye contenido ni palabras clave. Pendiente de fijar un precio propio y honesto para este alcance.

**Niveles 2 y 3 — SEO Local/Crecimiento completos, Gestión Ads, Email marketing** — **no vendibles todavía.** Sin capacidad Core que cubra investigación de palabras clave, contenido, construcción de enlaces o gestión de campañas de pago. Aparecen en `precios-y-packs.md` como referencia de mercado, no como oferta activa. Se mantiene la misma conclusión de la versión anterior del catálogo, reforzada aquí con la pregunta explícita de "qué capacidad Core usa" — la respuesta honesta es "ninguna todavía".

### 6. Arquitectura por servicio — Motor C, Automatización e IA a medida

**Nivel 1 — Automatización puntual con IA** (resolver un problema concreto)
- Problema: una tarea repetitiva concreta se puede automatizar (clasificar, resumir, puntuar registros).
- Capacidades Core: 4 (Automatización con IA aplicada), replicando el patrón de `leadfinder`.
- Procesos que activa: eslabón "Automatización" del flywheel.
- Entregables: una automatización puntual funcionando sobre el proceso del cliente.
- Automatizaciones que aprovecha: el patrón ya construido (llamar a Claude sobre un registro estructurado).
- KPIs: candidato a alimentar "% de proyectos de Motor C con base modular reutilizable" de `kpis.md`.
- Habilita: Nivel 2 si el cliente quiere extender la automatización a todo un proceso.
- Upselling: hacia Nivel 2.
- Cross-selling: Motor B Nivel 2/3 (la automatización entregada necesita soporte).
- Precio: 41-105 €/h según complejidad.

**Nivel 2 — Panel/sistema de gestión a medida para un proceso** (optimizar un proceso existente)
- Problema: un proceso completo del cliente necesita un sistema propio, no una tarea suelta automatizada.
- Capacidades Core: 2 (CRM propio, como patrón replicable) + 4.
- Procesos que activa: "Automatización", con posible retroalimentación al eslabón "Mejora de capacidades" si el patrón construido es reutilizable para otro cliente.
- Entregables: panel/sistema a medida.
- Automatizaciones: reutiliza el patrón de capacidad 2 (gestión de datos estructurados en un panel).
- KPIs: mismo indicador que Nivel 1, con mayor peso.
- Habilita: Nivel 3 si el negocio quiere extender el sistema a toda la operación.
- Upselling: hacia Nivel 3.
- Cross-selling: Motor B Nivel 3.
- Precio: 7.125 € (proyecto de automatización completo).

**Nivel 3 — Rediseño operativo con automatización e IA** (transformar la operación)
- Problema: el negocio quiere rediseñar cómo opera, con automatización extensiva de principio a fin.
- Capacidades Core: 2 + 4 + 5 (si incluye pagos/suscripciones).
- Procesos que activa: "Automatización" a máxima profundidad; es el nivel con mayor probabilidad de alimentar "Mejora de capacidades" de vuelta (un sistema grande a medida suele revelar mejoras aplicables a `capacidades-core.md`).
- Entregables: sistema operativo a medida, con automatización e IA integradas.
- Automatizaciones: combinación de capacidades 2, 4 y 5.
- KPIs: mismo indicador, mayor peso.
- Habilita: posible caso de éxito público (si el cliente lo permite) — alimenta "Nuevas oportunidades" del flywheel.
- Upselling: no aplica — es el techo del motor de mayor margen.
- Cross-selling: ninguno adicional — a este nivel el cliente ya está en varios motores a la vez.
- Precio: cotización caso a caso, con base en tarifa horaria de 105 €/h — sin techo de mercado equivalente que citar honestamente.

## Decisiones descartadas

- Niveles por tamaño/precio: descartado, mismo motivo que la versión anterior, ahora reforzado por los cinco ángulos de la decisión 1.
- Vender Gestión del crecimiento Niveles 2-3 como oferta activa: descartado — confirmado de nuevo tras aplicar la pregunta "qué capacidad Core usa" a cada servicio.
- Fijar el precio de "Mantenimiento SEO técnico" (línea de crecimiento, Nivel 1) igual al de "SEO Local" completo de `precios-y-packs.md`: descartado — sería cobrar por un alcance que no se entrega.

## Riesgos detectados

1. Mismo riesgo que la versión anterior sobre "Diagnóstico" sin precio fijo — persiste, pendiente de Fase 7 con datos reales.
2. Mismo riesgo sobre Motor A y C Nivel 3 sin techo de precio claro — persiste, exige disciplina en cotización.
3. **Nuevo**: el eslabón "Mejora de capacidades" del flywheel, citado varias veces aquí como destino de retroalimentación, no tiene todavía ningún mecanismo real (`flywheel-comercial.md` ya lo registra como el tramo más débil) — las menciones en este catálogo son aspiracionales hasta que Fase 8 lo resuelva.

## Dependencias con otras fases

- **Desde `capacidades-core.md`**: cada servicio hereda directamente su capacidad, su impacto en FDI y su vía de producto futuro.
- **Desde `flywheel-comercial.md`**: cada servicio se ancla a un eslabón concreto del ciclo de valor.
- **Hacia Fase 6 (Customer Journey)**: los niveles y las vías de upselling/cross-selling de cada servicio son la base del recorrido.
- **Hacia Fase 7 (Sistema comercial)**: precios pendientes (Diagnóstico, SEO técnico de mantenimiento, cotizaciones caso a caso).
- **Hacia Fase 8 (Operaciones)**: debe construir el mecanismo de "Mejora de capacidades" que este catálogo asume como destino de aprendizaje.
- **Hacia Fase 9/12**: decidir si se construye la capacidad de Gestión del crecimiento completa.
- **Hacia `kpis.md`**: nuevo indicador candidato — tasa de conversión Diagnóstico → Motor A.

## Tareas futuras

- Fijar precio de Diagnóstico y de Mantenimiento SEO técnico con datos reales, no por analogía.
- Añadir a `kpis.md` el indicador de conversión Diagnóstico → Motor A.
- Decidir en Fase 8 el mecanismo de "Mejora de capacidades".
- Decidir en Fase 9/12 si se invierte en la capacidad de Gestión del crecimiento completa.

## Validación arquitectónica (los siete puntos exigidos)

1. **Todos los servicios nacen de capacidades Core**: sí, verificado servicio a servicio arriba. Excepción declarada explícitamente: Diagnóstico se apoya en método/conocimiento, no en una capacidad técnica — se anota como tal, no se fuerza a encajar donde no encaja.
2. **Todas las capacidades tienen utilidad real**: sí — las 6 capacidades de `capacidades-core.md` se usan al menos una vez cada una en este catálogo; ninguna quedó sin servicio que la use.
3. **Ningún servicio queda fuera de los motores**: confirmado, mismo resultado que la verificación de cobertura de Fase 3, ahora con más detalle por servicio.
4. **Ningún servicio duplica otro**: confirmado. El único solape (capacidad 6 en Motor A y en Motor B-crecimiento) está justificado como momentos distintos de la relación, no como el mismo ingreso contado dos veces.
5. **El catálogo puede crecer sin rehacer la arquitectura**: sí — un servicio nuevo solo necesita citar una capacidad Core existente (o declarar una nueva) y encajar en un nivel; no exige rediseñar motores ni niveles.
6. **El FDI mejora o permanece estable**: mejora — escribir esta arquitectura mueve "qué vendemos, con qué capacidad y por qué nivel" de conocimiento tácito a documento (mismo mecanismo que la versión anterior, ahora con más profundidad).
7. **La comprensión para un cliente no técnico sigue siendo alta**: cada servicio tiene un "problema que resuelve" en lenguaje llano, separado de las capacidades técnicas (información interna). El detalle de las 10 preguntas es para uso interno, no para mostrar al cliente tal cual.

## Prueba de escala a diez años

- **10 empleados**: la arquitectura (motor × nivel × capacidad) no depende del tamaño del equipo — aguanta. Lo que no aguanta todavía es que cada capacidad tiene FDI alto; esto no es un fallo de esta fase, es la razón de ser de la Fase 9.
- **50 empleados**: la línea Gestión del crecimiento incompleta se vuelve más costosa de no resolver cuanto más crece la empresa — mismo hallazgo, mayor urgencia relativa a esa escala.
- **500 clientes activos**: la arquitectura del catálogo aguanta; lo que no aguanta a esa escala son R5 (CRM single-tenant) y la ausencia de soporte automatizado en Motor B — riesgos ya registrados en `03-modelo-negocio.md`, no nuevos.
- **Operaciones internacionales**: el catálogo es agnóstico de geografía salvo el precio en euros — aguanta en estructura, no en cifras (Fase 14).
- **Múltiples equipos de trabajo**: la separación por motor (A/B/C) se presta de forma natural a equipos especializados por motor — señal positiva, no un rediseño necesario.
- **Productos derivados de Motor D**: el catálogo deja a D fuera deliberadamente; si se activa, encajaría como un motor más con su propio nivel 1-2-3 siguiendo el mismo patrón — extensible sin rediseño.

**Conclusión de la prueba de escala**: la arquitectura del catálogo supera las seis pruebas. Las capacidades individuales, no la arquitectura, son lo que hoy no aguantaría esa escala — y eso ya está registrado como trabajo de fases futuras, no oculto.

## Auditoría final (seis perspectivas)

- **Estrategia empresarial**: coherente con `01-posicionamiento.md` y `02-principios-fundacionales.md` — el catálogo vende lo que la empresa realmente puede demostrar, no una lista de aspiraciones.
- **Experiencia del cliente**: los niveles narran progreso, no precio; las descripciones en lenguaje llano se mantienen separadas del detalle técnico.
- **Rentabilidad**: el orden de margen relativo (C > B > A) se mantiene consistente con `03-modelo-negocio.md`; los precios citados son reales de `precios-y-packs.md`, no inventados.
- **Escalabilidad**: superó la prueba de diez años arriba.
- **Automatización**: cada servicio declara qué automatización aprovecha o la ausencia de ella — no se da por hecho ninguna automatización que no exista.
- **Mantenibilidad del sistema**: la arquitectura es aditiva (un servicio nuevo no rompe los existentes) y cada documento de origen (`capacidades-core.md`, `flywheel-comercial.md`) queda citado, así que un cambio en la base se puede rastrear hasta cada servicio afectado.

No se encontró una solución objetivamente mejor que la planteada — se simplificó donde correspondía (Gestión del crecimiento reducida a lo realmente vendible) en vez de forzar una arquitectura más grande de la que hay evidencia para sostener.

## Preguntas que necesitan aprobación

1. ¿Apruebas la arquitectura completa (10 preguntas por servicio) tal como queda, incluida la retirada de Gestión del crecimiento Niveles 2-3 de la oferta activa?
2. ¿Prioridad de construir la capacidad de Gestión del crecimiento completa — Fase 9, Fase 12, o fuera de alcance por ahora?
3. ¿Autorizas fijar el precio de Diagnóstico y de Mantenimiento SEO técnico en Fase 7, con datos reales, en vez de en este documento?

---

**Qué modifica**: define la arquitectura comercial completa — cada servicio, su capacidad Core, su nivel, su lugar en el flywheel, y sus vías de upselling/cross-selling.

**Qué documentos dependen de este**: Fase 6 (Customer Journey), Fase 7 (Sistema comercial), Fase 8 (Operaciones), Fase 9 (Automatizaciones), Fase 12 (Marketing) y Fase 14 (Finanzas).

**Qué documentos deben revisarse si este cambia**: `capacidades-core.md`, `flywheel-comercial.md`, `04-arquitectura-oferta.md` y `kpis.md`.
