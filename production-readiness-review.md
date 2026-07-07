# Production Readiness Review — INTEREMPREX

Evaluación puntual (no un documento vivo — se repite cuando cambien las condiciones de fondo, no se actualiza línea a línea como `fdi-registro.md`). Responde a una única pregunta con evidencia, no con opinión: **¿podría INTEREMPREX empezar a vender mañana sin poner en riesgo la empresa?**

Toda la evidencia de este documento ya existía en el repositorio (`03-modelo-negocio.md`, `05-catalogo-servicios.md`, `06-legal-cumplimiento.md`, `inventario-tecnologico.md`, `priorizacion.md`). Esta review no descubre datos nuevos — los reorganiza para responder una pregunta binaria de negocio, no una pregunta de arquitectura.

## Clasificación por área

| Área | Estado | Evidencia | Riesgo | Impacto | Probabilidad | Mitigación |
|---|---|---|---|---|---|---|
| Posicionamiento (estrategia) | 🟢 | `01-posicionamiento.md` aprobado, coherente en cascada hasta Fase 5 | Ninguno a nivel de diseño | — | — | — |
| Web pública (implementación) | 🟡 (era 🔴) | **Actualizado 2026-07-07**: sección "Misiones completadas" corregida y publicada (commit `dcfa72f`, push a `origin/main`) — sustituida por "Cómo trabajamos" con prueba técnica real, sin cifras inventadas, ES/EN. Hallazgo nuevo en esta misma revisión: la barra de estadísticas del hero (`index.html` líneas 449-452) todavía muestra dos de las mismas cifras fabricadas (−80%, 25→1) — no estaban en el alcance aprobado en Fase 1 porque el audit original no las detectó | Un prospecto lee una cifra fabricada en el hero aunque la sección de resultados ya sea honesta | Medio (bajó desde Alto: ya no hay un caso de cliente falso completo, queda una inconsistencia interna) | Media — el hero es lo primero que se ve, aunque el riesgo de publicidad engañosa es menor que un caso cerrado inventado | Aplicar la misma corrección a la barra de estadísticas del hero — pendiente de aprobación explícita, no estaba en el alcance ya aprobado |
| Propuesta de valor | 🟡 | **Actualizado 2026-07-07**: la sección de resultados ya refleja el copy aprobado; la contradicción entre discurso de venta y web pública queda resuelta ahí. Persiste una contradicción interna menor (hero vs. sección de resultados, ver fila anterior) | Discurso de venta y web pública ya no se contradicen entre sí; la web se contradice consigo misma en dos secciones | Bajo (bajó desde Medio) | Baja | Resolver el hallazgo del hero (fila anterior) cierra esto del todo |
| Catálogo | 🟡 | `05-catalogo-servicios.md` v2: 6 de 8 líneas con precio real y capacidad Core completa | Diagnóstico y Mantenimiento SEO técnico sin precio fijado; Gestión del crecimiento Niveles 2-3 no vendibles (ya excluidos, correctamente) | Bajo si se vende solo lo que ya tiene precio | Baja | No ofrecer las dos líneas sin precio en la primera venta — no hace falta fijarlo hoy |
| Modelo de negocio | 🟢 | Motores A/B/C validados en 2 proyectos piloto reales | Ninguno en el diseño; falta la cláusula contractual que lo haga cumplir (ver Sistema comercial) | — | — | — |
| Customer Journey | 🔴 | Fase 6 no existe — no hay recorrido documentado | Ningún paso definido tras el "sí" del cliente | Medio | Media (el fundador puede improvisarlo una vez más, como ya hizo 2 veces) | No bloquea la venta 1, si bloquea la 3ª o 4ª sin intervención del fundador |
| CRM (`interemprex-dashboard`) | 🟡 | **Actualizado 2026-07-07**: R13 **resuelto** — repositorio privado `interemprex-dashboard` creado, remoto configurado, push confirmado (incluye 53 archivos que llevaban meses sin ningún historial de versiones, no solo el scaffold inicial), rama `master` sincronizada y verificada. R6 **parcialmente mitigado** — copia local creada (`backups/interemprex-dashboard/dev.db.*.bak`, fuera del repo git) pero sigue en la misma máquina | Pérdida de datos de cliente real si falla la máquina local (repo ya no es el punto único de fallo; el `.db` local sí lo sigue siendo) | Medio (bajó desde Alto) | Baja probabilidad, pero el coste de cerrar esto del todo es casi cero | Copiar el backup ya existente a un destino fuera de esta máquina (nube personal, email, USB) — ya no hace falta crearlo, solo moverlo |
| LeadFinder | 🟡 | **Actualizado 2026-07-07**: credencial por defecto (`admin`/`changeme`) **corregida** — valores aleatorios generados, verificado que `.env` sigue gitignorado. Exposición legal de la actividad de prospección (L1/L2/L4) sin tocar, no formaba parte de esta ronda | Exposición legal si se usa para contactar leads sin LIA/aviso de prospección (L1/L2/L4) — sin cambios respecto a la evaluación anterior | Medio-alto si es el canal de captación del cliente 1 | Depende del canal real de la primera venta | Si el cliente 1 viene por referido (como bbabogados/costaflora), no bloquea; si viene de `leadfinder`, sí |
| Dashboard/pagos (Stripe) | 🟡 | Webhooks reales, MRR calculado automáticamente | DPA de Stripe no confirmado explícitamente (probablemente ya cubierto por los términos estándar aceptados al abrir la cuenta) | Bajo | Baja | Verificar en el panel de Stripe — minutos, no hace falta rehacer nada |
| Automatizaciones | 🔴 | Solo dos automatizaciones reales (pagos, scoring de leads); LeadFinder y CRM siguen desconectados (silo confirmado) | Cada lead se traslada a mano; no bloquea 1 venta, sí la eficiencia a partir de la 3ª-4ª | Bajo para la venta 1 | — | Manual es aceptable a este volumen — no es el camino crítico |
| Operaciones | 🟡 | Sin proceso de "proyecto tipo" escrito; el fundador ya lo ejecutó 2 veces con éxito | FDI alto (Exclusivo del fundador) — funciona hoy porque solo hay un ejecutor | Medio a partir de un segundo proyecto simultáneo | Baja para la venta 1 | No bloquea vender 1 más; si el fundador no puede ejecutar, sí bloquea |
| Cumplimiento (relación con clientes) | 🟡 | Política de privacidad existe; aviso legal completo no confirmado | Menor que el de prospección — es una relación contractual directa, no datos de terceros sin contacto previo | Bajo-medio | Baja | Verificar/completar aviso legal — tarea corta |
| Cumplimiento (prospección vía LeadFinder) | 🔴 | Sin LIA, sin aviso de privacidad de prospección, sin atribución OSM (L1, L2, L4 — `06-legal-cumplimiento.md`) | Sanción AEPD o reclamación si se contacta comercialmente a un lead scrapeado sin esto resuelto | Alto | Alta si el canal de venta es `leadfinder` | Resolver L1/L2/L4 antes de la primera campaña de contacto saliente basada en scraping |
| Marketing | 🟡 | Sin canal activo más allá de `leadfinder` + referidos + web | No hay motor de captación más allá del boca a boca | Bajo para 1 venta | — | No bloquea; sí limita el ritmo de ventas futuras |
| Soporte | 🟡 | Niveles de mantenimiento definidos en catálogo; sin SLA formal escrito | El fundador es el soporte — funciona a este volumen | Bajo | — | No bloquea la venta 1 |
| IA | 🟢 (no aplica al camino crítico) | La función de IA no forma parte de lo que se vende en Motor A/B hoy | Ninguno — no se está prometiendo IA en la oferta activa | — | — | — |
| Finanzas | 🟡 | Precios reales existen (`precios-y-packs.md`); coste/hora y margen real no calculados (Fase 14) | Se puede vender sin saber el margen exacto, no sin saber el precio | Medio (riesgo de vender con pérdida, no de no poder vender) | Media | Aceptable para 1-2 ventas; no escalar sin datos de coste reales |
| Seguridad | 🟡 (era 🔴) | **Actualizado 2026-07-07**: credencial por defecto de `leadfinder` corregida. Sin backup off-machine del CRM (ver fila Backups) | Pérdida de datos o acceso no autorizado — el vector de credencial de fábrica ya no existe; queda el vector de backup local único | Medio (bajó desde Alto) | Baja | Completar el backup off-machine — único punto abierto de esta fila |
| Backups | 🟡 (era 🔴) | **Actualizado 2026-07-07**: ya no está "ausente" — existe copia local (`backups/interemprex-dashboard/dev.db.20260707-180820.bak`, fuera del repo git) tomada el 2026-07-07. Confirmado además que la carpeta del proyecto no está sincronizada vía OneDrive, así que hoy no existe ninguna copia fuera de esta máquina | Pérdida irreversible de datos de cliente real si falla esta máquina concreta | Medio (bajó desde Alto: la pérdida ya no es total, existe al menos una copia adicional) | Baja probabilidad, consecuencia relevante si ocurre | Copiar el backup ya existente a un destino fuera de esta máquina — la tarea de menor esfuerzo de toda esta tabla, ya no requiere crear nada, solo moverlo |
| Escalabilidad | 🟡 | Arquitectura ya probada contra 10.000 clientes (Fases 3-4); implementación actual (SQLite, sin conexión LeadFinder-CRM) no aguanta ese volumen | No es un riesgo para el cliente 1-3, sí para un crecimiento rápido sin intervención | Bajo para el camino crítico inmediato | — | No bloquea empezar a vender; bloquea vender sin límite sin volver a esta revisión |

