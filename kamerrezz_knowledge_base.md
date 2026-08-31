# KamerrEzz — Base de Conocimiento Completa

## Identidad

- **Nombre:** Uziel Procopio Kauil
- **Alias:** KamerrEzz
- **Ubicación:** Playa del Carmen, Quintana Roo, México
- **Email:** dev@kamerrezz.com
- **LinkedIn:** linkedin.com/in/kamerrezz
- **GitHub:** github.com/kamerrezz
- **Portafolio:** kamerrezz.com

---

## Perfil Profesional

Desarrollador Full-Stack. Construyo y opero productos en producción, con usuarios reales y autonomía de punta a punta: interfaz, API, modelado de datos, infraestructura, despliegue y observabilidad. Autodidacta — la mayoría de lo que sé lo aprendí por mi cuenta, rompiendo cosas y leyendo documentación.

Coordino y enseño: dirigí colaboradores en la primera versión de Zeew Space, fui responsable técnico en proyectos freelance, y diseñé una iniciativa para formar desarrolladores en trabajo en equipo — control de versiones, revisión de código, gestión de tareas y comunicación.

**Enfoque:** Arquitecturas escalables, código limpio, experiencias de usuario cuidadas. Capaz de llevar un producto de cero a producción de forma individual.

---

## Stack Técnico

### Frontend

- React.js, Next.js (App Router, Server Components, Server Actions)
- TypeScript (mayoría de los proyectos)
- JavaScript ES6+
- Zustand (migró de Redux y Context API)
- React Query
- Tailwind CSS, shadcn/ui
- Responsive Design, Mobile First

### Backend

- Node.js, Express.js, NestJS
- API REST, tRPC
- Passport.js, Auth.js, Better Auth
- Sistema de permisos bitwise (implementación propia)
- Discord.js

### Bases de Datos

- PostgreSQL, MySQL
- Prisma ORM (migraciones, transacciones, relaciones), Drizzle

### DevOps

- Docker (Compose con app + Redis + Nginx, boilerplates propios)
- GitHub Actions (CI/CD)
- Vercel, AWS, Railway
- Cloudflare R2

### Caching

- Redis (caché de contenido, sistema de niveles en bots)

### Observabilidad

- Grafana, Prometheus, Sentry, Pino

### Testing

- Playwright (pruebas de API e integración)

### Automatización

- n8n (flujos de trabajo, integraciones)
- BullMQ

### Scripting

- Lua (desarrollo de servidores FiveM)

### Documentación

- Astro + Starlight (docs técnicas)

### AI Tooling

- Claude Code (uso diario en desarrollo y revisión de código)
- opencode

### Herramientas

- Git (conventional commits, feature branches, PRs, code reviews)
- Turborepo, pnpm
- Figma, Notion
- Stripe API

---

## Proyectos

### FiveHub (2026 – Presente)

- **URL:** fivehub.pro
- **Docs:** docs.fivehub.pro
- **Qué es:** CDN especializado para servidores de FiveM, con SDK propio en JavaScript y Lua. Los desarrolladores suben sus propios assets y los consumen vía URL, sin configurar S3 ni infraestructura propia.
- **Problema que resuelve:** Ninguna solución existente en el mercado soportaba Lua como runtime. Un programador de servidores FiveM necesitaba montar su propia infraestructura de almacenamiento; FiveHub la reemplaza con un CDN listo para usar.
- **Métricas reales:** 33 organizaciones activas, 49 usuarios, 1,003 assets servidos, 795 MB, 85% de tasa de activación (28 de 33 organizaciones usan el producto de forma activa).
- **SDKs:** JavaScript y Lua, para integración directa con servidores de juego.
- **Arquitectura:** Monorepo con Turborepo — unifica web, documentación, paquete npm y SDK de Lua. Pruebas de API sobre endpoints críticos.
- **Documentación:** Astro + Starlight.
- **Stack:** Next.js, TypeScript, PostgreSQL, Prisma ORM, Docker, Nginx, Cloudflare R2, Turborepo.
- **Desarrollo:** Individual.

