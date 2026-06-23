# Manual Técnico: Plataforma de Gestión de Excedentes Alimentarios

**Versión:** Final 
**Proyecto:** Ingeniería de Software I - Universidad Andrés Bello


## 1. Arquitectura del Sistema
El sistema utiliza una arquitectura basada en contenedores orquestada por Docker Compose. El núcleo de la lógica reside en **n8n**, que actúa como backend, router y motor de renderizado de la interfaz.

* **Core/Backend:** [n8n](https://n8n.io/)
* **Persistencia:** [PostgreSQL](https://www.postgresql.org/)
* **Notificaciones:** [ntfy](https://ntfy.sh/)
* **Visualización Geográfica:** [OpenStreetMap](https://www.openstreetmap.org/

## 2. Flujo de Trabajo (Workflow)
La lógica del sistema está definida en el archivo `flujo-integrado-excedentes-alimentarios.json`. Sus componentes clave son:

* **Webhook Frontend:** Punto de entrada principal que recibe las peticiones del navegador (`webhookId: 69754dbb-8831-45fa-9478-cf158b95fbe4`).
* **Nodos Code (JS):** Procesan la lógica de negocio, validaciones (ej. fechas de vencimiento) y transformación de datos.
* **Nodos PostgreSQL:** Encargados de la persistencia de usuarios, donaciones, reservas y registros de auditoría.
* **Renderizado HTML:** Genera dinámicamente las vistas (interfaces) basadas en el estado actual de la base de datos.


## 3. Modelo de Datos
El esquema en PostgreSQL incluye las siguientes entidades principales:

| Tabla | Descripción |
| `usuarios` | Gestión de roles (Donante, ONG, Admin) y geolocalización. |
| `donaciones` | Estado del excedente, vencimiento, cadena de frío, tipo de dieta y sucursal. |
| `reservas` | Registro de transacciones entre donantes y ONGs con validación QR simulada. |
| `notificaciones` | Historial de alertas push enviadas vía ntfy. |


## 4. Endpoints y Acciones Principales
El sistema es accesible mediante la URL base, utilizando parámetros de consulta para dirigir la lógica:

* `?accion=inicio`: Pantalla principal de la plataforma.
* `?accion=registro`: Formulario de registro de usuarios.
* `?accion=publicar`: Formulario para registrar excedentes.
* `?accion=donaciones`: Lista de productos disponibles.
* `?accion=reservas`: Gestión de reservas activas.
* `?accion=formulario_qr`: Interfaz para validación de entregas (QR simulado).
* `?accion=reporte_kilos`: Indicadores de impacto mensual.
* `?accion=certificado`: Generación de certificado ambiental.


## 5. Integraciones
* **ntfy:** Servicio para el envío de notificaciones push en tiempo real a las organizaciones sociales cuando se publica una donación o se reporta un producto vencido.
* **OpenStreetMap:** Integración directa para la visualización de ubicaciones, sucursales y puntos de retiro mediante coordenadas.


## 6. Mantenimiento y Despliegue

### Requisitos previos
* [Docker](https://www.docker.com/) y [Docker Compose](https://docs.docker.com/compose/).
* Archivo `.env` con las credenciales configuradas.

### Comandos básicos
* **Levantar entorno:** `docker compose up -d`
* **Respaldar Base de Datos:** `docker exec -t excedentes_postgres pg_dump -U postgres excedentes_db > backup.sql`
* **Restaurar Base de Datos:** `cat backup.sql | docker exec -i excedentes_postgres psql -U postgres -d excedentes_db`


## 7. Consideraciones Finales
El sistema ha sido validado mediante pruebas de caja blanca en el flujo de n8n, asegurando la integridad de las reglas de negocio (priorización de donaciones, validación de estados y reportes de impacto ambiental). 
*Nota: La autenticación formal mediante login/sesiones está definida como una mejora técnica necesaria para entornos de producción fuera del alcance académico actual.*
