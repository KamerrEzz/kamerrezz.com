---
title: "TeachMode — Privacy Shield"
description: "Extensión de Chrome/Edge que censura IPs, tokens y credenciales automáticamente mientras enseñas o compartes pantalla en dashboards de desarrollador."
type: "personal"
category: "herramientas"
image: "https://raw.githubusercontent.com/KamerrEzz/teachmode-privacy-shield/main/docs/screenshots/shield-on.png"
technologies: ["JavaScript", "Chrome Extension", "Playwright", "Manifest V3"]
github: "https://github.com/KamerrEzz/teachmode-privacy-shield"
featured: true
star: false
order: 5
status: "active"
date: 2026-06-25
startDate: 2026-06-25
role: "Desarrollador Principal"
---

## El problema

Cuando enseñas en vivo o grabas tutoriales en Cloudflare, AWS, Vercel o cualquier dashboard de DevOps, siempre hay el riesgo de exponer credenciales sensibles en pantalla: IPs de servidores, API tokens, account IDs, nameservers, llaves de Stripe, tokens de GitHub...

Pausar para ocultar manualmente rompe el flujo de la clase. TeachMode lo resuelve de forma automática.

## Cómo funciona

La extensión usa un `MutationObserver` + `TreeWalker` para recorrer el DOM en tiempo real. Cada nodo de texto es evaluado contra un catálogo de patrones regex por prioridad:

1. **Patrones de dominio** — específicos para el dashboard activo (ej: UUIDs en Azure Portal)
2. **Patrones globales** — prefijos tipados con alta especificidad (ej: `AKIA*`, `gh*_`, `sk_live_*`)
3. **Patrones base** — IPs, emails, tokens genéricos
4. **Patrones del usuario** — regex personalizados añadidos desde el popup

Las coincidencias se reemplazan por badges con la etiqueta del tipo de dato, sin modificar el DOM original.

## Características

- **Privacy Shield** — censura automática en cualquier página
- **Blur mode** — difumina elementos en lugar de ocultarlos (`filter: blur(12px)`)
- **Always ON (pinned)** — auto-activa el modo al entrar a un dominio específico
- **Click-to-Hide** — oculta cualquier elemento con un clic; `Ctrl+Z` deshace el último
- **Custom Patterns** — añade tus propios regex desde el popup, aplicados en tiempo real
- **17 plataformas** — AWS, GitHub, GCP, Stripe, Vercel, Netlify, DigitalOcean, Render, Sentry, Fly.io, MongoDB, Supabase, Railway, Heroku, Datadog, Azure y más
- **Detección de teléfonos** — números internacionales con prefijo `+` censados automáticamente

## Atajos de teclado

| Atajo | Acción |
|---|---|
| `Ctrl+Shift+H` | Activar / desactivar Privacy Shield |
| `Ctrl+Shift+K` | Activar / desactivar Click-to-Hide |
| `Ctrl+Z` | Deshacer último elemento oculto |
