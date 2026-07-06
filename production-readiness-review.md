# Production Readiness Review — INTEREMPREX

Evaluación puntual (no un documento vivo — se repite cuando cambien las condiciones de fondo, no se actualiza línea a línea como `fdi-registro.md`). Responde a una única pregunta con evidencia, no con opinión: **¿podría INTEREMPREX empezar a vender mañana sin poner en riesgo la empresa?**

Toda la evidencia de este documento ya existía en el repositorio (`03-modelo-negocio.md`, `05-catalogo-servicios.md`, `06-legal-cumplimiento.md`, `inventario-tecnologico.md`, `priorizacion.md`). Esta review no descubre datos nuevos — los reorganiza para responder una pregunta binaria de negocio, no una pregunta de arquitectura.

## Clasificación por área

| Área | Estado | Evidencia | Riesgo | Impacto | Probabilidad | Mitigación |
|---|---|---|---|---|---|---|
| Posicionamiento (estrategia) | 🟢 | `01-posicionamiento.md` aprobado, coherente en cascada hasta Fase 5 | Ninguno a nivel de diseño | — | — | — |
| Web pública (implementación) | 🔴 | `interemprex/index.html` sigue mostrando "Misiones completadas" con cifras inventadas — nunca se aplicó la corrección ya diseñada en Fase 1 | Un prospecto real lee un caso falso durante el proceso de venta | Alto (credibilidad, posible publicidad engañosa) | Alta si el prospecto visita la web (canal de venta actual) | Aplicar el copy ya escrito en `01-posicionamiento.md` — 0 diseño pendiente, solo implementación |
| Propuesta de valor | 🟡 | Sólida en estrategia; sin soporte visual coherente porque la web no refleja el copy aprobado | Discurso de venta y web pública se contradicen | Medio | Alta mientras la web no se corrija | Misma mitigación que la fila anterior |
| Catálogo | 🟡 | `05-catalogo-servicios.md` v2: 6 de 8 líneas con precio real y capacidad Core completa | Diagnóstico y Mantenimiento SEO técnico sin precio fijado; Gestión del crecimiento Niveles 2-3 no vendibles (ya excluidos, correctamente) | Bajo si se vende solo lo que ya tiene precio | Baja | No ofrecer las dos líneas sin precio en la primera venta — no hace falta fijarlo hoy |
| Modelo de negocio | 🟢 | Motores A/B/C validados en 2 proyectos piloto reales | Ninguno en el diseño; falta la cláusula contractual que lo haga cumplir (ver Sistema comercial) | — | — | — |
| Customer Journey | 🔴 | Fase 6 no existe — no hay recorrido documentado | Ningún paso definido tras el "sí" del cliente | Medio | Media (el fundador puede improvisarlo una vez más, como ya hizo 2 veces) | No bloquea la venta 1, si bloquea la 3ª o 4ª sin intervención del fundador |
| CRM (`interemprex-dashboard`) | 🟡 | Funcional, en uso, con pipeline/pagos reales | R13 (sin repo remoto) y R6 (sin backup verificado) — pérdida de datos de cliente real si falla la máquina local | Alto | Baja probabilidad de que ocurra mañana, pero el coste de mitigarlo es casi cero | Push a GitHub privado + backup automático del `.db` — horas, no días |
| LeadFinder | 🟡 | Funcional; credencial por defecto sin cambiar (confirmado, bajo riesgo hoy por ser local) | Exposición legal si se usa para contactar leads sin LIA/aviso de prospección (L1/L2/L4) | Medio-alto si es el canal de captación del cliente 1 | Depende del canal real de la primera venta | Si el cliente 1 viene por referido (como bbabogados/costaflora), no bloquea; si viene de `leadfinder`, sí |
| Dashboard/pagos (Stripe) | 🟡 | Webhooks reales, MRR calculado automáticamente | DPA de Stripe no confirmado explícitamente (probablemente ya cubierto por los términos estándar aceptados al abrir la cuenta) | Bajo | Baja | Verificar en el panel de Stripe — minutos, no hace falta rehacer nada |
| Automatizaciones | 🔴 | Solo dos automatizaciones reales (pagos, scoring de leads); LeadFinder y CRM siguen desconectados (silo confirmado) | Cada lead se traslada a mano; no bloquea 1 venta, sí la eficiencia a partir de la 3ª-4ª | Bajo para la venta 1 | — | Manual es aceptable a este volumen — no es el camino crítico |
| Operaciones | 🟡 | Sin proceso de "proyecto tipo" escrito; el fundador ya lo ejecutó 2 veces con éxito | FDI alto (Exclusivo del fundador) — funciona hoy porque solo hay un ejecutor | Medio a partir de un segundo proyecto simultáneo | Baja para la venta 1 | No bloquea vender 1 más; si el fundador no puede ejecutar, sí bloquea |
| Cumplimiento (relación con clientes) | 🟡 | Política de privacidad existe; aviso legal completo no confirmado | Menor que el de prospección — es una relación contractual directa, no datos de terceros sin contacto previo | Bajo-medio | Baja | Verificar/completar aviso legal — tarea corta |
| Cumplimiento (prospección vía LeadFinder) | 🔴 | Sin LIA, sin aviso de privacidad de prospección, sin atribución OSM (L1, L2, L4 — `06-legal-cumplimiento.md`) | Sanción AEPD o reclamación si se contacta comercialmente a un lead scrapeado sin esto resuelto | Alto | Alta si el canal de venta es `leadfinder` | Resolver L1/L2/L4 antes de la primera campaña de contacto saliente basada en scraping |
| Marketing | 🟡 | Sin canal activo más allá de `leadfinder` + referidos + web | No hay motor de captación más allá del boca a boca | Bajo para 1 venta | — | No bloquea; sí limita el ritmo de ventas futuras |
| Soporte | 🟡 | Niveles de mantenimiento definidos en catálogo; sin SLA formal escrito | El fundador es el soporte — funciona a este volumen | Bajo | — | No bloquea la venta 1 |
| IA | 🟢 (no aplica al camino crítico) | La función de IA no forma parte de lo que se vende en Motor A/B hoy | Ninguno — no se está prometiendo IA en la oferta activa | — | — | — |
| Finanzas | 🟡 | Precios reales existen (`precios-y-packs.md`); coste/hora y margen real no calculados (Fase 14) | Se puede vender sin saber el margen exacto, no sin saber el precio | Medio (riesgo de vender con pérdida, no de no poder vender) | Media | Aceptable para 1-2 ventas; no escalar sin datos de coste reales |
| Seguridad | 🔴 | Credencial por defecto en `leadfinder` sin cambiar; sin backups del CRM | Pérdida de datos o acceso no autorizado, aunque hoy en entorno local de bajo riesgo confirmado | Alto si ocurre | Baja hoy, pero el coste de arreglarlo es casi cero | Cambiar credenciales y activar backup — antes de escalar, no antes de vender 1 |
| Backups | 🔴 | Confirmado ausente (R6) | Pérdida irreversible de datos de cliente real | Alto | Baja probabilidad, consecuencia irreversible si ocurre | Backup automático del `.db` — la tarea de menor esfuerzo de toda esta tabla |
| Escalabilidad | 🟡 | Arquitectura ya probada contra 10.000 clientes (Fases 3-4); implementación actual (SQLite, sin conexión LeadFinder-CRM) no aguanta ese volumen | No es un riesgo para el cliente 1-3, sí para un crecimiento rápido sin intervención | Bajo para el camino crítico inmediato | — | No bloquea empezar a vender; bloquea vender sin límite sin volver a esta revisión |

