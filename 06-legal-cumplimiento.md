# 06 — Legal y Cumplimiento

Estado: **v2, propuesto, pendiente de aprobación.** Construido según `00-metodologia.md`, validado contra `02-principios-fundacionales.md`. No modifica ninguna fase ya cerrada (01-05, metodología, FDI, BCI, priorización) — las usa como base y añade sobre ellas. La v2 incorpora la auditoría adversarial de Modo Optimización Total: 2 riesgos nuevos (L10, L11) y una corrección de terminología señalada, sin cambiar ninguna decisión sustantiva de la v1.

## Aviso de alcance (léase antes que el resto del documento)

Este documento no es una opinión jurídica ni sustituye la revisión de un abogado o delegado de protección de datos (DPO) cualificado. Es la arquitectura de cumplimiento — qué normativa aplica, qué hechos existen, qué riesgos se derivan, qué habría que hacer — construida con el mismo rigor que el resto del proyecto, pero el análisis legal específico (bases jurídicas, interpretación de licencias, obligaciones fiscales) debe confirmarse con un profesional antes de tomarse como certificación de cumplimiento, especialmente antes de escalar la captación de datos (`leadfinder`) o de operar internacionalmente. Cada afirmación de este documento se marca como **[HECHO]** (verificado en código o documentación), **[HIPÓTESIS]** (interpretación razonable, no confirmación jurídica) o **[RECOMENDACIÓN]** (acción propuesta, no aplicada), siguiendo la regla explícita pedida para esta fase.

## Resumen ejecutivo

INTEREMPREX trata datos personales en tres sistemas (`leadfinder`, `interemprex-dashboard`, el formulario de la web pública) bajo un marco normativo de cuatro normas principales (RGPD, LOPDGDD, LSSI-CE, ePrivacy/cookies) más obligaciones contractuales (Stripe, Anthropic) y de licencia (OpenStreetMap ODbL). El hallazgo central: **ningún sistema tiene hoy una política de conservación de datos, y la actividad de mayor volumen (prospección vía `leadfinder`) no tiene documentado ni un test de interés legítimo ni un canal de ejercicio de derechos** — no porque se haya hecho algo indebido, sino porque nunca se ha auditado hasta esta fase. Se identifican 9 riesgos legales (L1-L9), se construye la matriz de cumplimiento completa, y se integran con `priorizacion.md`, `fdi-registro.md` y `bci-registro.md` sin crear ninguna metodología nueva.

## 1. Marco normativo

| Norma | Ámbito | Por qué aplica a INTEREMPREX | Tipo |
|---|---|---|---|
| **RGPD** (Reglamento UE 2016/679) | Protección de datos de personas físicas en la UE | `interemprex-dashboard` almacena datos de contacto de clientes; `leadfinder` trata datos de negocios que en el caso de autónomos son datos de personas físicas identificables | [HECHO] que aplica; alcance exacto [HIPÓTESIS] |
| **LOPDGDD** (LO 3/2018) | Desarrollo español del RGPD; incluye reglas específicas sobre prospección con fuentes accesibles al público | Directamente relevante para `leadfinder`, que trata datos obtenidos de una fuente pública (OpenStreetMap) con fines de prospección comercial | [HIPÓTESIS] — el artículo exacto aplicable debe confirmarse con un profesional |
| **LSSI-CE** (Ley 34/2002) | Comunicaciones comerciales electrónicas y cookies (vía transposición de ePrivacy en su art. 22.2) | Aplica a cualquier email/SMS de prospección futura y a la gestión de cookies de `interemprex` (web pública) | [HECHO] que aplica a la web; aplicación futura a email marketing [HIPÓTESIS] |
| **Condiciones de Stripe** | Contractual, no normativa pública | Genera obligación de Acuerdo de Tratamiento de Datos (DPA) con Stripe como encargado de tratamiento de pagos | [HECHO] que la relación existe; [HIPÓTESIS] si el DPA está formalmente aceptado — no verificable desde aquí |
| **Licencias de software** | Términos de las dependencias del stack (Next.js, Prisma, FastAPI, SQLAlchemy...) | Uso comercial de librerías de terceros | [HIPÓTESIS] — son mayoritariamente licencias permisivas (MIT/similar) por ser el ecosistema estándar de estas tecnologías, pero no se ha hecho un escaneo exhaustivo de cada dependencia; **recomendación**: ejecutar una herramienta de auditoría de licencias (`license-checker` para Node, `pip-licenses` para Python) antes de dar esto por cerrado |
| **Licencias de datos** (ODbL de OpenStreetMap) | Licencia de la fuente de datos de `leadfinder` | Ver sección 3 | [HECHO] |
| **Obligaciones de APIs** (Anthropic, Google Places, Stripe, Overpass) | Términos de servicio de cada proveedor | Cada API que recibe datos de INTEREMPREX genera una relación de tratamiento que debe estar cubierta | [HIPÓTESIS] sobre el contenido exacto de cada término vigente — deben verificarse activamente, no asumirse desde el conocimiento general del modelo |

