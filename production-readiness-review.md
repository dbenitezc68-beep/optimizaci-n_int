# Production Readiness Review — INTEREMPREX

Evaluación puntual (no un documento vivo — se repite cuando cambien las condiciones de fondo, no se actualiza línea a línea como `fdi-registro.md`). Responde a una única pregunta con evidencia, no con opinión: **¿podría INTEREMPREX empezar a vender mañana sin poner en riesgo la empresa?**

Toda la evidencia de este documento ya existía en el repositorio (`03-modelo-negocio.md`, `05-catalogo-servicios.md`, `06-legal-cumplimiento.md`, `inventario-tecnologico.md`, `priorizacion.md`). Esta review no descubre datos nuevos — los reorganiza para responder una pregunta binaria de negocio, no una pregunta de arquitectura.

## Clasificación por área

| Área | Estado | Evidencia | Riesgo | Impacto | Probabilidad | Mitigación |
|---|---|---|---|---|---|---|
| Posicionamiento (estrategia) | 🟢 | `01-posicionamiento.md` aprobado, coherente en cascada hasta Fase 5 | Ninguno a nivel de diseño | — | — | — |
| Web pública (implementación) | 🟢 (era 🔴) | **Actualizado 2026-07-09**: sección "Misiones completadas" corregida (commit `dcfa72f`) y barra de estadísticas del hero corregida (commit `e6f0364`, aprobación explícita del fundador) — ambas sustituidas por hechos verificables (software propio, metodología, 2 pilotos reales, contacto directo), sin cifras inventadas ni estimadas, ES/EN, publicado en `origin/main` | Ninguno pendiente de ejecución | — | — | — |
| Propuesta de valor | 🟢 | **Actualizado 2026-07-09**: la web pública ya no contiene ninguna cifra fabricada, ni en la sección de resultados ni en el hero — coherente de principio a fin con el discurso de venta | Ninguno | — | — | — |
| Catálogo | 🟡 | `05-catalogo-servicios.md` v2: 6 de 8 líneas con precio real y capacidad Core completa | Diagnóstico y Mantenimiento SEO técnico sin precio fijado; Gestión del crecimiento Niveles 2-3 no vendibles (ya excluidos, correctamente) | Bajo si se vende solo lo que ya tiene precio | Baja | No ofrecer las dos líneas sin precio en la primera venta — no hace falta fijarlo hoy |
| Modelo de negocio | 🟢 | Motores A/B/C validados en 2 proyectos piloto reales | Ninguno en el diseño; falta la cláusula contractual que lo haga cumplir (ver Sistema comercial) | — | — | — |
| Customer Journey | 🔴 | Fase 6 no existe — no hay recorrido documentado | Ningún paso definido tras el "sí" del cliente | Medio | Media (el fundador puede improvisarlo una vez más, como ya hizo 2 veces) | No bloquea la venta 1, si bloquea la 3ª o 4ª sin intervención del fundador |
| CRM (`interemprex-dashboard`) | 🟢 | **Actualizado 2026-07-09**: R13 **resuelto** (repositorio privado, push confirmado, incluía 53 archivos sin ningún historial previo) y R6 **resuelto** — backup diario automático, verificado y con retención (ver fila Backups y `## Sistema de backup del CRM`, abajo) | Ninguno pendiente de ejecución | — | — | — |
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
| Seguridad | 🟢 (era 🔴) | **Actualizado 2026-07-09**: credencial por defecto de `leadfinder` corregida (2026-07-07). Backup del CRM automático y fuera de esta máquina (2026-07-09, ver Backups) | Ninguno pendiente de ejecución en el camino crítico | — | — | — |
| Backups | 🟢 (era 🔴) | **Actualizado 2026-07-09**: sistema de backup automático, diario, verificado y con retención implementado y probado de extremo a extremo — ver `## Sistema de backup del CRM`, abajo, para el detalle completo (diseño, validación objetiva punto por punto, y procedimiento de recuperación) | Pérdida de hasta ~24h de datos en el peor caso si el equipo falla justo antes del backup diario, o unos minutos de retraso de sincronización de Google Drive en modo Streaming — riesgo residual aceptado, no eliminado por diseño (ver reauditoría) | Bajo (bajó desde Alto) | Baja | Ninguna acción pendiente; revisar si el volumen de escritura del CRM crece lo suficiente como para justificar más de una copia diaria |
| Escalabilidad | 🟡 | Arquitectura ya probada contra 10.000 clientes (Fases 3-4); implementación actual (SQLite, sin conexión LeadFinder-CRM) no aguanta ese volumen | No es un riesgo para el cliente 1-3, sí para un crecimiento rápido sin intervención | Bajo para el camino crítico inmediato | — | No bloquea empezar a vender; bloquea vender sin límite sin volver a esta revisión |

