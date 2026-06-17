// notificador.js
// Módulo que simula el envío de alertas push a ONGs via ntfy.sh
// Equivale al nodo "Notificación Push (ntfy)" del flujo n8n

async function enviarAlerta(producto, cantidad, fechaVencimiento) {
  const mensaje = `¡Atención ONG! Tenemos ${cantidad} unidades de ${producto}. Vencen el ${fechaVencimiento}.`;
  
  const response = await fetch("https://ntfy.sh/rescate_alimentos_italo", {
    method: "POST",
    body: mensaje,
  });

  return response.ok;
}

module.exports = { enviarAlerta };