## 2. LeadFinder — análisis completo

- **Scraping** [HECHO]: fuente única activa es la API de Overpass (OpenStreetMap); Google Places está preparada pero inactiva. El método sigue buenas prácticas técnicas (secuencial, backoff, User-Agent identificable) — esto reduce riesgo de bloqueo por abuso de la API, pero no exime de las obligaciones legales sobre los datos obtenidos.
- **Base jurídica** [HIPÓTESIS]: la más plausible es **interés legítimo** (Art. 6.1.f RGPD) para prospección B2B con datos de fuentes públicas — el propio RGPD (considerando 47) cita el marketing directo como ejemplo posible de interés legítimo. Esto **no es una confirmación**: exige (a) un test de ponderación de intereses (LIA, Legitimate Interest Assessment) documentado, que **no existe hoy** [HECHO], y (b) que se respete el derecho de oposición (Art. 21).
- **Licitud del tratamiento**: pendiente de la LIA anterior — no se puede afirmar "cumple" sin ese documento.
- **Datos personales tratados** [HECHO, ya confirmado en `auditoria-preventiva-leadfinder.md`]: nombre del negocio, dirección, teléfono, email, redes sociales, categoría, puntuación. Cuando el negocio es un autónomo identificado por su propio nombre, estos son datos personales de una persona física con certeza; cuando es una sociedad, el teléfono/email de contacto puede seguir señalando indirectamente a una persona — la distinción caso por caso **[HIPÓTESIS]**, no está resuelta en el propio dato.
- **Datos que nunca deberían almacenarse** [RECOMENDACIÓN]: cualquier categoría especial de datos (Art. 9 RGPD: salud, ideología, orientación sexual, etc.) si apareciera incidentalmente en algún campo de OSM; datos de menores; cualquier campo no necesario para el scoring (principio de minimización).
- **Tiempos de conservación**: **no existe ninguna política hoy** [HECHO, ya confirmado]. Recomendación [RECOMENDACIÓN]: definir un plazo (p. ej., anonimizar o eliminar leads no contactados tras un periodo, y los marcados "no interesado" en un plazo más corto) — la cifra concreta es una decisión del usuario, no se inventa aquí.
- **Ejercicio de derechos**: no existe un canal específico para que una persona cuyo negocio aparece en `leadfinder` ejerza acceso/rectificación/oposición/supresión [HECHO]. La política de privacidad de `interemprex` cubre la relación con clientes, no la actividad de prospección.
- **Riesgos legales**: ver L1-L3 en la sección 10.
- **Medidas correctoras propuestas** [RECOMENDACIÓN, no aplicadas]: documentar un LIA formal; publicar un aviso de privacidad específico para la actividad de prospección (puede satisfacer la excepción de "esfuerzo desproporcionado" del Art. 14.5.b para informar sin contacto directo); fijar plazo de conservación; habilitar canal de derechos; añadir atribución OSM (sección 3).

## 3. OpenStreetMap

