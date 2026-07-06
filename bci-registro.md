# BCI — Registro de criticidad empresarial

Registro vivo del Business Criticality Index. Escala y reglas definidas en [`00-metodologia.md`](./00-metodologia.md). No es una fase — se actualiza cada vez que se documenta una capacidad, sistema o proceso nuevo.

## Capacidades Core (`capacidades-core.md`)

| Capacidad | BCI | Justificación |
|---|---|---|
| 1. Desarrollo web a medida | 3 | Sin ella se detiene la entrada de nuevos proyectos de Motor A, pero Motor B (ingreso ya activo) sigue funcionando — moderado, no detiene el negocio. |
| 2. CRM / gestión comercial propia | **5** | Pérdida temporal deja a la empresa sin visibilidad de pipeline ni de cobro gestionado — es la pieza que sostiene el ingreso recurrente real. Coincide con R13 (incidencia crítica de continuidad). |
| 3. Prospección automatizada | 3 | Sin ella se corta la entrada de pipeline propio, pero los clientes ya activos no se ven afectados de inmediato — grave a medio plazo, no una detención inmediata. |
| 4. Automatización con IA aplicada | 2 | Hoy es una función aislada sin uso real confirmado; su pérdida temporal no detiene nada crítico todavía. |
| 5. Integración de pagos y facturación recurrente | **5** | Sin esto, Motor B deja de cobrar automáticamente — es directamente el mecanismo del ingreso real de la empresa. |
| 6. SEO técnico estructurado | 2 | Su ausencia temporal no detiene la operación — es un factor de calidad/visibilidad a medio plazo, no una función central. |

## Sistemas (`inventario-tecnologico.md`)

| Sistema | BCI | Justificación |
|---|---|---|
| `interemprex-dashboard` | **5** | Contiene las capacidades 2 y 5 — coincide con el BCI más alto del inventario. Agravado por R13 (sin repositorio remoto). |
| `leadfinder` | 3-4 | Contiene la capacidad 3 (pipeline propio) y la capacidad 4 (IA). Su pérdida detiene la prospección, pero no la operación de clientes ya activos. |
| `interemprex` (web pública) | 3 | Es la cara pública de la empresa — su caída afecta a la conversión de nuevos prospectos y a la confianza, pero no detiene el servicio a clientes existentes. |
| `dashboard-interemprex.html` (panel de cumplimiento) | 1 | Sin uso real hasta la fecha — su pérdida no afecta a nada operativo hoy. |

## Procesos

| Proceso | BCI | Justificación |
|---|---|---|
| Cierre de ventas | 4 | Sin él no entra ingreso nuevo, pero los clientes actuales de Motor B siguen operando — grave, no crítico en el sentido de detener el negocio existente. |
| Ejecución de un "proyecto tipo" de implementación | 3 | Su ausencia ralentiza la entrega, no la detiene — depende de la capacidad 1, ya evaluada arriba. |

## Fallo de diseño detectado (auditoría adversarial, Modo Optimización Total)

La escala 1-5 no define **cuánto dura** "temporal". Una pérdida de `interemprex-dashboard` de 1 hora y una de 1 mes no son el mismo evento, y hoy ambas puntúan igual (5) porque la escala no tiene dimensión de tiempo. Esto no se corrige rehaciendo la tabla (no hay evidencia de que el número cambie para ninguna fila) — se corrige con una regla de uso adicional:

**Regla añadida**: el valor de BCI registrado asume una pérdida de referencia de **hasta una semana**. Pérdidas más cortas pueden justificar un valor menor en la práctica; pérdidas más largas que una semana se tratan como un incidente de continuidad de negocio (ver R13 en `03-modelo-negocio.md`), no como un evento BCI ordinario — la escala 1-5 no está diseñada para eventos de esa duración. Ningún valor de la tabla se cambia con esta corrección; se acota qué significa realmente el número ya asignado.

---

**Qué modifica**: no fija decisiones — registra el impacto de la pérdida temporal de cada capacidad, sistema y proceso documentado.

**Qué documentos dependen de este**: `priorizacion.md` usa el BCI como una de sus dimensiones de clasificación. `capacidades-core.md` referencia este registro desde cada capacidad.

**Qué documentos deben revisarse si este cambia**: `priorizacion.md` y `capacidades-core.md`.
