# PRD-01: Pagina Publica de Contributors

## Metadata
- Version: 1.0
- Fecha creacion: 2026-01-02
- Estado: Por desarrollar
- Tipo: Funcionalidad publica

---

## 1. Objetivo

Crear una pagina publica visible para todos los visitantes donde se reconozca y destaque a las personas que han contribuido al proyecto a traves de Pull Requests aceptados.

### Por que es importante
- Reconocer el esfuerzo de quienes aportan a la comunidad
- Incentivar nuevas contribuciones al mostrar que se valora el trabajo
- Transparencia sobre quienes construyen el proyecto
- Generar sentido de pertenencia en la comunidad

---

## 2. Funcionalidades

### 2.1 Listado de Contributors
- Mostrar avatar de GitHub
- Nombre/username del contributor
- Numero de contribuciones aceptadas
- Enlace a su perfil de GitHub
- Fecha de primera contribucion (opcional)

### 2.2 Ordenamiento
- Por defecto: ordenar por numero de contribuciones (mayor a menor)
- Alternativa: ordenar por fecha de contribucion mas reciente

### 2.3 Tipos de Contribuciones
Reconocer diferentes tipos de aportes:
- Codigo (features, fixes)
- Documentacion
- Tips
- Recursos
- Traducciones

---

## 3. Implementacion Tecnica

### Opcion A: Integracion con GitHub API
```
GET https://api.github.com/repos/{owner}/{repo}/contributors
```
- Ventaja: Datos siempre actualizados automaticamente
- Desventaja: Rate limits de API, dependencia externa

### Opcion B: Archivo estatico + GitHub Action
- Archivo JSON con lista de contributors
- GitHub Action que actualiza el archivo periodicamente
- Ventaja: Sin rate limits, rapido
- Desventaja: Requiere setup de CI/CD

### Recomendacion
Comenzar con **Opcion B** para tener control y evitar dependencias en tiempo real. El GitHub Action puede correr diariamente o en cada merge a main.

---

## 4. Diseno UI

### Componentes
- Grid responsive de cards de contributors
- Cada card con:
  - Avatar circular
  - Nombre
  - Badge con numero de contribuciones
  - Icono segun tipo de contribucion principal

### Ubicacion
- Nueva ruta: `/contributors`
- Enlace desde footer y/o navegacion principal

---

## 5. Criterios de Aceptacion

- [ ] Pagina accesible en `/contributors`
- [ ] Muestra al menos avatar, nombre y link a GitHub
- [ ] Ordenamiento por contribuciones funcional
- [ ] Responsive (mobile y desktop)
- [ ] Datos actualizados (manual o automatico)

---

## 6. Dependencias

- Acceso al repositorio de GitHub
- Definir si se usa API en tiempo real o archivo estatico
- Diseño visual aprobado

---

## Referencias

- [GitHub Contributors API](https://docs.github.com/en/rest/repos/repos#list-repository-contributors)
- Documento principal: [00-PRD-vision.md](./00-PRD-vision.md)

