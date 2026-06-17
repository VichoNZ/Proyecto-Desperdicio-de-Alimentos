# Configuración del Entorno de Desarrollo

<<<<<<< HEAD
## 1. Objetivo

Este documento describe la configuración necesaria para ejecutar el prototipo de la Plataforma de Gestión de Excedentes Alimentarios. El entorno está orientado a una demostración funcional con n8n, Docker y PostgreSQL.

## 2. Software requerido

| Herramienta | Uso en el proyecto |
| Docker Desktop o Docker Engine | Ejecutar contenedores de n8n y PostgreSQL |
| Docker Compose | Levantar servicios con un solo comando |
| Git | Clonar y versionar el repositorio |
| Navegador web moderno | Acceder a la interfaz HTML del Webhook |
| Visual Studio Code | Editar archivos JSON, SQL y documentación |
| n8n | Motor de automatización y backend del prototipo |
| PostgreSQL | Persistencia de usuarios, donaciones y reservas |
| ntfy | Notificaciones push |
| OpenStreetMap | Visualización de mapas |

## 3. Arquitectura del entorno

El entorno local utiliza contenedores Docker. n8n recibe las solicitudes del navegador, ejecuta la lógica del flujo, consulta o actualiza PostgreSQL y responde con HTML. Las notificaciones se envían mediante ntfy y la visualización de mapa se realiza con OpenStreetMap.

## 4. Variables de entorno sugeridas

```env
POSTGRES_USER=postgres
POSTGRES_PASSWORD=postgres
POSTGRES_DB=excedentes_db
POSTGRES_HOST=postgres
POSTGRES_PORT=5432
N8N_PORT=5678
N8N_HOST=localhost
N8N_PROTOCOL=http
WEBHOOK_URL=http://localhost:5678
N8N_SECURE_COOKIE=false
```

## 5. Estructura esperada del proyecto

```text
Proyecto-Desperdicio-de-Alimentos/
├── docker-compose.yml
├── .env
├── db/
│   └── init.sql
├── n8n/
│   └── flujo-integrado-excedentes-alimentarios.json
└── docs/
```

## 6. Configuración de PostgreSQL

La base de datos debe contener tablas para usuarios, sucursales, donaciones, reservas y notificaciones. El flujo actual ejecuta consultas SQL desde n8n, por lo tanto la credencial de PostgreSQL debe estar creada dentro de n8n.

Tablas principales:

- usuarios
- sucursales
- donaciones
- reservas
- notificaciones

## 7. Configuración de n8n

1. Iniciar n8n desde Docker.
2. Ingresar a `http://localhost:5678`.
3. Importar el archivo `flujo-integrado-excedentes-alimentarios.json`.
4. Crear la credencial PostgreSQL.
5. Revisar que los nodos PostgreSQL apunten a la credencial correcta.
6. Activar el workflow.
7. Probar el Webhook del flujo.

## 8. Credencial PostgreSQL en n8n

Cuando n8n y PostgreSQL se ejecutan en Docker Compose, el host normalmente corresponde al nombre del servicio de base de datos, por ejemplo `postgres`. Si PostgreSQL se ejecuta directamente en el equipo, el host puede ser `localhost`.

Valores de referencia:


Host: postgres
Port: 5432
Database: excedentes_db
User: postgres
Password: definida en .env
SSL: desactivado para entorno local


## 9. Pruebas de verificación

- Abrir `http://localhost:5678` y confirmar que n8n carga.
- Abrir el Webhook del prototipo.
- Registrar un usuario Donante.
- Registrar una ONG.
- Verificar la ONG desde la vista administrativa.
- Publicar una donación con fecha futura.
- Confirmar que aparece en la lista de donaciones.
- Reservar la donación con una ONG verificada.
- Validar el QR generado.
- Revisar que la notificación llegue a ntfy.

## 10. Problemas frecuentes

| Problema | Posible causa | Solución |
|---|---|---|
| No carga n8n | Contenedor detenido | Ejecutar `docker compose up -d` |
| Error al registrar usuario | Tablas no creadas | Revisar `db/init.sql` y recrear base |
| Error de conexión PostgreSQL | Host o credencial incorrecta | Usar host `postgres` dentro de Docker |
| No llega ntfy | Tópico incorrecto o sin internet | Revisar URL del nodo HTTP Request |
| El mapa no aparece | Faltan coordenadas | Ingresar latitud y longitud válidas |
| No se puede reservar | ONG no verificada | Aprobar ONG en vista administrativa |

## 11. Justificación del entorno

Se eligió n8n porque permite demostrar el flujo funcional del sistema de forma rápida y visual. Docker facilita levantar el entorno de manera repetible y PostgreSQL entrega persistencia real, superando la primera versión del prototipo donde la información se manejaba dentro del flujo. ntfy y OpenStreetMap se seleccionaron porque permiten notificaciones y mapas sin agregar una complejidad excesiva para el alcance académico.
=======
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
>>>>>>> flujo-integrado
