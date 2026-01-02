# PRD-02: Panel Interno para Miembros

## Metadata
- Version: 1.0
- Fecha creacion: 2026-01-02
- Estado: Por desarrollar
- Tipo: Funcionalidad interna (requiere autenticacion)

---

## 1. Objetivo

Crear un panel interno accesible solo para miembros de la comunidad donde puedan:
- Ver su progreso de aprendizaje
- Acceder a informacion exclusiva
- Ver issues abiertos de la comunidad
- Gestionar bookmarks y favoritos

### Diferencia con pagina publica
- **Pagina publica de Contributors**: Visible para todos, reconoce aportes
- **Panel de Miembros**: Solo para miembros autenticados, funcionalidades internas

---

## 2. Funcionalidades

### 2.1 Dashboard Personal
- Resumen de progreso en guias
- Tips guardados como favoritos
- Recursos marcados
- Estadisticas de uso

### 2.2 Progreso en Guias
- Marcar modulos como completados
- Barra de progreso por nivel (Inicial, Intermedio, Avanzado)
- Historial de actividad

### 2.3 Bookmarks y Favoritos
- Guardar tips favoritos
- Guardar recursos de interes
- Lista personalizada de acceso rapido

### 2.4 Issues Abiertos de la Comunidad
Seccion visible **solo para miembros** con temas no resueltos que la comunidad esta investigando:

#### Issues Actuales

| ID | Titulo | Descripcion | Estado |
|----|--------|-------------|--------|
| ISS-001 | Bytecoding para Apps Moviles | Como llevar proyectos de vibe coding a aplicaciones moviles nativas. Investigar frameworks, limitaciones y mejores practicas. | Abierto |
| ISS-002 | Integracion Logo + Shopify | Feedback y documentacion sobre como integrar Logo con Shopify. Casos de uso, problemas comunes, soluciones. | Abierto |

#### Gestion de Issues
- Cualquier miembro puede proponer nuevos issues
- Los issues se alimentan del grupo de WhatsApp (temas no resueltos)
- Se pueden cerrar cuando se encuentra solucion (y se documenta)

### 2.5 Certificados (Futuro)
- Certificado de completacion por nivel
- Exportable como imagen o PDF
- Verificable con codigo unico

---

## 3. Autenticacion

### Opciones
- **GitHub OAuth**: Preferido, ya que la comunidad usa GitHub
- **Email magico**: Alternativa sin password
- **Google OAuth**: Opcion adicional

### Niveles de Acceso
- **Visitante**: Solo contenido publico
- **Miembro**: Panel personal, issues, bookmarks
- **Contributor**: Todo lo anterior + reconocimiento en pagina publica

---

## 4. Arquitectura

### Nuevas tablas en base de datos
```sql
-- Tabla de miembros
CREATE TABLE miembros (
  id UUID PRIMARY KEY,
  github_username TEXT,
  email TEXT,
  created_at TIMESTAMP
);

-- Progreso en guias
CREATE TABLE progreso_guias (
  id UUID PRIMARY KEY,
  miembro_id UUID REFERENCES miembros(id),
  curso TEXT,
  modulo_id INT,
  completado BOOLEAN,
  fecha TIMESTAMP
);

-- Bookmarks
CREATE TABLE bookmarks (
  id UUID PRIMARY KEY,
  miembro_id UUID REFERENCES miembros(id),
  tipo TEXT, -- 'tip' | 'recurso'
  item_id TEXT,
  created_at TIMESTAMP
);

-- Issues de la comunidad
CREATE TABLE issues_comunidad (
  id UUID PRIMARY KEY,
  titulo TEXT,
  descripcion TEXT,
  estado TEXT, -- 'abierto' | 'cerrado' | 'en_progreso'
  creado_por UUID REFERENCES miembros(id),
  created_at TIMESTAMP,
  updated_at TIMESTAMP
);
```

### Rutas nuevas
```
/miembros/dashboard      -> Panel principal
/miembros/progreso       -> Detalle de progreso
/miembros/bookmarks      -> Tips y recursos guardados
/miembros/issues         -> Issues abiertos de la comunidad
```

---

## 5. Criterios de Aceptacion

- [ ] Sistema de autenticacion funcional (GitHub OAuth minimo)
- [ ] Dashboard con resumen de progreso
- [ ] Poder marcar modulos como completados
- [ ] Seccion de issues visible para miembros
- [ ] Agregar/quitar bookmarks de tips y recursos
- [ ] Responsive en mobile y desktop

---

## 6. Dependencias

- Implementar autenticacion (Supabase Auth)
- Crear tablas nuevas en base de datos
- Definir flujo de onboarding para nuevos miembros

---

## Referencias

- Documento principal: [00-PRD-vision.md](./00-PRD-vision.md)
- Fuente de issues: [04-fuentes-conocimiento.md](./04-fuentes-conocimiento.md)

