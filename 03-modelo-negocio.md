# 03 — Modelo de negocio

Estado: **v3, cerrada y aprobada.** Construido según `00-metodologia.md`, validado contra `02-principios-fundacionales.md`. La v1 aprobó la arquitectura de tres motores; la v2 añadió arquitectura económica, cuarto motor latente, Business Model Canvas, ciclo de vida del cliente y una auditoría de riesgos re-ejecutada; la v3 incorpora la regla de prioridad del motor D, cierra las tres preguntas pendientes y traslada R9 (legal) a una fase propia del roadmap.

## Resumen ejecutivo

INTEREMPREX no vende una lista de servicios independientes. Vende acceso a un sistema con tres motores activos — **Implementación** (entrada, pago único), **Operación continua** (el motor real de ingresos, recurrente) y **Automatización e IA a medida** (mayor margen, apalancado en stack propio) — más un **cuarto motor latente**: la posibilidad de que las herramientas internas evolucionen a producto comercializable, diseñado desde ya en la arquitectura aunque no se explote todavía. El dinero entra por liquidez inmediata (proyectos, consultoría puntual), se estabiliza en recurrencia (operación continua) y se multiplica en margen (automatización a medida) a medida que la relación con el cliente madura durante varios años, no varios meses.

## Decisiones tomadas

### 1. Arquitectura de ingresos: tres motores activos, uno latente

Se mantiene de la v1: **A. Implementación** (pago único, puerta de entrada), **B. Operación continua** (recurrente, el negocio real), **C. Automatización e IA a medida** (mayor margen). Se añade:

**D. Plataforma/producto propio (latente, no comercial todavía).** Ver decisión 3.

### 2. Arquitectura económica — cómo circula el dinero

| Línea | Liquidez inmediata | Ingreso recurrente | Margen relativo | Fidelización | Abre nuevas oportunidades |
|---|---|---|---|---|---|
| Consultoría/auditoría puntual | Alta | No | Alto (bajo coste de entrega) | Baja por sí sola | Alta — filtra intención real antes de A |
| A. Implementación | Alta (cobro al cierre/hitos) | No | Medio (intensivo en horas) | Baja por sí sola | Alta — es la puerta obligada hacia B |
| B. Operación continua | Baja por cliente individual | **Sí — el motor real (MRR)** | Medio-alto (coste marginal decreciente al estandarizar) | Alta — aquí se construye la relación | Media — el uso diario revela cuellos de botella nuevos |
| C. Automatización e IA a medida | Alta (hitos de proyecto) | Parcial (el soporte de lo entregado alimenta a B) | **Alto — el mayor, por apalancamiento en stack propio** | Media-alta — resuelve dolor visible | Alta — cada automatización revela la siguiente |
| D. Plataforma propia (latente) | No a corto plazo | Sí, a largo plazo, si se activa | Muy alto potencial (coste marginal casi cero por cliente adicional) | No aplica todavía | Alta a largo plazo — abre un segmento de cliente nuevo (otras agencias/consultoras, no solo pymes) |

**Flujo completo, de captación a renovación:** leadfinder o referido capta el prospecto → consultoría puntual o venta directa de A actúa como filtro real de intención (criterio de Fase 1: sin acceso a sistemas, no hay trato) → A entrega resultado tangible y ancla el precio, con tarifa de lanzamiento si aplica → en el mismo proceso comercial, no como venta separada posterior, se activa B → durante B, el uso real del sistema (no una campaña de upsell) revela el siguiente cuello de botella → ese cuello de botella se vende como C, con el margen más alto porque reutiliza herramientas ya construidas → lo entregado en C generalmente necesita soporte, que vuelve a engordar B → con el tiempo, el patrón de casos reales resueltos en B y C es lo que, eventualmente, podría justificar activar D.

No se incluyen aquí porcentajes de conversión entre etapas, duración media del ciclo ni volumen de ingreso por línea — son cifras que no existen todavía y que corresponden a la Fase 14 (Finanzas) con datos reales, no a esta fase.

### 3. Motor D — Plataforma/producto propio, diseñado ahora, explotado después

