# 🚀 Evaluación DevOps: Arquitectura Blue-Green & Monitoreo

Este proyecto implementa una arquitectura de despliegue robusta utilizando **Node.js**, **Docker**, **Nginx** y un pipeline de **CI/CD** con estrategia **Blue-Green Deployment**.  
Además, incluye un stack de observabilidad con **Prometheus** y **Grafana**.

---

## 👥 Equipo

- **Paola María Salazar Reséndiz**
- **Bryan Sánchez Cabrera**
- **Jaciel Gabriel Quiroga Hernández**

---

## 🏗️ Arquitectura de la Solución

El sistema se compone de los siguientes módulos:

1. **Aplicación (API):** Node.js + Express (Gestión de Tareas).
2. **Proxy Inverso:** Nginx gestionando tráfico y balanceo Blue/Green.
3. **CI/CD:** GitHub Actions para pruebas automatizadas, construcción de imágenes y despliegue continuo.
4. **Monitoreo:** Stack con cAdvisor, Prometheus y Grafana.

---

## 🛠️ Instrucciones de Instalación (Local)

Sigue estos pasos para ejecutar el proyecto en tu entorno local.

### ✅ Prerrequisitos

- Node.js v18+
- Docker & Docker Compose
- Git

---

## 1️⃣ Clonar el repositorio

```bash
git clone https://github.com/BrySan20/Evaluacion-DevOps-API.git
cd Evaluacion-DevOps-API
```

## 2️⃣ Instalación de dependencias

```bash
npm install
```

✅ Resultado esperado: 3 pruebas exitosas

## 4️⃣ Ejecutar la aplicación

🔹 Opción A: Modo local con Node.js

```bash
npm start
```

Acceder desde el navegador:

```bash
http://localhost:3000
```

🔹 Opción B: Usando Docker

```bash
docker-compose -f docker-compose.blue.yml up -d
```

Acceder desde

```bash
http://localhost:3000
```

(Mapeado desde el puerto 5000 del contenedor)

# 🚀 Despliegue y CI/CD

El despliegue en el VPS 178.128.12.249 se realiza automáticamente mediante GitHub Actions.

## 🔵🟢 Estrategia Blue-Green

Cada push a la rama main ejecuta automáticamente:

1. Detección del entorno activo (Blue o Green).
2. Despliegue de la nueva versión al entorno inactivo.
3. Verificación de salud del servicio.
4. Conmutación del tráfico en Nginx sin interrupción.
5. Eliminación del entorno antiguo.

✅ Resultado: Zero Downtime Deployment

# 📊 Monitoreo y Observabilidad

El sistema cuenta con un stack de monitoreo independiente.

## 📈 Acceso a Grafana

- URL:

```bash
http://178.128.12.249:3000
```

- Usuario y contraseña

```bash
admin / bryan123
```

## 📋 Dashboard disponible: "Monitoreo Contenedores"

Métricas visibles en tiempo real:

- Uso de CPU por contenedor
- Memoria RAM
- Tráfico de red

## ✅ Tecnologías Utilizadas

- Node.js & Express
- Docker & Docker Compose
- Nginx
- GitHub Actions
- Prometheus
- Grafana
- cAdvisor
- Jest & Supertest

# 🌐 Enlaces

- Repositorio del Proyecto: 

```bash
https://github.com/BrySan20/Evaluacion-DevOps-API
```

- URL del Despliegue: 

```bash
http://178.128.12.249
```

- URLs del Monitoreo (Grafana): 

```bash
http://178.128.12.249:3000
```

```bash
http://178.128.12.249:3000/dashboards
```
