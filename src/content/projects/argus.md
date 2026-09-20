---
title: "Argus — Revisor de Pull Requests con IA, Self-Hosted"
description: "Revisor de PRs que clona el head, corre tus propios checks dentro de un sandbox y publica un review con hallazgos anclados a archivo y línea, veredicto y check run — en tu infraestructura, con tu propia key de modelo."
type: "personal"
category: "herramientas"
image: "https://kamerrezz.github.io/argus/og-image.png"
technologies: ["TypeScript", "LangGraph", "Fastify", "Next.js", "Prisma", "PostgreSQL", "Redis", "BullMQ", "Docker"]
github: "https://github.com/KamerrEzz/argus"
demo: "https://kamerrezz.github.io/argus/"
featured: true
star: false
order: 6
status: "active"
date: "2026-09-20"
startDate: "2026-09-20"
role: "Desarrollador Principal"
---

Todos los revisores de código con IA que probé tienen el mismo problema: te dan una opinión y te dejan a vos la parte difícil, que es decidir si es cierta. Te escriben "esto podría tener un problema de concurrencia" y tenés que ir a mirar el archivo, entender el contexto y darte cuenta solo de si tenían razón.

**Argus hace lo contrario: primero busca la verdad en el repositorio, después opina.** Clona el commit, corre tus propios tests, lint y typecheck dentro de un sandbox, lee el código de alrededor con herramientas, y recién ahí publica un review con hallazgos anclados a archivo y línea, un veredicto y un check run de GitHub.

Y todo corre en tu infraestructura: tu base, tu Redis, tu key de modelo. Sin cuenta, sin telemetría, sin mandar tu código a un servicio de terceros.

## 🎯 Objetivo

Que un review sea **verificable**, no una opinión más. Cada afirmación bloqueante tiene que traer la línea que el modelo leyó; si no la trae, no se publica. La idea es que un dev pueda mirar un hallazgo y confirmarlo en segundos, en vez de tener que reconstruir el razonamiento del modelo.

## 🧱 Stack & Arquitectura

Monorepo con **npm workspaces** y tres apps que comparten una sola imagen de contenedor —mismo set de dependencias, distinto entrypoint:

- **`apps/api`** — Fastify, sesiones con cookie, stream de eventos por SSE y el receptor de webhooks.
- **`apps/worker`** — consumidores de BullMQ, reconciliación de reviews y health endpoint propio.
- **`apps/web`** — dashboard en Next.js: repositorios, pull requests, runs y eventos en vivo.
- **`apps/cli`** — un review entero desde la terminal, sin dashboard ni Redis.

Del lado de los paquetes, el pipeline vive en **`@acr/ai`** como un grafo de **LangGraph**: clasificar el cambio, correr los checks, loop de agente con herramientas, validar, criticar y publicar. El provider está abstraído sobre OpenAI Chat Completions, así que funciona igual con OpenAI, OpenRouter, nan.builders o cualquier gateway compatible — incluido uno local.

**Postgres + Prisma** para el estado, **Redis + BullMQ** para la cola y los locks por pull request, y **Docker** para el sandbox de los checks.

## ✨ Funcionalidades

**Pipeline de review**
- Clona el head (shallow) en un workspace por run y trae metadata, commits y lista de archivos desde GitHub.
- Clasifica los archivos cambiados y arma un **plan**: qué checks vale la pena correr según el cambio.
- Loop de agente acotado por presupuesto: tokens, reloj de pared y cantidad de tool calls. Alcanzar el límite **detiene** el run en vez de truncarlo en silencio.
- Validación determinística: schema, deduplicación, calibración por confianza y comparación con el run anterior. La crítica adversarial del modelo solo puede **suavizar o descartar** un hallazgo, nunca agregar ni endurecer.

**Evidencia obligatoria**
- Un hallazgo `critical`, `high` o de categoría seguridad **tiene que citar** el código o el `archivo:línea` que el modelo leyó, o la entrega se rechaza.
- Un hallazgo que no se puede verificar se conserva visible pero no se publica — nunca se descarta en silencio.

