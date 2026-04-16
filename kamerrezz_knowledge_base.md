# KamerrEzz — Base de Conocimiento Completa

## Identidad

- **Nombre:** Uziel Liborio
- **Alias:** KamerrEzz
- **Ubicación:** Playa del Carmen, Quintana Roo, México
- **Email:** uzielliborio@gmail.com
- **LinkedIn:** linkedin.com/in/KamerrEzz
- **GitHub:** github.com/KamerrEzz
- **Portafolio:** kamerrezz.com

---

## Perfil Profesional

Fullstack JavaScript Developer con 4+ años de experiencia. Autodidacta (75% autoaprendizaje). Construye productos propios con usuarios reales, no solo proyectos de tutorial. Ha liderado equipos pequeños, enseñado code reviews y mentoreado a otros desarrolladores. 90% de sus proyectos son en TypeScript.

**Enfoque:** Arquitecturas escalables, código limpio, experiencias de usuario optimizadas. Capaz de llevar un producto de cero a producción de forma individual.

---

## Stack Técnico

### Frontend
- React.js, Next.js (App Router, Server Components, Server Actions)
- TypeScript (90% de todos los proyectos)
- JavaScript ES6+
- Zustand (migró de Redux y Context API)
- React Query
- Tailwind CSS, shadcn/ui
- Responsive Design, Mobile First

### Backend
- Node.js, Express.js, NestJS
- API REST
- Passport.js, Auth.js, Better-auth
- Sistema de permisos bitwise (implementación propia)
- Discord.js

### Bases de Datos
- PostgreSQL, MySQL, MongoDB
- Prisma ORM (migraciones, transacciones, relaciones)

### DevOps
- Docker (Compose con app + Redis + Nginx, boilerplates propios)
- GitHub Actions (CI/CD a VPS)
- Vercel
- VPS propio

### Caching
- Redis (cache de contenido, sistema de niveles en bot)

### Testing
- Playwright (en desarrollo activo, aprendiendo)

### Automatización
- n8n (flujos de trabajo, integraciones)

### Scripting
- Lua (desarrollo de servidores FiveM)

### Documentación
- Astro + Starlight (docs técnicas)

### Herramientas
- Git (conventional commits, feature branches, PRs, code reviews)
- Figma, Notion
- Stripe API

---

## Proyectos

### FiveHub Pro (2026 – Presente)
- **URL:** fivehub.pro
- **Docs:** docs.fivehub.pro
- **Qué es:** Plataforma de gestión de assets tipo CDN simplificado para servidores de juegos. NO es un marketplace. Los desarrolladores suben sus propios archivos (menús, logos, recursos de servidor) y los consumen vía URL, sin tener que configurar S3 ni infraestructura propia.
- **Problema que resuelve:** Un programador de servidores de FiveM, Roblox o Minecraft solo quiere una URL, una forma de subir archivos y consumirlos. Sin FiveHub tendrían que configurar S3, crear sus propias conexiones, y gestionar infraestructura.
- **SDKs:** Lua (disponible en repo) y Node.js (en desarrollo). Permiten subir assets programáticamente estilo `fivehubpro.upload(data, cb)`.
- **Documentación:** Escrita manualmente con Astro + Starlight.
- **Estado:** Beta pública con 5 usuarios probándolo (comunidades pequeñas y grandes).
- **Modelo:** Freemium.
- **Stack:** Next.js (fullstack), TypeScript, Docker, PostgreSQL.
- **Desarrollo:** Individual, un mes.