## Camino crítico mínimo al primer cliente real

Ordenado por dependencia, eliminando todo lo que no bloquea la primera venta. **Actualizado 2026-07-07** — estado real de cada paso tras esta ronda de ejecución directa:

1. **Backup del CRM** (R6) — ✅ **resuelto 2026-07-09**: sistema automático diario, verificado y con retención — ver `## Sistema de backup del CRM`, abajo.
2. **Push de `interemprex-dashboard` a un repositorio remoto privado** (R13) — ✅ **resuelto**: repo privado creado, remoto configurado, push confirmado, incluye código que llevaba meses sin ningún historial (no solo el scaffold inicial).
3. **Cambiar la credencial por defecto de `leadfinder`** (`admin`/`changeme`) — ✅ **resuelto**: valores aleatorios generados, `.env` verificado gitignorado.
4. **Aplicar en `interemprex/index.html` el copy ya aprobado en Fase 1** — ✅ **resuelto 2026-07-09**: sección de resultados (commit `dcfa72f`) y barra de estadísticas del hero (commit `e6f0364`, con aprobación explícita) — ninguna cifra fabricada ni estimada queda en la web pública.
5. **Redactar un contrato/propuesta mínima** — ✅ **resuelto**: [`contrato-minimo-venta.md`](./contrato-minimo-venta.md). Dos campos quedan pendientes de rellenar antes de la primera firma real (identificación fiscal de INTEREMPREX, ver L8).
6. **Decidir el canal del primer cliente**: si es referido/contacto directo (como `bbabogados` y `costafloragardens`), los pasos 7-8 no bloquean esta venta. Si es un lead de `leadfinder`, sí son necesarios antes de contactarlo comercialmente. **Sin cambios — decisión pendiente del fundador, fuera de lo que se puede ejecutar sin él.**
7. *(Solo si el canal es `leadfinder`)* Redactar un aviso de privacidad breve para la actividad de prospección y una nota de interés legítimo (L1/L2, versión mínima, no el LIA completo de una consultora externa). Sin cambios.
8. *(Solo si el canal es `leadfinder`)* Añadir la atribución a OpenStreetMap (L4) — una línea de texto y un enlace. Sin cambios.
9. **Vender únicamente las líneas de catálogo con precio ya fijado** — no ofrecer Diagnóstico ni Mantenimiento SEO técnico todavía; esto no añade trabajo, lo quita. Sin cambios.

**Explícitamente fuera del camino crítico** (no se hace antes de vender): Customer Journey completo (Fase 6), Sistema comercial completo (Fase 7), conexión automática LeadFinder-CRM, arquitectura empresarial, EIPD/DPIA (L10, no se ha cruzado el umbral), migración de SQLite, capacidad de Gestión del crecimiento, mecanismo de mejora de capacidades. Todo esto sigue siendo válido y necesario — para escalar, no para vender la primera vez.

## Go / No Go

### **GO** para el escenario realista (cliente 1 por referido) — **GO CON UNA RESTRICCIÓN CONDICIONAL** si el canal es `leadfinder`

