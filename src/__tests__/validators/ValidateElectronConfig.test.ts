import validateElectronConfig from "../../validators/ValidateElectronConfig";

describe("Validators tests", () => {
  test("Must return IsValid: true", () => {
    const validElectronConfig = "1s2 2s2 2p6 3s2 3p6 3d10 4s2";
    const testReturn = validateElectronConfig(validElectronConfig);

    expect(testReturn.isValid).toBe(true);
  });

  test("Must return {isValid: false, errors: ['Configuração eletrônica não pode ser vazia!']}", () => {
    const invalidElectronConfig = "";
    const testReturn = validateElectronConfig(invalidElectronConfig);

    expect(testReturn.isValid).toBe(false);
    expect(testReturn.errors).toHaveLength(1);
    expect(testReturn.errors[0]).toBe("Configuração eletrônica não pode ser vazia!");
  });

  test("Must return {isValid: false, errors: ['Formato inválido para o trecho '${part}'. Use o formato <nível><subnível><elétrons>, como '2s2'.']}", () => {
    const invalidElectronConfig = "1s2 2s2 3ss";
    const testReturn = validateElectronConfig(invalidElectronConfig);

    expect(testReturn.isValid).toBe(false);
    expect(testReturn.errors).toHaveLength(1);
    expect(testReturn.errors[0]).toBe('Formato inválido para o trecho "3ss". Use o formato <nível><subnível><elétrons>, como \"2s2\".')
  });

  test("Must return {isValid: false, errors: ['Nível de energia inválido em '${part}'. Deve estar entre 1 e 7.']}", () => {
    const invalidElectronConfig = "0s2";
    const testReturn = validateElectronConfig(invalidElectronConfig);

    expect(testReturn.isValid).toBe(false);
    expect(testReturn.errors).toHaveLength(1);
    expect(testReturn.errors[0]).toBe('Nível de energia inválido em "0s2". Deve estar entre 1 e 7.');
  });

  test.skip("Must return {isValid: false, errors: ['Subnível inválido em '${part}'. Deve ser s, p, d, ou f.']", () => {
    const invalidElectronConfig = "1s2 2x2";
    const testReturn = validateElectronConfig(invalidElectronConfig);

    expect(testReturn.isValid).toBe(false);
    expect(testReturn.errors).toHaveLength(1);
    expect(testReturn.errors[0]).toBe('Subnível inválido em "4g3". Deve ser s, p, d, ou f.')
  });

  test("Must return {isValid: false, errors: ['Número de elétros inválido em '${part}'. Máximo para ${sublevel} é ${MAX_ELECTRONS[sublevel]}.]}", () => {
    const invalidElectronConfig = "1s2 2s3";
    const testReturn = validateElectronConfig(invalidElectronConfig);

    expect(testReturn.isValid).toBe(false);
    expect(testReturn.errors).toHaveLength(1);
    expect(testReturn.errors[0]).toBe('Número de elétrons inválido em "2s3". Máximo para s é 2.');
  });

  test("Must return {isValid: false, errors: ['Subnível p não é permitido no nível ${level} em '${part}'.']}", () => {
    const invalidElectronConfig = "1s2 1p2";
    const testReturn = validateElectronConfig(invalidElectronConfig);

    expect(testReturn.isValid).toBe(false);
    expect(testReturn.errors).toHaveLength(1);
    expect(testReturn.errors[0]).toBe('Subnível p não é permitido no nível 1 em "1p2".')
  });

  test("Must return {isValid: false, errors: ['Subnível d não é permitido no nível ${level} em '${part}'.']}", () => {
    const invalidElectronConfig = "1s2 2s2 2d6";
    const testReturn = validateElectronConfig(invalidElectronConfig);

    expect(testReturn.isValid).toBe(false);
    expect(testReturn.errors).toHaveLength(1);
    expect(testReturn.errors[0]).toBe('Subnível d não é permitido no nível 2 em "2d6".')
  });

    test("Must return {isValid: false, errors: ['Subnível f não é permitido no nível ${level} em '${part}'.']}", () => {
    const invalidElectronConfig = "1s2 2s2 2p6 3s2 3p6 3d10 3f14 ";
    const testReturn = validateElectronConfig(invalidElectronConfig);

    expect(testReturn.isValid).toBe(false);
    expect(testReturn.errors).toHaveLength(1);
    expect(testReturn.errors[0]).toBe('Subnível f não é permitido no nível 3 em "3f14".')
  });

  test("Must return {isValid: false, errors: ['Ordem inválida: ${curr.level}${curr.sublevel}${curr.electrons} aparece antes de ${prev.level}${prev.sublevel}${prev.electrons}.']", () => {
    const invalidElectronConfig = "1s2 2s2 2p6 3s2 3p6 4s2 3d10 4p6 4d10 4f14";
    const testReturn = validateElectronConfig(invalidElectronConfig);

    expect(testReturn.isValid).toBe(false);
    expect(testReturn.errors).toHaveLength(1);
    expect(testReturn.errors[0]).toBe('Ordem inválida: 3d10 aparece antes de 4s2.')
  });

  test("Must return {isValid: false, errors: ['Ordem de subníveis inválidos no nível ${prev.level}: ${curr.sublevel} aparece antes de ${prev.sublevel}.'", () => {
    const invalidElectronConfig = "1s2 2s2 2p6 3p6 3s2 3d10 4s2 4p6 4d10 4f14";
    const testReturn = validateElectronConfig(invalidElectronConfig);

    expect(testReturn.isValid).toBe(false);
    expect(testReturn.errors).toHaveLength(1);
    expect(testReturn.errors[0]).toBe('Ordem de subníveis inválidos no nível 3: s aparece antes de p.')
  })
})