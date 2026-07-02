# Duplicidad de paneles de gestión interna — documentación de hechos

Ver riesgo R8 en [`03-modelo-negocio.md`](./03-modelo-negocio.md). Por instrucción explícita del 2026-07-02, este documento **solo describe hechos verificables — no propone eliminar, fusionar ni mantener ninguno de los dos sistemas.** Esa decisión se toma en Fase 8 (Operaciones), con esta documentación como base.

## Panel 1 — `interemprex-dashboard`

- **Propósito**: gestión comercial y operativa completa — clientes, procesos/proyectos, pipeline de ventas, tareas internas, pagos y suscripciones.
- **Responsables**: el fundador, único usuario conocido.
- **Usuarios**: uso interno, diseñado single-tenant (no hay evidencia de más de un rol o usuario).
- **Información gestionada**: ficha de contacto y notas de clientes reales; estado y presupuesto de procesos/proyectos por cliente; pipeline de leads (nuevo → contactado → propuesta → negociación → ganado/perdido); tareas asociadas a cliente y/o proceso; pagos, suscripciones y facturas sincronizadas con Stripe; MRR calculado automáticamente.
- **Dependencias técnicas**: Next.js 16, Prisma 7, SQLite (`dev.db`) vía adaptador `better-sqlite3`, autenticación propia (JWT + bcrypt), Stripe (pagos y webhooks en `/api/stripe/webhook`).
- **Estado real**: funcional, en uso activo. Base de datos single-tenant — es el sistema que sostiene el riesgo tecnológico R5 (criterios de migración) documentado en la Fase 2.

## Panel 2 — `dashboard-interemprex.html` + `.claude/data/interemprex.json`

- **Propósito**: seguimiento de políticas, condiciones y estado de cumplimiento normativo en 4 áreas fijas: RRHH y Finanzas, Compras y Proveedores, Inventario y Stock, Legal y Cumplimiento Normativo. Generado por la skill `gestion-interemprex`.
- **Responsables**: el fundador, vía comandos a la skill — no existe interfaz de edición directa; el HTML se regenera completo a partir del JSON cada vez.
- **Usuarios**: uso interno, sin roles ni autenticación — es un archivo HTML estático generado localmente.
- **Información gestionada**: políticas y condiciones por área (id, descripción, valor, fecha, áreas afectadas), checklist de cumplimiento (`cumple` / `pendiente` / `vencido`), historial de cambios. **Hoy completamente vacío**: `ultima_actualizacion: null`, cero entradas registradas desde su creación.
- **Dependencias técnicas**: ninguna externa — HTML + JSON plano, sin base de datos ni backend, regenerado bajo demanda por la skill.
- **Estado real**: el mecanismo que lo genera funciona, pero no hay uso real registrado hasta la fecha.

## Observación (hecho, no propuesta de resolución)

El solapamiento entre ambos es más conceptual que funcional. Los dos se han descrito informalmente como "panel de gestión de INTEREMPREX", pero cubren dominios de datos distintos: uno es comercial/CRM (clientes, ventas, pagos), el otro es cumplimiento normativo interno (RRHH, proveedores, legal, inventario). Hoy no gestionan la misma información. Cuando Fase 8 aborde esto, la pregunta no es solo "¿cuál se elimina?" — también es si la función de cumplimiento del Panel 2 debería vivir dentro del sistema que ya está en uso activo (Panel 1) en vez de mantenerse como un HTML estático aparte sin datos.