No es NO GO: ningún hallazgo indica un problema estructural del modelo de negocio, la propuesta de valor o la capacidad de entrega — los dos proyectos piloto ya demuestran que INTEREMPREX puede ejecutar Motor A de verdad. De las cinco restricciones críticas originales, **cuatro están completamente resueltas** y verificadas con evidencia objetiva. La quinta no es un trabajo pendiente — es condicional a una decisión que todavía no se ha tomado (el canal del primer cliente).

### Restricciones críticas — estado tras la ejecución del 2026-07-07 y 2026-07-09

1. ~~Backup del CRM antes de meter datos de un cliente de pago real.~~ ✅ Resuelto — sistema automático, verificado, con retención.
2. ~~Repositorio remoto de `interemprex-dashboard` antes de seguir dependiendo solo de la máquina local.~~ ✅ Resuelto.
3. ~~Corrección de la web pública (quitar cifras inventadas) antes de que un prospecto la visite.~~ ✅ Resuelto — hero incluido, sin cifras fabricadas ni estimadas en toda la web.
4. ~~Contrato mínimo antes de cerrar la venta, no después.~~ ✅ Resuelto — dos campos fiscales de INTEREMPREX pendientes de rellenar antes de firmar (L8), no de redactar.
5. Si el canal es `leadfinder`: LIA mínimo + aviso de prospección + atribución OSM antes del primer contacto comercial saliente. **Sin cambios — condicional al canal, decisión pendiente del fundador. No bloquea nada si el cliente 1 llega por referido, como los dos pilotos existentes.**

## Plan operativo — conseguir el primer cliente real

1. ~~Ejecutar las restricciones 1-4~~ — **hecho, completo, entre el 2026-07-07 y el 2026-07-09.** No queda ninguna tarea de diseño ni de ejecución pendiente en estos cuatro puntos.
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

El siguiente euro (y las siguientes horas del fundador) van a cerrar una venta real — de las cinco restricciones críticas originales, **cuatro están completamente resueltas y verificadas**; la quinta es condicional al canal del cliente 1, decisión que corresponde al fundador, no al proceso.

---

## Sistema de backup del CRM (detalle, 2026-07-09)

Implementado con el mismo nivel de exigencia que el resto de este documento: nada se dio por supuesto, cada punto se verificó con evidencia objetiva antes de marcarse como resuelto.

### Análisis previo