## Camino crítico mínimo al primer cliente real

Ordenado por dependencia, eliminando todo lo que no bloquea la primera venta. **Actualizado 2026-07-07** — estado real de cada paso tras esta ronda de ejecución directa:

1. **Backup del CRM** (R6) — 🟡 **parcial**: copia local creada fuera del repo git. Falta el último paso, copiarla fuera de esta máquina — esfuerzo: minutos.
2. **Push de `interemprex-dashboard` a un repositorio remoto privado** (R13) — ✅ **resuelto**: repo privado creado, remoto configurado, push confirmado, incluye código que llevaba meses sin ningún historial (no solo el scaffold inicial).
3. **Cambiar la credencial por defecto de `leadfinder`** (`admin`/`changeme`) — ✅ **resuelto**: valores aleatorios generados, `.env` verificado gitignorado.
4. **Aplicar en `interemprex/index.html` el copy ya aprobado en Fase 1** — ✅ **resuelto**: publicado (commit `dcfa72f`). Hallazgo nuevo pendiente de aprobación: la barra de estadísticas del hero repite dos de las mismas cifras fabricadas, fuera del alcance original de Fase 1.
5. **Redactar un contrato/propuesta mínima** — ✅ **resuelto**: [`contrato-minimo-venta.md`](./contrato-minimo-venta.md). Dos campos quedan pendientes de rellenar antes de la primera firma real (identificación fiscal de INTEREMPREX, ver L8).
6. **Decidir el canal del primer cliente**: si es referido/contacto directo (como `bbabogados` y `costafloragardens`), los pasos 7-8 no bloquean esta venta. Si es un lead de `leadfinder`, sí son necesarios antes de contactarlo comercialmente. **Sin cambios — decisión pendiente del fundador, fuera de lo que se puede ejecutar sin él.**
7. *(Solo si el canal es `leadfinder`)* Redactar un aviso de privacidad breve para la actividad de prospección y una nota de interés legítimo (L1/L2, versión mínima, no el LIA completo de una consultora externa). Sin cambios.
8. *(Solo si el canal es `leadfinder`)* Añadir la atribución a OpenStreetMap (L4) — una línea de texto y un enlace. Sin cambios.
9. **Vender únicamente las líneas de catálogo con precio ya fijado** — no ofrecer Diagnóstico ni Mantenimiento SEO técnico todavía; esto no añade trabajo, lo quita. Sin cambios.

