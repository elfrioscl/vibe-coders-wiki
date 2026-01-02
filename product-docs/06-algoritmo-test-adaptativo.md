# PRD: Algoritmo del Test Adaptativo de Nivel v2.1

## Resumen

Test adaptativo con busqueda binaria: calibra en 3 preguntas de Inicial, salta niveles para encontrar el techo rapido, y confirma con el sistema de gates.

**Problema que resuelve:** Un usuario Expert no deberia pasar por 15 preguntas lineales empezando desde Inicial. El algoritmo encuentra el nivel real con el menor numero de preguntas posible.

---

## 1. Parametros del Sistema

| Parametro | Valor | Descripcion |
|-----------|-------|-------------|
| MIN_PREGUNTAS | 8 | Minimo antes de poder terminar |
| MAX_PREGUNTAS | 15 | Maximo absoluto |
| MIN_PREGUNTAS_EXPERT | 12 | Minimo para confirmar Expert |
| UMBRAL_DOMINIO | 65% | Para considerar que domina un nivel |
| UMBRAL_FALLO | 40% | Para considerar que no domina |
| NO_SE_CONSECUTIVOS | 3 | "No lo se" seguidos detectan techo |

**Niveles:** Inicial → Intermedio → Avanzado → Expert

---

## 2. Flujo del Algoritmo

### Fase 1: Calibracion (Preguntas 1-3)

3 preguntas de nivel Inicial, obligatorias para todos los usuarios.

| Resultado | Accion |
|-----------|--------|
| 2-3 correctas | Saltar a Avanzado |
| 0-1 correctas | Quedarse en Inicial |
| 3 "no lo se" | Quedarse en Inicial |

**Razon del salto a Avanzado:** Permite discriminar rapido. Si acierta Avanzado, probar Expert. Si falla, bajar a Intermedio. En 5-6 preguntas ya sabemos el rango.

### Fase 2: Discriminacion (Preguntas 4-5, o 6 si desempate)

**Si salto a Avanzado:** 2 preguntas de nivel Avanzado.

| Correctas | Accion |
|-----------|--------|
| 2 | Subir a Expert |
| 1 | 1 pregunta mas para desempatar |
| 0 | Bajar a Intermedio |

**Si se quedo en Inicial:** 2 preguntas mas de Inicial. Evaluar si sube a Intermedio (≥65% acumulado en las 5 preguntas).

### Fase 3: Convergencia (Preguntas 7+)

Iterar hasta cumplir condicion de terminacion:

| Condicion | Accion |
|-----------|--------|
| 3 "no lo se" consecutivos | Terminar (techo encontrado) |
| Tasa ≥65% en 3+ preguntas | Subir al siguiente nivel |
| Tasa <40% en 3+ preguntas | Bajar al nivel anterior |
| Rebote detectado (A→B→A) | Terminar en nivel inferior |

---

## 3. Manejo del "No lo se"

El usuario puede indicar "No lo se" en lugar de adivinar. Esto es informacion valiosa: indica que no domina ese tema.

| Situacion | Tratamiento |
|-----------|-------------|
| "No lo se" individual | Cuenta como incorrecta para el calculo de dominio |
| 3 "no lo se" consecutivos | Terminar test inmediatamente (techo encontrado) |

**Calculo de tasa de aciertos:**

```
tasa = correctas / total_preguntas_respondidas
```

El "no lo se" cuenta en el denominador igual que una incorrecta. Ejemplo: 3 correctas, 1 incorrecta, 2 "no lo se" = 50% (3/6).

**Ventaja:** El usuario no es penalizado moralmente por ser honesto, pero el algoritmo recibe la senal correcta de que no domina ese nivel.

---

## 4. Condiciones de Terminacion

| Prioridad | Condicion | Accion |
|-----------|-----------|--------|
| 1 | Preguntas = 15 | Terminar |
| 2 | 3 "no lo se" consecutivos | Terminar* |
| 3 | Rebote entre niveles | Terminar en inferior |
| 4 | Preguntas < 8 | Continuar siempre |
| 5 | Nivel estable 3+ preguntas Y preguntas ≥ 8 | Evaluar terminacion |
| 6 | Expert con preguntas ≥ 12 Y tasa ≥ 65% | Terminar |

*Nota sobre prioridad 2: Si hay 3 "no lo se" consecutivos antes de la pregunta 8, se marca el techo pero se continua hasta MIN_PREGUNTAS para tener datos suficientes.

---

## 5. Calculo del Nivel Final (Sistema de Gates)

Para ser clasificado en un nivel, el usuario debe demostrar dominio de los niveles anteriores.

### Definicion de dominio

Un usuario "domina" un nivel si:
- Respondio al menos 2 preguntas de ese nivel
- Tiene tasa de aciertos ≥65% en ese nivel

