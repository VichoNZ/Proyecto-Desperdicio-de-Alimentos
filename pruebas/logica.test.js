const {
  escapar,
  validarEmail,
  validarRol,
  validarCantidad,
  validarFechaVencida,
  generarCodigoQR
} = require("./logica");

// TESTS: escapar 
describe("escapar()", () => {
  test("retorna string vacío si recibe null", () => {
    expect(escapar(null)).toBe("");
  });

  test("escapa comillas simples para SQL", () => {
    expect(escapar("O'Brien")).toBe("O''Brien");
  });

  test("no modifica texto limpio", () => {
    expect(escapar("Juan Perez")).toBe("Juan Perez");
  });
});

// TESTS: validarEmail 
describe("validarEmail()", () => {
  test("acepta email válido", () => {
    expect(validarEmail("ong@correo.cl")).toBe(true);
  });

  test("rechaza email sin @", () => {
    expect(validarEmail("correoSinArroba.cl")).toBe(false);
  });

  test("rechaza email vacío", () => {
    expect(validarEmail("")).toBe(false);
  });
});

// TESTS: validarRol 
describe("validarRol()", () => {
  test("acepta rol DONANTE", () => {
    expect(validarRol("DONANTE")).toBe(true);
  });

  test("acepta rol ONG", () => {
    expect(validarRol("ONG")).toBe(true);
  });

  test("rechaza rol inválido", () => {
    expect(validarRol("ADMIN")).toBe(false);
  });
});

// TESTS: validarCantidad 
describe("validarCantidad()", () => {
  test("acepta cantidad positiva entera", () => {
    expect(validarCantidad(10)).toBe(true);
  });

  test("rechaza cantidad cero", () => {
    expect(validarCantidad(0)).toBe(false);
  });

  test("rechaza cantidad negativa", () => {
    expect(validarCantidad(-5)).toBe(false);
  });

  test("rechaza cantidad decimal", () => {
    expect(validarCantidad(3.5)).toBe(false);
  });
});

// TESTS: validarFechaVencida 
describe("validarFechaVencida()", () => {
  test("reconoce fecha del pasado como vencida", () => {
    expect(validarFechaVencida("2020-01-01")).toBe(true);
  });

  test("reconoce fecha futura como no vencida", () => {
    expect(validarFechaVencida("2099-12-31")).toBe(false);
  });
});

// TESTS: generarCodigoQR
describe("generarCodigoQR()", () => {
  test("genera código QR con formato correcto", () => {
    expect(generarCodigoQR(5, 3)).toBe("QR-5-3");
  });

  test("retorna string vacío si faltan parámetros", () => {
    expect(generarCodigoQR(null, null)).toBe("");
  });
});