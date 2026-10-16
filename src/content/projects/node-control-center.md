---
title: "Node Control Center — Monitor de procesos Node.js y puertos locales"
description: "App de escritorio premium que te dice qué procesos Node están corriendo, quién tiene ocupado el puerto 3000 y qué podés cerrar sin miedo. Tauri 2 + Rust + React, 100% local, sin telemetría."
type: "personal"
category: "herramientas"
image: "https://raw.githubusercontent.com/KamerrEzz/nodecontrolcenter/main/docs/screenshots/overview.png"
technologies: ["Rust", "Tauri 2", "React", "TypeScript", "Vite", "sysinfo", "netstat2", "Windows APIs"]
github: "https://github.com/KamerrEzz/nodecontrolcenter"
featured: true
star: false
order: 7
status: "active"
date: "2026-10-15"
startDate: "2026-10-15"
role: "Desarrollador Principal"
---

Trabajo con varios proyectos a la vez, servidores de desarrollo y herramientas de IA que arrancan procesos solos. El panorama clásico: *algo* está escuchando en el puerto 3000, el Administrador de tareas me muestra quince `node.exe` sin contexto, y no tengo forma de saber qué es cada cosa sin jugármela con `taskkill`.

**Node Control Center responde las preguntas que de verdad hacés:** qué procesos Node están corriendo y de qué proyecto son, quién tiene ocupado el puerto 3000 o el 5173, si hay servidores duplicados del mismo proyecto, y qué podés terminar sin afectar nada más. Todo con datos reales del sistema operativo, una interfaz oscura carbono-violeta que se disfruta mirar, y una regla de diseño que atravesó todo el proyecto: **la app nunca finge saber más de lo que sabe**.

## 🎯 Objetivo

Un centro de control local, no un administrador de tareas genérico. Tres principios que definí antes de escribir la primera línea:

- **Datos reales o nada.** Los procesos vienen de las APIs del sistema, los puertos de las tablas nativas de Windows (`GetExtendedTcpTable`) — nunca parseo de `netstat`. Si un dato no está disponible, la UI lo dice.
- **Clasificar con evidencia.** Cada proceso lleva un nivel de confianza explícito (alto/medio/bajo) según cómo se detectó. Una alerta enuncia hechos con su confianza; jamás declara que un proceso es "huérfano" o "sospechoso" sin sustento.
- **Terminación con barandillas.** Para matar un proceso hay que escribir su PID para confirmar, el backend revalida contra una captura fresca antes de actuar, y los procesos del sistema se rechazan siempre — esa validación vive en Rust, no en la UI.

## 🧱 Stack & Arquitectura

El núcleo es **Rust** con **Tauri 2**: la ventana web no tiene acceso al shell, y lo único que expone es un set de comandos con parámetros validados. Del lado Rust:

- **`sysinfo`** para enumerar procesos (exe, línea de comando, PPID, tiempos, CPU con doble muestreo, memoria).
- **`netstat2`** para las tablas de sockets TCP/UDP con PIDs dueños — una captura consistente por consulta.
- **`detect.rs`** con las heurísticas de clasificación: runtime Node, lanzadores (npm/pnpm/yarn), herramientas (vite, next, nest…) y envoltorios de shell, cada uno con su confianza.
- **`alerts.rs`** con cinco reglas basadas en evidencia, y **`kill.rs`** como único camino a `taskkill`, con validación en vivo y lista de procesos protegidos.

El frontend es **React + TypeScript estricto** con Vite: cinco vistas funcionales (Resumen, Procesos Node, Puertos, Alertas, Configuración), panel de detalles contextual, y un sistema visual propio oscuro con acentos violeta y magenta. La interfaz está completamente traducida al inglés y español — los diccionarios son type-checked y un test hace fallar la compilación si algún texto queda sin traducir. El idioma se detecta solo en el primer arranque.

