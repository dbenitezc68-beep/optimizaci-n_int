# 07 — Customer Journey (v1 operativa)

Estado: **v1, operativa, lista para el primer cliente real.** Construido según `00-metodologia.md`, validado contra `01-posicionamiento.md`, `03-modelo-negocio.md`, `04-arquitectura-oferta.md`, `05-catalogo-servicios.md`, `06-legal-cumplimiento.md`, `capacidades-core.md`, `flywheel-comercial.md`, `contrato-minimo-venta.md`, `production-readiness-review.md`, `fdi-registro.md`, `bci-registro.md` y el modelo de datos real de `interemprex-dashboard`. No es el Customer Journey perfecto — es el mínimo profesional y ejecutable con lo que existe hoy. Construido con un workflow de 16 agentes (5 de redacción, 4 de integración documental, 7 de auditoría adversarial), sintetizado y editado a mano después.

## Resumen ejecutivo

INTEREMPREX tiene hoy un único canal de captación probado de punta a punta: **referido/contacto directo** — el que trajo a los dos clientes piloto reales (`bbabogados`, en producción; `costafloragardens`, construido sin desplegar). El canal `leadfinder` genera inventario técnico automáticamente, pero está bloqueado para contacto comercial mientras L1 (sin LIA), L2 (sin aviso de prospección) y L4 (sin atribución OSM) sigan sin resolver — el Production Readiness Review ya lo trata como restricción condicional, no como bloqueo general.

Las 16 etapas pedidas están todas documentadas con sus 11 campos, más validación explícita de ejecutabilidad y análisis de escala. Hallazgo estructural principal: **las 16 etapas, sin excepción, tienen FDI = "Exclusivo del fundador"** — no hay ni una sola etapa con una vía alternativa de ejecución si el fundador no está disponible. Esto no es un fallo de diseño de esta fase: es el estado real de una empresa de una sola persona, documentado con honestidad en vez de maquillado. Un solo hallazgo de la auditoría adversarial matiza esto: al menos 6 etapas (Primer contacto, Contrato, Pago, Inicio del proyecto, Validación, Soporte) conflacionan "juicio exclusivo del fundador" con "no hay segundo usuario en el CRM" — son cosas distintas, y la segunda es una decisión de coste bajo evaluable ya, no una propiedad inmutable de la tarea.

El contrato (`contrato-minimo-venta.md`) está listo como plantilla, pero **la firma real de un contrato vinculante está bloqueada hoy** por 2 campos en blanco que dependen enteramente del fundador: identificación fiscal de INTEREMPREX (razón social/NIF/domicilio, L8) y duración mínima del empaquetado obligatorio de Motor B. Ninguno de los dos es trabajo de Fase 7 — son horas de decisión del fundador, sin fecha límite autoimpuesta hasta ahora. Dado que la tarifa de lanzamiento cierra el 2026-09-30 (o al tercer cliente, lo que ocurra antes) y hoy ya hay 2 pilotos, esta es la pieza más urgente de todo el documento.

## Decisiones tomadas

### 1. El recorrido completo, etapa a etapa

Convención de lectura: cada etapa lista qué existe hoy (herramienta/automatización real) frente a qué falta y es explícitamente trabajo de Fase 7 (Sistema comercial) o posterior — esta fase diseña el mapa y valida si es ejecutable mañana, no construye plantillas, sistemas de tickets ni automatizaciones nuevas.

---

#### Etapa 1 — Descubrimiento

**Objetivo**: identificar un lead real (nombre, negocio, canal de origen) listo para pasar a Primer contacto.
**Responsable / FDI**: el fundador — **Exclusivo del fundador**. El único canal probado (referido) es la red de contactos personal del fundador, no un procedimiento replicable; no hay material de formación posible. Excepción real: la detección técnica de `leadfinder` (Overpass API + APScheduler) SÍ está automatizada (FDI 0, ya registrado), pero esa detección no produce un lead activable comercialmente por el bloqueo legal vigente.
**BCI**: 4 — sin descubrimiento, el flywheel entero pierde su punto de entrada; a diferencia de etapas intermedias, un referido que no llega simplemente no ocurre, no hay backlog que recuperar después.
**Entradas**: ninguna (es el arranque). Insumos: red de contactos del fundador + inventario automático de `leadfinder` (no activable comercialmente hoy).
**Salidas**: lead identificado con nombre/negocio/canal, aún sin registrar en el CRM. → Etapa 2.
**Herramientas**: canal referido — ninguna, conversación directa; canal `leadfinder` — FastAPI+SQLAlchemy+APScheduler+Overpass API, desconectado del CRM (silo confirmado).
**Documentos**: ninguno formal.
**Automatizaciones existentes**: generación y puntuación de leads de `leadfinder`, ya automatizada, sin intervención manual.
**Automatizaciones futuras** (Fase 9, no construidas aquí): sincronización automática `leadfinder`→CRM; alertas de leads de alta puntuación.
**Riesgos**: dependencia total del canal referido, sin plan de contingencia; riesgo de confundir el inventario de `leadfinder` con pipeline real cuando hoy el 0% de ese inventario es contactable legalmente.
**KPIs**: nº de leads por canal (sin dato histórico — cualquier cifra sería inventada).
**Puntos de decisión**: ¿el lead merece pasar a contacto? Si viene de `leadfinder`, ¿está legalmente permitido contactarlo ya (L1/L2/L4)?
**¿Ejecutable mañana?** SÍ, para el canal referido — es exactamente cómo se consiguieron los 2 pilotos reales.
**Diseño 1-10 clientes**: el canal referido basta; no tiene sentido invertir en integrar `leadfinder` mientras el bloqueo legal siga abierto.
**Cambios a 100-1.000 clientes** (solo identificado): resolver L1/L2/L4, conectar `leadfinder`↔CRM, sistematizar la petición de referidos — todo trabajo de Fases 7 y 9.

---

#### Etapa 2 — Primer contacto

**Objetivo**: establecer contacto real y registrar el `Lead` en el CRM (`stage=NEW` → `CONTACTED`).
**Responsable / FDI**: el fundador — **Exclusivo del fundador** para el contacto en sí (sin guion documentado). El registro administrativo en el CRM es técnicamente simple, pero hoy solo lo puede ejecutar el fundador porque es el único usuario admin (`admin@interemprex.com`) — es un componente **delegable con formación si se creara un segundo usuario con permisos limitados**, no genuinamente exclusivo; sin dato de si la autenticación JWT+bcrypt actual soporta eso sin cambios.
**BCI**: 3 — recuperable (un lead frío puede contactarse más tarde), pero es el paso que activa todo lo demás.
**Entradas**: lead de la Etapa 1, sin registrar. **Salidas**: `Lead` creado, `stage=CONTACTED` tras el primer contacto exitoso. → Etapa 3.
**Herramientas**: CRM (`interemprex-dashboard`) para el registro; email/teléfono/WhatsApp para el contacto (canal exacto: sin dato).
**Documentos**: ninguno — no existe guion de primer contacto.
**Automatizaciones existentes**: ninguna en el contacto; el registro queda protegido por el backup diario automático del CRM.
**Automatizaciones futuras** (Fase 7): plantilla de mensaje, secuencia de seguimiento.
**Riesgos**: **bloqueante y legal** — si el lead viene de `leadfinder`, el PRR prohíbe el contacto comercial mientras L1/L2/L4 sigan abiertos; hoy eso restringe el contacto comercial al canal referido en la práctica.
**KPIs**: tiempo detección→contacto, tasa de respuesta (sin dato histórico).
**Puntos de decisión**: ¿canal de contacto? ¿el lead viene de referido (permitido) o de `leadfinder` (bloqueado)?
**¿Ejecutable mañana?** SÍ para referido/contacto directo; NO legalmente para `leadfinder` mientras L1/L2/L4 sigan abiertos — restricción externa a esta fase, ya documentada en el PRR.
**Diseño 1-10 clientes**: registro manual + contacto directo, sin guion — no sobre-optimizar un proceso con solo 2 precedentes.
**Cambios a 100-1.000 clientes**: resolver L1/L2/L4 para activar `leadfinder` como canal legal; documentar un guion para poder delegar.

---

#### Etapa 3 — Cualificación

