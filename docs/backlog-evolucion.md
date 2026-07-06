# Backlog de evolución — INTEREMPREX

Mejoras clasificadas Media/Baja durante la Validación Operativa (6-jul-2026).
Regla vigente: solo se implementan automáticamente las Críticas/Altas; este
backlog se revisa cuando el uso real lo justifique.

## Media

- **Regla de cobro a la entrega**: cuando un proceso pasa a COMPLETED y el
  cliente tiene pagos manuales PENDING, el motor de atención debería
  recomendar reclamar el pago final (hoy solo alerta a los 7 días).
- **Colisión `.next` entre dev y build**: alternar `next build` y `next dev`
  puede dejar rutas dinámicas devolviendo 404 fantasma. Procedimiento: parar
  el dev server, reiniciarlo; si persiste, borrar `.next`. Afecta solo al
  desarrollo, no a la operación con build de producción.
- **Formulario de actividad compacto**: el alta de actividad muestra siempre
  7 campos; un modo compacto (tipo + título) con expansión reduciría fricción
  en el registro rápido de llamadas.
- **Búsqueda en pipeline**: el kanban agrupa por etapa y se mantiene legible,
  pero con cientos de leads hará falta buscador/filtro como el de clientes.

## Baja

- **Cliente implícito por proceso en tareas**: al elegir proceso en el alta
  de tarea, el cliente podría autocompletarse.
- **Paginación de listados**: pagos limita a 30 y facturas a 20; clientes y
  leads sin límite. Paginar cuando el volumen real lo pida.
- **Ocultar "Editar" en leads convertidos**: la ficha de un lead ya
  convertido sigue permitiendo editar datos que ya viven en el cliente.
- **Fecha editable al marcar cobrado**: "Marcar cobrado" sella con la fecha
  actual; permitir indicar la fecha real del abono.

## Dependientes de decisiones externas (no son backlog técnico)

- Despliegue del dashboard (Postgres + hosting) → habilita web→CRM.
- Generador de propuestas → tras Fase 7 estratégica.
- Facturación conforme → tras Fase 5 (Legal).
- Gastos/P&L → modelo de costes (Fase 14).
- Capa generativa sobre el motor de recomendación → requiere ANTHROPIC_API_KEY.