Se evalúa si debe incorporarse un cuarto motor relacionado con productizar `interemprex-dashboard` o `leadfinder`. Aplicando los cinco criterios de `00-metodologia.md`:

- **Valor para el cliente**: indirecto hoy (el cliente de INTEREMPREX se beneficia de que estas herramientas mejoren con cada proyecto). Directo en el futuro si se vende a terceros (otras agencias o consultoras pequeñas con el mismo problema de falta de tooling propio).
- **Rentabilidad**: potencial muy alto a largo plazo (coste marginal por cliente adicional cercano a cero), pero nulo a corto plazo y con coste de oportunidad real si se invierte tiempo de desarrollo en funcionalidades de producto en vez de en clientes de pago actuales.
- **Escalabilidad**: es el único motor con escalabilidad no ligada a horas humanas — encaja de forma natural con las pruebas de "500 clientes" y "varios países", pero solo si la base técnica se diseña bien desde ahora.
- **Automatización**: es la expresión máxima del principio constitucional 7 — no es una automatización para un cliente, es la automatización convertida en el producto mismo.
- **Simplicidad operativa**: aquí falla. Mantener un producto para terceros exige soporte, documentación, seguridad y roadmap de producto que hoy no existen como capacidad operativa.

Cumple bien tres de cinco (valor futuro, rentabilidad futura, escalabilidad, automatización) y falla uno con claridad (simplicidad operativa a corto plazo). Conclusión: **no se activa como motor de ingresos ahora.** Activarlo hoy, sin casos de uso demostrados con clientes reales, repetiría el error ya corregido en Fase 1: vender una promesa en vez de una prueba. Pero **se diseña la arquitectura técnica pensando en esta posibilidad** (separación de datos por cliente, capacidad de aislar información, arquitectura preparada para multi-tenencia) — es una decisión de arquitectura de software que se ejecuta en Fase 11, no una línea de ingreso activa hoy. Condición objetiva para activarlo: cuando el uso interno con varios clientes reales demuestre valor consistente **y** exista capacidad operativa real para dar soporte a un producto — no antes.

**Regla de prioridad, aprobada:** el objetivo del motor D no es preparar un futuro producto vendible por sí mismo — es construir herramientas internas reutilizables que, solo cuando demuestren suficiente valor operativo interno, puedan evolucionar hacia productos comercializables. Toda decisión relacionada con D se juzga primero por cuánto reduce el trabajo interno o el FDI de un proceso (ver más abajo), y solo después por su potencial de venta futura. Vender es una consecuencia posible, nunca el objetivo de diseño inicial.

**Impacto en el FDI**: cada herramienta interna que absorbe conocimiento que hoy vive solo en la cabeza del fundador (por ejemplo, encapsular la lógica de un tipo de automatización dentro de un módulo del dashboard en vez de resolverla ad-hoc) mejora el FDI de los procesos que dependen de ella, moviéndolos de "Exclusivo del fundador" hacia "Delegable con formación" o "Automatizado". Es el criterio objetivo con el que se evalúa cada decisión futura sobre D, no la posibilidad de venderlo.

### 4. Business Model Canvas

Coherente con `01-posicionamiento.md` y `02-principios-fundacionales.md`. Donde no existe dato real, se marca explícitamente como pendiente en vez de inventarlo.