**Explícitamente fuera del camino crítico** (no se hace antes de vender): Customer Journey completo (Fase 6), Sistema comercial completo (Fase 7), conexión automática LeadFinder-CRM, arquitectura empresarial, EIPD/DPIA (L10, no se ha cruzado el umbral), migración de SQLite, capacidad de Gestión del crecimiento, mecanismo de mejora de capacidades. Todo esto sigue siendo válido y necesario — para escalar, no para vender la primera vez.

## Go / No Go

### **GO CON RESTRICCIONES** (mantiene el veredicto; el conjunto de restricciones abiertas se redujo)

No es NO GO: ningún hallazgo indica un problema estructural del modelo de negocio, la propuesta de valor o la capacidad de entrega — los dos proyectos piloto ya demuestran que INTEREMPREX puede ejecutar Motor A de verdad. No es GO limpio: quedan dos puntos abiertos, ambos de esfuerzo bajo.

### Restricciones críticas — estado tras la ejecución del 2026-07-07

1. ~~Backup del CRM antes de meter datos de un cliente de pago real.~~ 🟡 Parcial — falta copiar el backup ya creado fuera de esta máquina.
2. ~~Repositorio remoto de `interemprex-dashboard` antes de seguir dependiendo solo de la máquina local.~~ ✅ Resuelto.
3. ~~Corrección de la web pública (quitar cifras inventadas) antes de que un prospecto la visite.~~ ✅ Resuelto — con un hallazgo nuevo (hero) pendiente de aprobación explícita, no de ejecución.
4. ~~Contrato mínimo antes de cerrar la venta, no después.~~ ✅ Resuelto — dos campos fiscales de INTEREMPREX pendientes de rellenar antes de firmar (L8).
5. Si el canal es `leadfinder`: LIA mínimo + aviso de prospección + atribución OSM antes del primer contacto comercial saliente. **Sin cambios — condicional al canal, decisión pendiente del fundador.**