- **Licencia aplicable** [HECHO]: Open Database License (ODbL) 1.0.
- **Obligaciones de atribución** [HECHO, de los términos públicos de la licencia]: debe atribuirse "© OpenStreetMap contributors" con enlace a `openstreetmap.org/copyright` en cualquier uso público de los datos.
- **Obligaciones comerciales** [HECHO]: la ODbL permite uso comercial sin restricción adicional, siempre que se mantenga la atribución.
- **Reutilización de datos** [HIPÓTESIS]: el uso actual (generar leads para contacto comercial propio, no redistribuir la base de datos en sí) encaja mejor en la categoría de "obra producida" ("produced work") que en "base de datos derivada" — la obligación principal sería solo atribución, no compartir la base bajo la misma licencia. Esta es una interpretación razonable de la estructura de la licencia, **no una certeza jurídica** — si en el futuro se vendiera o exportara la base de leads como producto (posibilidad de Motor D ya anotada en `capacidades-core.md`), esta conclusión debe revisarse con un profesional antes de proceder.
- **Cumplimiento hoy** [HECHO]: **no cumple** — no se ha encontrado ninguna atribución a OpenStreetMap en ninguna superficie pública de INTEREMPREX revisada.

## 4. CRM (`interemprex-dashboard`)

| Aspecto | Estado | Tipo |
|---|---|---|
| Flujo de datos | Cliente → alta manual/formulario → SQLite local → Stripe (webhook de pago) | [HECHO] |
| Responsable del tratamiento | INTEREMPREX | [HECHO] |
| Encargados de tratamiento | Stripe (pagos) | [HECHO que la relación existe; HIPÓTESIS si el DPA está aceptado] |
| Autenticación | JWT + bcrypt | [HECHO, `inventario-tecnologico.md`] |
| Sesiones | Cookie httpOnly (según README del propio sistema) | [HECHO] |
| Backups | No verificados — riesgo ya registrado como R6 | [HECHO de la ausencia] |
| Logs de acceso/auditoría | No verificado si existen | [HIPÓTESIS de ausencia — no confirmado en ningún sentido] |
| Cifrado en tránsito | HTTPS asumido en producción, no confirmado si está desplegado así | [HIPÓTESIS] |
| Cifrado en reposo (SQLite) | No verificado | [HIPÓTESIS de ausencia] |
| Minimización de datos | El modelo de datos parece limitado a lo necesario (contacto, notas, procesos, pagos), sin evidencia de sobre-recolección | [HIPÓTESIS razonable] |
| Conservación | Sin política documentada | [HECHO de la ausencia] |
| Eliminación de datos de cliente | No verificado si existe función de borrado | [HIPÓTESIS de ausencia] |
| Exportación de datos (portabilidad, Art. 20 RGPD) | No verificado si existe función de exportación | [HIPÓTESIS de ausencia] |
| Auditoría interna | Sin mecanismo de logs verificado | [HIPÓTESIS de ausencia] |

## 5. Stripe

- **Qué procesa Stripe** [HIPÓTESIS basada en cómo funciona Stripe públicamente, no verificado contra la configuración específica de INTEREMPREX]: datos de tarjeta/pago (tokenizados), y datos asociados a la transacción (nombre, email) — Stripe actúa como encargado para la mayoría de estos fines y como responsable independiente para fines regulatorios propios (prevención de fraude, cumplimiento normativo de medios de pago).
- **Qué procesa INTEREMPREX**: datos de cliente en el CRM (contacto, notas, historial) y referencias a identificadores de Stripe — nunca el número de tarjeta completo, que Stripe tokeniza antes de que llegue a los sistemas propios si se usa el flujo estándar (Stripe.js/Elements) [HIPÓTESIS razonable dado el uso de la API oficial de Stripe, no verificado línea a línea en el código].
- **Datos que nunca deben almacenarse** [RECOMENDACIÓN]: número de tarjeta completo, CVV — deben quedar excluidos por diseño si se usa el flujo estándar de Stripe; confirmar explícitamente que ningún log o campo de la base de datos los captura.
- **Obligaciones documentales**: debe existir un Acuerdo de Tratamiento de Datos (DPA) aceptado con Stripe — Stripe lo ofrece a través de su panel/centro legal; **no verificado si se ha aceptado formalmente** [HIPÓTESIS de pendiente].
- **Facturación y conservación fiscal**: España tiene obligaciones de conservación de registros contables (típicamente varios años) y normativa de facturación electrónica en desarrollo (Verifactu / Ley Crea y Crece) cuyas fechas y alcance exacto dependen del tamaño y tipo de empresa. **Este es un área fuera de mi capacidad de confirmar con precisión** — cambia con el tiempo y depende de detalles fiscales específicos; se marca como **[RECOMENDACIÓN: consultar con una asesoría fiscal]**, no como un hecho verificado.
- **Evidencias de pago**: Stripe conserva el historial de transacciones; INTEREMPREX debería mantener también su propio registro de reconciliación (vía CRM) — parece ya cubierto por el propio diseño del dashboard (MRR y pagos sincronizados), pendiente de verificar retención a largo plazo.