- **Segmentos de clientes**: pymes españolas con procesos operativos manuales, sin digitalizar, con capacidad de pago sostenible y voluntad de dar acceso real a sus sistemas. Sin nicho de sector cerrado en el mensaje público (decisión de Fase 1); foco táctico de prospección se decide en Fase 7.
- **Propuesta de valor**: software propio implementado directamente sobre los sistemas reales del cliente — no plantilla adaptada, no promesa sin respaldo. Prueba demostrable (dashboard, leadfinder) en vez de casos inventados.
- **Canales**: leadfinder (pipeline propio), referidos desde clientes en motor B, web propia (pendiente de reescritura, Fase 12). El resto del mix de canales (redes, contenido, etc.) se define en Fase 12 — no se inventa aquí.
- **Relación con clientes**: implementación directa y colaborativa, no consultoría de informe y adiós. Soporte continuo vía motor B. Transparencia explícita sobre qué parte del trabajo es automatización/IA y qué parte es trabajo humano (principio constitucional 4).
- **Fuentes de ingresos**: los tres motores activos (A, B, C) más consultoría puntual. Motor D, latente.
- **Recursos clave**: el stack de software propio (dashboard, leadfinder), el conocimiento técnico del fundador, la prueba pública de capacidad técnica (una vez corregida la web).
- **Actividades clave**: desarrollo y mantenimiento del stack propio, implementación en sistemas de cliente, prospección automatizada, soporte y monitorización recurrente.
- **Socios clave**: **no hay socios estratégicos de negocio formalizados todavía** — dato real, no se inventa ninguno. Existen proveedores de infraestructura (Stripe para pagos, Vercel para hosting de al menos un cliente en producción, registrador de dominios), pero son proveedores técnicos, no alianzas estratégicas; no se presentan como lo mismo.
- **Estructura de costes**: sin datos reales de coste (herramientas, tiempo, suscripciones de terceros) no se puede fijar ninguna cifra. Lo que sí se puede describir es la naturaleza: mayoritariamente tiempo del fundador, coste marginal bajo en herramientas ya construidas y amortizadas, costes variables de infraestructura (hosting, comisiones de Stripe). El cálculo real se hace en Fase 14.

### 5. Ciclo de vida económico del cliente (0–5 años)

Diseñado como relación de largo plazo, no como proyecto puntual — coherente con el rechazo de Fase 1 a clientes sin intención de continuidad.

- **Mes 0 — Captación**: vía leadfinder o entrada por consultoría/auditoría puntual. Se aplica el filtro de aceptación de Fase 1 antes de cotizar nada.
- **Mes 0-1 — Conversión inicial (motor A)**: cierre del proyecto de implementación, con tarifa de lanzamiento si el cliente entra dentro del tope vigente (Fase 1). Liquidez inmediata.
- **Mes 1-2 — Transición a recurrencia (punto de mayor riesgo de fuga)**: activación de motor B en el mismo proceso comercial, no como venta separada posterior. Si no se convierte aquí, el cliente se pierde como fuente de ingreso recurrente — es el mecanismo exacto del riesgo R1 (ver auditoría de riesgos).
- **Mes 2-12 — Consolidación**: soporte activo, primeras detecciones de cuellos de botella nuevos vía uso real del sistema. Posible primera venta de motor C si aparece una necesidad clara.
- **Año 1 — Primera revisión de condiciones**: si hubo tarifa de lanzamiento, aquí es donde se pasa a tarifa estándar (el tope temporal fijado en Fase 1 se cumple, no se prorroga en silencio). Punto de fricción gestionado con transparencia explícita, no con sorpresa en la factura.
- **Año 2-3 — Expansión**: nuevas líneas de motor C según el crecimiento real del cliente, posible ampliación del alcance de motor B. Si D estuviera activo para entonces, es el punto natural para ofrecer funcionalidad de plataforma sin coste de desarrollo adicional por cliente.
- **Año 3-5 — Madurez**: riesgo de que el cliente perciba el sistema como "ya optimizado" e intente reducir el motor B — se mitiga manteniendo valor visible (informes, nuevas automatizaciones), no dejando el mantenimiento en piloto automático silencioso. Si la relación llega sana a este punto, es candidato a caso de éxito público real (con permiso explícito del cliente) — la prueba social que hoy no existe todavía de forma honesta.

No se incluyen cifras de LTV o CAC en euros — es el mapa estructural del ciclo, no el modelo numérico, que corresponde a Fase 14.

## Decisiones descartadas

- Catálogo plano de 40+ servicios independientes (mantenido de v1, confirmado por la aprobación recibida).
- Modelo basado en horas facturables como ingreso principal (mantenido de v1).
- **Activar el motor D comercialmente ya**: descartado — no cumple simplicidad operativa a corto plazo y repetiría el error de vender promesa sin prueba (ver decisión 3).
- **Fijar una fecha arbitraria para migrar la base de datos**: descartado explícitamente a petición del usuario. Sustituido por criterios objetivos de disparo (ver riesgo tecnológico R5 y su plan de transición, abajo).