**Objetivo**: aplicar los 3 criterios de aceptación/rechazo de `01-posicionamiento.md` y decidir si el lead avanza a Diagnóstico o se descarta.
**Responsable / FDI**: el fundador — **Exclusivo del fundador**. Los 3 criterios SÍ están documentados y cerrados (paso real hacia "Delegable con formación"), pero nadie más los ha aplicado nunca — falta la formación, no el criterio.
**BCI**: 3 — el riesgo no es perder el lead, es aceptar uno mal ajustado que avance hasta Propuesta antes de detectarse el desajuste.
**Entradas**: `Lead.stage=CONTACTED` de la Etapa 2. **Salidas**: lead cualificado (permanece `CONTACTED`, avanza a Etapa 4) o descartado (`Lead.stage=LOST`, con motivo en `notes`).
**Herramientas**: CRM (consultar/actualizar `notes` y `stage`); conversación directa. **Documentos**: `01-posicionamiento.md` — criterios: (1) busca "lo más barato" y no da acceso real a sus sistemas, (2) encargo único sin intención de continuidad, (3) exige resultados de marketing garantizados en plazo irreal.
**Automatizaciones existentes**: ninguna — juicio humano puro, distinto del scoring técnico de `leadfinder`.
**Automatizaciones futuras** (Fase 7): checklist estructurado en el CRM.
**Riesgos**: sin checklist, la aplicación depende del criterio subjetivo del fundador en cada conversación; riesgo de aceptar leads marginales por presión de cupo (tope de 3 en tarifa de lanzamiento).
**KPIs**: ratio cualificación/rechazo (sin dato — los 2 pilotos se aceptaron sin necesidad de rechazar a nadie).
**Puntos de decisión**: los 3 criterios, aplicados explícitamente.
**¿Ejecutable mañana?** SÍ — el fundador puede aplicar los criterios ya cerrados y actualizar `Lead.stage=LOST` manualmente.
**Diseño 1-10 clientes**: aplicar de memoria durante la conversación es más rápido y suficiente que un checklist formal con este volumen. *(Nota de la auditoría adversarial: en la práctica, con 1-10 clientes, esta etapa y la Etapa 4 ocurren casi siempre en la misma conversación — se mantienen separadas en la numeración por fidelidad a la estructura pedida, ver "Decisiones descartadas".)*
**Cambios a 100-1.000 clientes**: checklist trazable con campo dedicado en el CRM (hoy `notes` es texto libre); documentar y formar a un segundo criterio para delegar.
**Práctica añadida por la auditoría adversarial (retorno alto, coste ≈0)**: cuando el resultado es `LOST`, enviar un mensaje breve de cierre al lead (email/WhatsApp) antes de registrar el descarte. El único canal probado es el referido — ignorar a un lead descartado sin respuesta daña la relación con quien lo refirió, justo el bucle que alimenta "Nuevas oportunidades" del flywheel (Etapa 16).

---

#### Etapa 4 — Diagnóstico

**Objetivo**: traducir el problema del lead cualificado en un nivel de catálogo concreto — Motor A Nivel 1 (Landing) o Nivel 2 (Web corporativa/Tienda estándar) + línea Operación técnica de Motor B correspondiente.
**Responsable / FDI**: el fundador — **Exclusivo del fundador**. No existe cuestionario ni checklist; hereda la misma dependencia que "Cierre de ventas / conversión de Motor A a Motor B" (FDI=3, ya registrado en `fdi-registro.md`), del que el Diagnóstico es el primer eslabón.
**BCI**: 4 — si se detiene, ningún lead cualificado avanza a Propuesta; no llega a 5 porque no afecta a clientes ya activos (Stripe sigue cobrando Motor B en curso sin depender de esta etapa).
**Entradas**: `Lead.stage=CONTACTED` ya cualificado. **Salidas**: problema identificado + nivel recomendado (Motor A Nivel 1/2 + Motor B Operación técnica Básico/Intermedio/Avanzado, 38/79/128€/mes), anotado en `notes` a falta de un campo estructurado.
**Herramientas**: conversación directa; consulta manual de `05-catalogo-servicios.md` y `capacidades-core.md`.
**Documentos**: `05-catalogo-servicios.md`, `capacidades-core.md`, `01-posicionamiento.md` (por si aparecen señales de rechazo nuevas).
**Automatizaciones existentes**: ninguna. **Automatizaciones futuras** (Fase 7/9): cuestionario estandarizado ligado al catálogo.
**Riesgos**: (1) el Diagnóstico no tiene precio fijado todavía (`03-modelo-negocio.md` lo deja explícito) — **comunicar antes de la llamada si tiene coste o no**, práctica añadida por la auditoría adversarial (mala experiencia de cliente, retorno medio, coste ≈0); (2) riesgo de sobreventa — **el PRR prohíbe ofrecer Motor C y *toda* la línea Motor B Gestión del crecimiento en esta primera etapa comercial, incluido el Nivel 1 de Mantenimiento SEO técnico, aunque el catálogo lo marque como vendible por capacidad Core** *(corrección aplicada tras la auditoría de integración: el borrador inicial acotaba esta prohibición solo a "Niveles 2-3", dejando implícitamente abierto el Nivel 1 — el PRR no distingue niveles dentro de esa línea)*; (3) reconfirmar que un lead de `leadfinder` no ha sido contactado comercialmente si L1/L2/L4 siguen abiertos; (4) dependencia total del fundador.
**KPIs**: sin dato — candidatos: tiempo cualificación→diagnóstico, distribución Nivel 1 vs Nivel 2.
**Puntos de decisión**: ¿Nivel 1 o Nivel 2? ¿qué nivel de Operación técnica? ¿sigue cualificado el lead al profundizar?
**¿Ejecutable mañana?** SÍ — conversación + conocimiento del catálogo, sin herramienta nueva. Que el precio del Diagnóstico no esté fijado no bloquea avanzar el lead.
**Diseño 1-10 clientes**: conversación directa, sin checklist formal, anotado en `notes`.
**Cambios a 100-1.000 clientes**: fijar precio/política de Diagnóstico; checklist estandarizado; campo estructurado en el CRM.

---

#### Etapa 5 — Propuesta

**Objetivo**: comunicar alcance, precio real y la cláusula de empaquetado obligatorio de Motor B.
**Responsable / FDI**: el fundador — **Exclusivo del fundador**. `flywheel-comercial.md` lo dice sin ambigüedad: "Propuesta: NO existe hoy ningún proceso ni plantilla formal — pendiente de Fase 7". Esta fase describe el mínimo manual, no finge que existe un sistema.
**BCI**: 4 — corta el embudo justo antes de la negociación; aquí se pone por escrito, por primera vez, el precio y la cláusula de empaquetado.
**Entradas**: nivel recomendado de la Etapa 4. **Salidas**: propuesta enviada; `Lead.stage=PROPOSAL`; `Lead.valueCents` registrado.
**Herramientas**: CRM (actualizar `stage`/`valueCents`); email o WhatsApp (sin dato de canal fijo); `05-catalogo-servicios.md` para precios exactos; `contrato-minimo-venta.md` como referencia del lenguaje de empaquetado.
**Documentos**: `05-catalogo-servicios.md`, `04-arquitectura-oferta.md` (empaquetado obligatorio, no negociable), `contrato-minimo-venta.md` (para anticipar honestamente que 2 campos siguen en blanco).
**Automatizaciones existentes**: ninguna. **Automatizaciones futuras** (Fase 7): plantilla formal, posible generación semi-automática desde el CRM.
**Riesgos**: (1) sin plantilla, inconsistencia entre propuestas; (2) **riesgo crítico añadido por la auditoría adversarial (retorno alto)**: la propuesta puede comunicar la duración de empaquetado de Motor B "como condición a concretar en el contrato" — un cliente puede llegar a aceptar (Etapa 6) sin conocer un término central de su obligación recurrente, y ese número solo aparece por primera vez en el contrato (Etapa 7). **Corrección: fijar la duración mínima de Motor B como decisión interna del fundador antes de enviar la próxima propuesta real, y comunicarla ya en esta etapa** — no esperar a la firma para introducir un término nuevo; (3) igual que en la Etapa 4, la exclusión de Motor C y *toda* la línea Gestión del crecimiento (incluido Nivel 1) debe quedar fuera de la propuesta; (4) sin plazo de validez definido; (5) dependencia total del fundador.
**KPIs**: sin dato — candidatos: tiempo diagnóstico→propuesta, % que avanza a Negociación.
**Puntos de decisión**: precio exacto, nivel de Motor B empaquetado, duración de empaquetado (antes en blanco, ver corrección arriba), forma de pago, canal de envío.
**¿Ejecutable mañana?** SÍ — redactar y enviar a mano con precios reales, sin plantilla nueva, es el mínimo operativo que exige esta fase.
**Diseño 1-10 clientes**: propuesta a mano, formalidad suficiente para el volumen actual.
**Cambios a 100-1.000 clientes**: plantilla formal, duración de empaquetado documentada como regla (no caso a caso), generación semi-automática.
**Práctica añadida por la auditoría adversarial (mala experiencia de cliente, retorno medio)**: comunicar un rango orientativo de plazo de entrega, calificado explícitamente como estimación no vinculante — no dejar al cliente sin ninguna referencia temporal.

