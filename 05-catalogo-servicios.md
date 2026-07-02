# 05 — Catálogo de servicios

Estado: **propuesto, pendiente de aprobación.** Construido según `00-metodologia.md`, validado contra `02-principios-fundacionales.md`, `03-modelo-negocio.md` y `04-arquitectura-oferta.md`. Cada servicio cita la capacidad Core (`capacidades-core.md`) que lo sostiene — ninguno se lista sin una.

## Resumen ejecutivo

El catálogo se organiza por motor (A, B con sus dos líneas, C), y dentro de cada uno en tres niveles por evolución del cliente, no por tamaño de factura. Aplicar la regla de "una capacidad Core por servicio" con rigor sacó a la luz un hueco que no era visible antes: **la línea Gestión del crecimiento de Motor B (SEO/SEM/Ads/Email) solo tiene una capacidad real construida — SEO técnico — y es parcial.** El resto de esa línea se marca como pendiente de construir, no como oferta activa. Es exactamente el tipo de sobre-promesa que `02-principios-fundacionales.md` prohíbe.

## Decisiones tomadas

### 1. Niveles de servicio: se adopta la propuesta, con un ajuste de vocabulario para Motor A

Se valida la propuesta de tres niveles por evolución del cliente — **resolver un problema concreto → optimizar procesos existentes → transformar el funcionamiento del negocio** — contra la alternativa de niveles por tamaño/precio (esencial/avanzado/enterprise). La propuesta gana en los cinco criterios: valor para el cliente (el nivel le dice dónde está su negocio, no solo cuánto paga), rentabilidad (no compite por ser "el barato", compite por resolver el problema correcto), escalabilidad (el mismo marco sirve para cualquier tamaño de cliente futuro), automatización (indiferente a este criterio, no lo mejora ni lo empeora), simplicidad operativa (tres niveles con propósito narrativo son tan simples de operar como tres niveles por precio). Además, **coincide casi exactamente con el ciclo de vida del cliente ya aprobado en Fase 2**: Nivel 1 ≈ Mes 0-1 (conversión inicial), Nivel 2 ≈ Mes 2-12/Año 1 (consolidación), Nivel 3 ≈ Año 2-3 (expansión). No es una coincidencia forzada — es la misma lógica aplicada dos veces, lo cual es una señal de coherencia real, no de casualidad.

**Ajuste necesario**: el vocabulario literal "optimizar procesos existentes" no encaja en Motor A, porque Motor A siempre construye algo nuevo — nunca optimiza algo que ya existe (eso es, por definición, el trabajo de Motor B). Aplicar la frase tal cual a Motor A produciría una descripción falsa. Se mantiene la misma filosofía (alcance creciente de transformación) con vocabulario adaptado a lo que Motor A realmente hace — ver la tabla de Motor A más abajo. En Motor B y Motor C, donde el trabajo sí es sobre sistemas/procesos ya existentes del cliente, el vocabulario original se mantiene sin cambios porque describe con precisión lo que ocurre.

### 2. Motor A — etapa Diagnóstico (entrada, sin nivel)

| Servicio | Descripción para el cliente | Capacidad Core | Precio | Tiempo de ejecución | Coste interno / margen |
|---|---|---|---|---|---|
| Diagnóstico inicial | Revisión de tu operativa y tus sistemas actuales; te decimos con claridad qué se puede mejorar y cómo, antes de comprometerte a nada. | Método de diagnóstico ya descrito en `01-posicionamiento.md` (Diagnóstico → Diseño → Implementación → Optimización); no es una capacidad técnica, es proceso y conocimiento del fundador. | Sin precio de mercado equivalente ya fijado para "diagnóstico general" (distinto de la "Auditoría SEO" de `precios-y-packs.md`, que sí lo tiene: 1.275 €). Pendiente de fijar. | Sin datos históricos — estimación pendiente hasta tener proyectos reales cerrados. | Pendiente — depende de coste/hora real (Fase 14). |

### 3. Motor A — etapa Implementación (tres niveles, vocabulario adaptado)

| Nivel | Qué resuelve | Servicio | Capacidad Core | Precio (tarifa de lanzamiento vigente, Fase 1) |
|---|---|---|---|---|
| 1 — Cubrir la ausencia de presencia digital | El negocio no tiene web, o la que tiene no representa lo que hace. | Landing page | Capacidad 1 (Desarrollo web a medida) | 750 € |
| 2 — Cubrir la necesidad digital completa | El negocio necesita una presencia completa: información, contacto, y en su caso venta online. | Web corporativa o tienda online estándar, con SEO técnico | Capacidad 1 + Capacidad 6 (SEO técnico estructurado) | 1.125 € (corporativa) / 2.625 € (tienda estándar) |
| 3 — Construir la infraestructura digital central | El negocio necesita una plataforma a medida que sea el centro de su operación digital, no un sitio más. | Tienda online avanzada o plataforma a medida | Capacidad 1 + Capacidad 6 | 7.500 € (tienda avanzada) — a medida más allá de eso, cotización caso a caso |

