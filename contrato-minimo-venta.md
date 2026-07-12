# Contrato mínimo de venta — plantilla

Actualizado: 2026-07-12

Estado: **plantilla operativa, lista para usar.** Único documento nuevo que exige el camino crítico de [`production-readiness-review.md`](./production-readiness-review.md) (punto 5 de las restricciones críticas) — elimina un riesgo objetivo real: cerrar una venta sin nada firmado. No es una fase de la metodología (`00-metodologia.md`) ni añade un framework nuevo: es la plantilla mínima suficiente para firmar la primera venta, y las siguientes, dentro del alcance ya aprobado (Motor A + mínimo de Motor B, `04-arquitectura-oferta.md` y `05-catalogo-servicios.md`).

## Aviso de alcance (léase antes de usar)

Esta plantilla no es asesoría legal ni sustituye la revisión de un abogado. Se ha construido con los datos reales ya verificados del proyecto (precios de `precios-y-packs.md`, niveles de `05-catalogo-servicios.md`, cláusula de empaquetado de `04-arquitectura-oferta.md`), pero **dos huecos ya detectados en `06-legal-cumplimiento.md` siguen abiertos y afectan directamente a este contrato**:

- **L8 — Aviso legal no confirmado**: no hay evidencia de que exista una identificación fiscal completa de INTEREMPREX (razón social, NIF/CIF, domicilio, forma jurídica — autónomo o sociedad). Sin ese dato, los campos de identificación de INTEREMPREX en la sección 1 no se pueden rellenar sin inventarlos. Quedan como campo obligatorio a completar antes de la primera firma.
- **L9 — Incertidumbre fiscal**: facturación electrónica (Verifactu/Ley Crea y Crece) y conservación de registros contables dependen de la forma jurídica y el volumen — no se puede confirmar aquí sin asesoría fiscal externa. La cláusula de facturación (sección 3) queda genérica a propósito.

Usar esta plantilla es preferible a vender sin contrato — es el criterio que justifica su existencia — pero no cierra L8 ni L9. Antes de la primera firma real, como mínimo: confirmar la situación fiscal/mercantil de INTEREMPREX (si no existe todavía, es el bloqueante real, por delante del propio contrato).

---

## 1. Partes

**INTEREMPREX** (parte prestadora)
- Razón social / nombre comercial: **[PENDIENTE — ver aviso de alcance, L8]**
- NIF/CIF: **[PENDIENTE]**
- Domicilio: **[PENDIENTE]**
- Forma jurídica: **[PENDIENTE — autónomo / sociedad]**
- Contacto: **[CANAL DE CONTACTO — a rellenar en cada contrato]** *(retirado del repositorio el 2026-07-12 por higiene de datos personales — un número de teléfono real no debe vivir en un documento de plantilla versionado; se rellena directamente en cada contrato individual, no aquí)*

**Cliente** (parte contratante)
- Razón social / nombre: **[A RELLENAR]**
- NIF/CIF: **[A RELLENAR]**
- Domicilio: **[A RELLENAR]**
- Persona de contacto y email: **[A RELLENAR]**

## 2. Objeto y alcance

INTEREMPREX se compromete a prestar al Cliente el/los siguiente(s) servicio(s), seleccionado(s) del catálogo vigente y aprobado (`05-catalogo-servicios.md`):

**Motor A — Implementación** (marcar el nivel acordado; ver Auditoría del PRR: en esta primera etapa comercial solo se ofrecen Nivel 1 y Nivel 2, no Nivel 3 ni Motor C, por decisión explícita de `production-readiness-review.md`):

| Nivel | Entregable | Precio (`precios-y-packs.md`) |
|---|---|---|
| ☐ Nivel 1 | Landing page (una página, publicada, SEO técnico básico) | 750 € |
| ☐ Nivel 2 | Web corporativa (multi-página, JSON-LD, sitemap, robots.txt) | 1.125 € |
| ☐ Nivel 2 | Tienda online estándar | 2.625 € |

**Motor B — Operación continua, línea Operación técnica** (obligatorio junto con Motor A, ver sección 4):

| Nivel | Entregable | Precio (`precios-y-packs.md`) |
|---|---|---|
| ☐ Nivel 1 | Mantenimiento Básico (soporte reactivo, sin SLA formal) | 38 €/mes |
| ☐ Nivel 2 | Mantenimiento Intermedio (mejoras periódicas, cobro automatizado vía Stripe) | 79 €/mes |
| ☐ Nivel 3 | Mantenimiento Avanzado (automatizaciones vivas, SEO técnico mantenido) | 128 €/mes |

Descripción específica del proyecto (alcance funcional acordado, páginas, integraciones): **[A RELLENAR caso a caso]**.

Cualquier servicio fuera de esta tabla (Motor C, Motor B línea Gestión del crecimiento Niveles 2-3) queda expresamente excluido de este contrato — no forma parte de la oferta activa hoy (`05-catalogo-servicios.md`, sección 5) y requeriría un contrato o anexo distinto.

## 3. Precio y forma de pago

- Precio de Motor A: el marcado en la tabla anterior, pago único. **[Confirmar si sigue vigente la tarifa de lanzamiento de `01-posicionamiento.md` en la fecha de la firma — tope: 3 clientes desde 2026-07-02 o hasta 2026-09-30, lo que ocurra antes.]**
- Precio de Motor B: el marcado en la tabla anterior, facturación mensual recurrente desde la validación/conformidad de la entrega de Motor A — no desde la fecha de entrega en sí. Si el Cliente no manifiesta objeciones en un plazo de **[A RELLENAR — p. ej. 7 días]** desde la publicación del entregable, este se considera aceptado y Motor B arranca igualmente (aceptación tácita). Este disparador es el mismo que usa `07-customer-journey.md` (Etapa 12, Validación) — no son dos reglas distintas.
- Forma de pago: **[A RELLENAR — p. ej. 50 % al inicio / 50 % a la entrega, vía Stripe]**.
- Facturación: sujeta a la normativa fiscal aplicable a INTEREMPREX en la fecha de emisión — ver aviso de alcance (L9). No se detalla aquí un procedimiento fijo hasta resolver ese punto con asesoría fiscal.

