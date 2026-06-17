# Configuración del Entorno de Desarrollo

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
