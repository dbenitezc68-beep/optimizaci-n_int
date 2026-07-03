# KPIs — INTEREMPREX

Documento vivo, no una fase — así lo decidió el usuario en vez de crear una Fase 16 dedicada. Registro oficial de indicadores de toda la empresa. Cada fase añade únicamente los indicadores que le corresponden; ninguna fase redefine un indicador que ya exista aquí sin decirlo explícitamente.

**Regla heredada de `00-metodologia.md` y `02-principios-fundacionales.md`**: ningún KPI se rellena con una cifra inventada. Si no hay dato real todavía, el campo "Valor actual" dice "sin datos" — nunca un número de ejemplo.

## Registro

| KPI | Qué mide | Cómo se calcula | Fase de origen | Valor actual |
|---|---|---|---|---|
| FDI medio de la empresa | Cuánto depende el conjunto de procesos documentados del fundador | Media de puntuación de todos los procesos en `fdi-registro.md` (0=automatizado, 3=exclusivo del fundador) | `00-metodologia.md` / Fase 2 | **1,5 / 3** (6 procesos registrados) — único KPI con dato real hoy |
| % de ingresos recurrentes sobre ingresos totales | Cuánto del ingreso es predecible (Motor B) frente a puntual (Motor A, Motor C) | Ingresos de Motor B (líneas Operación técnica + Gestión del crecimiento) ÷ ingresos totales del periodo | `02-principios-fundacionales.md` (punto 10), `03-modelo-negocio.md` | Sin datos — se calcula en Fase 14 (Finanzas) |
| Tasa de conversión Motor A → Motor B | Si el modelo de negocio está funcionando como se diseñó, o colapsando a agencia de horas (riesgo R1) | Clientes que activan Motor B ÷ clientes que completan la etapa Implementación de Motor A | `03-modelo-negocio.md` (riesgo R1, ciclo de vida del cliente) | Sin datos — 0 clientes han completado el ciclo completo todavía |
| Concentración de clientes | Dependencia de la empresa de un número reducido de clientes (riesgo R10) | % de ingresos (o de relación activa) que representa el cliente más grande | `03-modelo-negocio.md` (riesgo R10) | Sin datos de facturación — cualitativamente alta hoy: 2 proyectos piloto en total (bbabogados, costaflora) |
| % de trabajo interno cubierto por herramientas propias vs. horas humanas | Si la empresa se apalanca en software propio o en tiempo del fundador | No definido con precisión todavía — depende de cómo se midan las horas por proceso | `02-principios-fundacionales.md` (punto 10) | Sin datos — pendiente de refinar en Fase 9 (Automatizaciones) |
| Retención / renovación de clientes | Si los clientes se quedan más allá del primer año o del fin de la tarifa de lanzamiento | % de clientes que renuevan tras la revisión de Año 1 del ciclo de vida | `02-principios-fundacionales.md` (punto 10), `03-modelo-negocio.md` (ciclo de vida, Año 1) | Sin datos — ningún cliente ha llegado todavía a ese punto (proyectos piloto recientes) |
| % de proyectos de Motor C con base modular reutilizable | Si el motor de mayor margen se está construyendo sobre módulos reutilizables o desde cero cada vez (decisión 2 de Fase 3) | Proyectos de Motor C que reutilizan un módulo existente del stack propio ÷ total de proyectos de Motor C | `04-arquitectura-oferta.md` | Sin datos — Motor C sin proyectos ejecutados registrados todavía |
| % de líneas de servicio del catálogo con capacidad Core completa | Si el catálogo vende lo que realmente puede entregar, o promete más de lo construido | Líneas de servicio con capacidad Core completa ÷ total de líneas del catálogo | `05-catalogo-servicios.md` | **6 de 8 líneas con capacidad completa hoy** (Gestión del crecimiento Niveles 2-3 son las dos sin capacidad completa) |
| Tasa de conversión Diagnóstico → Motor A | Si la puerta de entrada de menor compromiso convierte a proyectos reales | Clientes que contratan Motor A tras un Diagnóstico ÷ Diagnósticos realizados | `05-catalogo-servicios.md` | Sin datos — ningún Diagnóstico registrado como servicio formal todavía |

## Cómo se actualiza este registro

Cada fase que define un indicador nuevo añade una fila aquí citando su fase de origen. Cuando exista un dato real (por ejemplo, al cerrar el primer ciclo de un cliente, o cuando Fase 14 calcule cifras reales), se actualiza la columna "Valor actual" — nunca se adelanta un valor antes de tenerlo.

---

**Qué modifica**: no fija decisiones — es el registro consolidado de qué se va a medir y cómo, para toda la empresa.

**Qué documentos dependen de este**: ninguno depende de su contenido para tomar decisiones, pero toda fase futura que proponga un indicador debe añadirlo aquí en vez de dejarlo suelto en su propio documento.

**Qué documentos deben revisarse si este cambia**: `enterprise-blueprint.md` (el bloque KPIs referencia este documento como su resolución).
