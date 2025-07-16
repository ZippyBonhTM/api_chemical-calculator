// // Função para testar a validação
// function testElectronConfig(config: ElectronConfig): void {
//   const result = validateElectronConfig(config);
//   console.log(`Configuração: ${config}`);
//   console.log(`Válida: ${result.isValid}`);
//   if (result.errors.length > 0) {
//     console.log("Erros:");
//     result.errors.forEach(error => console.log(`- ${error}`));
//   }
//   console.log("---");
// };

// // Exemplos de uso
// testElectronConfig('1s2 2s2 2p6 3s2 3p6 3d10 4s2');
// testElectronConfig('1s2 2s2 2p6 2d5'); // Erro: subnível d inválido no nível 2
// testElectronConfig('1s3 2s2'); // Erro: 3 elétrons em 1s
// testElectronConfig('2s2 1s2'); // Erro: ordem incorreta
// testElectronConfig(''); // Erro: vazio

import validateElectronConfig from "../../validators/ValidateElectronConfig";

describe("Validators tests", () => {
  test("Must return IsValid: true", () => {
    const validElectronConfig = "1s2 2s2 2p6 3s2 3p6 3d10 4s2";
    const testReturn = validateElectronConfig(validElectronConfig);

    expect(testReturn.isValid).toBe(true);
  });
})