## Riesgos detectados (ampliado y priorizado por impacto y probabilidad)

Sin datos históricos reales, la probabilidad se estima de forma cualitativa (Alta/Media/Baja), no numérica — asignar un porcentaje falso de probabilidad sería inventar precisión que no existe.

**Prioridad crítica — impacto alto, probabilidad alta, son la situación actual, no un escenario futuro:**

1. **R1 — Comercial. Colapso a agencia de horas si el motor A no convierte a B.** Sin proceso comercial formal (Fase 7 pendiente), el criterio de rechazo de Fase 1 no basta por sí solo.
2. **R2 — Comercial/operativo. Dependencia total del fundador en el cierre de ventas.** No existe hoy ningún proceso de venta que no requiera su intervención directa.
3. **R3 — Financiero. Decisiones de precio tomadas sin conocer el coste real ni el punto de equilibrio.** El pricing de Fase 1 es razonado, pero no está validado contra datos de coste reales — eso es Fase 14.
4. **R10 — Concentración de clientes. Con 2 proyectos piloto activos (bbabogados, costaflora), perder cualquiera de los dos representa una parte muy alta de la base actual.** Se diluye de forma natural según crezca el número de clientes.
5. **R12 — Dependencia tecnológica. El fundador es el único desarrollador y mantenedor de todo el stack propio.** Sin continuidad documentada, coincide con la prueba de escalabilidad "el fundador no puede intervenir durante un mes" — aquí elevado a riesgo de continuidad de negocio, no solo de proceso.

**Prioridad alta — impacto alto, probabilidad media o no verificada:**

6. **R5 — Tecnológico. Base de datos SQLite / single-tenant en `interemprex-dashboard`.** Ver plan de transición con criterios objetivos, abajo.
7. **R6 — Tecnológico/operativo. Sin evidencia de estrategia de backup o continuidad para el dashboard.** No se ha encontrado documentación de copias de seguridad automatizadas para los datos de clientes, pipeline y pagos — a diferencia del panel de cumplimiento (`gestion-interemprex`), que sí tiene una copia de seguridad simple documentada. Probabilidad no verificada, impacto alto si ocurriera (pérdida de datos de clientes y pagos). **Se mantiene abierta sin cambio técnico**: se añade como punto de control obligatorio al diseñar la arquitectura tecnológica definitiva en Fase 11, no se actúa antes.
8. **R9 — Legal. Cumplimiento no auditado en profundidad**: la web tiene política de privacidad, pero no se ha revisado el tratamiento real de datos en el dashboard, ni la base legal de que `leadfinder` recopile datos de negocios de terceros vía scraping de OpenStreetMap. Impacto alto (sanciones AEPD), probabilidad media. **Resuelto**: se crea una fase propia — Fase 5, Legal y Cumplimiento — en vez de integrarlo en Operaciones. La exposición ya activa hoy (scraping en marcha, dashboard con datos reales de clientes) no espera a que llegue esa fase en orden: se trata como verificación preliminar urgente, no como parte del alcance completo de la Fase 5.

**Prioridad media:**

9. **R4 — Financiero. Que la tarifa de lanzamiento se convierta de facto en permanente por falta de disciplina** en aplicar el tope ya fijado en Fase 1.
10. **R8 — Operativo. Duplicidad de sistemas de gestión interna**: `interemprex-dashboard` (CRM completo, en uso) y `dashboard-interemprex.html` / `interemprex.json` (panel de cumplimiento, vacío desde su creación) cubren propósitos parcialmente solapados sin una diferenciación de uso decidida. Documentado en detalle en [`duplicidad-paneles-gestion.md`](./duplicidad-paneles-gestion.md) — por instrucción explícita, la resolución (fusionar, eliminar o mantener) se decide en Fase 8, no aquí.
11. **R11 — Dependencia tecnológica de terceros.** Stripe (pagos del motor B), Overpass/OpenStreetMap (única fuente de datos de leadfinder — cambios en su política de acceso afectan directamente a la prospección), Vercel (hosting de al menos un cliente en producción). Impacto medio-alto si alguno cambia condiciones; probabilidad baja-media a corto plazo, real a 5 años.

