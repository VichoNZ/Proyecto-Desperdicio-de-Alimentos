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