---
title: "MiniObserv"
description: "Plataforma de observabilidad self-hosted en Go — métricas del sistema, logs, alertas con webhooks y dashboard en tiempo real. Una versión propia de lo que hace Datadog."
type: "personal"
category: "sistemas"
technologies: ["Go", "TimescaleDB", "TypeScript", "Docker", "PostgreSQL"]
github: "https://github.com/KamerrEzz/theminidog"
demo: "https://kamerrezz.github.io/theminidog/"
featured: true
star: true
order: 1
status: "active"
date: "2026-06-05"
startDate: "2026-04-01"
role: "Desarrollador Principal"
---

MiniObserv nació de una pregunta simple: **¿cómo funciona Datadog por dentro?**

No "cómo se usa" — sino cómo *funciona*. Qué pasa cuando una métrica sale de un servidor y termina en un dashboard. Cómo un sistema recopila el uso de CPU de múltiples máquinas y lo convierte en algo coherente en tiempo real.

Datadog tenía plan de pago. Decidí construir mi propia versión.

## Qué hace

Un **agente** corre en cada servidor que quieres monitorear — recopila CPU, memoria, disco y red cada 10 segundos, sigue archivos de logs, y envía todo al servidor central via HTTP autenticado con JWT.

El **servidor** recibe todo, lo almacena en TimescaleDB, evalúa reglas de alertas cada 30 segundos, dispara webhooks a Slack/Discord cuando algo se sale de rango, y sirve un dashboard en tiempo real.

```
  tus servidores          MiniObserv Server         TimescaleDB
  ─────────────           ─────────────────         ──────────
  [agente]  ──────────►  recibe métricas   ──────►  hypertable
  [agente]  ──────────►  evalúa alertas
  [agente]  ──────────►  sirve dashboard  ◄──────  tu navegador
```

## Lo que aprendí construyendo esto

- **Go** — fue mi primer proyecto serio en Go. Llegué desde JavaScript/TypeScript. Me gustó mucho.
- **Cómo funciona realmente el % de CPU** — no es un valor que puedes leer directamente. Linux expone tiempo en jiffies, tomas dos muestras y calculas el delta.
- **TimescaleDB** — hypertables, `time_bucket()`, políticas de retención y compresión automáticas.
- **JWT sin tabla de usuarios** — para autenticación servicio-a-servicio, un secreto HMAC compartido es suficiente y mucho más simple.
- **Máquinas de estado** — el evaluador de alertas tiene tres estados: OK → PENDING → FIRING. PENDING existe para evitar notificaciones por spikes de 1 segundo.
- **Testing con inyección de dependencias** — los collectors inyectan la syscall como función, haciendo los tests instantáneos y deterministas.

## El stack completo

- **Agente**: Go 1.23+, gopsutil/v4, fsnotify
- **Servidor**: Go 1.23+, chi router, pgx/v5, golang-migrate
- **Base de datos**: TimescaleDB (PostgreSQL con extensión de series temporales)
- **Dashboard**: html/template + //go:embed, JavaScript vanilla, SVG sparklines
- **SDK**: TypeScript, zero dependencias en runtime, `node:crypto`
- **CI/CD**: GitHub Actions — tests en cada PR, Docker Hub en cada release, npm en cada tag

## Cómo correrlo

```bash
git clone https://github.com/KamerrEzz/theminidog.git
cd theminidog/deployments
docker compose up --build
# → http://localhost:8080
```

O con Docker directamente:

```bash
docker run -d \
  -e DATABASE_URL="postgres://..." \
  -e AGENT_TOKEN="tu-secreto" \
  -p 8080:8080 \
  kamerrezz/miniobserv-server:latest
```

## El SDK de TypeScript

```bash
npm install @kamerrezz/miniobserv
```

```typescript
import { MiniObservClient } from '@kamerrezz/miniobserv'

const client = new MiniObservClient({
  baseUrl: 'http://localhost:8080',
  agentToken: process.env.AGENT_TOKEN!,
})

const alerts = await client.getAlerts()
const hosts  = await client.getHosts()
```

---

Construido en 5 semanas usando Spec-Driven Development, TDD estricto y 213+ tests. Cada decisión de arquitectura tiene su propio ADR documentado.

La documentación completa está en **[kamerrezz.github.io/theminidog](https://kamerrezz.github.io/theminidog/)**, disponible en inglés y español.
