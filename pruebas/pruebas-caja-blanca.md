# Pruebas de Caja Blanca

Para el proyecto se seleccionaron pruebas de caja blanca, ya que el equipo conoce la lógica interna del flujo implementado en n8n y JavaScript.

## Objetivo

Validar las condiciones, ramas y caminos principales del flujo funcional de la plataforma.

## Pruebas propuestas

| ID | Funcionalidad | Entrada | Resultado esperado |
|---|---|---|---|
| PU-01 | Publicar donación válida | Fecha futura | La donación se registra como DISPONIBLE |
| PU-02 | Validar producto vencido | Fecha anterior a la actual | El producto se registra como VENCIDO |
| PU-03 | Rechazar vencido incorrecto | Fecha futura en formulario vencido | El sistema muestra mensaje de error |
| PU-04 | Generar alerta ONG | Donación válida + ONG registrada | Se genera notificación para la ONG |
| PU-05 | Priorizar por vencimiento | Varias donaciones con fechas distintas | Se muestra primero la más próxima a vencer |
| PU-06 | Marcar donación urgente | Vencimiento cercano | La donación aparece como urgente |
| PU-07 | Reservar donación disponible | Donación en estado DISPONIBLE | Cambia a RESERVADA y genera QR simulado |
| PU-08 | Rechazar reserva inválida | Donación no disponible | El sistema muestra error |

## Técnica aplicada

Se utilizarán técnicas de cobertura de sentencias, cobertura de ramas, cobertura de condiciones y pruebas de caminos.


eof
