# Informe de madurez — INTEREMPREX como sistema operativo interno

**Fecha:** 6 de julio de 2026 · **Autor:** custodio técnico (Claude) · **Estado del código:** commit `1fd8c03`, sincronizado en `optimizaci-n_int/master`

## 1. Procesos completamente cubiertos

| Proceso | Cobertura | Evidencia |
|---|---|---|
| Captación activa | Importación LeadFinder→pipeline con filtro de interés, dedup por clave estable, solo estados activos | `/dashboard/pipeline/import`, verificado con fixture |
| Cualificación y venta | Pipeline de 6 etapas, ficha completa de lead, conversión a cliente transaccional e idempotente | verificado en navegador |
| Gestión de clientes | Expediente 360°: resumen financiero, origen (lead o alta directa), contacto accionable, historial económico unificado | verificado |
| Ejecución del servicio | Procesos (estado/presupuesto/fechas), tareas, seguimiento fechado (notas/llamadas/reuniones), incidencias con ciclo abierta→resuelta, entregables con enlace | verificado |
| Cobros | Stripe completo (webhook idempotente, links, sync, fechas reales) + pagos manuales con ciclo pendiente→cobrado; métricas fieles a todo euro que entra | verificado, incluida la cadena cobro→métrica |
| Retención y ampliación | Renovaciones detectadas con antelación; oportunidad de upsell (proyecto entregado sin recurrente) detectada automáticamente | motor de atención, verificado |
| Análisis y dirección | MRR, ingresos, gráficos + motor de atención/recomendación: 11 reglas con severidad, explicación y siguiente acción, global y por cliente | verificado con las 11 reglas disparadas |
| Continuidad técnica | Backups automáticos verificados (integrity_check, retención 14), código en remoto privado, operación diaria con doble clic y arranque automático | verificado (instalación pendiente de ejecución del usuario) |
| Seguridad | Rate limiting en login, anti-enumeración, cambio de contraseña con invalidación de sesiones, sin credenciales por defecto, validación zod en toda entrada | verificado |
| Migración de datos | Importación CSV de clientes (dedup, cabeceras ES/EN, separador autodetectado); diseño import-first como criterio | verificado con casos límite |

## 2. Procesos parcialmente manuales (y por qué)

- **Captación web**: el formulario de interemprex.com llega por email; el alta del lead es manual. Automatizarlo exige desplegar el dashboard (una web pública no puede escribir en un SQLite local). Decisión de hosting/Postgres pendiente (riesgo R5 del registro estratégico).
- **Propuestas/presupuestos**: se elaboran fuera. Deliberado: el modelo de precios de 8 factores se activa en las Fases 7/14 del proceso estratégico; construir el generador antes sería adelantarse a decisiones de negocio no cerradas.
- **Facturación formal española** (numeración, IVA, Verifactu): fuera del sistema. Deliberado: la Fase 5 (Legal) del proceso estratégico está abierta; implementar facturación sin ese marco sería un riesgo regulatorio.
- **Renovaciones**: detección automática, gestión manual (contactar, renegociar). Correcto a esta escala.
- **Gastos**: el sistema ve ingresos, no costes — no hay P&L ni rentabilidad por cliente. Requiere decidir el modelo de registro de gastos (Fase 14).

## 3. Dependencias externas vigentes

- **Stripe** — cobros con tarjeta y suscripciones. Crítica pero mitigada: los pagos manuales permiten operar sin ella.
- **Web3Forms** — formulario de la web pública (con fallback honesto a email).
- **GitHub** — respaldo del código. **Vercel** — hosting de la web pública.
- **Email/WhatsApp** — comunicación con clientes (el seguimiento se registra en el CRM; el canal es externo, y es razonable que lo sea).
- **Excel/CSV** — puente de migración de datos, por diseño.

## 4. Mejoras para una versión futura

1. Despliegue del dashboard (Postgres + hosting) → habilita web→CRM automático y acceso desde varios dispositivos.
2. Capa generativa sobre el motor de recomendación (redactar el email de seguimiento sugerido, resumir el estado de un cliente) — requiere `ANTHROPIC_API_KEY`; el patrón ya existe en leadfinder.
3. Generador de propuestas desde el expediente (tras cerrar la Fase 7 comercial).
4. Facturación conforme (tras cerrar la Fase 5 legal).
5. Registro de gastos y rentabilidad por cliente/proceso (alimenta la Fase 14 financiera).
6. Suite de tests automatizados (calidad interna, aplazada por criterio de priorización).
7. Rol MEMBER con permisos efectivos cuando exista un segundo usuario.

## 5. Grado de madurez

**Sistema operativo interno v1.0 — apto como herramienta principal de trabajo.** Todas las rutas verificadas funcionalmente en navegador durante la construcción; integridad financiera protegida (webhook idempotente, fechas reales de cobro, transacciones); seguridad de acceso endurecida; datos respaldados y código versionado. Limitación estructural conocida y documentada: single-tenant local (decisión R5, con criterios de migración definidos en el proceso estratégico).

## 6. Por qué INTEREMPREX ya puede dirigir la empresa

El ciclo de vida completo de la relación con un cliente — prospectar → cualificar → vender → ejecutar → cobrar → retener → ampliar — tiene representación, trazabilidad y acciones en el sistema, sin herramienta externa para ninguna decisión operativa diaria. Y el sistema no solo almacena: **dirige** — cada mañana prioriza qué requiere atención, explica por qué y propone la siguiente acción, incluyendo las oportunidades comerciales del modelo one-off→recurrente.

**Condición de activación:** el valor descrito se materializa cuando (1) se ejecute `scripts/setup-windows.ps1` (operación diaria), y (2) se carguen los datos reales (clientes por CSV, cobros históricos). Desde ese momento, la mejora continua debe guiarse por fricciones de uso real, no por roadmap teórico.