Tiempo de ejecución y coste interno/margen: mismos huecos que en Diagnóstico — sin datos históricos reales, no se inventan.

### 4. Motor B — línea Operación técnica (tres niveles, vocabulario sin cambios)

Aquí la propuesta original encaja sin ajuste: Motor B opera sobre sistemas que ya existen, así que "optimizar procesos existentes" describe exactamente lo que ocurre.

| Nivel | Qué resuelve | Servicio | Capacidad Core | Precio |
|---|---|---|---|---|
| 1 — Resolver un problema concreto | El sitio/sistema necesita que algo se arregle cuando falla. | Mantenimiento Básico | Capacidad 1 | 38 €/mes |
| 2 — Optimizar procesos existentes | El sitio/sistema necesita mejoras continuas, no solo arreglos. | Mantenimiento Intermedio | Capacidad 1 + Capacidad 5 (pagos/facturación recurrente automatizada) | 79 €/mes |
| 3 — Transformar el funcionamiento | El negocio quiere un partner técnico continuo, no un proveedor que arregla cosas. | Mantenimiento Avanzado | Capacidad 1 + Capacidad 5 + Capacidad 6 | 128 €/mes |

### 5. Motor B — línea Gestión del crecimiento (capacidad parcial — hallazgo de esta fase)

**Solo Nivel 1 tiene una capacidad Core real detrás, y es parcial.** Capacidad 6 (SEO técnico estructurado) cubre marcado semántico, sitemap y salud técnica — no cubre investigación de palabras clave, calendario de contenido, construcción de enlaces, ni gestión de campañas de pago, que es lo que un "SEO Local" o "Gestión Ads" completo de `precios-y-packs.md` implica.

| Nivel | Servicio | Estado real |
|---|---|---|
| 1 | Mantenimiento SEO técnico (mantener el marcado semántico, sitemap y salud técnica al día) | **Vendible hoy** — Capacidad 6 lo sostiene, con alcance limitado a lo técnico. |
| 2 | SEO Local / Gestión Ads Básica completos (contenido, palabras clave, campañas) | **No vendible todavía** — sin capacidad Core. Requiere construir la capacidad (herramientas, proceso, o alianza) antes de ofrecerlo como servicio con compromiso de resultado. |
| 3 | SEO Crecimiento / Gestión Ads con Estrategia / Email marketing | **No vendible todavía** — mismo motivo. |

No se fija precio para los niveles 2 y 3 porque no son una oferta activa — están en `precios-y-packs.md` como referencia de mercado, no como algo que INTEREMPREX pueda entregar hoy con la misma seriedad que el resto del catálogo.

### 6. Motor C — Automatización e IA a medida (tres niveles)

| Nivel | Qué resuelve | Servicio | Capacidad Core | Precio |
|---|---|---|---|---|
| 1 — Resolver un problema concreto | Una tarea repetitiva concreta se puede automatizar (ej. clasificar, resumir o puntuar registros con IA). | Automatización puntual con IA | Capacidad 4 (Automatización con IA aplicada), replicando el patrón ya construido en `leadfinder` | 41-105 €/h según complejidad |
| 2 — Optimizar un proceso existente | Un proceso completo del cliente necesita un sistema propio que lo gestione (no solo una tarea suelta). | Panel/sistema de gestión a medida para un proceso | Capacidad 2 (CRM propio, como plantilla de patrón) + Capacidad 4 | 7.125 € (proyecto de automatización completo) |
| 3 — Transformar la operación | El negocio quiere rediseñar cómo opera, con automatización extensiva e IA integrada de principio a fin. | Rediseño operativo con automatización e IA | Capacidad 2 + Capacidad 4 + Capacidad 5 (si incluye pagos/suscripciones) | Cotización caso a caso, con base en tarifa horaria de 105 €/h — sin techo de mercado equivalente que citar honestamente |

## Decisiones descartadas

- **Niveles por tamaño/precio (esencial/avanzado/enterprise)**: descartado en decisión 1 — no aporta narrativa de valor, solo tamaño de factura.
- **Vender Gestión del crecimiento Niveles 2-3 como oferta activa hoy**: descartado — sin capacidad Core, sería repetir el error de las métricas inventadas de Fase 1, esta vez como promesa de servicio en vez de como cifra falsa.
- **Forzar el vocabulario "optimizar procesos existentes" también en Motor A**: descartado — produciría una descripción incorrecta de lo que Motor A hace.

## Riesgos detectados

1. **Riesgo de venta accidental de Gestión del crecimiento Niveles 2-3** si en el futuro alguien (incluido el propio fundador, bajo presión comercial) los ofrece sin tener la capacidad construida. Mitigación: quedan marcados explícitamente como no vendibles en este documento, que es fuente única de verdad.
2. **Riesgo de que "Diagnóstico" sin precio fijo genere inconsistencia comercial** (cada cliente cotizado de forma distinta sin criterio). Pendiente de resolver con datos reales, no se improvisa aquí.
3. **Motor A Nivel 3 sin techo de precio claro** (plataformas a medida grandes) — mismo patrón que Motor C Nivel 3. Es honesto (no hay dos proyectos iguales), pero exige disciplina en Fase 7 (Sistema comercial) para que "cotización caso a caso" no se convierta en precio arbitrario sin criterio.

