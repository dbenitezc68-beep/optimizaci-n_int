# Mini auditoría preventiva — LeadFinder

Documento de hechos, no de conclusiones legales. Responde al riesgo R9 registrado en `03-modelo-negocio.md`. Por instrucción explícita del 2026-07-02: **no propone solución legal** — es la base fáctica sobre la que Fase 5 (Legal y Cumplimiento) trabajará cuando llegue en su orden. Hechos verificados leyendo el código real de `leadfinder`, no supuestos.

## Fuentes de datos

- **OpenStreetMap, vía API pública de Overpass** (`app/collectors/osm_overpass.py`). Es la única fuente activa.
- **Google Places** (`app/collectors/google_places.py`): módulo preparado en el código pero inactivo — `GOOGLE_PLACES_API_KEY` viene vacío por defecto en `.env.example`. No se está usando hoy.
- El recolector sigue buenas prácticas técnicas de acceso a Overpass: peticiones secuenciales (nunca en paralelo), timeout explícito, backoff ante errores 429/504, User-Agent identificable y mirrors de respaldo — así lo documenta el propio código.

## Licencias

- Los datos de OpenStreetMap se distribuyen bajo **Open Database License (ODbL) 1.0**. Es un hecho de licencia conocido, no una interpretación: la ODbL exige, como mínimo, atribución a OpenStreetMap y sus colaboradores en cualquier uso público de los datos o de trabajos derivados de ellos.
- Si en el futuro se exportara o revendiera la base de datos de leads como tal (no solo su uso interno para prospección), la ODbL puede exigir que esa base derivada se licencie también en condiciones compatibles ("share-alike" de base de datos) — si el uso se limita a generar leads para contacto comercial propio ("produced work"), la obligación típica se reduce a atribución. Cuál de los dos escenarios aplica al uso real de INTEREMPREX es una determinación legal, no técnica — corresponde a Fase 5.
- No hay evidencia de que exista hoy ningún texto de atribución a OpenStreetMap en ningún documento o interfaz de INTEREMPREX revisado hasta ahora.

## Naturaleza de los datos

Según `app/models.py`, cada "lead" almacena: nombre del negocio, dirección, ciudad, provincia, código postal, coordenadas, enlace a mapa, categoría, **teléfono, email**, web (si tiene), enlaces a redes sociales, y una puntuación de potencial con motivo. Además guarda campos de flujo de trabajo (estado, notas, fecha de contacto) y de auditoría con IA (ver más abajo).

Son datos de **negocios**, no de personas a título individual — pero en el caso de autónomos o profesionales que operan bajo su propio nombre, el teléfono/email de "el negocio" puede coincidir con un dato de carácter personal de una persona física identificable. Esa distinción — cuándo un dato de negocio es también un dato personal bajo RGPD/LOPDGDD — es exactamente el tipo de determinación que corresponde a Fase 5, no se resuelve aquí.

**Hallazgo adicional no buscado explícitamente pero relevante**: el modelo ya incluye campos `audit_summary`, `audit_proposal` y `audit_generated_at`, y el `.env.example` documenta una función real de "Generar auditoría con IA" usando la API de Anthropic (Claude Haiku) sobre cada lead. Es una capacidad de IA ya construida y en uso potencial, no solo planeada — relevante para cuando Fase 10 (IA) y la revisión legal secundaria de "uso de IA" (dependiente de Fase 10, ya anotada en el roadmap) se aborden.

## Almacenamiento

- Base de datos local **SQLite** (`leadfinder.db`) por defecto. El propio README de `leadfinder` advierte que SQLite "no es apropiado para producción" en plataformas con filesystem efímero, y documenta cómo pasar a Postgres vía `DATABASE_URL` si se despliega en Railway/Render/Heroku-like.
- Hoy no hay evidencia de que `leadfinder` esté desplegado en un entorno de producción — el `railway.json` existe como configuración preparada, no como confirmación de despliegue activo.

## Retención

- **No se ha encontrado ninguna política de retención o borrado automático** en el código revisado (`app/models.py`, `app/routers/`, `app/services/`) — no hay campo de expiración, tarea programada de purga, ni lógica de anonimización. Los leads se conservan indefinidamente salvo intervención manual de cambio de estado.
- Esto es un hecho de ausencia, no una acusación: significa que, si RGPD/LOPDGDD exige un plazo de conservación para datos que resulten ser personales, hoy no existe ningún mecanismo técnico que lo haga cumplir automáticamente.

