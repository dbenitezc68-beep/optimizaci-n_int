# 04 — Arquitectura de la oferta

Actualizado: 2026-07-12 (línea de fecha añadida, contenido sin cambios)

Estado: **v2, cerrada y aprobada.** Construido según `00-metodologia.md`, validado contra `02-principios-fundacionales.md` y `03-modelo-negocio.md`. La v1 fijó el empaquetado obligatorio, la reutilización modular y la verificación de cobertura; la v2 ajusta la terminología (etapas de Motor A, líneas de Motor B, no motores nuevos) e incorpora la re-auditoría final exigida antes del cierre.

## Resumen ejecutivo

El Modelo de negocio (Fase 2) define *cómo* gana dinero INTEREMPREX — tres motores más uno latente. Esta fase define la *estructura* que convierte esos motores en algo vendible sin caer en el catálogo plano de 40+ servicios ya descartado: reglas de empaquetado obligatorio entre motores, módulos reutilizables como base del motor C, y niveles de servicio en vez de menú de funcionalidades sueltas. El Catálogo (Fase 4) llenará esta estructura con servicios concretos; aquí solo se fijan las reglas que ese catálogo debe respetar.

## Decisiones tomadas

### 1. Empaquetado obligatorio: todo proyecto de Motor A incluye un periodo mínimo de Motor B por contrato, no por venta posterior

En Fase 2 se decidió que A siempre debe converger en B. Aquí esa decisión se convierte en regla de producto: el periodo mínimo de operación continua se incluye **en el mismo contrato** de implementación, no se ofrece después como upsell. Justificación en los cinco criterios: valor para el cliente (sabe desde el primer día que el sistema se mantiene, no que queda abandonado tras la entrega), rentabilidad (asegura conversión a MRR en vez de dejarla al azar de una venta posterior), escalabilidad (una regla de contrato es delegable; una venta de upsell discrecional depende del criterio de quien la haga), automatización (es una condición codificable en la plantilla de contrato del Sistema comercial, Fase 7), simplicidad operativa (una regla fija es más simple de operar que decidir caso a caso si se ofrece continuidad). Cumple los cinco.

**Impacto en el FDI**: mejora el FDI de "cierre de ventas / conversión A→B" (hoy "Exclusivo del fundador", registrado en `fdi-registro.md`) porque convierte una decisión que hoy depende del criterio personal del fundador en una regla fija de contrato — es un paso hacia "Totalmente documentado", aunque todavía no se ejecuta sin él (eso depende de la Fase 7).

### 2. Motor C se construye sobre módulos reutilizables, no desde cero en cada proyecto

Cada automatización a medida se diseña, cuando es posible, como una extensión de un módulo ya existente en el stack propio (dashboard o leadfinder) en vez de una solución aislada. Es lo que sostiene el margen alto de C ya declarado en Fase 2: sin reutilización, C es indistinguible de una consultora de horas sueltas.

**Impacto en el FDI**: mejora el FDI de la ejecución de C — el conocimiento queda encapsulado en un módulo del stack (documentado, reutilizable) en lugar de en la memoria del fundador. Es el mismo mecanismo que Fase 2 ya identificó como la vía de reducción de dependencia para el motor D.

### 3. La oferta se organiza en niveles, no en lista plana de funcionalidades

Dentro de cada motor, los servicios se agrupan en niveles (por ejemplo: esencial / avanzado / a medida) en vez de presentarse como funcionalidades independientes. Es la aplicación directa del principio de `00-metodologia.md`: "no pensar en servicios, pensar en plataformas." El Catálogo (Fase 4) decide cuántos niveles y qué contiene cada uno — aquí solo se fija que la estructura es de niveles, no de lista.

### 4. El motor D no aparece en la oferta pública

Coherente con su estado latente (Fase 2): no se ofrece, no se menciona en el catálogo comercial. Su desarrollo es interno y se juzga por el criterio ya fijado — beneficio interno antes que venta.

### 5. Verificación de cobertura de motores (obligatoria antes de pedir aprobación)

Se contrastó la arquitectura contra el universo completo de servicios mencionados a lo largo del proyecto (desarrollo web, SEO, SEM, Meta Ads, email marketing, automatización con n8n/Make/Power Automate, IA/agentes/chatbots/RAG, Power Query/Excel/dashboards/BI, ERP/CRM, integraciones API, scraping/lead generation, digitalización documental, portales/intranets/apps internas, hosting/cloud/dominios/correo/backups/monitorización/ciberseguridad básica, migraciones, GA/GTM/Search Console/CRO, landing pages/funnels, branding, consultoría/auditorías) para comprobar que cada uno se ubica sin ambigüedad en un único motor.

**Dos no encajaban limpiamente y se corrigen aquí, con el ajuste ya aplicado también en `03-modelo-negocio.md` (v5) para que ambos documentos queden coherentes:**

