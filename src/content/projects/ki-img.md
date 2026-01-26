---
title: "ki.img — Micro CDN de imágenes"
description: "Un experimento full‑stack para subir imágenes públicas y servirlas como si fuera un mini‑CDN. Fue mi primer proyecto serio manejando subida de archivos, validaciones y formularios para imágenes, aplicando patrón MVC con Handlebars y mi paquete n‑express (sobre Express). No es un producto para producción; es un proyecto de aprendizaje pulido y presentable."
type: "personal"
category: "web-development"
image: "https://raw.githubusercontent.com/KamerrEzz/mc-zoneroyale/main/zone-royale-banner.jpg"
technologies: ["expressjs", "handlebars"]
github: "https://github.com/KamerrEzz/ki.img"
featured: false
status: "completed"
date: "2020-03-14"
startDate: "2025-07-10"
role: "Desarrollador Principal"
---

# ki.img — Micro CDN de imágenes (Proyecto Full‑Stack)

> **Resumen corto**: Un experimento full‑stack para subir imágenes públicas y servirlas como si fuera un mini‑CDN. Fue mi primer proyecto serio manejando **subida de archivos**, **validaciones** y **formularios** para imágenes, aplicando **patrón MVC** con **Handlebars** y mi paquete **n‑express** (sobre Express). No es un producto para producción; es un proyecto de aprendizaje pulido y presentable.

---

## 🎯 Objetivo

Construir una app simple y bonita para **subir imágenes** y obtener **URLs públicas** reutilizables en cualquier sitio (portafolios, blogs, pruebas). El enfoque fue entender a fondo el **flujo de upload**, **validar** archivos y **servirlos eficientemente** con rutas estáticas y cabeceras de caché, imitando el comportamiento de un CDN.

---

## 🧱 Stack & Arquitectura

* **Backend**: Node.js + Express (con mi wrapper **n‑express**)
* **Patrón**: **MVC** (Modelo, Vista, Controlador)
* **Vistas**: **Handlebars** (templating)
* **Almacenamiento**: sistema de archivos local (carpeta `/public/uploads`)
* **Estilos**: CSS sencillo (utility classes propias)
* **Validación/Upload**: middlewares personalizados (tipo, tamaño, dimensiones opcionales)
* **Estrategia de servido**: rutas públicas con **cache-control** para simular CDN

```
app/
├─ controllers/
│  └─ image.controller.js
├─ models/
│  └─ image.model.js
├─ views/
│  ├─ layout.hbs
│  └─ upload.hbs
├─ routes/
│  └─ image.routes.js
├─ public/
│  └─ uploads/   # archivos servidos públicamente
└─ core/
   └─ n-express/ # helpers propios
```

---

## ✨ Features clave

* **Upload público** de imágenes con formulario (drag & drop + selector).
* **Validaciones**: tipo MIME permitido (JPEG/PNG/WebP), tamaño máximo, (opcional) dimensiones mínimas.
* **Normalización** de nombre de archivo: slug + hash corto para evitar colisiones.
* **Cabeceras de caché** (`Cache-Control: public, max-age=31536000, immutable`).
* **Auto-orientación** según EXIF (cuando aplica).
* **Página de detalle** con metadatos básicos y preview embebible (`<img src="..." />`).
* **Listado paginado** de últimas subidas.

> **No‑objetivo**: alta disponibilidad, multi‑región o seguridad empresarial; el foco fue **aprendizaje** del flujo completo.

---

## 🔐 Validaciones & seguridad básica

* **Filtro de tipo** (solo imágenes) y **límite de tamaño** por request.
* **Sanitización** de nombres y rutas; sin usar el nombre original directamente.
* **Rate‑limit** básico por IP para el endpoint de subida.
* **Remoción de metadatos sensibles** (opcional) y corrección de orientación.

---

## 🧭 Flujo de carga (happy path)