**Prioridad baja (mitigada, seguir vigilando):**

12. **R7 — Operativo. Sin proceso documentado de ejecución de un "proyecto tipo".** Ya identificado en v1, dependencia hacia Fase 8.

### R5 — Plan de transición de SQLite con criterios objetivos (no fecha)

No se fija una fecha porque hoy, con 2 clientes piloto, ningún disparador real está activo. Se define el criterio, y la responsabilidad de vigilarlo recae en Fase 11, con revisión obligatoria al cierre de cualquier fase que aumente el volumen de clientes (especialmente Fase 7):

- **Disparador de concurrencia**: iniciar la migración cuando se prevea de forma sostenida más de una escritura simultánea en ventanas de segundos (varios webhooks de Stripe o actualizaciones de pipeline al mismo tiempo) — SQLite limita la escritura concurrente por diseño, no es una cuestión de volumen total de filas.
- **Disparador funcional**: si se decide activar el motor D para terceros, la migración deja de ser opcional — un producto vendido a otras empresas exige aislamiento de datos por tenant que un fichero SQLite único no garantiza con seguridad.
- **Disparador de infraestructura**: si el dashboard se despliega en una plataforma sin disco persistente (el propio README de `leadfinder` ya advierte del mismo problema para su base SQLite), la migración pasa de mejora a requisito de funcionamiento.
- **Disparador de carga de lectura**: si los informes de MRR/pipeline empiezan a tardar de forma perceptible por volumen histórico acumulado.

## Dependencias con otras fases

- **Desde `01-posicionamiento.md`**: el criterio de rechazo a clientes sin continuidad protege contra R1; el tope temporal de la tarifa de lanzamiento es la base del ciclo de vida del cliente en el Año 1.
- **Desde `02-principios-fundacionales.md`**: principios 1, 2, 4, 5, 7, 8 y 10 aplican directamente.
- **Hacia Fase 3 (Arquitectura de la oferta)** y **Fase 4 (Catálogo)**: heredan la clasificación de cada servicio dentro de los motores A/B/C.
- **Hacia Fase 7 (Sistema comercial)**: debe resolver R1 y R2 (proceso de venta y de conversión A→B que no dependa solo del fundador).
- **Hacia Fase 8 (Operaciones)**: debe resolver R7 (proceso delegable) y decidir el destino de la duplicidad R8 (los dos paneles de gestión).
- **Hacia Fase 11 (Tecnología)**: debe vigilar los disparadores de R5, verificar R6 (backups) y diseñar la base técnica de R12 (continuidad sin el fundador) y de un eventual motor D.
- **Hacia Fase 14 (Finanzas)**: calcula las cifras reales de margen, LTV, CAC y resuelve R3 y R4 con datos reales.
- **Hacia Fase 5 (Legal y Cumplimiento, nueva)**: resuelve R9 en profundidad — RGPD, LOPDGDD, encargos de tratamiento, contratos, condiciones generales, privacidad, cookies, uso de IA, licencias, propiedad intelectual, scraping y fuentes de datos, riesgos regulatorios. La parte de "uso de IA" depende a su vez de que Fase 10 (IA) exista, así que Fase 5 cubre el marco general y necesita una revisión secundaria después de Fase 10.
- **Hacia `fdi-registro.md`**: los procesos identificados como críticos en esta fase (cierre de ventas, desarrollo del stack propio, ejecución de proyecto tipo) quedan registrados como "Exclusivo del fundador" — el objetivo de las fases 7, 8 y 11 es moverlos a niveles más bajos.

## Tareas futuras