**Publicación en GitHub**
- Comentario de resumen que se **encuentra y actualiza en el lugar** con un marcador embebido: un re-review no spamea el PR.
- Comentarios inline por hallazgo, cada uno anclado a su línea del diff.
- Check run con anotaciones, y un **gate de aprobación** opcional para que nada llegue a GitHub sin que lo mires.
- Como un re-review es un delta, el comentario dice qué encontraron los runs anteriores y este no volvió a levantar.

**Sandbox y permisos**
- Modo `docker` por defecto: CPU, memoria y PIDs limitados, `--network none`, `--cap-drop ALL`, `no-new-privileges` y allow-list de comandos derivada del manifiesto del repo.
- El confinamiento del workspace se aplica con rutas reales, así que un symlink no escapa del directorio del run.
- El texto del pull request se trata como input no confiable: va envuelto en un boundary aleatorio por request y se detectan señales de inyección.

**Control de costos**
- Cada run registra tokens de entrada, de salida y costo estimado, visible por run y por repositorio.
- Presets de provider, confianza mínima de publicación, rutas ignoradas y políticas por repositorio editables desde el dashboard.

## 🧩 Cómo correrlo

Para desarrollo local alcanza con Postgres y Redis en Docker y los tres procesos en Node:

```sh
npm install
cp .env.example .env      # AUTH_SECRET es la única sin default
npm run dev:infra         # Postgres + Redis
npm run db:generate && npm run db:migrate
npm run dev               # api :4000 · worker · web :3000
```

O el stack completo en contenedores:

```sh
docker compose build
docker compose up -d
```

Y un review por CLI, sin dashboard:

```sh
npm run review -- --repo owner/name --pr 42            # review completo
npm run review -- --repo owner/name --pr 42 --publish  # publica en el PR
```

Necesitás una GitHub App (para webhooks) o un personal access token (para reviews sin webhooks), y una key de modelo. `.env.example` documenta todas las variables y el arranque falla con la lista de lo que falta en vez de bootear a medias.

## 📚 Qué aprendí

- **La evidencia tiene que ser obligatoria, no deseable.** En una prueba real el modelo encontró una API key hardcodeada, la entregó, y la validación la descartó por no traer evidencia — el PR quedó viéndose limpio. Ahora un hallazgo bloqueante sin evidencia se rechaza en la herramienta, así el modelo no puede sacarse el problema de encima borrando el hallazgo. Es la lección más importante del proyecto.
- **Idempotencia en todas las capas.** Deduplicación por delivery id en el webhook, clave de idempotencia por `(repo, PR, head sha, trigger)` en el run, y lock de Redis por pull request. Tres webhooks de un mismo push producen un solo review.
- **Diseñar para que el presupuesto sea una decisión, no un accidente.** Un límite que corta el run y lo registra es mejor que un truncado silencioso que cambia el resultado sin avisar.
- **El sandbox es parte del producto, no un detalle de infra.** Correr los tests del repo que estás revisando es lo que convierte una opinión en un dato.
- **Los builds también mienten.** Un `.tsbuildinfo` viejo en el contexto de Docker hizo que `tsc` creyera que todo estaba al día y no emitiera nada: la imagen construía "bien" sin código. Lo encontré levantando el stack de verdad, no con los tests.

## 🚧 Limitaciones

- Los checks tienen forma de `npm`: un repositorio cuyos scripts viven en otro lado recibe el review de IA, pero no los checks dentro del sandbox.
- Un re-review reporta un delta: nunca afirma que un hallazgo previo se arregló, solo que ese run no lo volvió a levantar.
- No trae TLS, ingress, gestión de secretos ni backups: eso es del despliegue, y el repo lo dice explícitamente en vez de aparentar que está resuelto.
- El export SARIF lo genera el dashboard desde los hallazgos de un run; subirlo a code scanning es trabajo de tu pipeline.
- Está pensado para una persona a la vez. El uso por equipos u organizaciones todavía no existe — está [propuesto en el issue #9](https://github.com/KamerrEzz/argus/issues/9).

## 🔗 Documentación

Guía completa en **[kamerrezz.github.io/argus](https://kamerrezz.github.io/argus/)**, en español e inglés: quickstart, pipeline paso a paso, arquitectura, configuración, cómo conectar GitHub, la API HTTP, sandbox y permisos, despliegue, testing y los problemas conocidos.