- **Origen real de los datos**: `interemprex-dashboard/dev.db`, confirmado siguiendo la cadena completa `DATABASE_URL="file:./dev.db"` (`.env`) → adaptador `PrismaBetterSqlite3` (`src/lib/prisma.ts`) → resolución relativa a `process.cwd()` (no al directorio de `schema.prisma`, a diferencia del motor clásico de Prisma) → confirmado que `npm run dev`/`start` se ejecutan desde la raíz del proyecto. Verificado además que no existe ningún otro archivo `.db` en el repositorio que pudiera generar confusión.
- **Riesgo real de copiar el archivo en caliente**: confirmado que una copia de archivo convencional (`Copy-Item`, `robocopy`) no garantiza una instantánea transaccionalmente consistente si hay una escritura en curso — el riesgo existe independientemente del modo de journaling, y sería aún mayor si en el futuro se activa el modo WAL (hoy confirmado en modo `delete`, el journal clásico de SQLite) porque una copia de archivo ingenua podría ignorar datos ya confirmados que todavía viven en el archivo `-wal`. **Decisión**: no se copia el archivo — se usa la API de backup nativa de SQLite (`better-sqlite3`'s `Database.backup()`), diseñada específicamente para producir una copia consistente de una base de datos abierta y en uso. No se añadió ninguna dependencia nueva: `better-sqlite3` ya es una dependencia del proyecto.
- **Destino real**: la ruta indicada inicialmente por el fundador (`C:\Users\Dario\Google Drive\...`) **no existe en esta máquina** — Google Drive está instalado en modo Streaming ("Drive File Stream"), que monta la unidad como `G:\Mi unidad`, no como una carpeta local sincronizada. Se verificó (escritura y lectura de prueba) que `G:\Mi unidad\INTEREMPREX\Backups\CRM` es la ruta real, escribible y sincronizada, y se usó esa en su lugar — comunicado explícitamente antes de implementar, según lo pedido.

### Diseño

- `interemprex-dashboard/scripts/backup-db.js` — backup vía `Database.backup()`, nombre `dev_YYYY-MM-DD_HHMMSS.db`, verificación posterior (`integrity_check`, recuento de tablas contra el origen, tamaño > 0), retención de las 30 copias más recientes.
- `interemprex-dashboard/scripts/lib/retention.js` — política de retención aislada en su propio módulo (para poder probarla de forma independiente), ordena por el timestamp **embebido en el nombre del archivo**, no por metadata del sistema de ficheros (una carpeta sincronizada en la nube puede tocar `mtime` al sincronizar; el nombre nunca cambia). Ignora cualquier archivo que no coincida exactamente con el patrón — nunca borra a ciegas.
- `interemprex-dashboard/scripts/backup-db.config.json` — ruta de destino, **no versionado** (es específico de esta máquina, ver `.gitignore`).
- `interemprex-dashboard/scripts/run-backup.ps1` — wrapper para ejecución manual y programada.
- `interemprex-dashboard/scripts/register-backup-task.ps1` — registra la tarea de Windows (`schtasks`/`ScheduledTasks` nativos, sin herramientas de terceros).
- Tarea programada **`INTEREMPREX-CRM-Backup`**: diaria a las 02:00, con `StartWhenAvailable` (si el equipo está apagado a esa hora, se ejecuta en cuanto vuelve a estar disponible, en vez de perderse esa noche en silencio). Se ejecuta en la sesión del usuario actual — deliberadamente **no** se almacenó la contraseña de Windows en el Programador de tareas para no crear una nueva superficie de exposición de credenciales; la limitación (solo corre con sesión iniciada) es aceptable en una máquina de desarrollo personal, donde si no hay sesión iniciada tampoco hay servidor generando datos nuevos que respaldar.

### Validación — evidencia objetiva, no supuesta

| Comprobación | Resultado |
|---|---|
| El backup se ejecuta correctamente | ✅ Ejecutado manualmente y verificado; exit code 0 |
| El archivo generado es válido | ✅ `integrity_check=ok` dentro del propio script, y verificado una segunda vez de forma **independiente** (proceso Node aparte, fuera del script) leyendo las 11 tablas reales y sus filas |
| La base de datos puede abrirse | ✅ Confirmado en la verificación independiente anterior |
| El nombre contiene fecha y hora | ✅ Formato `dev_2026-07-09_125951.db`, exactamente el pedido |
| No sobrescribe versiones anteriores | ✅ El script aborta si ya existe un archivo con ese nombre exacto; 6 backups de esta sesión de pruebas coexisten sin colisión |
| La política de retención funciona | ✅ Probada de forma aislada con 35 archivos simulados: conserva exactamente las 30 más recientes, elimina las 5 más antiguas correctamente identificadas |
| La tarea programada queda correctamente registrada | ✅ `Get-ScheduledTask` confirma estado `Ready`; **se disparó la tarea real** (`Start-ScheduledTask`, no solo el script a mano) y `LastTaskResult = 0` |
| El script puede ejecutarse manualmente | ✅ Probado repetidas veces vía `node scripts/backup-db.js` y vía `run-backup.ps1` |
| Las rutas son correctas | ✅ Origen resuelto vía `__dirname` (no depende del directorio de trabajo); destino verificado real y escribible tras corregir el hallazgo de la ruta inicial |
| No existen errores silenciosos | ✅ Comprobado activamente — **se encontraron y corrigieron dos fallos reales durante la propia validación** (ver Reauditoría) en vez de darse por buenos sin probarlos |

### Recuperación — si esta máquina dejara de funcionar hoy

1. Instalar Google Drive for Desktop en la máquina nueva, iniciar sesión con la misma cuenta — el histórico de backups ya está en la nube, no depende de la máquina que falló.
2. Localizar el archivo más reciente en `Mi unidad/INTEREMPREX/Backups/CRM/` (el de fecha/hora más alta en el nombre).
3. `git clone` de `interemprex-dashboard` (posible desde hoy — R13 ya resuelto) y `npm install`.
4. Copiar el backup elegido a la raíz del proyecto como `dev.db`.
5. Recrear `interemprex-dashboard/.env` — **este es el paso débil real del procedimiento**: `.env` nunca se ha versionado (correctamente, por seguridad) ni se ha respaldado en ningún sitio. Contiene `AUTH_SECRET`, `DATABASE_URL`, `NEXT_PUBLIC_APP_URL`, `STRIPE_SECRET_KEY`, `STRIPE_PUBLISHABLE_KEY`, `STRIPE_WEBHOOK_SECRET` — sin esto, la app no arranca aunque `dev.db` esté perfectamente restaurado. Los valores de Stripe pueden recuperarse desde el panel de Stripe; `AUTH_SECRET` no tiene otra copia en ningún sitio hoy.
6. `npm run dev` (o `build`+`start`) y verificar que la app arranca y lee los datos restaurados.

**Tiempo estimado**: minutos para los pasos 1-4 y 6 (mecánicos); el paso 5 es el que puede alargar la recuperación de forma impredecible si no hay un gestor de contraseñas con esos valores guardados.

**Debilidad detectada y no corregida aquí, deliberadamente**: el `.env` de `interemprex-dashboard` es un punto único de fallo tan real como lo era `dev.db` antes de hoy, pero es una categoría de riesgo distinta (secretos vivos, no datos de negocio) que no debe resolverse copiándolo sin más a una carpeta de Google Drive en texto plano — merece una herramienta de gestión de secretos (gestor de contraseñas), no este mismo mecanismo. Se registra como hallazgo nuevo en `priorizacion.md`, no se ejecuta sin decisión explícita del fundador sobre dónde deben vivir esos valores.

### Reauditoría (Fase 7) — intentando encontrar fallos, no confirmando que funciona

- **Fallo real encontrado y corregido durante la propia implementación**: un `ReferenceError` en la primera versión de la lógica de retención (variable fuera de alcance) que habría hecho fallar silenciosamente la limpieza de backups antiguos la primera vez que se superasen 30 copias. Se encontró porque el script se ejecutó de verdad, no solo se revisó — refuerza que "no existen errores silenciosos" solo se puede afirmar tras ejecutar, no tras leer el código.
- **Segundo fallo real encontrado y corregido**: la redirección de salida de PowerShell (`*>>`) escribía el log en UTF-16LE por defecto, corrompiendo silenciosamente cualquier tilde y dejando el archivo prácticamente ilegible para cualquier herramienta que asuma UTF-8. Corregido haciendo que el propio script de Node escriba su log directamente en UTF-8 (`fs.appendFileSync`), eliminando la dependencia de la redirección de PowerShell para el registro que de verdad importa.
- **Punto único de fallo eliminado**: sí, el objetivo de la tarea — `dev.db` ya no depende solo de esta máquina.
- **Riesgo residual aceptado, no eliminado**: Google Drive en modo Streaming sube los archivos de forma asíncrona; si esta máquina fallara en los segundos/minutos posteriores a un backup, antes de que termine de subirse, ese backup concreto podría no estar realmente en la nube todavía. Es una propiedad del transporte elegido por el fundador, no un defecto de esta implementación — y sigue siendo una mejora radical frente a la situación anterior (cero copias fuera de esta máquina, siempre).
- **Dependencia oculta identificada**: el backup depende de que Node.js esté instalado en la ruta `C:\Program Files\nodejs\node.exe` (ruta absoluta usada por `run-backup.ps1` para evitar problemas de `PATH` en el contexto del Programador de tareas). Si Node se reinstala en otra ruta, la tarea fallará hasta actualizar esa ruta — riesgo bajo, mantenimiento de coste mínimo si ocurre.
- **Riesgo de mantenimiento**: el sistema no envía ninguna alerta activa si falla (por ejemplo, si Google Drive se desconecta de la cuenta). Mitigación disponible sin construir nada nuevo: el Programador de tareas de Windows ya expone `LastTaskResult` (usado en esta misma validación) — revisarlo ocasionalmente, o cuando se sospeche un problema, es suficiente a este volumen; no se justifica un sistema de alertas dedicado para una base de datos de un único usuario todavía sin clientes de pago reales.

---

## Actualización 2026-07-07 — refresco puntual, no una nueva review completa

Por instrucción explícita, tras ejecutar directamente la parte del camino crítico alcanzable sin intervención del fundador (backup local, rotación de credencial, repositorio remoto, corrección del copy público, contrato mínimo), se actualizaron aquí solo las filas y secciones afectadas por esas acciones. No se reabrió ninguna fase, no se re-auditaron las áreas no tocadas (Customer Journey, Sistema comercial, Automatizaciones, IA, Escalabilidad siguen exactamente como estaban), y no se generó documentación adicional salvo `contrato-minimo-venta.md`, ya justificado como la única pieza que el propio camino crítico exigía.

Un hallazgo nuevo quedó registrado sin ejecutar (barra de estadísticas del hero de `interemprex/index.html`, mismas cifras fabricadas que "Misiones completadas", fuera del alcance ya aprobado en Fase 1) — pendiente de una decisión explícita, no de trabajo de diseño. **Resuelto en la actualización siguiente, 2026-07-09.**

## Actualización 2026-07-09 — refresco puntual, no una nueva review completa

Por instrucción explícita: (1) corrección del hero de `interemprex/index.html` con aprobación previa del fundador, eliminando cifras no demostrables sin sustituirlas por otras estimadas; (2) sistema de backup automático, verificado y con retención para `interemprex-dashboard/dev.db`, con el mismo nivel de exigencia que una auditoría de producción — ver `## Sistema de backup del CRM`, arriba, para el detalle completo (análisis previo, diseño, validación punto por punto, procedimiento de recuperación y reauditoría adversarial).

De las cinco restricciones críticas originales del 2026-07-02, **cuatro quedan completamente resueltas y verificadas con evidencia objetiva** (no solo ejecutadas — probadas). La quinta (L1/L2/L4 de `leadfinder`) sigue condicional al canal del primer cliente, una decisión del fundador que el proceso no puede ni debe tomar por él.

Un hallazgo nuevo, de categoría distinta a las cinco restricciones (no es un dato de negocio ni un riesgo de continuidad del CRM, es gestión de secretos), quedó registrado sin ejecutar: `interemprex-dashboard/.env` no tiene ninguna copia fuera de esta máquina, y no debería resolverse con el mismo mecanismo que `dev.db` — necesita un gestor de contraseñas, no una carpeta de Drive en texto plano. Añadido a `priorizacion.md`, no ejecutado sin decisión explícita del fundador.

**Qué modifica**: no cambia ninguna decisión de fase anterior — reorganiza evidencia ya existente para responder si INTEREMPREX puede vender hoy, y fija el camino crítico mínimo. La actualización del 2026-07-09 cierra las dos únicas restricciones que seguían abiertas tras el 2026-07-07 (hero de la web, backup off-machine) y añade un hallazgo nuevo de menor prioridad (`.env` sin backup).

**Qué documentos dependen de este**: ninguno formalmente — es una evaluación puntual, no una fase de la que dependan las siguientes.

**Qué documentos deben revisarse si esto cambia**: se repite esta review completa cuando cambien las condiciones de fondo (tras cerrar el ciclo del primer cliente, o si cambia el canal de captación) — el refresco puntual de hoy no sustituye eso, solo evita que el documento mienta sobre el estado real mientras tanto.
