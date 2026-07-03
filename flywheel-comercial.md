# Flywheel empresarial — estado objetivo

Objetivo arquitectónico del **ciclo completo de creación de valor** de INTEREMPREX — no solo el pipeline comercial. **No se implementa ninguna integración en este documento** — es el mapa de a dónde debe llegar el sistema, contrastado contra lo que ya existe hoy, para que cada fase futura sepa qué pieza está construyendo. Este documento forma parte de `enterprise-blueprint.md` — es el detalle del ciclo que conecta los bloques "Sistema comercial", "Operaciones", "Automatizaciones" y "KPIs" de la cadena estratégica.

## El flujo

```
LeadFinder
  ↓
Scoring
  ↓
CRM
  ↓
Pipeline
  ↓
Propuesta
  ↓
Cliente
  ↓
Implementación
  ↓
Operación continua
  ↓
Automatización
  ↓
KPIs
  ↓
Aprendizaje interno
  ↓
Mejora de capacidades
  ↓
Upselling
  ↓
Nuevas oportunidades  (vuelve a alimentar el flywheel)
```

Es un volante, no una línea recta: "Nuevas oportunidades" no es el final, retroalimenta el principio (más leads propios, más contenido de casos reales, más referidos). La diferencia frente a un simple embudo de ventas está en los tres eslabones centrales añadidos — **KPIs → Aprendizaje interno → Mejora de capacidades**: cada cliente no es solo un ingreso, es información que debe hacer más fuerte a `capacidades-core.md`. Sin ese tramo, el flywheel es un pipeline lineal que se repite igual con el cliente 1 que con el cliente 100; con él, cada vuelta deja la empresa mejor preparada para la siguiente.

## Estado real de cada eslabón (verificado, no aspiracional)

| Eslabón | Qué es | Estado hoy | Sistema/documento responsable |
|---|---|---|---|
| LeadFinder | Encuentra negocios sin web | **Construido y funcional** | `leadfinder` |
| Scoring | Puntúa el potencial (alta/media/baja) | **Construido y funcional** | `leadfinder` (`app/scoring.py`) |
| CRM | Gestiona el lead como oportunidad de venta | **Construido y funcional**, pero **desconectado de LeadFinder** | `interemprex-dashboard` |
| Pipeline | Nuevo → contactado → propuesta → negociación → ganado/perdido | **Construido dentro del CRM** | `interemprex-dashboard` |
| Propuesta | Documento/oferta formal al prospecto | **No existe todavía un proceso ni plantilla** | Pendiente — Fase 7 (Sistema comercial) |
| Cliente | Conversión cerrada | Existe el concepto en el CRM (ficha de cliente), pero sin regla de empaquetado codificada como cláusula de contrato todavía | Pendiente — cláusula ya decidida en `04-arquitectura-oferta.md`, falta codificarla en Fase 7 |
| Implementación | Motor A ejecutado | **Construido como capacidad** (capacidad 1 y 6 de `capacidades-core.md`), sin plantilla/starter kit reutilizable todavía | `capacidades-core.md`, Fase 4 |
| Operación continua | Motor B en marcha | **Parcialmente construido**: mantenimiento/soporte no automatizado a escala; Stripe sincroniza pagos automáticamente | `interemprex-dashboard`, Fase 8 (Operaciones) |
| Automatización | Motor C, incluye IA | Capacidad de IA construida en `leadfinder` (auditoría de leads); sin proceso de venta de Motor C como tal | `capacidades-core.md`, Fase 9 |
| KPIs | Medir qué ha funcionado en cada cliente | Registro vivo ya existe (`kpis.md`), pero casi todos los indicadores están "sin datos" — el eslabón existe como estructura, no como práctica todavía | `kpis.md` |
| Aprendizaje interno | Convertir lo medido en conocimiento reutilizable | **No existe ningún proceso formal** — hoy el aprendizaje, si ocurre, queda solo en la memoria del fundador | Pendiente — Fase 8/9, es FDI puro mientras no se documente |
| Mejora de capacidades | Actualizar `capacidades-core.md` con lo aprendido | **No existe todavía un ciclo de revisión** — el documento se actualiza cuando una fase lo toca, no de forma sistemática tras cada cliente | Pendiente — mecanismo a definir en Fase 8 |
| Upselling | Detectar la siguiente necesidad del cliente ya activo | Conceptualmente definido en `03-modelo-negocio.md` (ciclo de vida del cliente); sin mecanismo automático | Pendiente — Fase 9 |
| Nuevas oportunidades | Referidos, casos de éxito reales, contenido | No existe todavía ningún caso de éxito cerrado que citar (Fase 1 ya lo dejó honesto: "en marcha", no "completado") | Pendiente — depende de que el ciclo complete al menos una vuelta con un cliente real |

**Hallazgo nuevo, del tramo añadido**: los tres eslabones "KPIs → Aprendizaje interno → Mejora de capacidades" son, hoy, los más débiles de todo el flywheel — más incluso que el silo LeadFinder-CRM, porque ahí al menos ambos sistemas existen por separado. Aquí, "Aprendizaje interno" no existe como proceso en ningún sitio: es 100% FDI ("Exclusivo del fundador", y ni siquiera documentado como tal todavía). Se registra como hallazgo prioritario para Fase 8.

## El eslabón roto que más importa hoy

**LeadFinder → CRM** es la primera rotura del flywheel, y la más barata de arreglar en términos relativos: ya existen ambos sistemas, con datos reales, solo no hablan entre sí. Mientras no se conecten, cada lead de alto potencial encontrado por LeadFinder depende de que el fundador lo traslade a mano al CRM — es exactamente el tipo de proceso que `00-metodologia.md` pide automatizar antes de aceptar como permanente. Se registra como la primera prioridad de Fase 9 (Automatizaciones), no se resuelve aquí.

## Por qué esto no se implementa ahora

Conectar LeadFinder con el CRM, definir el proceso de Propuesta, o automatizar el Upselling son decisiones de Fase 7, 8 y 9 respectivamente — implementarlas ahora, antes de que existan el Catálogo (Fase 4), el Customer Journey (Fase 6) y el Sistema comercial (Fase 7), sería construir la tubería antes de saber qué va a circular por ella.

---

**Qué modifica**: no fija decisiones de negocio nuevas — es el mapa de estado objetivo vs. estado real de todo el ciclo comercial, y consolida en un solo sitio el hallazgo del silo LeadFinder-CRM ya detectado en `inventario-tecnologico.md`.

**Qué documentos dependen de este**: Fase 6 (Customer Journey), Fase 7 (Sistema comercial), Fase 8 (Operaciones) y Fase 9 (Automatizaciones) — las cuatro deben cerrar, entre todas, cada eslabón marcado como pendiente aquí. `enterprise-blueprint.md` lo referencia como el detalle del ciclo de creación de valor.

**Qué documentos deben revisarse si este cambia**: `inventario-tecnologico.md` (el hallazgo del silo), `capacidades-core.md` (el eslabón "Mejora de capacidades" es literalmente ese documento) y `enterprise-blueprint.md`.
