---
title: "VaultAuth — Plataforma de Auth-as-a-Service"
description: "Sistema de autenticación full-stack listo para producción: backend NestJS con JWT, sesiones Redis, 2FA y OAuth 2.0/OIDC como proveedor propio; frontend Next.js 16; y una demo de un tercero integrándose vía OAuth 2.0 + PKCE. Auditado contra el OWASP Top 10."
type: "personal"
category: "SaaS"
technologies: ["NestJS", "Next.js", "TypeScript", "PostgreSQL", "Redis", "Prisma", "OAuth 2.0", "Docker"]
github: "https://github.com/KamerrEzz/nest-auth-hybrid"
featured: true
star: true
order: 2
status: "completed"
date: "2026-05-14"
startDate: "2025-11-25"
role: "Desarrollador Principal"
---

VaultAuth es la pregunta "¿podría construir mi propio Auth0?" llevada hasta el final. No un login de juguete con email y contraseña — un sistema de autenticación completo que además puede actuar como **Authorization Server** para que aplicaciones de terceros deleguen su login en él, igual que harían con "Iniciar sesión con Google".

Son **tres repositorios** que funcionan como un solo producto:

- **Backend** — [`nest-auth-hybrid`](https://github.com/KamerrEzz/nest-auth-hybrid): la API de autenticación (NestJS).
- **Frontend** — [`next-auth-hybrid`](https://github.com/KamerrEzz/next-auth-hybrid): el dashboard y portal de desarrollador (Next.js).
- **Demo de integración** — [`vaultauth-demo-app`](https://github.com/KamerrEzz/vaultauth-demo-app): una app de un tercero que se loguea "con VaultAuth" vía OAuth 2.0 + PKCE.

## 🎯 Objetivo

Cubrir cada flujo crítico de autenticación que una aplicación moderna necesita — login clásico, 2FA, OAuth social — con una postura de seguridad de nivel producción, **y** exponer ese mismo sistema como identity provider reutilizable por terceros.

## 🧱 Stack & Arquitectura

**Backend (`nest-auth-hybrid`)**: NestJS 11 + TypeScript, Prisma 6 + PostgreSQL 16, Redis (sesiones, rate-limit, denylist de tokens), Passport.js para OAuth social, `speakeasy` + `qrcode` para TOTP, Resend para email, `helmet` + guard CSRF propio.

**Frontend (`next-auth-hybrid`)**: Next.js 16 App Router + React 19, Server Actions (sin tokens en el cliente), middleware de rutas, shadcn/ui + Tailwind v4, cabeceras de seguridad completas (CSP, HSTS, `X-Frame-Options`).

**Demo (`vaultauth-demo-app`)**: Next.js 15 + NextAuth v5 (Auth.js), consumiendo VaultAuth como si fuera un proveedor externo — la prueba de que el backend cumple el estándar OAuth 2.0/OIDC de verdad, no solo "por dentro".

```
┌─────────────────────────────────────────────────────┐
│                   Petición HTTP                      │
└───────────────────────┬─────────────────────────────┘
                        │
              ┌─────────▼──────────┐
              │   HybridAuthGuard  │  JWT en cabecera O cookie de sesión
              └─────────┬──────────┘
                        │
         ┌──────────────▼──────────────┐
         │        AuthController       │
         │  /login  /register  /me     │
         │  /enable-2fa  /verify-2fa   │
         │  /sessions  /refresh        │
         └──────┬──────────────┬───────┘
                │              │
     ┌──────────▼──┐    ┌──────▼──────────┐
     │ AuthService │    │  TokenService   │
     │  (negocio)  │    │  (HS256 JWT)    │
     └──────┬──────┘    └─────────────────┘
            │
     ┌──────▼──────────────────────────────┐
     │           Redis (compartido)        │
     │  sesiones · tickets OTP · revocados │
     │  refresh tokens · claves rate-limit │
     └─────────────────────────────────────┘
            │
     ┌──────▼──────┐    ┌────────────────┐
     │  PostgreSQL  │    │  AuditLog DB   │
     │  Modelo User │    │  cada evento   │
     └─────────────┘    └────────────────┘
```

### Autenticación híbrida

Cada endpoint protegido acepta **transparentemente** JWT en cabecera o cookie de sesión respaldada por Redis con expiración deslizante, soporte multi-dispositivo y revocación individual o masiva.

### 2FA de verdad

TOTP compatible con Google Authenticator (secreto cifrado en reposo con AES-256-GCM), OTP por email vía Resend, y 10 códigos de respaldo generados con CSPRNG y almacenados como hash bcrypt — no en texto plano.

### VaultAuth como proveedor OAuth 2.0 / OIDC

El backend actúa como Authorization Server: Authorization Code + PKCE (S256 obligatorio para clientes públicos), rotación de refresh tokens, portal de desarrollador para registrar apps, y los endpoints de descubrimiento estándar (`/.well-known/openid-configuration`, `/.well-known/jwks.json`).

### El flujo completo, probado por un tercero real

```
Browser                  Demo App (3002)            VaultAuth (3000)
   │── click "Sign in" ────────►│                          │
   │◄── redirect (PKCE) ────────│                          │
   │── GET /oauth/authorize ───────────────────────────────►│
   │  [login + pantalla de consentimiento en VaultAuth]     │
   │◄── redirect con code ──────────────────────────────────│
   │── callback ────────────────►│── POST /oauth/token ────►│
   │                             │◄── { access_token } ─────│
   │                             │── GET /oauth/userinfo ──►│
   │                             │◄── { sub, email, name } ─│
   │◄── sesión httpOnly ─────────│                          │
```

## 🔐 Postura de seguridad (auditada contra OWASP Top 10)

| Área | Decisión |
|---|---|
| Confusión de algoritmo | `algorithms: ['HS256']` fijado explícitamente en cada verificación JWT |
| Almacenamiento de tokens | Cookies httpOnly + Secure + SameSite; nunca `localStorage` |
| Secretos TOTP | Cifrados con AES-256-GCM antes de escribir en base de datos |
| Revocación de sesiones | Denylist en Redis para refresh tokens, revocación individual con verificación de propiedad |
| CSRF | Patrón de doble envío cookie/cabecera en cada endpoint mutable |
| Bloqueo de cuenta | 5 intentos fallidos → bloqueo de 15 minutos por email en Redis |
| OAuth — PKCE | S256 obligatorio para clientes públicos; `code_verifier` validado con SHA-256 + base64url |
| OAuth — `client_secret` | Hash bcrypt en base de datos; se muestra en texto plano una única vez al registrar la app |
| Auditoría | Cada evento de autenticación queda persistido en una tabla `AuditLog` de Postgres |

## 🧩 Diseño modular: el OAuth provider es opcional

El módulo de OAuth (backend) y el portal de desarrollador (frontend) se pueden eliminar sin tocar el resto del sistema — login, 2FA, sesiones y login social siguen funcionando igual:

```ts
// src/app.module.ts (backend)
// Eliminar esta línea:
import { OAuthModule } from './features/oauth/oauth.module';

@Module({
  imports: [
    // OAuthModule,  ← eliminar
  ],
})
```

Esa separación limpia entre "sistema de auth" y "proveedor OAuth para terceros" fue una decisión deliberada — no todo el que necesita autenticación necesita también ser un identity provider.

## 📚 Qué aprendí

- **PKCE de verdad**, no solo la teoría: implementar el flujo completo desde el lado del provider (validar `code_challenge`/`code_verifier`) y desde el lado del cliente (`vaultauth-demo-app` con NextAuth v5).
- **HS256 fijado explícitamente** — dejar que la librería JWT "adivine" el algoritmo desde el header del token es una vulnerabilidad clásica (algorithm confusion).
- **Cookies del backend reenviadas correctamente al navegador** desde un frontend en otro puerto/dominio, manejando el padding `=` de JWT en base64 en el parser de `Set-Cookie`.
- **Separar "autenticar usuarios" de "ser un identity provider para terceros"** como dos responsabilidades independientes y desactivables.

## 🚧 Limitaciones

- Es un sistema self-hosted pensado para levantar localmente o en tu propia infraestructura — no hay una instancia pública gestionada.
- El scope OIDC soportado es acotado (`openid`, `profile`, `email`, `notes`); no implementa todo el espectro de OIDC.
- Sin panel de administración multi-organización — el portal de desarrollador es por usuario, no por equipo.

## 👤 Rol

Diseño, arquitectura y desarrollo de los tres repositorios: backend (NestJS), frontend (Next.js) y la demo de integración de terceros.
