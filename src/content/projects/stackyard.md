---
title: "Stackyard — Gestor de Entornos de Bases de Datos Locales"
description: "App de escritorio nativa (Go + Wails) que levanta Postgres, MySQL, MongoDB o Redis con Docker en un clic y trae un cliente de base de datos multi-motor integrado — sin docker-compose.yml a mano, sin abrir otra herramienta aparte."
type: "personal"
category: "herramientas"
image: "https://raw.githubusercontent.com/KamerrEzz/stackyard/main/assets/screenshots/data-grid.png"
technologies: ["Go", "Wails", "React", "TypeScript", "Docker"]
github: "https://github.com/KamerrEzz/stackyard"
demo: "https://kamerrezz.github.io/stackyard/"
featured: true
star: false
order: 4
status: "active"
date: "2026-07-03"
startDate: "2026-07-03"
role: "Desarrollador Principal"
---

Todo mi portfolio es Node/TypeScript, salvo Stackyard. Y es a propósito: cada vez que necesitaba una Postgres local rápida terminaba escribiendo el mismo `docker-compose.yml` de siempre y después abriendo TablePlus o DBeaver aparte para mirar los datos. Dos herramientas para un solo flujo.

**Stackyard es una sola app de escritorio nativa** que se queda con todo ese loop: levantar la base de datos vía Docker en un par de clics, y después navegar, consultar y editar esos datos desde un cliente multi-motor integrado — sin salir de la app.

## 🎯 Objetivo

Eliminar la fricción entre "necesito una base de datos local" y "quiero ver/editar los datos". Nada de cloud, nada de telemetría, nada de cuenta — 100% local.

## 🧱 Stack & Arquitectura

Construida con [**Wails**](https://wails.io): backend en **Go**, frontend en **React + TypeScript**, empaquetados como un único binario nativo con un webview embebido — el mismo patrón que Tauri, pero con Go en vez de Rust del lado nativo.

- **Go 1.25+** — orquestación de contenedores Docker, lógica de conexión a cada motor de base de datos
- **React + TypeScript** — toda la UI: grillas de datos, editor de queries, diagramas
- **Monaco Editor** — el mismo motor de VS Code para el editor de queries, con autocompletado y highlighting según el motor activo
- **Docker Engine** — requerido en tiempo de ejecución para el Environment Manager

Esta elección de stack es en sí misma una decisión de diseño: Go le da un binario nativo liviano y control fino sobre el ciclo de vida de contenedores Docker, mientras que React reutiliza todo el ecosistema de UI que ya domino del resto del portfolio.

## ✨ Funcionalidades

**Environment Manager**
- Entornos de PostgreSQL, MySQL, MongoDB y Redis con un clic vía Docker — sin escribir ni un `docker-compose.yml`.
- Connection strings autogeneradas, copiables en un clic.
- Reset de volumen por servicio, sin tocar los servicios hermanos.
- Dashboard de estado en tiempo real (estado, puerto, CPU, RAM) por perfil.

**Cliente de base de datos multi-motor**
- Conexión pegando un connection string, o llenando el formulario.
- Sesiones multi-tab con varias conexiones simultáneas.
- Editor de queries (Monaco) con autocompletado y ejecución cancelable multi-statement.
- Grilla de datos editable tipo spreadsheet (Postgres/MySQL/MongoDB) — edición de celdas, alta y baja de filas, con `UPDATE`/`INSERT`/`DELETE` reales por detrás.
- Visor de árbol de documentos para MongoDB, explorador de claves para Redis (string, hash, list, set, sorted set — con TTL).
- Snippets guardados, historial de queries por conexión, galería de plantillas SQL.

**Diagrama de esquema**
- Diagramas entidad-relación en vivo, con introspección real del esquema (Postgres/MySQL) o estructura de documentos inferida (MongoDB).
- Zoom/pan y exportación a PNG, SVG o Mermaid.

**Import / Export y migraciones**
- Export a CSV, JSON y SQL dump — de la tabla completa o del resultado de la query actual — más export de esquema a `schema.prisma`/Drizzle `schema.ts`.
- Import de CSV/JSON con validación previa contra la tabla destino.
- Migraciones de esquema (crear/aplicar/rollback) para Postgres y MySQL, trackeadas en una tabla `schema_migrations`.

## 🧩 Cómo correrlo

```sh
git clone https://github.com/KamerrEzz/stackyard.git
cd stackyard
wails dev
```

`wails build -nsis` genera el instalador de Windows redistribuible; `wails build` a secas genera solo el binario. En Windows también hay un instalador ya compilado en la [última release](https://github.com/KamerrEzz/stackyard/releases/latest) — Docker Desktop (o un Docker Engine local) tiene que estar corriendo para que el Environment Manager funcione.

## 📚 Qué aprendí

- **Wails como alternativa a Electron/Tauri**: un binario Go nativo hablando con un frontend React vía bindings generados, sin levantar un runtime de Node completo dentro de la app.
- **Orquestar Docker desde Go** en vez de shell scripts — manejar el ciclo de vida de contenedores (crear, arrancar, resetear volúmenes) de forma programática y con manejo de errores real.
- **Introspección de esquema multi-motor**: generar diagramas ER reales para Postgres/MySQL implica leer catálogos del sistema (`information_schema`, `pg_catalog`), y para Mongo, inferir estructura de documentos sin un esquema declarado.
- **Diseñar una grilla editable segura**: traducir ediciones de celda en `UPDATE`/`INSERT`/`DELETE` reales sin arriesgar el resto de la fila o la tabla.

## 🚧 Limitaciones

- Requiere Docker Desktop o Docker Engine corriendo — no gestiona bases de datos ya instaladas fuera de contenedores.
- Distribución de instalador lista solo para Windows por ahora (`wails build -nsis`); en otras plataformas se compila desde el código fuente.
- Licencia [PolyForm Noncommercial 1.0.0](https://github.com/KamerrEzz/stackyard/blob/main/LICENSE) — uso personal y no comercial, con atribución requerida. No es un producto comercial.

## 🔗 Documentación

Guía completa (getting started, una página por funcionalidad, y contexto del proyecto) en **[kamerrezz.github.io/stackyard](https://kamerrezz.github.io/stackyard/)**.
