---
title: "TaskSquad — Gestión de Tareas con Gamificación Social"
description: "Aplicación móvil para Android de gestión de tareas con gamificación social: grupos privados, tareas compartidas, rankings y puntos por equipo. Backend NestJS + PostgreSQL + Redis + Socket.IO, app en Expo/React Native."
type: "personal"
category: "mobile"
technologies: ["NestJS", "PostgreSQL", "Redis", "Socket.IO", "Expo", "React Native", "TypeScript"]
github: "https://github.com/KamerrEzz/TaskSquad"
featured: true
star: true
order: 3
status: "in-progress"
date: "2026-06-02"
startDate: "2026-06-01"
role: "Desarrollador Principal"
---

Las apps de tareas "para uno" ya están todas hechas. Lo que me interesaba probar era otra cosa: ¿cómo se siente gestionar tareas **en equipo**, con la misma mecánica social que hace adictivos a los juegos? TaskSquad es una app de Android donde armás grupos privados, compartís tareas y competís en rankings acumulando puntos junto a tu equipo.

## 🎯 Objetivo

Construir una app full-stack real de punta a punta — no un CRUD de tareas, sino un sistema con grupos, permisos por rol, tiempo real y gamificación social funcionando sobre una base mobile de producción.

## 🧱 Stack & Arquitectura

```
TaskSquad/
├── backend/    NestJS + PostgreSQL + Redis
└── app/        Expo (React Native) — Android
```

| Capa | Tecnología |
|---|---|
| Backend | NestJS, Prisma 7, PostgreSQL 17, Redis, Socket.IO |
| App | Expo SDK 54, React Native, NativeWind, Zustand, TanStack Query |
| Auth | JWT (access + refresh), Google OAuth, Argon2 |
| Push | Expo Push Notifications |
| Pagos | Stripe |
| Infra | Docker Compose, Nginx |

### Backend

NestJS con Prisma 7 sobre PostgreSQL 17, Redis para estado en tiempo real y Socket.IO para eventos en vivo dentro de los grupos (actualizaciones de tareas, rankings, notificaciones). Autenticación con JWT de access + refresh token, login social con Google OAuth, y hashing de contraseñas con Argon2 en vez de bcrypt — el ganador de la Password Hashing Competition y más resistente a ataques por GPU.

### App

Expo SDK 54 sobre React Native, estilos con NativeWind (Tailwind para RN), estado global con Zustand y estado de servidor con TanStack Query — la combinación estándar para no reinventar cache ni sincronización de datos remotos en una app mobile.

## 🧩 Cómo correrlo

```bash
# Backend
cd backend
cp .env.example .env
docker compose up -d        # Postgres + Redis
pnpm install
pnpm db:migrate && pnpm db:seed
pnpm start:dev               # http://localhost:3000 · Swagger en /docs

# App (emulador Android)
cd app
echo "EXPO_PUBLIC_API_URL=http://10.0.2.2:3000" > .env
npm install --legacy-peer-deps
npx expo start --clear
```

## 📚 Qué aprendí

- **Tiempo real en mobile con Socket.IO**: sincronizar el estado de un grupo (tareas, puntos, rankings) entre varios dispositivos sin recurrir a polling.
- **Argon2 sobre bcrypt**: entender por qué el ganador de la Password Hashing Competition resiste mejor ataques con hardware paralelo (GPU/ASIC) que las alternativas más viejas.
- **Zustand + TanStack Query como par, no como competencia**: estado de UI local en Zustand, estado de servidor (cache, refetch, invalidación) en TanStack Query — cada uno resolviendo el problema para el que fue pensado.
- **Preparar una app mobile para testers reales**: generar y distribuir un APK firmado antes de pensar siquiera en la Play Store.

## 🚧 Limitaciones

- Solo Android por ahora — no hay build de iOS.
- Fase de testers con distribución manual de APK, todavía no publicada en Google Play.
- Integración con Stripe presente en el stack, pero el flujo de monetización sigue en construcción junto con el resto de la app.

## 👤 Rol

Proyecto individual full-stack: diseño de base de datos, backend NestJS, app Expo/React Native, y la infraestructura de deploy (Docker Compose + Nginx).
