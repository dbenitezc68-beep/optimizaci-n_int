# 00 — Metodología de trabajo

Estado: **aprobada, permanente.** Rige la construcción de cada fase de este proyecto desde el 2026-07-02. Ninguna fase se entrega sin cumplir esto. Este documento tiene la misma autoridad que `02-principios-fundacionales.md`: aquél define qué tipo de empresa es INTEREMPREX (contenido), este define cómo se construye cada decisión sobre ella (proceso).

## Objetivo del proyecto

No se está construyendo una agencia. Se está diseñando una empresa tecnológica escalable cuya actividad es resolver problemas empresariales mediante tecnología, automatización e inteligencia artificial. Todo documento debe contribuir a ese objetivo — no limitarse a describir servicios.

## Rol de quien redacta cada fase

Quien construye cada documento razona simultáneamente desde CEO, COO, CTO, arquitecto empresarial, arquitecto de software, consultor estratégico, responsable de operaciones, responsable financiero y responsable comercial. La responsabilidad no es responder preguntas: es detectar errores antes de que existan, cuestionar decisiones (incluidas las del fundador, con argumentos) y optimizar continuamente. No se acepta una solución solo por ser válida — se busca la mejor disponible. No se pide complacencia, se ejerce criterio profesional.

## Estatus de la documentación

Todo documento aprobado pasa a ser documentación oficial del proyecto. Ninguna fase puede contradecir documentación previamente aprobada sin, en este orden: indicar la contradicción → explicar el problema → proponer la mejor solución → esperar aprobación explícita si el cambio afecta a decisiones estratégicas. Una contradicción nunca se ignora en silencio.

## La constitución

`02-principios-fundacionales.md` es el documento de mayor autoridad sobre el contenido del proyecto. Toda decisión futura se valida contra él. Si una recomendación lo contradice: se explica, se justifica, y se propone modificar la constitución antes de continuar — nunca se avanza ignorando la contradicción.

## Forma de pensar obligatoria

No pensar como agencia — pensar como empresa tecnológica. No pensar en vender páginas web — pensar en construir sistemas. No pensar en servicios sueltos — pensar en plataformas. No pensar en tareas — pensar en procesos. No pensar primero en contratar — pensar primero en automatizar.

## Los cinco criterios de toda decisión

Cada decisión relevante se justifica desde: **valor para el cliente, rentabilidad, escalabilidad, automatización, simplicidad operativa.** Si una propuesta no mejora al menos tres de las cinco, se cuestiona antes de presentarla — no se incluye solo porque suene bien.

## Las cinco pruebas de escalabilidad

Antes de dar una fase por cerrada, se valida que la propuesta seguiría funcionando si:

1. INTEREMPREX tuviera 50 empleados.
2. INTEREMPREX tuviera 500 clientes activos.
3. INTEREMPREX operara en varios países.
4. El fundador no pudiera intervenir durante un mes.
5. El proceso tuviera que delegarse por completo.

Si falla alguno de estos escenarios, la propuesta se rediseña antes de entregarla — no se entrega con la falla documentada como "trabajo futuro" salvo que se declare explícitamente como dependencia de otra fase (ver formato, abajo).

## Auditoría obligatoria de cierre

Antes de pedir aprobación, cada fase se audita internamente contra: contradicciones, duplicidades, riesgos, deuda técnica, deuda operativa, complejidad innecesaria, dependencias peligrosas, oportunidades de automatización, oportunidades de estandarización. La auditoría se hace antes de pedir aprobación, no después.

## Gestión del conocimiento

Cada documento se escribe para que alguien que no ha visto ninguna conversación previa pueda entender el proyecto solo leyéndolo. No se escribe para esta conversación — se escribe como manual operativo permanente de INTEREMPREX.

## Formato obligatorio de cada fase

Todo documento de fase (a partir de `03-modelo-negocio.md`) termina con estas secciones, en este orden:

1. Resumen ejecutivo
2. Decisiones tomadas
3. Decisiones descartadas
4. Riesgos detectados
5. Dependencias con otras fases
6. Tareas futuras
7. Auditoría crítica
8. Preguntas que necesitan aprobación

## Control de cambios documentales (obligatorio desde el 2026-07-02)

Además del formato anterior, **todo documento del repositorio** — de fase o de gobierno — cierra con tres apartados adicionales, en este orden, al final del todo:

1. **Qué modifica** — qué decisión, regla o dato establece o cambia este documento.
2. **Qué documentos dependen de este** — qué otros documentos, existentes o futuros, se apoyan en lo que aquí se fija.
3. **Qué documentos deben revisarse si este cambia** — la lista concreta a repasar antes de aceptar una modificación de este documento.

Esto es distinto de la sección "Dependencias con otras fases" del formato de fase: aquella describe dependencias de contenido de negocio: esta describe el grafo de documentos, para poder saber, ante cualquier cambio, qué más hay que revisar sin tener que releer todo el repositorio. `enterprise-blueprint.md` es la vista consolidada de este grafo a nivel de bloques estratégicos.

## Founder Dependency Index (FDI)

Indicador permanente, activo desde la Fase 2, que mide cuánto depende cada proceso de INTEREMPREX de la intervención directa del fundador. El registro vivo de mediciones está en `fdi-registro.md` — este documento define la escala, aquel acumula los datos.

**Niveles** (de mayor a menor dependencia):

| Nivel | Descripción | Puntuación |
|---|---|---|
| Exclusivo del fundador | Solo el fundador puede ejecutarlo; no está escrito en ningún sitio | 3 |
| Delegable con formación | Otra persona podría hacerlo, pero necesita que el fundador se lo enseñe directamente | 2 |
| Totalmente documentado | Cualquier persona nueva podría ejecutarlo leyendo la documentación, sin que el fundador intervenga | 1 |
| Automatizado | No requiere intervención humana en su ejecución habitual | 0 |

**Reglas de uso:**

- Todo proceso que se documente a partir de aquí se clasifica en uno de estos cuatro niveles, dentro del documento de la fase donde aparece, y se añade como fila nueva en `fdi-registro.md`.
- Toda recomendación relevante declara explícitamente si mejora, empeora o no afecta el FDI del proceso que toca. "Mejora" significa mover un proceso hacia una puntuación más baja (más automatizado o más documentado, menos dependiente del fundador).
- El objetivo es que el FDI medio de la empresa descienda de forma progresiva, fase a fase. No se exige llegar a 0 en todos los procesos — pero cualquier decisión que empeore el FDI de un proceso sin justificar por qué compensa en otro criterio, se señala explícitamente en la auditoría crítica de esa fase.

## Nivel de exigencia

Diseñar como si la empresa tuviera que seguir funcionando dentro de diez años sin rehacer su estructura. Buscar siempre la mejor solución disponible, no la primera que sea válida.

---

**Qué modifica**: define el proceso obligatorio de trabajo para todo el proyecto — rol, criterios de decisión, pruebas de escalabilidad, auditoría de cierre, FDI y formato de cada documento.

**Qué documentos dependen de este**: todos los documentos del repositorio, sin excepción — es el documento de mayor autoridad sobre el proceso, al mismo nivel que `02-principios-fundacionales.md` sobre el contenido.

**Qué documentos deben revisarse si este cambia**: todos los documentos de fase existentes (`01`, `02`, `03`, `04`...) para comprobar que siguen cumpliendo el formato y las reglas vigentes, y `enterprise-blueprint.md` si el cambio afecta a la cadena de bloques.
