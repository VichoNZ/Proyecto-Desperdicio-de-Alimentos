-- init.sql
-- Base de datos inicial para Plataforma de Gestión de Excedentes Alimentarios

CREATE TABLE IF NOT EXISTS usuarios (
    id SERIAL PRIMARY KEY,
    nombre VARCHAR(150) NOT NULL,
    email VARCHAR(150) NOT NULL UNIQUE,
    rol VARCHAR(20) NOT NULL CHECK (rol IN ('DONANTE', 'ONG')),
    direccion TEXT,
    creado_en TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS donaciones (
    id SERIAL PRIMARY KEY,
    donante_id INTEGER REFERENCES usuarios(id) ON DELETE SET NULL,
    donante_nombre VARCHAR(150),
    nombre VARCHAR(150) NOT NULL,
    categoria VARCHAR(100),
    cantidad INTEGER NOT NULL,
    vencimiento TIMESTAMP NOT NULL,
    cadena_frio BOOLEAN DEFAULT FALSE,
    observaciones TEXT,
    estado VARCHAR(30) NOT NULL DEFAULT 'DISPONIBLE'
        CHECK (estado IN ('DISPONIBLE', 'RESERVADA', 'ENTREGADA', 'VENCIDO', 'CADUCADA')),
    creado_en TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS notificaciones (
    id SERIAL PRIMARY KEY,
    usuario_id INTEGER REFERENCES usuarios(id) ON DELETE CASCADE,
    organizacion_nombre VARCHAR(150),
    donacion_id INTEGER REFERENCES donaciones(id) ON DELETE CASCADE,
    mensaje TEXT NOT NULL,
    fecha TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    leida BOOLEAN DEFAULT FALSE,
    es_alerta_vencido BOOLEAN DEFAULT FALSE
);

CREATE TABLE IF NOT EXISTS reservas (
    id SERIAL PRIMARY KEY,
    donacion_id INTEGER REFERENCES donaciones(id) ON DELETE CASCADE,
    producto VARCHAR(150),
    usuario_id INTEGER REFERENCES usuarios(id) ON DELETE CASCADE,
    organizacion_nombre VARCHAR(150),
    codigo_qr VARCHAR(255),
    fecha_reserva TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    estado VARCHAR(30) DEFAULT 'ACTIVA'
        CHECK (estado IN ('ACTIVA', 'COMPLETADA', 'EXPIRADA'))
);