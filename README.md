# Proyecto Desperdicio de Alimentos

Este repositorio contiene la base inicial del proyecto **Plataforma de Gestión de Excedentes Alimentarios**, desarrollado en la asignatura **Ingeniería de Software I** de la **Universidad Andrés Bello**.

## Objetivo
Diseñar una solución que permita reducir el desperdicio de alimentos mediante la conexión entre generadores de excedentes y organizaciones sociales receptoras.

## Tecnologías consideradas
- Docker
- n8n
- GitHub
- PostgresSQL
## Estado del repositorio
Sprint 2 completado. Integración de PostgreSQL con Docker, flujo n8n funcional y suite de tests implementada en la rama `testing`.

Proyecto-Desperdicio-de-Alimentos/
│
├── docker-compose.yml
├── README.md
├── Configuración del entorno.md
├── .gitignore
├── db/
│   └── init.sql
├── docs/
├── workflows/
│   └── flujo-integrado-excedentes-alimentarios.json
└── pruebas/
    ├── logica.js
    ├── logica.test.js
    └── pruebas/
        ├── notificador.js
        └── notificador.test.js
        
## Cómo levantar el entorno

### Requisitos previos
- Docker Desktop instalado y corriendo
- Node.js 18 o superior
- Git

### Pasos
```bash
# 1. Clonar el repositorio
git clone URL_DEL_REPOSITORIO
cd Proyecto-Desperdicio-de-Alimentos

# 2. Levantar PostgreSQL y n8n
docker compose up -d

# 3. Verificar que los contenedores estén activos
docker ps

# 4. Acceder a n8n
# Abrir navegador en: http://localhost:5678
```

### Ejecutar los tests
```bash
# Instalar dependencias
npm install

# Correr todos los tests
npm test

# Ver reporte de cobertura
npx jest --coverage
```

## Rama de testing
Los archivos de pruebas se encuentran en la rama `testing`. Para acceder:
```bash
git checkout testing
```

## Integrantes
- Vicente Núñez Navarro — Scrum Master
- Matías Cardemil Guzmán — Product Owner
- Matías Fuentes Barrera — Developer
- Ítalo Jerez Guzmán — Developer