- **Consultoría/auditoría puntual** aparecía en la v2 de Fase 2 flotando fuera de los tres motores (listada junto a ellos, no dentro de ninguno) — una inconsistencia real, no solo de redacción. Se corrige: es la **etapa Diagnóstico del Motor A**, una entrada de bajo compromiso, no una cuarta categoría.
- **Marketing recurrente (SEO, SEM, gestión de anuncios, email marketing)** es claramente recurrente (motor B por definición de Fase 2), pero la definición original de B ("mantenimiento, monitorización, automatizaciones vivas, soporte") describe mantener sistemas ya construidos — el trabajo estratégico continuo de marketing no es eso. Se corrige: **línea Gestión del crecimiento del Motor B**, distinta de la línea Operación técnica.

**El resto de servicios revisados encajan sin ambigüedad** una vez fijadas esas etapas y líneas: infraestructura (hosting, dominios, backups, monitorización, ciberseguridad básica) → Motor B, línea Operación técnica. Migraciones y digitalización documental inicial → Motor A, etapa Implementación, con su mantenimiento posterior → Motor B, línea Operación técnica. Automatización con n8n/Make/Power Automate, ERP/CRM a medida, integraciones API → Motor C, con base modular reutilizable cuando sea posible (decisión 2). Branding → Motor A, etapa Implementación. GA/GTM/Search Console/CRO → parte de la línea Gestión del crecimiento (son las herramientas con las que se opera esa línea, no un servicio aparte). Scraping/lead generation vendido como servicio a terceros (no el uso interno de `leadfinder`) sería, en el futuro, el primer candidato real de Motor D — se anota como observación, no como decisión, porque D sigue latente.

Ningún servicio quedó sin motor ni en más de uno. La arquitectura, con Motor A (dos etapas) y Motor B (dos líneas), sigue teniendo cuatro motores y cubre el universo completo revisado.

## Decisiones descartadas

- **Ofrecer el periodo de continuidad como upsell opcional tras la entrega de A**: descartado — es exactamente el patrón que hoy depende del fundador y que la decisión 1 busca eliminar.
- **Catálogo de funcionalidades independientes por motor** (ej. una lista de 15 automatizaciones sueltas dentro de C): descartado por la misma razón que se descartó el catálogo plano en Fase 2 — contradice simplicidad operativa y el principio de pensar en plataformas.
- **Construir cada automatización de motor C completamente desde cero por defecto**: descartado — es rentable solo si es la excepción, no la norma; por defecto se busca reutilización modular (decisión 2).

## Riesgos detectados

1. **Riesgo de percepción de venta forzada.** Si el empaquetado obligatorio (decisión 1) no se comunica con transparencia desde el primer contacto, el cliente puede percibirlo como que se le obliga a pagar más de lo que pidió. Impacto medio, probabilidad media — depende de cómo lo traduzca la Fase 6 (Customer Journey) y la Fase 7 (Sistema comercial) en el discurso comercial.
2. **Riesgo de sobre-estandarización.** Si los niveles de servicio (decisión 3) se vuelven demasiado rígidos, se pierde el "a medida" que es parte de la propuesta de valor de Fase 1. Impacto medio, probabilidad baja si el Catálogo (Fase 4) deja margen de personalización dentro de cada nivel.
3. **Riesgo de que la reutilización modular (decisión 2) no sea siempre posible.** Algunos proyectos de motor C pueden no encajar en ningún módulo existente. Esto no invalida la regla — significa que esos casos tienen menor margen relativo, lo cual es información útil para decidir si se aceptan (criterio de Fase 2: valor para el cliente, rentabilidad, escalabilidad, automatización, simplicidad — un proyecto de C sin ningún componente reutilizable falla el criterio de automatización).

## Dependencias con otras fases

- **Desde `03-modelo-negocio.md`**: hereda los cuatro motores (A con etapas Diagnóstico/Implementación, B con líneas Operación técnica/Gestión del crecimiento, C, D) y la regla de que A debe convertir a B. Esta fase, a su vez, obligó a corregir la definición de A y B en `03-modelo-negocio.md` (decisión 1, v4-v5) — dependencia en ambos sentidos, ya resuelta y coherente en los dos documentos.
- **Hacia Fase 4 (Catálogo de servicios)**: cada servicio debe encajar en un nivel dentro de un motor (incluyendo la etapa/línea que le corresponda dentro de A o B), y debe declarar si es de motor C con o sin base modular reutilizable.
- **Hacia Fase 6 (Customer Journey)**: debe traducir el empaquetado obligatorio (decisión 1) en un discurso que no se perciba como venta forzada (riesgo 1).
- **Hacia Fase 7 (Sistema comercial)**: debe codificar la decisión 1 como cláusula fija de contrato, no como criterio discrecional — es lo que efectivamente reduce el FDI del cierre de ventas.
- **Hacia `fdi-registro.md`**: registra el efecto de las decisiones 1 y 2 sobre los procesos ya identificados como críticos en Fase 2.
- **Hacia `enterprise-blueprint.md`**: el bloque "Arquitectura de la oferta" del blueprint referencia este documento y su estado.

## Tareas futuras