---

#### Etapa 6 — Negociación

**Objetivo**: llegar a un acuerdo verbal/informal sobre alcance y precio a partir de la propuesta.
**Responsable / FDI**: el fundador — **Exclusivo del fundador**, coincide exactamente con "Cierre de ventas / conversión de Motor A a Motor B" ya registrado en `fdi-registro.md` (FDI=3).
**BCI**: 4 — coincide con el mismo proceso registrado (BCI=4).
**Entradas**: `Lead.stage=PROPOSAL`. **Salidas**: acuerdo sobre alcance y precio; `Lead.stage=NEGOTIATION`. **La transición a `WON` NO ocurre en esta etapa** *(corrección aplicada tras la auditoría: el borrador inicial declaraba `WON` tanto aquí como en la Etapa 7, contradiciendo el contrato de handoffs — se fija un único punto de transición, coherente con la máxima exigencia legal pedida para esta fase: el cierre formal es la firma, no la aceptación verbal)*. → Etapa 7 con `Lead.stage=NEGOTIATION`.
**Herramientas**: conversación directa; CRM para actualizar `stage`. **Documentos**: `05-catalogo-servicios.md` (límite de precios — sin política de descuentos documentada, no se inventa una), `04-arquitectura-oferta.md` (empaquetado no negociable), `01-posicionamiento.md`.
**Automatizaciones existentes**: ninguna. **Automatizaciones futuras** (Fase 7): guion de objeciones, política de descuentos.
**Riesgos**: (1) dependencia total del fundador, sin backup; (2) riesgo de ceder en la regla de empaquetado obligatorio bajo presión — no es negociable; (3) negociar sin política de descuentos documentada, generando condiciones desiguales entre los pocos clientes de tarifa de lanzamiento; (4) señales de rechazo tardías deben cerrar como `LOST`, no forzarse a `WON`; (5) el acuerdo verbal debe trasladarse con precisión al contrato de la Etapa 7.
**KPIs**: tasa `PROPOSAL`→cierre (sin dato). Un KPI de "motivo de pérdida" no es hoy estructurable — el modelo `Lead` no tiene campo dedicado, conecta con el tramo más débil del flywheel ("Aprendizaje interno").
**Puntos de decisión**: ¿se acepta tal cual o se ajusta? ¿el ajuste rompe el empaquetado obligatorio? ¿aparecen señales de rechazo? ¿entra en el cupo de tarifa de lanzamiento vigente?
**¿Ejecutable mañana?** SÍ — ya se ejecuta hoy, es el proceso ya registrado en FDI/BCI.
**Diseño 1-10 clientes**: conversación directa, sin política de descuentos escrita, decisión caso a caso.
**Cambios a 100-1.000 clientes**: política de descuentos documentada, guion de objeciones, campo estructurado de "motivo de pérdida" para alimentar por fin "Aprendizaje interno".

---

#### Etapa 7 — Contrato

**Objetivo**: formalizar por escrito mediante `contrato-minimo-venta.md`, firmado por ambas partes, antes de solicitar cualquier pago.
**Responsable / FDI**: el fundador en solitario — **Exclusivo del fundador**. No hay plantilla auto-rellenable ni firma electrónica integrada; único usuario admin del CRM.
**BCI**: **5** — el máximo del documento. Sin contrato firmado no hay base legal para cobrar, no queda fijada la cláusula de empaquetado (el núcleo del modelo de ingresos), y es la etapa más difícil de revertir de todo el recorrido.
**Entradas**: `Lead.stage=NEGOTIATION` con acuerdo alcanzado (Etapa 6); datos del cliente; nivel acordado. **Salidas**: `contrato-minimo-venta.md` firmado; **aquí, y solo aquí, `Lead.stage` pasa a `WON`**, y el Lead se convierte en `Client` (`convertedClientId`).
**Herramientas**: `contrato-minimo-venta.md`, email, firma manual/escaneada o PDF (sin firma electrónica integrada confirmada), CRM para la conversión Lead→Client.
**Documentos**: `contrato-minimo-venta.md` (10 secciones), política de privacidad publicada (referenciada honestamente en la sección 6 del contrato).
**Automatizaciones existentes**: ninguna. **Automatizaciones futuras** (Fase 7): generación semi-automática del contrato, firma electrónica integrada.
**Riesgos**: **los 2 campos en blanco de la plantilla bloquean una firma real y completa**: (1) razón social/NIF/domicilio de INTEREMPREX, no confirmado en ningún documento del proyecto (L8) — sin esto no se puede identificar legalmente a una de las partes; (2) duración mínima de Motor B, decisión de negocio pendiente del fundador — sin este número, la cláusula central del modelo de ingresos queda incompleta. Firmar hoy con estos campos en blanco expondría a INTEREMPREX a un contrato con sus cláusulas más críticas incompletas. Riesgos menores: DPA con Stripe no confirmado (L5); aviso legal completo de la web no confirmado (L8).
**KPIs**: sin dato — candidatos: tiempo negociación→firma, % de negociaciones que llegan a contrato firmado.
**Puntos de decisión**: forma de pago concreta (sección 3, en blanco); si se procede a firmar pese a campos pendientes (no recomendado); reconfirmar criterios de aceptación.
**¿Ejecutable mañana?** **NO**, con precisión: la *plantilla* sí está lista hoy. La *firma real* está bloqueada por 2 campos en blanco que dependen enteramente del fundador — no es trabajo de Fase 7, son horas de decisión pendientes.
**Hallazgo de la auditoría adversarial (cuellos de botella, retorno alto)**: ningún punto de este documento fija una fecha límite para resolver estos 2 campos. La tarifa de lanzamiento cierra el 2026-09-30 (o al 3er cliente) — con 2 pilotos ya existentes, si un tercer lead llega a acuerdo antes de que el fundador resuelva esto, el negocio no puede firmar, cobrar, ni activar Motor B. **Recomendación aplicada: resolver ambos campos antes de que el siguiente lead llegue a Negociación, no después** — ver "Preguntas que necesitan aprobación".
**Diseño 1-10 clientes**: proceso manual, una vez resueltos los 2 campos — el fundador adapta la plantilla, envía, gestiona la firma, actualiza el CRM a mano; revisión individual por cliente es apropiada a este volumen.
**Cambios a 100-1.000 clientes**: firma electrónica con validez legal integrada al CRM, generación automática del contrato, repositorio centralizado de contratos vinculado a `Client.id`.

---

#### Etapa 8 — Pago

**Objetivo**: cobrar el pago inicial vía Stripe y habilitar el arranque del proyecto.
**Responsable / FDI**: el fundador genera y gestiona el cobro — **Exclusivo del fundador** para ese sub-paso; **la confirmación y sincronización del pago ya está automatizada** (webhooks de Stripe, FDI=0, verificado en el PRR) — es un componente genuinamente automatizado, no solo delegable.
**BCI**: **5** — toca dinero real, difícil de revertir (reembolsos, contracargos); coincide con el BCI de la capacidad Core de pagos.
**Entradas**: `contrato-minimo-venta.md` firmado, sección 3 ya acordada; `Client` creado. **Salidas**: `Payment`/`PaymentLink` = `PAID`; `Project` creado con `status=PLANNED` y `budgetCents`.
**Herramientas**: Stripe (Payment Links/Checkout), CRM (`Payment`, `PaymentLink`, `Invoice`, `Client.stripeCustomerId`), webhook ya configurado.
**Documentos**: contrato firmado, sección 3, como única referencia de monto y condiciones.
**Automatizaciones existentes**: sincronización de pagos/MRR vía webhook, ya automatizada y verificada.
**Automatizaciones futuras** (Fase 7/9): generación automática del `PaymentLink` desde el contrato; creación automática del `Project` al confirmarse `PAID`.
**Riesgos**: DPA con Stripe no confirmado formalmente (L5, riesgo bajo); facturación electrónica (Verifactu/Crea y Crece, L9) sin resolver, fuera de alcance de esta fase; sin proceso documentado ante un `PaymentStatus=FAILED`.
**KPIs**: tiempo contrato→pago confirmado; % `PaymentLinks` completados; MRR acumulado (arranca en la Etapa 12).
**Puntos de decisión**: ¿pago inicial completo o parcial antes de crear el `Project`? ¿acción ante un `FAILED`?
**¿Ejecutable mañana?** SÍ, plenamente — Stripe y los modelos ya están implementados, probados y verificados. La única condición es que la Etapa 7 esté resuelta, lo cual es un bloqueo de esa etapa, no de esta.
**Diseño 1-10 clientes**: `PaymentLink` a mano, sincronización automática vía webhook; suficiente a este volumen.
**Cambios a 100-1.000 clientes**: automatizar generación del `PaymentLink` desde el contrato firmado; disparar la creación del `Project` sobre el webhook ya existente; resolver facturación electrónica formal (L9, ya no puede quedar pendiente a esa escala).