## 6. Página web (`interemprex`)

| Aspecto | Estado | Tipo |
|---|---|---|
| Política de privacidad | Existe (7 secciones: finalidades, conservación, derechos, cesión, seguridad — vista en el análisis inicial) | [HECHO] que existe; [HIPÓTESIS] que cubra la actividad de `leadfinder` (probablemente no, fue redactada pensando en clientes/formulario) |
| Política de cookies | Existe como modal en el HTML | [HECHO] que existe; **no verificado si bloquea cookies no esenciales hasta el consentimiento** (requisito legal real, no solo mostrar el aviso) [HIPÓTESIS de pendiente] |
| Aviso legal | No confirmado si existe un aviso legal completo (identificación de la empresa: nombre, NIF, domicilio) | [HIPÓTESIS de ausencia — no se vio explícitamente en el análisis inicial] |
| Términos y condiciones de servicio | No confirmado si existen, separados de la política de privacidad | [HIPÓTESIS de ausencia] |
| Consentimiento en el formulario de contacto (Web3Forms) | No confirmado si hay checkbox de consentimiento explícito antes de enviar | [HIPÓTESIS de pendiente] |
| Newsletter | Sin evidencia de sistema activo | [HECHO de ausencia de la funcionalidad, no de una obligación incumplida] |
| Captación de leads vía formulario | Mismo canal que el consentimiento de arriba | — |

## 7. Marketing

- **Email marketing** [HECHO de ausencia]: no hay evidencia de ninguna herramienta de email marketing activa hoy. Si se activa en el futuro (línea Gestión del crecimiento de Motor B, hoy no vendible según `05-catalogo-servicios.md`), debe cumplir LSSI-CE Art. 21: consentimiento previo, salvo relación previa con un producto similar (excepción de "cliente existente") [HIPÓTESIS sobre el artículo exacto, confirmar con profesional].
- **Prospección comercial**: distinción importante que no estaba explícita en el análisis anterior — **encontrar y puntuar el dato** (lo que hace `leadfinder`, ya analizado en la sección 2) es distinto de **contactar comercialmente** a ese lead. El contacto por email/SMS cae bajo LSSI-CE (consentimiento previo); el contacto telefónico o postal tiene un régimen distinto, y España mantiene listas de exclusión publicitaria (tipo "Lista Robinson") que deben consultarse antes de campañas de telemarketing [HIPÓTESIS general, confirmar alcance actual con un profesional].
- **Tratamiento de leads en CRM**: cuando un lead de `leadfinder` se traslada al CRM (hoy de forma manual, sin conexión automática — ver `flywheel-comercial.md`), pasa a estar bajo el mismo régimen que el resto de datos del CRM (sección 4).
- **Automatizaciones**: la función de auditoría de leads con IA (`capacidades-core.md`, capacidad 4) implica enviar datos de terceros a Anthropic — ver sección 8.

## 8. IA

