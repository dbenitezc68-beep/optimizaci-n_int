# Inventario tecnológico — INTEREMPREX

Documento vivo, no una fase. Inventario oficial de todo lo técnico verificado hasta ahora. Se actualiza cada vez que una fase descubre o crea un sistema, dominio, API, proveedor o dependencia nueva — no se rellena de una vez y se olvida.

## Repositorios

| Repo | Remoto GitHub | Contenido |
|---|---|---|
| `interemprex` | `github.com/dbenitezc68-beep/interemprex` | Web pública de INTEREMPREX |
| `interemprex-dashboard` | **sin remoto configurado** — repo git solo local | CRM interno |
| `leadfinder` | `github.com/dbenitezc68-beep/leadfinder` | Motor de prospección |
| `bbabogados` | `github.com/dbenitezc68-beep/bbabogados` | Cliente piloto (abogados) |
| `costafloragardens` | `github.com/dbenitezc68-beep/costafloragardens` | Cliente piloto (jardinería) |
| `mundial2026` / `calculadora-mundial2026` | sin remoto verificado / no es repo git | Calculadora de apuestas Mundial 2026 — sin relación aparente con INTEREMPREX |
| `optimizaci-n_int` | `github.com/dbenitezc68-beep/optimizaci-n_int` | Este repositorio de estrategia |

**Detectados, no analizados**: `moondial`, `sistema-gestor-cartera` — existen en el directorio raíz del monorepo, no se ha verificado su relación con INTEREMPREX. `sistema-gestor-cartera` coincide con la skill `gestor-cartera-deportiva.md`, que por su nombre parece un proyecto personal no relacionado. No se documentan en detalle porque no se ha confirmado que pertenezcan al alcance de este proyecto.

**Incidencia crítica de continuidad de negocio (R13, ver `03-modelo-negocio.md`)**: `interemprex-dashboard` — el sistema que sostiene el motor de ingresos real (B, operación continua, con Stripe) — no tiene remoto en GitHub. Es la única pieza crítica de negocio sin respaldo fuera de la máquina local. Procedimiento de corrección documentado, sin ejecutar todavía por instrucción explícita.

## Aplicaciones

- **`interemprex`** — sitio de marketing, HTML5 estático puro, sin build ni framework.
- **`interemprex-dashboard`** — Next.js 16 (App Router, TypeScript), CRM interno con clientes, pipeline, tareas, pagos.
- **`leadfinder`** — FastAPI (Python), dashboard de prospección con autenticación por sesión y roles.
- **`bbabogados`** — sitio estático, cliente piloto, en producción.
- **`costafloragardens`** — sitio estático, cliente piloto, construido, sin desplegar.
- **`dashboard-interemprex.html`** — panel de cumplimiento generado por la skill `gestion-interemprex`, HTML estático sin backend, hoy vacío (ver `duplicidad-paneles-gestion.md`).

## Dominios

| Dominio | Estado verificado |
|---|---|
| `www.interemprex.com` | Aparece como canonical en el HTML — **no verificado si está registrado y apuntando** a ningún hosting real. |
| `www.barrerabenitez-cano.com` | Confirmado — `vercel.json` de `bbabogados` lo referencia y el sitio está en producción. |
| costafloragardens | No hay dominio especificado en ningún archivo del proyecto. |

## Bases de datos

- **`interemprex-dashboard`**: SQLite (`dev.db`) vía Prisma con adaptador `better-sqlite3`. Riesgo R5 (single-tenant) ya documentado en `03-modelo-negocio.md`. **Backup automático diario desde 2026-07-09** — ver Automatizaciones y Servicios cloud, abajo.
- **`leadfinder`**: SQLite (`leadfinder.db`, esquema `sqlite://` confirmado en `.env` real) vía SQLAlchemy. Mismo patrón de riesgo que R5, documentado en `auditoria-preventiva-leadfinder.md`.
- **Panel de cumplimiento**: sin base de datos — JSON plano (`interemprex.json`), regenerado bajo demanda.

## APIs (consumidas, no propias)

- **Stripe** — pagos y webhooks, en `interemprex-dashboard`.
- **OpenStreetMap Overpass API** — fuente primaria de datos de `leadfinder`, pública, sin clave.
- **Google Places API** — módulo preparado en `leadfinder`, **inactivo** (`GOOGLE_PLACES_API_KEY` vacío).
- **Anthropic (Claude)** — función "Generar auditoría con IA" en `leadfinder`, modelo configurado `claude-haiku-4-5-20251001`. Ver `capacidades-ia.md`.
- **Web3Forms** — formulario de contacto de `interemprex` (web pública). Tiene una clave de acceso pública embebida en el HTML — por diseño de Web3Forms esa clave no es secreta, pero no se repite su valor aquí por disciplina de "solo referencia".

## Proveedores

- **Vercel** — hosting (`bbabogados` confirmado en producción).
- **Stripe** — procesamiento de pagos.
- **GitHub** — control de versiones (todos los repos con remoto, salvo `interemprex-dashboard`).
- **Railway** — configuración preparada para `leadfinder` (`railway.json`, `Procfile`), **no confirmado desplegado**.
- Registrador de dominio(s): no identificado en ningún archivo revisado.

## Herramientas / frameworks

- `interemprex-dashboard`: Next.js 16, React 19, Prisma 7, Tailwind v4, `jose` (JWT), `bcryptjs`, `recharts`.
- `leadfinder`: FastAPI, SQLAlchemy, Alembic (migraciones), APScheduler (recolección programada), `httpx`.
- `interemprex`: GSAP (animaciones), Google Fonts.

