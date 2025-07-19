import { ElectronConfig, MAX_ELECTRONS, Sublevel, SublevelConfig } from "../types/EletronicConfig";

export default function validateElectronConfig(config: ElectronConfig): { isValid: boolean, errors: string[]; } {
  const errors: string[] = [];

  // Verifica se a string está vazia
  if (!config || config.trim() === "") {
    return { isValid: false, errors: ["Configuração eletrônica não pode ser vazia!"] };
  }

  // Divide a configuração em partes (ex.: "1s2 2s2 2p6" -> ["1s2", "2s2", "2p6"])
  const parts = config.trim().split(/\s+/);

  // Regex para validar o formato de cada parte (ex.: "1s2" ou "3p6")
  const partRegex = /^(\d+)([spdf])(\d+)$/;

  // Array para armazenar as configurações parseadas
  const parsedConfigs: SublevelConfig[] = [];

  for (const part of parts) {
    const match = part.match(partRegex);

    if (!match) {
      errors.push(`Formato inválido para o trecho "${part}". Use o formato <nível><subnível><elétrons>, como "2s2".`);
      continue;
    }

    const level = parseInt(match[1], 10);
    const sublevel = match[2] as Sublevel;
    const electrons = parseInt(match[3], 10);

    // Validações
    if (level < 1 || level > 7) {
      errors.push(`Nível de energia inválido em "${part}". Deve estar entre 1 e 7.`);
    }
    if (!["s", "p", "d", "f"].includes(sublevel)) {
      errors.push(`Subnível inválido em "${part}". Deve ser s, p, d, ou f.`);
    }
    if (electrons < 1 || electrons > MAX_ELECTRONS[sublevel]) {
      errors.push(`Número de elétrons inválido em "${part}". Máximo para ${sublevel} é ${MAX_ELECTRONS[sublevel]}.`);
    }

    // Verifica se o subnível é válido para o nível de energia
    if (sublevel === "p" && level < 2) {
      errors.push(`Subnível p não é permitido no nível ${level} em "${part}".`);
    }
    if (sublevel === "d" && level < 3) {
      errors.push(`Subnível d não é permitido no nível ${level} em "${part}".`);
    }
    if (sublevel === "f" && level < 4) {
      errors.push(`Subnível f não é permitido no nível ${level} em "${part}".`);
    }

    parsedConfigs.push({ level, sublevel, electrons });
  }

  // Verifica ordem crescente dos níveis e subníveis
  for (let i = 1; i < parsedConfigs.length; i++) {
    const prev = parsedConfigs[i - 1];
    const curr = parsedConfigs[i];

    if (prev.level > curr.level) {
      errors.push(`Ordem inválida: ${curr.level}${curr.sublevel}${curr.electrons} aparece antes de ${prev.level}${prev.sublevel}${prev.electrons}.`);
    } else if (prev.level === curr.level) {
      const sublevelorder = ["s", "p", "d", "f"];
      if (sublevelorder.indexOf(prev.sublevel) > sublevelorder.indexOf(curr.sublevel)) {
        errors.push(`Ordem de subníveis inválidos no nível ${prev.level}: ${curr.sublevel} aparece antes de ${prev.sublevel}.`);
      }
    }
  }

  return {
    isValid: errors.length === 0,
    errors
  };
};