- **Tratamiento de datos por modelos de IA** [HECHO]: la función de auditoría de leads en `leadfinder` envía datos (nombre, contacto, categoría) a la API de Anthropic (Claude Haiku 4.5).
- **Proveedores externos**: Anthropic. **[HIPÓTESIS, requiere verificación activa]**: las API comerciales de los grandes proveedores de modelos de lenguaje generalmente no usan los datos enviados vía API para entrenar sus modelos por defecto (a diferencia de ciertos productos de consumo gratuitos) — esto debe confirmarse contra los términos vigentes realmente aceptados por la cuenta de INTEREMPREX, no darse por hecho de memoria.
- **Confidencialidad**: depende de si existe un Acuerdo de Tratamiento de Datos específico aceptado con Anthropic más allá de los términos estándar de la API — no verificado.
- **Riesgos**: exportar datos personales (cuando el lead es persona física) a un tercero sin que conste en ninguna política pública ni en el LIA de la sección 2 — mismo hallazgo, con el añadido de un proveedor no mencionado en ningún documento legal visible.
- **Limitaciones**: la función no está confirmada en uso real (clave de API no verificada como configurada) — esto reduce el riesgo actual, no lo elimina si se activa sin resolver lo anterior.
- **Cumplimiento**: no evaluado públicamente hasta este documento — ninguna política existente menciona el uso de IA sobre datos de prospección.

## 9. Matriz de cumplimiento

| Requisito | Normativa | Riesgo | Estado | Evidencia | Prioridad | Acción pendiente |
|---|---|---|---|---|---|---|
| LIA (test de interés legítimo) para `leadfinder` | RGPD Art. 6.1.f | Alto | ❌ No existe | `auditoria-preventiva-leadfinder.md` | Crítica | Documentar LIA formal |
| Aviso de privacidad de la actividad de prospección | RGPD Art. 14 | Alto | ❌ No existe | Política actual solo cubre clientes | Crítica | Redactar y publicar aviso específico |
| Plazo de conservación de leads | RGPD Art. 5.1.e | Alto | ❌ No existe | Confirmado, sin campo de expiración en el modelo | Alta | Definir plazo con el usuario |
| Canal de ejercicio de derechos para prospección | RGPD Art. 12-22 | Medio-alto | ❌ No existe | — | Alta | Habilitar canal o extender el existente |
| Atribución a OpenStreetMap | ODbL 1.0 | Medio | ❌ No cumple | Verificado, ninguna atribución encontrada | Alta | Añadir atribución en web y/o dashboard |
| DPA con Stripe | RGPD Art. 28 | Medio | ⚠️ No verificado | — | Media | Confirmar aceptación en el panel de Stripe |
| DPA/confidencialidad con Anthropic | RGPD Art. 28 | Medio | ⚠️ No verificado | — | Media | Confirmar términos vigentes aceptados |
| Backups del CRM | RGPD Art. 5.1.f (integridad) | Alto | ❌ No verificado | R6, `03-modelo-negocio.md` | Alta (ya en `priorizacion.md`) | Ya registrado — no duplicar, solo referenciar |
| Bloqueo real de cookies no esenciales hasta consentimiento | LSSI-CE Art. 22.2 | Medio | ⚠️ No verificado | Modal existe, comportamiento no confirmado | Media | Verificar comportamiento técnico real |
| Aviso legal completo en la web | LSSI-CE Art. 10 | Medio | ⚠️ No verificado | No visto en análisis inicial | Media | Verificar/completar |
| Consentimiento explícito en formulario de contacto | RGPD Art. 7 | Medio | ⚠️ No verificado | — | Media | Verificar checkbox en Web3Forms |
| Credencial por defecto en `leadfinder` | RGPD Art. 32 (seguridad) | Bajo hoy | ⚠️ Confirmado sin cambiar | `auditoria-preventiva-leadfinder.md` | Media (ya en `priorizacion.md`) | Ya registrado — no duplicar |
| Escaneo de licencias de dependencias de software | Licencias de terceros | Bajo | ⚠️ No realizado | — | Baja | Ejecutar herramienta de auditoría de licencias |
| Base jurídica y confidencialidad de datos exportados a IA | RGPD Art. 28, 44-49 (si aplica transferencia) | Medio | ❌ No documentado | Sección 8 | Alta | Documentar y confirmar con Anthropic |
| Régimen de contacto comercial (email/SMS vs. teléfono/postal) | LSSI-CE Art. 21, listas de exclusión | Medio | ⚠️ No aplica todavía (sin campaña activa) | Sección 7 | Media | Diseñar antes de activar prospección de contacto directo |