---

#### Etapa 9 — Inicio del proyecto

**Objetivo**: confirmar el alcance con el cliente, hacer kickoff, y pasar `Project.status` de `PLANNED` a `IN_PROGRESS` con las primeras `Task` creadas.
**Responsable / FDI**: el fundador — **Exclusivo del fundador**. Coincide con "Ejecución de un proyecto tipo de implementación" ya registrado (FDI=3), del cual esta etapa es la puerta de entrada. El registro administrativo (crear `Task`, cambiar `status`) es, igual que en la Etapa 2, un componente **potencialmente delegable con un segundo usuario CRM**, no genuinamente exclusivo.
**BCI**: 3 — coincide con el proceso registrado; recuperable reprogramando el kickoff, sin daño irreversible, a diferencia de Contrato o Pago.
**Entradas**: `Project.status=PLANNED` (Etapa 8); contrato firmado como referencia del alcance. **Salidas**: alcance confirmado; `Project.status=IN_PROGRESS`; primeras `Task` creadas (`TODO`, asignadas).
**Herramientas**: CRM (`Project`, `Task`); email/WhatsApp para el kickoff.
**Documentos**: contrato firmado, sección 2 (Objeto y alcance).
**Automatizaciones existentes**: ninguna. **Automatizaciones futuras** (Fase 7/9): plantillas de `Task` predefinidas por nivel de catálogo.
**Riesgos**: no existe un desglose documentado de qué `Task` mínimas corresponden a cada nivel — variabilidad entre proyectos similares; sin checklist formal de kickoff; riesgo de desalineación de expectativas si el alcance no se confirma explícitamente por escrito.
**KPIs**: tiempo pago→kickoff, % `Task` a tiempo.
**Puntos de decisión**: desglose de `Task` según el nivel contratado (**Motor A Nivel 1 o Nivel 2 únicamente** — el Nivel 3 queda excluido en esta primera etapa comercial por la restricción del PRR, igual que en las Etapas 4, 5 y 7 *(corrección aplicada: el borrador inicial listaba el Nivel 3 como opción vigente aquí, contradiciendo las etapas anteriores)*); ¿reunión formal o confirmación por email/WhatsApp?
**¿Ejecutable mañana?** SÍ — los modelos `Project`/`Task` ya existen y funcionan.
**Diseño 1-10 clientes**: manual y suficiente; la variabilidad caso a caso es manejable y hasta deseable para aprender qué `Task` son realmente necesarias antes de estandarizar.
**Cambios a 100-1.000 clientes**: plantillas de `Task` versionadas por nivel; checklist de kickoff; automatizar la creación del `Project`/`Task` al confirmarse el pago.
**Nota de precisión (auditoría adversarial, retorno bajo, corrección editorial aplicada)**: esta etapa antecede al tramo de mayor riesgo de fuga del ciclo de vida económico (Mes 1-2, que corresponde a la Etapa 12, no a esta) — un retraso aquí acorta el margen antes de ese punto crítico, pero no es en sí mismo el tramo de mayor riesgo.

---

#### Etapa 10 — Ejecución

**Objetivo**: construir el entregable contratado — **Landing Nivel 1 o Web corporativa/Tienda estándar Nivel 2** de Motor A *(el Nivel 3 queda fuera de esta primera etapa comercial, corrección aplicada por la misma razón que en la Etapa 9)* — replicando el patrón ya usado de facto en `bbabogados` y `costafloragardens`.
**Responsable / FDI**: el fundador en solitario — **Exclusivo del fundador**, coincide con "Ejecución de un proyecto tipo de implementación" (FDI=3) ya registrado. Capacidad Core 1 (Desarrollo web a medida) es la única que sostiene esta etapa.
**BCI**: 3 — coincide con el proceso registrado; si se detiene, el proyecto no avanza y retrasa en cascada el arranque de Motor B, pero no compromete infraestructura compartida (CRM, pagos, que tienen BCI 5).
**Entradas**: `Project.status=IN_PROGRESS`, alcance confirmado, `Task` creadas. **Salidas**: `Task` en `DONE`, entregable construido — **"construido" no implica "publicado"**, distinción real (`costafloragardens` está construido, sin desplegar).
**Herramientas**: CRM (`Project`/`Task`) para trackear; stack de desarrollo del fundador (sin dato de un stack estandarizado documentado como norma).
**Documentos**: ninguno nuevo — ejecuta sobre lo ya acordado en el contrato y el kickoff.
**Automatizaciones existentes**: ninguna sobre la construcción en sí. **Automatizaciones futuras**: fuera de alcance de esta fase — checklists o componentes reutilizables por nivel, sin decisión tomada.
**Riesgos**: dependencia total del fundador — sin forma de paralelizar si hay más de un proyecto simultáneo; sin especificación técnica escrita, el alcance verbal puede interpretarse distinto durante la construcción; solo 2 precedentes reales, sin base para prometer plazos fijos.
**KPIs**: sin KPI formalizado — aproximación disponible pero no oficial: % `Task DONE`.
**Puntos de decisión**: cambios de alcance durante la construcción — criterio manual del fundador, sin control de cambios documentado.
**¿Ejecutable mañana?** SÍ — ya ejecutado dos veces de forma real, sin herramienta nueva necesaria.
**Diseño 1-10 clientes**: ejecución en serie apoyada en `Task` del CRM; viable mientras los kickoffs no se solapen masivamente.
**Cambios a 100-1.000 clientes**: especificación técnica y checklist por nivel escritos; posible incorporación de un equipo — decisión estratégica no contemplada hoy en ningún documento, fuera de alcance de esta fase.

---

#### Etapa 11 — Entrega

**Objetivo**: publicar/desplegar el entregable y cerrar `Project.status=COMPLETED`.
**Responsable / FDI**: el fundador en solitario — **Exclusivo del fundador**, mismo patrón que la Etapa 10; sin evidencia de pipeline CI/CD ni proceso de despliegue delegable.
**BCI**: 3 — mismo nivel que el proceso agregado de ejecución; el impacto es sobre ese proyecto concreto, no sobre infraestructura compartida.
**Entradas**: `Task` en `DONE` (Etapa 10). **Salidas**: entregable publicado; `Project.status=COMPLETED`.
**Herramientas**: plataforma de despliegue (Vercel, según el precedente confirmado de `bbabogados`); CRM para actualizar `status`.
**Documentos**: ninguno formal — no existe checklist de despliegue ni acta de entrega.
**Automatizaciones existentes**: ninguna. **Automatizaciones futuras**: fuera de alcance — pipeline estandarizado, sin decisión tomada.
**Riesgos**: **ya hay evidencia real de bloqueo** — `costafloragardens` sigue "construido, sin desplegar". Sin checklist ni fecha límite ligada al contrato, esta etapa puede quedar abierta indefinidamente sin que nadie la marque como incumplida.
**KPIs**: sin KPI oficial — tiempo entre última `Task DONE` y `COMPLETED`, señalado como métrica futura.
**Puntos de decisión**: cuándo el entregable está "listo para publicar" (sin *definition of done* formal); si requiere validación técnica adicional (dominio, certificados, pagos del propio cliente).
**¿Ejecutable mañana?** SÍ — ya ejecutado completamente en `bbabogados`. El riesgo es de disciplina de cierre, no de herramienta.
**Práctica elevada a mínimo operativo por la auditoría adversarial (mala experiencia de cliente + riesgo de pérdida, retorno alto, aplicable de inmediato al caso real de `costafloragardens`)**: si el entregable queda construido pero sin publicar más de unos pocos días, el fundador **debe** enviar proactivamente un mensaje de estado al cliente con una fecha estimada de publicación — no es una mejora opcional, es la corrección directa de un fallo ya materializado.
**Diseño 1-10 clientes**: conviene que el fundador fije una checklist mínima propia (informal, fuera del CRM) para no repetir el patrón de `costafloragardens`.
**Cambios a 100-1.000 clientes**: checklist de despliegue documentado, ligado al cambio de `status`; pipeline semi-automatizado; alerta de "proyectos construidos sin desplegar".

---

#### Etapa 12 — Validación

