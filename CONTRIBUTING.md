# 🤝 Guía de Contribución

¡Gracias por tu interés en contribuir al proyecto ProPart OBD2 System! Esta guía te ayudará a hacer contribuciones efectivas.

---

## 📋 Tabla de Contenidos

- [Código de Conducta](#código-de-conducta)
- [Cómo Contribuir](#cómo-contribuir)
- [Reportar Bugs](#reportar-bugs)
- [Sugerir Mejoras](#sugerir-mejoras)
- [Pull Requests](#pull-requests)
- [Estilo de Código](#estilo-de-código)
- [Commits](#commits)
- [Documentación](#documentación)

---

## 📜 Código de Conducta

Este proyecto adhiere a un código de conducta. Al participar, se espera que mantengas un ambiente respetuoso y profesional.

### Nuestro Compromiso

- ✅ Ser respetuoso y considerado
- ✅ Aceptar críticas constructivas
- ✅ Enfocarse en lo mejor para la comunidad
- ✅ Mostrar empatía hacia otros miembros

### Comportamiento Inaceptable

- ❌ Lenguaje ofensivo o despectivo
- ❌ Acoso de cualquier tipo
- ❌ Publicar información privada de otros
- ❌ Conducta no profesional

---

## 🎯 Cómo Contribuir

### Formas de Contribuir

1. **Reportar Bugs** - Encuentra y reporta errores
2. **Sugerir Features** - Propón nuevas funcionalidades
3. **Escribir Código** - Implementa mejoras o correcciones
4. **Mejorar Documentación** - Actualiza o expande la documentación
5. **Traducir** - Ayuda a traducir a otros idiomas
6. **Probar** - Prueba en diferentes dispositivos y vehículos

### Proceso General

```
1. Fork del repositorio
   ↓
2. Crear branch para tu cambio
   ↓
3. Hacer cambios y commits
   ↓
4. Push a tu fork
   ↓
5. Crear Pull Request
   ↓
6. Revisión y feedback
   ↓
7. Merge ✅
```

---

## 🐛 Reportar Bugs

### Antes de Reportar

1. **Busca** si el bug ya fue reportado en Issues
2. **Verifica** que no esté en la lista de [problemas conocidos](docs/TROUBLESHOOTING.md)
3. **Prueba** con la última versión del código

### Cómo Reportar

Crea un Issue con esta información:

**Título:** Descripción breve del bug (Ej: "Gráficas no actualizan en Android 14")

**Plantilla:**

```markdown
## Descripción
Breve descripción del problema

## Pasos para Reproducir
1. Abrir la app
2. Conectar ELM327
3. Ir a Datos en Vivo
4. ...

## Comportamiento Esperado
Lo que debería pasar

## Comportamiento Actual
Lo que realmente pasa

## Logs
```
Pegar logs de Logcat aquí
```

## Entorno
- Dispositivo: (Ej: Samsung Galaxy S21)
- Android: (Ej: 14 / API 34)
- Versión App: (Ej: 1.0.0)
- Adaptador ELM327: (Ej: vLink BT 4.0)
- Vehículo: (Ej: Nissan Versa 2020)

## Capturas
[Adjuntar screenshots si aplica]
```

**Labels sugeridos:**
- `bug` - Para errores
- `critical` - Si impide uso normal
- `documentation` - Si falta documentación
- `help wanted` - Si necesitas ayuda

---

## 💡 Sugerir Mejoras

### Tipos de Sugerencias

- **Nuevas Features** - Funcionalidades nuevas
- **Mejoras de UI/UX** - Interfaz de usuario
- **Performance** - Optimizaciones
- **Compatibilidad** - Soporte para más dispositivos/vehículos

### Plantilla para Sugerencias

```markdown
## Resumen
Breve descripción de la mejora

## Motivación
¿Por qué es útil esta mejora?

## Propuesta
¿Cómo funcionaría?

## Alternativas Consideradas
Otras opciones que pensaste

## Impacto
¿A quién beneficiaría?
```

---

## 🔀 Pull Requests

### Antes de Enviar

✅ Código compila sin errores  
✅ Código sigue el estilo del proyecto  
✅ Tests pasan (si aplica)  
✅ Documentación actualizada  
✅ CHANGELOG.md actualizado  

### Proceso de PR

**1. Fork y Clone**

```bash
# Fork en GitHub, luego:
git clone https://github.com/TU_USUARIO/propart-obd2-system.git
cd propart-obd2-system
git remote add upstream https://github.com/REPO_ORIGINAL/propart-obd2-system.git
```

**2. Crear Branch**

```bash
# Para nueva feature
git checkout -b feature/nombre-descriptivo

# Para bug fix
git checkout -b fix/nombre-bug

# Para documentación
git checkout -b docs/lo-que-actualizas
```

**3. Hacer Cambios**

- Escribe código limpio
- Agrega comentarios donde sea necesario
- Sigue las convenciones del proyecto

**4. Commit**

```bash
git add .
git commit -m "Add: Descripción clara del cambio"
```

**5. Push**

```bash
git push origin feature/nombre-descriptivo
```

**6. Crear PR en GitHub**

- Ve a tu fork en GitHub
- Clic en **"Compare & pull request"**
- Llena la plantilla

### Plantilla de Pull Request

```markdown
## Descripción
¿Qué hace este PR?

## Tipo de Cambio
- [ ] Bug fix
- [ ] Nueva feature
- [ ] Breaking change
- [ ] Documentación

## Checklist
- [ ] Mi código sigue el estilo del proyecto
- [ ] He realizado auto-review
- [ ] He comentado código complejo
- [ ] He actualizado documentación
- [ ] Mis cambios no generan warnings
- [ ] He agregado tests si aplica
- [ ] Tests pasan localmente

## Testing
¿Cómo probaste los cambios?

## Screenshots
[Si aplica, agregar imágenes]

## Issues Relacionados
Fixes #123
```

---

## 🎨 Estilo de Código

### Convenciones Java

**Nombres de Clases:**
```java
// PascalCase
public class ELM327Manager { }
public class OBD2Command { }
```

**Nombres de Métodos:**
```java
// camelCase
public void connectToDevice() { }
public boolean isConnected() { }
```

**Nombres de Variables:**
```java
// camelCase
private BluetoothSocket bluetoothSocket;
private boolean isConnected;
```

**Constantes:**
```java
// UPPER_SNAKE_CASE
private static final String TAG = "ELM327Manager";
private static final int MAX_RETRIES = 3;
```

### Formato

**Indentación:**
- 4 espacios (no tabs)

**Llaves:**
```java
// Correctoif (condition) {
    // código
}

// Incorrecto
if (condition)
{
    // código
}
```

**Espaciado:**
```java
// Correcto
int result = a + b;
if (x == y) {
    
}

// Incorrecto
int result=a+b;
if(x==y){
    
}
```

### Comentarios

**JavaDoc para métodos públicos:**
```java
/**
 * Conecta con el dispositivo ELM327 especificado
 * 
 * @param device Dispositivo Bluetooth a conectar
 * @throws IOException Si hay error de conexión
 */
public void connect(BluetoothDevice device) throws IOException {
    // implementación
}
```

**Comentarios inline:**
```java
// Comentarios en español para lógica compleja
// Explicar el "por qué", no el "qué"
```

### Manejo de Errores

```java
// Siempre catch específico
try {
    // código
} catch (IOException e) {
    Log.e(TAG, "Error de I/O: " + e.getMessage());
    // manejar error
} catch (Exception e) {
    Log.e(TAG, "Error inesperado", e);
}
```

---

## 📝 Commits

### Formato de Mensajes

```
Tipo: Descripción breve (máx 50 caracteres)

Descripción detallada opcional (máx 72 caracteres por línea)

Closes #123
```

### Tipos de Commit

- **Add:** Nueva funcionalidad
- **Fix:** Corrección de bug
- **Update:** Actualización de código existente
- **Remove:** Eliminación de código
- **Refactor:** Reestructuración sin cambio funcional
- **Docs:** Cambios en documentación
- **Style:** Formato, espaciado (sin cambio funcional)
- **Test:** Agregar o corregir tests
- **Chore:** Mantenimiento, dependencias

### Ejemplos

```bash
# Bueno
git commit -m "Add: Soporte para protocolo CAN 29-bit"
git commit -m "Fix: Gráficas no actualizan en Pixel 7"
git commit -m "Docs: Actualizar guía de troubleshooting"

# Malo
git commit -m "arreglé cosas"
git commit -m "update"
git commit -m "WIP"
```

---

## 📚 Documentación

### ¿Cuándo Actualizar Docs?

- ✅ Nuevas funcionalidades → README.md
- ✅ Cambios en API → docs/API.md
- ✅ Nuevos bugs conocidos → TROUBLESHOOTING.md
- ✅ Versión nueva → CHANGELOG.md
- ✅ Cambios en instalación → GUIA_INTEGRACION.md

### Formato Markdown

```markdown
# Título Principal (H1)

## Sección (H2)

### Subsección (H3)

**Negritas**
*Cursivas*
`código inline`

```java
// Bloque de código
public void example() {
}
```

- Lista con viñetas
- Item 2

1. Lista numerada
2. Item 2

[Link](https://ejemplo.com)
![Imagen](ruta/imagen.png)
```

---

## 🧪 Testing

### Pruebas Requeridas

Antes de enviar PR, prueba:

1. **Conexión Bluetooth**
   - Conectar/desconectar
   - Reconexión automática
   - Múltiples dispositivos

2. **Lectura de Datos**
   - Todos los sensores disponibles
   - Respuestas con ERROR/NO DATA
   - Valores en rangos válidos

3. **Gráficas**
   - Actualización en tiempo real
   - Cambio de sensores
   - Zoom y pan

4. **DTCs**
   - Lectura correcta
   - Borrado funcional

5. **Dispositivos**
   - Android 5.0 (mínimo)
   - Android 14 (más reciente)
   - Diferentes marcas (Samsung, Pixel, Xiaomi)

6. **Vehículos**
   - Diferentes marcas/modelos
   - Diferentes protocolos OBD2

### Reportar Resultados

```markdown
## Testing Realizado

### Entorno
- Dispositivo: Samsung Galaxy S21
- Android: 13 (API 33)
- ELM327: vLink BT 4.0
- Vehículo: Nissan Versa 2020

### Resultados
- [x] Conexión Bluetooth - ✅ OK
- [x] Lectura RPM - ✅ OK
- [x] Gráficas - ✅ OK
- [x] DTCs - ⚠️ Lento pero funcional
- [ ] No probado en otros vehículos
```

---

## ❓ Preguntas

Si tienes dudas:

1. **Issues:** Abre un issue con label `question`
2. **Discussions:** Usa GitHub Discussions
3. **Contacto:** 
   - Tel: 777-683-8196
   - Tel: 221-756-5392

---

## 📜 Licencia

Al contribuir, aceptas que tus contribuciones se licencien bajo la misma licencia del proyecto.

---

## 🙏 Agradecimientos

¡Gracias por contribuir al proyecto ProPart OBD2 System!

Cada contribución, grande o pequeña, hace que este proyecto sea mejor.

---

**Última actualización:** Febrero 2026  
**Mantenido por:** Equipo ProPart System