### Regla de herencia por salto

Si el usuario salto un nivel (por ejemplo, de Inicial a Avanzado sin pasar por Intermedio) y domina el nivel superior, se asume dominio del nivel saltado.

Ejemplo: Usuario salta Intermedio, domina Avanzado → domina Intermedio implicitamente.

### Arbol de decision para nivel final

| Nivel Final | Requisitos |
|-------------|------------|
| Expert | Domina Avanzado + ≥2 preguntas Expert + tasa Expert ≥65% |
| Avanzado | Domina Intermedio + ≥2 preguntas Avanzado + tasa Avanzado ≥50% |
| Intermedio | Domina Inicial + ≥2 preguntas Intermedio + tasa Intermedio ≥50% |
| Inicial | Default (no cumple requisitos superiores) |

---

## 6. Requisitos del Banco de Preguntas

Para que el algoritmo funcione correctamente, se necesita un minimo de preguntas por nivel:

| Nivel | Minimo Recomendado |
|-------|-------------------|
| Inicial | 10 |
| Intermedio | 10 |
| Avanzado | 10 |
| Expert | 12 |
| **Total** | **42** |

Expert requiere mas preguntas porque el test puede necesitar hasta 12 preguntas solo de ese nivel para confirmar.

---

## 7. Informacion que se Guarda

### Por cada respuesta (en respuestas_detalle)

- Identificador de la pregunta
- Nivel de la pregunta
- Si fue correcta, incorrecta, o "no lo se"
- Tiempo de respuesta en segundos
- Opcion seleccionada y opcion correcta (para detectar preguntas confusas)
- Version del banco de preguntas (para trackear cambios)

### Por cada test completado

- Nivel final asignado
- Total de preguntas respondidas
- Total de respuestas correctas
- Tiempo total del test en segundos
- Ubicacion anonima: idioma del navegador, pais inferido, zona horaria
- Identificador para compartir (share_id)
- Fecha de compartido en LinkedIn (si aplica)

---

## 8. Metricas de Exito

| Metrica | Valor Esperado | Alerta si |
|---------|----------------|-----------|
| Promedio de preguntas por test | 9-11 | >12 o <8 |
| % de usuarios que saltan a Avanzado | 40-60% | <30% o >70% |
| % de terminacion por "no lo se" | 10-20% | >30% |
| % de saltos fallidos (baja inmediata) | <40% | >40% |
| Distribucion de niveles | Curva normal | >50% en un nivel |

---

## 9. Consideraciones de UX

- **Barra de progreso adaptativa**: Iniciar asumiendo el maximo (15 preguntas). Si el algoritmo detecta que terminara antes, la barra avanza mas rapido. El usuario percibe que "va bien" sin saber que el test se acorto.
- **No revelar nivel estimado**: No mostrar al usuario en que nivel esta durante el test, solo al final.
- **"No lo se" visible pero no prominente**: Debe ser una opcion valida y accesible, no un boton escondido. Ubicarlo separado de las opciones de respuesta.

---

## 10. Escenarios de Ejemplo

### Usuario Inicial

1. Calibracion: 1/3 correctas → Quedarse en Inicial
2. Discriminacion: 1/2 correctas adicionales → 2/5 = 40%
3. Convergencia: Patron de fallo consistente
4. **Resultado: Inicial** (8 preguntas)

### Usuario Intermedio

1. Calibracion: 2/3 correctas → Saltar a Avanzado
2. Discriminacion: 0/2 en Avanzado → Bajar a Intermedio
3. Convergencia: 4/4 en Intermedio (100%)
4. Intenta Avanzado de nuevo: 0/1 → Confirma techo
5. **Resultado: Intermedio** (10 preguntas)

### Usuario Expert

1. Calibracion: 3/3 correctas → Saltar a Avanzado
2. Discriminacion: 2/2 en Avanzado → Subir a Expert
3. Convergencia: 6/7 en Expert (86%)
4. **Resultado: Expert** (12 preguntas)

### Usuario Honesto con "No lo se"

1. Calibracion: 2 correctas + 1 "no lo se" = 67% → Saltar a Avanzado (cumple umbral)
2. Discriminacion en Avanzado: 0 correctas + 2 "no lo se" = 0% → Bajar a Intermedio
3. Convergencia en Intermedio: 3 correctas + 1 "no lo se" = 75%
4. Intenta Avanzado: 1 "no lo se" mas → Confirma techo en Intermedio
5. **Resultado: Intermedio** (9 preguntas)

El usuario uso "no lo se" 4 veces sin penalizacion moral, pero el algoritmo detecto correctamente su techo.

---

*Documento para el algoritmo adaptativo del Test de Nivel de Vibe Coding.*
