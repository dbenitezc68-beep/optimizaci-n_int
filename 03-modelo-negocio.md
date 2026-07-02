# 03 — Modelo de negocio

Estado: **propuesto, pendiente de aprobación.** Construido según `00-metodologia.md`, validado contra `02-principios-fundacionales.md`.

## Resumen ejecutivo

INTEREMPREX no vende una lista de servicios independientes. Vende acceso a un sistema con tres motores conectados: **Implementación** (entrada, pago único), **Operación continua** (el motor real de ingresos, recurrente) y **Automatización e IA a medida** (el motor de mayor margen, apalancado en el stack propio). Cada motor alimenta al siguiente: un proyecto de implementación que no desemboca en operación continua es, por definición, una venta fallida — no genera el ingreso predecible que sostiene una empresa tecnológica en vez de una agencia de horas facturables (principio 2 de la constitución).

## Decisiones tomadas

### 1. Arquitectura de ingresos: tres motores, no un catálogo plano

- **A. Implementación** (pago único) — la puerta de entrada: web, primer proyecto de automatización, primera integración. Diseñado explícitamente para desembocar en el motor B, no como venta autoconclusiva.
- **B. Operación continua** (recurrente, facturado vía Stripe desde `interemprex-dashboard`) — mantenimiento, monitorización, automatizaciones vivas, soporte. Este es el negocio real: ingreso predecible, no proyecto puntual.
- **C. Automatización e IA a medida** (por proyecto o por hora) — la línea de mayor margen porque se apalanca directamente en herramientas ya construidas (`leadfinder`, `interemprex-dashboard`) en vez de partir de cero cada vez.

Justificación en los cinco criterios: valor para el cliente (resuelve el problema completo, no un fragmento), rentabilidad (B y C tienen coste marginal decreciente por cliente adicional), escalabilidad (B no depende de horas humanas 1:1 si se automatiza bien — ver riesgos), automatización (los tres motores están diseñados para reducir trabajo manual repetido), simplicidad operativa (tres motores son más fáciles de operar y explicar que 40 líneas de servicio sueltas). Cumple los cinco, no solo tres.

### 2. Motor A nunca es el objetivo, siempre es el medio

Ningún proyecto de implementación se vende sin evaluar su conversión a motor B en el mismo proceso comercial (Fase 6 lo define en detalle). Esto ya estaba implícito en `01-posicionamiento.md` ("qué clientes rechazamos: el proyecto de encargo único sin intención de continuidad") — aquí se convierte en regla estructural del modelo de ingresos, no solo en criterio de filtrado de clientes.

### 3. Consultoría/auditoría puntual como puerta de entrada alternativa

Para prospectos que no están listos para comprometerse a una implementación completa: consultoría o auditoría de pago único, alto margen, bajo compromiso. Filtra intención real antes de invertir tiempo de implementación completa. Alimenta al motor A, no lo sustituye.

### 4. El propio stack (`interemprex-dashboard`, `leadfinder`) se mantiene como herramienta interna, no como producto vendible, por ahora

Existe la opción futura de productizar el CRM interno o el motor de prospección como oferta independiente (SaaS vendible a otras agencias, por ejemplo). No se decide aquí: es una opción a evaluar en fases posteriores con datos reales de uso interno, no una línea de ingreso que se declare hoy sin validar. Declararla ahora sería inventar un producto que todavía no existe como oferta — contradice el principio 2 de la constitución.

## Decisiones descartadas

- **Catálogo plano de 40+ servicios independientes** (como se listaba en la petición inicial del proyecto): descartado por contradecir el criterio de simplicidad operativa y el principio constitucional de "pensar en plataformas, no en servicios". Cada servicio de ese listado debe encajar dentro de uno de los tres motores en la Fase 4 (Catálogo) — no coexistir como líneas sueltas.
- **Modelo basado en horas facturables como ingreso principal**: descartado porque no supera la prueba de escalabilidad de 500 clientes (ingreso ligado linealmente a horas humanas, sin apalancamiento de software) y contradice el principio constitucional 7 (automatizar antes de contratar).
- **Productizar el CRM/leadfinder como oferta pública ya**: descartado por ahora — no hay validación de que funcione fuera del uso interno, y afirmarlo como línea de ingreso sería un dato inventado.

## Riesgos detectados

