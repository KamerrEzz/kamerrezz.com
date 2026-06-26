---
title: "Construí una extensión para no exponer mis credenciales mientras enseño"
description: "Grabando cursos para mi plataforma llegué a un punto donde tenía que mostrar Cloudflare y AWS en pantalla. No quería arriesgarme. Así que construí la solución."
pubDate: "2026-06-25"
---

Últimamente estoy grabando muchos más cursos para mi plataforma de educación. Me gusta cómo está quedando el resultado: contenido práctico, real, con los mismos paneles que uso día a día. Sin embargo, eso mismo que lo hace valioso también lo hace peligroso.

El momento crítico llegó cuando tuve que grabar una clase sobre cómo conectar CloudFront de AWS con los DNS de Cloudflare. Ahí estaba yo, con el panel de Cloudflare abierto, listo para grabar, y me di cuenta de algo incómodo: en esa pantalla había IPs de servidores, account IDs, tokens de API, nameservers... información que no quiero que nadie vea.

Podría haber pausado la grabación, cubierto la pantalla, editado el video después. Pero eso rompe el flujo. Y la verdad es que yo soy programador. Tengo que tener una solución mejor.

## La pregunta que lo cambió todo

Me pregunté: **¿existe alguna forma de censurar automáticamente esa información mientras grabo?**

Busqué extensiones existentes. Nada que realmente resolviera el problema de forma inteligente: que detectara el tipo de dato, lo reemplazara por una etiqueta descriptiva, y funcionara en cualquier dashboard sin configuración manual por cada campo.

Entonces tomé la decisión que tomamos los programadores cuando no encontramos la herramienta que necesitamos: construirla.

## Entendiendo cómo funciona una extensión

Nunca había construido una extensión de navegador. Sabía que existían, sabía que hacían cosas en el DOM, pero desconocía completamente la arquitectura. Así que me puse a investigar.

Manifest V3, content scripts, service workers, `chrome.storage`, `MutationObserver`... Todo un mundo nuevo. Pero un mundo ordenado. Una extensión tiene partes bien definidas: lo que corre en la página, lo que corre en el fondo, y lo que ves cuando haces clic en el icono. Una vez que entiendes eso, el resto es ingeniería normal.

Para la parte de detección de datos sensibles usé regex. Aquí sí pedí ayuda a la IA, especialmente para los patrones más complejos: IPv6, tokens de AWS con sus prefijos `AKIA`, llaves de Stripe con `sk_live_`, tokens de GitHub con `ghp_`... cada plataforma tiene su propio formato y algunos son bastante específicos. La IA fue una herramienta, no el autor. Yo dirigía, yo decidía qué era suficientemente específico para no generar falsos positivos.

## Lo que terminé construyendo

La extensión se llama **TeachMode — Privacy Shield**. Cuando está activa, recorre el DOM en tiempo real con un `TreeWalker` y un `MutationObserver`. Detecta el dato, lo reemplaza visualmente por un badge con su etiqueta (`IPV4`, `API TOKEN`, `CF ACCOUNT ID`, etc.) y deja el DOM original intacto.

Después le fui agregando más cosas:

- **Blur mode**: difumina elementos en lugar de ocultarlos, útil cuando quiero que se vea que hay algo ahí pero no el contenido
- **Click-to-Hide**: hago clic en cualquier elemento para ocultarlo; `Ctrl+Z` lo restaura
- **Always ON por dominio**: en Cloudflare siempre quiero que esté activo, entonces lo fijo y se activa solo al entrar
- **Patrones personalizados**: si tengo un ID interno de mi empresa que no tiene un formato estándar, lo agrego yo mismo desde el popup
- **17 plataformas**: AWS, GitHub, GCP, Stripe, Vercel, Netlify, Sentry, Fly.io, MongoDB, Supabase... cada una con sus patrones específicos
- **Detección de teléfonos**: números internacionales con prefijo `+`, sin tocar cosas como puertos o timestamps

Hice tests automatizados con Playwright sobre Edge para verificar todo esto. Sí, una extensión de navegador con tests E2E completos. Si lo hago, lo hago bien.

## Lo que me quedó pensando

Lo que más me gustó de todo esto no fue el resultado en sí, sino el proceso. Entrar a un territorio que no conocía, entender la arquitectura desde cero, tomar decisiones de diseño reales (¿cuándo un patrón es demasiado genérico para activarse globalmente?), construir algo que resuelve un problema mío concreto.

Eso es lo que me encanta de ser programador. No tienes que esperar a que alguien construya la herramienta que necesitas.

Por ahora la extensión está en GitHub y la uso yo directamente. Pero estoy evaluando publicarla en la Chrome Web Store y en la tienda de Edge, porque si yo tenía esa necesidad, es muy probable que alguien más también la tenga. A lo mejor también le doy un nombre más pulido cuando llegue ese momento.

Si te interesa el código o quieres usarla ya, está disponible en [GitHub](https://github.com/KamerrEzz/teachmode-privacy-shield). Se carga como extensión sin empaquetar en dos pasos.

---

*A veces la mejor forma de aprender algo nuevo es necesitarlo de verdad.*
