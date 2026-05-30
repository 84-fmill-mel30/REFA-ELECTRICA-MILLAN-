# 📤 Guía Completa: Subir a GitHub

Esta guía te enseña **paso a paso** cómo subir tu código al repositorio de GitHub de forma profesional.

---

## 📋 Tabla de Contenidos

- [Preparación](#preparación)
- [Método 1: GitHub Web (Más Fácil)](#método-1-github-web)
- [Método 2: Git en Terminal (Profesional)](#método-2-git-en-terminal)
- [Estructura del Repositorio](#estructura-del-repositorio)
- [Configuración Recomendada](#configuración-recomendada)
- [Mantenimiento](#mantenimiento)

---

## 🔧 Preparación

### ¿Qué Necesitas?

✅ Cuenta de GitHub (crear en: https://github.com/signup)  
✅ Los archivos del sistema OBD2 descargados  
✅ Navegador web (Chrome, Firefox, Edge)  
⚠️ Opcional: Git instalado (para método avanzado)

---

## 🌐 Método 1: GitHub Web (Más Fácil)

### Paso 1: Crear Repositorio

1. Ve a: https://github.com
2. Inicia sesión
3. Clic en el botón verde **"New"** (o ícono **+** → **"New repository"**)

4. Llena el formulario:

```
Repository name:        propart-obd2-system
Description:            Sistema profesional de diagnóstico OBD2 con ELM327
Public/Private:         ✓ Public (recomendado) o Private
Initialize:             ✓ Add a README file
Add .gitignore:         Android
Choose a license:       (opcional)
```

5. Clic en **"Create repository"**

### Paso 2: Subir Archivos

**Opción A: Drag & Drop (Arrastrar y Soltar)**

1. En tu repositorio, clic en **"Add file"** → **"Upload files"**

2. Arrastra todos los archivos descargados:

```
✓ ELM327Manager.java
✓ OBD2Command.java
✓ DatosVivosActivity.java
✓ TechnicalDatabaseHelper.java
✓ BluetoothPermissionHelper.java
✓ MainActivityExample.java
✓ activity_datos_vivos.xml
✓ AndroidManifest.xml
✓ build.gradle
✓ GUIA_INTEGRACION.md
✓ CHANGELOG.md
✓ TROUBLESHOOTING.md
✓ .gitignore
```

3. Escribe un mensaje de commit:
```
Initial commit: Sistema OBD2 completo con ELM327
```

4. Clic en **"Commit changes"**

**Opción B: Crear Archivos Uno por Uno**

1. En tu repositorio, clic en **"Add file"** → **"Create new file"**

2. Nombra el archivo: `app/src/main/java/com/propart/diagnostic/bluetooth/ELM327Manager.java`

3. Pega el contenido

4. Clic en **"Commit new file"**

5. Repite para cada archivo

### Paso 3: Editar README

1. Clic en el archivo **README.md**
2. Clic en el ícono del lápiz ✏️ (Edit)
3. Borra el contenido y pega el contenido de **README_GITHUB.md**
4. Clic en **"Commit changes"**

### Paso 4: Crear Estructura de Carpetas

Para organizar mejor, crea carpetas:

**1. Carpeta docs/**
```
Add file → Create new file → docs/README.md
```

Agrega archivos de documentación aquí.

**2. Carpeta app/**
```
Add file → Create new file → app/src/main/java/com/propart/diagnostic/bluetooth/ELM327Manager.java
```

**3. Carpeta screenshots/**
```
Add file → Upload files → Sube capturas de pantalla
```

---

## 💻 Método 2: Git en Terminal (Profesional)

### Requisitos Previos

**1. Instalar Git:**
- Windows: https://git-scm.com/download/win
- Mac: `brew install git`
- Linux: `sudo apt install git`

**2. Configurar Git:**

```bash
git config --global user.name "Tu Nombre"
git config --global user.email "tu@email.com"
```

### Paso 1: Crear Repositorio en GitHub

1. Ve a https://github.com → **"New repository"**
2. Nombre: `propart-obd2-system`
3. **NO marques** "Initialize this repository with"
4. Clic **"Create repository"**

GitHub te mostrará comandos. **Guárdalos** para el Paso 3.

### Paso 2: Preparar Carpeta Local

```bash
# 1. Crear carpeta del proyecto
mkdir propart-obd2-system
cd propart-obd2-system

# 2. Crear estructura
mkdir -p app/src/main/java/com/propart/diagnostic/{bluetooth,obd,activities,database,utils}
mkdir -p app/src/main/res/layout
mkdir -p docs/screenshots

# 3. Copiar tus archivos a las carpetas correspondientes
# (Puedes hacerlo manualmente desde el explorador de archivos)
```

**Estructura recomendada:**

```
propart-obd2-system/
├── app/
│   └── src/
│       └── main/
│           ├── java/com/propart/diagnostic/
│           │   ├── bluetooth/
│           │   │   └── ELM327Manager.java
│           │   ├── obd/
│           │   │   └── OBD2Command.java
│           │   ├── activities/
│           │   │   └── DatosVivosActivity.java
│           │   ├── database/
│           │   │   └── TechnicalDatabaseHelper.java
│           │   └── utils/
│           │       └── BluetoothPermissionHelper.java
│           └── res/
│               └── layout/
│                   └── activity_datos_vivos.xml
├── docs/
│   ├── GUIA_INTEGRACION.md
│   ├── TROUBLESHOOTING.md
│   └── screenshots/
│       ├── home.png
│       ├── scanner.png
│       └── live-data.png
├── .gitignore
├── AndroidManifest.xml
├── build.gradle
├── CHANGELOG.md
└── README.md
```

### Paso 3: Inicializar Repositorio Local

```bash
# 1. Inicializar Git
git init

# 2. Agregar todos los archivos
git add .

# 3. Hacer el primer commit
git commit -m "Initial commit: Sistema OBD2 completo con ELM327"

# 4. Conectar con GitHub (usa la URL que te dio GitHub)
git remote add origin https://github.com/TU_USUARIO/propart-obd2-system.git

# 5. Subir archivos
git branch -M main
git push -u origin main
```

### Paso 4: Ingresar Credenciales

Te pedirá:
- **Usuario:** tu_usuario_github
- **Password:** tu_password o Personal Access Token

**Si te pide token en lugar de password:**

1. Ve a: https://github.com/settings/tokens
2. Clic **"Generate new token"** → **"Generate new token (classic)"**
3. Nombre: `ProPart OBD2 Token`
4. Selecciona: `repo` (Full control of private repositories)
5. Clic **"Generate token"**
6. **COPIA EL TOKEN** (lo verás solo una vez)
7. Úsalo como contraseña en Git

---

## 📁 Estructura del Repositorio

### Organización Recomendada

```
propart-obd2-system/
├── 📄 README.md                    # Descripción principal
├── 📄 CHANGELOG.md                 # Historial de cambios
├── 📄 LICENSE                      # Licencia (opcional)
├── 📄 .gitignore                   # Archivos a ignorar
├── 📄 build.gradle                 # Configuración Gradle
├── 📄 settings.gradle              # Configuración del proyecto
│
├── 📁 app/                         # Código fuente
│   └── src/
│       └── main/
│           ├── java/               # Archivos Java
│           ├── res/                # Recursos (layouts, etc.)
│           └── AndroidManifest.xml
│
├── 📁 docs/                        # Documentación
│   ├── GUIA_INTEGRACION.md
│   ├── TROUBLESHOOTING.md
│   ├── API.md
│   └── screenshots/
│       ├── home.png
│       ├── scanner.png
│       └── live-data.png
│
└── 📁 .github/                     # Configuración GitHub
    ├── ISSUE_TEMPLATE/
    ├── PULL_REQUEST_TEMPLATE.md
    └── workflows/                  # GitHub Actions (CI/CD)
```

---

## ⚙️ Configuración Recomendada

### Archivo .gitignore

Asegúrate de tener un buen `.gitignore`:

```gitignore
# Android Studio
*.iml
.gradle
/local.properties
/.idea/
.DS_Store
/build
/captures
.externalNativeBuild
.cxx
*.apk
*.aab

# Gradle
.gradle/
build/

# Keystore (MUY IMPORTANTE)
*.jks
*.keystore
keystore.properties

# Logs
*.log

# OS
.DS_Store
Thumbs.db
```

### Archivo README.md

Tu README debe incluir:

✅ Badges (Android, Java, License)  
✅ Descripción breve  
✅ Características principales  
✅ Capturas de pantalla  
✅ Requisitos  
✅ Instalación paso a paso  
✅ Ejemplos de uso  
✅ Documentación  
✅ Contacto

### Agregar Capturas de Pantalla

1. Toma screenshots de tu app (home, scanner, datos en vivo)
2. Súbelas a: `docs/screenshots/`
3. Referéncialas en README:

```markdown
![Screenshot](docs/screenshots/home.png)
```

---

## 🔄 Mantenimiento del Repositorio

### Subir Cambios Nuevos

**Método Web:**
1. Edita el archivo en GitHub directamente
2. Clic en **"Commit changes"**

**Método Terminal:**
```bash
# 1. Ver cambios
git status

# 2. Agregar archivos modificados
git add .

# 3. Commit con mensaje descriptivo
git commit -m "Agregado: Función de exportar datos a CSV"

# 4. Subir a GitHub
git push
```

### Crear Versiones (Releases)

Cuando tengas una versión estable:

1. Ve a tu repositorio en GitHub
2. Clic en **"Releases"** → **"Create a new release"**
3. Tag: `v1.0.0`
4. Título: `Versión 1.0.0 - Lanzamiento Inicial`
5. Descripción: Copiar del CHANGELOG.md
6. Subir archivo APK (opcional)
7. Clic **"Publish release"**

### Crear Branches (Ramas)

Para trabajar en nuevas características:

```bash
# Crear nueva rama
git checkout -b feature/nueva-caracteristica

# Hacer cambios y commits
git add .
git commit -m "Agregado: Nueva característica"

# Subir rama a GitHub
git push -u origin feature/nueva-caracteristica

# En GitHub, crear Pull Request
```

### Issues y Pull Requests

**Para reportar bugs:**
1. GitHub → **Issues** → **New issue**
2. Título: "Bug: Gráficas no actualizan en Android 14"
3. Descripción detallada con logs
4. Labels: `bug`, `help wanted`

**Para contribuciones:**
1. Fork del repositorio
2. Crear branch nueva
3. Hacer cambios
4. Push a tu fork
5. Crear Pull Request

---

## ✅ Checklist Final

Antes de considerar tu repositorio completo:

- [ ] README.md completo con badges
- [ ] CHANGELOG.md con versión actual
- [ ] GUIA_INTEGRACION.md en español
- [ ] TROUBLESHOOTING.md con problemas comunes
- [ ] .gitignore configurado
- [ ] Capturas de pantalla subidas
- [ ] Todos los archivos .java subidos
- [ ] Layout XML subido
- [ ] AndroidManifest.xml subido
- [ ] build.gradle subido
- [ ] Licencia agregada (opcional)
- [ ] Descripción del repositorio clara
- [ ] Topics/Tags agregados (android, obd2, elm327, automotive)

---

## 🎓 Recursos Adicionales

### Aprender Git
- [Git Book (Español)](https://git-scm.com/book/es/v2)
- [GitHub Docs](https://docs.github.com/es)
- [Tutorial interactivo](https://learngitbranching.js.org/?locale=es_ES)

### Markdown
- [Guía Markdown](https://www.markdownguide.org/basic-syntax/)
- [GitHub Flavored Markdown](https://github.github.com/gfm/)

---

## 🎯 Próximos Pasos

Después de subir a GitHub:

1. **Compartir:** Comparte el link de tu repositorio
2. **Documentar:** Mantén el README actualizado
3. **Versionar:** Usa releases para versiones estables
4. **Colaborar:** Acepta contribuciones de la comunidad
5. **Publicar:** Considera publicar en Google Play Store

---

## 📞 Ayuda

Si tienes problemas:

1. Revisa la documentación de GitHub
2. Busca en Stack Overflow
3. Contacta:
   - Tel: 777-683-8196
   - Tel: 221-756-5392

---

**¡Tu código ahora está en GitHub! 🎉**

**Última actualización:** Febrero 2026  
**Versión:** 1.0.0