1. **Colapso a agencia de horas si el motor A no convierte a B.** Si el pipeline se llena de proyectos puntuales sin continuidad, el modelo deja de ser una empresa tecnológica con ingreso recurrente y pasa a ser exactamente lo que la constitución prohíbe en su punto 2. Mitigación: la conversión A→B se mide como métrica central desde la Fase 6.
2. **Deuda técnica que bloquea la prueba de escalabilidad de 50 empleados / 500 clientes.** `interemprex-dashboard` usa SQLite y su propio README lo declara explícitamente "pensado para uso local/single-tenant". El motor B (operación continua, el ingreso real) no puede escalar a cientos de clientes sobre esa base sin migrar a Postgres multi-tenant. Se documenta aquí porque es un riesgo de modelo de negocio, no solo de tecnología: el ingreso recurrente que sostiene la empresa depende de una base de datos que hoy no soporta el volumen que el propio modelo aspira a alcanzar.
3. **Punto único de fallo en el cierre comercial.** Nada en el proyecto indica que exista hoy un proceso de venta que no dependa del fundador interviniendo personalmente. Falla la prueba de escalabilidad "el fundador no puede intervenir durante un mes".
4. **Motor B, tal como está definido, no supera la prueba de 500 clientes si el soporte es manual 1:1.** Para que la operación continua sea rentable a escala, el mantenimiento y soporte deben apoyarse en monitorización y alertas automatizadas, no en revisión periódica humana. Esto no se resuelve en esta fase — se declara como dependencia hacia Fase 7.

## Dependencias con otras fases

- **Desde `01-posicionamiento.md`**: el criterio "rechazar clientes sin intención de continuidad" es la defensa del modelo contra el riesgo 1.
- **Desde `02-principios-fundacionales.md`**: principios 1, 2, 5, 7 y 10 aplican directamente a la arquitectura de motores.
- **Hacia Fase 3 (Arquitectura de la oferta)**: debe encajar cada servicio dentro de los motores A/B/C, no como lista independiente.
- **Hacia Fase 4 (Catálogo de servicios)**: hereda la obligación de consolidar el listado disperso original dentro de los tres motores.
- **Hacia Fase 6 (Sistema comercial)**: debe resolver el riesgo 3 (dependencia del fundador) y definir cómo se mide la conversión A→B.
- **Hacia Fase 7 (Operaciones)**: debe definir el proceso de ejecución de un proyecto tipo para que sea delegable, y el modelo de soporte automatizado para el motor B (riesgo 4).
- **Hacia Fase 10 (Tecnología)**: debe decidir cuándo migrar `interemprex-dashboard` a una base de datos multi-tenant (riesgo 2).
- **Hacia Fase 13 (Finanzas)**: aquí no se fija ninguna cifra de margen, precio interno o coste por hora — se fija solo el orden relativo de rentabilidad esperado (C > B > A, por apalancamiento decreciente en horas humanas). Las cifras reales se calculan en Fase 13 con datos reales del fundador, tal como exige el principio 10 de la constitución.

## Tareas futuras

- Definir en Fase 6 la métrica y el proceso de conversión de motor A a motor B.
- Evaluar en Fase 10 el coste y momento de migrar el dashboard a Postgres multi-tenant.
- Evaluar en fase posterior (no antes de tener datos de uso interno reales) si `interemprex-dashboard` o `leadfinder` se productizan como oferta independiente.
- Diseñar en Fase 7 un modelo de soporte para el motor B que no dependa de revisión manual 1:1 por cliente.

## Auditoría crítica

- **Contradicciones con documentación previa:** ninguna detectada. El modelo refuerza `01-posicionamiento.md` y `02-principios-fundacionales.md` sin contradecirlos.
- **Duplicidades:** ninguna — es la primera vez que se define la arquitectura de ingresos.
- **Deuda técnica:** confirmada (riesgo 2, base de datos single-tenant).
- **Deuda operativa:** confirmada (riesgo 3, sin proceso de venta documentado; no existe todavía un proceso escrito de "cómo se ejecuta un proyecto tipo").
- **Complejidad innecesaria:** detectada en el catálogo original de 40+ servicios; se resuelve consolidándolo en Fase 4.
- **Dependencias peligrosas:** el cierre comercial depende al 100% del fundador (riesgo 3).
- **Oportunidades de automatización:** alertas de monitorización para el motor B en vez de revisión manual (riesgo 4); scoring de conversión A→B dentro del propio dashboard.
- **Oportunidades de estandarización:** plantillar el "proyecto tipo" de implementación para que sea ejecutable por alguien distinto del fundador.

## Preguntas que necesitan aprobación

1. ¿Confirmas los tres motores (Implementación / Operación continua / Automatización e IA a medida) como arquitectura de ingresos, sustituyendo al catálogo plano de 40+ servicios del planteamiento inicial?
2. ¿Autorizas que la Fase 4 (Catálogo de servicios) reduzca y consolide ese listado original dentro de estos tres motores, en vez de mantener cada servicio como línea independiente?
3. La migración del dashboard a base de datos multi-tenant (riesgo 2): ¿la tratamos como tarea normal de la Fase 10 (Tecnología), o quieres elevarla de prioridad antes de seguir añadiendo clientes reales al sistema actual?
