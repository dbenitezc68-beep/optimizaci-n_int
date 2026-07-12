# Priorización — INTEREMPREX

Registro vivo. Escala y reglas definidas en [`00-metodologia.md`](./00-metodologia.md). Toda incidencia, deuda técnica, mejora o riesgo detectado a partir de la Fase 4 se clasifica aquí en cinco dimensiones (impacto, esfuerzo, urgencia, dependencia, riesgo de no actuar), cada una Alta/Media/Baja salvo dato real disponible. Este documento consolida, además, todos los pendientes ya detectados en fases anteriores — no empieza vacío.

## Prioridad crítica

| Elemento | Impacto | Esfuerzo | Urgencia | Dependencia | Riesgo de no actuar | Origen |
|---|---|---|---|---|---|---|
| ~~R13 — `interemprex-dashboard` sin repositorio remoto~~ | Alta | Baja | Alta | Alta | Alta | **Resuelto 2026-07-07** — repositorio privado creado, remoto configurado, push confirmado (`production-readiness-review.md`). Se mantiene la fila tachada en vez de eliminarla, para no perder el registro de que existió. |
| R9 — Exposición legal activa (scraping de `leadfinder`, datos de cliente en el CRM) | Alta | Media | Alta (exposición ya activa hoy) | Alta (bloquea escalar prospección con confianza) | Alta | `03-modelo-negocio.md`, `auditoria-preventiva-leadfinder.md` — **desarrollado en detalle en `06-legal-cumplimiento.md` como L1-L9** |
| L1 — Sin LIA (test de interés legítimo) documentado para `leadfinder` | Alta | Media | Alta | Alta (bloquea que R9 se pueda dar por resuelto) | Alta | `06-legal-cumplimiento.md` |
| L2 — Sin aviso de privacidad para la actividad de prospección | Alta | Baja-media | Alta | Alta | Alta | `06-legal-cumplimiento.md` |
| Contrato mínimo bloqueado por 2 campos en blanco (identificación fiscal de INTEREMPREX, duración de empaquetado de Motor B), sin fecha límite autoimpuesta | Alta (bloquea firmar con cualquier cliente nuevo) | Muy baja (horas de decisión del fundador, no trabajo de fase) | Alta (tarifa de lanzamiento cierra 2026-09-30 o al 3er cliente; ya hay 2 pilotos) | Alta (bloquea en cascada Pago, Inicio del proyecto y activación de Motor B) | Alta | `07-customer-journey.md` (hallazgo de la auditoría adversarial, Etapa 7) |

## Prioridad alta

| Elemento | Impacto | Esfuerzo | Urgencia | Dependencia | Riesgo de no actuar | Origen |
|---|---|---|---|---|---|---|
| R2 — Dependencia total del fundador en el cierre de ventas | Alta | Alta | Media | Alta (Fase 7 depende de esto) | Alta | `03-modelo-negocio.md` |
| ~~R6 — Backups del CRM no verificados~~ | Alta | Baja | Media | Baja | Alta | **Resuelto 2026-07-09** — sistema de backup automático diario, verificado (integridad, tablas, tamaño) y con retención de 30 copias, fuera de esta máquina (Google Drive). Diseño, validación y procedimiento de recuperación completos en `production-readiness-review.md` |
| Silo LeadFinder ↔ CRM (flywheel) | Alta | Media | Media | Alta (bloquea que el flywheel funcione de verdad) | Alta | `flywheel-comercial.md` |
| "Aprendizaje interno" sin ningún proceso (flywheel) | Alta (a largo plazo) | Media | Baja hoy | Alta (todo el ciclo de mejora de capacidades depende de esto) | Media-alta | `flywheel-comercial.md` |
| Precio de Diagnóstico y de Mantenimiento SEO técnico sin fijar | Media | Baja | Media (bloquea vender con criterio) | Media | Media | `05-catalogo-servicios.md` |
| L3 — Sin canal de ejercicio de derechos para datos de prospección | Media-alta | Media | Media | Media | Media-alta | `06-legal-cumplimiento.md` |
| L6 — Exportación de datos a Anthropic sin base documentada | Media | Baja-media | Media | Media | Media-alta | `06-legal-cumplimiento.md` |
| Alertas de fuga de Motor B sin construir ("Project completado sin Subscription activa", "Subscription cerca de renovar sin señal") | Alta (protege el ingreso recurrente, "el ingreso real" del negocio) | Baja (reutiliza datos y el patrón de scheduler ya usado en leadfinder) | Media (sin caso real todavía, pero el coste de construirlo es bajo) | Media | Alta | `07-customer-journey.md` (Etapas 12 y 14, reclasificado como prioridad inmediata de Fase 7, no genérica) |

## Prioridad media

