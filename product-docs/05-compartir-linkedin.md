# PRD-05: Compartir Resultados en LinkedIn

## Metadata
- Version: 2.0
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
2. Se abre LinkedIn con la URL: `vibe-coders.es/share/{nivel}`
3. LinkedIn lee los OG tags de la pagina y muestra el preview
4. Quien ve el post hace clic y llega a `/share/{nivel}`
5. La pagina del certificado invita al visitante a hacer su propio test

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

**Nota tecnica:** LinkedIn no ejecuta JavaScript. Si los OG tags no se leen correctamente desde React, se crearan archivos HTML estaticos en `public/share/` con los meta tags fijos.

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

Ruta: `vibe-coders.es/share/{nivel}`

Niveles posibles:
- `/share/inicial`
- `/share/intermedio`
- `/share/avanzado`
- `/share/expert`

La pagina muestra:
- El nivel con emoji correspondiente (usando componente `ResultHeader` compartido)
- Branding de Vibe Coders
- CTA prominente: "Haz tu propio test"
- CTA secundario: "Ver guia recomendada"

**Caracteristicas tecnicas:**
- Pagina React en `src/pages/ShareResult.tsx`
- Usa componente `ResultHeader` compartido con `TestNivel.tsx` para sincronizacion automatica
- Meta tag `<meta name="robots" content="noindex, nofollow">` para evitar indexacion en Google
- Valida que el nivel sea valido, si no redirige a 404

**Flujo tecnico:**
1. Al completar el test, se determina el nivel final
2. Al hacer clic en "Compartir en LinkedIn", se abre: `linkedin.com/sharing/share-offsite/?url=vibe-coders.es/share/{nivel}`
3. LinkedIn visita la pagina y lee los OG tags
4. Visitantes ven la pagina React con CTAs

### 4.4 Loop Viral

- Cada certificado compartido debe llevar a nuevos usuarios al test
- El CTA debe ser claro y atractivo

---

## 5. Arquitectura

### Componentes compartidos

Para mantener sincronizacion automatica entre la pagina de resultados y la pagina de share:

| Componente | Ubicacion | Uso |
|------------|-----------|-----|
| `ResultHeader` | `src/components/ResultHeader.tsx` | Header con emoji, titulo y descripcion del nivel |
| `nivelDescripciones` | `src/utils/testLogic.ts` | Fuente de verdad para titulos, descripciones, colores y emojis |

### Archivos principales

| Archivo | Proposito |
|---------|-----------|
| `src/pages/ShareResult.tsx` | Pagina publica de share |
| `src/pages/TestNivel.tsx` | Pagina del test (usa ResultHeader en resultados) |
| `src/components/ResultHeader.tsx` | Componente compartido |
| `public/images/share/nivel-{nivel}.png` | Imagenes pre-generadas para OG |

---

## 6. Metricas de Exito

- Cantidad de resultados compartidos en LinkedIn
- Tasa de conversion: visitantes del certificado → nuevos tests completados
- Ratio de compartidos por test completado

---

## Referencias

- Documento principal: [00-PRD-vision.md](./00-PRD-vision.md)
- Componente: `src/components/ResultHeader.tsx`
- Pagina share: `src/pages/ShareResult.tsx`