**Objetivo**: confirmar conformidad del cliente y usarla como disparador para arrancar Motor B (alta de la `Subscription` del nivel pactado).
**Responsable / FDI**: el fundador — **Exclusivo del fundador**. La confirmación de conformidad es conversación directa; el alta de la `Subscription` no tiene evidencia de estar automatizada (solo su sincronización posterior sí lo está).
**BCI**: 4 — **es el disparador exacto del "punto de mayor riesgo de fuga" del ciclo de vida económico (Mes 1-2)**: si se omite, el proyecto queda entregado pero sin ingreso recurrente activo, justo lo que la regla de empaquetado obligatorio existe para proteger. No llega a 5 porque no hay pérdida de datos ni afecta a otros clientes.
**Entradas**: `Project.status=COMPLETED`; nivel de Motor B ya acordado en el contrato. **Salidas**: conformidad confirmada; `Subscription` dada de alta. → Etapa 13.
**Herramientas**: canal directo con el cliente; Stripe; CRM (`Subscription`).
**Documentos**: ninguna plantilla formal de conformidad existe — el mínimo operativo es un mensaje del cliente confirmando, guardado como referencia.
**Automatizaciones existentes**: sincronización posterior de la `Subscription` ya creada, vía webhook. La creación inicial no está automatizada.
**Riesgos**: es la etapa de mayor riesgo económico del bloque — si el fundador no cierra explícitamente la conformidad y no da de alta la `Subscription`, se pierde el ingreso recurrente sin que nada en el sistema lo fuerce hoy ("es autodisciplina").
**KPIs**: tiempo `COMPLETED`→alta de `Subscription` (o su ausencia, la señal de fuga real) — no medido hoy.
**Puntos de decisión**: ¿la conformidad es suficiente para cerrar? ¿cuándo exactamente se da de alta la `Subscription`?
**¿Ejecutable mañana?** SÍ — todas las piezas existen (modelo `Subscription`, integración Stripe ya en producción). El riesgo es de disciplina, no de herramienta.
**Automatización futura reclasificada por la auditoría adversarial (retorno alto)**: una alerta que revise periódicamente `Project` en `COMPLETED` sin `Subscription` activa asociada no es una automatización que deba esperar a escala — reutiliza datos ya sincronizados y el mismo patrón de scheduler que ya corre en producción en `leadfinder` (APScheduler). **Se marca aquí como candidata de prioridad inmediata para Fase 7, no como "esperar a 100-1.000 clientes"** — no se construye en esta fase, pero su prioridad relativa queda corregida.
**Práctica añadida (riesgo de pérdida de clientes, retorno alto)**: comprometer una fecha de despliegue en el kickoff (Etapa 9) para que esta etapa no quede abierta sin límite, y considerar una regla de aceptación tácita (si el cliente no objeta en N días desde la publicación, se considera aceptado y Motor B arranca igualmente) — ambas usan herramientas ya existentes (el propio contrato, un calendario).
**Diseño 1-10 clientes**: el fundador se autoimpone la regla de no considerar cerrado un proyecto hasta que la `Subscription` esté activa.
**Cambios a 100-1.000 clientes**: automatizar o forzar sistemáticamente el vínculo `COMPLETED`→creación de `Subscription`; plantilla formal de conformidad; KPI explícito de fuga en el Mes 1-2.

---

#### Etapa 13 — Soporte

**Objetivo**: atender incidencias durante Motor B activo, dejando histórico verificable y detectando señales tempranas para la Renovación de Año 1.
**Responsable / FDI**: el fundador — **Exclusivo del fundador**. Sin sistema de tickets dedicado; las incidencias llegan por canales no estructurados; la resolución técnica depende del conocimiento exclusivo del fundador como único desarrollador. El triage administrativo (copiar una incidencia a `Task`) sería delegable con un segundo usuario CRM, hoy inexistente.
**BCI**: 4 — no cae ningún sistema, pero con solo 2 clientes piloto activos, perder uno por falta de respuesta representa una fracción muy alta del MRR total.
**Entradas**: conformidad validada (Etapa 12), `Subscription` activa. **Salidas**: histórico de `Task DONE`; acercamiento a la revisión de Año 1 (→ Etapa 14); señales tempranas de upselling anotadas.
**Herramientas**: CRM (`Task`); email/WhatsApp (no integrados, la copia a `Task` es manual); acceso directo del fundador a la infraestructura entregada.
**Documentos**: ninguno formal — no existe plantilla de ticket ni SLA escrito; el contrato solo define el alcance del nivel de mantenimiento, no el proceso día a día.
**Automatizaciones existentes**: ninguna en el flujo de soporte en sí; protegido por el backup diario del CRM.
**Automatizaciones futuras**: sistema de tickets dedicado — fuera del modelo de datos actual, fuera de alcance de esta fase.
**Riesgos**: una incidencia por email/WhatsApp se puede perder si no se copia manualmente a `Task`; sin SLA, el cliente no tiene expectativa clara de tiempo de respuesta; toda la carga técnica recae en una sola persona. **Añadido por la auditoría adversarial (retorno medio)**: ninguna etapa vigila proactivamente `Subscription` en `PAST_DUE` fuera de la ventana de revisión de Año 1 — un pago fallido en, por ejemplo, el mes 5 podría pasar de `PAST_DUE` a `CANCELED` sin que nadie lo note, pese a que el dato ya está sincronizado en tiempo real vía Stripe. Se recomienda una revisión periódica del estado de las `Subscription`, no solo reactiva a lo que el cliente reporta.
**KPIs**: `Task DONE` por `Client` (proxy de volumen); tiempo de cierre (sin medir sistemáticamente hoy).
**Puntos de decisión**: ¿la incidencia está dentro del alcance contratado? ¿se resuelve como gesto comercial o se marca como candidato a Upselling? ¿es urgente (afecta producción) o puede esperar?
**¿Ejecutable mañana?** SÍ — el modelo `Task`, el acceso directo del fundador y los canales ya en uso con los pilotos son suficientes.
**Diseño 1-10 clientes**: flujo manual (email/WhatsApp→`Task`→resolución directa) suficiente; disciplina añadida sin construir nada: registrar sistemáticamente cada incidencia como `Task`, aunque se resuelva en minutos.
**Cambios a 100-1.000 clientes**: modelo `Ticket` propio o herramienta de terceros integrada, SLAs por nivel, segundo usuario/rol de soporte.

---

#### Etapa 14 — Renovación

**Objetivo**: revisar formalmente la relación en el punto de Año 1 (fin de tarifa de lanzamiento si aplica) y confirmar la continuidad de la `Subscription`.
**Responsable / FDI**: el fundador — **Exclusivo del fundador**. Sin recordatorio automatizado ligado a `currentPeriodEnd`; la decisión de qué condiciones ofrecer es juicio comercial exclusivo.
**BCI**: **5** — es el momento donde se decide si el ingreso recurrente (descrito en `03-modelo-negocio.md` como "el ingreso real") continúa o se pierde; máximo nivel, igual que Contrato y Pago.
**Entradas**: histórico de soporte (Etapa 13), proximidad a la revisión de Año 1, `Subscription.currentPeriodEnd`. **Salidas**: cliente renovado (`Subscription` sigue `ACTIVE`) → Etapa 15; o no renueva (`CANCELED`) → Etapa 16 como versión de riesgo.
**Herramientas**: CRM (`Subscription`, `Client`); Stripe como fuente de verdad del cobro; comunicación directa.
**Documentos**: ninguna plantilla de "aviso de renovación" existe — el mínimo operativo es dejar por escrito cualquier cambio de condiciones referenciando el catálogo vigente.
**Automatizaciones existentes**: sincronización del estado de la `Subscription` vía webhook, ya fiable. El aviso/recordatorio de que la fecha se acerca NO está automatizado.
**Riesgos**: sin alerta, la fecha puede pasar desapercibida y la `Subscription` caducar por omisión, no por decisión del cliente; el fin de tarifa de lanzamiento implica comunicar una posible subida de precio, momento sensible; decisión 100% subjetiva sin criterio documentado; sin proceso de "aprendizaje interno" que capture por qué un cliente no renueva.
**KPIs**: tasa de renovación (sin dato — ningún piloto ha llegado aún a este punto); `Subscription` que cambian a `PAST_DUE`/`CANCELED` en la ventana (medible directamente).
**Puntos de decisión**: ¿aplica todavía la tarifa de lanzamiento? ¿el histórico de soporte señala un cuello de botella que justifique abrir directamente Upselling? **¿el cliente pide reducir su nivel de Operación técnica en vez de cancelar o renovar sin cambios?** *(punto de decisión añadido por la auditoría adversarial — ver "Madurez" abajo)*.
**¿Ejecutable mañana?** SÍ — el dato que dispara la revisión (`currentPeriodEnd`) ya está sincronizado; la etapa es ejecutable pero todavía no probada con un caso real.
**Automatización futura reclasificada (retorno alto, mismo criterio que la Etapa 12)**: un recordatorio automático ligado a `currentPeriodEnd` se marca aquí como **prioridad inmediata de Fase 7**, no genérica — mismo razonamiento coste/beneficio que la alerta de la Etapa 12.
**Riesgo de "Madurez" sin respuesta diseñada (añadido por la auditoría adversarial, retorno alto)**: `03-modelo-negocio.md` nombra explícitamente un tercer patrón de fuga distinto de la cancelación total — "Año 3-5 Madurez: riesgo de que el cliente crea que 'ya está optimizado' y reduzca Motor B". Ninguna etapa, hasta esta corrección, diseñaba una respuesta: un cliente que pide bajar de Nivel 3 a Nivel 1 sin cancelar no tenía ningún lugar en el journey. **Respuesta mínima añadida, sin construir nada nuevo**: actualizar la `Subscription` en Stripe/CRM al nivel inferior, registrar el motivo en `Client.notes`, y evaluar si conviene una conversación de valor (recordar qué cubre cada nivel) antes de aceptar la baja.
**Diseño 1-10 clientes**: revisión manual (el fundador consulta el CRM y anota fechas en calendario propio) — proporcional, evita construir un sistema de recordatorios antes del primer caso real.
**Cambios a 100-1.000 clientes**: recordatorio automatizado, política de precios de renovación documentada.

