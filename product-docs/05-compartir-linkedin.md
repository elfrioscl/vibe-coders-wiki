# PRD-05: Compartir Resultados en LinkedIn

## Metadata
- Version: 1.1
- Fecha creacion: 2026-01-02
- Estado: Por implementar

---

## 1. Objetivo

Permitir que los usuarios compartan sus resultados del test de nivel en LinkedIn con un preview personalizado que genere curiosidad y atraiga nuevos usuarios al sitio.

---

## 2. Problema

El flujo actual de compartir tiene limitaciones:
1. La descarga de imagen no funciona bien en iOS Safari
2. LinkedIn muestra un preview generico del sitio, no del resultado personal
3. No hay incentivo para que otros usuarios hagan el test (falta loop viral)

---

## 3. Funcionalidades

### 3.1 Preview Personalizado en LinkedIn
Cuando alguien comparte su resultado, LinkedIn debe mostrar:
- Titulo dinamico: "Soy nivel [NIVEL] en Vibe Coding!"
- Descripcion con porcentaje de aciertos
- Imagen personalizada con el resultado

### 3.2 Pagina Publica de Certificado
Una pagina accesible sin login que muestre:
- El resultado del usuario (nivel, porcentaje)
- Branding de Vibe Coders
- CTA prominente: "Haz tu propio test"

### 3.3 Loop Viral
- Cada certificado compartido debe llevar a nuevos usuarios al test
- El CTA debe ser claro y atractivo
- Medir conversion de visitantes a nuevos tests

---

## 4. Consideraciones de Privacidad

### Datos Publicos (visibles en el certificado)
- Nivel resultado
- Porcentaje de aciertos
- Fecha del test

### Datos Privados (nunca se muestran)
- Respuestas individuales
- Informacion del navegador/dispositivo

---

## 5. Criterios de Aceptacion

- [ ] Al compartir en LinkedIn, el preview muestra nivel y porcentaje del usuario
- [ ] La imagen del preview es unica por resultado
- [ ] La pagina de certificado carga sin requerir login
- [ ] El CTA "Haz tu propio test" es visible y funcional
- [ ] Funciona correctamente en iOS Safari
- [ ] No se exponen datos sensibles del usuario

---

## 6. Metricas de Exito

- Cantidad de resultados compartidos en LinkedIn
- Tasa de conversion: visitantes del certificado → nuevos tests completados
- Ratio de compartidos por test completado

---

## Referencias

- Documento principal: [00-PRD-vision.md](./00-PRD-vision.md)