- Definir en Fase 7 el proceso y la métrica de conversión A→B, y reducir la dependencia del fundador en el cierre.
- Verificar en Fase 11 la existencia real de backups del dashboard (R6, punto de control ya registrado) y vigilar los disparadores de migración de SQLite (R5).
- Decidir en Fase 8 si los dos paneles de gestión interna (R8) se consolidan, se diferencian explícitamente, o se elimina uno — con `duplicidad-paneles-gestion.md` como base documental.
- Evaluar, no antes de tener datos de uso interno reales, si se activa el motor D, priorizando siempre el beneficio interno sobre la venta.
- Ejecutar Fase 5 (Legal y Cumplimiento) antes de Customer Journey y Sistema comercial, con una revisión preliminar de scraping/RGPD que no espere al orden completo del roadmap dado que la exposición ya es real hoy.

## Auditoría crítica (re-ejecutada sobre la v2 completa)

- **Contradicciones con documentación previa**: ninguna detectada. La v2 refuerza `01-posicionamiento.md` y `02-principios-fundacionales.md`; el motor D respeta el principio 8 (no adoptar tecnología/producto de moda sin necesidad real) al mantenerse latente en vez de activarse.
- **Duplicidades**: una detectada (R8, los dos paneles de gestión), ya existía desde la Fase 0. Ahora está documentada en detalle en `duplicidad-paneles-gestion.md`, sin resolución todavía por instrucción explícita.
- **FDI**: los tres procesos más críticos de esta fase (cierre de ventas, mantenimiento del stack propio, ejecución de proyecto tipo) quedan registrados en `fdi-registro.md` como "Exclusivo del fundador" (puntuación 3). Es el punto de partida — cualquier fase que los toque debe declarar si los mejora.
- **Riesgos**: ampliados de 4 a 12, categorizados y priorizados (ver arriba). Los cinco de prioridad crítica son la situación actual de la empresa, no proyecciones.
- **Deuda técnica**: R5 (SQLite, con plan de transición por criterios objetivos) y R6 (backups no verificados).
- **Deuda operativa**: R2, R7, R8.
- **Complejidad innecesaria**: ninguna nueva; el catálogo disperso original sigue pendiente de resolver en Fase 4.
- **Dependencias peligrosas**: R2, R11, R12 — dos de tres dependen del fundador como punto único de fallo, una de terceros (Stripe, Overpass, Vercel).
- **Oportunidades de automatización**: detección automática de cuellos de botella dentro de B (para alimentar C) sin depender de que el fundador la note manualmente; alertas de monitorización en vez de revisión pasiva.
- **Oportunidades de estandarización**: plantillar el "proyecto tipo" (R7); definir un protocolo único de qué panel de gestión usar para qué (R8).
- **Coherencia con la constitución**: verificada punto por punto. No inventa datos (costes, socios, LTV se marcan explícitamente como pendientes). Motor D no se vende sin probarlo primero (principio 1 y 8). Ningún cliente se acepta sin cumplir los criterios de Fase 1 (principio 9 de la constitución, heredado).

## Preguntas que necesitan aprobación

1. **Resuelta** — arquitectura de tres motores confirmada por la dirección general.
2. **Resuelta** — consolidación del catálogo en Fase 4 queda pendiente de ejecutar, no de aprobar de nuevo.
3. **Resuelta** — el plan de transición de SQLite por criterios objetivos sustituye a la pregunta de fecha.
4. **Resuelta** — motor D confirmado como latente por diseño, con la regla de prioridad (beneficio interno antes que venta) incorporada.
5. **Resuelta** — Legal y Cumplimiento se convierte en fase propia (Fase 5 del roadmap), no se integra en Operaciones.
6. **Resuelta** — R6 y R8 permanecen abiertas sin cambio técnico: R8 ya está documentada en `duplicidad-paneles-gestion.md` a la espera de Fase 8; R6 queda como punto de control para Fase 11.
7. **Nueva**: la exposición legal de R9 (scraping de `leadfinder`, tratamiento de datos en el dashboard) ya es real hoy, no solo en el futuro orden del roadmap. ¿Quieres una verificación legal preliminar antes de que el pipeline de captación siga creciendo, o prefieres esperar a que Fase 5 llegue en su orden natural del roadmap?