---

#### Etapa 15 — Upselling

**Objetivo**: vender una nueva línea (típicamente Motor C) a un cliente activo, a partir de un cuello de botella real detectado por el uso del sistema — no de una campaña artificial — o registrar explícitamente la decisión de no ampliar.
**Responsable / FDI**: el fundador — **Exclusivo del fundador**. Detectar el cuello de botella cruza conocimiento técnico, histórico de soporte y contexto comercial; Motor C se apoya en la capacidad Core 4 (BCI 2, uso real no confirmado en producción), lo que hace que incluso la ejecución posterior dependa fuertemente del fundador.
**BCI**: 2 — si se detiene, no hay riesgo inmediato: Motor A ya está cobrado y Motor B sigue facturando independientemente. El único coste es una oportunidad de crecimiento retrasada.
**Entradas**: cliente renovado (Etapa 14) y una señal concreta de necesidad detectada en Soporte/Renovación — no una oferta genérica. **Salidas**: nueva línea vendida o decisión explícita de no ampliar, registrada en `Client.notes`.
**Herramientas**: CRM (`notes`, posible `Payment`/`PaymentLink`); `05-catalogo-servicios.md` (Motor C: 41-105€/h, 7.125€, cotización caso a caso); conversación directa.
**Documentos**: no existe "propuesta de upsell" formal — igual que la Etapa 5, se redacta a mano.
**Automatizaciones existentes**: ninguna específica; el cobro adicional, si aplica, se beneficia de la sincronización de Stripe ya existente.
**Riesgos**: **el mayor riesgo de esta etapa es convertirla en campaña artificial** en vez de responder a una necesidad real — el propio flywheel exige anclarla en "el uso real revela el cuello de botella"; Motor C se apoya en una capacidad no probada en producción (BCI 2); ningún cliente piloto ha llegado aún a este punto.
**KPIs**: cuellos de botella detectados vs. convertidos en venta (sin dato); expansión de ARPU (sin dato).
**Puntos de decisión**: ¿la señal es un cuello de botella real validado por el uso, o una hipótesis sin evidencia suficiente? ¿qué nivel de Motor C responde? ¿el cliente puede asumir el gasto ahora?
**¿Ejecutable mañana?** SÍ — identificar la necesidad y ofrecer con precios ya cerrados no requiere herramienta nueva; la limitación es de validación (sin caso real todavía), no de ejecutabilidad.
**Diseño 1-10 clientes**: exactamente lo que pide la filosofía de esta fase — no construir un sistema de detección de upsell, esperar a que el uso real revele el cuello de botella y actuar caso a caso.
**Cambios a 100-1.000 clientes**: señal de uso agregada/analítica del sistema entregado; proceso de propuesta de upsell más estandarizado (Fase 7).

---

#### Etapa 16 — Cierre

**Objetivo**: cerrar el ciclo de revisión o de relación — versión sana (caso de éxito o referido que alimenta "Nuevas oportunidades" del flywheel) o versión de riesgo (cancelación) — dejando registrado lo aprendido.
**Responsable / FDI**: el fundador — **Exclusivo del fundador**. En su versión de riesgo es la etapa más cruda del bloque: el flywheel documenta explícitamente que "Aprendizaje interno" no existe como proceso en ningún sitio hoy, ni siquiera está documentado como hábito *(nota de precisión: esto no significa un nivel de FDI numéricamente distinto al resto — las 16 etapas comparten la misma categoría "Exclusivo del fundador" — sino que es, dentro de esa categoría, la instancia con menos andamiaje documentado, sin ningún criterio ni checklist que la sostenga, a diferencia por ejemplo de la Etapa 3, que sí tiene criterios cerrados aunque también sea "Exclusivo del fundador")*.
**BCI**: 3 — no hay pérdida de ingreso inmediata (ese riesgo ya se jugó en la Etapa 14), pero se pierde la alimentación del flywheel: casos de éxito, referidos, aprendizaje. Dado que los 2 pilotos reales llegaron por referido, erosionar esta fuente afecta al canal más fiable del negocio a medio plazo.
**Entradas**: versión sana — relación madura, potencialmente en Año 2-5 (incluido el riesgo de Madurez, ver Etapa 14); versión de riesgo — `Subscription` no renovada o cancelación posterior. **Salidas**: versión sana — caso de éxito/referido alimenta "Nuevas oportunidades" → retroalimenta la Etapa 1; versión de riesgo — `Subscription.canceledAt` registrado, caso anotado como aprendizaje (sin proceso formal que lo sistematice más allá de lo que el fundador decida anotar).
**Herramientas**: CRM (`Subscription.canceledAt` automático vía Stripe; `Client.notes` como único lugar disponible hoy); comunicación directa.
**Documentos**: ninguno existe — ni plantilla de caso de éxito, ni formulario de motivo de cancelación.
**Automatizaciones existentes**: solo el registro de `canceledAt` vía webhook. Nada más está automatizado.
**Automatizaciones futuras**: sin dato — el propio `flywheel-comercial.md` identifica "KPIs→Aprendizaje interno→Mejora de capacidades" como el tramo más débil de todo el flywheel, sin solución propuesta todavía; no se inventa una aquí.
**Riesgos**: si un cliente cancela, el motivo real puede perderse por completo sin registro; en la versión sana, pedir un caso de éxito depende de que el fundador lo recuerde, sin disparador ligado al momento de Madurez; con solo 2 pilotos, cualquier cancelación representa una pérdida proporcionalmente grande de la base de aprendizaje disponible.
**KPIs**: casos de éxito/referidos sobre clientes que llegan a Madurez (sin dato); tasa de cancelación (medible vía Stripe); motivos de cancelación efectivamente registrados (sin dato, cero cancelaciones hasta la fecha).
**Puntos de decisión**: ¿el cliente está dispuesto a ser caso de éxito/referencia? En versión de riesgo, ¿se puede revertir la cancelación o se acepta y se registra el aprendizaje? ¿qué se anota exactamente como motivo?
**¿Ejecutable mañana?** SÍ, de forma manual y puntual — pedir un testimonio o anotar un motivo de cancelación en `Client.notes` no requiere herramienta nueva. Lo que no existe, y no se finge que existe, es un proceso *sistemático* de Aprendizaje interno.
**Diseño 1-10 clientes**: basta con la disciplina de escribir una nota en `Client.notes` en cada cierre — construir un sistema ahora sería sobre-optimizar sin ningún dato real todavía (cero cancelaciones, cero casos de éxito confirmados).
**Cambios a 100-1.000 clientes**: proceso formal de post-mortem de cliente y gestión de referidos, indexado y consultable — no una nota suelta en texto libre.

---

### 2. Riesgos transversales a las 16 etapas (no específicos de una sola)

**Riesgo agregado de disponibilidad del fundador (hallazgo de la auditoría adversarial, cuellos de botella, retorno alto)**: cada etapa, leída individualmente, declara FDI="Exclusivo del fundador" con frases como "no hay a quién delegar". Ninguna etapa suma estas 16 declaraciones en el hallazgo que realmente importa: **hoy no existe ni una sola etapa del journey completo con una vía alternativa de ejecución si el fundador no está disponible**. Las dos únicas automatizaciones reales (pagos/MRR vía Stripe, generación de leads de `leadfinder`) cubren solo la confirmación técnica de eventos ya disparados por una decisión del fundador — no sustituyen ninguna decisión comercial, contractual ni de ejecución. Un evento de indisponibilidad (enfermedad, accidente, viaje) no pausa "una etapa": pausa simultáneamente captación, cierre de negociaciones, firma de contratos, cobro, ejecución de proyectos activos, soporte de clientes en producción (`bbabogados` vive hoy en Vercel) y renovación de suscripciones cercanas a Año 1 — todo a la vez. **Mínimo operativo, sin construir nada nuevo**: definir a quién avisar y qué comunicar a `bbabogados`/`costafloragardens` ante una incidencia de producción si el fundador no puede responder en el momento — no resuelve la dependencia (eso excede esta fase), pero declara el riesgo agregado en vez de dejarlo disperso en 16 párrafos distintos.