## Automatizaciones ya activas (no propuestas — reales)

1. **Recolección de leads** (`leadfinder`) — vía `scripts/run_collector` o tarea programada del sistema operativo; puede activarse también con `ENABLE_INPROCESS_SCHEDULER=true` (hoy en `false`).
2. **Sincronización de pagos/MRR** (`interemprex-dashboard`) — webhooks de Stripe en `/api/stripe/webhook`.
3. **Generación de auditoría de leads con IA** (`leadfinder`) — bajo demanda, no programada, ver `capacidades-ia.md`.
4. **Backup diario de `dev.db`** (`interemprex-dashboard`, desde 2026-07-09) — tarea programada de Windows (`INTEREMPREX-CRM-Backup`, diaria 02:00, con reintento si el equipo estaba apagado), ejecuta `interemprex-dashboard/scripts/backup-db.js`: backup vía la API nativa de SQLite (no copia de archivo), verificado con `integrity_check` tras cada ejecución, retención de las 30 copias más recientes. Detalle completo y procedimiento de recuperación en `production-readiness-review.md`.

**Hallazgo relevante, no buscado explícitamente**: **`leadfinder` y `interemprex-dashboard` no están conectados entre sí.** Son dos sistemas independientes — un lead capturado y puntuado en `leadfinder` no pasa automáticamente al pipeline de `interemprex-dashboard`; hay que moverlo a mano (o exportar/importar CSV). El motor de prospección propio y el CRM propio, las dos piezas más mencionadas como ventaja competitiva en `01-posicionamiento.md`, hoy son silos. Es una oportunidad de automatización real para la Fase 9, no un defecto de diseño — se registra aquí para que no se pierda.

## Servicios cloud

- Vercel (hosting estático, confirmado para `bbabogados`).
- Railway (preparado, no confirmado activo, para `leadfinder`).
- **Google Drive (modo Streaming, cuenta personal del fundador)** — destino del backup diario de `interemprex-dashboard/dev.db`, desde 2026-07-09. Montado como unidad `G:\Mi unidad` en la máquina del fundador, no como carpeta local sincronizada — detalle en `production-readiness-review.md`.
- Sin evidencia de uso de AWS/GCP/Azure en ningún proyecto revisado.

## Entornos

- **Local/desarrollo**: `interemprex-dashboard` y `leadfinder` corren en SQLite local; es el entorno confirmado hoy para ambos.
- **Producción confirmada**: solo `bbabogados` (Vercel).
- **Producción no confirmada**: `interemprex` (dominio canonical sin verificar), `costafloragardens` (sin desplegar), `interemprex-dashboard` y `leadfinder` (sin evidencia de despliegue).

## Credenciales (solo referencia — nunca valores)

| Sistema | Variables relevantes | Estado verificado el 2026-07-02 |
|---|---|---|
| `interemprex-dashboard/.env` | `DATABASE_URL`, `STRIPE_SECRET_KEY`, `STRIPE_PUBLISHABLE_KEY`, `STRIPE_WEBHOOK_SECRET` | Existe, contenido no inspeccionado (no hacía falta para ninguna pregunta abierta) |
| `leadfinder/.env` | `DATABASE_URL`, `OVERPASS_USER_AGENT`, `GOOGLE_PLACES_API_KEY`, `ANTHROPIC_API_KEY`, `SECRET_KEY`, `DASHBOARD_USERNAME`, `DASHBOARD_PASSWORD` | **Resuelto 2026-07-07**: `DASHBOARD_PASSWORD` y `SECRET_KEY` corregidos a valores aleatorios (ver `production-readiness-review.md`); `DASHBOARD_USERNAME` sigue siendo `admin` deliberadamente (no era el riesgo señalado). |
| `interemprex` (web pública) | Clave de acceso de Web3Forms | Embebida en el HTML por diseño del servicio (no es secreta) |

## Dependencias entre sistemas

- `interemprex-dashboard` → depende de Stripe (pagos), de su propia base SQLite local, y desde 2026-07-09 de Google Drive (cuenta personal del fundador) para el backup diario — ver Servicios cloud.
- `leadfinder` → depende de OpenStreetMap Overpass (obligatoria), Google Places (opcional, inactiva), Anthropic/Claude (opcional, bajo demanda).
- `interemprex` (web) → depende de Web3Forms para el formulario de contacto. **No está conectada a `interemprex-dashboard` ni a `leadfinder`** — un contacto desde la web no crea automáticamente un lead o cliente en el CRM.
- `leadfinder` ↔ `interemprex-dashboard` → **sin conexión** (ver hallazgo en Automatizaciones).
- `dashboard-interemprex.html` → sin dependencias externas, aislado del resto.

---

**Qué modifica**: no fija decisiones de negocio — registra el estado técnico real verificado del ecosistema completo de INTEREMPREX.

**Qué documentos dependen de este**: `03-modelo-negocio.md` (riesgos R5, R6, R8, R11, R12), `04-arquitectura-oferta.md` (auditoría final de Fase 3), la futura Fase 5 (Legal), Fase 9 (Automatizaciones — hallazgo de silos) y Fase 11 (Tecnología).

**Qué documentos deben revisarse si este cambia**: `03-modelo-negocio.md` y `auditoria-preventiva-leadfinder.md`, si el cambio afecta a un riesgo ya documentado en ellos.
