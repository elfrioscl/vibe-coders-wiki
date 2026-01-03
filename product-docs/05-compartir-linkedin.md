# PRD-05: Compartir Resultados en LinkedIn

## Metadata
- Version: 2.1
- Fecha creacion: 2026-01-02
- Ultima actualizacion: 2026-01-02
- Estado: Implementado

---

## 1. Objetivo

Permitir que los usuarios compartan sus resultados del test de nivel en LinkedIn con un preview personalizado que genere curiosidad y atraiga nuevos usuarios al sitio.

---

## 2. Experiencia del Usuario

### Pantalla de resultado

Al finalizar el test, el usuario ve:

1. **Titulo con su nivel** (ej: "Nivel Intermedio") con emoji correspondiente
2. **Estadisticas comparativas**: Solo el texto "X% de las personas que tomaron el test estan en tu mismo nivel"
3. **Stats**: Correctas, incorrectas y no se
4. **Boton principal**: "Compartir en LinkedIn"
5. **Boton secundario**: "Descargar el resultado"
6. **Botones de navegacion** a guias recomendadas

### Flujo de compartir

1. Usuario hace clic en "Compartir en LinkedIn"
2. Se abre LinkedIn con la URL: `vibe-coders.es/og/{nivel}.html`
3. LinkedIn lee los OG tags de la pagina HTML estatica y muestra el preview
4. Quien ve el post hace clic y llega a `/og/{nivel}.html`
5. La pagina HTML estatica invita al visitante a hacer su propio test con enlace a `/test-nivel?start=true`

---

## 3. Opciones Disponibles

| Opcion | Descripcion |
|--------|-------------|
| Compartir en LinkedIn | Abre LinkedIn con URL estatica por nivel |
| Descargar el resultado | Descarga imagen del certificado para compartir manualmente |

---

## 4. Funcionalidades

### 4.1 Preview en LinkedIn (OG tags)

Cuando alguien comparte su resultado, LinkedIn debe mostrar:
- Titulo dinamico: "Soy nivel [NIVEL] en Vibe Coding!"
- Descripcion invitando a hacer el test
- Imagen personalizada con el nivel (estatica, pre-generada)

**Nota tecnica:** LinkedIn no ejecuta JavaScript. Los OG tags se sirven desde archivos HTML estaticos en `public/og/` con los meta tags fijos (ej: `public/og/intermedio.html`).

### 4.2 Imagen del Certificado

La imagen (tanto para OG como para descarga) tiene el siguiente layout:

```
┌────────────────────────────────────────┐
│                                        │
│         [emoji grande - 🚀]            │
│                                        │
│      NIVEL INTERMEDIO                  │  ← Verde accent, grande
│      DE VIBE CODING                    │  ← Blanco
│                                        │
│      ─────────────────────             │  ← Linea decorativa
│                                        │
│      Descubre tu nivel                 │  ← CTA
│      vibe-coders.es/test-nivel         │  ← URL prominente
│                                        │
└────────────────────────────────────────┘
```

Elementos:
- Emoji segun nivel: 🌱 inicial, 🚀 intermedio, ⚡ avanzado, 🏆 expert
- Titulo en dos lineas: "NIVEL [X]" + "DE VIBE CODING"
- Linea decorativa horizontal
- CTA: "Descubre tu nivel"
- URL visible y prominente

La imagen NO muestra:
- Porcentaje de aciertos
- Tiempo

Las imagenes estan pre-generadas en `public/images/share/nivel-{nivel}.png`.

### 4.3 Pagina Publica de Certificado

Ruta: `vibe-coders.es/og/{nivel}.html`

Niveles posibles:
- `/og/inicial.html`
- `/og/intermedio.html`
- `/og/avanzado.html`
- `/og/expert.html`

La pagina muestra:
- Titulo invitando a medir tu nivel de Vibe Coding
- Descripcion del test adaptativo
- Card con explicacion de como funciona el test
- Branding de Vibe Coders
- CTA prominente: "Comenzar test" (enlaza a `/test-nivel?start=true`)

**Caracteristicas tecnicas:**
- Paginas HTML estaticas en `public/og/{nivel}.html`
- OG tags completos para LinkedIn y Twitter/X
- Meta tag `<meta name="robots" content="noindex, nofollow">` para evitar indexacion en Google
- Estilos inline para renderizado independiente
- Fuente DM Sans cargada desde Google Fonts

**Flujo tecnico:**
1. Al completar el test, se determina el nivel final
2. Al hacer clic en "Compartir en LinkedIn", se abre: `linkedin.com/sharing/share-offsite/?url=vibe-coders.es/og/{nivel}.html`
3. LinkedIn visita la pagina HTML estatica y lee los OG tags
4. Visitantes ven la pagina HTML con CTA para comenzar el test

### 4.4 Loop Viral

- Cada certificado compartido debe llevar a nuevos usuarios al test
- El CTA debe ser claro y atractivo

---

## 5. Arquitectura

### Componentes React (pagina de resultados)

Para la pantalla de resultados en `TestNivel.tsx`:

| Componente | Ubicacion | Uso |
|------------|-----------|-----|
| `ResultHeader` | `src/components/ResultHeader.tsx` | Header con emoji, titulo y descripcion del nivel |
| `nivelDescripciones` | `src/utils/testLogic.ts` | Fuente de verdad para titulos, descripciones, colores y emojis |

### Archivos principales

| Archivo | Proposito |
|---------|-----------|
| `public/og/{nivel}.html` | Paginas HTML estaticas con OG tags para LinkedIn |
| `src/pages/TestNivel.tsx` | Pagina del test (incluye resultados y botones de share) |
| `src/components/ResultHeader.tsx` | Componente para mostrar nivel en resultados |
| `public/images/share/nivel-{nivel}.png` | Imagenes pre-generadas para OG |
| `src/hooks/useCanvasShare.ts` | Hook para generar y descargar imagen del certificado |

---

## 6. Metricas de Exito

- Cantidad de resultados compartidos en LinkedIn
- Tasa de conversion: visitantes del certificado → nuevos tests completados
- Ratio de compartidos por test completado

---

## Referencias

- Documento principal: [00-PRD-vision.md](./00-PRD-vision.md)
- Componente resultados: `src/components/ResultHeader.tsx`
- Paginas OG share: `public/og/{nivel}.html`
- Imagenes share: `public/images/share/nivel-{nivel}.png`
