# PRD-05: Compartir Resultados en LinkedIn

## Metadata
- Version: 1.4
- Fecha creacion: 2026-01-02
- Estado: Por implementar

---

## 1. Objetivo

Permitir que los usuarios compartan sus resultados del test de nivel en LinkedIn con un preview personalizado que genere curiosidad y atraiga nuevos usuarios al sitio.

---

## 2. Experiencia del Usuario

### Pantalla de resultado

Al finalizar el test, el usuario ve:

1. **Titulo con su nivel** (ej: "Eres nivel Intermedio")
2. **Estadisticas**: Correctas, incorrectas y no sé
3. **Boton principal**: "Compartir en LinkedIn"
4. **Boton secundario**: "Descargar imagen del certificado"
5. **Estadisticas comparativas** (porcentaje de usuarios en cada nivel)
6. **Botones de navegacion** a guias recomendadas

### Flujo de compartir

1. Usuario hace clic en "Compartir en LinkedIn"
2. Se abre LinkedIn con la URL del certificado pre-cargada
3. LinkedIn muestra automaticamente el preview personalizado (OG tags)
4. Quien ve el post puede hacer clic y llegar a la pagina del certificado
5. La pagina del certificado invita al visitante a hacer su propio test

---

## 3. Opciones Disponibles

| Opcion | Descripcion |
|--------|-------------|
| Compartir en LinkedIn | Abre LinkedIn con URL del certificado que tiene OG dinamico |
| Descargar imagen | Descarga imagen del certificado para compartir manualmente |

---

## 4. Funcionalidades

### 4.1 Preview en LinkedIn (OG tags)

Cuando alguien comparte su resultado, LinkedIn debe mostrar:
- Titulo dinamico: "Soy nivel [NIVEL] en Vibe Coding!"
- Descripcion invitando a hacer el test
- Imagen personalizada con el nivel (que lee de los OGs)

### 4.2 Imagen del Certificado

La imagen generada (tanto para OG como para descarga) muestra:
- Solo el nivel del usuario
- NO muestra porcentaje de aciertos

### 4.3 Pagina Publica de Certificado

El link de la pagina con los OGs accesible sin login que muestra:
- El resultado del usuario (solo nivel)
- Branding de Vibe Coders
- CTA prominente: "Haz tu propio test"
- La url tiene un share_id unico generado al completar el test

**Flujo tecnico:**
1. Al completar el test, se genera un `share_id` unico
2. La URL de compartir tiene formato: `[dominio]/share-page?id={share_id}`
3. Esta pagina contiene los meta tags OG que LinkedIn lee automaticamente:
   - `og:title`: "Soy nivel [NIVEL] en Vibe Coding!"
   - `og:description`: Invitacion a hacer el test
   - `og:image`: Apunta a la imagen generada dinamicamente

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