**Regla de prioridad ante colisiones (retorno medio, coste ≈0)**: cada etapa evalúa su BCI asumiendo un solo cliente en juego, pero el fundador es un recurso único que sirve a todos los clientes en todas las etapas activas a la vez — con 2-3 clientes ya es posible que una incidencia de producción (Etapa 13) compita con una firma de contrato sensible al plazo de tarifa de lanzamiento (Etapa 7). Regla de una frase, autoimpuesta, sin herramienta nueva: **incidencia de producción en cliente activo > contrato/pago con fecha límite de tarifa de lanzamiento > resto de gestiones comerciales.**

**Componente administrativo vs. componente de juicio del FDI (retorno alto)**: en las Etapas 2, 7, 8, 9, 12 y 13, el "Exclusivo del fundador" mezcla dos cosas distintas — el juicio/negociación/técnica (genuinamente exclusivo) y el registro administrativo en el CRM (crear un `Lead`/`Client`, cambiar un `stage`/`status`, crear una `Task`), que hoy es exclusivo solo porque hay un único usuario admin, una decisión de plantilla, no una propiedad de la tarea. Vale la pena evaluar ya, a este volumen, si dar acceso limitado del CRM a una segunda persona solo para registro administrativo libera tiempo del fundador para lo genuinamente exclusivo — sin dato de si la autenticación JWT+bcrypt actual soporta un segundo usuario con permisos restringidos sin cambios; verificar esto es un prerequisito barato antes de descartar la delegación por escala.

## Decisiones descartadas

- **Fusionar las Etapas 3 (Cualificación) y 4 (Diagnóstico) en una sola**: la auditoría adversarial lo recomendó con retorno alto (comparten responsable, herramientas y el mismo estado de salida del CRM, `Lead.stage=CONTACTED`). Se descarta la fusión de la numeración por fidelidad a la estructura de 16 etapas pedida explícitamente; se aplica en su lugar una nota cruzada en la Etapa 3 señalando que, en la práctica con 1-10 clientes, ambas ocurren en la misma conversación. Revisar con los próximos clientes reales si conviene fusionar formalmente.
- **Construir plantillas, sistemas de tickets, firma electrónica o cualquier automatización nueva en esta fase**: descartado explícitamente por el alcance de la Fase 6 — es trabajo de Fase 7 (Sistema comercial) en adelante. Esta fase documenta el mínimo manual ejecutable con lo que existe hoy.
- **Ofrecer Motor C o cualquier nivel de Motor B línea Gestión del crecimiento (incluido el Nivel 1 SEO técnico) en la primera venta**: descartado en todas las etapas de venta, consistente con la restricción explícita del Production Readiness Review — corregido tras la auditoría de integración, que encontró que el borrador inicial acotaba la exclusión solo a "Niveles 2-3".
- **Fijar una fecha de resolución de los 2 campos en blanco del contrato dentro de este documento**: descartado — no es una decisión de proceso de esta fase, es una decisión pendiente del fundador; se traslada a "Preguntas que necesitan aprobación".

## Riesgos detectados

Los riesgos específicos de cada etapa están documentados en su sección. Riesgos transversales, ver sección 2 de "Decisiones tomadas" arriba. Riesgos ya registrados en otros documentos que este journey confirma o hereda (no se duplican en detalle, solo se referencian):

- **R13-equivalente comercial**: el contrato bloqueado por 2 campos en blanco (Etapa 7) es hoy el riesgo de mayor urgencia de todo el documento — coincide en severidad con lo que R13 fue para el CRM antes de resolverse.
- **L1/L2/L4** (`06-legal-cumplimiento.md`): bloquean el canal `leadfinder` en las Etapas 1-2, sin cambios respecto al PRR.
- **"Aprendizaje interno"** (`flywheel-comercial.md`): confirmado como el tramo más débil también desde la óptica del Customer Journey — la Etapa 16 no puede resolverlo, solo declararlo con honestidad.
- **Silo LeadFinder↔CRM** (`inventario-tecnologico.md`, `flywheel-comercial.md`): confirmado sin cambios; no bloquea el canal referido.

## Dependencias con otras fases

- **Hacia Fase 7 (Sistema comercial)**: hereda, con prioridad ya diferenciada por esta fase, (1) plantilla formal de Propuesta, (2) firma electrónica y generación semi-automática del Contrato, (3) plantillas de `Task` por nivel de catálogo, (4) política de descuentos y guion de objeciones, (5) **con prioridad inmediata, no genérica**: alertas de "`Project COMPLETED` sin `Subscription` activa" (Etapa 12) y "`Subscription` próxima a `currentPeriodEnd` sin señal de renovación" (Etapa 14), y (6) evaluar un segundo usuario del CRM con permisos limitados para registro administrativo.
- **Hacia Fase 8 (Operaciones)**: hereda el mecanismo de "Mejora de capacidades" y el proceso de "Aprendizaje interno" que este journey confirma, no resuelve.
- **Hacia Fase 9 (Automatizaciones)**: hereda la conexión LeadFinder↔CRM y las automatizaciones futuras señaladas por etapa.
- **Desde `06-legal-cumplimiento.md`**: hereda el bloqueo condicional del canal `leadfinder` (Etapas 1-2) y la referencia honesta a que Legal sigue "propuesto, pendiente de aprobación definitiva" — este journey no trata Legal como cerrado en ningún punto.
- **Desde `contrato-minimo-venta.md`**: hereda íntegro el contenido de las 10 secciones; este journey no modifica el contrato, solo señala cuándo se usa y qué lo bloquea.

## Tareas futuras

1. **Resolver los 2 campos en blanco del contrato antes del siguiente lead que llegue a Negociación** — identificación fiscal de INTEREMPREX y duración mínima de empaquetado de Motor B. Es la tarea de mayor urgencia de todo este documento.
2. Decidir si se evalúa un segundo usuario del CRM con permisos limitados (verificar primero si JWT+bcrypt lo soporta sin cambios).
3. Fijar un precio o política de precio del Diagnóstico.
4. Trasladar a Fase 7 las 6 piezas listadas en "Dependencias con otras fases", con la priorización ya señalada.
5. Validar con el primer cliente real cada supuesto marcado "sin dato" o "no probado todavía" en este documento (ver "Criterio de cierre").

## Auditoría crítica

Construida con un workflow de 16 agentes: 5 de redacción (uno por bloque de etapas), 4 de integración documental (uno por grupo de sistemas/documentos: estrategia, legal/contrato, técnico/CRM, gobernanza FDI-BCI-PRR) y 7 de auditoría adversarial (una lente por cada una pedida explícitamente: pasos innecesarios, cuellos de botella, dependencia del fundador, automatizaciones con retorno, riesgo de pérdida de clientes, mala experiencia de cliente, incoherencias internas).

**Integración documental — resultado por lente**:
- **Estrategia** (posicionamiento/modelo de negocio/arquitectura/catálogo): coherente en precios, criterios de aceptación, ciclo de vida económico y regla de empaquetado. 2 contradicciones reales encontradas y corregidas (Nivel 3 reapareciendo en Etapas 9-10; exclusión de Gestión del crecimiento mal acotada en Etapas 4-5).
- **Legal y Contrato**: disciplinado — nunca declara resuelto L1/L2/L4/L5/L8/L9, nunca trata Legal como cerrado, bloquea correctamente el canal `leadfinder`. 1 contradicción real de severidad alta encontrada y corregida (doble transición a `WON`).
- **Técnico/CRM**: no inventa modelos inexistentes (ningún "Ticket", "Contrato" o "Propuesta formal" como entidad del CRM), usa correctamente los enums reales. Confirma las 2 contradicciones ya corregidas arriba.
- **Gobernanza FDI/BCI/PRR**: los anclajes a "Cierre de ventas" (FDI=3/BCI=4) y "Ejecución de proyecto tipo" (FDI=3/BCI=3) ya registrados se usan correctamente. **Limitación de auditoría declarada por el propio agente**: no tuvo acceso al contenido de `priorizacion.md` para verificar la trazabilidad de los riesgos nuevos — se hizo manualmente en la sección "Riesgos detectados" de este documento, no se da por verificado automáticamente.

