-- init.sql
-- Base de datos para Plataforma de Gestión de Excedentes Alimentarios
-- Estructura real según Docker (n8n + PostgreSQL 16)

CREATE TABLE IF NOT EXISTS usuarios (
    id BIGSERIAL PRIMARY KEY,
    nombre TEXT NOT NULL,
    email TEXT NOT NULL UNIQUE,
    rol TEXT NOT NULL CHECK (rol = ANY (ARRAY['DONANTE'::text, 'ONG'::text])),
    direccion TEXT,
    verificado BOOLEAN DEFAULT TRUE,
    creado_en TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS donaciones (
    id BIGSERIAL PRIMARY KEY,
    donante_id BIGINT REFERENCES usuarios(id),
    donante_nombre TEXT,
    nombre TEXT NOT NULL,
    categoria TEXT,
    cantidad INTEGER CHECK (cantidad >= 0),
    vencimiento TIMESTAMPTZ,
    cadena_frio BOOLEAN DEFAULT FALSE,
    observaciones TEXT,
    estado TEXT DEFAULT 'DISPONIBLE'
        CHECK (estado = ANY (ARRAY['DISPONIBLE'::text, 'RESERVADA'::text, 'VENCIDO'::text, 'RETIRADA'::text])),
    creado_en TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS notificaciones (
    id BIGSERIAL PRIMARY KEY,
    usuario_id BIGINT REFERENCES usuarios(id),
    organizacion_nombre TEXT,
    donacion_id BIGINT REFERENCES donaciones(id),
    mensaje TEXT,
    fecha TIMESTAMPTZ DEFAULT NOW(),
    leida BOOLEAN DEFAULT FALSE,
    es_alerta_vencido BOOLEAN DEFAULT FALSE
);

CREATE TABLE IF NOT EXISTS reservas (
    id BIGINT PRIMARY KEY DEFAULT nextval('reservas_id_seq'),
    donacion_id BIGINT REFERENCES donaciones(id),
    producto TEXT,
    usuario_id BIGINT REFERENCES usuarios(id),
    organizacion_nombre TEXT,
    codigo_qr TEXT,
    fecha_reserva TIMESTAMPTZ DEFAULT NOW(),
    estado TEXT DEFAULT 'ACTIVA'
);