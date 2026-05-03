# Configuración del Entorno de Desarrollo

## 1. Introducción

Para el desarrollo del prototipo de la Plataforma de Gestión de Excedentes Alimentarios se definió un entorno basado en n8n ejecutado mediante Docker. Esta decisión permite construir flujos funcionales de automatización sin depender de una instalación compleja de backend tradicional.

El objetivo principal del entorno es permitir la creación de workflows que simulen el flujo principal del Sprint 1: registro de usuarios, publicación de excedentes alimentarios, generación de alertas, priorización por vencimiento y reserva de donaciones.


## 2. Software y herramientas utilizadas

Las herramientas seleccionadas para el entorno de desarrollo son:

| Herramienta | Uso dentro del proyecto 
| Docker Desktop | Permite ejecutar n8n dentro de un contenedor |
| n8n | Plataforma principal para crear workflows y automatizar procesos |
| Visual Studio Code | Editor de archivos del proyecto |
| Git | Control de versiones local |
| GitHub | Repositorio remoto del proyecto |
| Navegador web | Acceso a la interfaz de n8n |
| Jira | Gestión de épicas, historias de usuario y tareas del Sprint 1 |


## 3. Justificación del entorno

Se seleccionó n8n porque permite desarrollar un prototipo funcional basado en flujos de trabajo, Webhooks y automatizaciones. Esto se ajusta al enfoque de la asignatura, donde se busca demostrar el funcionamiento general del sistema y la aplicación de Scrum, sin requerir una implementación compleja de backend desde cero.

Docker se utiliza para facilitar la instalación, ejecución y portabilidad del entorno. De esta forma, cualquier integrante del equipo puede levantar el mismo entorno usando el archivo `docker-compose.yml`.

## 4. Estructura del proyecto

La estructura inicial del proyecto es la siguiente:

Proyecto-Desperdicio-de-Alimentos
│
├── docker-compose.yml
├── README.md
└── Configuracion_del_entorno.md

5. Manual de instalación del entorno

Paso 1: Instalar Docker Desktop

Primero se debe instalar Docker Desktop, ya que será la herramienta encargada de ejecutar n8n dentro de un contenedor.

Pasos:

Descargar Docker Desktop desde su sitio oficial.
Ejecutar el instalador.
Aceptar los términos de instalación.
Reiniciar el computador si el instalador lo solicita.
Abrir Docker Desktop.
Verificar que Docker esté iniciado correctamente.

Para comprobar la instalación, se debe abrir una terminal y ejecutar:

docker --version

También se puede verificar Docker Compose con:

docker compose version

Si ambos comandos muestran una versión instalada, Docker quedó configurado correctamente.

Paso 2: Crear la carpeta del proyecto

Se debe crear una carpeta local para almacenar los archivos del proyecto.

Ejemplo de ruta en Windows:

C:\Users\vicen\Proyecto-Desperdicio-de-Alimentos

También puede crearse desde la terminal con:

mkdir Proyecto-Desperdicio-de-Alimentos
cd Proyecto-Desperdicio-de-Alimentos
Paso 3: Crear el archivo docker-compose.yml

Dentro de la carpeta del proyecto se debe crear el archivo:

docker-compose.yml

Este archivo contiene la configuración necesaria para ejecutar n8n.

Contenido del archivo:

services:
  n8n:
    image: n8nio/n8n:latest
    container_name: n8n-desperdicio-alimentos
    restart: unless-stopped
    ports:
      - "5678:5678"
    environment:
      - TZ=America/Santiago
      - N8N_HOST=localhost
      - N8N_PORT=5678
      - N8N_PROTOCOL=http
      - N8N_SECURE_COOKIE=false
    volumes:
      - n8n_data:/home/node/.n8n

volumes:
  n8n_data:

Este archivo indica que n8n se ejecutará en el puerto 5678, accesible desde el navegador mediante localhost.

Paso 4: Levantar n8n con Docker

Con Docker Desktop abierto, se debe ejecutar el siguiente comando dentro de la carpeta del proyecto:

docker compose up -d

Este comando descarga la imagen oficial de n8n y crea el contenedor.

Para verificar que el contenedor está funcionando, se utiliza:

docker ps

Debe aparecer un contenedor llamado:

n8n-desperdicio-alimentos
Paso 5: Acceder a n8n desde el navegador

Una vez iniciado el contenedor, se debe abrir el navegador e ingresar a:

http://localhost:5678

Si el entorno está correctamente configurado, se mostrará la interfaz inicial de n8n.