## Accesos

- El dashboard de `leadfinder` **sí tiene autenticación propia** (`app/auth.py`, `app/security.py`, `app/routers/auth.py`): usuarios con contraseña con hash, roles (`user` / `admin`), sesión de servidor. No es de acceso público abierto.
- **Riesgo de configuración, no de diseño**: `.env.example` documenta credenciales de ejemplo (`DASHBOARD_USERNAME=admin`, `DASHBOARD_PASSWORD=changeme`) y un `SECRET_KEY=cambia-esto-en-produccion` como placeholder. Si estos valores no se han cambiado en el entorno real de ejecución, es un acceso trivialmente adivinable — no se ha verificado si se cambiaron porque el contenido real de `.env` no es legible desde aquí (solo `.env.example`).

## Riesgos identificados (solo enumerados, sin solución)

1. Falta de atribución visible a OpenStreetMap en cualquier superficie pública de INTEREMPREX.
2. Ambigüedad sin resolver sobre si algunos registros de "negocio" constituyen datos personales bajo RGPD/LOPDGDD (caso autónomos).
3. Ausencia de política de retención/borrado automático.
4. Posible uso de credenciales de ejemplo sin cambiar en el entorno real (no verificado, solo señalado como posible).
5. Base de datos SQLite local — coincide con el mismo patrón de riesgo tecnológico R5 ya documentado para `interemprex-dashboard`, aquí aplicado a `leadfinder`.
6. Capacidad de IA ya activa (auditoría de leads con Claude) sin que exista todavía ninguna política de uso de IA documentada (Fase 5, dependiente de Fase 10).

Ninguno de estos seis puntos se resuelve en este documento — quedan como entrada de hechos para cuando Fase 5 (Legal y Cumplimiento) comience.

## Verificación de riesgo inmediato (2026-07-02) — solo lectura, ningún cambio de código

Se comprobó directamente el archivo `.env` real de `leadfinder` (no el `.env.example`), leyendo solo las claves necesarias para responder tres preguntas concretas, sin exponer valores de otras claves (Stripe, Anthropic, etc.) que no venían al caso.

1. **¿Sigue existiendo la credencial por defecto?** Sí, confirmado: `DASHBOARD_USERNAME=admin`, `DASHBOARD_PASSWORD=changeme` y `SECRET_KEY=cambia-esto-en-produccion` siguen siendo, los tres, el valor de ejemplo de `.env.example` — no se han cambiado.
2. **¿Pertenece solo al entorno de desarrollo?** Todo indica que sí, por tres señales conjuntas: `DATABASE_URL` usa el esquema `sqlite` (no un Postgres remoto), `ENABLE_INPROCESS_SCHEDULER=false` (el recolector no corre de forma persistente en segundo plano), y no hay ninguna evidencia de que el servicio esté desplegado en Railway/Render — `railway.json` es configuración preparada, no prueba de despliegue activo.
3. **¿Puede afectar a un entorno accesible?** Con la evidencia disponible, no hay ningún entorno accesible detectado hoy — el patrón completo apunta a un `leadfinder` que corre solo en local. Esto es una inferencia a partir de la configuración, no una certeza absoluta: no se puede descartar al 100% un despliegue pasado o puntual con esta misma configuración.

**Conclusión — no se eleva como incidencia por encima del roadmap.** No hay evidencia de exposición real hoy, así que no se trata como emergencia. Pero es una corrección de coste cero (cambiar tres valores de un `.env`) que no debería esperar a la Fase 11 (Tecnología) si en algún momento se despliega `leadfinder` fuera de local — se registra como tarea de bajo esfuerzo / alta conveniencia, no como incidencia urgente, y se añade a `inventario-tecnologico.md`.

---

**Qué modifica**: no modifica ninguna decisión previa — añade una capa de hechos verificados sobre `leadfinder` que no existía en ningún documento anterior, incluida la verificación puntual de la credencial por defecto (2026-07-02).

**Qué documentos dependen de este**: la futura Fase 5 (Legal y Cumplimiento) parte directamente de estos hechos. `03-modelo-negocio.md` referencia este documento desde el riesgo R9. `inventario-tecnologico.md` registra la credencial por defecto como tarea pendiente de bajo esfuerzo.

**Qué documentos deben revisarse si este cambia**: `03-modelo-negocio.md` (riesgo R9), `inventario-tecnologico.md` y, cuando exista, el documento de Fase 5.