### Zeew.Space (2024 – Presente)
- **URL:** zeew.space (plataforma de producción)
- **Qué es:** Plataforma edtech para enseñanza de programación a la comunidad hispanohablante. Filosofía "Aprende Creando" — project-first methodology donde los conceptos emergen de la necesidad del proyecto.
- **Métricas:** 500+ usuarios registrados en los primeros 3 meses.
- **Estado actual:** Rediseñando la oferta educativa. Ruta completa de backend con Node.js (9+ cursos, 2 ya grabados). Relanzamiento planificado para agosto 2025.
- **Cursos:** Originalmente 27, reducidos a 6 (los más populares). Nuevo curriculum en producción.
- **Contenido:** Video con screen capture + voiceover. YouTube para cursos gratuitos (Lua).
- **Stack:** Next.js, TypeScript, NestJS, Prisma ORM, PostgreSQL, Redis, Tailwind CSS, Stripe, Bunny Stream (CDN/video).
- **Desarrollo:** Individual.
- **Iniciativa de liderazgo:** Formó un equipo de 20 personas para enseñar trabajo colaborativo. Requisito: conocimiento previo del stack y Git/GitHub. Enseñó code reviews, trabajo en equipo. 5 completaron el programa, construyeron un proyecto funcional en 2 meses. De aquí nació la idea de TheForge.

### TheForge (En diseño)
- **Qué es:** Incubadora intensiva dentro de Zeew Space donde equipos construyen SaaS reales en ciclos de cohorte.
- **Estado:** MVP scoped con 5 módulos (cohort management, cell/participant org, mentor scorecard, Zeew Score engine 0-1000, health dashboard con GitHub API). Brief técnico producido para handoff.

### aborigenroleplay.com (2024)
- **Qué es:** Sitio web para comunidad de gaming FiveM (GTA V).
- **Métricas:** ~25 usuarios activos diarios.
- **Tipo:** 50% freelance pagado, 50% colaboración con amigo (fundador de la comunidad).
- **Desarrollo:** Un mes para el sitio web. Colaboración continua en scripts de FiveM en Lua.
- **Features:** Auth, gestión de usuarios y roles, sistema dinámico de reglas con Markdown, comunicación en tiempo real entre panel web y servidor de juego.
- **Stack:** Next.js, TypeScript, Prisma ORM, MySQL, Tailwind CSS.
- **Estado:** Sigue activo.

### CactusFire (2021 – 2024)
- **Qué es:** Bot de Discord con dashboard web.
- **Métricas:** Comunidad de miles de usuarios (número exacto no verificable, dejó el proyecto).
- **Equipo:** 2 personas. Uziel hizo el dashboard y parte del bot, la otra persona se dedicaba al bot.
- **Rol:** Desarrollador Frontend / Tech Lead.
- **Features:** Dashboard con OAuth de Discord, gestión multi-servidor, sistema de permisos por roles con detección automática de admins, sistema de niveles con Redis.
- **Hitos:** Lideró migración de v1 a v2. Enseñó code reviews al equipo.
- **Stack:** Express.js, Handlebars, MySQL, Redis, Discord.js, OAuth.
- **Estado:** Ya no está involucrado por diferencias de ideas. Sin relación actual.

### Comunidad Sintiendome (2023)
- **Qué es:** Automatización administrativa para comunidad de psicólogos.
- **Tipo:** Proyecto pagado.
- **Cliente:** 5 psicólogos.
- **Qué hizo:** Automatizó flujos con n8n (búsqueda de agendas, actividades, tareas internas, recordatorios). Bot de Discord que centralizó información — ejecutaban un comando y obtenían los datos sin buscar en Notion u otras herramientas.
- **Stack:** n8n, Discord.js, Node.js.

### Proyectos menores
- **TickTime:** Contador regresivo con ajuste automático a zona horaria del usuario.
- **Todos Juntos Siempre a Tiempo:** Convertidor de horarios para coordinación de eventos globales.

### PsyManage (En diseño)
- **Qué es:** Plataforma multi-tenant de gestión de pacientes para psicólogos.
- **Estado:** 4 sprints planificados. Stripe diferido a V1.1.
- **Stack planificado:** Next.js 14, Prisma ORM, PostgreSQL en Supabase (RLS), NextAuth.js, Stripe, Resend.

---