Un detalle honesto del diseño: en Windows no se puede leer el directorio de trabajo de otro proceso, así que el proyecto se **infiere** de la línea de comando y del entorno de npm (`INIT_CWD`), y la UI siempre lo etiqueta como inferido en vez de aparentar certeza.

## ✨ Funcionalidades

**Inspector de puertos** — la funcionalidad por la que existe el proyecto. Escribís un puerto y te dice quién lo tiene: proceso, PID, ejecutable y comando. Distingue entre ocupado, libre y *desconocido* — si la consulta no es confiable, lo dice en vez de mostrar un "libre" mentiroso.

**Alertas explicables** — servidores duplicados en el mismo proyecto, un puerto favorito tomado por un proceso que no es Node, servidores de larga ejecución, lanzadores cuyo padre desapareció. Cada una con hechos, nivel de confianza, y descartable.

**Terminación segura** — graceful primero, forzada como alternativa documentada, árbol de hijos opcional. El diálogo muestra comando, directorio, puertos e hijos afectados antes de que confirmes.

**Español e inglés** — la UI entera, incluyendo las alertas: el backend manda los datos estructurados y la interfaz redacta el texto en tu idioma.

## 🧩 Cómo correrlo

Instaladores MSI y NSIS en los [releases del repo](https://github.com/KamerrEzz/nodecontrolcenter/releases) — pesan menos de 3 MB. Para desarrollo:

```sh
pnpm install
pnpm tauri dev      # con recarga en caliente
```

Las pruebas cubren clasificación, relaciones PID↔puerto, procesos que desaparecen a mitad de consulta, validaciones de terminación y estados vacíos. Además hay pruebas de integración *live* (detrás de `--ignored`): arrancan un servidor Node real, verifican que el snapshot lo detecta con su puerto y PID, lo terminan y confirman que el puerto queda libre. Solo tocan procesos que la propia prueba arrancó.

## 📚 Qué aprendí

- **Los tests atrapan bugs que "se veían bien".** El estado TCP llegaba como `Listen` y la UI comparaba contra `listen` en minúsculas — el código compilaba, los tests unitarios con datos sintéticos lo encontraron en segundos. Sin esas pruebas, la vista de puertos se habría roto con datos reales.
- **Las políticas de Windows son un territorio de diseño.** Smart App Control bloqueó el CLI de Tauri de npm, los build scripts de cargo en temp y el binario parcheado por el bundler. La solución no fue pelear con la política sino rodearla: compilar el CLI desde releases oficiales, redirigir los temporales, y entender qué patrón de ejecución sí estaba permitido. Seguridad del usuario primero, siempre.
- **La confianza hay que modelarla, no improvisarla.** Clasificar `node.exe` es trivial; lo difícil es decidir qué se etiqueta como lanzador, herramienta o envoltorio, y atreverse a decir "baja confianza" en la UI en vez de mostrar todo con el mismo peso.
- **Validar en el backend, nunca confiar en la UI.** Cualquier persona puede invocar un comando de Tauri desde la consola del webview. La validación de PID, modo y alcance de la terminación vive íntegramente en Rust.

## 🚧 Limitaciones

- Solo **Windows 10/11 x64** por ahora. El backend está organizado para que el puerto a Linux/macOS sea directo (`sysinfo` y `netstat2` ya son multiplataforma), pero no existe aún.
- El directorio del proyecto es **inferido**, nunca leído: procesos sin rutas útiles en su línea de comando muestran "No disponible".
- `taskkill` graceful suele fallar en procesos de consola — es una limitación de Windows, y la app lo documenta en el diálogo en vez de ocultarlo.
- Los binarios no están firmados digitalmente, así que SmartScreen puede pedir confirmación en el primer arranque.

## 🔗 Código e instalación

Código, README bilingüe y capturas en **[github.com/KamerrEzz/nodecontrolcenter](https://github.com/KamerrEzz/nodecontrolcenter)**, con instaladores listos en la [sección de releases](https://github.com/KamerrEzz/nodecontrolcenter/releases).
