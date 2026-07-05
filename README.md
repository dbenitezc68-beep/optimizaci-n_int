# INTEREMPREX — Panel de gestión

Dashboard interno para INTEREMPREX: clientes, procesos, pipeline de ventas, tareas y pagos (Stripe) en un solo sitio.

## Stack

- Next.js 16 (App Router, TypeScript, Tailwind v4)
- Prisma 7 + SQLite (adaptador `@prisma/adapter-better-sqlite3`)
- Autenticación propia por sesión firmada (JWT en cookie httpOnly, `jose` + `bcryptjs`)
- Stripe (sincronización, webhooks, links de pago, métricas de MRR)

## Primeros pasos

```bash
npm install
cp .env.example .env        # y edita los valores
npx prisma migrate deploy   # crea la base de datos SQLite
npm run db:seed             # crea el usuario admin inicial
npm run dev
```

Usuario inicial: el seed crea `admin@interemprex.com` con una **contraseña aleatoria que se imprime una única vez por consola** (guárdala en tu gestor de contraseñas). Puedes fijar otras credenciales definiendo `SEED_ADMIN_EMAIL` / `SEED_ADMIN_PASSWORD` antes de seedear, y cambiar la contraseña en cualquier momento desde **Ajustes** (al cambiarla se cierran las sesiones del resto de dispositivos).

El login limita los intentos fallidos (5 por IP+email cada 15 minutos).

## Conectar Stripe

1. Copia tu clave secreta desde **Stripe Dashboard → Developers → API keys** y pégala en `STRIPE_SECRET_KEY` dentro de `.env`.
2. Para probar webhooks en local, instala el [Stripe CLI](https://stripe.com/docs/stripe-cli) y ejecuta:
   ```bash
   stripe listen --forward-to http://localhost:3000/api/stripe/webhook
   ```
   Copia el `whsec_...` que te da en `STRIPE_WEBHOOK_SECRET`.
3. En producción, crea un endpoint de webhook en el Dashboard de Stripe apuntando a `https://tu-dominio.com/api/stripe/webhook` y copia su secreto firmante.
4. Reinicia el servidor tras editar `.env`.

Desde **Ajustes** en el panel puedes ver si las claves están configuradas y los últimos eventos de Stripe recibidos.

## Qué incluye

- **Clientes**: expediente completo — resumen financiero (cobrado, pendiente, recurrente mensual, procesos activos), contacto con enlaces directos, origen (lead convertido o alta directa), procesos, tareas, suscripciones e historial económico unificado (pagos Stripe/manuales, facturas y links de pago con fechas). **Importación masiva por CSV** (cabeceras en español o inglés, separador autodetectado, dedup por email — reimportar no duplica).
- **Procesos**: proyectos/servicios por cliente con estado, presupuesto y fechas.
- **Seguimiento post-venta**: registro de actividad en el expediente del cliente y en cada proceso — notas, llamadas, reuniones, incidencias (con estado abierta/resuelta y aviso en el expediente) y entregables con enlace, todo fechado.
- **Pipeline**: leads por etapa (nuevo → contactado → propuesta → negociación → ganado/perdido), con ficha de detalle/edición y conversión directa a cliente.
- **Importación desde LeadFinder**: botón "Importar de LeadFinder" en el pipeline. Configura `LEADFINDER_DB_PATH` en `.env` con la ruta al `leadfinder.db` del motor de prospección; la importación es de solo lectura, filtra por nivel de interés, excluye descartados/cerrados y nunca duplica (clave estable por negocio).
- **Tareas**: tareas internas asociables a cliente y/o proceso.
- **Pagos**: sincronización manual con Stripe (pagos, suscripciones, facturas), creación de links de pago desde el panel, **registro de pagos manuales** (transferencia, efectivo, Bizum — con fecha real de cobro, estado pendiente/cobrado y acciones de marcar cobrado o eliminar), y MRR/ingresos calculados automáticamente en el resumen incluyendo ambos orígenes.
- **Webhooks**: `/api/stripe/webhook` mantiene los datos al día en tiempo real (pagos, suscripciones, facturas).

## Base de datos

SQLite por defecto (`dev.db`), pensado para uso local/single-tenant. Para producción en una plataforma sin disco persistente, cambia el `datasource` de `prisma/schema.prisma` a Postgres y actualiza `DATABASE_URL` — el resto del código no depende del motor de base de datos.

## Comandos

```bash
npm run dev          # desarrollo
npm run build        # build de producción
npm run start        # servidor de producción
npm run lint         # ESLint
npm run db:seed      # crear/asegurar el usuario admin
npm run db:backup    # backup verificado de la base de datos en backups/
npm run db:studio    # Prisma Studio (explorar la base de datos)
```

## Backups

`npm run db:backup` crea una copia consistente de la base de datos (API de backup online de SQLite, segura aunque la app esté en marcha), verifica su integridad (`PRAGMA integrity_check`) y conserva las últimas 14 copias en `backups/` (fuera de git). La carpeta vive en el mismo disco que la base: copia periódicamente su contenido a otro medio (nube o disco externo) para tener un backup real ante fallo de disco.
