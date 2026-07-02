# 04 — Arquitectura de la oferta

Estado: **propuesto, pendiente de aprobación.** Construido según `00-metodologia.md`, validado contra `02-principios-fundacionales.md` y `03-modelo-negocio.md`.

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

## Decisiones descartadas

- **Ofrecer el periodo de continuidad como upsell opcional tras la entrega de A**: descartado — es exactamente el patrón que hoy depende del fundador y que la decisión 1 busca eliminar.
- **Catálogo de funcionalidades independientes por motor** (ej. una lista de 15 automatizaciones sueltas dentro de C): descartado por la misma razón que se descartó el catálogo plano en Fase 2 — contradice simplicidad operativa y el principio de pensar en plataformas.
- **Construir cada automatización de motor C completamente desde cero por defecto**: descartado — es rentable solo si es la excepción, no la norma; por defecto se busca reutilización modular (decisión 2).

## Riesgos detectados

1. **Riesgo de percepción de venta forzada.** Si el empaquetado obligatorio (decisión 1) no se comunica con transparencia desde el primer contacto, el cliente puede percibirlo como que se le obliga a pagar más de lo que pidió. Impacto medio, probabilidad media — depende de cómo lo traduzca la Fase 6 (Customer Journey) y la Fase 7 (Sistema comercial) en el discurso comercial.
2. **Riesgo de sobre-estandarización.** Si los niveles de servicio (decisión 3) se vuelven demasiado rígidos, se pierde el "a medida" que es parte de la propuesta de valor de Fase 1. Impacto medio, probabilidad baja si el Catálogo (Fase 4) deja margen de personalización dentro de cada nivel.
3. **Riesgo de que la reutilización modular (decisión 2) no sea siempre posible.** Algunos proyectos de motor C pueden no encajar en ningún módulo existente. Esto no invalida la regla — significa que esos casos tienen menor margen relativo, lo cual es información útil para decidir si se aceptan (criterio de Fase 2: valor para el cliente, rentabilidad, escalabilidad, automatización, simplicidad — un proyecto de C sin ningún componente reutilizable falla el criterio de automatización).

## Dependencias con otras fases

- **Desde `03-modelo-negocio.md`**: hereda los motores A/B/C/D y la regla de que A debe convertir a B.
- **Hacia Fase 4 (Catálogo de servicios)**: cada servicio debe encajar en un nivel dentro de un motor, y debe declarar si es de motor C con o sin base modular reutilizable.
- **Hacia Fase 6 (Customer Journey)**: debe traducir el empaquetado obligatorio (decisión 1) en un discurso que no se perciba como venta forzada (riesgo 1).
- **Hacia Fase 7 (Sistema comercial)**: debe codificar la decisión 1 como cláusula fija de contrato, no como criterio discrecional — es lo que efectivamente reduce el FDI del cierre de ventas.
- **Hacia `fdi-registro.md`**: registra el efecto de las decisiones 1 y 2 sobre los procesos ya identificados como críticos en Fase 2.

## Tareas futuras

- Fase 4 debe clasificar cada servicio del catálogo original disperso dentro de un nivel y un motor, marcando cuáles de motor C tienen base modular reutilizable y cuáles no.
- Fase 7 debe redactar la cláusula contractual que fija el empaquetado obligatorio A→B.
- Fase 6 debe diseñar cómo se comunica el empaquetado obligatorio sin que se perciba como venta forzada.

## Auditoría crítica

- **Contradicciones con documentación previa**: ninguna detectada. Refuerza `02-principios-fundacionales.md` (pensar en plataformas, no en servicios) y `03-modelo-negocio.md` (A siempre converge en B).
- **Duplicidades**: ninguna nueva.
- **Riesgos**: tres identificados (percepción de venta forzada, sobre-estandarización, límite de la reutilización modular), ninguno de prioridad crítica — todos dependen de cómo se ejecuten en fases posteriores, no de esta fase en sí.
- **Deuda técnica**: ninguna nueva introducida aquí.
- **Deuda operativa**: ninguna nueva — las decisiones de esta fase reducen deuda operativa futura (evitan que el empaquetado dependa del criterio del fundador caso a caso).
- **Complejidad innecesaria**: ninguna — la estructura de niveles es más simple que el catálogo plano que sustituye.
- **Dependencias peligrosas**: ninguna nueva.
- **Oportunidades de automatización**: la cláusula de empaquetado obligatorio (decisión 1) es candidata a plantilla automática de contrato en Fase 7.
- **Oportunidades de estandarización**: la biblioteca de módulos reutilizables (decisión 2) es, en sí misma, el punto de partida técnico de un futuro motor D.
- **FDI**: dos decisiones de esta fase (1 y 2) mejoran el FDI de procesos ya registrados como críticos; ninguna lo empeora.

## Preguntas que necesitan aprobación

1. ¿Apruebas el empaquetado obligatorio de A con un mínimo de B en el mismo contrato, en vez de como venta posterior?
2. ¿Apruebas la regla de reutilización modular como criterio por defecto para motor C, aceptando que los proyectos sin ningún componente reutilizable tienen menor prioridad relativa?
3. ¿Cuántos niveles de servicio quieres por motor (ej. dos: esencial/a medida, o tres: esencial/avanzado/a medida)? Esta decisión pertenece a Fase 4, pero condiciona cómo se redacta el Catálogo — mejor fijarla antes de escribirlo.
