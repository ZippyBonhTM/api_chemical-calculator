import { ElementSchema } from "@db";
import { MapedElementType } from "types/ElementAtributes";

function convertToMapedElementType(input: Partial<ElementSchema>): Partial<MapedElementType> {
  // Extrair position e block, se existirem
  const { position, block, ...rest } = input;

  // Mapear todas as propriedades restantes para extrair value
  const result: Partial<MapedElementType> = Object.fromEntries(
    Object.entries(rest).map(([key, valueWithLink]) => [
      key,
      // Como rest não inclui position nem block, valueWithLink é sempre { value, link } ou null/undefined
      valueWithLink && 'value' in valueWithLink ? valueWithLink.value : undefined
    ])
  );

  // Adicionar position ao resultado, se existir
  if (position) {
    result.position = position;
  }

  // Adicionar block ao resultado, se existir
  if (block) {
    result.block = block;
  }

  return result;
}

export default convertToMapedElementType;
