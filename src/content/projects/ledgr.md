---
title: "Ledgr — Boilerplate SaaS Multi-Tenant con Ledger y Split Payments"
description: "Boilerplate de estudio para un marketplace SaaS multi-tenant: aislamiento de datos vía PostgreSQL Row-Level Security, ledger contable append-only con split payments y deduplicación de webhooks al estilo Stripe."
type: "personal"
category: "SaaS"
technologies: ["TypeScript", "Next.js", "Fastify", "PostgreSQL", "Redis", "Turborepo", "Docker"]
github: "https://github.com/KamerrEzz/ledgr"
featured: true
star: true
order: 1
status: "completed"
date: "2026-07-06"
startDate: "2026-07-06"
role: "Desarrollador Principal"
---

Ledgr nació de una pregunta que me perseguía cada vez que armaba una demo de pagos: ¿qué pasa el día que un webhook llega duplicado? ¿Y si dos tenants comparten la misma base de datos y alguien olvida el `WHERE tenant_id = ?` en una query? Los tutoriales de "marketplace SaaS" casi nunca responden eso — resuelven el CRUD y dejan el dinero para después.

**Ledgr es al revés**: es un boilerplate de estudio que empieza justo donde los demás terminan. El dominio es intencionalmente genérico — "recursos" e "items" en vez de "cursos" o "tickets" — para que sirva de base a cualquier marketplace real (venta de entradas, plataforma de cursos, servicios).

## 🎯 Objetivo

Construir, de punta a punta, los tres problemas que hacen que un SaaS con pagos sea difícil de verdad:

1. **Multi-tenancy que no se pueda romper por accidente** — aislamiento a nivel de base de datos, no solo en el código de la aplicación.
2. **Un ledger contable real** — registros inmutables, con split payments (90% tenant / 10% plataforma) y balance calculado, nunca cacheado.
3. **Idempotencia de webhooks** — porque las pasarelas de pago reales (Stripe, Conekta) reenvían el mismo evento más de una vez.

## 🧱 Stack & Arquitectura

- **Frontend**: Next.js 15 (App Router) + Tailwind CSS
- **Backend**: Fastify + TypeScript
- **Base de datos**: PostgreSQL 16 con Row-Level Security
- **Cache / colas**: Redis 7 (pub/sub)
- **Cliente de datos**: `postgres.js` — sin ORM, a propósito
- **Monorepo**: pnpm workspaces + Turborepo
- **Infra**: Docker Compose

```
┌─────────────┐     ┌──────────────┐     ┌──────────────┐
│  Web :3000  │────▶│ Backend :3001│────▶│ Postgres :5432│
│  Next.js    │     │   Fastify    │     │  RLS enforced │
└─────────────┘     └──────┬───────┘     └──────────────┘
                           │
                           │ webhook
                           │
                    ┌──────▼───────┐
                    │ Payment Mock │
                    │   :3002      │
                    └──────────────┘
                           │
                    ┌──────▼───────┐
                    │  Redis :6379 │
                    │  pub/sub     │
                    └──────────────┘
```

El monorepo separa `apps/backend`, `apps/web` y `apps/payment-gateway-mock` (un simulador de pasarela que manda webhooks duplicados a propósito), más `packages/db`, `packages/shared-types` y `packages/event-bus`.

### Multi-tenancy con RLS, no con `WHERE`

Cada query corre dentro de una transacción con `SET LOCAL app.current_tenant_id`. Las políticas RLS de Postgres filtran las filas automáticamente — aunque el código de la aplicación se olvide del filtro por tenant, la base de datos devuelve cero filas, no datos de otro tenant.

```typescript
withTenantSql(tenantId, async (tx) => {
  return tx`SELECT * FROM resources`; // RLS hace el aislamiento, no el código
});
```

### Ledger append-only

Cada pago exitoso genera **exactamente 2 asientos**: un crédito al tenant (90%) y un débito por la comisión de la plataforma (10%). El balance se calcula siempre con `SUM()` sobre los asientos — nunca se guarda como columna mutable, así una fila corrupta no puede desincronizar el balance real.

### Idempotencia de webhooks

El mock de pagos envía entre 2 y 3 webhooks duplicados por pago (separados 500-3000ms), simulando el comportamiento real de una pasarela. El backend deduplica con la cabecera `X-Webhook-Id` más una restricción `UNIQUE` en la tabla `webhook_events` — si el mismo evento llega dos veces, la segunda inserción falla y el handler responde `duplicate` sin reprocesar nada.

### Máquina de estados de la orden

```
draft ──▶ pending_payment ──▶ paid ──▶ fulfilled ──▶ refunded
                  │
                  └──▶ failed
```

Las transiciones se validan explícitamente y quedan auditadas en `order_status_transitions` — pedir un salto inválido (por ejemplo `draft → fulfilled`) devuelve 400 en vez de dejar la orden en un estado imposible.

## 🧩 Decisiones de diseño

- **RLS en vez de middleware de tenant**: un bug en el código de la aplicación no puede filtrar datos entre tenants, porque el aislamiento vive en la base de datos, no en una capa que se pueda olvidar.
- **Sin ORM**: `postgres.js` a mano fuerza a escribir y entender el SQL real, algo que un ORM tiende a esconder justo en las partes más delicadas (transacciones, `SET LOCAL`, RLS).
- **Ledger inmutable sobre balance mutable**: perder la capacidad de "corregir" una fila es la garantía — cualquier ajuste es un asiento nuevo, no un `UPDATE`.

## 📚 Qué aprendí

- **RLS de Postgres** como mecanismo de seguridad real, no como documentación: probar que una query sin `WHERE tenant_id` devuelve `[]` en vez de datos de otro tenant.
- **Diseñar para reintentos** desde el día uno — cualquier integración de pagos reales reenvía eventos, y el sistema tiene que ser indiferente a eso.
- **Turborepo + pnpm workspaces** para coordinar tres apps y tres paquetes compartidos sin duplicar tipos entre frontend y backend.
- **Modelar dinero como eventos, no como estado** — un ledger append-only obliga a pensar en "qué pasó" en vez de "cuánto hay ahora".

## 🚧 Limitaciones

- Es un **boilerplate de estudio**, no un producto en producción: la pasarela de pagos es un mock, no una integración real con Stripe o Conekta.
- Split fijo 90/10 — no hay configuración de comisión por tenant ni múltiples monedas.
- Sin dashboard de administración multi-tenant más allá de lo necesario para demostrar el patrón.

## 🗺️ Si lo llevara a producción

Como reflexión personal, no como roadmap confirmado: conectaría la pasarela mock con Stripe Connect real, agregaría comisión configurable por tenant y soporte multi-moneda, y sumaría un job de reconciliación que compare el ledger contra los reportes de la pasarela.

---

Documentación completa de arquitectura, ERD y guía de arranque en [`docs/`](https://github.com/KamerrEzz/ledgr/tree/main/docs) del repositorio.