## 4. Empaquetado obligatorio y duración

Por decisión ya aprobada en `04-arquitectura-oferta.md` (decisión 1): todo proyecto de Motor A incluye un periodo mínimo de Motor B en este mismo contrato, no como venta posterior. El Cliente contrata ambos motores a la firma, no solo Motor A.

- Duración mínima de Motor B: **[A RELLENAR — no existe todavía una política fija de duración mínima; lo decide el fundador caso a caso hasta que se establezca una regla permanente. No se rellena con un número por defecto para no inventar un dato que el proyecto no ha fijado.]**
- Transcurrido ese mínimo, Motor B se renueva de forma tácita mes a mes salvo cancelación por cualquiera de las partes con **[A RELLENAR — p. ej. 30 días]** de preaviso.

## 5. Propiedad intelectual

- El código, diseño y contenido específicos desarrollados para el Cliente en el marco de Motor A pasan a ser propiedad del Cliente una vez abonado el precio íntegro de Motor A.
- INTEREMPREX conserva el derecho a reutilizar métodos, módulos genéricos, componentes de infraestructura propia (p. ej. patrones de automatización, plantillas técnicas no específicas del Cliente) en otros proyectos — coherente con la reutilización modular ya decidida como base del modelo de negocio (`04-arquitectura-oferta.md`, decisión 2). Esto no incluye datos, contenido ni identidad de marca del Cliente, que nunca se reutilizan.
- INTEREMPREX puede citar al Cliente como referencia (nombre, logotipo, enlace al proyecto) salvo que el Cliente lo excluya expresamente por escrito.

## 6. Protección de datos

- INTEREMPREX actúa como responsable del tratamiento de los datos que el Cliente le facilite para la prestación del servicio (contacto, datos de facturación, contenido del proyecto), conforme a su política de privacidad publicada en `interemprex`.
- Los pagos se procesan a través de Stripe, que actúa como encargado del tratamiento para los datos de pago.
- El Cliente puede ejercer sus derechos de acceso, rectificación, supresión, oposición, limitación y portabilidad dirigiéndose al contacto indicado en la sección 1. **Nota de transparencia (ver `06-legal-cumplimiento.md`, L3): el canal formal de ejercicio de derechos todavía no está implementado de forma sistemática — hasta entonces, se atiende por el mismo canal de contacto directo del proyecto.**

## 7. Confidencialidad

Ambas partes se comprometen a no divulgar a terceros la información no pública intercambiada durante la prestación del servicio (datos de negocio, credenciales de acceso, contenido no publicado), tanto durante la relación como después de finalizada.

## 8. Resolución

Cualquiera de las partes puede resolver el contrato por incumplimiento grave de la otra, previo aviso por escrito y un plazo de **[A RELLENAR — p. ej. 15 días]** para subsanarlo. La resolución de Motor A antes de la entrega no exime del pago de las horas/hitos ya ejecutados. La resolución de Motor B no exime del pago de las mensualidades ya devengadas ni, en su caso, del preaviso pactado en la sección 4.

## 9. Ley aplicable y jurisdicción

Este contrato se rige por la legislación española. Para cualquier controversia, las partes se someten a los juzgados y tribunales que correspondan por normativa de consumidores/usuarios si el Cliente tiene esa condición, o al domicilio de INTEREMPREX en los demás casos. **[Confirmar redacción final con asesoría legal antes de la primera firma — ver aviso de alcance.]**

## 10. Firmas

| INTEREMPREX | Cliente |
|---|---|
| Nombre: ______________________ | Nombre: ______________________ |
| Fecha: ______________________ | Fecha: ______________________ |
| Firma: ______________________ | Firma: ______________________ |

---

**Qué modifica**: crea la plantilla mínima de contrato para cerrar una venta de Motor A + Motor B — no fija precios nuevos (reutiliza `precios-y-packs.md`), no cambia ninguna decisión de catálogo o arquitectura ya aprobada, solo las convierte en cláusulas firmables. Actualizado 2026-07-12: la sección 3 alinea el disparador de facturación de Motor B con la Etapa 12 (Validación) de `07-customer-journey.md` — arranca en la conformidad o aceptación tácita, no en la fecha de entrega; la sección 1 retira el número de teléfono real por higiene de datos personales.

**Qué documentos dependen de este**: ninguno todavía — es un documento operativo terminal, no una base para fases futuras. La futura Fase 7 (Sistema comercial) debería evolucionarlo a plantilla codificada/automatizable, no partir de cero.

**Qué documentos deben revisarse si este cambia**: `05-catalogo-servicios.md` y `precios-y-packs.md` si cambian los niveles o precios ofrecidos; `04-arquitectura-oferta.md` si cambia la regla de empaquetado obligatorio; `06-legal-cumplimiento.md` si se resuelven L3, L8 o L9, porque las notas de transparencia de las secciones 1, 3 y 6 dejarían de aplicar y deberían eliminarse, no mantenerse por inercia; `07-customer-journey.md` (Etapa 12) si cambia el disparador de facturación de Motor B, para que ambos documentos sigan describiendo la misma regla.
