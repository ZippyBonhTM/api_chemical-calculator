import { ElementSchema } from "@db";
import { MapedElementType } from "types/ElementAtributes";

function convertToMapedElementType(input: Partial<ElementSchema>): Partial<MapedElementType> {
  // Extrair position e block, se existirem
  const { position, ...rest } = input;

  // Mapear todas as propriedades restantes para extrair value
  const result: Partial<MapedElementType> = Object.fromEntries(
    Object.entries(rest).map(([key, valueWithLink]) => [
      key,
      valueWithLink && typeof valueWithLink === 'object' && 'value' in valueWithLink
        ? valueWithLink.value
        : undefined
    ])
  );

  // Adicionar position ao resultado, se existir
  if (position) {
    result.position = position;
  }

  return result;
}

export default convertToMapedElementType;