1. Usuario abre `/upload` → formulario Handlebars.
2. Selecciona imagen → previsualización local.
3. **POST** `/images` con `multipart/form-data`.
4. Middleware valida **tipo/tamaño**; si pasa, genera **slug+hash**.
5. Guarda archivo en `/public/uploads/{yyyy}/{mm}/{slug-hash}.ext`.
6. Responde con **URL pública**: `/cdn/{yyyy}/{mm}/{slug-hash}.ext`.
7. Navegador puede **cachear** esa URL por largo tiempo.

---

## 🧩 Snippet representativo (Express)

> Nota: en el proyecto real utilicé mi wrapper **n‑express**; este snippet es equivalente con Express puro para referencia.

```js
import express from 'express'
import multer from 'multer'
import crypto from 'crypto'
import path from 'path'

const app = express()
const upload = multer({
  limits: { fileSize: 5 * 1024 * 1024 }, // 5MB
  fileFilter: (req, file, cb) => {
    const ok = ['image/jpeg', 'image/png', 'image/webp'].includes(file.mimetype)
    cb(ok ? null : new Error('Tipo no permitido'), ok)
  }
})

app.use('/cdn', express.static('public/uploads', {
  setHeaders(res) {
    res.setHeader('Cache-Control', 'public, max-age=31536000, immutable')
  }
}))

app.post('/images', upload.single('image'), (req, res) => {
  if (!req.file) return res.status(400).json({ error: 'Archivo requerido' })
  const ext = {
    'image/jpeg': '.jpg',
    'image/png' : '.png',
    'image/webp': '.webp'
  }[req.file.mimetype]

  const hash = crypto.randomBytes(6).toString('hex')
  const slug = (req.body.title || 'image').toLowerCase().replace(/[^a-z0-9]+/g, '-')
  const filename = `${slug}-${hash}${ext}`
  // ... mover buffer a /public/uploads/yyyy/mm/filename
  return res.json({ url: `/cdn/2025/08/${filename}` })
})
```

---

## 📚 Qué aprendí

* Implementar **MVC** real con separación clara entre rutas, controladores y vistas.
* **Manejo de formularios** de archivos de principio a fin (front + back).
* **Validaciones** prácticas para archivos y feedback de errores al usuario.
* **Estrategias de cache** y versionado por nombre para recursos estáticos.
* **Buenas prácticas** mínimas de seguridad para uploads públicos.

---

## 📦 Cómo correr (demo local)

```bash
# 1) Instalar dependencias
pnpm i

# 2) Variables (opcional)
# MAX_UPLOAD_MB=5

# 3) Ejecutar en dev
pnpm dev

# 4) Abrir
http://localhost:3000/upload
```

---

## 🔗 Endpoints principales

* `GET /upload` → formulario de subida
* `POST /images` → procesa y guarda la imagen
* `GET /cdn/:yyyy/:mm/:filename` → sirve la imagen con caché
* `GET /images/:id` → detalle (preview, metadatos)
* `GET /images` → listado paginado

---

## 🚧 Limitaciones (intencionales)

* Almacenamiento **local** (sin S3/Cloudflare R2).
* Sin **transformaciones** on‑the‑fly (resize/crop) ni firmas temporales.
* Sin **CDN real** ni multi‑región.

> Estas restricciones ayudaron a enfocar el aprendizaje en el **flujo base**. Como siguiente paso, migraría a un bucket (S3/R2) y firmaría URLs para control de acceso.

---

## 🗺️ Roadmap breve

* [ ] Integrar **S3/R2** con presigned URLs.
* [ ] **Miniaturas** y transformaciones offline.
* [ ] Panel simple con métricas (conteo de requests, tamaño total almacenado).
* [ ] Pruebas básicas de integración.

---

## 👤 Rol y contribución

Proyecto individual. Me encargué de **diseño de arquitectura**, **backend**, **frontend con Handlebars**, **validaciones**, **servido estático** y **documentación**.

---

## 📸 Screenshots (placeholders)

* Upload form → *\[imagen]*
* Detalle de imagen → *\[imagen]*
* Lista de imágenes → *\[imagen]*

---

## Licencia

Uso educativo / demo.
