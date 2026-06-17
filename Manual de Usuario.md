# Manual de Usuario

## 1. Objetivo del manual

Este manual explica cómo utilizar el prototipo de la Plataforma de Gestión de Excedentes Alimentarios desde las vistas de Administrador, Donante y Organización Social.

## 2. Acceso al sistema

El usuario debe abrir la URL del Webhook del flujo en el navegador:

http://localhost:5678/webhook/69754dbb-8831-45fa-9478-cf158b95fbe4

En despliegues externos, se reemplaza `localhost` por la IP o dominio del servidor.

## 3. Nota sobre login y roles

El prototipo actual no incluye un login formal. Las vistas se acceden desde la navegación principal y el comportamiento depende de los usuarios registrados con rol Donante u ONG. Esta decisión fue tomada para mantener estable el flujo funcional durante la demostración y evitar introducir una autenticación que pudiera romper el avance. En una versión posterior se debe implementar autenticación real y control de permisos por rol.

## 4. Roles disponibles

| Rol | Función principal |
| Administrador | Verificar ONGs, revisar usuarios y controlar el estado general del sistema |
| Donante | Registrar sucursales y publicar excedentes alimentarios |
| Organización Social / ONG | Revisar donaciones disponibles, recibir alertas, reservar y retirar alimentos |

## 5. Pantalla de inicio

La pantalla de inicio muestra el propósito del sistema y el menú de navegación. Desde esta pantalla se puede acceder a registro de usuarios, publicación, donaciones, reservas, validación QR, reportes y certificado ambiental.

## 6. Registrar usuario

1. Seleccionar `Registrar usuario`.
2. Completar nombre, email, rol, dirección y comuna.
3. Si corresponde, ingresar latitud y longitud.
4. Si el rol es ONG, agregar documento legal o referencia del documento.
5. Presionar `Guardar usuario`.

Resultado esperado:

- Si es Donante, queda disponible para publicar excedentes.
- Si es ONG, queda en estado pendiente hasta ser verificada por el administrador.

## 7. Verificar una ONG

1. Entrar a la opción `Verificar ONG`.
2. Revisar las organizaciones registradas.
3. Seleccionar estado `VERIFICADA` o `RECHAZADA`.
4. Agregar observación si corresponde.
5. Guardar la actualización.

Solo las ONGs verificadas pueden reservar donaciones.

## 8. Configurar ubicación

1. Entrar a `Ubicación`.
2. Seleccionar el usuario.
3. Ingresar dirección, comuna, latitud y longitud.
4. Guardar cambios.
5. Confirmar que el mapa se muestra correctamente.

La ubicación ayuda a visualizar el retiro mediante OpenStreetMap.

## 9. Gestionar sucursales

1. Entrar a `Sucursales`.
2. Seleccionar el donante.
3. Ingresar nombre de sucursal, dirección, comuna y coordenadas.
4. Guardar la sucursal.
5. Activar o desactivar sucursales según sea necesario.

Las publicaciones pueden asociarse a una sucursal del donante.

## 10. Publicar excedente alimentario

1. Entrar a `Publicar excedente`.
2. Seleccionar el donante o sucursal.
3. Ingresar nombre del producto.
4. Seleccionar categoría.
5. Indicar cantidad.
6. Ingresar fecha y hora de vencimiento.
7. Marcar si requiere cadena de frío.
8. Agregar observaciones.
9. Presionar `Publicar donación`.

El sistema valida que la fecha no esté vencida y registra la publicación como disponible.

## 11. Publicar merma estética

Esta opción se usa para productos aptos para consumo, pero con daño de empaque, forma irregular u otra condición estética.

1. Entrar a `Merma estética`.
2. Seleccionar donante.
3. Completar producto, categoría, cantidad y vencimiento.
4. Indicar el tipo de merma.
5. Guardar la publicación.

## 12. Reportar producto vencido

Esta opción permite registrar productos cuya fecha ya expiró para dejar evidencia y alertar a organizaciones.

1. Entrar a `Reportar vencido`.
2. Seleccionar donante.
3. Completar producto, categoría, cantidad y fecha vencida.
4. Agregar observaciones.
5. Registrar el producto.

El sistema genera una alerta especial mediante ntfy.

## 13. Ver donaciones disponibles

1. Entrar a `Ver donaciones`.
2. Revisar las tarjetas disponibles.
3. Las donaciones aparecen ordenadas por vencimiento más próximo.
4. Las publicaciones urgentes se muestran destacadas.
5. Si hay filtros, seleccionar el tipo de dieta o categoría correspondiente.

## 14. Reservar donación como ONG

1. Entrar a `Ver donaciones`.
2. Seleccionar una donación disponible.
3. Elegir una ONG verificada.
4. Presionar `Reservar`.

Resultado esperado:

- La donación cambia a estado reservada.
- Se genera un código QR simulado.
- Se muestra información de retiro y ubicación.

## 15. Validar entrega por QR

1. Entrar a `Validar QR`.
2. Ingresar el código generado durante la reserva.
3. Presionar `Validar entrega`.

Si el código es válido, el sistema cambia la reserva a completada y la donación a entregada.

## 16. Consultar notificaciones

1. Entrar a `Notificaciones ONG`.
2. Seleccionar una ONG.
3. Revisar alertas recibidas.

También se puede revisar la alerta push desde ntfy usando el tópico del proyecto.

## 17. Reporte de kilos rescatados

1. Entrar a `Reporte kilos`.
2. Revisar los kilos acumulados por mes.
3. Usar esta vista como evidencia de impacto social y ambiental.

## 18. Certificado ambiental

1. Entrar a `Certificado ambiental`.
2. Seleccionar o revisar el donante.
3. Observar el total de entregas, kilos rescatados y CO2 evitado estimado.

## 19. Historial por proveedor

1. Entrar a `Historial proveedor`.
2. Seleccionar una ONG.
3. Revisar las donaciones completadas agrupadas por proveedor.

## 20. Recomendaciones de uso

- Registrar primero al menos un donante y una ONG.
- Verificar la ONG antes de intentar reservar.
- Usar fechas futuras al publicar excedentes normales.
- Usar coordenadas válidas para que el mapa funcione.
- Guardar el QR generado para poder validar la entrega.