## Plan operativo — conseguir el primer cliente real

1. ~~Ejecutar las restricciones 1-4 esta semana~~ — **hecho el 2026-07-07** (restricción 1 parcial: falta mover el backup fuera de esta máquina; el resto, resuelto). No quedan tareas de diseño pendientes en este punto, solo dos minutos de ejecución (mover el backup) y una decisión de aprobación (hero de la web).
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

El siguiente euro (y las siguientes horas del fundador) van a cerrar una venta real — de las cinco restricciones críticas originales, cuatro ya están resueltas o casi (ejecutadas directamente el 2026-07-07); solo queda mover un backup ya existente fuera de esta máquina (minutos) y la decisión del canal del cliente 1, que es del fundador, no del proceso.

---

## Actualización 2026-07-07 — refresco puntual, no una nueva review completa

Por instrucción explícita, tras ejecutar directamente la parte del camino crítico alcanzable sin intervención del fundador (backup local, rotación de credencial, repositorio remoto, corrección del copy público, contrato mínimo), se actualizaron aquí solo las filas y secciones afectadas por esas acciones. No se reabrió ninguna fase, no se re-auditaron las áreas no tocadas (Customer Journey, Sistema comercial, Automatizaciones, IA, Escalabilidad siguen exactamente como estaban), y no se generó documentación adicional salvo `contrato-minimo-venta.md`, ya justificado como la única pieza que el propio camino crítico exigía.

Un hallazgo nuevo quedó registrado sin ejecutar (barra de estadísticas del hero de `interemprex/index.html`, mismas cifras fabricadas que "Misiones completadas", fuera del alcance ya aprobado en Fase 1) — pendiente de una decisión explícita, no de trabajo de diseño.

**Qué modifica**: no cambia ninguna decisión de fase anterior — reorganiza evidencia ya existente para responder si INTEREMPREX puede vender hoy, y fija el camino crítico mínimo. La actualización del 2026-07-07 refleja la ejecución directa de 4 de las 5 restricciones críticas originales (una de ellas parcial) y dos hallazgos nuevos (hero de la web, código sin historial de versiones).

**Qué documentos dependen de este**: ninguno formalmente — es una evaluación puntual, no una fase de la que dependan las siguientes. `contrato-minimo-venta.md` nació de la restricción 4 de aquí.

**Qué documentos deben revisarse si esto cambia**: se repite esta review completa cuando cambien las condiciones de fondo (tras cerrar el ciclo del primer cliente, o si cambia el canal de captación) — el refresco puntual de hoy no sustituye eso, solo evita que el documento mienta sobre el estado real mientras tanto.
