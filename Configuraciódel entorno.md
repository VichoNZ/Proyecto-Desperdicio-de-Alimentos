# Configuración del Entorno de Desarrollo

## 1. Introducción

Para el desarrollo del prototipo de la Plataforma de Gestión de Excedentes Alimentarios se definió un entorno basado en **n8n** ejecutado mediante **Docker**, con **PostgreSQL 16** como base de datos persistente. Esta configuración evolucionó desde el Sprint 1, donde n8n usaba almacenamiento interno, hacia una arquitectura más robusta con base de datos externa en el Sprint 2.

El objetivo del entorno es permitir la creación de workflows que representen el flujo principal del sistema: registro de usuarios, publicación de excedentes alimentarios, generación de alertas, priorización por vencimiento, reserva de donaciones y notificaciones push a ONGs.

Adicionalmente, en el Sprint 2 se incorporó **Jest** como herramienta de testing unitario para validar la lógica de negocio de los módulos JavaScript del proyecto.

---

## 2. Software y herramientas utilizadas

| Herramienta | Versión | Uso dentro del proyecto |
|---|---|---|
| Docker Desktop | Última estable | Ejecuta n8n y PostgreSQL en contenedores |
| n8n | Latest | Plataforma principal de flujos y automatización |
| PostgreSQL | 16 | Base de datos persistente del sistema |
| Node.js | 18+ | Ejecución de scripts y tests |
| Jest | Última estable | Testing unitario y cobertura de código |
| Visual Studio Code | Última estable | Editor de archivos del proyecto |
| Git | Última estable | Control de versiones local |
| GitHub | — | Repositorio remoto del proyecto |
| Navegador web | — | Acceso a la interfaz de n8n |

---

## 3. Justificación del entorno

Se seleccionó **n8n** porque permite desarrollar un prototipo funcional basado en flujos de trabajo, Webhooks y automatizaciones, ajustándose al enfoque de la asignatura sin requerir un backend tradicional desde cero.

**Docker** facilita la instalación, ejecución y portabilidad del entorno. Cualquier integrante puede levantar el mismo entorno con un solo comando usando el archivo `docker-compose.yml`.

**PostgreSQL** fue incorporado en el Sprint 2 para reemplazar el almacenamiento interno de n8n. Esta migración permitió solucionar varios errores de consistencia de datos que existían cuando toda la lógica de persistencia estaba manejada directamente en JavaScript dentro de los nodos de n8n. Con PostgreSQL, los datos de workflows, donaciones y usuarios quedan correctamente persistidos en una base de datos relacional.

**Jest** fue incorporado en el Sprint 2 para cumplir con los requisitos de calidad del taller de testing, permitiendo validar las funciones de lógica de negocio de forma aislada y medir la cobertura de código.

---

## 4. Estructura del proyecto
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

## 5. Manual de instalación del entorno

### Paso 1: Instalar Docker Desktop

Descargar desde el sitio oficial de Docker e instalar. Verificar con:

```bash
docker --version
docker compose version
```

### Paso 2: Clonar o crear la carpeta del proyecto

```bash
git clone URL_DEL_REPOSITORIO
cd Proyecto-Desperdicio-de-Alimentos
```

O bien crear la carpeta manualmente y copiar los archivos del proyecto.

### Paso 3: Revisar el archivo docker-compose.yml

El archivo `docker-compose.yml` levanta dos servicios:

- **postgres**: Base de datos PostgreSQL 16, accesible en el puerto `5432`. Se inicializa automáticamente con el archivo `db/init.sql`.
- **n8n**: Plataforma de flujos, accesible en `http://localhost:5678`. Configurado para usar PostgreSQL como base de datos en lugar del almacenamiento interno.

n8n espera a que PostgreSQL esté disponible antes de iniciarse (healthcheck configurado).

### Paso 4: Levantar el entorno

Con Docker Desktop abierto, ejecutar dentro de la carpeta del proyecto:

```bash
docker compose up -d
```

Este comando descarga las imágenes necesarias (n8n y PostgreSQL), crea los contenedores y los inicia en segundo plano.

Para verificar que ambos contenedores están activos:

```bash
docker ps
```

Deben aparecer dos contenedores:
- `postgres`
- `n8n`

### Paso 5: Acceder a n8n

Abrir el navegador e ingresar a: http://localhost:5678

Se mostrará la interfaz de n8n lista para usar.

### Paso 6: Instalar dependencias de Node.js (para testing)

```bash
npm install
```

Esto instala Jest y las dependencias necesarias para ejecutar los tests.

---

## 6. Ejecutar los tests

### Correr todos los tests

```bash
npm test
```

Resultado esperado: **21/21 tests pasando, 2 suites.**

### Ver reporte de cobertura

```bash
npx jest --coverage
```

Resultado esperado: **100% en Statements, Branch, Functions y Lines** para los archivos `logica.js` y `notificador.js`.

---

## 7. Verificación del entorno

### Prueba 1: Verificar contenedores activos

```bash
docker ps
```

Deben aparecer activos: `postgres` y `n8n`.

### Prueba 2: Verificar acceso a n8n

Abrir `http://localhost:5678` en el navegador. La interfaz debe cargar correctamente.

### Prueba 3: Verificar conexión de n8n con PostgreSQL

En los logs de n8n debe aparecer que la conexión a la base de datos fue exitosa:

```bash
docker logs n8n
```

### Prueba 4: Ejecutar tests unitarios

```bash
npm test
```

Todos los tests deben pasar en verde.

---

## 8. Comandos útiles

```bash
# Iniciar el entorno
docker compose up -d

# Detener el entorno
docker compose down

# Ver contenedores activos
docker ps

# Ver logs de n8n
docker logs n8n

# Ver logs de PostgreSQL
docker logs postgres

# Reiniciar un contenedor
docker restart n8n
docker restart postgres

# Correr tests
npm test

# Ver cobertura
npx jest --coverage
```

---

## 9. Control de versiones

El proyecto usa Git y GitHub. Ramas principales:

| Rama | Contenido |
|---|---|
| `main` | Código estable del proyecto |
| `testing` | Carpeta de tests, informe de taller y cobertura |

Comandos para trabajar con la rama testing:

```bash
# Crear y cambiar a la rama testing
git checkout -b testing

# Agregar archivos
git add pruebas/

# Hacer commit
git commit -m "feat: agrega carpeta de tests - testing unitario, mocking y cobertura"

# Subir rama al repositorio remoto
git push origin testing
```

---

## 10. Conclusión

El entorno de desarrollo fue configurado correctamente utilizando Docker Desktop, n8n y PostgreSQL 16. La migración desde el almacenamiento interno de n8n hacia PostgreSQL en el Sprint 2 resolvió varios problemas de persistencia de datos y preparó la base para las funcionalidades del Sprint 3.

La incorporación de Jest permitió validar la lógica de negocio con 21 tests unitarios y alcanzar un 100% de cobertura sobre los módulos seleccionados.

El entorno es completamente reproducible: cualquier integrante puede clonarlo y levantarlo con `docker compose up -d` y `npm install`.