## 10. Riesgos legales (L1-L9) — misma metodología del proyecto, sin crear una nueva

| # | Riesgo | Impacto | Probabilidad | Prioridad (`priorizacion.md`) |
|---|---|---|---|---|
| L1 | Sanción AEPD por falta de LIA documentado en `leadfinder` | Alto | Media | Crítica |
| L2 | Sanción AEPD por falta de información a los interesados (Art. 14) | Alto | Media | Crítica |
| L3 | Reclamación por imposibilidad de ejercer derechos sobre datos de prospección | Medio-alto | Baja-media | Alta |
| L4 | Incumplimiento de atribución ODbL (OpenStreetMap) | Medio | Media (ya confirmado que no se cumple) | Alta |
| L5 | Ausencia de DPA confirmado con Stripe | Medio | Baja (Stripe exige aceptación en su flujo estándar, probablemente ya implícita) | Media |
| L6 | Exportación de datos a Anthropic sin base documentada | Medio | Media | Alta |
| L7 | Incumplimiento de bloqueo real de cookies (LSSI-CE) | Medio | No verificado | Media |
| L8 | Falta de aviso legal completo en la web | Bajo-medio | No verificado | Media |
| L9 | Incertidumbre fiscal sobre facturación electrónica (Verifactu/Crea y Crece) | Medio (regulatorio, no de protección de datos) | Requiere asesoría fiscal, no legal de datos | Media |
| L10 | Sin disparador definido para saber cuándo `leadfinder` cruza el umbral de "tratamiento a gran escala" y exige una EIPD (Art. 35 RGPD) | Alto (futuro, si escala) | Baja hoy — depende del volumen | Media (crece con el crecimiento de la empresa) |
| L11 | Activar Motor D sin re-verificar la base legal de los datos de origen (conclusión de la sección 3 depende de que D siga latente) | Alto (si ocurre) | Nula hoy — D sigue latente | Media (gate ausente, no un problema activo) |

**Integración explícita** (no se crea ninguna metodología nueva):
- **FDI** (`fdi-registro.md`): se añade una fila — "Documentar y mantener el cumplimiento legal (LIA, avisos, DPAs)" queda como "Exclusivo del fundador" hasta que exista un proceso escrito; este mismo documento ya es un paso hacia "Totalmente documentado".
- **BCI** (`bci-registro.md`): el riesgo legal no tiene BCI propio porque no es una capacidad/sistema/proceso operativo — se relaciona con el BCI ya asignado a `interemprex-dashboard` (5) y `leadfinder` (3-4), que son los sistemas donde vive la exposición.
- **priorizacion.md**: L1, L2 y L4 se añaden como fila de prioridad crítica/alta; L5, L6, L7, L8, L9 como prioridad media — mismas cinco dimensiones (impacto, esfuerzo, urgencia, dependencia, riesgo de no actuar) que el resto del registro, sin una escala distinta.

## Decisiones tomadas

1. **El marco normativo aplicable se fija en 4 normas principales + 3 relaciones contractuales/de licencia** (sección 1) — ninguna se añade ni se retira sin justificar.
2. **La actividad de prospección (`leadfinder`) se trata como el mayor foco de riesgo legal**, no el CRM ni la web — porque es la única actividad que trata datos de personas que nunca han tenido contacto directo con INTEREMPREX (a diferencia de clientes, que sí han dado su consentimiento contractual).
3. **Se distingue explícitamente "encontrar/puntuar un dato" de "contactar comercialmente"** — son dos momentos legales distintos, con reglas distintas (sección 7), algo que no estaba separado en el análisis preventivo original.
4. **Ninguna casilla de la matriz se marca "cumple" sin evidencia verificada** — por eso hay más "❌" y "⚠️" que "✅"; es el resultado honesto de una primera auditoría real, no un fallo de esta fase.

## Decisiones descartadas

