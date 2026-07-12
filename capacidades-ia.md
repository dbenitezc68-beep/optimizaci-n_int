# Capacidades de IA — INTEREMPREX

Actualizado: 2026-07-12 (línea de fecha añadida, contenido sin cambios)

Documento vivo, no una fase. Registro oficial de toda capacidad relacionada con inteligencia artificial detectada en el ecosistema, exista donde exista en el código. Regla: ninguna capacidad de IA se queda oculta dentro de un archivo sin registrar aquí.

## 1. Generación de auditoría de leads con IA (`leadfinder`)

- **Dónde existe**: `leadfinder/app/models.py` (campos `audit_summary`, `audit_proposal`, `audit_generated_at` en el modelo `Lead`), función descrita en `.env.example` como "Generar auditoría con IA" desde el dashboard.
- **Qué hace**: genera, para un lead concreto, un resumen y una propuesta (presumiblemente de por qué es un buen prospecto y cómo abordarlo) usando IA.
- **Qué modelo utiliza**: Claude, configurado como `claude-haiku-4-5-20251001` por defecto (variable `ANTHROPIC_MODEL`, editable).
- **En qué estado está**: construida en el código — modelo de datos, variable de entorno y función descritos, no es un plan futuro.
- **¿Se usa realmente?**: no verificado. Depende de si `ANTHROPIC_API_KEY` tiene una clave real configurada en el `.env` de producción/uso — no se ha inspeccionado esa clave concreta (no hacía falta para las preguntas de riesgo ya resueltas). Sin clave, el propio `.env.example` indica que el botón "mostrará un aviso" en vez de funcionar.
- **¿Está integrada en la oferta?**: no. No aparece mencionada en `01-posicionamiento.md`, en `precios-y-packs.md` ni en ningún servicio de `03-modelo-negocio.md` o `04-arquitectura-oferta.md`. Es una herramienta interna de `leadfinder`, no algo que se venda o mencione a clientes.

## Herramientas de gestión interna basadas en Claude Code (categoría aparte)

Existen varias skills de Claude Code en `.claude/skills/` (`crear-skill`, `gestion-interemprex`, `actualizar-leads`, y otras no relacionadas con INTEREMPREX) que usan IA para ayudar a gestionar el propio negocio — incluida la que ha generado este mismo repositorio de estrategia. **No se clasifican como "capacidades de IA de producto"** porque no son algo que el cliente use o compre — son herramientas de trabajo del fundador. Se anota su existencia para que quede registrada, pero no se detalla cada una aquí; si en el futuro alguna se ofrece como servicio a clientes, pasa a documentarse como capacidad de producto.

## Capacidades de IA no encontradas en otros sistemas

- `interemprex-dashboard` (CRM): sin dependencias de IA en su `package.json`, sin capacidad de IA detectada.
- `interemprex` (web pública): sin capacidad de IA, sitio estático.
- `bbabogados`, `costafloragardens`: sitios estáticos de cliente, sin capacidad de IA.

## Por qué esto importa para fases futuras

- **Fase 5 (Legal)**: la parte de "uso de IA" en el alcance legal debe cubrir esta capacidad, aunque no esté integrada en la oferta — procesa datos de terceros (leads) con un modelo externo (Anthropic), lo cual es relevante para RGPD independientemente de si se vende o no.
- **Fase 10 (IA)**: esta capacidad ya construida es el punto de partida real para diseñar la estrategia de IA de la empresa — no se empieza de cero, ya hay una integración funcionando en un sistema.
- **Fase 4 (Catálogo) / Fase 12 (Marketing)**: si INTEREMPREX quiere que "usamos IA aplicada" sea una afirmación verificable (coherente con `02-principios-fundacionales.md`, principio 8 — no vender la etiqueta "IA" sin automatización real detrás), esta es la prueba disponible más cercana a un caso de uso real, aunque hoy sea interna.

---

**Qué modifica**: no fija decisiones — registra dónde existe IA real en el ecosistema, para que ninguna decisión futura sobre "estrategia de IA" (Fase 10) empiece asumiendo que no hay nada construido.

**Qué documentos dependen de este**: la futura Fase 5 (Legal, uso de IA) y Fase 10 (IA) parten de este registro. `inventario-tecnologico.md` referencia esta capacidad desde la fila de Anthropic en APIs.

**Qué documentos deben revisarse si este cambia**: `inventario-tecnologico.md` y, cuando existan, los documentos de Fase 5 y Fase 10.
