# System Design: Neobrutalism + Geist (2026 Trends)

Este documento detalla el patrón de diseño estandarizado a usar para crear, estructurar y mantener cualquier nueva landing page o sección para el proyecto `kamerrezz.com`.

## 1. Filosofía de Diseño
El diseño combina el minimalismo de interfaces corporativas como **Geist** (Vercel) con los contrastes acentuados, interacciones rudas y uso de geometría del **Neobrutalism** de 2026.

- **Diseño Radicalmente Estructurado**: Cada sección debe estar claramente demarcada con bordes de 1.5px (`border-white/10`).
- **Manejo del Espacio**: Se utiliza un enfoque tipo grilla o columnas que ocupan todo el ancho disponible, rompiendo el paradigma antiguo de las tarjetas flotantes en solitario.
- **Micro-interacciones Inesperadas**: El uso contundente de sombras duras (`shadow-[8px_8px_0_#d5338b]`) y transformaciones agresivas en Hover (`-translate-x-1 -translate-y-1`).

---

## 2. Paleta de Colores
En lugar de depender del archivo CSS, forzamos el diseño mediante utilidades directas y códigos precisos (Tailwind `v4` JIT):

- **Background (Global):** `#050505` (Negro matizado).
- **Background (Contenedores Principales):** `#0A0A0A` a `#111111`.
- **Textos Primarios:** `#FAFAFA` y `text-white`.
- **Textos Secundarios:** `text-zinc-400` o `text-zinc-500`.
- **Acentos Brutalistas:**
  - `Rosa React/Vercel:` `#d5338b` (Usado para sombras al hacer hover, highlights intensos).
  - `Amarillo Neón:` `#FAFF00` (Usado de forma ultra reducida, p.ej. en "Open to work" o etiquetas de Status).

---

## 3. Tipografía
- **Titulares:** Fuentes Sans-Serif (`font-sans`) con peso gigantesco (`font-black`, `text-6xl` a `text-8xl`), en estrecho (tracking-tighter) y en MAYÚSCULAS para grandes "Statements".
- **Data / Detalles:** Fuentes Monospace (`font-mono`) para pequeñas etiquetas, métricas, metadatos, tags y textos decorativos. Usan mayúsculas y mucho espacio entre letras (`uppercase tracking-widest` o `tracking-[0.2em]`).

---

## 4. Estructura Maestra de una Página
Una página sigue SIEMPRE la siguiente arquitectura DOM:

```html
<html lang="es" class="dark scroll-smooth">
  <body class="bg-[#050505] text-[#FAFAFA] font-sans ...">
    <!-- Grid Pattern Background -->
    <div style="background-image: radial-gradient(circle at 1px 1px, rgba(...)"></div>

    <!-- MAIN WRAPPER: Constrains width, adds main container border & shadow -->
    <div class="max-w-[1200px] mx-auto min-h-screen border-x-[1.5px] border-white/10 bg-[#0A0A0A]/90 backdrop-blur-md flex flex-col shadow-[0_0_80px_rgba(0,0,0,0.9)]">
        
        <!-- 1. NAVBAR (Sticky, 56px height, divided borders) -->
        <nav class="...">...</nav>

        <!-- 2. MAIN CONTENT -->
        <main class="flex-1 flex flex-col">
            <!-- Hero / Header Section -->
            <header>...</header>

            <!-- Rest of Content Sections separated by border-b-[1.5px] -->
            <section>...</section>
        </main>

        <!-- 3. FOOTER (Massive CTA + Link Grid) -->
        <footer class="...">...</footer>
    </div>
  </body>
</html>
```

---

## 5. UI Tooling & Snippets Mágicos

### Botón Principal Brutalista
```html
<a class="px-6 py-4 bg-[#d5338b] text-white font-mono text-sm font-black uppercase tracking-widest shadow-[6px_6px_0_0_#FAFAFA] hover:-translate-y-1 hover:-translate-x-1 hover:shadow-[8px_8px_0_0_#FAFAFA] transition-all">
    Conectemos ↗
</a>
```

### Separador de Bordes (Filosofía Geist)
Evita usar separadores "flotantes" (border-radius grandes para paneles sueltos). Fila y Columna se cruzan usando:
```html
<div class="grid grid-cols-1 md:grid-cols-12 border-b-[1.5px] border-white/10">
    <div class="md:col-span-6 border-b-[1.5px] md:border-b-0 md:border-r-[1.5px] border-white/10">Left</div>
    <div class="md:col-span-6">Right</div>
</div>
```

### Etiquetas de Tecnología o Status
```html
<span class="px-2 py-1 border-[1.5px] border-white/10 font-mono text-[10px] uppercase tracking-[0.2em] text-zinc-500 bg-white/5">
    TypeScript
</span>
```

### "Fake Browser Window" (Para previews de proyectos)
```html
<div class="h-6 w-full border-b-[1.5px] border-white/10 flex items-center px-3 gap-1.5 bg-white/5">
    <div class="w-2 h-2 rounded-full border-[1.5px] border-zinc-600"></div>
    <div class="w-2 h-2 rounded-full border-[1.5px] border-zinc-600"></div>
    <div class="w-2 h-2 rounded-full border-[1.5px] border-zinc-600"></div>
</div>
```

---

## 6. Reglas Finales de Código
- **Cero CSS manual en `<style>`**: Cada borde, color o animación DEBE utilizar clases nativas de Tailwind CSS.
- **Mobile-First siempre**: El diseño se divide verticalmente en móviles (`flex-col`, `border-b-[1.5px]`) y toma formas avanzadas de Grid a partir de `md:` o `lg:` (`md:grid-cols-12`).
- **El background global** de la web nunca es plano, tiene un `radial-gradient` o un `linear-gradient` muy sutil simulando un *dotted grid* o *graph paper* como se aprecia en el selector de Vercel/NextJS para darle el aspecto de *"Mesa de Arquitectura"*.
