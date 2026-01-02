# PRD-05: Compartir Resultados en LinkedIn

## Metadata
- Version: 1.5
- Fecha creacion: 2026-01-02
- Estado: En implementacion

---

## 1. Objetivo

Permitir que los usuarios compartan sus resultados del test de nivel en LinkedIn con un preview personalizado que genere curiosidad y atraiga nuevos usuarios al sitio.

---

## 2. Experiencia del Usuario

### Pantalla de resultado

Al finalizar el test, el usuario ve:

1. **Titulo con su nivel** (ej: "Eres nivel Intermedio")
2. **Estadisticas comparativas**: Solo el texto "X% de las personas que tomaron el test estan en tu mismo nivel"
3. **Stats**: Correctas, incorrectas y no se
4. **Boton principal**: "Compartir en LinkedIn"
5. **Boton secundario**: "Descargar el resultado"
6. **Botones de navegacion** a guias recomendadas

### Flujo de compartir

1. Usuario hace clic en "Compartir en LinkedIn"
2. Se abre LinkedIn con la URL de la edge function pre-cargada
3. LinkedIn lee los OG tags y muestra el preview personalizado
4. Quien ve el post hace clic y llega a la edge function
5. Edge function redirige instantaneamente a `vibe-coders.es/share/{id}`
6. La pagina del certificado invita al visitante a hacer su propio test

---

## 3. Opciones Disponibles

| Opcion | Descripcion |
|--------|-------------|
| Compartir en LinkedIn | Abre LinkedIn con URL que tiene OG dinamico |
| Descargar el resultado | Descarga imagen del certificado para compartir manualmente |

---

## 4. Funcionalidades

### 4.1 Preview en LinkedIn (OG tags)

Cuando alguien comparte su resultado, LinkedIn debe mostrar:
- Titulo dinamico: "Soy nivel [NIVEL] en Vibe Coding!"
- Descripcion invitando a hacer el test
- Imagen personalizada con el nivel (generada dinamicamente)

### 4.2 Imagen del Certificado

La imagen generada (tanto para OG como para descarga) tiene el siguiente layout:

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

### 4.3 Pagina Publica de Certificado

Ruta: `vibe-coders.es/share/{share_id}`

La pagina muestra:
- El nivel del usuario con emoji correspondiente
- Branding de Vibe Coders
- CTA prominente: "Haz tu propio test"

**Flujo tecnico:**
1. Al completar el test, se genera un `share_id` unico
2. Al compartir, la URL apunta a la edge function: `[supabase]/share-page?id={share_id}`
3. La edge function retorna HTML con meta tags OG:
   - `og:title`: "Soy nivel [NIVEL] en Vibe Coding!"
   - `og:description`: Invitacion a hacer el test
   - `og:image`: Imagen generada dinamicamente
   - `og:url`: `vibe-coders.es/share/{id}`
4. La edge function incluye meta refresh que redirige a `vibe-coders.es/share/{id}`
5. LinkedIn lee los OG tags antes del redirect
6. Los usuarios son redirigidos a la pagina React del certificado

### 4.4 Loop Viral

- Cada certificado compartido debe llevar a nuevos usuarios al test
- El CTA debe ser claro y atractivo

---

## 5. Metricas de Exito

- Cantidad de resultados compartidos en LinkedIn
- Tasa de conversion: visitantes del certificado → nuevos tests completados
- Ratio de compartidos por test completado

---

## Referencias

- Documento principal: [00-PRD-vision.md](./00-PRD-vision.md)