## Camino crítico mínimo al primer cliente real

Ordenado por dependencia, eliminando todo lo que no bloquea la primera venta:

1. **Backup del CRM** (R6) — copiar `dev.db` a un lugar fuera de la máquina local, aunque sea manual al principio. Esfuerzo: horas. Sin esto, nada de lo demás importa si se pierde el único sistema de pipeline/pagos.
2. **Push de `interemprex-dashboard` a un repositorio remoto privado** (R13) — procedimiento ya documentado en `03-modelo-negocio.md`, 5 pasos, ninguno ejecutado todavía. Esfuerzo: horas.
3. **Cambiar la credencial por defecto de `leadfinder`** (`admin`/`changeme`) — coste casi cero, ya identificado hace varias fases sin ejecutar.
4. **Aplicar en `interemprex/index.html` el copy ya aprobado en Fase 1**: quitar "Misiones completadas" con cifras inventadas, poner la sección "Cómo trabajamos" ya redactada. No es diseño nuevo — es implementar una decisión que lleva aprobada desde el principio de este proyecto.
5. **Redactar un contrato/propuesta mínima** para la primera venta: alcance (según el nivel del catálogo elegido), precio (ya real, de `precios-y-packs.md`), y la cláusula de empaquetado A→B mínimo ya decidida en Fase 3. Es el único documento nuevo que este camino crítico exige — y elimina un riesgo objetivo real (vender sin nada firmado).
6. **Decidir el canal del primer cliente**: si es referido/contacto directo (como `bbabogados` y `costafloragardens`), los pasos 7-8 no bloquean esta venta. Si es un lead de `leadfinder`, sí son necesarios antes de contactarlo comercialmente.
7. *(Solo si el canal es `leadfinder`)* Redactar un aviso de privacidad breve para la actividad de prospección y una nota de interés legítimo (L1/L2, versión mínima, no el LIA completo de una consultora externa).
8. *(Solo si el canal es `leadfinder`)* Añadir la atribución a OpenStreetMap (L4) — una línea de texto y un enlace.
9. **Vender únicamente las líneas de catálogo con precio ya fijado** — no ofrecer Diagnóstico ni Mantenimiento SEO técnico todavía; esto no añade trabajo, lo quita.

