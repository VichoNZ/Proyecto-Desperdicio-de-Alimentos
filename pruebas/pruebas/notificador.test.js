// notificador.test.js
// Pruebas con MOCKING de fetch (dependencia externa: ntfy.sh)
// Equivale a mockear PaymentService del PDF — aquí mockeamos el servicio HTTP

const { enviarAlerta } = require("./notificador");

// ─── MOCK de fetch (simula la API externa ntfy.sh) ────────────────────────────
beforeEach(() => {
  global.fetch = jest.fn();
});

afterEach(() => {
  jest.resetAllMocks();
});

// ─── TESTS ────────────────────────────────────────────────────────────────────
describe("enviarAlerta()", () => {

  test("retorna true cuando ntfy responde OK", async () => {
    // Arrange: simulamos respuesta exitosa del servidor
    global.fetch.mockResolvedValue({ ok: true });

    // Act
    const resultado = await enviarAlerta("Pan", 10, "2025-12-31");

    // Assert
    expect(resultado).toBe(true);
    expect(fetch).toHaveBeenCalledTimes(1);
    expect(fetch).toHaveBeenCalledWith(
      "https://ntfy.sh/rescate_alimentos_italo",
      expect.objectContaining({ method: "POST" })
    );
  });

  test("retorna false cuando ntfy falla", async () => {
    // Arrange: simulamos respuesta fallida
    global.fetch.mockResolvedValue({ ok: false });

    // Act
    const resultado = await enviarAlerta("Leche", 5, "2025-06-01");

    // Assert
    expect(resultado).toBe(false);
  });

  test("lanza error si fetch falla completamente (red caída)", async () => {
    // Arrange: simulamos error de red
    global.fetch.mockRejectedValue(new Error("Network error"));

    // Assert
    await expect(
      enviarAlerta("Yogur", 3, "2025-05-01")
    ).rejects.toThrow("Network error");
  });

  test("llama a fetch con URL correcta de ntfy", async () => {
    global.fetch.mockResolvedValue({ ok: true });

    await enviarAlerta("Fruta", 20, "2025-11-01");

    expect(fetch).toHaveBeenCalledWith(
      "https://ntfy.sh/rescate_alimentos_italo",
      expect.any(Object)
    );
  });

});