**Auditoría adversarial — 18 hallazgos, aplicados todos los de retorno alto y los de retorno medio/bajo de coste ≈0; ninguno descartado sin justificación**:
- **Retorno alto (11), todos aplicados**: fusión de Cualificación+Diagnóstico (no aplicada a la numeración, ver "Decisiones descartadas"); cuello de botella del contrato sin fecha límite; riesgo agregado de disponibilidad del fundador; conflación de FDI genuino vs. administrativo; alertas de Etapas 12/14 mal priorizadas; ventana Mes 1-2 sin mecanismo de cierre; riesgo de Madurez sin respuesta diseñada; cliente llega a `WON` sin conocer duración de Motor B; lead rechazado sin comunicación de cierre; limbo "construido sin desplegar" sin aviso al cliente; doble transición a `WON` (Etapas 6-7); Nivel 3 reapareciendo (Etapas 9-10).
- **Retorno medio (5), aplicados por coste ≈0**: regla de prioridad ante colisiones; monitorización proactiva de `PAST_DUE`; comunicar si el Diagnóstico tiene coste; comunicar un plazo orientativo; reformulación de la Etapa 16 sobre el lenguaje de escala de FDI.
- **Retorno bajo (1), aplicado por ser una corrección de una frase**: la Etapa 9 se auto-describía erróneamente como el tramo de mayor riesgo de fuga, en vez de la Etapa 12 — corrección editorial sin cambio de proceso.

**Coherencia con la constitución**: verificada — ningún dato de negocio se inventa (precios reales del catálogo, plazos marcados "sin dato", KPIs sin cifra donde no existe). El FDI se declara con honestidad (16/16 etapas "Exclusivo del fundador") en vez de maquillarse para parecer más maduro de lo que la empresa es hoy.

## Auditoría adversarial (Modo Optimización Total, 2026-07-12)

Aplicando el mandato de intentar refutar esta fase en vez de confirmarla: la crítica más seria que sobrevive a esta ronda no es ningún hallazgo puntual de los 18 ya corregidos — es que **este documento entero descansa sobre 2 clientes piloto y cero clientes de pago con ciclo de vida completo**. Ninguna etapa a partir de la 12 (Validación en adelante) tiene un solo caso real que la valide; todo lo relativo a Renovación, Upselling y Cierre es, por definición, un diseño razonado pero no probado. Esto no invalida el documento — es exactamente lo que la filosofía "construir para ejecutar, optimizar con datos reales" pedida para esta fase anticipa y acepta — pero debe quedar dicho sin adornos: **este es un mapa bien razonado, no un proceso verificado.**

**Contrapeso obligatorio aplicado**: esta auditoría no generó ningún documento ni marco nuevo — todos los hallazgos aplicados caben como correcciones dentro de este mismo documento o como filas nuevas en `priorizacion.md`/`fdi-registro.md`/`bci-registro.md` (registros ya existentes). No se creó ningún archivo aparte para los 18 hallazgos.

## Preguntas que necesitan aprobación

1. **Duración mínima del periodo obligatorio de Motor B** (bloquea la Etapa 7, Contrato) — no se fija aquí para no inventar una cifra de negocio; es la decisión más urgente de todo este documento.
2. **Identificación fiscal de INTEREMPREX** (razón social/NIF/domicilio) — mismo bloqueo, mismo motivo de no inventarlo aquí.
3. ¿Se evalúa dar de alta un segundo usuario del CRM con permisos limitados (registro administrativo) antes de escalar más allá de 1-3 clientes, o se mantiene deliberadamente un único usuario mientras el volumen lo permita?
4. ¿Se aprueba la priorización de las dos alertas de Fase 7 identificadas como urgentes (Etapa 12 y 14) por delante del resto del backlog de esa fase, dado su coste bajo y su impacto directo en el MRR?

---

## Validación de cierre de fase (respuesta directa a los 4 puntos pedidos)

**1. Principales hallazgos**: el journey completo es ejecutable mañana para un cliente que llegue por referido, con una única excepción real y ya identificada — la firma de contrato está bloqueada por 2 decisiones pendientes del fundador (fiscales y de duración de Motor B), no por falta de sistema. Las 16 etapas comparten FDI="Exclusivo del fundador" sin excepción, un hecho honesto sobre el tamaño actual de la empresa, no un fallo de diseño. Se encontraron y corrigieron 4 contradicciones internas reales (doble transición a `WON`, reaparición del Nivel 3, exclusión mal acotada de Gestión del crecimiento, lenguaje de escala de FDI en la Etapa 16) y se aplicaron 17 de 18 hallazgos de la auditoría adversarial (uno, la fusión de etapas, se registró pero no se aplicó a la numeración por fidelidad a lo pedido).

**2. Riesgos que siguen abiertos**: el bloqueo del contrato (máxima urgencia, ver "Preguntas que necesitan aprobación"); la dependencia total del fundador en las 16 etapas sin excepción, mitigada solo parcialmente por la distinción entre juicio genuino y trabajo administrativo delegable; el tramo "Aprendizaje interno" del flywheel, que este documento confirma pero no resuelve; el canal `leadfinder` bloqueado mientras L1/L2/L4 sigan abiertos.

**3. Qué debe validarse con el primer cliente real**: absolutamente todo lo posterior a la Etapa 11 (Entrega) — Validación, Soporte, Renovación, Upselling y Cierre están diseñados con rigor pero sin un solo caso real que los confirme. En particular: si la duración de Motor B que se fije resulta razonable en la práctica; si la regla de aceptación tácita de la Etapa 12 genera fricción o la evita; si el mínimo operativo de Soporte (email/WhatsApp→`Task`) aguanta con más de un cliente activo simultáneamente; y si el patrón de Upselling ("el uso real revela el cuello de botella") se confirma o resulta ser demasiado pasivo.

**4. Recomendación objetiva — ¿Fase 7 o ejecutar clientes primero?**: **ejecutar el primer cliente real antes de abrir Fase 7.** Los 5 criterios de la metaauditoría permanente aplicados a "abrir Fase 7 ahora": (1) valor empresarial — bajo hoy, construiría sistemas (plantillas, alertas, firma electrónica) para un proceso con cero validación real; (2) principio de retorno — negativo: el coste de construir herramienta para un proceso no probado supera el valor de tenerla lista antes de saber si el diseño aguanta; (3) coherencia con la metodología — contradice "construir para ejecutar, optimizar con datos reales", la filosofía explícita de esta misma fase; (4) no duplica documentación — no aplica, es una fase nueva, no una duplicidad; (5) acerca objetivamente a la siguiente etapa — no: el primer cliente real es lo único que puede decir con evidencia qué parte de Fase 7 merece construirse primero. Los 5 criterios aplicados a "ejecutar un cliente real ahora": valor empresarial alto (primer ingreso, primer dato real para `kpis.md`, primera prueba del journey completo), retorno positivo (coste marginal ≈0, todo lo necesario ya existe salvo 2 decisiones de horas del fundador), coherente con la metodología, no genera documentación nueva, y es el único camino que valida objetivamente si Fase 7 debe empezar por la Propuesta, por las alertas de Renovación, o por otra prioridad completamente distinta a la que se adivinaría sin datos. **Conclusión: resolver los 2 campos del contrato (horas, no días) y ejecutar el siguiente cliente real. Fase 7 espera a tener al menos un ciclo completo (Descubrimiento→Validación) con datos reales que confirmen o corrijan este documento.**

---

**Qué modifica**: crea el Customer Journey operativo de INTEREMPREX — 16 etapas con objetivo/responsable/FDI/BCI/entradas/salidas/herramientas/documentos/automatizaciones/riesgos/KPIs/puntos de decisión, validación de ejecutabilidad inmediata, y análisis de escala 1-10 vs. 100-1.000 clientes. No modifica ninguna decisión de fase anterior — aplica motores, catálogo, contrato y marco legal ya cerrados a un recorrido concreto, y corrige 4 contradicciones internas encontradas durante su propia construcción.

**Qué documentos dependen de este**: Fase 7 (Sistema comercial) hereda directamente la lista priorizada de qué construir primero; Fase 8 (Operaciones) hereda el mecanismo pendiente de "Aprendizaje interno"; Fase 9 (Automatizaciones) hereda la conexión LeadFinder-CRM y las alertas señaladas como prioritarias.

**Qué documentos deben revisarse si este cambia**: `enterprise-blueprint.md` (bloque 7, Customer Journey, pasa de "pendiente" a resuelto), `README.md` (roadmap), `fdi-registro.md` y `bci-registro.md` (si se decide registrar el proceso de Customer Journey como entrada propia más allá de "Cierre de ventas" ya existente), `priorizacion.md` (nuevos hallazgos: bloqueo del contrato con fecha límite, alertas de Etapas 12/14 reclasificadas).