En este punto, el equipo puede crear workflows relacionados con las historias de usuario del sprint.

6. Instalación de dependencias

No se requiere instalar dependencias tradicionales de backend, ya que n8n se ejecuta completamente dentro del contenedor Docker.

La principal dependencia del entorno es la imagen oficial de n8n:

n8nio/n8n:latest

Esta imagen se descarga automáticamente al ejecutar:

docker compose up -d

También se utiliza un volumen llamado:

n8n_data

Este volumen permite conservar la información de n8n, como workflows, credenciales locales y configuraciones, incluso si el contenedor se detiene.

7. Verificación del entorno

Para comprobar que el entorno funciona sin problemas, se realizaron pruebas básicas dentro de n8n.

Prueba 1: Verificar que el contenedor está activo

Se ejecutó el siguiente comando:

docker ps

Resultado esperado:

n8n-desperdicio-alimentos

El contenedor debe aparecer en estado activo, indicando que n8n se está ejecutando correctamente.

Prueba 2: Verificar acceso a la interfaz web

Se ingresó desde el navegador a:

http://localhost:5678

Resultado esperado:

La interfaz de n8n carga correctamente.

Esta prueba confirma que Docker está ejecutando n8n y que el puerto 5678 está disponible.

Prueba 3: Crear workflow de prueba con Webhook

Para validar el funcionamiento de n8n, se creó un workflow simple con los siguientes nodos:

Webhook
Code
Respond to Webhook

El nodo Webhook recibe una solicitud de prueba.
El nodo Code procesa los datos recibidos.
El nodo Respond to Webhook devuelve una respuesta al navegador o a Postman.

Código utilizado en el nodo Code:

return [
  {
    json: {
      mensaje: "Entorno n8n funcionando correctamente",
      proyecto: "Plataforma de Gestión de Excedentes Alimentarios",
      estado: "OK"
    }
  }
];

Resultado esperado:

{
  "mensaje": "Entorno n8n funcionando correctamente",
  "proyecto": "Plataforma de Gestión de Excedentes Alimentarios",
  "estado": "OK"
}

Esta prueba confirma que n8n puede recibir una solicitud, procesarla y responder correctamente.

Prueba 4: Simulación de publicación de excedente

También se realizó una prueba simulando el registro de una donación.

Ejemplo de datos enviados al Webhook:

{
  "producto": "Pan",
  "categoria": "Panadería",
  "cantidad": 10,
  "fecha_vencimiento": "2026-05-04",
  "donante": "Supermercado de prueba"
}

Respuesta esperada del workflow:

{
  "mensaje": "Donación registrada correctamente",
  "producto": "Pan",
  "estado": "Disponible"
}

Esta prueba permite validar que el entorno puede representar el flujo base de publicación de excedentes alimentarios.

8. Comandos útiles del entorno

Para iniciar n8n:

docker compose up -d

Para detener n8n:

docker compose down

Para ver los contenedores activos:

docker ps

Para ver todos los contenedores, incluso detenidos:

docker ps -a

Para revisar los logs de n8n:

docker logs n8n-desperdicio-alimentos

Para reiniciar el contenedor:

docker restart n8n-desperdicio-alimentos
9. Control de versiones

El proyecto utiliza Git y GitHub para registrar los avances del equipo.

Comandos básicos utilizados:

git init
git add .
git commit -m "Configuración inicial del entorno con Docker y n8n"
git branch -M main
git remote add origin URL_DEL_REPOSITORIO
git push -u origin main

También se pueden crear ramas por historia de usuario, por ejemplo:

git checkout -b HU-04

Esto permite separar el trabajo según las funcionalidades desarrolladas.

10. Conclusión de la configuración

El entorno de desarrollo fue configurado correctamente utilizando Docker Desktop y n8n como plataforma principal de automatización.

La configuración mediante docker-compose.yml permite levantar el entorno de forma rápida y replicable por cualquier integrante del equipo. Además, las pruebas realizadas permitieron verificar que n8n funciona correctamente, que la interfaz web es accesible desde el navegador y que los workflows pueden recibir, procesar y responder solicitudes.

Con este entorno, el equipo cuenta con una base funcional para desarrollar y demostrar los flujos principales del prototipo, especialmente aquellos relacionados con publicación de excedentes, alertas, priorización por vencimiento y reserva de donaciones.

La estructura inicial del proyecto es la siguiente:

Proyecto-Desperdicio-de-Alimentos
│
├── docker-compose.yml
├── README.md
└── Configuracion_del_entorno.md