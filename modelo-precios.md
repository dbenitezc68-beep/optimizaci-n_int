# Modelo de precios — procedimiento, no cifras

Este documento define **cómo se calculará** el precio de cada servicio, no cuánto cuesta cada uno. Ningún número de este documento es un precio — donde aparece una cifra en `05-catalogo-servicios.md` hoy, viene de `precios-y-packs.md` (investigación de mercado real) y de la tarifa de lanzamiento de `01-posicionamiento.md`, no de este modelo. Este modelo se activa en Fase 7 (para cotizaciones caso a caso) y en Fase 14 (para recalcular el catálogo completo con datos reales de coste).

## Por qué no basta con comparar contra el mercado

`precios-y-packs.md` fija precios como "media de mercado menos 25 %" — es una base de lanzamiento razonable para entrar, pero no es un modelo: no explica por qué un servicio vale lo que vale para INTEREMPREX específicamente, ni se ajusta cuando una capacidad Core se vuelve más reutilizable o más automatizada. Este modelo sí.

## Los ocho factores, en el orden en que se aplican

### 1. Coste de entrega (base)

Tiempo estimado real × coste/hora interno. El coste/hora es un dato pendiente de Fase 14 — hasta entonces, ningún precio de este modelo se calcula con una cifra final, solo se deja preparada la fórmula.

### 2. Ajuste por reutilización

Si el servicio se apoya en una capacidad Core de reutilización "alta" (`capacidades-core.md`), el tiempo estimado de entrega baja frente a construir desde cero — esto reduce el coste base directamente, no es un descuento aparte sobre el precio final. Un servicio que reutiliza mucho debe costar menos entregarlo, aunque se venda al mismo precio (ver factor 8).

### 3. Ajuste por automatización

Si una parte del proceso ya está automatizada (ejemplo: capacidad 5, cobro recurrente vía Stripe), esas horas no se cuentan como coste de entrega. La diferencia no se traduce en precio más bajo — se traduce en más margen (factor 8), porque bajar el precio cuando el coste baja por eficiencia interna, sin que cambie el valor entregado al cliente, contradice el posicionamiento premium (factor 5).

### 4. Multiplicador de valor para el cliente

Servicios que resuelven un problema de mayor impacto (Nivel 3 de cualquier motor, por definición de `05-catalogo-servicios.md`) llevan un multiplicador sobre el coste base — el precio no es solo "horas × tarifa", refleja lo que el cliente gana o deja de perder. Este multiplicador es cualitativo hasta que existan casos reales que lo calibren (Fase 14).

### 5. Suelo de posicionamiento premium

El precio resultante de los factores 1-4 nunca se fija por debajo de la media de mercado de forma permanente — esa decisión ya se tomó en Fase 1 (tarifa de lanzamiento es temporal, con tope, no la política de precios). Este factor actúa como suelo, no como referencia principal: el modelo no calcula "cuánto cobra la competencia", calcula cuánto vale el servicio y después verifica que no cae por debajo de ese suelo.

### 6. Ajuste por recurrencia

En Motor B (recurrente), se puede aceptar un margen inicial más bajo que en Motor A o C (pago único), porque el valor se recupera a lo largo de la relación (LTV) — no en la primera factura. Este ajuste requiere conocer el LTV real de un cliente (Fase 14); hasta entonces, Motor B no se infravalora por adelantado sin ese dato.

### 7. Recargo por complejidad operativa futura

Servicios que generan carga de soporte o mantenimiento posterior (por ejemplo, Motor C Nivel 3, que casi siempre necesita seguimiento) incorporan un recargo que financia esa carga futura en el momento de la venta — en vez de asumirla gratis dentro de Motor B más adelante, que es exactamente el tipo de error que ya se corrigió al separar los niveles de servicio en `05-catalogo-servicios.md`.

### 8. Margen objetivo mínimo

Cualquier precio final debe superar un margen mínimo — la cifra concreta es un dato pendiente de Fase 14, no se inventa aquí. Si un servicio no alcanza ese margen mínimo al precio calculado, no se ofrece a ese precio: se recotiza con el cliente o se declina, nunca se vende por debajo del mínimo por conveniencia comercial puntual.

## Cómo se usa esto en la práctica

- **En cotizaciones caso a caso** (Motor A Nivel 3, Motor C Nivel 3, ya marcados como "cotización caso a caso" en `05-catalogo-servicios.md`): se recorren los ocho factores en orden, con las mejores estimaciones disponibles en ese momento — es más riguroso que "poner un número que suene bien", aunque no sea perfecto sin datos históricos.
- **En Fase 14**: se recalcula todo `05-catalogo-servicios.md` con datos reales de coste/hora, LTV y margen mínimo — este modelo es el procedimiento que Fase 14 ejecuta, no algo que Fase 14 vuelve a diseñar desde cero.

---

**Qué modifica**: no fija ningún precio — define el procedimiento con el que se calculará todo precio futuro, sustituyendo "comparar con el mercado" como único criterio.

**Qué documentos dependen de este**: Fase 7 (cotizaciones caso a caso) y Fase 14 (recálculo completo del catálogo) deben aplicar este procedimiento en vez de fijar precios por intuición o solo por referencia de mercado.

**Qué documentos deben revisarse si este cambia**: `05-catalogo-servicios.md` (los precios que hoy vienen de `precios-y-packs.md` deberán recalcularse con este modelo en cuanto haya datos) y `01-posicionamiento.md` (el suelo de posicionamiento premium, factor 5, depende de lo ya decidido ahí).