## Nivel Técnico (Evaluación honesta)

### Avanzado (defiende en entrevista)
- React.js / Next.js App Router (uso diario)
- TypeScript (90% de proyectos)
- Zustand + React Query
- Express.js (middleware custom, permisos bitwise)
- Prisma ORM (transacciones, migraciones)
- Docker (compose, boilerplates propios)
- Redis en producción
- Git (conventional commits, PRs, code reviews)
- Consumo de APIs/documentación sin tutoriales
- useRef (debounce, persistencia entre renders)
- Map/Set con criterio
- Next.js: App Router, Server Actions, Middleware, API Routes

### Intermedio (funcional con huecos teóricos)
- Event Loop (concepto general, falta microtasks vs macrotasks)
- Closures (los usa pero definición imprecisa)
- Prototypes (entiende la idea, falta prototype chain)
- useEffect (lo usa bien, falta explicar lifecycle con precisión)
- useMemo/useCallback (confusión: useCallback no es para fórmulas, es para memorizar funciones)
- Virtual DOM / Reconciliación (sabe qué hace, no cómo)
- Server Components (falta streaming, Suspense)
- NestJS (lo usa en producción, dependency injection no bien explicada)
- OAuth (usa herramientas pero falta flujo teórico completo)
- SQL (JOINs con 3 tablas, usa Prisma mainly)
- SSR/SSG/ISR (usa defaults, falta generateStaticParams, revalidación)
- CI/CD (funcional pero básico)
- Patrones de diseño (Singleton, Factory, Observer intuitivo, Strategy desconocido)
- Debugging (console.log + DevTools, falta breakpoints)
- Custom Hooks (useDebounce, falta hooks más complejos)

### Básico (necesita estudio)
- Generators / Symbol / Iterators
- Testing (recién empezando con Playwright, sin Jest/RTL)
- WebSockets (una experiencia, no recuerda)
- Normalización de BD (definiciones imprecisas)
- Índices de BD (sabe cuándo, no entiende B-trees)

---

## Experiencia de Liderazgo

- **Tech Lead en CactusFire:** Lideró migración v1→v2, enseñó code reviews.
- **PM y formador en Zeew Space:** Organizó equipo de 20 personas, enseñó Git/GitHub, code reviews, trabajo colaborativo. 5 completaron el programa.
- **Creador de contenido educativo:** Zeew Space, cursos en YouTube (Lua), ruta de backend en producción.

---

## Educación

- **Ingeniería en Sistemas Computacionales** — Universidad Kuapá (en línea). Graduación: Diciembre 2026. Actualmente en servicio social y prácticas.
- **Técnico en Administración** — CONALEP. Completado.
- **Certificaciones:** React.js, JavaScript, HTML/CSS, Responsive Design, Express.js, Passport.js, Docker (Platzi/Udemy).

---

## Idiomas

- **Español:** Nativo
- **Inglés:** A2-B1 lectura técnica. Solo lectura, no conversacional. Estudiando actualmente en la universidad.

---

## Situación Actual

- Buscando empleo en empresa mexicana con nómina (IMSS, INFONAVIT, aguinaldo, etc.)
- Modalidad: Remoto
- Disponibilidad: Inmediata
- Universidad en línea, no limita horarios
- Rango salarial realista: $30,000-$40,000 MXN/mes. Con testing + inglés B2: $45,000-$55,000 MXN.
- Industrias de interés: Fintech, EdTech, Startups, Agencias digitales, Gaming

---

## Personalidad y Approach

- Autodidacta fuerte (75% autoaprendizaje)
- Prefiere construir productos reales, no solo aprender teoría
- Honesto sobre lo que sabe y lo que no sabe
- Diseña estructuras completas antes de producir (cursos, features, briefs)
- Pragmático: usa herramientas existentes antes de reinventar
- Produce documentación técnica (Astro/Starlight)
- Nickname consistente: KamerrEzz en todas las plataformas
