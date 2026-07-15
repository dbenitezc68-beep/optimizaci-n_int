# Decisiones ADR — INTEREMPREX

Actualizado: 2026-07-15

**Activo desde el 2026-07-15.** El fundador aprobó la propuesta "Modo ligero (ADR)" de [`00-metodologia.md`](./00-metodologia.md) en esa fecha (ver ADR-001, abajo). A partir de aquí, toda decisión reversible y de bajo impacto se registra en este archivo, no como fase completa.

## Qué es

Un registro de decisiones reversibles y de bajo impacto — no estructurales, no estratégicas — en formato de 5 líneas, en vez del formato completo de fase de `00-metodologia.md`. Ver la sección "Modo ligero — ADR" de ese documento para la justificación completa.

## Plantilla (una entrada por decisión, una vez aprobado el modo)

```
### [fecha] — [título corto de la decisión]

- **Decisión**: qué se decidió, en una frase.
- **Motivo**: por qué, en una frase.
- **Alternativa descartada**: qué otra opción se consideró y por qué no se eligió.
- **Impacto en FDI**: mejora / empeora / no afecta — y a qué proceso, si aplica. Si mejora o empeora, añadir también la fila correspondiente en `fdi-registro.md`.
- **Fecha**: YYYY-MM-DD.
```

## Registro

## ADR-001 — Adopción del modo ligero ADR
- Decisión: Se aprueba el modo ligero propuesto en 00-metodologia.md.
- Motivo: Coste cero, trazabilidad de decisiones no estructurales.
- Alternativa descartada: Formato completo de fase para toda decisión (desproporcionado).
- Impacto FDI: Ninguno.
- Fecha: 2026-07-15

## ADR-002 — Duración mínima Motor B
- Decisión: Permanencia inicial 6 meses, prórroga automática mensual, preaviso de baja 30 días por escrito.
- Motivo: Garantiza valor mínimo 228-768 €/cliente a precios actuales; equilibrio valor/fricción comercial.
- Alternativa descartada: 12 meses (fricción excesiva sin testimonios); 3 meses (no cubre CAC).
- Impacto FDI: Ninguno. Independiente de la revisión de precios registrada en priorizacion.md.
- Fecha: 2026-07-15

## ADR-003 — Plazo de aceptación tácita
- Decisión: 7 días naturales desde la notificación de entrega, con recordatorio escrito al día 5; las observaciones solo son válidas por el canal pactado en contrato.
- Motivo: Estándar del sector; el recordatorio aporta transparencia y rastro documental ante disputas.
- Alternativa descartada: 15 días (alarga innecesariamente el cobro de Motor A).
- Impacto FDI: Ninguno.
- Fecha: 2026-07-15

**ADR-004 — reservado, no registrado.** Corresponde a la decisión de epígrafes IAE para el alta de autónomo, todavía en revisión a fondo por el fundador (ver `priorizacion.md` y `alta-autonomo.md`). No se crea la entrada hasta que exista una decisión real que registrar — crearla ahora sería inventar una decisión que no se ha tomado.

---

**Qué modifica**: registra las decisiones tomadas bajo el modo ligero aprobado en `00-metodologia.md` — ADR-001 (adopción del propio modo), ADR-002 (duración mínima de Motor B) y ADR-003 (plazo de aceptación tácita). Reserva el identificador ADR-004 sin usarlo todavía.

**Qué documentos dependen de este**: `contrato-minimo-venta.md` (secciones 3 y 4, aplican ADR-002 y ADR-003) y `07-customer-journey.md` (Etapa 12, cita ADR-002/ADR-003 como origen del disparador de Motor B).

**Qué documentos deben revisarse si este cambia**: `00-metodologia.md` (la sección "Modo ligero — ADR" debe seguir describiendo con precisión cómo se usa este archivo); `fdi-registro.md` si alguna entrada declara impacto en FDI (ninguna de ADR-001/002/003 lo hace); `priorizacion.md` si ADR-004 llega a registrarse y afecta a la fila de tensión de pricing.