- Fase 4 debe clasificar cada servicio del catálogo original disperso dentro de un nivel y un motor, marcando cuáles de motor C tienen base modular reutilizable y cuáles no.
- Fase 7 debe redactar la cláusula contractual que fija el empaquetado obligatorio A→B.
- Fase 6 debe diseñar cómo se comunica el empaquetado obligatorio sin que se perciba como venta forzada.

## Auditoría crítica

- **Contradicciones con documentación previa**: se detectó una (Motor A/B mal definido para cubrir consultoría puntual y marketing recurrente) y se corrigió en esta misma fase, en ambos documentos (`03-modelo-negocio.md` v4 y aquí). No queda ninguna contradicción sin resolver entre los documentos existentes.
- **Duplicidades**: ninguna nueva.
- **Riesgos**: tres identificados (percepción de venta forzada, sobre-estandarización, límite de la reutilización modular), ninguno de prioridad crítica.
- **Deuda técnica**: ninguna nueva introducida aquí.
- **Deuda operativa**: ninguna nueva — las decisiones de esta fase reducen deuda operativa futura.
- **Complejidad innecesaria**: ninguna — las etapas de A y las líneas de B son más simples que crear motores nuevos, y siguen siendo solo cuatro motores, no seis.
- **Dependencias peligrosas**: ninguna nueva.
- **Oportunidades de automatización**: la cláusula de empaquetado obligatorio (decisión 1) es candidata a plantilla automática de contrato en Fase 7.
- **Oportunidades de estandarización**: la biblioteca de módulos reutilizables (decisión 2) es, en sí misma, el punto de partida técnico de un futuro motor D.

### Re-auditoría final del sistema completo (las cinco condiciones de cierre exigidas)

1. **Todos los servicios futuros encajan exactamente en un motor**: confirmado. El universo completo revisado en la decisión 5 se ubica sin solape ni hueco en Motor A (etapas Diagnóstico/Implementación), Motor B (líneas Operación técnica/Gestión del crecimiento) o Motor C. Motor D no recibe ningún servicio — sigue latente por diseño.
2. **`enterprise-blueprint.md` sigue siendo coherente**: sí. No describe el interior de cada motor, así que el ajuste de terminología no le afecta; además ya incorpora la resolución del gap de KPIs (`kpis.md`) sin contradecir nada de esta fase.
3. **No existen duplicidades nuevas**: confirmado. La única duplicidad conocida sigue siendo R8 (paneles de gestión), ya documentada, sin relación con esta fase. `inventario-tecnologico.md` no reveló ninguna duplicidad de sistema adicional — sí reveló un hallazgo distinto (silo entre `leadfinder` e `interemprex-dashboard`), que es una falta de conexión, no una duplicidad.
4. **El FDI mejora o permanece estable**: mejora. Las decisiones 1 y 2 mueven procesos ya registrados hacia niveles de menor dependencia (ver `fdi-registro.md`); ninguna decisión de esta fase introduce un proceso nuevo "Exclusivo del fundador" sin contrapartida.
5. **El inventario tecnológico refleja todo lo descubierto hasta ahora**: sí — `inventario-tecnologico.md` y `capacidades-ia.md` se crearon en esta misma ronda, incorporando todos los hallazgos de Fase 0 a Fase 3 (repos, apps, dominios, bases de datos, APIs, la capacidad de IA de `leadfinder`, el silo entre sistemas, y la verificación de la credencial por defecto).

Las cinco condiciones se cumplen. Fase 3 se cierra.

## Preguntas que necesitan aprobación

1. **Resuelta** — empaquetado obligatorio de A con un mínimo de B en el mismo contrato, aprobado dentro de la aprobación general de "decisiones estructurales incorporadas hasta ahora".
2. **Resuelta** — reutilización modular como criterio por defecto para Motor C, aprobada en el mismo bloque.
3. **Sigue abierta** — ¿cuántos niveles de servicio por motor (dos: esencial/a medida, o tres: esencial/avanzado/a medida)? No se resolvió en este mensaje. Pasa a Fase 4 como primera pregunta a responder antes de escribir el Catálogo.
4. **Resuelta** — la corrección se documentó como etapas de Motor A (Diagnóstico/Implementación) y líneas de Motor B (Operación técnica/Gestión del crecimiento), no como motores nuevos, en ambos documentos.

---

**Qué modifica**: fija las reglas de empaquetado entre motores, la reutilización modular de Motor C, la estructura de niveles de servicio, y corrige — con terminología de etapas/líneas, no motores nuevos — la definición de A y B para cubrir todo el universo de servicios revisado.

**Qué documentos dependen de este**: la futura Fase 4 (Catálogo), Fase 6 (Customer Journey) y Fase 7 (Sistema comercial) — las tres heredan directamente las reglas fijadas aquí.

**Qué documentos deben revisarse si este cambia**: `03-modelo-negocio.md` (motores compartidos), `enterprise-blueprint.md` (bloque Arquitectura de la oferta) y las tres fases futuras listadas arriba en cuanto existan.
