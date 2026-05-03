# Descripción del Flujo Integrado - Excedentes Alimentarios

Este documento describe el flujo integrado desarrollado en n8n para el proyecto Plataforma de Gestión de Excedentes Alimentarios.

## Objetivo del flujo

El objetivo del flujo es representar el proceso principal de la plataforma, permitiendo simular la interacción entre donantes y organizaciones sociales mediante un prototipo funcional.

## Funcionalidades incluidas

- Registro de usuarios con rol Donante u Organización Social.
- Publicación de excedentes alimentarios.
- Validación de fecha de vencimiento.
- Identificación de productos disponibles y productos vencidos.
- Priorización de donaciones según fecha de vencimiento.
- Generación de alertas para organizaciones sociales.
- Visualización de notificaciones para ONG.
- Reserva de donaciones disponibles.
- Generación de código QR simulado para retiro.
- Alerta diferenciada para productos vencidos.

## Relación con los Sprints

Este flujo integra funcionalidades trabajadas durante el Sprint 1 y ajustes revisados al inicio del Sprint 2.

En el Sprint 1 se trabajaron principalmente las historias:

- HU-04: Publicar excedentes alimentarios.
- HU-07: Generar alertas para organizaciones sociales.
- HU-09: Priorizar donaciones por fecha de vencimiento.

En el Sprint 2 se comenzó a revisar y corregir el flujo para diferenciar productos disponibles de productos vencidos, generando una alerta preventiva cuando corresponda.

## Tecnología utilizada

- n8n para la automatización del flujo.
- Docker para ejecutar el entorno.
- GitHub para control de versiones.
- Jira para seguimiento de historias de usuario y tareas.