## Dependencias con otras fases

- **Desde `04-arquitectura-oferta.md`**: hereda la estructura de niveles y la regla de que cada motor cubre su universo de servicios sin solape.
- **Desde `capacidades-core.md`**: cada servicio cita su capacidad — es la fuente de verdad de qué es vendible hoy.
- **Desde `01-posicionamiento.md`**: el método de Diagnóstico y la tarifa de lanzamiento vigente.
- **Hacia Fase 6 (Customer Journey)**: los tres niveles, alineados con el ciclo de vida del cliente, son la base de cómo se diseña el recorrido.
- **Hacia Fase 7 (Sistema comercial)**: debe resolver el precio de Diagnóstico y la disciplina de cotización caso a caso (riesgos 2 y 3).
- **Hacia Fase 9 (Automatizaciones) y Fase 12 (Marketing)**: deben decidir si se construye la capacidad que falta para activar Gestión del crecimiento Niveles 2-3, o si esa línea se retira del roadmap comercial.
- **Hacia `kpis.md`**: candidato a nuevo indicador — "% de servicios del catálogo con capacidad Core completa vs. parcial/pendiente" (hoy: 6 de 8 líneas de servicio con capacidad completa; Gestión del crecimiento Niveles 2-3, parcial/pendiente).

## Tareas futuras

- Fase 7 debe fijar un precio de Diagnóstico basado en horas reales estimadas, no en una analogía forzada con la Auditoría SEO.
- Fase 9/12 deben decidir si se invierte en construir la capacidad de SEO/SEM/Ads completa, o si Motor B se queda solo con la línea técnica más el SEO técnico limitado.
- Fase 14 debe rellenar coste interno, margen y tiempo de ejecución con datos reales en cuanto existan proyectos cerrados que medir.

## Auditoría crítica

- **Ningún servicio existe sin apoyarse en capacidades Core**: verificado en cada tabla. Donde la capacidad es parcial o inexistente (Gestión del crecimiento Niveles 2-3), se marca explícitamente como no vendible en vez de listarse como si lo fuera.
- **Ningún servicio pertenece a más de un motor sin justificación**: un caso limítrofe — la Capacidad 6 (SEO técnico) participa en Motor A (como parte de la entrega inicial) y en Motor B (como mantenimiento posterior). Justificación: son momentos distintos de la relación con el cliente (entrega única vs. mantenimiento continuo), no el mismo ingreso contado dos veces — mismo patrón ya aceptado en Fase 3 para migraciones/digitalización documental.
- **El FDI no aumenta**: ninguna decisión de esta fase crea un proceso nuevo dependiente del fundador. Al contrario: escribir qué servicio corresponde a qué nivel y motor mueve "qué vendemos y por qué" de conocimiento tácito a documento — se registra en `fdi-registro.md` como mejora.
- **El catálogo sigue siendo comprensible para un cliente no técnico**: cada servicio tiene una descripción en lenguaje llano ("qué resuelve"), separada de la capacidad técnica que lo sostiene (que es información interna, no de cara al cliente).
- **Complejidad detectada y ya simplificada antes de pedir aprobación**: la línea Gestión del crecimiento se redujo de tres niveles completos a "un nivel vendible + dos marcados como pendientes", en vez de fingir que los tres están listos. Es la simplificación honesta, no la cómoda.
- **Duplicidades**: ninguna nueva.

## Preguntas que necesitan aprobación

1. ¿Apruebas el ajuste de vocabulario para Motor A (niveles por alcance de construcción, no literalmente "optimizar procesos existentes")?
2. ¿Confirmas que Gestión del crecimiento Niveles 2-3 se retiran de la oferta activa hasta construir la capacidad, en vez de venderse ya con el riesgo de no poder cumplir la promesa?
3. ¿Prioridad de construir esa capacidad (SEO/SEM/Ads/Email completo) — se aborda en Fase 9 (Automatizaciones), en Fase 12 (Marketing), o se deja fuera del alcance por ahora?

---

**Qué modifica**: define el catálogo de servicios activo, con cada servicio ligado a una capacidad Core real, organizado en tres niveles por evolución del cliente dentro de cada motor.

**Qué documentos dependen de este**: Fase 6 (Customer Journey), Fase 7 (Sistema comercial), Fase 9 (Automatizaciones), Fase 11 (Marketing) y Fase 14 (Finanzas) — todas heredan qué se vende y en qué nivel.

**Qué documentos deben revisarse si este cambia**: `capacidades-core.md` (si cambia qué está construido), `04-arquitectura-oferta.md` (si cambia la estructura de motores/niveles) y `kpis.md` (indicador de cobertura de capacidades).
