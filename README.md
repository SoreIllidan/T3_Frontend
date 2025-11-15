# 📢📢📢 **NOMBRE DEL PROYECTO**

![Logo del Proyecto](./docs/images/logo.png)

Descripción breve del proyecto.

---

# 🖼️ **VISTA PREVIA**

## 🖥️ **Frontend**
![Vista del Frontend](./docs/images/frontend-preview.png)

## ⚙️ **Backend**
![Arquitectura del Backend](./docs/images/backend-architecture.png)

## 💾 **Base de Datos**
![Diagrama ER](./docs/images/db-schema.png)

---

# 📁 **ESTRUCTURA DEL PROYECTO**

```txt
/
├── backend/            # Spring Boot
│   ├── src/main/java/
│   ├── src/main/resources/
│   └── pom.xml
│
├── frontend/           # Angular
│   ├── src/
│   ├── angular.json
│   └── package.json
│
└── database/
    ├── schema.sql
    └── seed.sql
```

---

# 🛠️ **TECNOLOGÍAS UTILIZADAS**

- Angular  
- Spring Boot  
- MySQL  
- Docker (opcional)  
- Maven  

---

# 🚀 **EJECUCIÓN LOCAL**

## 🔧 **1. Base de Datos (MySQL)**

### Crear Base de Datos
```sql
CREATE DATABASE nombre_bd;
```

### Importar Script
```bash
mysql -u usuario -p nombre_bd < database/schema.sql
```

---

## ⚙️ **2. Backend (Spring Boot)**

### Archivo `application.properties`

```
spring.datasource.url=jdbc:mysql://localhost:3306/nombre_bd
spring.datasource.username=usuario
spring.datasource.password=contraseña
spring.jpa.hibernate.ddl-auto=update
spring.jpa.show-sql=true
server.port=8080
```

### Instalar dependencias
```bash
cd backend
mvn clean install
```

### Ejecutar backend
```bash
mvn spring-boot:run
```

---

## 🌐 **3. Frontend (Angular)**

### Instalar dependencias
```bash
cd frontend
npm install
```

### Ejecutar Angular
```bash
ng serve -o
```

---

# ☁️ **DESPLIEGUE EN LA NUBE**

## 📤 **Backend**

### Docker
```bash
docker build -t backend-app .
docker run -p 8080:8080 backend-app
```

### Variables de entorno necesarias
```
SPRING_DATASOURCE_URL=
SPRING_DATASOURCE_USERNAME=
SPRING_DATASOURCE_PASSWORD=
```

---

## 📤 **Frontend**

### Build de producción
```bash
ng build --configuration production
```

Subir la carpeta:

```
frontend/dist/
```

A Vercel / Netlify / servidor propio.

---

## 📤 **Base de Datos**

### Importar en servidor remoto
```bash
mysql -h host -u usuario -p nombre_bd < database/schema.sql
```

---

# 📘 **COMANDOS FRECUENTES**

### Angular
```bash
ng serve
ng build
ng generate component nombre
```

### Spring Boot
```bash
mvn clean install
mvn spring-boot:run
```

### MySQL
```sql
SHOW TABLES;
SELECT * FROM tabla;
```

---

# 🧪 **TESTS**

### Angular
```bash
ng test
```

### Spring Boot
```bash
mvn test
```

---

# 👤 **AUTOR**

Nombre del autor  
Correo / Redes (opcional)
