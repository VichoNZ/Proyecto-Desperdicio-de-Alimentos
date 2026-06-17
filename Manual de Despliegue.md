# Manual de Despliegue

## 1. Objetivo

Este manual explica cómo desplegar el prototipo de la Plataforma de Gestión de Excedentes Alimentarios en un entorno local o en un servidor con Docker.

## 2. Componentes desplegados

| Componente | Descripción |
| n8n | Ejecuta el workflow, recibe solicitudes y renderiza HTML |
| PostgreSQL | Guarda usuarios, donaciones, reservas, sucursales y notificaciones |
| ntfy | Servicio externo de notificaciones push |
| OpenStreetMap | Servicio externo de mapas |

## 3. Requisitos previos

- Tener Docker instalado.
- Tener Docker Compose disponible.
- Tener Git instalado.
- Tener acceso al repositorio del proyecto.
- Tener el archivo JSON del workflow actualizado.
- Tener el archivo `init.sql` para inicializar la base de datos.

## 4. Despliegue local

1. Clonar el repositorio:

git clone https://github.com/VichoNZ/Proyecto-Desperdicio-de-Alimentos
cd Proyecto-Desperdicio-de-Alimentos

2. Crear archivo `.env`:

cp .env.example .env

3. Levantar los contenedores:

docker compose up -d

4. Revisar estado de los servicios:

docker compose ps

5. Abrir n8n:

http://localhost:5678

6. Importar el workflow:

n8n/flujo-integrado-excedentes-alimentarios.json

7. Configurar credenciales PostgreSQL dentro de n8n.

8. Activar el workflow.

9. Probar el Webhook:

http://localhost:5678/webhook/69754dbb-8831-45fa-9478-cf158b95fbe4

## 5. Ejemplo de docker-compose.yml

```yaml
services:
  postgres:
    image: postgres:16
    container_name: excedentes_postgres
    restart: unless-stopped
    environment:
      POSTGRES_USER: ${POSTGRES_USER}
      POSTGRES_PASSWORD: ${POSTGRES_PASSWORD}
      POSTGRES_DB: ${POSTGRES_DB}
    ports:
      - "5432:5432"
    volumes:
      - postgres_data:/var/lib/postgresql/data
      - ./db/init.sql:/docker-entrypoint-initdb.d/init.sql

  n8n:
    image: n8nio/n8n:latest
    container_name: excedentes_n8n
    restart: unless-stopped
    ports:
      - "5678:5678"
    environment:
      N8N_HOST: ${N8N_HOST}
      N8N_PORT: 5678
      N8N_PROTOCOL: ${N8N_PROTOCOL}
      WEBHOOK_URL: ${WEBHOOK_URL}
      N8N_SECURE_COOKIE: ${N8N_SECURE_COOKIE}
    volumes:
      - n8n_data:/home/node/.n8n
    depends_on:
      - postgres

volumes:
  postgres_data:
  n8n_data:
```

## 6. Despliegue en servidor por SSH

El puerto 22 se utiliza para conectarse al servidor mediante SSH. No es el puerto de la aplicación; solo permite administrar el servidor remotamente.

1. Conectarse al servidor:

ssh usuario@IP_DEL_SERVIDOR

2. Actualizar paquetes:

sudo apt update && sudo apt upgrade -y

3. Instalar Docker y Docker Compose si no están instalados.

4. Clonar el repositorio:

git clone https://github.com/VichoNZ/Proyecto-Desperdicio-de-Alimentos
cd Proyecto-Desperdicio-de-Alimentos

5. Crear `.env` con valores del servidor:

```env
POSTGRES_USER=postgres
POSTGRES_PASSWORD=CAMBIAR_PASSWORD
POSTGRES_DB=excedentes_db
N8N_HOST=IP_DEL_SERVIDOR
N8N_PROTOCOL=http
WEBHOOK_URL=http://IP_DEL_SERVIDOR:5678
N8N_SECURE_COOKIE=false
```
6. Levantar servicios:

```bash
docker compose up -d
```
7. Ver logs:

```bash
docker compose logs -f n8n
```
8. Abrir en navegador:

http://IP_DEL_SERVIDOR:5678

## 7. Puertos necesarios

| Puerto | Uso |
| 22 | SSH para administrar el servidor |
| 5678 | n8n y Webhook del prototipo |
| 5432 | PostgreSQL, preferible solo interno |
| 80 / 443 | Opcional si se usa dominio y proxy reverso |

## 8. Configurar PostgreSQL en n8n

Dentro de n8n se debe crear una credencial de PostgreSQL con los datos del contenedor.

```text
Host: postgres
Port: 5432
Database: excedentes_db
User: postgres
Password: definida en .env
SSL: desactivado en local
```
Luego se debe seleccionar esta credencial en los nodos PostgreSQL del workflow.

## 9. Activar el workflow

1. Importar el JSON.
2. Revisar que no existan nodos con error.
3. Confirmar la credencial PostgreSQL.
4. Guardar.
5. Activar el workflow con el interruptor de n8n.
6. Probar la URL `/webhook/69754dbb-8831-45fa-9478-cf158b95fbe4`.

## 10. Despliegue con dominio y HTTPS

Para una versión más cercana a producción, se recomienda usar un proxy reverso como Nginx, Caddy o Traefik. Esto permite acceder mediante dominio y HTTPS.

Ejemplo conceptual:

https://excedentes.midominio.cl -> proxy reverso -> n8n:5678

En ese caso se deben actualizar las variables:

N8N_HOST=excedentes.midominio.cl
N8N_PROTOCOL=https
WEBHOOK_URL=https://excedentes.midominio.cl
N8N_SECURE_COOKIE=true

## 11. Respaldo de datos

Para respaldar PostgreSQL:

```bash
docker exec -t excedentes_postgres pg_dump -U postgres excedentes_db > backup_excedentes.sql
```
Para restaurar:

```bash
cat backup_excedentes.sql | docker exec -i excedentes_postgres psql -U postgres -d excedentes_db
```

## 12. Actualización del sistema

1. Bajar cambios del repositorio:

```bash
git pull origin main
```

2. Reiniciar servicios si hubo cambios de configuración:

```bash
docker compose down
docker compose up -d
```
3. Si el workflow cambió, importar nuevamente el JSON en n8n o actualizarlo desde la interfaz.

## 13. Validación posterior al despliegue

- n8n abre correctamente.
- PostgreSQL acepta conexión desde n8n.
- El Webhook responde con HTML.
- El registro de usuarios funciona.
- La publicación de donaciones funciona.
- ntfy recibe notificaciones.
- La ONG verificada puede reservar.
- El QR se valida correctamente.
- Los reportes muestran datos cuando existen entregas completadas.

## 14. Seguridad pendiente para producción

- Implementar login real y sesiones.
- Separar permisos por rol.
- Activar HTTPS.
- Proteger el panel de n8n.
- No exponer PostgreSQL públicamente.
- Usar contraseñas robustas.
- Configurar backups automáticos.
- Registrar logs de auditoría.
