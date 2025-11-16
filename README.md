# 🖥️ **T3 CLOUD COMPUTING Y CONTINUIDAD GRUPO 8**

![Logo del Proyecto](https://media.discordapp.net/attachments/1111808588231479369/1439259737244831744/image.png?ex=6919de95&is=69188d15&hm=b1dbc59f78f1ba6ed026304c4cf4d075b4433f5aa93e892a1db41071b9f020ac&=&format=webp&quality=lossless&width=717&height=659)

Sistema de gestión de importaciones y ventas desarrollado con tecnologías cloud-native para el curso de Cloud Computing y Continuidad.

---

# 🛠️ **TECNOLOGÍAS UTILIZADAS**

- **Google Cloud Platform** - Infraestructura en la nube
- **Angular 19** - Framework frontend
- **Spring Boot 3.5** - Framework backend  
- **MySQL 8.0** - Base de datos relacional
- **Java 21** - Lenguaje backend
- **JWT** - Autenticación y seguridad

![Logo del Proyecto](https://media.discordapp.net/attachments/1111808588231479369/1439295337390018640/78ca285e-7cf5-4c1c-88ed-92361a0f3fdb.png?ex=6919ffbd&is=6918ae3d&hm=a52213284c7a3a50398e541788e82978b367d2fd120783f470a52303c6302b6e&=&format=webp&quality=lossless&width=820&height=547)

---

# 🖼️ **Repositorios**

## 🖥️ **Frontend**
Link: del repositorio frontend https://github.com/SoreIllidan/Porlles_Frontend/

## ⚙️ **Backend**
Link: del repositorio backend https://github.com/SoreIllidan/Porlles_Frontend/

---


# 🚀 **EJECUCIÓN LOCAL**

## 📋 **Requisitos Previos**

- **Java 21** o superior
- **Node.js 18** o superior
- **MySQL 8.0** o superior
- **Maven 3.6** o superior (incluido en el proyecto como `mvnw`)
- **Angular CLI** (`npm install -g @angular/cli`)

---

## 🔧 **1. Base de Datos (MySQL)**

### Pasos:

1. **Instala MySQL Workbench** o MySQL Server.
2. **Conéctate a tu instancia local de MySQL.**
3. **Ejecuta el siguiente comando:**

```sql
CREATE DATABASE ImportPorllesDB;
```

> **Nota:** La base de datos debe llamarse exactamente `ImportPorllesDB` para que el backend funcione correctamente. Spring Boot creará automáticamente las tablas necesarias al iniciar.

---

## ⚙️ **2. Backend (Spring Boot)**

### Configurar Base de Datos

Edita el archivo `Backend/src/main/resources/application-dev.properties`:

```properties
spring.datasource.url=jdbc:mysql://localhost:3306/ImportPorllesDB?allowPublicKeyRetrieval=true&useSSL=false
spring.datasource.username=root
spring.datasource.password=tu_contraseña_mysql
spring.jpa.hibernate.ddl-auto=update
spring.jpa.show-sql=true
server.port=8080
```

> **Importante:** Cambiar `spring.datasource.password` por la contraseña del MySQL.

### Instalar Dependencias

```bash
cd Backend
mvnw clean install
```

### Ejecutar Backend

```bash
mvnw spring-boot:run
```

El backend estará disponible en: **http://localhost:8080**

---

## 🌐 **3. Frontend (Angular)**

### Configurar Entorno

Verifica que el archivo `Frontend/src/environments/environment.ts` tenga la URL correcta del backend:

```typescript
export const environment = {
  production: false,
  apiUrl: 'http://localhost:8080/api',
  uploadUrl: 'http://localhost:8080/api/upload'
};
```

### Instalar Dependencias

```bash
cd Frontend
npm install
```

### Ejecutar Frontend

```bash
ng serve -o
```

El frontend estará disponible en: **http://localhost:4200**

---

# ☁️ **DESPLIEGUE EN LA NUBE**

## 📤 **Backend (Google Cloud)**

### Construcción del JAR

```bash
cd Backend
mvnw clean package -DskipTests
```

El archivo JAR se generará en: `Backend/target/sbootporlles-0.0.1-SNAPSHOT.jar`

### Variables de entorno necesarias (Google Cloud Run/Compute Engine)

```bash
DB_HOST=tu_ip_cloudsql
DB_PORT=3306
DB_NAME=ImportPorllesDB
DB_USER=root
DB_PASSWORD=tu_contraseña
UPLOAD_PATH=/var/uploads/porlles
PORT=8080
```

### Desplegar con Docker (Opcional)

```bash
docker build -t porlles-backend .
docker run -p 8080:8080 \
  -e DB_HOST=tu_ip_cloudsql \
  -e DB_USER=root \
  -e DB_PASSWORD=tu_contraseña \
  porlles-backend
```

---

## 📤 **Frontend (Vercel / Firebase Hosting)**

### Build de producción

```bash
cd Frontend
ng build --configuration production
```

La carpeta de distribución se generará en: `Frontend/dist/proyectosoluciones/`

### Configurar URL de producción

Edita `Frontend/src/environments/environment.prod.ts`:

```typescript
export const environment = {
  production: true,
  apiUrl: 'http://tu-ip-backend:8080/api',
  uploadUrl: 'http://tu-ip-backend:8080/api/upload'
};
```

### Desplegar en Firebase

```bash
npm install -g firebase-tools
firebase login
firebase init
firebase deploy
```

### Desplegar en Vercel

```bash
npm install -g vercel
vercel
```

---

## 📤 **Base de Datos (Cloud SQL)**

En este proyecto, el backend no se conecta a la base de datos mediante una IP pública. En su lugar, se utiliza la arquitectura recomendada por Google: un servidor de Compute Engine (VM) que se conecta de forma segura a la base de datos a través del **Cloud SQL Auth Proxy usando IP Privada**.

### 1. Creación de la Instancia de Cloud SQL

1. Ve a la **Consola de Google Cloud → SQL**.
2. Haz clic en **"Crear instancia"** y elige **MySQL** (ej. 8.0).

**Configuración para Producción:**

- Establece una **contraseña segura** para el usuario `root`.
- En **"Elige la región y la disponibilidad zonal"**, selecciona **"Varias zonas (con alta disponibilidad)"**. Esto crea una réplica para tolerancia a fallos.
- En **"Personaliza tu instancia"**, ajusta los núcleos (vCPU) y la RAM a un tamaño adecuado para empezar (ej. 2 vCPU, 8 GB RAM).
- Espera a que la instancia se cree.

### 2. Configuración de Red (IP Privada)

Para que la VM y la BD se comuniquen internamente:

1. Dentro de la instancia de Cloud SQL, ve al menú **"Conexiones"**.
2. Ve a la pestaña **"Redes"**.
3. Marca la casilla **"IP privada"**.
4. En el menú desplegable **"Red"**, selecciona `default` (o la red VPC donde reside tu VM).

> **Paso único por proyecto:** Si es la primera vez, Google te pedirá "Configura la conexión". Esto habilita la "Service Networking API" y reserva un rango de IP para los servicios. Sigue el asistente para completarlo.

5. Guarda los cambios de la instancia de Cloud SQL.

### 3. Configuración de Permisos de la VM (Compute Engine)

La VM necesita permiso para autenticarse con la API de Cloud SQL:

1. Ve al menú (☰) → **Compute Engine → Instancias de VM**.
2. **Detén la VM** (este cambio no se puede hacer en caliente).
3. Una vez detenida, haz clic en su nombre para entrar a los detalles y haz clic en **"Editar"**.
4. Busca la sección **"Identidad y acceso a las API"**.
5. En **"Permisos de acceso"**, cambia la configuración a **"Permitir acceso completo a todas las API de Cloud"**.
6. Guarda los cambios e **Inicia la VM**.

### 4. Configuración del Cloud SQL Auth Proxy (En la VM)

El proxy es un "túnel" seguro que se ejecuta en la VM y se conecta a la BD.

1. **Descarga el ejecutable del Cloud SQL Auth Proxy** (`cloud-sql-proxy.exe`) en tu VM de Windows desde: https://cloud.google.com/sql/docs/mysql/sql-proxy
2. Obtén el **"Nombre de conexión de la instancia"** desde la página de "Descripción general" de tu instancia de Cloud SQL (formato: `proyecto:region:instancia`).
3. Ejecuta el proxy. Para producción, se recomienda configurarlo como un **servicio de Windows** (usando `nssm.exe` o similar) para que se inicie automáticamente en segundo plano.

**Comando para ejecutar el proxy:**

```bash
# Reemplaza [NOMBRE_DE_CONEXION] con el tuyo
.\cloud-sql-proxy.exe --private-ip --port 3306 [NOMBRE_DE_CONEXION]
```

- `--private-ip` fuerza al proxy a usar la conexión de red interna que configuramos.
- `--port 3306` hace que el proxy escuche en `localhost:3306`.

### 5. Crear la Base de Datos

Conéctate a la instancia desde Cloud Shell o desde la VM usando el proxy:

```bash
mysql -u root -p -h 127.0.0.1
```

Ejecuta:

```sql
CREATE DATABASE ImportPorllesDB;
```

### 6. Configuración del Backend

Asegúrate de que el archivo `application-prod.properties` en la VM tenga:

```properties
spring.datasource.url=jdbc:mysql://127.0.0.1:3306/ImportPorllesDB?allowPublicKeyRetrieval=true&useSSL=false
spring.datasource.username=root
spring.datasource.password=tu_contraseña_segura
```

> **Nota:** Como el proxy escucha en `localhost:3306`, el backend se conecta a `127.0.0.1:3306`, no a la IP de Cloud SQL directamente.

---

# 📘 **COMANDOS FRECUENTES**

### Angular
```bash
ng serve                          # Iniciar servidor de desarrollo
ng build                          # Construir proyecto
ng build --configuration production  # Build de producción
ng generate component nombre      # Crear nuevo componente
ng test                           # Ejecutar tests
```

### Spring Boot
```bash
mvnw clean install                # Compilar e instalar dependencias
mvnw spring-boot:run              # Ejecutar aplicación
mvnw test                         # Ejecutar tests
mvnw clean package                # Generar JAR
```

### MySQL
```sql
SHOW DATABASES;                   # Listar bases de datos
USE ImportPorllesDB;              # Seleccionar base de datos
SHOW TABLES;                      # Listar tablas
SELECT * FROM tabla;              # Ver datos de tabla
```

---

# 🧪 **TESTS**

### Angular
```bash
cd Frontend
ng test
```

### Spring Boot
```bash
cd Backend
mvnw test
```

---

# 📁 **ESTRUCTURA DEL PROYECTO**

```
Porlles/
├── Backend/                 # API REST con Spring Boot
│   ├── src/
│   │   ├── main/
│   │   │   ├── java/
│   │   │   └── resources/
│   │   └── test/
│   └── pom.xml
│
└── Frontend/                # Aplicación Angular
    ├── src/
    │   ├── app/
    │   │   ├── admin/      # Módulo de administración
    │   │   ├── auth/       # Autenticación
    │   │   ├── pages/      # Páginas públicas
    │   │   └── shared/     # Servicios y modelos
    │   └── environments/
    └── package.json
```

---

# 🔐 **SEGURIDAD**

- **Autenticación:** JWT (JSON Web Tokens)
- **CORS:** Configurado para desarrollo y producción
- **Upload de archivos:** Máximo 10MB
- **Extensiones permitidas:** PDF, DOC, DOCX, XLS, XLSX, JPG, JPEG, PNG, ZIP

---

# 👥 **EQUIPO - GRUPO 8**

**Curso:** Cloud Computing y Continuidad  
**Institución:** [Tu institución]  
**Año:** 2025

---

# 📞 **SOPORTE**

Para reportar issues o solicitar features, usa los repositorios de GitHub mencionados arriba.
