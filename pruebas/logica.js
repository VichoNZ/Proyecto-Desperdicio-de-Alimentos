function escapar(texto) {
  if (!texto) return "";
  return String(texto)
    .replaceAll("'", "''")
    .replaceAll("\\", "\\\\");
}

function validarEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function validarRol(rol) {
  return rol === "DONANTE" || rol === "ONG";
}

function validarCantidad(cantidad) {
  return Number.isInteger(Number(cantidad)) && Number(cantidad) > 0;
}

function validarFechaVencida(fecha) {
  return new Date(fecha) < new Date();
}

function generarCodigoQR(donacionId, usuarioId) {
  if (!donacionId || !usuarioId) return "";
  return `QR-${donacionId}-${usuarioId}`;
}

module.exports = {
  escapar,
  validarEmail,
  validarRol,
  validarCantidad,
  validarFechaVencida,
  generarCodigoQR
};