### Zeew Space (2019 – Presente)

- **URL:** zeew.space
- **Qué es:** Plataforma edtech para enseñanza de programación a la comunidad hispanohablante.
- **Evolución:** 2019 — Zeew API, librería npm para bots de Discord (niveles, moderación, economía). 2021 — Zeew Dev, herramientas para desarrolladores de comunidades online. 2024 — Zeew Space, plataforma edtech completa.
- **Métricas reales:** 158 usuarios registrados, 7 cursos publicados, 18 artículos técnicos, 7.5 horas de contenido. Sin inversión externa.
- **Autenticación:** tres proveedores en producción (email, Discord, GitHub), con uso real distribuido 81 / 61 / 19 usuarios respectivamente.
- **Contenido:** Video con screen capture + voiceover.
- **Stack:** Next.js, React, NestJS, TypeScript, PostgreSQL, Prisma ORM, Redis, Stripe API, Tailwind CSS.
- **Desarrollo:** Individual — diseño, interfaz y backend propios.
- **Iniciativa de liderazgo:** Diseñé un programa para formar desarrolladores en trabajo en equipo — control de versiones, revisión de código, gestión de tareas, comunicación — dirigido a personas con conocimientos técnicos pero sin experiencia colaborativa. También coordiné colaboradores en la primera versión del proyecto.

### Asvitrax (2022 – Presente)

- **URL:** asvitrax.com
- **Qué es:** Bot de Discord con panel de administración multiservidor.
- **Métricas reales:** operando en 249 servidores.
- **Feature destacado:** algoritmo de detección de contenido resistente a evasión — normaliza caracteres ASCII y sustituciones tipográficas antes de comparar, detectando variantes que un filtro por coincidencia literal deja pasar.
- **Otras features:** configuración independiente por comunidad, notificaciones automáticas de Twitch para avisos de transmisión en vivo.
- **Observabilidad:** Grafana y Prometheus en producción.
- **Stack:** Node.js, TypeScript, PostgreSQL, Turborepo, Grafana, Prometheus.
- **Inicio:** Septiembre 2022 (confirmado en historial del repositorio).

### AborigenRoleplay (2023 – 2024)

- **URL:** aborigenroleplay.com
- **Qué es:** Plataforma web completa para comunidad de FiveM (GTA V).
- **Tipo:** Freelance, en colaboración con el fundador de la comunidad.
- **Desarrollo:** Septiembre 2023 – Abril 2024.
- **Features:** Autenticación vía Discord OAuth con gestión de roles, editor dinámico de reglas en Markdown administrable sin código, comunicación en tiempo real entre panel y servidor de juego vía API.
- **Stack:** Next.js, TypeScript, Prisma ORM, MySQL, Tailwind CSS.

### Comunidad Sintiendome (2023)

- **Qué es:** Automatización administrativa para una comunidad de psicólogos.
- **Tipo:** Proyecto pagado, cliente de 5 psicólogos.
- **Qué hice:** Automaticé flujos con n8n (búsqueda de agendas, actividades, tareas internas, recordatorios). Bot de Discord que centralizó información — un comando reemplazaba buscar manualmente en Notion u otras herramientas.
- **Stack:** n8n, Discord.js, Node.js.

### Proyectos menores

- **TickTime:** Contador regresivo con ajuste automático a zona horaria del usuario.
- **Todos Juntos, Siempre a Tiempo:** Convertidor de horarios para coordinación de eventos globales.

### En diseño / exploración

_Nota: revisar vigencia de estos dos antes de usarlos en cualquier material — no confirmados como activos al momento de esta actualización._

- **TheForge:** Incubadora dentro de Zeew Space donde equipos construirían SaaS reales en ciclos de cohorte.
- **PsyManage:** Plataforma multi-tenant de gestión de pacientes para psicólogos.

