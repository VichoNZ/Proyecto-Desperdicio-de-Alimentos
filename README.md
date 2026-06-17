Plataforma de Gestión de Excedentes Alimentarios

Proyecto académico de Ingeniería de Software I orientado a reducir el desperdicio de alimentos mediante una plataforma que conecta a donantes con organizaciones sociales antes de que los excedentes pierdan su utilidad.

1. Contexto del problema
Supermercados, restaurantes y centros de distribución generan diariamente alimentos que aún se encuentran en condiciones de ser aprovechados, pero muchas veces terminan siendo desechados por falta de coordinación. Al mismo tiempo, organizaciones sociales y comedores solidarios necesitan acceder a alimentos de forma oportuna.
La solución propuesta permite publicar excedentes, priorizarlos según fecha de vencimiento, notificar a organizaciones receptoras, reservar donaciones, validar entregas mediante QR y medir el impacto del rescate alimentario.

2. Propuesta de valor
La plataforma entrega un flujo simple para que el donante registre excedentes alimentarios y para que una organización social pueda reaccionar rápidamente. El valor principal está en disminuir la merma, mejorar la trazabilidad y facilitar la coordinación entre actores que antes operaban de forma manual o desordenada.

3. Estado actual del prototipo
El prototipo actual funciona sobre n8n + Docker + PostgreSQL. La interfaz se genera como HTML desde el flujo de n8n y se muestra mediante un Webhook. No se utiliza un framework frontend externo como React, Angular o Vue; el frontend corresponde a HTML/CSS renderizado por el flujo.

Funcionalidades implementadas:
Registro de usuarios con rol Donante u Organización Social.
Vista administrativa para verificar ONGs.
Configuración de ubicación con dirección, comuna, latitud y longitud.
Gestión de sucursales para donantes.
Publicación de excedentes alimentarios.
Validación de fecha de vencimiento.
Marcado de cadena de frío.
Publicación de merma estética.
Reporte de producto vencido.
Priorización de donaciones por vencimiento próximo.
Notificaciones push mediante ntfy.
Visualización de mapa mediante OpenStreetMap.
Reserva de donaciones por parte de ONGs verificadas.
Generación de código QR simulado para retiro.
Validación de entrega mediante código QR.
Reporte de kilos rescatados.
Certificado ambiental básico.
Historial de donaciones por proveedor.

4. Stack tecnológico
Componente	Tecnología usada
Automatización / backend del prototipo	n8n
Contenedores	Docker / Docker Compose
Base de datos PostgreSQL
Interfaz HTML5 + CSS renderizado desde n8n
Lógica de interfaz y reglas	JavaScript en nodos Code de n8n
Notificaciones ntfy
Mapas OpenStreetMap
Control de versiones	Git + GitHub
Gestión ágil	Jira / GitHub Projects

5. Arquitectura general
El sistema sigue una arquitectura cliente-servidor simplificada:
El usuario accede desde un navegador al Webhook de n8n.
n8n recibe la acción solicitada mediante parámetros de URL.
El nodo JavaScript determina si se requiere consulta SQL, inserción, actualización o solo render HTML.
PostgreSQL almacena usuarios, donaciones, reservas, notificaciones, sucursales y estados.
El nodo Renderizar HTML genera la respuesta visual para el usuario.
ntfy se utiliza para enviar notificaciones push a organizaciones sociales.
OpenStreetMap permite visualizar ubicaciones y apoyar la logística de retiro.
6. Estructura sugerida del repositorio

Proyecto-Desperdicio-de-Alimentos/
├── README.md
├── docker-compose.yml
├── .env.example
├── db/
│   └── init.sql
├── n8n/
│   └── flujo-integrado-excedentes-alimentarios.json
├── docs/
│   ├── Configuracion_del_Entorno.md
│   ├── Manual_de_Usuario.md
│   └── Manual_de_Despliegue.md
└── evidencia/
    └── capturas/

7. Instalación rápida en local
Clonar el repositorio: git clone https://github.com/VichoNZ/Proyecto-Desperdicio-de-Alimentos
cd Proyecto-Desperdicio-de-Alimentos
Crear el archivo `.env` a partir del ejemplo: cp .env.example .env
Levantar los servicios: docker compose up -d
Entrar a n8n desde el navegador:http://localhost:5678
Importar el flujo: n8n/flujo-integrado-excedentes-alimentarios.json
Crear o revisar la credencial de PostgreSQL en n8n.
Activar el workflow y abrir el Webhook:http://localhost:5678/webhook/69754dbb-8831-45fa-9478-cf158b95fbe4

8. Variables de entorno sugeridas

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

> Importante: en un ambiente real no se deben subir contraseñas al repositorio. Se recomienda mantener `.env` fuera de Git y versionar solo `.env.example`.

9. Uso general
El administrador revisa y verifica ONGs.
El donante registra usuarios, sucursales y publica excedentes.
La ONG revisa donaciones disponibles, reserva productos y obtiene un QR simulado.
El donante valida el QR cuando se concreta el retiro.
El sistema cambia el estado de la donación y registra impacto.
10. Acceso por roles en el prototipo
En la versión actual no se implementó un login formal. Las vistas de Administrador, Donante y ONG están disponibles desde la navegación del prototipo y se diferencian por acciones y roles registrados. Esta decisión se justifica porque el objetivo del hito era validar el flujo funcional completo sin introducir una capa de autenticación que pudiera romper el avance ya estabilizado. La autenticación queda definida como mejora futura para endurecer seguridad y control de acceso.

11. Endpoints y acciones principales
URL base local:
http://localhost:5678/webhook/69754dbb-8831-45fa-9478-cf158b95fbe4

Ejemplos de acciones:

?accion=inicio
?accion=registro
?accion=usuarios
?accion=verificar_ong
?accion=publicar
?accion=donaciones
?accion=notificaciones
?accion=reservas
?accion=formulario_qr
?accion=reporte_kilos
?accion=certificado
```
12. Integración con ntfy
El flujo utiliza ntfy para enviar alertas push a organizaciones sociales cuando se publica una donación o se reporta un producto vencido.

13. Consideraciones conocidas
El sistema es un prototipo académico, no una versión productiva final.
El login formal no está implementado en esta etapa.
El QR es simulado mediante un código textual generado por el sistema.

14. Equipo Scrum
Integrante	Rol
Vicente Núñez Navarro	Scrum Master
Matías Cardemil Guzmán	Product Owner
Matías Fuentes Barrera	Developer
Ítalo Jerez Guzmán	Developer
