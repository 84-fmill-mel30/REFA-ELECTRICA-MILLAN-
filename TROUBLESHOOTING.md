# 🔧 Guía de Solución de Problemas

Esta guía te ayudará a resolver los problemas más comunes al usar el sistema ProPart OBD2.

---

## 📋 Tabla de Contenidos

- [Problemas de Conexión](#problemas-de-conexión)
- [Problemas de Lectura de Datos](#problemas-de-lectura-de-datos)
- [Problemas de Gráficas](#problemas-de-gráficas)
- [Problemas de Compilación](#problemas-de-compilación)
- [Problemas de Permisos](#problemas-de-permisos)
- [Problemas con DTCs](#problemas-con-dtcs)
- [Problemas de Performance](#problemas-de-performance)

---

## 🔌 Problemas de Conexión

### ❌ "No se encuentra dispositivo ELM327"

**Síntomas:**
- La app no detecta el adaptador
- Lista de dispositivos vacía

**Causas:**
1. Dispositivo no emparejado
2. Nombre del dispositivo no reconocido
3. Bluetooth del teléfono apagado
4. Permisos insuficientes

**Soluciones:**

**1. Verificar emparejamiento:**
```
Configuración → Bluetooth → Buscar "OBDII" o "ELM327"
→ Emparejar (PIN: 1234 o 0000)
```

**2. Agregar nombre del dispositivo:**

Si tu adaptador tiene un nombre diferente, agrégalo en `ELM327Manager.java`:

```java
private static final String[] DEVICE_NAMES = {
    "OBDII", "OBD2", "ELM327", "vLinker", "vLink", "V-LINK",
    "CHX", "VGATE", "KONNWEI", "VEEPEAK",
    "TU_NOMBRE_AQUI"  // ← Agregar aquí
};
```

**3. Verificar Bluetooth:**
```java
BluetoothAdapter adapter = BluetoothAdapter.getDefaultAdapter();
if (adapter == null || !adapter.isEnabled()) {
    // Bluetooth apagado o no disponible
}
```

**4. Verificar permisos:**
- Android 12+: BLUETOOTH_CONNECT, BLUETOOTH_SCAN
- Android 10-11: ACCESS_FINE_LOCATION
- Android 6-9: ACCESS_COARSE_LOCATION

---

### ❌ "Conectando..." infinito

**Síntomas:**
- Se queda en estado "Conectando..."
- Nunca llega a "Conectado"
- Timeout después de 30+ segundos

**Causas:**
1. ELM327 no conectado al puerto OBD2
2. Vehículo apagado
3. Puerto OBD2 dañado
4. Adaptador defectuoso

**Soluciones:**

**1. Verificar conexión física:**
- ELM327 bien conectado al puerto OBD2
- LED del adaptador encendido (generalmente rojo o azul)
- Vehículo con contacto encendido (mínimo)

**2. Probar con otro vehículo:**
- Descartar problema del puerto OBD2

**3. Reiniciar adaptador:**
- Desconectar del puerto
- Esperar 10 segundos
- Volver a conectar

**4. Aumentar timeout:**

En `ELM327Manager.java`, método `sendCommandWithResponse()`:

```java
while (timeout < 30) { // Cambiar de 20 a 30
    // ...
}
```

---

### ❌ "ERROR: Unable to connect"

**Síntomas:**
- Error inmediato al intentar conectar
- Mensaje: "Unable to connect"

**Causas:**
1. Adaptador ya conectado a otra app
2. Bluetooth ocupado
3. Permisos denegados

**Soluciones:**

**1. Cerrar otras apps OBD2:**
- Torque, Car Scanner, etc.
- Liberar conexión Bluetooth

**2. Reiniciar Bluetooth:**
```
Configuración → Bluetooth → Apagar → Esperar 5 seg → Encender
```

**3. Desemparejar y volver a emparejar:**
```
Configuración → Bluetooth → ELM327 → Olvidar
→ Buscar dispositivos → Emparejar de nuevo
```

---

## 📊 Problemas de Lectura de Datos

### ❌ "NO DATA" en respuestas

**Síntomas:**
- Respuestas del ELM327 contienen "NO DATA"
- Sensores no muestran valores
- Gráficas no se actualizan

**Causas:**
1. Sensor no soportado por el vehículo
2. Protocolo incorrecto
3. Vehículo sin contacto
4. ECU en modo sleep

**Soluciones:**

**1. Verificar soporte del sensor:**

No todos los vehículos soportan todos los PIDs. Prueba con sensores básicos primero:
- RPM (010C)
- Velocidad (010D)
- Temperatura motor (0105)

**2. Cambiar protocolo manualmente:**

En `ELM327Manager.java`, método `initializeELM327()`:

```java
// En lugar de auto (ATSP0):
sendCommand("ATSP6");  // CAN 11bit 500kb
Thread.sleep(200);

// O probar otros:
// ATSP7 - CAN 29bit 500kb
// ATSP8 - CAN 11bit 250kb
// ATSP9 - CAN 29bit 250kb
```

**3. Verificar vehículo:**
- Motor encendido (no solo contacto)
- Esperar 30 segundos después de encender

**4. Reset del ELM327:**
```java
sendCommand("ATZ");  // Reset completo
Thread.sleep(2000);  // Esperar más tiempo
```

---

### ❌ Valores incorrectos o fuera de rango

**Síntomas:**
- RPM muestra 16,000 (debería ser 800)
- Temperatura muestra -40°C con motor caliente
- Valores ilógicos

**Causas:**
1. Fórmula de conversión incorrecta
2. Respuesta mal parseada
3. Bytes en orden incorrecto (endianness)

**Soluciones:**

**1. Verificar respuesta cruda:**

Agrega logs en `OBD2Command.calculateValue()`:

```java
public double calculateValue(String response) {
    Log.d("OBD2", "Respuesta cruda: " + response);
    // ... resto del código
    Log.d("OBD2", "Valor calculado: " + value);
}
```

**2. Ajustar fórmula:**

Algunos vehículos usan fórmulas ligeramente diferentes:

```java
// Temperatura estándar
COOLANT_TEMP("0105", "Temp. Refrigerante", "°C", "A-40", -40, 215),

// Si los valores están mal, prueba:
COOLANT_TEMP("0105", "Temp. Refrigerante", "°C", "A-50", -50, 205),
// o
COOLANT_TEMP("0105", "Temp. Refrigerante", "°C", "A-30", -30, 225),
```

**3. Verificar bytes:**

Asegúrate que A y B se extraen correctamente:

```java
int A = Integer.parseInt(response.substring(0, 2), 16);
int B = Integer.parseInt(response.substring(2, 4), 16);
Log.d("OBD2", "A=" + A + ", B=" + B);
```

---

### ❌ "SEARCHING..." prolongado

**Síntomas:**
- Respuesta "SEARCHING..."
- Demora 5-10 segundos por comando
- Gráficas lentas

**Causas:**
1. Primera conexión (normal)
2. Protocolo incorrecto detectado
3. Timeout muy alto

**Soluciones:**

**1. Esperar en primera conexión:**
- SEARCHING es normal la primera vez
- El ELM327 está detectando el protocolo
- Espera 10-15 segundos

**2. Fijar protocolo:**

Una vez que sepas qué protocolo usa tu vehículo:

```java
// En lugar de ATSP0 (auto)
sendCommand("ATSP6");  // Fijar el protocolo específico
```

**3. Reducir timeout:**

En `ELM327Manager.java`:

```java
sendCommand("ATST32");  // Timeout más corto (hex 32 = 50ms)
```

---

## 📈 Problemas de Gráficas

### ❌ Gráficas no se actualizan

**Síntomas:**
- Gráficas planas (línea recta)
- Valores en 0
- No hay movimiento

**Causas:**
1. No hay conexión con ELM327
2. Thread de lectura no está corriendo
3. isReading = false

**Soluciones:**

**1. Verificar conexión:**

```java
if (!elm327Manager.isConnected()) {
    Log.e("OBD2", "No conectado - gráficas no se actualizarán");
}
```

**2. Verificar thread de lectura:**

En `DatosVivosActivity.java`:

```java
private void startDataReading() {
    Log.d("OBD2", "Iniciando lectura de datos");
    isReading = true;
    // ...
}
```

**3. Verificar intervalo:**

Si es muy lento, reduce el intervalo:

```java
private static final int UPDATE_INTERVAL = 250; // Cambiar de 500 a 250ms
```

---

### ❌ App se congela o cierra

**Síntomas:**
- App no responde
- "App isn't responding"
- Cierre forzado

**Causas:**
1. Operaciones Bluetooth en UI thread
2. Muchas gráficas activas
3. Memoria insuficiente

**Soluciones:**

**1. Verificar que operaciones Bluetooth están en background:**

```java
new Thread(() -> {
    // Operaciones Bluetooth aquí
    String response = elm327Manager.sendCommandWithResponse(cmd);
    
    // UI updates en main thread
    runOnUiThread(() -> {
        updateChart(...);
    });
}).start();
```

**2. Reducir gráficas activas:**

Limita a 2 gráficas en lugar de 3 si el dispositivo es lento.

**3. Limpiar datos antiguos:**

```java
if (dataChart1.size() > MAX_DATA_POINTS) {
    dataChart1.removeFirst();
}
```

---

### ❌ Gráficas con valores saltados

**Síntomas:**
- Gráficas con "picos" extraños
- Valores que saltan de 0 a 5000
- Líneas discontinuas

**Causas:**
1. Respuestas con ERROR
2. Timeout en lectura
3. Valores null no manejados

**Soluciones:**

**1. Validar respuestas:**

```java
if (response != null && !response.contains("ERROR") && !response.contains("NO DATA")) {
    double value = sensor.calculateValue(response);
    updateChart(chart, value);
} else {
    Log.w("OBD2", "Respuesta inválida, saltando actualización");
    // NO actualizar la gráfica
}
```

**2. Interpolar valores:**

Si tienes un valor malo, usa el último valor bueno:

```java
if (value < sensor.getMinValue() || value > sensor.getMaxValue()) {
    value = lastValidValue;  // Usar último valor válido
}
```

---

## 🛠️ Problemas de Compilación

### ❌ "Cannot resolve symbol MPAndroidChart"

**Síntomas:**
- Error de compilación
- Import en rojo
- "Cannot resolve symbol"

**Solución:**

**1. Verificar JitPack en repositories:**

`settings.gradle`:
```gradle
dependencyResolutionManagement {
    repositories {
        google()
        mavenCentral()
        maven { url 'https://jitpack.io' }  // ← Debe estar aquí
    }
}
```

**2. Sincronizar proyecto:**
```
File → Sync Project with Gradle Files
```

**3. Limpiar y reconstruir:**
```
Build → Clean Project
Build → Rebuild Project
```

---

### ❌ "Manifest merger failed"

**Síntomas:**
- Error al compilar
- Conflictos en AndroidManifest.xml

**Solución:**

Agrega en `AndroidManifest.xml`:

```xml
<manifest xmlns:android="http://schemas.android.com/apk/res/android"
    xmlns:tools="http://schemas.android.com/tools">  <!-- Agregar esto -->
    
    <!-- Si hay conflictos, usar: -->
    <application
        tools:replace="android:theme">
```

---

### ❌ "Duplicate class found"

**Síntomas:**
- Error: "Duplicate class"
- Clases duplicadas

**Solución:**

Revisar dependencias duplicadas en `build.gradle`:

```gradle
dependencies {
    // Excluir duplicados
    implementation('com.github.PhilJay:MPAndroidChart:v3.1.0') {
        exclude group: 'com.android.support'
    }
}
```

---

## 🔒 Problemas de Permisos

### ❌ "Permission denied" al conectar Bluetooth

**Síntomas:**
- SecurityException
- App cierra al intentar conectar

**Solución:**

**1. Verificar permisos en Manifest:**

```xml
<uses-permission android:name="android.permission.BLUETOOTH_CONNECT" />
<uses-permission android:name="android.permission.BLUETOOTH_SCAN" />
```

**2. Solicitar en runtime:**

```java
BluetoothPermissionHelper helper = new BluetoothPermissionHelper(this);
helper.requestBluetoothPermissions(callback);
```

**3. Verificar versión Android:**

Android 12+ requiere permisos nuevos que versiones anteriores no tenían.

---

## 🚨 Problemas con DTCs

### ❌ DTCs muestran "P0000"

**Síntomas:**
- Todos los DTCs son P0000
- Códigos inválidos

**Causa:**
- Parsing incorrecto de la respuesta

**Solución:**

Verificar método `parseDTC()` en `ELM327Manager.java`. Debe convertir correctamente los bytes hexadecimales.

---

### ❌ No se pueden borrar DTCs

**Síntomas:**
- Comando clearDTCs() no funciona
- DTCs siguen apareciendo

**Causas:**
1. Falla aún presente
2. Códigos permanentes (no se pueden borrar)
3. Comando no soportado

**Solución:**

**1. Reparar la falla primero:**
- Los DTCs vuelven si la falla persiste

**2. Verificar respuesta:**

```java
String response = sendCommandWithResponse("04");
Log.d("OBD2", "Respuesta borrado: " + response);
```

---

## ⚡ Problemas de Performance

### ❌ App consume mucha batería

**Síntomas:**
- Batería se agota rápido
- Dispositivo se calienta

**Soluciones:**

**1. Aumentar intervalo de actualización:**

```java
private static final int UPDATE_INTERVAL = 1000; // 1 segundo en lugar de 500ms
```

**2. Pausar lectura cuando app en background:**

```java
@Override
protected void onPause() {
    super.onPause();
    stopDataReading();
}

@Override
protected void onResume() {
    super.onResume();
    if (isConnected) {
        startDataReading();
    }
}
```

**3. Reducir número de sensores:**

Lee solo 1-2 sensores en lugar de 3.

---

## 📞 Soporte Adicional

Si ninguna de estas soluciones funciona:

1. **Revisa los logs:**
   ```
   Android Studio → Logcat → Filtro: "OBD2" o "ELM327"
   ```

2. **Abre un Issue:**
   - GitHub Issues: Describe el problema con logs
   - Incluye: Modelo de vehículo, adaptador ELM327, versión Android

3. **Contacto directo:**
   - Tel: 777-683-8196
   - Tel: 221-756-5392

---

**Última actualización:** Febrero 2026  
**Versión:** 1.0.0
