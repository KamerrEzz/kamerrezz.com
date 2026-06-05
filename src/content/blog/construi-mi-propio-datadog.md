---
title: "Construí mi propio Datadog (y aprendí Go en el proceso)"
description: "¿Cómo funciona Datadog por dentro? En lugar de pagar el plan, decidí construirlo desde cero: agente, servidor, dashboard, alertas y webhooks. Esta es la historia."
pubDate: "2026-06-05"
heroImage: '../../assets/blog-placeholder-3.jpg'
---

¿Cómo funciona Datadog por dentro?

Esa pregunta se quedó dando vueltas en mi cabeza durante semanas. Usaba Datadog en algunos proyectos, veía las métricas, las alertas, los dashboards. Pero no entendía el mecanismo real. Y cuando fui a contratar el plan para algo personal, vi el precio y pensé: *esto lo puedo construir yo*.

No como alternativa de producción. No para competir con Datadog. Sino para entender.

Así nació MiniObserv.

---

## Lo que construí

No fue un prototipo de un fin de semana. Fueron cinco semanas de trabajo real, con decisiones de arquitectura que tuve que justificar, código que tuve que descartar y reescribir, y conceptos que nunca había tocado.

El sistema tiene cuatro partes:

**Agente** — corre en el host que quieres monitorear. Recolecta métricas del sistema y las envía al servidor cada cierto intervalo.

**Servidor** — recibe las métricas, las persiste, evalúa las reglas de alerta y gestiona los estados.

**Dashboard** — interfaz para visualizar el estado de los hosts, las métricas en tiempo real y el historial de alertas.

**Alertas y webhooks** — cuando una métrica supera un umbral, el sistema dispara una notificación. Puedes conectarlo a Discord, Slack, o lo que necesites mediante webhooks.

---

## Lo que aprendí técnicamente

Tres cosas que no sabía y que ahora entiendo de verdad:

### CPU deltas desde `/proc/stat`

En Linux, el CPU no te dice "estás al 80%". Te dice cuántos ticks ha acumulado en cada estado (user, system, idle, iowait...) desde que arrancó la máquina. Para saber el porcentaje real, tienes que leer dos snapshots con un intervalo entre ellos y calcular el delta.

```
cpu_usage = (delta_active / delta_total) * 100
```

Suena simple. Pero entender por qué funciona así, y por qué no puedes tomar una sola lectura, fue uno de esos momentos donde las cosas hacen *clic*.

### JWT sin tabla de usuarios

Para autenticar el agente contra el servidor usé JWT, pero sin base de datos de usuarios. El token se genera una sola vez al registrar el host, se firma con una clave secreta y el servidor lo valida en cada petición. Sin sesiones, sin queries, sin estado en servidor.

Es un patrón que conocía en teoría pero nunca había implementado desde cero. Aquí lo tuve que hacer funcionar en Go, entendiendo cada campo del payload y qué pasa si el token expira.

### Máquinas de estado para alertas

Las alertas no son binarias. Una alerta no existe o no existe: primero está en `pending` (la condición se cumplió pero todavía no se confirma), luego pasa a `firing` (ya se disparó), y cuando la condición desaparece va a `resolved`.

Modelar eso como una máquina de estado explícita —con transiciones definidas y sin ifs dispersos por todo el código— fue la decisión que más me costó entender y la que más me gustó cuando funcionó.

### `statFn` injection para tests

El agente lee métricas del sistema operativo. Pero en los tests no quieres depender del sistema real. La solución fue inyectar la función de lectura como dependencia:

```go
type Collector struct {
    statFn func() (Stat, error)
}
```

En producción le pasas la función real. En los tests le pasas una función mock. Aprendí esto como patrón en Go y ahora lo veo en todos lados.

---

## Go era nuevo para mí

Mi stack es JavaScript y TypeScript. SaaS, Node, APIs, frontend. Go no era parte de mi mundo.

MiniObserv fue mi primer proyecto real en Go. Y lo elegí a propósito: si quiero entender cómo funcionan las herramientas de infraestructura, tiene sentido usarlas en el lenguaje en el que están escritas.

Lo que más me sorprendió fue la simplicidad forzada. Go no te deja hacer malabares. Si algo se complica demasiado, el lenguaje te está diciendo que estás yendo por el camino equivocado. Esa restricción al principio frustra. Después agradeces.

Me gustó mucho. Voy a seguir usándolo.

---

## Cómo usé la IA en este proyecto

Quiero ser honesto sobre esto porque se habla mucho de IA pero poco de cómo se usa de verdad.

No usé IA para que escribiera el código. Usé IA como profesor.

Cuando no entendía cómo funciona `/proc/stat`, le pregunté. Cuando no sabía cómo modelar la máquina de estados, discutí el diseño con ella. Cuando Go me lanzaba un error que no reconocía, la usé para entender qué estaba diciendo el compilador.

Las decisiones de arquitectura fueron mías. Qué persistir, cómo estructurar el servidor, cómo diseñar la API entre agente y servidor, cómo manejar los webhooks. Todo eso lo pensé yo, lo discutí, y luego lo implementé.

El resultado: un proyecto que solo me habría tomado 4 a 6 meses tardó 5 semanas. No porque la IA hiciera el trabajo, sino porque comprimió el tiempo de aprendizaje. Lo que habría tomado semanas entender leyendo documentación y foros lo pude resolver en horas con contexto y diálogo.

Eso es 50/50. La IA entiende rápido, yo decido y construyo.

---

## Por qué lo comparto

En Zeew Space la filosofía es simple: **aprendes construyendo cosas reales desde el primer día**.

No tutoriales de contador. No proyectos de práctica desconectados del mundo real. Proyectos como este, donde tienes que tomar decisiones, donde las cosas fallan por razones que no entiendes todavía, y donde al terminar sabes algo que no sabías antes.

MiniObserv es exactamente ese tipo de proyecto.

Si te interesa seguir este tipo de construcciones, unirte a la comunidad o aprender así, pásate por [zeew.space](https://zeew.space). Y si prefieres Discord, el link directo es [zeew.space/discord](https://zeew.space/discord).

Nos vemos por allá.