**Explícitamente fuera del camino crítico** (no se hace antes de vender): Customer Journey completo (Fase 6), Sistema comercial completo (Fase 7), conexión automática LeadFinder-CRM, arquitectura empresarial, EIPD/DPIA (L10, no se ha cruzado el umbral), migración de SQLite, capacidad de Gestión del crecimiento, mecanismo de mejora de capacidades. Todo esto sigue siendo válido y necesario — para escalar, no para vender la primera vez.

## Go / No Go

### **GO CON RESTRICCIONES**

No es NO GO: ningún hallazgo indica un problema estructural del modelo de negocio, la propuesta de valor o la capacidad de entrega — los dos proyectos piloto ya demuestran que INTEREMPREX puede ejecutar Motor A de verdad. No es GO limpio: hay riesgos reales, con evidencia concreta, cuya mitigación cuesta horas, no semanas, y que no se han aplicado todavía por pura secuencia de fases, no por dificultad.

### Restricciones críticas (nada más)

1. Backup del CRM antes de meter datos de un cliente de pago real.
2. Repositorio remoto de `interemprex-dashboard` antes de seguir dependiendo solo de la máquina local.
3. Corrección de la web pública (quitar cifras inventadas) antes de que un prospecto la visite.
4. Contrato mínimo antes de cerrar la venta, no después.
5. Si el canal es `leadfinder`: LIA mínimo + aviso de prospección + atribución OSM antes del primer contacto comercial saliente.

## Plan operativo — conseguir el primer cliente real

1. **Ejecutar las restricciones 1-4 esta semana** — son horas de trabajo del fundador, no requieren decisiones nuevas, todo está ya diseñado en fases anteriores.
2. **Decidir el canal del cliente 1**: si hay ya un contacto/referido disponible (como los dos pilotos), empezar por ahí — evita la restricción 5 por completo para esta primera venta.
3. **Ofrecer solo Motor A (Landing o Web corporativa) + el mínimo de Motor B empaquetado**, con el contrato mínimo del punto 4 de las restricciones — no vender Motor C ni Gestión del crecimiento todavía, no son necesarios para la primera venta y añaden riesgo sin necesidad.
4. **Ejecutar el proyecto como ya se hizo con `bbabogados`/`costafloragardens`** — el fundador ya sabe cómo, no hace falta que exista un Customer Journey escrito para la primera repetición más.
5. **Registrar en `interemprex-dashboard` cada paso real** (primera vez que el CRM se usa con datos de cliente de pago real, no de prueba) — esto es lo que por fin empieza a poblar `kpis.md` con datos reales en vez de "sin datos".
6. **Solo después de cerrar el ciclo completo (venta → entrega → primer cobro de Motor B)**, volver a las fases de diseño (Fase 6 en adelante) — ahora con un dato real que puede confirmar o corregir todo lo construido, en vez de cero.

## Criterio final — dónde va el siguiente euro

| Destino | ¿Recibe el siguiente euro? |
|---|---|
| Seguir diseñando (Fase 6 en adelante) | No, todavía no |
| Desarrollar tecnología nueva | No — lo que existe ya alcanza para vender |
| Marketing | No — no hay nada que promocionar de forma escalable hasta cerrar el ciclo 1 |
| Ventas | Sí, indirectamente — el esfuerzo va a cerrar el primer cliente, no a construir un sistema de ventas |
| Cumplimiento más allá de las restricciones críticas | No — L10, L11, L9 y el resto esperan, no bloquean nada hoy |
| **Conseguir el primer cliente real** | **Sí — es el único destino que esta review justifica con evidencia** |

El siguiente euro (y las siguientes horas del fundador) van a las cinco restricciones críticas y después a cerrar una venta real — no a otro documento, salvo el contrato mínimo, que ya está justificado arriba como el único que elimina un riesgo objetivo.

---

**Qué modifica**: no cambia ninguna decisión de fase anterior — reorganiza evidencia ya existente para responder si INTEREMPREX puede vender hoy, y fija el camino crítico mínimo.

**Qué documentos dependen de este**: ninguno formalmente — es una evaluación puntual, no una fase de la que dependan las siguientes.

**Qué documentos deben revisarse si esto cambia**: se repite esta review cuando cambien las condiciones de fondo (tras cerrar el ciclo del primer cliente, o si cambia el canal de captación), no se actualiza incrementalmente como los registros vivos.