| Elemento | Impacto | Esfuerzo | Urgencia | Dependencia | Riesgo de no actuar | Origen |
|---|---|---|---|---|---|---|
| R5 — SQLite single-tenant en `interemprex-dashboard` | Alta (futura) | Media | Baja (disparadores no activos hoy) | Media | Media | `03-modelo-negocio.md` |
| ~~Credencial por defecto en `leadfinder` (`admin`/`changeme`)~~ | Media | Muy baja | Baja | Baja | Bajo | **Resuelto 2026-07-07** — valores aleatorios generados, `.env` verificado gitignorado (`production-readiness-review.md`) |
| Capacidad de Gestión del crecimiento incompleta (SEO/SEM/Ads/Email) | Media (ingreso no capturado) | Alta | Baja | Media | Media | `capacidades-core.md`, `05-catalogo-servicios.md` |
| R11 — Dependencia de terceros críticos (Stripe, Overpass, Vercel) | Media-alta | Baja (mitigación, no eliminación) | Baja | Media | Media | `03-modelo-negocio.md` |
| L4 — Falta de atribución a OpenStreetMap (incumplimiento confirmado de la licencia ODbL) | Media | Muy baja | Media | Baja | Media | `auditoria-preventiva-leadfinder.md`, `06-legal-cumplimiento.md` |
| L5 — DPA con Stripe no verificado | Media | Baja | Baja | Baja | Media | `06-legal-cumplimiento.md` |
| L7 — Bloqueo real de cookies no verificado | Media | Baja-media | Baja | Baja | Media | `06-legal-cumplimiento.md` |
| L8 — Aviso legal de la web no verificado/incompleto | Baja-media | Baja | Baja | Baja | Media | `06-legal-cumplimiento.md` |
| L9 — Incertidumbre fiscal (facturación electrónica, Verifactu/Crea y Crece) | Media (regulatorio, no de datos) | N/A — requiere asesoría externa | Baja | Baja | Media | `06-legal-cumplimiento.md` |
| L10 — Sin disparador definido para cuándo `leadfinder` exige una EIPD/DPIA (Art. 35 RGPD) | Alto si se cruza el umbral | Baja (solo definir el disparador, no ejecutar la EIPD todavía) | Baja hoy | Media | Media (crece con el crecimiento de la empresa) | `06-legal-cumplimiento.md` (hallazgo de auditoría adversarial) |
| L11 — Motor D sin puerta de re-verificación legal antes de activarse | Alto si ocurre | Baja (solo añadir la condición a la puerta de activación) | Nula — D sigue latente | Media (cruza `04-arquitectura-oferta.md` y `06-legal-cumplimiento.md`) | Baja hoy | `06-legal-cumplimiento.md` (hallazgo de auditoría adversarial) |
| `interemprex-dashboard/.env` sin ninguna copia fuera de esta máquina (`AUTH_SECRET`, claves de Stripe) | Alta si esta máquina falla (la app no arranca sin él, aunque `dev.db` esté restaurado) | Media — no es el mismo mecanismo que R6, necesita un gestor de contraseñas, no una carpeta de Drive en texto plano | Baja hoy | Baja | Media | `production-readiness-review.md` (hallazgo de la reauditoría del sistema de backup, 2026-07-09) |

## Prioridad baja

| Elemento | Impacto | Esfuerzo | Urgencia | Dependencia | Riesgo de no actuar | Origen |
|---|---|---|---|---|---|---|
| R8 — Duplicidad de paneles de gestión interna | Media | Baja | Baja | Baja | Bajo | `03-modelo-negocio.md`, `duplicidad-paneles-gestion.md` |
| R4 — Riesgo de que el descuento de lanzamiento se prolongue sin disciplina | Media | Baja | Baja (tope ya fijado) | Baja | Bajo | `01-posicionamiento.md` |

## Cómo leer esta tabla

**Prioridad crítica** no significa "más impacto" — significa impacto alto combinado con urgencia real (activo hoy, no condicional a crecimiento futuro). R6 (backups) tiene impacto tan alto como R13, pero está en "alta" y no en "crítica" porque su urgencia depende de que ocurra un fallo, no de una condición ya activa como R13 (dashboard sin remoto, hoy, en este momento) o R9 (scraping ya en marcha, hoy). El esfuerzo bajo de varios elementos de prioridad alta/media (R6, la credencial de `leadfinder`) los convierte en candidatos a resolver primero pese a no ser críticos — es el tipo de decisión que esta tabla existe para hacer visible, no intuitiva.

Ningún elemento de esta tabla se resuelve en este documento — es un registro de priorización, no un plan de ejecución. Cada fase futura decide qué aborda y cuándo, con esta tabla como input, no como sustituto de esa decisión.

---

**Qué modifica**: no resuelve ninguna incidencia — clasifica y prioriza todo lo ya detectado en el proyecto bajo un criterio único, consolidando lo que antes vivía disperso en varios documentos.

**Qué documentos dependen de este**: toda fase futura que decida qué abordar primero (especialmente Fase 7, 8, 9 y 11) debe consultar esta tabla antes de decidir por intuición.

**Qué documentos deben revisarse si este cambia**: los documentos de origen de cada fila (`03-modelo-negocio.md`, `flywheel-comercial.md`, `capacidades-core.md`, `05-catalogo-servicios.md`, `auditoria-preventiva-leadfinder.md`, `duplicidad-paneles-gestion.md`, `01-posicionamiento.md`, `06-legal-cumplimiento.md`) si cambia el estado del elemento correspondiente.