---

## Nivel Técnico (Evaluación honesta)

_Esta sección es para uso personal / referencia interna al preparar entrevistas — no para publicar tal cual en materiales de postulación._

### Sólido (defiendo en entrevista)

- React.js / Next.js App Router (uso diario)
- TypeScript (mayoría de proyectos)
- Zustand + React Query
- Express.js (middleware custom, permisos bitwise)
- Prisma ORM (transacciones, migraciones)
- Docker (compose, boilerplates propios)
- Redis en producción
- Git (conventional commits, PRs, code reviews)
- Consumo de APIs/documentación sin tutoriales
- Next.js: App Router, Server Actions, Middleware, API Routes

### Funcional (con huecos teóricos)

- Event Loop (concepto general, falta microtasks vs macrotasks)
- Closures (los uso pero definición imprecisa)
- Prototypes (entiendo la idea, falta prototype chain)
- useEffect (lo uso bien, falta explicar lifecycle con precisión)
- useMemo/useCallback (repasar la diferencia con precisión)
- Virtual DOM / Reconciliación (sé qué hace, no el cómo a fondo)
- Server Components (falta streaming, Suspense)
- NestJS (lo uso en producción, dependency injection no bien explicada)
- OAuth (uso herramientas pero falta flujo teórico completo)
- SQL (JOINs con varias tablas, uso Prisma principalmente)
- SSR/SSG/ISR (uso defaults, falta generateStaticParams, revalidación)
- CI/CD (funcional pero básico)
- Patrones de diseño (Singleton/Factory/Observer intuitivo, Strategy por repasar)
- Debugging (console.log + DevTools, falta breakpoints)

### Por reforzar

- Generators / Symbol / Iterators
- Testing más allá de Playwright (sin Jest/RTL todavía)
- WebSockets (poca experiencia práctica)
- Normalización de BD (definiciones a repasar)
- Índices de BD (sé cuándo usarlos, no a fondo el cómo — B-trees)
- Arquitectura de microservicios (entiendo el concepto, sin experiencia formal en un entorno con orquestación)

---

## Experiencia de Liderazgo y Enseñanza

- **Zeew Space:** coordiné colaboradores en la primera versión del proyecto, y diseñé una iniciativa para formar desarrolladores en trabajo en equipo — Git/GitHub, code reviews, gestión de tareas, comunicación.
- **Proyectos freelance:** responsable técnico en varios de ellos.
- **Creador de contenido educativo:** Zeew Space — cursos, artículos técnicos, ruta de backend en producción.

---

## Educación

- **Ingeniería en Sistemas** — Universidad UK (México), RVOE SEP. Titulación: noviembre 2026.
- **Técnico en Administración** — CONALEP. Completado.
- **Certificaciones:** React.js, JavaScript, HTML/CSS, Responsive Design, Express.js, Passport.js, Docker (Platzi/Udemy).

---

## Idiomas

- **Español:** Nativo.
- **Inglés:** Lectura técnica — documentación, código y especificaciones. Fortaleciendo actualmente la parte hablada.

---

## Situación Actual

- Buscando empleo remoto en empresas mexicanas o LATAM, modalidad remota.
- Disponibilidad: inmediata.
- Industrias de interés: Fintech, EdTech, Startups, Agencias digitales, Gaming.

_Nota: el rango salarial objetivo se maneja en documentación privada, no en este archivo público._

---

## Personalidad y Approach

- Autodidacta fuerte — la mayoría del conocimiento es autoaprendizaje.
- Prefiere construir productos reales antes que solo aprender teoría.
- Honesto sobre lo que sabe y lo que no sabe.
- Diseña estructuras completas antes de producir (cursos, features, briefs).
- Pragmático: usa herramientas existentes antes de reinventar.
- Produce documentación técnica (Astro/Starlight).
- Nickname consistente: KamerrEzz en todas las plataformas.