- **Dar por buena la interpretación de "interés legítimo" sin LIA documentado**: descartado — sería exactamente el tipo de "asumir que algo cumple sin justificarlo" que esta fase prohíbe explícitamente.
- **Tratar la licencia ODbL como un simple "hay que citarlos"**: descartado — se diferenció entre obra producida y base de datos derivada porque tiene implicaciones distintas si se activa el Motor D en el futuro.
- **Fusionar los riesgos legales dentro de la numeración R1-R13 de `03-modelo-negocio.md`**: descartado para no tocar un documento cerrado — se creó la numeración L1-L9, cross-referenciada con R9 (el riesgo legal original que abrió esta fase).

## Riesgos detectados

Ver tabla L1-L9 en la sección 10 — es la sección de riesgos de esta fase, no se duplica aquí.

## Dependencias con otras fases

- **Desde `03-modelo-negocio.md` (R9)**: esta fase resuelve en profundidad el riesgo legal que R9 dejó abierto.
- **Desde `auditoria-preventiva-leadfinder.md`**: todos sus hallazgos (fuentes, licencias, almacenamiento, retención, accesos, riesgos) se retoman aquí con la capa legal completa.
- **Desde `05-catalogo-servicios.md`**: la línea Gestión del crecimiento (email marketing) hereda las reglas de LSSI-CE de la sección 7, aunque hoy no sea oferta activa.
- **Desde `capacidades-core.md`**: la capacidad 4 (IA aplicada) hereda el hallazgo de la sección 8.
- **Hacia Fase 6 (Customer Journey)**: el consentimiento y los avisos deben aparecer en los puntos de contacto del recorrido.
- **Hacia Fase 7 (Sistema comercial)**: los contratos deben incorporar las cláusulas de tratamiento de datos que resulten de esta fase.
- **Hacia Fase 10 (IA)**: la revisión legal secundaria de "uso de IA" ya anotada como pendiente en el roadmap se resuelve, en su marco general, aquí — quedará una revisión final cuando la Fase 10 defina el alcance completo de IA en la oferta.
- **Hacia Fase 13 (Página web)**: implementación real de aviso legal, atribución OSM, y verificación del bloqueo de cookies.

## Tareas futuras

- Documentar el LIA formal de `leadfinder` (L1).
- Redactar y publicar el aviso de privacidad de la actividad de prospección (L2).
- Definir con el usuario el plazo de conservación de leads (dato pendiente, no se inventa).
- Añadir la atribución a OpenStreetMap en la web y/o el dashboard (L4).
- Confirmar la aceptación del DPA de Stripe y de los términos de Anthropic (L5, L6).
- Verificar técnicamente el bloqueo real de cookies no esenciales (L7).
- Completar/verificar el aviso legal de la web (L8).
- Consultar con una asesoría fiscal la situación de facturación electrónica (L9) — fuera del alcance de este documento.
- Ejecutar un escaneo real de licencias de dependencias de software.

## Auditoría crítica

- **Contradicciones con documentación previa**: ninguna — esta fase amplía R9 y los hallazgos de `auditoria-preventiva-leadfinder.md`, no los contradice.
- **Duplicidades**: ninguna nueva — se referencian R6 y la credencial de `leadfinder` en la matriz sin duplicar su registro ya existente en `priorizacion.md`.
- **Deuda operativa**: alta en esta fase — 9 de 15 filas de la matriz están en ❌ o ⚠️. Es el resultado esperado de una primera auditoría real, no un error de construcción.
- **FDI**: el propio proceso de mantener el cumplimiento legal se registra como "Exclusivo del fundador" hasta que exista un procedimiento escrito de revisión periódica — se declara honestamente en vez de omitirse.
- **Coherencia con la constitución**: verificada — el principio de "no inventar datos" se aplicó también al terreno legal (marcar ⚠️/❌ en vez de asumir cumplimiento), y el principio de compliance "no es opcional ni para más adelante" (`02-principios-fundacionales.md`, punto 4) es la razón de ser de esta fase completa.

## Auditoría adversarial (Modo Optimización Total, 2026-07-03)

Aplicando el mandato de intentar refutar esta fase en vez de confirmarla, se encontraron tres fallos reales que sobrevivieron a la redacción original — ninguno invalida el documento, pero lo dejarían incompleto ante una revisión externa real:

1. **Falta la Evaluación de Impacto en Protección de Datos (EIPD/DPIA, RGPD Art. 35)** — prueba de escalabilidad a 10.000 clientes. La recomendación de "documentar un LIA" (sección 2) es proporcional al volumen de hoy (unas decenas de leads por ejecución), pero el RGPD exige una EIPD cuando el tratamiento es "a gran escala" y sistemático. Si `leadfinder` escala con la empresa, cruzar ese umbral es cuestión de volumen, no de intención, y hoy no hay ningún disparador definido para saber cuándo ocurre. **Se añade como L10** en la sección 10, con la misma metodología que L1-L9.
2. **Motor D no tiene una puerta de re-verificación legal.** La conclusión de la sección 3 (el uso de datos de OSM es "obra producida", no "base de datos derivada") depende de que INTEREMPREX no redistribuya la base de leads como producto. `04-arquitectura-oferta.md` (decisión 3, ya cerrada) define cuándo se activa Motor D — uso interno demostrado + capacidad operativa — pero esa condición **no incluye** revisar si la conclusión legal de esta sección sigue siendo válida en el nuevo escenario. Es una dependencia oculta entre dos documentos cerrados que nunca se habían cruzado. No se modifica `04-arquitectura-oferta.md` (evidencia insuficiente para cambiar una decisión ya aprobada, solo para señalar un hueco) — se añade **L11**: "activar Motor D sin re-verificar la base legal de los datos de origen".
3. **Riesgo de terminología en `03-modelo-negocio.md`**: la fila de R9 dice "Resuelto: se crea una fase propia". Un lector futuro (incluido el propio fundador dentro de meses) podría leer "Resuelto" como "ya está arreglado", cuando esta fase demuestra lo contrario — R9 pasó de 1 riesgo a 11 (L1-L11), la mayoría sin corregir. No se reescribe `03-modelo-negocio.md` (es una fase cerrada y el cambio es cosmético, no sustantivo) — se deja constancia aquí de que "resuelto" se refería a la asignación de una fase, no al estado del riesgo.

**Contrapeso obligatorio aplicado**: esta auditoría no generó ningún documento ni marco nuevo — las tres correcciones caben como filas nuevas en registros ya existentes (`priorizacion.md`, esta misma sección). Crear un archivo aparte para tres hallazgos habría sido exactamente el tipo de "documentación por documentación" que el propio Modo Optimización Total prohíbe.

## Preguntas que necesitan aprobación

1. ¿Apruebas el marco de tres etiquetas (HECHO / HIPÓTESIS / RECOMENDACIÓN) y el aviso de alcance como estándar permanente para cualquier análisis legal futuro del proyecto?
2. ¿Autorizas iniciar la corrección de los elementos de prioridad crítica (L1 LIA, L2 aviso de privacidad, L4 atribución OSM) como documentación, antes de contratar revisión legal profesional, o prefieres esperar a esa revisión profesional antes de redactar nada?
3. ¿Quieres fijar ya el plazo de conservación de leads (tarea pendiente), o lo dejamos abierto hasta tener el LIA completo?
4. Sobre L9 (facturación electrónica): ¿lo tratamos como fuera de alcance de este proyecto de estrategia (asunto de asesoría fiscal externa), o lo mantenemos registrado aquí como recordatorio?

---

**Qué modifica**: crea el marco legal y de cumplimiento completo de INTEREMPREX — normativa aplicable, análisis por sistema, matriz de cumplimiento y registro de riesgos legales (L1-L9), integrado con FDI/BCI/priorización sin metodología nueva.

**Qué documentos dependen de este**: Fase 6 (Customer Journey), Fase 7 (Sistema comercial), Fase 10 (IA, revisión secundaria) y Fase 13 (Página web) heredan directamente sus hallazgos y tareas pendientes.

**Qué documentos deben revisarse si este cambia**: `03-modelo-negocio.md` (R9), `auditoria-preventiva-leadfinder.md`, `priorizacion.md`, `fdi-registro.md`, `bci-registro.md` y `capacidades-core.md` (capacidad 4).
