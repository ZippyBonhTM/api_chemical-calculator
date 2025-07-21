function elementParamsProcessor(input: Record<string, any>): { query: Record<string, any>, errors: string[] } {
  const errors: string[] = [];
  const query: Record<string, any> = {};

  // Definir chaves válidas do schema, incluindo group e period
  const validKeys = [
    'name', 'symbol', 'atomicNumber', 'atomicWeight', 'category', 'stateAtRoomTemp',
    'meltingPoint', 'boilingPoint', 'density', 'electronConfiguration', 'electronegativity', 'atomicRadius',
    'ionizationEnergy', 'electronAffinity', 'oxidationStates', 'description', 'uses',
    'history', 'interestingFacts', 'moreInfoLink', 'position', 'block', 'group', 'period'
  ] as const;

  // Preprocessar input, considerando apenas chaves válidas
  for (const key in input) {
    if (Object.prototype.hasOwnProperty.call(input, key)) {
      // Rejeitar chaves com notação de ponto (ex.: name.value)
      if (key.includes('.')) {
        errors.push(`Invalid query parameter: ${key}. Use top-level schema keys (e.g., name, symbol, group, period).`);
      }
      if (!validKeys.includes(key as any)) {
        errors.push(`Invalid query parameter: ${key}. Must be one of ${validKeys.join(', ')}.`);
      }
      if (key === 'position' && typeof input[key] === 'string') {
        try {
          query.position = JSON.parse(input[key]);
        } catch {
          errors.push(`Invalid JSON for position: ${input[key]}`);
        }
      } else if (key === 'block' && typeof input[key] === 'string') {
        if (!['s', 'p', 'd', 'f'].includes(input[key])) {
          errors.push(`Invalid block value: ${input[key]}. Must be s, p, d, or f.`);
        }
        query.block = input[key];
      } else if (key === 'group' || key === 'period') {
        // Armazenar group e period para mapeamento posterior
        const value = parseInt(input[key], 10);
        if (isNaN(value)) {
          errors.push(`Invalid ${key} value: ${input[key]}. Must be a number.`);
        }
        query[key] = value;
      } else {
        query[key] = { value: input[key] };
      }
    }
  }

  // Converter para filtro Mongoose
  const result: Record<string, any> = {};

  // Extrair position, block, group, e period, se existirem
  const { position, block, group, period, ...rest } = query;

  // Mapear propriedades com { value, link } para [key].value
  for (const [key, valueWithLink] of Object.entries(rest)) {
    if (valueWithLink && 'value' in valueWithLink) {
      result[`${key}.value`] = valueWithLink.value;
    }
  }

  // Adicionar position, se existir
  if (position) {
    result.position = position;
  }

  // Adicionar block, se existir
  if (block) {
    result.block = block;
  }

  // Adicionar group e period como position.group e position.period, se existirem
  if (group !== undefined) {
    result['position.group'] = group;
  }
  if (period !== undefined) {
    result['position.period'] = period;
  }

  return {
    query: Object.keys(result).length > 0 ? result : {},
    errors
  };
}

export default elementParamsProcessor;
